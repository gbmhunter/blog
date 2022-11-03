from cProfile import label
import csv
from turtle import color
import matplotlib.pyplot as plt
plt.rcParams['axes.facecolor'] = 'white'
import numpy as np
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

limits = {
    'CN_FCC15_SPTB_CLASS_A_AVG':
    [
        (150e3, 66),
        (500e3, 66),
        (500e3, 60),
        (30e6, 60)
    ],
    'CN_FCC15_SPTB_CLASS_A_QP':
    [
        (150e3, 79),
        (500e3, 79),
        (500e3, 73),
        (30e6, 73)
    ]
}

freq_of_interest = {
    'SMPS_1': [487.8e3, 'black'],
    'SMPS_2': [604.6e3, '#7e1e9c'],
    'SMPS_3': [963.28e3, '#15b01a'],
    'SMPS_4': [963.28e3, '#e50000']
}

def main():
    fig, axes = plt.subplots(figsize=(25, 14), nrows=2, ncols=2)
    plot_avg_and_qp('OLD (original design)', axes[0][0], axes[0][1], Path(SCRIPT_DIR / 'old-measurements.csv'), Path(SCRIPT_DIR / 'old-noise-floor.csv'))
    plot_avg_and_qp('NEW (improved EMC routing/filtering)', axes[1][0], axes[1][1], Path(SCRIPT_DIR / 'new-measurements.csv'), Path(SCRIPT_DIR / 'new-noise-floor.csv'))
    fig.tight_layout()
    fig.savefig(SCRIPT_DIR / 'result-plot.png')

def read_sg_csv(file_path: Path):
    freqs_Hz = []
    avgs_dBuV = []
    quasi_peaks_dBuV = []
    with file_path.open() as file:
        csv_reader = csv.reader(file, delimiter=';')

        for idx, row in enumerate(csv_reader):
            if idx == 0:
                continue
            freqs_Hz.append(float(row[0]))
            avgs_dBuV.append(float(row[1].replace(',', '.')))
            quasi_peaks_dBuV.append(float(row[3].replace(',', '.')))

    freqs_Hz = np.array(freqs_Hz)
    avgs_dBuV = np.array(avgs_dBuV)
    quasi_peaks_dBuV = np.array(quasi_peaks_dBuV)

    return (freqs_Hz, avgs_dBuV, quasi_peaks_dBuV)

def plot_avg_and_qp(title, ax1, ax2, measured_data_path, noise_floor_data_path):

    (freqs_Hz, avgs_dBuV, quasi_peaks_dBuV) = read_sg_csv(measured_data_path)
    (nf_freqs_Hz, nf_avgs_dBuV, nf_quasi_peaks_dBuV) = read_sg_csv(noise_floor_data_path)

    #====================
    # AVERAGE
    #====================
    ax1.plot(freqs_Hz/1e6, avgs_dBuV, label='Live measurement', color='mediumblue')
    ax1.plot(freqs_Hz/1e6, nf_avgs_dBuV, label='Noise floor', color='skyblue')
    
    limit_vertices = limits['CN_FCC15_SPTB_CLASS_A_AVG']
    limit_vertices = np.array(limit_vertices)
    ax1.plot(limit_vertices[:, 0]/1e6, limit_vertices[:, 1], label='FCC15 Class A AVG Limit', color='r')

    ax1.set_xlabel('Frequency [MHz]')
    ax1.set_xscale('log')
    ax1.set_ylabel('Conducted Noise [dBuV]')
    ax1.set_ylim(0, 90)
    ax1.set_title(f'{title}\nAverage')
    ax1.grid(which='both')

    #====================
    # NOISE FLOOR
    #====================
    ax2.plot(freqs_Hz/1e6, quasi_peaks_dBuV, label='Live measurement', color='mediumblue')
    ax2.plot(freqs_Hz/1e6, nf_quasi_peaks_dBuV, label='Noise floor', color='skyblue')

    # Plot limit
    limit_vertices = limits['CN_FCC15_SPTB_CLASS_A_QP']
    limit_vertices = np.array(limit_vertices)
    ax2.plot(limit_vertices[:, 0]/1e6, limit_vertices[:, 1], label='FCC15 Class A QP Limit', color='r')

    ax2.set_xlabel('Frequency [MHz]')
    ax2.set_xscale('log')
    ax2.set_ylabel('Conducted Noise [dBuV]')
    ax2.set_ylim(0, 90)
    ax2.set_title(f'{title}\nQuasi-peak')
    ax2.grid(which='both')

    for rail, freq in freq_of_interest.items():
        ax1.axvline(freq[0]/1e6,0.5,1, ls='dashed', label=rail, color=freq[1])
        ax2.axvline(freq[0]/1e6,0.5,1, ls='dashed', label=rail, color=freq[1])
    ax1.legend()
    ax2.legend()

if __name__ == '__main__':
    main()