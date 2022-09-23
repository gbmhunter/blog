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
    micro_cap_output_path = SCRIPT_DIR / 'low-pass-sallen-key-mn-ratios.ANO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])    

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(8, 8))

    ax = axes[0]
    ax.plot(df['F'], df['dB(v(OUT)/v(IN))'])  

    ax = axes[1]
    ax.plot(df['F'], df['ph(v(OUT)/v(IN))'])

    ax = axes[0]
    # ax.axvline(10e3, label='Fundamental frequency (10kHz)', color='#040bd4', linestyle='--')
    # ax.axvline(30e3, label='1st harmonic (30kHz)', color='#d404cd', linestyle='--')
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Gain\ [dB]$')      
    ax.set_xscale('log')
    ax.grid()
    ax.legend()

    ax = axes[1]
    # ax.axvline(10e3, label='Fundamental frequency (10kHz)', color='#040bd4', linestyle='--')
    # ax.axvline(30e3, label='1st harmonic (30kHz)', color='#d404cd', linestyle='--')
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Phase\ [\circ]$')
    ax.set_xscale('log')
    ax.grid()
    ax.legend()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'low-pass-sallen-key-mn-ratios-bode-plot.png')


if __name__ == '__main__':
    main()
