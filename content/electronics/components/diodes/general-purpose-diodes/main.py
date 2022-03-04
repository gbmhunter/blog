import matplotlib.pyplot as plt
import numpy as np
import os
from pathlib import Path

def main():
    script_dir = Path(os.path.dirname(os.path.realpath(__file__)))

    t = np.linspace(0, np.pi*2)
    i_max_A = 5
    y = i_max_A * np.sin(t)
    fig, ax = plt.subplots()
    ax.plot(t, y)
    plt.savefig(script_dir / 'avg-rectified-forward-current-plot.png')

if __name__ == '__main__':
    main()