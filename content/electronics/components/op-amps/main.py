import matplotlib.pylab as plt
import numpy as np


def main():
    create_ideal_diode_basic_response()
    create_slew_rate_distortion_diagram()


def create_ideal_diode_basic_response():
    x_vals = np.linspace(-10, 10, 100)
    y_vals = np.where(x_vals > 0, x_vals, 0)

    size=15
    params = {
        # 'font.family': "Times New Roman",
        'legend.fontsize': 'large',
        'figure.figsize': (20, 8),
        'axes.labelsize': size*1.5,
        'axes.titlesize': size,
        'xtick.labelsize': size*0.75,
        'ytick.labelsize': size*0.75,
        'axes.titlepad': 25}
    plt.rcParams.update(params)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(x_vals, y_vals)
    ax.set_xticks(np.arange(-10, 10 + 2, 2))
    ax.set_xlabel('$v_{in}$')
    ax.set_ylabel('$v_{out}$')
    ax.grid()
    ax.set_aspect('equal')
    plt.tight_layout()
    plt.savefig('ideal-diode-basic-response.png')


def ratelimit(x, t, rlim):
    def helper():
        y = x[0]
        tprev = t[0] 
        for (xi, ti) in zip(x, t):
            dy = xi - y
            dt = ti - tprev
            y += np.clip(dy, -rlim*dt, rlim*dt)
            tprev = ti
            yield y
    return np.array(list(helper()))


def create_slew_rate_distortion_diagram():
    slew_rate_Vpus = 0.4
    time_vals_us = np.linspace(0, 500, 1000)
    input_waveform_vals = np.where((time_vals_us > 100) & (time_vals_us < 300), 10, 0)
    output_waveform_vals = ratelimit(input_waveform_vals, time_vals_us, slew_rate_Vpus)

    size = 15
    params = {
        # 'font.family': "Times New Roman",
        'legend.fontsize': 'medium',
        'figure.figsize': (20, 8),
        'axes.labelsize': size,
        'axes.titlesize': size,
        'xtick.labelsize': size*0.75,
        'ytick.labelsize': size*0.75,
        'axes.titlepad': 25}
    plt.rcParams.update(params)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(time_vals_us, input_waveform_vals, label='Input')
    ax.plot(time_vals_us, output_waveform_vals, label='Output (0.4V/us slew limit)')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.grid()
    ax.legend()
    # ax.set_aspect('equal')
    plt.tight_layout()
    plt.savefig('slew-rate-distortion-diagram.png')


if __name__ == '__main__':
    main()