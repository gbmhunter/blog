import os
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))

def main():
    # Create logistic function graph
    x = np.arange(-10, 10, step=0.1)
    y = 1 / (1 + np.exp(-x))

    fig = plt.figure(figsize=(10,10))
    ax = fig.add_subplot(111)
    ax.plot(x, y, label='logistic function')
    ax.grid()
    ax.set(xlabel='x', ylabel='y', title='Graph of the logistic function (one type of Sigmoid function)')
    plt.savefig(Path(SCRIPT_DIR) / 'graph-logistic-function.png')

if __name__ == '__main__':
    main()
