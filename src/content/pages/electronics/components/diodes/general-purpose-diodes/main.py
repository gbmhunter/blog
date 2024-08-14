import matplotlib.pyplot as plt
import numpy as np
import os
from pathlib import Path

def main():
    script_dir = Path(os.path.dirname(os.path.realpath(__file__)))

    t = np.linspace(0, np.pi*2, num=500)
    i_max_A = 5
    y = i_max_A * np.sin(t)
    fig, ax = plt.subplots()
    ax.plot(t, y, label='Instantaneous Diode Current')
    bool_filter = y >= 0
    ax.fill_between(t[bool_filter], y[bool_filter], alpha=0.5, label='Period Of Diode Conduction')

    # Draw horizontal lines at max. and average current
    ax.axhline(y=i_max_A, c='C1', ls='--')
    ax.text(x=1, y=i_max_A + 0.1, s='$I_{max}$')
    avg_i_A = i_max_A/np.pi
    ax.axhline(y=avg_i_A, c='C1', ls='--')
    ax.text(x=1, y=avg_i_A + 0.1, s='$I_{avg} = \\frac{I_{max}}{\pi}$')
    ax.grid()
    ax.set_ylim(-6, 6)
    ax.set_xlabel('Time [s]')
    ax.set_ylabel('Current [A]')
    ax.set_title('Graph Showing Relationship Between Diode Average Forward Current\nAnd Max. Current')
    ax.legend()
    plt.savefig(script_dir / 'avg-rectified-forward-current-plot.png')

if __name__ == '__main__':
    main()