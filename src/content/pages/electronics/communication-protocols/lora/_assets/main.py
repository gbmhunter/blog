# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "matplotlib>=3.8",
#   "numpy>=1.26",
# ]
# ///
"""
LoRa chirp symbol encoding plot.

Plots instantaneous frequency against time for the four symbols of a
simplified 2-bit-per-symbol chirp scheme on a 1-2 kHz channel. Each symbol
starts at a different frequency offset (the data), sweeps up to the top of the
channel, wraps around to the bottom and continues sweeping up until it returns
to its starting frequency. Every symbol sweeps the full bandwidth and lasts the
same time:

    f(t) = f_low + BW · ((k / M + t / T) mod 1)

where k is the symbol value, M = 2^SF is the number of possible symbols, and T
is the symbol duration.

Run from this directory to regenerate the SVG referenced by the LoRa MDX page.
"""

import os
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


SCRIPT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))

F_LOW_KHZ = 1.0
BW_KHZ = 1.0
NUM_SYMBOLS = 4  # 2 bits per symbol
COLOR = '#c60e00'  # brand red


def main():
    t = np.linspace(0, 1, 1001)  # Time normalised to the symbol duration T

    fig, axes = plt.subplots(1, NUM_SYMBOLS, figsize=(10, 3.2), sharey=True)

    for k, ax in enumerate(axes):
        offset = k / NUM_SYMBOLS
        # Symbol 0 is a plain up-chirp that ends exactly at the top of the
        # channel, so skip the modulo to stop the last sample wrapping to 0.
        phase = t if offset == 0 else (offset + t) % 1.0
        f = F_LOW_KHZ + BW_KHZ * phase

        # Split at the wrap point so matplotlib doesn't draw a vertical line
        # joining the top and bottom of the channel.
        wrap_idx = np.where(np.diff(phase) < 0)[0]
        if wrap_idx.size:
            i = wrap_idx[0] + 1
            t_wrap = 1.0 - offset
            ax.plot(np.append(t[:i], t_wrap), np.append(f[:i], F_LOW_KHZ + BW_KHZ), color=COLOR, linewidth=2.2)
            ax.plot(np.insert(t[i:], 0, t_wrap), np.insert(f[i:], 0, F_LOW_KHZ), color=COLOR, linewidth=2.2)
            ax.plot([t_wrap, t_wrap], [F_LOW_KHZ + BW_KHZ, F_LOW_KHZ], color=COLOR, linewidth=1.2, linestyle=':')
        else:
            ax.plot(t, f, color=COLOR, linewidth=2.2)

        # Mark the starting frequency, which is what carries the data.
        ax.plot(0, f[0], marker='o', color=COLOR, markersize=6)
        ax.annotate(f'{f[0]:.2f} kHz', xy=(0, f[0]), xytext=(6, 4), textcoords='offset points', fontsize=9)

        ax.set_title(f'Symbol {k:02b}', fontfamily='monospace')
        ax.set_xlim(0, 1)
        ax.set_ylim(F_LOW_KHZ - 0.05, F_LOW_KHZ + BW_KHZ + 0.05)
        ax.set_xticks([0, 0.5, 1])
        ax.set_xticklabels(['0', 'T/2', 'T'])
        ax.set_xlabel('Time')
        ax.grid(color='#d1d5db', linewidth=0.5)

    axes[0].set_ylabel('Frequency (kHz)')
    axes[0].set_yticks(np.arange(F_LOW_KHZ, F_LOW_KHZ + BW_KHZ + 0.01, 0.25))

    fig.tight_layout()

    out_path = SCRIPT_DIR / 'lora-chirp-symbols-frequency-vs-time.svg'
    fig.savefig(out_path)
    print(f'Wrote {out_path}')


if __name__ == '__main__':
    main()
