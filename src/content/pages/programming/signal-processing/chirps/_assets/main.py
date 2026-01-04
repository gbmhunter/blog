import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def main():
    create_basic_chirp_plot()

def create_basic_chirp_plot():
    fig, ax = plt.subplots(figsize=(10, 5))
    t = np.linspace(0, 10, 1000)
    y = np.sin(t**2)
    ax.plot(t, y)
    ax.set_xlabel('Time [s]')
    ax.set_ylabel('Amplitude')
    ax.set_title('Basic Chirp Signal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'basic-chirp-signal.png')

if __name__ == "__main__":
    main()