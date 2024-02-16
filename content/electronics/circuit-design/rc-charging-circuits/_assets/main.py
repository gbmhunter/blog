import matplotlib.pyplot as plt
import numpy as np
import os
from pathlib import Path

import util

# Script directory
# This is the directory where the script is located
SCRIPT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))

def main():
    create_rc_charging_plot()
    
def create_rc_charging_plot():
    # Create a time array from 0 to 5 time constants
    timeConstants = np.linspace(0, 5, 1000)
    # Create a voltage array using the formula Vc = Vs * (1 - e^(-t/RC))
    # Vc/Vs = 1 - e^(-t/RC)
    voltageRatio = (1 - np.exp(-timeConstants))
    # Plot the voltage vs. time
    fig, ax = plt.subplots()
    ax.plot(timeConstants, voltageRatio)
    ax.set_xlabel('Time Constants ($\\tau$)')
    ax.set_ylabel('$\dfrac{V_C}{V_S}$')
    ax.set_title('RC Charging Circuit')

    # Set axis limits
    ax.set_xlim(0, 5)
    ax.set_ylim(0, 1)

    # Add major and minor grid
    ax.grid(which='both')

    # Lines at 1T
    tau = 1
    yValAtTau1 = np.interp(tau, timeConstants, voltageRatio)
    ax.vlines(x=tau, ymin=0, ymax=yValAtTau1, color='r', linestyle='--')
    ax.hlines(y=yValAtTau1, xmin=0, xmax=tau, color='r', linestyle='--')
    ax.text(0.5, yValAtTau1 + 0.01, f'${yValAtTau1:.2f}V_S$', color='r', horizontalalignment='center', verticalalignment='bottom')

    # Lines at 4T
    tau = 4
    yValAtTau4 = np.interp(tau, timeConstants, voltageRatio)
    ax.vlines(x=tau, ymin=0, ymax=yValAtTau4, color='r', linestyle='--')
    ax.hlines(y=yValAtTau4, xmin=0, xmax=tau, color='r', linestyle='--')
    ax.text(0.5, yValAtTau4 - 0.01, f'${yValAtTau4:.2f}V_S$', color='r', horizontalalignment='center', verticalalignment='top')

    fig.tight_layout()
    util.add_watermark_to_fig(fig)

    fig.savefig(SCRIPT_DIR / 'rc-charging-plot.png')

if __name__ == '__main__':
    main()