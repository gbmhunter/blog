import matplotlib.pyplot as plt
from matplotlib import ticker
import numpy as np
import os
from pathlib import Path

SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))

def main():
    # Plot graph of sine wave
    thetas = np.linspace(0, 180, 100)
    ys = np.sin(np.deg2rad(thetas))

    fig, ax = plt.subplots()

    # Plot sine wave
    ax.plot(thetas, ys)

    # Plot horizontal line at y = 0.6
    lineY = 0.6
    ax.axhline(y=lineY, color='r', linestyle='--')

    # Plot vertical lines where y=0.6 intersects sine wave
    theta1 = np.rad2deg(np.arcsin(lineY))
    theta2 = 180 - theta1
    ax.axvline(x=theta1, color='r', linestyle='--')
    ax.axvline(x=theta2, color='r', linestyle='--')

    # Add label for y=0.6
    ax.text(90, lineY, '$0.6$', horizontalalignment='right', verticalalignment='bottom')

    # Add labels for intersections
    ax.text(theta1, lineY/3, f'${theta1:.1f}^{{\circ}}$', horizontalalignment='right', verticalalignment='bottom')
    ax.text(theta2, lineY/3, f'${theta2:.1f}^{{\circ}}$', horizontalalignment='left', verticalalignment='bottom')

    # Add axis labels
    ax.set(xlabel='Angle $\\theta$ (degrees)', ylabel='$\sin(\\theta)$',
        title='Inverse Sine Giving Two Angles')
    
    # Show major and minor grid lines
    ax.minorticks_on()
    maj_pos = ticker.MultipleLocator(45)
    ax.xaxis.set(major_locator=maj_pos)
    ax.grid(which='major', linestyle='-', linewidth='0.5', color='gray')
    ax.grid(which='minor', linestyle='-', linewidth='0.5', color='lightgray')

    plt.savefig(SCRIPT_DIR / '_assets/sine-law-sine-wave-graph.png')

if __name__ == '__main__':
    main()