from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import FuncFormatter

SCRIPT_DIR = Path(__file__).parent


def format_bytes(value, _pos):
    """Format a byte count as e.g. '1 B', '100 B', '1 kB', '10 kB'."""
    if value < 1000:
        return f'{value:g} B'
    return f'{value / 1000:g} kB'


def format_percent(value, _pos):
    """Format an overhead value as a percentage, e.g. '1%', '10%', '100%'."""
    return f'{value:g}%'


def main():
    create_cobs_vs_slip_overhead()


def create_cobs_vs_slip_overhead():
    """Encoding overhead (as a % of payload size) for COBS vs SLIP byte
    stuffing, in both the worst case and the average case (uniformly random
    data). One delimiter byte per frame is included in every total."""
    n = np.logspace(0, 4, 400)  # payload size, 1 B .. 10 kB

    # SLIP: ESC + END must each be escaped (worst case: every byte escaped).
    slip_worst = (n + 1.0) / n * 100.0          # every byte doubles, + 1 delimiter
    slip_avg = (2.0 / 256.0 * n + 1.0) / n * 100.0  # 2 of 256 values escaped

    # COBS: 1 overhead byte per block of up to 254 non-zero bytes.
    q = 255.0 / 256.0
    r_cobs = (1.0 / 256.0 * q**254) / (1.0 - q**254)  # avg overhead per payload byte
    cobs_worst = (np.ceil(n / 254.0) + 1.0) / n * 100.0
    cobs_avg = (r_cobs * n + 1.0) / n * 100.0

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(n, slip_worst, color='C3', label='SLIP, worst case')
    ax.plot(n, cobs_worst, color='C0', label='COBS, worst case')
    ax.plot(n, slip_avg, color='C3', linestyle='--', label='SLIP, average (random data)')
    ax.plot(n, cobs_avg, color='C0', linestyle='--', label='COBS, average (random data)')

    ax.set_xscale('log')
    ax.set_yscale('log')
    ax.xaxis.set_major_formatter(FuncFormatter(format_bytes))
    ax.yaxis.set_major_formatter(FuncFormatter(format_percent))
    ax.set_xlabel('Payload size')
    ax.set_ylabel('Encoding overhead (% of payload)')
    ax.set_title('COBS vs SLIP encoding overhead')
    ax.grid(True, which='both', alpha=0.4)
    ax.legend()

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'cobs-vs-slip-overhead.png', dpi=120)


if __name__ == '__main__':
    main()
