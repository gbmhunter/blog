import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def main():
    create_basic_chirp_plot()
    create_linear_chirp_plot()


def create_basic_chirp_plot():
    fig, ax = plt.subplots(figsize=(10, 5))
    t = np.linspace(0, 10, 1000)
    x = np.sin(t**2)
    ax.plot(t, x)
    ax.set_xlabel('Time t [s]')
    ax.set_ylabel('Chirp Signal x(t)')
    ax.set_title('Basic Chirp Signal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'basic-chirp-signal.png')


def create_linear_chirp_plot():
    fig, ax = plt.subplots(figsize=(10, 5))
    t = np.linspace(0, 20e-3, 1000)
    # f_0 = 1 kHz, c = 100 kHz/s, phi_0 = 0 rad
    f_0 = 1e3
    c = 1e5
    phi_0 = 0
    x = np.sin(phi_0 + 2*np.pi*(c/2*t**2 + f_0*t))
    ax.plot(t*1e3, x)
    ax.set_xlabel('Time t [ms]')
    ax.set_ylabel('Chirp Signal x(t)')
    ax.set_title('Linear Chirp Signal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'linear-chirp-signal.png')

if __name__ == "__main__":
    main()