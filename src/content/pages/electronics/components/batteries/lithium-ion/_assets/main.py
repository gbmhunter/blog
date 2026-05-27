"""
Lithium-ion battery self-discharge plot.

Plots state of charge (SoC) as a percentage of the initial value against time
in months for three monthly self-discharge rates: 1 %, 3 % and 5 %. The decay
is exponential because each month's loss is a percentage of the *remaining*
charge:

    SoC(t) = 100 · (1 − r)^t

Run from this directory to regenerate the SVG referenced by the lithium-ion
batteries MDX page.
"""

import os
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


SCRIPT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))


def main():
    # Time axis in months — 0 to 60 months (5 years).
    t = np.linspace(0, 60, 601)  # 0.1-month resolution → smooth curve

    # (rate, label, color) per series.
    # Colours match the brand red / amber-yellow / green palette used in the
    # blog's other charts.
    series = [
        (0.01, '1 % / month', '#2d9d4f'),  # green — quality cell
        (0.03, '3 % / month', '#eab308'),  # yellow — middling
        (0.05, '5 % / month', '#c60e00'),  # red — high self-discharge
    ]

    fig, ax = plt.subplots(figsize=(7, 4.2))

    for rate, label, color in series:
        soc = 100.0 * (1.0 - rate) ** t
        ax.plot(t, soc, label=label, color=color, linewidth=2.2)

    ax.set_xlabel('Time (months)')
    ax.set_ylabel('State of charge (%)')
    ax.set_title('Lithium-ion battery self-discharge')

    ax.set_xlim(0, 60)
    ax.set_ylim(0, 100)
    ax.set_xticks(np.arange(0, 61, 6))
    ax.set_yticks(np.arange(0, 101, 20))
    ax.grid(which='both', color='#d1d5db', linewidth=0.5)

    ax.legend(loc='upper right', frameon=True, framealpha=0.9)

    fig.tight_layout()

    out_path = SCRIPT_DIR / 'lithium-ion-self-discharge-vs-time.svg'
    fig.savefig(out_path)
    print(f'Wrote {out_path}')


if __name__ == '__main__':
    main()
