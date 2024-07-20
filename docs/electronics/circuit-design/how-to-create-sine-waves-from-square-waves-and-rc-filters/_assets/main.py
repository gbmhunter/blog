from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy import signal
import scipy.fft

import util

SCRIPT_DIR = Path(__file__).parent

def main():
    # create_square_wave_fft_plot()
    # create_vin_vout_plot()
    # create_freq_response_plot()
    create_thd_plots()

def create_square_wave_fft_plot():
    micro_cap_output_path = SCRIPT_DIR / 'sim-four-stage-rc-filter.TNO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])

    time = df['T']
    square_wave = df['v(IN)']
    num_samples = len(square_wave)

    sqaure_wave_fft = scipy.fft.fft(square_wave.values)
    sqaure_wave_fft = sqaure_wave_fft[:num_samples//2]

    sampling_period_s = time[1] - time[0]
    xf = scipy.fft.fftfreq(num_samples, sampling_period_s)[:num_samples//2]

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(10, 10))
    ax = axes[0]
    ax.plot(time*1e6, square_wave, label="$v_{in}$")
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$V_{IN}$ (10kHz square wave, time domain)')
    ax.set_xlim(0, 500)
    ax.grid()

    ax = axes[1]
    ax.plot(xf/1e3, (1.0/num_samples) * np.abs(sqaure_wave_fft), label="$v_{in}$")
    ax.set_xlabel('$Frequency\ [kHz]$')
    ax.set_ylabel('$Magnitude\ [V]$')
    ax.set_title('FFT Of $V_{IN}$ (frequency domain)')

    ax.set_xlim(0, 100)
    ax.grid()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'sim-four-stage-rc-filter-fft-of-input-plot.png')

def create_vin_vout_plot():
    micro_cap_output_path = SCRIPT_DIR / 'sim-four-stage-rc-filter.TNO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])    

    fig, axes = plt.subplots(ncols=1, nrows=5, figsize=(8, 15))
    ax = axes[0]
    ax.plot(df['T']*1e6, df['v(IN)'], label="$v_{in}$")
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$V_{IN}$')
    ax.grid()
    # ax.legend()

    ax = axes[1]
    ax.plot(df['T']*1e6, df['v(OUT1)'], label="$v_{out}$", color='C1')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$V_{OUT1}$')
    ax.grid()

    ax = axes[2]
    ax.plot(df['T']*1e6, df['v(OUT2)'], label="$v_{out}$", color='C1')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$V_{OUT2}$')
    ax.grid()

    ax = axes[3]
    ax.plot(df['T']*1e6, df['v(OUT3)'], label="$v_{out}$", color='C1')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$V_{OUT3}$')
    ax.grid()

    ax = axes[4]
    ax.plot(df['T']*1e6, df['v(OUT4)'], label="$v_{out}$", color='C1')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.set_title('$V_{OUT4}$')
    ax.grid()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'sim-four-stage-rc-filter-output-plot.png')

def create_freq_response_plot():
    micro_cap_output_path = SCRIPT_DIR / 'sim-four-stage-rc-filter.ANO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])    

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(8, 8))

    # Green to red
    colors = [
        '#1aab03',
        '#c9d404',
        '#d47304',
        '#d40404',
    ]

    for idx in range(4):
        i = idx + 1
        ax = axes[0]
        ax.plot(df['F'], df[f'dB(v(OUT{i})/v(IN))'], label=f'OUT{i}', color=colors[idx])  

        ax = axes[1]
        ax.plot(df['F'], df[f'ph(v(OUT{i})/v(IN))'], label=f'OUT{i}', color=colors[idx])

    ax = axes[0]
    ax.axvline(10e3, label='Fundamental frequency (10kHz)', color='#040bd4', linestyle='--')
    ax.axvline(30e3, label='1st harmonic (30kHz)', color='#d404cd', linestyle='--')
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Gain\ [dB]$')      
    ax.set_xscale('log')
    ax.grid()
    ax.legend()

    ax = axes[1]
    ax.axvline(10e3, label='Fundamental frequency (10kHz)', color='#040bd4', linestyle='--')
    ax.axvline(30e3, label='1st harmonic (30kHz)', color='#d404cd', linestyle='--')
    ax.set_xlabel('$Frequency\ [Hz]$')
    ax.set_ylabel('$Phase\ [\circ]$')
    ax.set_xscale('log')
    ax.grid()
    ax.legend()

    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'sim-four-stage-rc-filter-bode-plot.png')

def create_thd_plots():
    micro_cap_output_path = SCRIPT_DIR / 'sim-four-stage-rc-filter.TNO'    

    df = pd.read_csv(micro_cap_output_path, delim_whitespace=True, skiprows=[0, 1, 3])

    fig, axes = plt.subplots(ncols=2, nrows=5, figsize=(12, 20))

    thds = []

    def calculate_for_one(config_data, waveform_ax, fft_ax):
        waveform_id = config_data[0]
        plot_title = config_data[1]

        time = df['T'].values
        out_wave = df[waveform_id].values

        # We have 2ms of data. By the end of the 1st ms, the circuit has stabilized, let's just use 1-2ms
        mask = time >= 1e-3
        time = time[mask]
        out_wave = out_wave[mask]

        # Remove DC offset
        out_wave = out_wave - np.mean(out_wave)

        num_samples = len(out_wave)

        sqaure_wave_fft = scipy.fft.fft(out_wave)
        sqaure_wave_fft = sqaure_wave_fft[:num_samples//2]

        sampling_period_s = time[1] - time[0]
        xf = scipy.fft.fftfreq(num_samples, sampling_period_s)[:num_samples//2]

        ax = waveform_ax
        ax.plot(time*1e6, out_wave, label="$v_{in}$")
        ax.set_xlabel('$Time\ [us]$')
        ax.set_ylabel('$Voltage\ [V]$')
        ax.set_title(plot_title)
        ax.set_xlim(1000, 2000)
        ax.grid()

        ax = fft_ax
        ax.plot(xf/1e3, (1.0/num_samples) * np.abs(sqaure_wave_fft), label="$v_{in}$")
        ax.set_xlabel('$Frequency\ [kHz]$')
        ax.set_ylabel('$Magnitude\ [V]$')
        ax.set_title(f'FFT Of {plot_title}')
        ax.set_xlim(0, 100)
        ax.grid()

        # Now calculate THD
        fft_mag = (1.0/num_samples) * np.abs(sqaure_wave_fft)
        mask = xf >= 20e3
        fft_mag_harmonics = fft_mag[mask] 

        # Convert peaks to RMS
        fft_mag_harmonics_rms = fft_mag_harmonics / np.sqrt(2)
        numerator = np.sqrt(np.sum(fft_mag_harmonics**2))

        # Need to get Vrms of fundamental
        mask = xf < 20e3
        ftt_mag_fundamental = fft_mag[mask]
        denominator = np.sqrt(np.sum((ftt_mag_fundamental / np.sqrt(2))**2))

        thd = numerator / denominator
        thds.append(thd)

    config_datas = [
        ['v(IN)',    '$V_{IN}$'],
        ['v(OUT1)',  '$V_{OUT1}$'],
        ['v(OUT2)',  '$V_{OUT2}$'],
        ['v(OUT3)',  '$V_{OUT3}$'],
        ['v(OUT4)',  '$V_{OUT4}$'],
    ]

    for i in range(5):
        calculate_for_one(config_datas[i], axes[i][0], axes[i][1])
    
    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'sim-four-stage-rc-filter-thd.png')

    # Now create single THD plot
    fig, ax = plt.subplots(figsize=(8, 5))
    bar_names = [
        '$V_{IN}$',
        '$V_{OUT1}$',
        '$V_{OUT2}$',
        '$V_{OUT3}$',
        '$V_{OUT4}$',
    ]
    thds = np.array(thds)
    ax.bar(bar_names, thds*1e2)
    ax.set_ylabel('THD [%]')
    util.add_watermark_to_fig(fig)
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'sim-four-stage-rc-filter-thd-bar-plot.png')


if __name__ == '__main__':
    main()
