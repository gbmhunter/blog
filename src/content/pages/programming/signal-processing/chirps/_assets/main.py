import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def main():
    create_basic_chirp_plot()
    create_linear_chirp_plot()
    create_linear_chirp_spectrogram()


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


def create_linear_chirp_spectrogram():
    # Parameters: f_0 = 1 kHz, c = 100 kHz/s, phi_0 = 0 rad
    f_0 = 1e3
    c = 1e5
    phi_0 = 0
    
    # Create signal with higher sampling rate for better spectrogram resolution
    duration = 20e-3  # 20 ms
    sample_rate = 100e3  # 100 kHz sampling rate
    num_samples = int(sample_rate * duration)
    t = np.linspace(0, duration, num_samples)
    
    # Generate linear chirp signal
    x = np.sin(phi_0 + 2*np.pi*(c/2*t**2 + f_0*t))
    
    # Pad signal at beginning and end to fill the entire spectrogram
    # NFFT=512 means window is 512/100000 = 5.12ms
    # Pad with full window on each side to ensure coverage from 0 to 20ms
    nfft = 512
    pad_samples = nfft  # Use full window for padding
    
    # Extend the time array for the padded samples
    t_pad_start = np.linspace(-pad_samples/sample_rate, 0, pad_samples, endpoint=False)
    t_pad_end = np.linspace(duration, duration + pad_samples/sample_rate, pad_samples, endpoint=False)
    t_extended = np.concatenate([t_pad_start, t, t_pad_end])
    
    # Generate chirp for padded regions too (extrapolate the chirp signal)
    x_pad_start = np.sin(phi_0 + 2*np.pi*(c/2*t_pad_start**2 + f_0*t_pad_start))
    x_pad_end = np.sin(phi_0 + 2*np.pi*(c/2*t_pad_end**2 + f_0*t_pad_end))
    x_padded = np.concatenate([x_pad_start, x, x_pad_end])
    
    # Create spectrogram
    fig, ax = plt.subplots(figsize=(10, 6))
    Pxx, freqs, bins, im = ax.specgram(x_padded, Fs=sample_rate, NFFT=nfft, noverlap=nfft//2, cmap='viridis')
    
    # Adjust bins to account for padding - shift time back by pad duration
    pad_duration = pad_samples / sample_rate
    bins_adjusted = bins - pad_duration
    
    # Clear the axis and replot with correct units
    ax.clear()
    # bins are in seconds, convert to ms; freqs are in Hz, convert to kHz
    bins_ms = bins_adjusted * 1e3
    freqs_khz = freqs / 1e3
    # Add small epsilon to avoid log(0) warnings
    im = ax.pcolormesh(bins_ms, freqs_khz, 10*np.log10(Pxx + 1e-10), shading='gouraud', cmap='viridis')
    
    ax.set_xlabel('Time [ms]')
    ax.set_ylabel('Frequency [kHz]')
    ax.set_title('Linear Chirp Signal Spectrogram')
    ax.set_xlim((0, 20))  # Show full 20 ms range
    ax.set_ylim((0, 3))  # Show 0 to 3 kHz range
    
    # Add colorbar
    cbar = plt.colorbar(im, ax=ax)
    cbar.set_label('Power Spectral Density [dB]')
    
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'linear-chirp-spectrogram.png', dpi=150)
    plt.close()

    

if __name__ == "__main__":
    main()