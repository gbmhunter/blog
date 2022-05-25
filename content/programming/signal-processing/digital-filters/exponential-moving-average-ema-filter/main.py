from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scipy.signal

SCRIPT_DIR = Path(__file__).parent


def main():
    create_impulse_response_plot()


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