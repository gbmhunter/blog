from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.ticker import StrMethodFormatter, NullFormatter
import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    plot_fcc15_unintentional_radiators_conductive()

def plot_fcc15_unintentional_radiators_conductive():
    fig, axes = plt.subplots(ncols=2, nrows=1, figsize=(10, 5))

    fig.suptitle('FCC Part 15, Unintentional Radiators\nConductive Limits')

    ###########
    # CLASS A
    ###########
    ax = axes[0]
    freq_MHz =   [ 0.15, 0.5, 0.5, 30 ]
    limit_dbuV = [ 79,   79,  73,  73 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class A, Quasi-Peak")
    freq_MHz =   [ 0.15, 0.5, 0.5, 30 ]
    limit_dbuV = [ 66,   66,  60,  60 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class A, Average")

    # Log for frequency
    ax.set_xscale('log')
    # Disable minor ticks from the log x-axis, and remove scientific notation from major ticks
    ax.xaxis.set_major_formatter(StrMethodFormatter('{x:.0f}'))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_title('Class A')
    ax.set_xlabel('Frequency [MHz]')
    ax.set_ylabel('Conductive Limit [dBuV]')
    ax.set_ylim(0, 100)
    ax.legend()
    ax.grid(which='both', axis='x')
    ax.grid(which='major', axis='y')
    
    ###########
    # CLASS B
    ###########
    ax = axes[1]
    freq_MHz =   [ 0.15, 0.5, 0.5, 5,  5,  30 ]
    limit_dbuV = [ 66,   56,  56,  56, 60, 60 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class B, Quasi-Peak")
    freq_MHz =   [ 0.15, 0.5, 0.5, 5,  5,  30 ]
    limit_dbuV = [ 56,   46,  46,  46, 50, 50 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class B, Average")

    # Log for frequency
    ax.set_xscale('log')
    # Disable minor ticks from the log x-axis, and remove scientific notation from major ticks
    ax.xaxis.set_major_formatter(StrMethodFormatter('{x:.0f}'))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_title('Class B')
    ax.set_xlabel('Frequency [MHz]')
    ax.set_ylabel('Conductive Limit [dBuV]')
    ax.set_ylim(0, 100)
    ax.legend()
    ax.grid(which='both', axis='x')
    ax.grid(which='major', axis='y')

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'fcc-part15-unintentional-radiators-conductive-limits.png')


if __name__ == '__main__':
    main()