from logging import log
import numpy as np
from scipy.integrate import odeint
from matplotlib import pyplot as plt

def main():
    # plot_dampened_osc(0.6, 'osc-decreasing.png')
    # plot_dampened_osc(-0.6, 'osc-increasing.png')
    # plot_exponential(2, 'exp-increasing.png')
    # plot_exponential(0.5, 'exp-decreasing.png')
    create_low_pass_rc_filter_graphs()

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

def create_low_pass_rc_filter_graphs():
    # Cutoff of 159kHz
    r_Ohms = 1e3
    c_Farads = 1e-9

    f_Hz = np.logspace(2, 8, 1000)
    mag_vout_vin = 1 / np.sqrt(1 + 2*np.pi*f_Hz*r_Ohms*c_Farads)
    mag_dB = 20*np.log10(mag_vout_vin)

    fig, ax = plt.subplots()
    ax.plot(f_Hz, mag_dB)
    ax.set_xscale('log')
    ax.set_xlabel('f [Hz]')
    ax.set_ylabel('Magnitude [dB]')
    ax.grid(which='both')
    plt.savefig('low-pass-rc-filter-mag.png')

    phase_deg = np.rad2deg(-np.arctan(2*np.pi*f_Hz*r_Ohms*c_Farads))

    fig, ax = plt.subplots()
    ax.plot(f_Hz, phase_deg)
    ax.set_xscale('log')
    ax.set_xlabel('f [Hz]')
    ax.set_ylabel('Phase [°]')
    ax.set_yticks([ -90, -45, 0 ])
    ax.grid(which='both')
    plt.savefig('low-pass-rc-filter-phase.png')


if __name__ == '__main__':
    main()