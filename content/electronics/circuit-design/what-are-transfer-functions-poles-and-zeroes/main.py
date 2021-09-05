import numpy as np
from scipy.integrate import odeint
from matplotlib import pyplot as plt

def main():
    plot_dampened_osc(0.6, 'osc-decreasing.png')
    plot_dampened_osc(-0.6, 'osc-increasing.png')
    plot_exponential(2, 'exp-increasing.png')
    plot_exponential(0.5, 'exp-decreasing.png')

def plot_dampened_osc(cviscous: float, filename):
    """
    Args:
        cviscous: Ns/m
    """
    mass = 0.5  # kg
    kspring = 4  # N/m

    eps = cviscous / (2 * mass * np.sqrt(kspring/mass))
    omega = np.sqrt(kspring / mass)

    def calc_deri(yvec, time, eps, omega):
        return (yvec[1], -eps * omega * yvec[1] - omega **2 * yvec[0])

    time_vec = np.linspace(0, 10, 100)
    yinit = (1, 0)
    yarr = odeint(calc_deri, yinit, time_vec, args=(eps, omega))

    fig, ax = plt.subplots(figsize=(4, 3))
    ax.plot(time_vec, yarr[:, 0], label='y')
    ax.grid(True, which='both')

    # set the x-spine (see below for more info on `set_position`)
    ax.spines['left'].set_position('zero')

    # turn off the right spine/ticks
    ax.spines['right'].set_color('none')
    ax.yaxis.tick_left()

    # set the y-spine
    ax.spines['bottom'].set_position('zero')

    # turn off the top spine/ticks
    ax.spines['top'].set_color('none')
    ax.xaxis.tick_bottom()
    # Turn off tick labels
    ax.set_yticklabels([])
    ax.set_xticklabels([])
    # ax.set_ylim(-1, 1)
    # plt.plot(time_vec, yarr[:, 1], label="y'")
    # plt.legend(loc='best')
    plt.savefig(filename)

def plot_exponential(a, filename):
    fig, ax = plt.subplots()
    time_vec = np.linspace(0, 10, 100)
    y_vals = np.power(a, time_vec)
    ax.plot(time_vec, y_vals)
    ax.grid(True, which='both')
    # Turn off tick labels
    ax.set_yticklabels([])
    ax.set_xticklabels([])
    plt.savefig(filename)

if __name__ == '__main__':
    main()