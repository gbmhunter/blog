from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt

import util

SCRIPT_DIR = Path(__file__).parent

def main():
    create_vin_vout_plot()
    create_freq_response_plot()

def create_vin_vout_plot():
    micro_cap_output_path = SCRIPT_DIR / 'common-emitter-amplifier-simulation.TNO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])    

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(8, 8))
    ax = axes[0]
    ax.plot(df['T'], df['v(IN)']*1e3, label="$v_{in}$")
    ax.set_xlabel('$Time\ [s]$')
    ax.set_ylabel('$Voltage\ [mV]$')
    ax.set_title('$v_{in}$')
    ax.grid()
    # ax.legend()

    ax = axes[1]
    ax.plot(df['T'], df['v(OUT)'], label="$v_{out}$", color='C1')
    ax.set_xlabel('$Time\ [s]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$v_{out}$')
    ax.grid()
    # ax.legend()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'common-emitter-amplifier-simulation-vin-vout-plot.png')

def create_freq_response_plot():
    micro_cap_output_path = SCRIPT_DIR / 'common-emitter-amplifier-simulation.ANO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])    

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(8, 8))

    ax = axes[0]
    ax.plot(df['F'], df['dB(v(OUT)/v(IN))'])
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Gain\ [dB]$')

    ax.set_xscale('log')
    ax.grid()

    ax = axes[1]
    ax.plot(df['F'], df['ph(v(OUT)/v(IN))'])
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Phase\ [\circ]$')

    ax.set_xscale('log')
    ax.grid()


    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'common-emitter-amplifier-simulation-freq-response-plot.png')


if __name__ == '__main__':
    main()
