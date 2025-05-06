from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import scipy.signal 
from math import pi, acos

import util

SCRIPT_DIR = Path(__file__).parent


def main():
    create_freq_response_plot()
    create_impulse_response_plot()
    create_time_constant_plot()

def create_freq_response_plot():

    alpha = 0.25

    # Create coefficients for the scipy freqz() function
    b = np.array(alpha)
    a = np.array((1, alpha - 1))

    x = (alpha**2 + 2*alpha - 2) / (2*alpha - 2)
    w_c = acos(x)                          # Calculate the cut-off frequency

    w, h = scipy.signal.freqz(b, a)                     # Calculate the frequency response

    freq_HzperSample = w/(2*np.pi)
    f_cuttoff_HzperSample = w_c/(2*np.pi)

    fig, axes = plt.subplots(nrows=2, ncols=1)

    # Plot the amplitude response
    ax = axes[0]          
    ax.set_title(f'EMA Bode Plot ($\\alpha={alpha:.2f}$): Magnitude')
    ax.plot(freq_HzperSample, 20 * np.log10(abs(h)))     # Convert to dB
    ax.set_xlabel('Normalized Frequency [Hz/sample]')
    ax.set_ylabel('Magnitude [dB]')
    ax.set_xlim(0, 0.5) # Go from 0 to Nyquist
    ax.set_ylim(-20, 1) # Response doesn't drop below about -16dB
    ax.axvline(f_cuttoff_HzperSample, color='red', label='Cut-off frequency')
    ax.axhline(-3, linewidth=0.8, color='black', linestyle=':')
    ax.legend()

    # Plot the phase response
    ax = axes[1]
    ax.set_title(f'EMA Bode Plot ($\\alpha={alpha:.2f}$): Phase')
    ax.plot(freq_HzperSample, 180 * np.angle(h) / pi)    # Convert argument to degrees
    ax.set_xlabel('Normalized Frequency [Hz/sample]')
    ax.set_ylabel('Phase [°]')
    ax.set_xlim(0, 0.5) # Go from 0 to Nyquist
    ax.set_ylim(-90, 90)
    ax.set_yticks([-90, -45, 0, 45, 90])
    ax.axvline(f_cuttoff_HzperSample, color='red', label='Cut-off frequency')
    ax.legend()

    plt.tight_layout()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / 'ema-bode-plot.png')

def create_impulse_response_plot():

    alphas = [ 0.2, 0.5 ]
    fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(20, 7))
    for idx, alpha in enumerate(alphas):
        ax = axes[idx]
        # y[i] = alpha * (1 - alpha)^n
        samples = np.arange(0, 30)
        y_vals = alpha * np.power((1 - alpha), samples)
        ax.stem(samples, y_vals)
        ax.set_xlabel('Sample Number')
        ax.set_ylabel('Signal Magnitude')
        ax.set_title(f'Impulse Response of EMA Filter with $\\alpha={alpha:.2f}$')
    plt.tight_layout()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / 'ema-impulse-response.png')

def create_time_constant_plot():
    # x is alpha,
    # y is the number of iterations to reach 1 - 1/e of the steady state value
    alphas = np.linspace(0.01, 0.99, 100)

    fig, ax = plt.subplots()
    fraction_of_steady_state = 1 - 1/np.e
    num_iterations_per_alpha = create_trace_for_time_constant_plot(alphas, fraction_of_steady_state)
    ax.plot(alphas, num_iterations_per_alpha, label=f'$1\\tau$ ({fraction_of_steady_state*100:.1f}%)')

    fraction_of_steady_state = 1 - 1/np.e**2
    num_iterations_per_alpha = create_trace_for_time_constant_plot(alphas, fraction_of_steady_state)
    ax.plot(alphas, num_iterations_per_alpha, label=f'$2\\tau$ ({fraction_of_steady_state*100:.1f}%)')

    fraction_of_steady_state = 1 - 1/np.e**3
    num_iterations_per_alpha = create_trace_for_time_constant_plot(alphas, fraction_of_steady_state)
    ax.plot(alphas, num_iterations_per_alpha, label=f'$3\\tau$ ({fraction_of_steady_state*100:.1f}%)')

    ax.set_title('Number of Iterations to Reach Various Fractions of\nSteady State For Different $\\alpha$')
    ax.set_xlabel('Alpha')
    ax.set_ylabel('Number of Iterations')

    # Limit y from 0 to 100
    ax.set_ylim(0, 100)

    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / 'ema-time-constant.png')

def create_trace_for_time_constant_plot(alphas: np.ndarray, percent_of_steady_state: float) -> np.ndarray:
    num_iterations_per_alpha = []
    for alpha in alphas:
        filter_output = 0
        num_iterations = 0
        while filter_output < percent_of_steady_state:
            filter_output = alpha* 1 + (1 - alpha) * filter_output
            num_iterations += 1
        num_iterations_per_alpha.append(num_iterations)

    return np.array(num_iterations_per_alpha)
if __name__ == '__main__':
    main()