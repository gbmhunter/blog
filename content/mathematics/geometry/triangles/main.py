import matplotlib.pyplot as plt
import numpy as np
import os
from pathlib import Path

SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))

def main():
    # Plot graph of sine wave
    x = np.linspace(0, 180, 100)
    y = np.sin(np.deg2rad(x))

    plt.plot(x, y)

    plt.savefig(SCRIPT_DIR / '_assets/sine-law-sine-wave-graph.png')

if __name__ == '__main__':
    main()