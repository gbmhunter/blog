from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.ticker import NullFormatter, FuncFormatter
import numpy as np

SCRIPT_DIR = Path(__file__).parent

_PREFIXES = [(1e12, 'T'), (1e9, 'G'), (1e6, 'M'), (1e3, 'k'),
             (1, ''), (1e-3, 'm'), (1e-6, 'µ'), (1e-9, 'n'), (1e-12, 'p')]

def metric_prefix(value, _pos=None):
    """Format an axis tick value with a metric prefix, no unit: 1e6 -> '1M'."""
    if value == 0:
        return '0'
    a = abs(value)
    for factor, symbol in _PREFIXES:
        if a >= factor:
            return f'{value / factor:g}{symbol}'
    return f'{value:g}'

def main():
    plot_capacitor_impedance_vs_frequency()

def plot_capacitor_impedance_vs_frequency():
    """Annotated impedance magnitude of a real (non-ideal) capacitor vs.
    frequency, showing the capacitive region, the self-resonant frequency (SRF)
    where the impedance bottoms out at the ESR, and the inductive region."""
    C = 1e-6      # 1uF capacitance
    ESR = 20e-3   # 20mΩ equivalent series resistance
    ESL = 0.8e-9  # 0.8nH equivalent series inductance

    freq_Hz = np.logspace(3, 9, 2000)  # 1kHz to 1GHz
    Xc = 1.0 / (2 * np.pi * freq_Hz * C)
    Xl = 2 * np.pi * freq_Hz * ESL
    Z = np.sqrt(ESR**2 + (Xl - Xc)**2)

    f_srf = 1.0 / (2 * np.pi * np.sqrt(ESL * C))

    fig, ax = plt.subplots(figsize=(8, 5))
    fig.suptitle('Real 1µF Capacitor\nImpedance Magnitude vs. Frequency')

    # Keep the grid behind the data so the curves and annotations read clearly.
    ax.set_axisbelow(True)

    # Ideal reactance (no ESR/ESL) for comparison.
    ax.plot(freq_Hz, Xc, color='#444444', linestyle='--', linewidth=1.8,
            label='Ideal reactance $X_C = 1/(2\\pi f C)$', zorder=2)
    # Real capacitor impedance magnitude.
    ax.plot(freq_Hz, Z, color='tab:blue', linewidth=2.8, zorder=4,
            label='Real |Z| (with ESR + ESL)')

    # ESR floor.
    ax.axhline(ESR, color='#1a9620', linestyle='--', linewidth=2,
               label=f'ESR = {ESR*1e3:.0f} mΩ', zorder=3)

    # Self-resonant frequency.
    ax.axvline(f_srf, color='tab:orange', linestyle='--', linewidth=1.8, zorder=3)
    ax.plot(f_srf, ESR, 'o', color='tab:orange', markersize=10,
            markeredgecolor='white', markeredgewidth=1.2, zorder=5)
    ax.annotate(f'SRF ≈ {f_srf/1e6:.1f} MHz', xy=(f_srf, ESR),
                xytext=(24, 10), textcoords='offset points', fontsize=12,
                fontweight='bold', color='tab:orange', zorder=6)

    # Region labels.
    ax.text(3e4, 30, 'Capacitive\n(acts as C)', ha='center', fontsize=11,
            fontweight='bold', color='tab:blue')
    ax.text(2e8, 30, 'Inductive\n(acts as L)', ha='center', fontsize=11,
            fontweight='bold', color='tab:blue')

    ax.set_xscale('log')
    ax.set_yscale('log')
    # Metric-prefix tick labels (1k, 10k, 1M, 10m, ...) on the decade majors,
    # matching the interactive calculator tool. Minor ticks stay unlabelled.
    ax.xaxis.set_major_formatter(FuncFormatter(metric_prefix))
    ax.yaxis.set_major_formatter(FuncFormatter(metric_prefix))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.yaxis.set_minor_formatter(NullFormatter())
    ax.set_xlabel('Frequency [Hz]')
    ax.set_ylabel('Impedance |Z| [Ω]')
    ax.set_ylim(1e-2, 1e3)
    ax.legend(loc='upper center', fontsize=10)
    # Log grid: visible decade majors, slightly lighter minors.
    ax.grid(which='major', color='#9a9a9a', linewidth=0.7, alpha=0.9)
    ax.grid(which='minor', color='#bcbcbc', linewidth=0.5, alpha=0.8)

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'capacitor-impedance-vs-frequency.png')

if __name__ == '__main__':
    main()
