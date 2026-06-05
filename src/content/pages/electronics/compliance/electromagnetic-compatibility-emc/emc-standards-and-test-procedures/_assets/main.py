from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.ticker import StrMethodFormatter, NullFormatter
import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    plot_fcc15_unintentional_radiators_conductive()
    plot_cispr11_conductive_limits()
    plot_lisn_inductor_reactance()

def plot_lisn_inductor_reactance():
    """Reactance of the 50uH LISN series inductor vs. frequency, highlighting
    the 50Hz mains point and the 150kHz-30MHz conducted-emissions band."""
    L = 50e-6  # 50uH series inductor

    fig, ax = plt.subplots(figsize=(8, 5))
    fig.suptitle('50µH LISN Inductor\nReactance vs. Frequency')

    # Sweep from below mains to above the measurement band
    freq_Hz = np.logspace(1, 8, 1000)  # 10Hz to 100MHz
    reactance_ohms = 2 * np.pi * freq_Hz * L
    ax.plot(freq_Hz, reactance_ohms, color='tab:blue', zorder=3)

    # Highlight the 150kHz-30MHz conducted-emissions measurement band
    ax.axvspan(150e3, 30e6, color='tab:orange', alpha=0.2,
               label='Conducted emissions band\n(150kHz - 30MHz)')

    # Highlight the 50Hz mains frequency
    x_50hz = 2 * np.pi * 50 * L
    ax.axvline(50, color='tab:green', linestyle='--',
               label=f'50Hz mains (X ≈ {x_50hz*1e3:.1f} mΩ)')
    ax.plot(50, x_50hz, 'o', color='tab:green', zorder=4)

    # Annotate the reactance at the band edges
    for f in (150e3, 30e6):
        x = 2 * np.pi * f * L
        ax.plot(f, x, 'o', color='tab:orange', zorder=4)
        ax.annotate(f'{x:.0f} Ω', xy=(f, x), xytext=(0, 8),
                    textcoords='offset points', ha='center', fontsize=8)

    # Log for both frequency and reactance (each spans many decades)
    ax.set_xscale('log')
    ax.set_yscale('log')
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_xlabel('Frequency [Hz]')
    ax.set_ylabel('Reactance $X_L$ [Ω]')
    ax.legend(loc='upper left')
    ax.grid(which='both', axis='x')
    ax.grid(which='both', axis='y')

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'lisn-inductor-reactance-vs-frequency.png')

def plot_fcc15_unintentional_radiators_conductive():
    fig, axes = plt.subplots(ncols=2, nrows=1, figsize=(10, 5))

    fig.suptitle('FCC Part 15, Unintentional Radiators\nConductive Limits')

    ###########
    # QUASI-PEAK
    ###########
    ax = axes[0]

    freq_MHz =   [ 0.15, 0.5, 0.5, 30 ]
    limit_dbuV = [ 79,   79,  73,  73 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class A, Quasi-Peak")
    
    freq_MHz =   [ 0.15, 0.5, 0.5, 5,  5,  30 ]
    limit_dbuV = [ 66,   56,  56,  56, 60, 60 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class B, Quasi-Peak")

    # Log for frequency
    ax.set_xscale('log')
    # Disable minor ticks from the log x-axis, and remove scientific notation from major ticks
    ax.xaxis.set_major_formatter(StrMethodFormatter('{x:.0f}'))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_title('Quasi-Peak Conductive Limits')
    ax.set_xlabel('Frequency [MHz]')
    ax.set_ylabel('Conductive Limit [dBuV]')
    ax.set_ylim(0, 100)
    ax.legend()
    ax.grid(which='both', axis='x')
    ax.grid(which='major', axis='y')
    
    ###########
    # Average
    ###########
    ax = axes[1]

    freq_MHz =   [ 0.15, 0.5, 0.5, 30 ]
    limit_dbuV = [ 66,   66,  60,  60 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class A, Average")

    freq_MHz =   [ 0.15, 0.5, 0.5, 5,  5,  30 ]
    limit_dbuV = [ 56,   46,  46,  46, 50, 50 ]
    ax.plot(freq_MHz, limit_dbuV, label="Class B, Average")

    # Log for frequency
    ax.set_xscale('log')
    # Disable minor ticks from the log x-axis, and remove scientific notation from major ticks
    ax.xaxis.set_major_formatter(StrMethodFormatter('{x:.0f}'))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_title('Average Conductive Limits')
    ax.set_xlabel('Frequency [MHz]')
    ax.set_ylabel('Conductive Limit [dBuV]')
    ax.set_ylim(0, 100)
    ax.legend()
    ax.grid(which='both', axis='x')
    ax.grid(which='major', axis='y')

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'fcc-part15-unintentional-radiators-conductive-limits.png')

def plot_cispr11_conductive_limits():
    fig, axes = plt.subplots(ncols=2, nrows=1, figsize=(10, 5))

    fig.suptitle('CISPR 11\nConductive Limits')

    ###########
    # QUASI-PEAK
    ###########
    ax = axes[0]

    # Group 1
    vertices = np.array([
        # freq_MHz, limit_dBuV
        [ 0.15, 79 ],
        [ 0.5,  79 ],
        [ 0.5,  73 ],
        [ 30,   73 ],
    ])
    ax.plot(vertices[:, 0], vertices[:, 1], label="Group 1")

    # Group 2, LP
    vertices = np.array([
        # freq_MHz, limit_dBuV
        [ 0.15, 100 ],
        [ 0.5,  100 ],
        [ 0.5,  86 ],
        [ 5,    86 ],
        [ 5,    90 ],
        [ 30,   73 ],
    ])
    ax.plot(vertices[:, 0], vertices[:, 1], label="Group 2 LP")

    # Group 2, HP
    vertices = np.array([
        # freq_MHz, limit_dBuV
        [ 0.15, 130 ],
        [ 0.5,  130 ],
        [ 0.5,  125 ],
        [ 5,    125 ],
        [ 5,    115 ],
        [ 30,   115 ],
    ])
    ax.plot(vertices[:, 0], vertices[:, 1], label="Group 2 HP")

    # Log for frequency
    ax.set_xscale('log')
    # Disable minor ticks from the log x-axis, and remove scientific notation from major ticks
    ax.xaxis.set_major_formatter(StrMethodFormatter('{x:.0f}'))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_title('Quasi-Peak Conductive Limits')
    ax.set_xlabel('Frequency [MHz]')
    ax.set_ylabel('Conductive Limit [dBuV]')
    ax.set_ylim(0, 140)
    ax.legend()
    ax.grid(which='both', axis='x')
    ax.grid(which='major', axis='y')
    
    ###########
    # Average
    ###########
    ax = axes[1]

    # Group 1
    vertices = np.array([
        # freq_MHz, limit_dBuV
        [ 0.15, 66 ],
        [ 0.5,  66 ],
        [ 0.5,  60 ],
        [ 30,   60 ],
    ])
    ax.plot(vertices[:, 0], vertices[:, 1], label="Group 1")

    # Group 2, LP
    vertices = np.array([
        # freq_MHz, limit_dBuV
        [ 0.15, 90 ],
        [ 0.5,  90 ],
        [ 0.5,  76 ],
        [ 5,    76 ],
        [ 5,    80 ],
        [ 30,   60 ],
    ])
    ax.plot(vertices[:, 0], vertices[:, 1], label="Group 2 LP")

    # Group 2, HP
    vertices = np.array([
        # freq_MHz, limit_dBuV
        [ 0.15, 120 ],
        [ 0.5,  120 ],
        [ 0.5,  115 ],
        [ 5,    115 ],
        [ 5,    105 ],
        [ 30,   105 ],
    ])
    ax.plot(vertices[:, 0], vertices[:, 1], label="Group 2 HP")

    # Log for frequency
    ax.set_xscale('log')
    # Disable minor ticks from the log x-axis, and remove scientific notation from major ticks
    ax.xaxis.set_major_formatter(StrMethodFormatter('{x:.0f}'))
    ax.xaxis.set_minor_formatter(NullFormatter())
    ax.set_title('Average Conductive Limits')
    ax.set_xlabel('Frequency [MHz]')
    ax.set_ylabel('Conductive Limit [dBuV]')
    ax.set_ylim(0, 140)
    ax.legend()
    ax.grid(which='both', axis='x')
    ax.grid(which='major', axis='y')

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'cispr-11-conductive-limits.png')

if __name__ == '__main__':
    main()