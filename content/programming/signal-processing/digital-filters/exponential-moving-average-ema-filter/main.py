from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import scipy.signal

SCRIPT_DIR = Path(__file__).parent


def main():
    create_freq_response_plot()
    create_impulse_response_plot()

def create_freq_response_plot():
    from scipy.signal import freqz 
    import matplotlib.pyplot as plt
    from math import pi, acos
    import numpy as np

    alpha = 0.25

    b = np.array(alpha)
    a = np.array((1, alpha - 1))

    print("b =", b)                        # Print the coefficients
    print("a =", a)

    x = (alpha**2 + 2*alpha - 2) / (2*alpha - 2)
    w_c = acos(x)                          # Calculate the cut-off frequency

    w, h = freqz(b, a)                     # Calculate the frequency response

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
    plt.savefig(SCRIPT_DIR / 'ema-impulse-response.png')

if __name__ == '__main__':
    main()