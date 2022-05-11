from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scipy.signal

SCRIPT_DIR = Path(__file__).parent


def main():
    nzs_national_yearly_temp_plot()
    # sma_example_code()
    # create_sma_plots()
    # windowed_moving_average_accumulated_error()


def nzs_national_yearly_temp_plot():
    df = pd.read_csv(SCRIPT_DIR / 'new-zealands-national-temperature-19092016.csv')

    window_length = 10
    moving_average = 0
    window = [0]*window_length
    curr_pos = 0

    for idx, input in enumerate(inputs):
        # Use recursive SMA algorithm
        moving_average = moving_average - window[curr_pos] + input

        # Save new input into window at correct position (overwrite oldest)
        window[curr_pos] = input

        curr_pos += 1
        if curr_pos >= len(window):
            curr_pos = 0

        print(f'y[{idx}] = {moving_average}')

def sma_example_code():
    """
    Example code of recursive left-handed SMA.
    """

    inputs = [1, 6, 3, 4, 2]

    window_length = 3
    moving_average = 0
    window = [0]*window_length
    curr_pos = 0

    for idx, input in enumerate(inputs):
        # Use recursive SMA algorithm
        moving_average = moving_average - window[curr_pos] + input

        # Save new input into window at correct position (overwrite oldest)
        window[curr_pos] = input

        curr_pos += 1
        if curr_pos >= len(window):
            curr_pos = 0

        print(f'y[{idx}] = {moving_average}')


def create_sma_plots():
    # Equations from https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Digital-filters/Simple%20Moving%20Average/Simple-Moving-Average.html#:~:text=The%20cutoff%20frequency%20is%20defined,)%20%E2%89%88%20%E2%88%92%203.01%20d%20B%20.

    # Function for calculating the cut-off frequency of a moving average filter
    def get_sma_cutoff(N, **kwargs):
        func = lambda w: np.sin(N*w/2) - N/np.sqrt(2) * np.sin(w/2)  # |H(e^jω)| = √2/2
        deriv = lambda w: np.cos(N*w/2) * N/2 - N/np.sqrt(2) * np.cos(w/2) / 2  # dfunc/dx
        omega_0 = np.pi/N  # Starting condition: halfway the first period of sin(Nω/2)
        return scipy.optimize.newton(func, omega_0, deriv, **kwargs)

    N = 10  # Window size (number of samples)
    fs_Hz = 1000  # Sampling frequency
    f = np.linspace(0, fs_Hz/2, 1000)
    w = 2*np.pi*(f/fs_Hz)
    with np.errstate(divide='ignore', invalid='ignore'):
        freq_response = (1/(N**2))*((np.sin(w*N/2)**2)/(np.sin(w/2)**2))

    freq_response_dB = 10*np.log10(freq_response)

    # SMA coefficients
    b = np.ones(N)
    a = np.array([N] + [0]*(N-1))
    w, h = scipy.signal.freqz(b, a, worN=4096)
    f = (w*fs_Hz)/(2*np.pi)  # Convert from rad/sample to Hz
    freq_response_dB = 20*np.log10(abs(h))
    phase_response = np.angle(h)*(180/np.pi)

    w_c = get_sma_cutoff(N)
    f_c_Hz = w_c * fs_Hz / (2 * np.pi)
    # print(f'f_c_Hz={f_c_Hz}')

    fig, axes = plt.subplots(1, 1, figsize=(10, 7), squeeze=False)
    ax = axes[0][0]
    ax.plot(f, freq_response_dB, label='Frequency response')
    ax.axvline(fs_Hz/N, color='C1', linestyle='--', label='Window frequency')
    ax.axvline(f_c_Hz, color='C2', linestyle='--', label='Cutoff frequency')
    ax.set_xlabel('Frequency (Hz)')
    ax.set_ylabel('Magnitude (dB)')
    ax.set_ylim(-50, 10)
    ax.set_title('Magnitude Response Of SMA')
    ax.legend()
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'frequency-response-of-sma-magnitude.png')

    fig, axes = plt.subplots(1, 1, figsize=(10, 7), squeeze=False)
    ax = axes[0][0]
    ax.plot(f, phase_response, label='Phase response')
    ax.axvline(fs_Hz/N, color='C1', linestyle='--', label='Window frequency')
    ax.axvline(f_c_Hz, color='C2', linestyle='--', label='Cutoff frequency')
    ax.set_xlabel('Frequency (Hz)')
    ax.set_ylabel('Phase (°)')
    ax.set_ylim(-180, 90)
    ax.set_yticks([-180, -135, -90, -45, 0, 45, 90])
    ax.set_title('Phase Response Of SMA')
    ax.legend()
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'frequency-response-of-sma-phase.png')


def windowed_moving_average_accumulated_error():
    """
    Calculate and plot the accumulated error from performing a moving average with the float32 data type.
    """

    # inputs = random.sample(range(0, 100), 5)
    # inputs = [1, 2, 3, 4, 5]

    # Create a rng with constant seed to get reproducable results
    rng = np.random.default_rng(5)
    # Create random numbers in the range [0, 1000]
    inputs = rng.random(10000000).astype('float32')*1000

    window_length = 10
    moving_average = np.array([0], dtype='float32')
    window = np.zeros(window_length, dtype='float32')
    curr_pos = 0

    # Calculate a plot point every N number of inputs
    calc_delta_period = 100

    sample_numbers = []
    deltas = []

    for idx, input in enumerate(inputs):

        moving_average[0] = moving_average[0] - window[curr_pos] + input

        # Save new input into window at correct position (overwrite oldest)
        window[curr_pos] = input

        if idx % calc_delta_period == 0:
            sample_numbers.append(idx)
            sum_of_window = np.array([0], dtype='float32')
            for item in window:
                sum_of_window[0] += item        
            delta = sum_of_window - moving_average
            deltas.append(delta)

        curr_pos += 1
        if curr_pos >= len(window):
            curr_pos = 0

    sum_of_window = np.array([0], dtype='float32')
    for item in window:
        sum_of_window[0] += item
    delta = sum_of_window - moving_average

    fig, ax = plt.subplots(figsize=(10, 7))
    ax.plot(sample_numbers, deltas)
    ax.set_xlabel('Sample Number')
    ax.set_ylabel('Accumulated Error')
    ax.grid()

    plt.savefig(SCRIPT_DIR / 'windowed-moving-average-accumulated-error.png')


if __name__ == '__main__':
    main()
