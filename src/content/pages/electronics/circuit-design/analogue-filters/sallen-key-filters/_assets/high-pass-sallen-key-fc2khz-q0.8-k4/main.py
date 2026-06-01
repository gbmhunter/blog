"""Regenerate ``bode-plot.png`` for the high-pass Sallen-Key design example.

Replaces the old Micro-Cap workflow with a fully headless, scriptable one:
runs ngspice (open source) in batch mode on ``sim.cir`` and plots the AC
magnitude/phase response with matplotlib.

ngspice executable resolution order:
  1. the ``NGSPICE_EXE`` environment variable (full path), else
  2. ``ngspice_con`` / ``ngspice`` on PATH.

See ``README.md`` in this folder for the portable (no-admin) ngspice install.

Usage:
    python main.py
"""

from pathlib import Path
import os
import shutil
import subprocess
import sys

import numpy as np
import matplotlib.pyplot as plt

SCRIPT_DIR = Path(__file__).parent
NETLIST = SCRIPT_DIR / "sim.cir"
DATA = SCRIPT_DIR / "sim_out.data"
OUT_IMG = SCRIPT_DIR / "bode-plot.png"
FC = 2e3  # cut-off frequency [Hz], for the reference line


def find_ngspice():
    env = os.environ.get("NGSPICE_EXE")
    if env and Path(env).exists():
        return env
    for name in ("ngspice_con", "ngspice"):
        found = shutil.which(name)
        if found:
            return found
    raise SystemExit(
        "ngspice not found. Set the NGSPICE_EXE environment variable to the "
        "ngspice_con.exe path, or add ngspice to PATH. See README.md."
    )


def run_sim(exe):
    """Run ngspice in batch mode; sim.cir writes sim_out.data via wrdata."""
    result = subprocess.run(
        [exe, "-b", NETLIST.name],
        cwd=SCRIPT_DIR,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        sys.stderr.write(result.stdout + "\n" + result.stderr + "\n")
        raise SystemExit(f"ngspice failed (exit {result.returncode})")
    return result


def load_data():
    """sim_out.data columns (wr_singlescale): frequency, mag [dB], phase [deg]."""
    data = np.genfromtxt(DATA, names=True)
    freq, mag, phase = (data[n] for n in data.dtype.names[:3])
    return freq, mag, phase


def plot(freq, mag, phase):
    fig, axes = plt.subplots(nrows=2, ncols=1, figsize=(8, 8), sharex=True)

    axes[0].plot(freq, mag, color="C0")
    axes[0].axvline(FC, color="C1", linestyle="--", label=r"$f_c$")
    axes[0].set_ylabel(r"Gain [dB]")
    axes[0].grid(True, which="both", alpha=0.4)
    axes[0].legend()

    axes[1].plot(freq, phase, color="C0")
    axes[1].axvline(FC, color="C1", linestyle="--", label=r"$f_c$")
    axes[1].set_xlabel(r"Frequency [Hz]")
    axes[1].set_ylabel(r"Phase [$^\circ$]")
    axes[1].set_xscale("log")
    axes[1].grid(True, which="both", alpha=0.4)
    axes[1].legend()

    fig.tight_layout()
    fig.savefig(OUT_IMG, dpi=110)
    return fig


def main():
    exe = find_ngspice()
    run_sim(exe)
    freq, mag, phase = load_data()
    plot(freq, mag, phase)

    # Sanity check against the design targets (ideal op-amp):
    #   passband (high-f) gain -> K = 4 -> 20*log10(4) = 12.04 dB
    #   |H(f_c)| = K*Q = 3.2     -> 20*log10(3.2) = 10.10 dB
    peak_i = int(np.argmax(mag))
    print(f"ngspice:          {exe}")
    print(f"points:           {len(freq)}  ({freq.min():.0f} .. {freq.max():.0f} Hz)")
    print(f"passband gain:    {mag[-1]:.2f} dB  (expect ~12.04 dB)")
    print(f"peak gain:        {mag[peak_i]:.2f} dB at {freq[peak_i]:.0f} Hz")
    print(f"wrote:            {OUT_IMG.name}")


if __name__ == "__main__":
    main()
