# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "numpy",
#   "matplotlib",
# ]
# ///
"""Generate illustrative UIS test waveforms for the MOSFETs avalanche section.

Two side-by-side plots:
  - Left:  Id (drain current) and Vav (drain-source / avalanche voltage) vs time
  - Right: Power and Energy (integral of Power) vs time

Values are illustrative. The right-plot Energy is scaled by 50x so it shares
the same y-axis as Power, mirroring the convention used in onsemi AND90158
Figure 3.

Output: uis-waveforms.png in this directory.
"""

import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path


# Test parameters (illustrative — chosen so peak Id, Vav, and total avalanche
# energy roughly match the reference figure).
T_RAMP = 100e-6      # charge phase: Id ramps up [s]
T_AVAL = 80e-6       # avalanche phase: Id ramps down [s]
T_END = 400e-6       # plot extends to here for the post-avalanche tail [s]
I_PK = 50.0          # peak drain current [A]
V_BR = 50.0          # avalanche breakdown voltage [V]
V_OS = 12.0          # initial Vav overshoot above V_BR at avalanche entry [V]
V_OS_TAU = 1.5e-6    # overshoot decay time constant [s]


def build_waveforms():
    N = 8000
    t = np.linspace(0, T_END, N)
    dt = t[1] - t[0]

    # Id: linear ramp up during charge, linear ramp down during avalanche, ~0 after
    Id = np.zeros_like(t)
    m_charge = t < T_RAMP
    Id[m_charge] = I_PK * t[m_charge] / T_RAMP
    m_aval = (t >= T_RAMP) & (t < T_RAMP + T_AVAL)
    Id[m_aval] = I_PK * (1.0 - (t[m_aval] - T_RAMP) / T_AVAL)
    # Brief Id spike at avalanche entry (parasitic capacitance discharge)
    m_spike = (t >= T_RAMP) & (t < T_RAMP + 6e-6)
    Id[m_spike] += 6.0 * np.exp(-(t[m_spike] - T_RAMP) / 1e-6)

    # Vav: 0 during charge, clamped at V_BR during avalanche (with overshoot
    # spike at entry), ringing down to 0 in the tail
    Vav = np.zeros_like(t)
    Vav[m_aval] = V_BR
    Vav[m_spike] = V_BR + V_OS * np.exp(-(t[m_spike] - T_RAMP) / V_OS_TAU)
    m_tail = t >= T_RAMP + T_AVAL
    t_tail = t[m_tail] - (T_RAMP + T_AVAL)
    ring_freq = 80e3
    ring_decay = 2e4
    Vav[m_tail] = (
        7.0 * np.exp(-ring_decay * t_tail) * np.cos(2 * np.pi * ring_freq * t_tail) + 2.5
    )
    Vav[m_tail] = np.maximum(Vav[m_tail], 0)
    

    P = Vav * Id
    E_mJ = np.cumsum(P) * dt * 1000.0          # mJ
    E_scaled = E_mJ * 50.0                     # mJ x 50 (shares axis with Power)

    return t, Id, Vav, P, E_scaled


def plot(t, Id, Vav, P, E_scaled, out_path):
    t_us = t * 1e6
    t_end_us = T_END * 1e6

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    # Left: Id and Vav
    ax1.plot(t_us, Vav, color="#1a3a8c", linewidth=0.9, label=r"$V_{av}$")
    ax1.plot(t_us, Id, color="#e63aa3", linewidth=1.4, label=r"$I_D$")
    ax1.set_title("MOSFET Drain Current and Avalanche Voltage")
    ax1.set_xlabel("time (µs)")
    ax1.set_ylabel(r"$I_D$ (A), $V_{av}$ (V)")
    ax1.set_xlim(0, t_end_us)
    ax1.set_ylim(0, 80)
    ax1.grid(True, color="#bbb", linewidth=0.4)
    ax1.legend(loc="upper right")

    # Right: Power and Energy
    ax2.plot(t_us, P, color="#1a3a8c", linewidth=0.9, label="Power")
    ax2.plot(t_us, E_scaled, color="#e63aa3", linewidth=1.4, label="Energy")
    ax2.set_title("Power and Energy Through MOSFET During Avalanche")
    ax2.set_xlabel("time (µs)")
    ax2.set_ylabel(r"Energy (mJ $\times$ 50), Power (W)")
    ax2.set_xlim(0, t_end_us)
    ax2.set_ylim(0, 6000)
    ax2.grid(True, color="#bbb", linewidth=0.4)
    ax2.legend(loc="upper right")

    plt.tight_layout()
    plt.savefig(out_path, dpi=150)
    print(f"Saved {out_path}")


def main():
    t, Id, Vav, P, E_scaled = build_waveforms()
    out_path = Path(__file__).parent / "unclamped-inductive-load-test-circuit-waveforms.png"
    plot(t, Id, Vav, P, E_scaled, out_path)


if __name__ == "__main__":
    main()
