from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    period_s = 10e-6
    t_s = np.linspace(0, 30e-6, 100, endpoint=False)
    phi_1 = np.where((t_s / period_s) % 1.0 < 0.5, 1, 0)
    phi_2 = np.where((t_s / period_s) % 1.0 >= 0.5, 1, 0)

    def decorate_ax(ax):
        ax.set_xlabel('Time [us]')
        ax.set_ylabel(None)
        ax.set_yticklabels(['off', 'on'])
        ax.set_yticks([0, 1])

    fig, axes = plt.subplots(nrows=2, ncols=1)

    ax = axes[0]
    ax.plot(t_s*1e6, phi_1)
    ax.set_title('$\Phi_1$')
    decorate_ax(ax)
    
    ax = axes[1]
    ax.plot(t_s*1e6, phi_2)
    ax.set_title('$\Phi_2$')
    decorate_ax(ax)

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'phase-graph.png')

if __name__ == '__main__':
    main()