import os
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation


SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))

def main():
    # create_basic_logistic_function()
    create_logistic_function_changing_b1()

def create_basic_logistic_function():
    # Create logistic function graph
    x = np.arange(-10, 10, step=0.1)
    y = 1 / (1 + np.exp(-x))

    fig = plt.figure(figsize=(10,10))
    ax = fig.add_subplot(111)
    ax.plot(x, y, label='logistic function')
    ax.grid()
    ax.set(xlabel='x', ylabel='y', title='Graph of the basic logistic function.')
    plt.savefig(Path(SCRIPT_DIR) / 'graph-logistic-function.png')

def create_logistic_function_changing_b1():
    print(f'Creating logistic function gif with changing b1...')
    fig, ax = plt.subplots()
    x = np.arange(-10, 10, step=0.1)
    i = 0
    y = 1 / (1 + np.exp(-1*(i/100.0)*x))
    line, = ax.plot(x, y)
    ax.set_xlabel(f'$x$', fontsize=15)
    ax.set_ylabel('$\\frac{1}{1 + e^{-\\beta_1 x}}$', fontsize=15)
    ax.set_ylim([-0.5, 1.5])
    ax.set_title('The Effect of $\\beta_1$ on the Logistic Function', fontsize=20)
    ax.legend()
    ax.grid()
    plt.tight_layout()
    def update(i):
        y = 1 / (1 + np.exp(-1*i*x))
        line.set_ydata(y)
        line.set_label(f'$\\beta_1 = {i:.2f}$')
        ax.legend()
        return line, ax 

    frames = 10**(np.linspace(-2, 1, num=100))
    anim = FuncAnimation(fig, update, frames=frames, interval=50)
    anim.save('logistic-function-changing-b1.gif')

if __name__ == '__main__':
    main()
