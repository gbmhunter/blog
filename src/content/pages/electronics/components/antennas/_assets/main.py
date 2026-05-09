# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "matplotlib>=3.8",
#   "numpy>=1.26",
#   "pillow>=10.0",
# ]
# ///
"""
Generate a 3D radiation pattern diagram comparing a directional antenna against
an isotropic radiator of the same INPUT power (not radiated power). The
directional antenna is assumed to have efficiency eta < 1, so its total
radiated power is eta * P_in (less than the isotropic reference, which is
treated as a lossless 100%-efficient radiator).

In normalized units (per-steradian intensity), the isotropic reference is the
unit sphere r = 1. The directional pattern uses r(theta) = A * cos^n(theta) for
theta in [0, pi/2], where A is chosen so the integral of the pattern over the
sphere equals eta * P_in. This makes the peak intensity directly equal to the
linear gain G; the lobe extends past the unit sphere by exactly that gain
factor.
"""

from pathlib import Path
from typing import cast

import matplotlib.pyplot as plt
import numpy as np
from matplotlib import colormaps
from matplotlib.colors import Normalize
from matplotlib.lines import Line2D
from mpl_toolkits.mplot3d import Axes3D

PLASMA = colormaps["plasma"]

SCRIPT_DIR = Path(__file__).resolve().parent

# ----- Parameters -------------------------------------------------------------
TARGET_GAIN_DBI = 4.0  # desired peak gain (sets the antenna efficiency)
N = 2                  # cos^n(theta) shape parameter (higher = narrower lobe)
RES = 121              # mesh resolution per axis
P_INPUT_W = 2.0        # antenna input power (W) — sets the absolute W/sr scale

# Efficiency derived from target gain. G = 2 * eta * (n + 1) so eta = G/(2(n+1)).
ETA = (10 ** (TARGET_GAIN_DBI / 10)) / (2 * (N + 1))

# Isotropic reference intensity for the chosen input power: U_iso = P_in / (4 pi).
U_ISO = P_INPUT_W / (4.0 * np.pi)


def directional_pattern(theta: np.ndarray, eta: float, n: int) -> np.ndarray:
    """Return the per-steradian intensity of a cos^n forward-hemisphere lobe.

    Normalized so that the integral over the sphere equals 4*pi*eta, which
    matches the radiated power of an antenna of efficiency eta driven by the
    same input power as the isotropic reference (whose per-steradian intensity
    is 1).
    """
    a = 2.0 * eta * (n + 1)
    return np.where(theta <= np.pi / 2, a * np.cos(theta) ** n, 0.0)


def sph_to_cart(r, theta, phi):
    x = r * np.sin(theta) * np.cos(phi)
    y = r * np.sin(theta) * np.sin(phi)
    z = r * np.cos(theta)
    return x, y, z


def trim_bottom_whitespace(png_path: Path, padding_px: int = 4) -> None:
    """Crop trailing all-white rows from the bottom of a PNG, leaving
    `padding_px` pixels of margin below the last non-white row.
    """
    from PIL import Image

    img = Image.open(png_path).convert("RGB")
    arr = np.array(img)
    # A row is "white" if every pixel is near (255, 255, 255).
    row_is_content = np.any(arr.min(axis=2) < 250, axis=1)
    if not row_is_content.any():
        return
    last_content_row = int(np.where(row_is_content)[0].max())
    new_height = min(last_content_row + 1 + padding_px, arr.shape[0])
    if new_height >= arr.shape[0]:
        return
    img.crop((0, 0, arr.shape[1], new_height)).save(png_path)


def whip_pattern(theta: np.ndarray) -> np.ndarray:
    """Half-wave dipole / quarter-wave whip radiation intensity pattern.

    Azimuthally symmetric (no phi dependence). Peak normalized to 1 along
    theta = pi/2 (perpendicular to the antenna axis); zero along the axis
    (theta = 0 and theta = pi). Uses the standard half-wave dipole formula

        F(theta) = cos(pi/2 * cos(theta)) / sin(theta)

    and returns U(theta) = F(theta)^2 with the 0/0 limits at the poles
    handled explicitly.
    """
    sin_theta = np.sin(theta)
    eps = 1e-10
    safe_sin = np.where(sin_theta < eps, eps, sin_theta)
    f = np.cos(np.pi / 2.0 * np.cos(theta)) / safe_sin
    u = f * f
    return np.where(sin_theta < eps, 0.0, u)


def generate_gain_plot():
    """Generate the gain-vs-isotropic comparison diagram."""
    theta_1d = np.linspace(0, np.pi, RES)
    phi_1d = np.linspace(0, 2 * np.pi, RES)
    theta, phi = np.meshgrid(theta_1d, phi_1d, indexing="ij")

    # Isotropic reference: a sphere of constant intensity U_iso.
    iso_r = np.full_like(theta, U_ISO)
    iso_x, iso_y, iso_z = sph_to_cart(iso_r, theta, phi)

    # Directional pattern, computed with the lobe along +z (in normalized
    # units where U_iso = 1), then scaled to W/sr and rotated 90° about the
    # y-axis so the lobe points along +x (better aspect ratio for an inline
    # figure).
    dir_r = directional_pattern(theta, ETA, N) * U_ISO
    _x, _y, _z = sph_to_cart(dir_r, theta, phi)
    dir_x, dir_y, dir_z = _z, _y, -_x

    peak_intensity = dir_r.max()  # peak U_ant in W/sr
    peak_gain = peak_intensity / U_ISO  # linear gain G
    gain_dbi = 10.0 * np.log10(peak_gain)

    # ----- Plot ---------------------------------------------------------------
    fig = plt.figure(figsize=(12, 5), dpi=150)
    ax = cast(Axes3D, fig.add_subplot(111, projection="3d"))

    # Isotropic sphere: a translucent solid surface plus a wireframe so it
    # reads as a sphere even when the directional lobe pokes through it.
    ax.plot_surface(
        iso_x, iso_y, iso_z,
        color="#7aa6ff", alpha=0.30,
        rstride=4, cstride=4,
        linewidth=0, antialiased=True, shade=False,
    )
    ax.plot_wireframe(
        iso_x, iso_y, iso_z,
        rstride=8, cstride=8,
        color="#2c4f9e", linewidth=0.5, alpha=0.6,
    )

    # Reference line marking the +x axis up to peak intensity — visualises
    # the gain ratio (sphere radius = U_iso, peak lobe extends to U_ant).
    ax.plot([0, peak_intensity], [0, 0], [0, 0], color="black",
            linewidth=0.8, linestyle="--", alpha=0.6)

    # Mark the two intensities that define the gain equation:
    #   G = U_antenna(peak direction) / U_isotropic
    # Numerator: lobe surface point along +x at radius = U_ant.
    # Denominator: isotropic surface point along +x at radius = U_iso — this
    # point sits *inside* the translucent lobe, so we make it extra prominent
    # (large size, white outline) and use a leader line out to a clear area.
    ax.scatter(peak_intensity, 0, 0, color="#b22222", s=70,  # type: ignore[arg-type]
               edgecolors="white", linewidths=1.2, zorder=10)
    ax.scatter(U_ISO, 0, 0, color="#1f4ec9", s=110,  # type: ignore[arg-type]
               edgecolors="white", linewidths=1.5, zorder=20)

    # Leader line + label for U_iso, pulled out below the diagram so it is
    # readable despite the lobe surrounding the point.
    iso_label_xyz = (U_ISO, 0.0, -peak_intensity * 0.5)
    ax.plot([U_ISO, iso_label_xyz[0]], [0, iso_label_xyz[1]],
            [0, iso_label_xyz[2]],
            color="#1f4ec9", linewidth=0.9, zorder=15)
    ax.text(*iso_label_xyz,
            f"$U_\\mathrm{{iso}}$ = {U_ISO:.2f} W/sr",
            color="#1f4ec9", fontsize=10, ha="center", va="top",
            fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.2", facecolor="white",
                      edgecolor="#1f4ec9", alpha=0.95))

    # Leader line + boxed label for U_ant, matching U_iso's treatment.
    ant_label_xyz = (peak_intensity, 0.0, peak_intensity * 0.5)
    ax.plot([peak_intensity, ant_label_xyz[0]], [0, ant_label_xyz[1]],
            [0, ant_label_xyz[2]],
            color="#b22222", linewidth=0.9, zorder=15)
    ax.text(*ant_label_xyz,
            f"$U_\\mathrm{{ant}}$ = {peak_intensity:.2f} W/sr",
            color="#b22222", fontsize=10, ha="center", va="bottom",
            fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.2", facecolor="white",
                      edgecolor="#b22222", alpha=0.95))
    # Gain equation callout, placed in axes-relative coords so it doesn't
    # collide with the 3D axis labels.
    ax.text2D(
        0.98, 0.92,
        f"$P_\\mathrm{{in}}$ = {P_INPUT_W:.0f} W\n"
        f"$G = U_\\mathrm{{ant}} / U_\\mathrm{{iso}}$\n"
        f"≈ {peak_intensity:.2f} / {U_ISO:.2f}\n"
        f"≈ {peak_gain:.2f}  ({gain_dbi:.1f} dBi)",
        transform=ax.transAxes,
        color="black", fontsize=10,
        ha="right", va="top",
        bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                  edgecolor="#888", alpha=0.85),
    )

    # Directional lobe as a translucent colored surface plus a wireframe,
    # matching the isotropic sphere's treatment.
    norm = Normalize(0.0, peak_intensity)
    facecolors = PLASMA(norm(dir_r))
    facecolors[..., -1] = 0.30  # apply alpha to RGBA face colors
    ax.plot_surface(
        dir_x, dir_y, dir_z,
        facecolors=facecolors,
        rstride=1, cstride=1,
        linewidth=0, antialiased=True, shade=False,
    )
    ax.plot_wireframe(
        dir_x, dir_y, dir_z,
        rstride=8, cstride=8,
        color="#a4392a", linewidth=0.5, alpha=0.55,
    )

    # Antenna marker at the origin (a thin vertical bar along the lobe axis).
    marker_h = peak_intensity * 0.10
    ax.plot([0, 0], [0, 0], [-marker_h, marker_h], color="black",
            linewidth=2.5)

    # Axes / framing. Lobe runs along +x, so give x a wide range and keep
    # y and z just large enough to fit the sphere and the lobe's transverse
    # extent — preserves the wide aspect ratio of the figure.
    x_lo, x_hi = -peak_intensity * 0.6, peak_intensity * 1.2
    yz_lim = peak_intensity * 0.6
    ax.set_xlim(x_lo, x_hi)
    ax.set_ylim(-yz_lim, yz_lim)
    ax.set_zlim(-yz_lim, yz_lim)
    ax.set_box_aspect((x_hi - x_lo, 2 * yz_lim, 2 * yz_lim))
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    ax.set_zlabel("z")
    ax.view_init(elev=15, azim=-85)

    legend_elems = [
        Line2D([0], [0], color="#888888", lw=2,
               label=(f"Isotropic reference  "
                      f"($P_\\mathrm{{in}}$ = {P_INPUT_W:.0f} W, "
                      f"100% efficient)")),
        Line2D([0], [0], color=PLASMA(0.7), lw=8,
               label=(f"Directional antenna  "
                      f"(η = {ETA:.2f},  peak gain ≈ {gain_dbi:.1f} dBi)")),
    ]
    ax.legend(handles=legend_elems, loc="upper left", fontsize=8,
              framealpha=0.9)

    ax.set_title(
        "Antenna radiation pattern vs. isotropic reference\n"
        "(same input power; antenna is < 100% efficient)",
        fontsize=12,
    )

    fig.subplots_adjust(left=0, right=1, top=0.95, bottom=0.0)
    png_path = SCRIPT_DIR / "antenna-gain-3d.png"
    fig.savefig(png_path, dpi=150, bbox_inches="tight", pad_inches=0.10)

    # Matplotlib's bbox_inches='tight' leaves a deceptively thick band of
    # whitespace below 3D axes (the axes' invisible bottom margin). Trim it
    # by post-processing the PNG: find the lowest row containing a non-white
    # pixel, then crop a few pixels below it.
    trim_bottom_whitespace(png_path, padding_px=4)
    plt.close(fig)
    print(f"Saved {png_path.name} in {SCRIPT_DIR}")
    print(f"  Linear peak gain G = {peak_gain:.3f}  ({gain_dbi:.2f} dBi)")


def generate_whip_plot():
    """Generate the whip antenna toroidal radiation pattern diagram.

    The whip is modelled as a half-wave dipole / quarter-wave monopole over
    a perfect ground plane. Pattern is azimuthally symmetric with nulls
    along the antenna axis (vertical, +z) and peak intensity perpendicular
    to it.
    """
    theta_1d = np.linspace(0, np.pi, RES)
    phi_1d = np.linspace(0, 2 * np.pi, RES)
    theta, phi = np.meshgrid(theta_1d, phi_1d, indexing="ij")

    r = whip_pattern(theta)
    x, y, z = sph_to_cart(r, theta, phi)

    fig = plt.figure(figsize=(8, 7), dpi=150)
    ax = cast(Axes3D, fig.add_subplot(111, projection="3d"))

    norm = Normalize(0.0, r.max())
    facecolors = PLASMA(norm(r))
    facecolors[..., -1] = 0.55
    ax.plot_surface(
        x, y, z,
        facecolors=facecolors,
        rstride=1, cstride=1,
        linewidth=0, antialiased=True, shade=False,
    )
    ax.plot_wireframe(
        x, y, z,
        rstride=8, cstride=8,
        color="#a4392a", linewidth=0.4, alpha=0.55,
    )

    # Whip antenna drawn through the centre of the torus to convey that the
    # pattern is from a distributed radiator centred on the antenna (rather
    # than appearing to come from a single point at the base). For a quarter-
    # wave monopole over a ground plane, the image current makes the
    # effective radiating structure a centred dipole, so the pattern is
    # mathematically centred on the antenna's midpoint.
    whip_half = 0.5
    ax.plot([0, 0], [0, 0], [-whip_half, whip_half],
            color="black", linewidth=3.5)
    ax.text(0, 0, whip_half + 0.08, "whip\nantenna",
            color="black", fontsize=9, ha="center", va="bottom")

    # Dotted axis-extension lines past each end of the antenna, 50% of the
    # antenna length on each side, to make the antenna axis visible.
    axis_ext = whip_half  # 50% of full antenna length (= whip_half * 2 * 0.5)
    ax.plot([0, 0], [0, 0], [whip_half, whip_half + axis_ext],
            color="black", linewidth=0.8, linestyle=":", alpha=0.7)
    ax.plot([0, 0], [0, 0], [-whip_half - axis_ext, -whip_half],
            color="black", linewidth=0.8, linestyle=":", alpha=0.7)

    lim = 1.1
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_zlim(-lim, 1.2)
    ax.set_box_aspect((1, 1, 1))
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    ax.set_zlabel("z")
    ax.view_init(elev=18, azim=35)

    ax.set_title(
        "Whip antenna radiation pattern (donut/torus)\n"
        "Antenna axis along z; peak radiation perpendicular to axis, zero radiation along axis",
        fontsize=12,
    )

    # Annotate peak (perpendicular to axis) and null (along axis) using
    # ax.annotate with axes-relative coordinates so the labels render on top
    # of the 3D surface regardless of view angle. The arrow target is
    # computed by manually projecting a 3D point through the 3D axes' proj
    # matrix into 2D axes coords. Must be done AFTER view_init / set_xlim
    # etc. and after a draw pass so the projection matrix is final.
    from mpl_toolkits.mplot3d import proj3d
    fig.canvas.draw()

    def to_axes_coords(x: float, y: float, z: float) -> tuple[float, float]:
        x2, y2, _ = proj3d.proj_transform(x, y, z, ax.get_proj())
        display_xy = ax.transData.transform((x2, y2))
        ax_xy = ax.transAxes.inverted().transform(display_xy)
        return float(ax_xy[0]), float(ax_xy[1])

    # Peak point on the torus equator (z = 0, on the plane through the
    # antenna's midpoint). x = 0, y = 1 places the endpoint on the +y face
    # of the torus where r(theta = pi/2) = 1.
    ax.annotate(
        "peak\n(perpendicular to axis)",
        xy=to_axes_coords(0.0, 1.0, 0.0), xycoords=ax.transAxes,
        xytext=(0.92, 0.62), textcoords=ax.transAxes,
        ha="center", va="center", fontsize=9, fontweight="bold",
        color="#7a1010",
        bbox=dict(boxstyle="round,pad=0.25", facecolor="white",
                  edgecolor="#7a1010", alpha=0.95),
        arrowprops=dict(arrowstyle="-", color="#7a1010", lw=0.9),
    )

    ax.annotate(
        "null\n(along axis)",
        xy=to_axes_coords(0.0, 0.0, -0.65), xycoords=ax.transAxes,
        xytext=(0.28, 0.30), textcoords=ax.transAxes,
        ha="center", va="center", fontsize=9, fontweight="bold",
        color="#1f4ec9",
        bbox=dict(boxstyle="round,pad=0.25", facecolor="white",
                  edgecolor="#1f4ec9", alpha=0.95),
        arrowprops=dict(arrowstyle="-", color="#1f4ec9", lw=0.9),
    )

    fig.subplots_adjust(left=0, right=1, top=0.95, bottom=0.0)
    png_path = SCRIPT_DIR / "whip-antenna-radiation-pattern-simple.png"
    fig.savefig(png_path, dpi=150, bbox_inches="tight", pad_inches=0.10)
    trim_bottom_whitespace(png_path, padding_px=4)
    plt.close(fig)
    print(f"Saved {png_path.name} in {SCRIPT_DIR}")


def main():
    generate_gain_plot()
    generate_whip_plot()


if __name__ == "__main__":
    main()
