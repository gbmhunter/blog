from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import FuncFormatter

SCRIPT_DIR = Path(__file__).parent


def si_formatter(unit):
    """Return a tick formatter that prefixes the value with a metric prefix,
    e.g. 1000 m -> '1 km', 1e6 bit/s -> '1 Mbit/s'."""
    prefixes = [(1e9, 'G'), (1e6, 'M'), (1e3, 'k'), (1.0, '')]

    def fmt(value, _pos):
        for factor, prefix in prefixes:
            if value >= factor:
                return f'{value / factor:g} {prefix}{unit}'
        return f'{value:g} {unit}'

    return FuncFormatter(fmt)


def main():
    create_data_rate_vs_cable_length()


def create_data_rate_vs_cable_length():
    # RS-422 max cable length vs data rate. The cable length is flat at ~1200 m
    # for low data rates up to a knee at ~90 kbit/s, then falls with a constant
    # slope on log-log scales, passing through ~12 m at 10 Mbit/s.
    flat_length = 1200.0  # m
    knee_rate = 90e3  # bit/s
    # Slope chosen so the line passes through (10 Mbit/s, 12 m).
    ref_rate = 10e6  # bit/s
    ref_length = 12.0  # m
    slope = np.log10(ref_length / flat_length) / np.log10(ref_rate / knee_rate)

    x_flat = np.array([1e2, knee_rate])
    y_flat = np.array([flat_length, flat_length])

    x_slope = np.logspace(np.log10(knee_rate), np.log10(ref_rate), 200)
    y_slope = flat_length * (x_slope / knee_rate) ** slope

    x = np.concatenate([x_flat, x_slope])
    y = np.concatenate([y_flat, y_slope])

    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(x, y, color='#1f77b4', linewidth=2.5)

    ax.set_xscale('log')
    ax.set_yscale('log')
    ax.set_xlim(1e2, 1e7)
    ax.set_ylim(1, 1e4)
    ax.set_xlabel('Data Rate')
    ax.set_ylabel('Cable Length')
    ax.xaxis.set_major_formatter(si_formatter('bit/s'))
    ax.yaxis.set_major_formatter(si_formatter('m'))

    ax.grid(which='major', color='black', linewidth=0.8)
    ax.grid(which='minor', color='black', linewidth=0.4, alpha=0.6)
    ax.set_axisbelow(True)

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'data-rate-vs-cable-length.png', dpi=120)


if __name__ == '__main__':
    main()
