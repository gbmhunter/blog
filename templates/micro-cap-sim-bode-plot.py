from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy import signal
import scipy.fft

import util

SCRIPT_DIR = Path(__file__).parent

def main():
    create_freq_response_plot()

def create_freq_response_plot():
    micro_cap_output_path = SCRIPT_DIR / 'simulation.ANO'

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(8, 8))

    ax = axes[0]
    ax.plot(df['F'], df['dB(v(OUT)/v(IN))'])
    ax.axvline(2e3, label='$f_c$', color='C1', linestyle='--')
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Gain\ [dB]$')      
    ax.set_xscale('log')
    ax.grid()
    ax.legend()

    ax = axes[1]
    ax.plot(df['F'], df['ph(v(OUT)/v(IN))'])
    ax.axvline(2e3, label='$f_c$', color='C1', linestyle='--')
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Phase\ [\circ]$')
    ax.set_xscale('log')
    ax.grid()
    ax.legend()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'bode-plot.png')


if __name__ == '__main__':
    main()
