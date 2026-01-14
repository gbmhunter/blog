import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def main():
    create_basic_chirp_plot()
    create_linear_chirp_plot()
    create_linear_chirp_spectrogram()
    create_exponential_chirp_plot()
    create_exponential_chirp_plot_and_spectrogram()
    create_hyperbolic_chirp_plot()
    create_example_hyperbolic_chirp_plot_and_spectrogram()


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


def create_exponential_chirp_plot():
    """
    Create a simple exponential chirp plot for the intro section.
    Using simple parameters to demonstrate the concept.
    """
    fig, ax = plt.subplots(figsize=(10, 5))
    
    # Simple parameters for demonstration
    f_0 = 1e3       # Initial frequency: 1 kHz
    k = 8           # Frequency ratio
    T = 20e-3       # Time interval: 20 ms
    phi_0 = 0       # Initial phase: 0 rad
    
    # Generate signal
    t = np.linspace(0, T, 10000)
    phase = phi_0 + 2*np.pi*f_0 * (T * (k**(t/T) - 1) / np.log(k))
    x = np.sin(phase)
    
    ax.plot(t*1e3, x)
    ax.set_xlabel('Time t [ms]')
    ax.set_ylabel('Chirp Signal x(t)')
    ax.set_title('Exponential Chirp Signal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'exponential-chirp-signal.png')
    plt.close()


def create_exponential_chirp_plot_and_spectrogram():
    """
    Create both waveform plot and spectrogram for an exponential chirp.
    Using parameters: f_0 = 1 kHz, k = 8 (frequency ratio), T = 20 ms, phi_0 = 0 rad
    This will sweep from 1 kHz to 8 kHz over 20 ms.
    """
    # Parameters
    f_0 = 1e3       # Initial frequency: 1 kHz
    k = 8           # Frequency ratio (f_1/f_0)
    T = 20e-3       # Time interval: 20 ms
    phi_0 = 0       # Initial phase: 0 rad
    
    # Create signal with very high sampling rate for better spectrogram resolution
    duration = T
    sample_rate = 500e3  # 500 kHz sampling rate (5x higher than before)
    num_samples = int(sample_rate * duration)
    t = np.linspace(0, duration, num_samples)
    
    # Generate exponential chirp signal using the phase equation:
    # phi(t) = phi_0 + 2*pi*f_0 * [T*(k^(t/T) - 1) / ln(k)]
    phase = phi_0 + 2*np.pi*f_0 * (T * (k**(t/T) - 1) / np.log(k))
    x = np.sin(phase)
    
    # Create waveform plot
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(t*1e3, x)
    ax.set_xlabel('Time t [ms]')
    ax.set_ylabel('Chirp Signal x(t)')
    ax.set_title('Exponential Chirp Signal (Example)')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'example-exponential-chirp-signal.png')
    plt.close()
    
    # Create spectrogram with padding (same approach as linear chirp)
    # With 500 kHz sampling: NFFT=2048 gives ~244 Hz freq resolution and 4.1ms window
    nfft = 2048
    pad_samples = nfft
    
    # Extend the time array for the padded samples
    t_pad_start = np.linspace(-pad_samples/sample_rate, 0, pad_samples, endpoint=False)
    t_pad_end = np.linspace(duration, duration + pad_samples/sample_rate, pad_samples, endpoint=False)
    t_extended = np.concatenate([t_pad_start, t, t_pad_end])
    
    # Generate exponential chirp for padded regions too (extrapolate)
    phase_pad_start = phi_0 + 2*np.pi*f_0 * (T * (k**(t_pad_start/T) - 1) / np.log(k))
    phase_pad_end = phi_0 + 2*np.pi*f_0 * (T * (k**(t_pad_end/T) - 1) / np.log(k))
    x_pad_start = np.sin(phase_pad_start)
    x_pad_end = np.sin(phase_pad_end)
    x_padded = np.concatenate([x_pad_start, x, x_pad_end])
    
    # Create spectrogram
    fig, ax = plt.subplots(figsize=(10, 6))
    # Use 75% overlap for good time-frequency resolution balance
    Pxx, freqs, bins, im = ax.specgram(x_padded, Fs=sample_rate, NFFT=nfft, noverlap=int(nfft*0.75), cmap='viridis')
    
    # Adjust bins to account for padding
    pad_duration = pad_samples / sample_rate
    bins_adjusted = bins - pad_duration
    
    # Clear and replot with correct units
    ax.clear()
    bins_ms = bins_adjusted * 1e3
    freqs_khz = freqs / 1e3
    im = ax.pcolormesh(bins_ms, freqs_khz, 10*np.log10(Pxx + 1e-10), shading='gouraud', cmap='viridis')
    
    ax.set_xlabel('Time [ms]')
    ax.set_ylabel('Frequency [kHz]')
    ax.set_title('Exponential Chirp Signal Spectrogram (Example)')
    ax.set_xlim((0, 20))  # Show full 20 ms range
    ax.set_ylim((0, 10))  # Show 0 to 10 kHz range (to see full sweep to 8 kHz)
    
    # Add colorbar
    cbar = plt.colorbar(im, ax=ax)
    cbar.set_label('Power Spectral Density [dB]')
    
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'example-exponential-chirp-spectrogram.png', dpi=150)
    plt.close()


def create_hyperbolic_chirp_plot():
    """
    Create a simple hyperbolic chirp plot for the intro section.
    Using the equation: f(t) = (f_0 * f_1 * T) / ((f_0 - f_1)*t + f_1*T)
    """
    fig, ax = plt.subplots(figsize=(10, 5))
    
    # Parameters for demonstration
    f_0 = 1e3       # Initial frequency: 1 kHz
    f_1 = 8e3       # Final frequency: 8 kHz
    T = 20e-3       # Time interval: 20 ms
    phi_0 = 0       # Initial phase: 0 rad
    
    # Generate signal
    t = np.linspace(0, T, 10000)
    
    # Using the phase equation from the chirp page:
    # phi(t) = phi_0 + 2*pi * (-f_0*f_1*T)/(f_1-f_0) * ln(1 - (f_1-f_0)/(f_1*T)*t)
    phase = phi_0 + 2*np.pi * (-f_0 * f_1 * T) / (f_1 - f_0) * np.log(1 - (f_1 - f_0)/(f_1*T)*t)
    x = np.sin(phase)
    
    ax.plot(t*1e3, x)
    ax.set_xlabel('Time t [ms]')
    ax.set_ylabel('Chirp Signal x(t)')
    ax.set_title('Hyperbolic Chirp Signal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'hyperbolic-chirp-signal.png')
    plt.close()


def create_example_hyperbolic_chirp_plot_and_spectrogram():
    """
    Create both waveform plot and spectrogram for a hyperbolic chirp example.
    Using parameters: f_0 = 1 kHz, f_1 = 8 kHz, T = 20 ms, phi_0 = 0 rad
    This will sweep from 1 kHz to 8 kHz over 20 ms.
    """
    # Parameters
    f_0 = 1e3       # Initial frequency: 1 kHz
    f_1 = 8e3       # Final frequency: 8 kHz
    T = 20e-3       # Time interval: 20 ms
    phi_0 = 0       # Initial phase: 0 rad
    
    # Create signal with very high sampling rate for better spectrogram resolution
    duration = T
    sample_rate = 500e3  # 500 kHz sampling rate
    num_samples = int(sample_rate * duration)
    t = np.linspace(0, duration, num_samples)
    
    # Generate hyperbolic chirp signal using the phase equation:
    # phi(t) = phi_0 + 2*pi * (-f_0*f_1*T)/(f_1-f_0) * ln(1 - (f_1-f_0)/(f_1*T)*t)
    phase = phi_0 + 2*np.pi * (-f_0 * f_1 * T) / (f_1 - f_0) * np.log(1 - (f_1 - f_0)/(f_1*T)*t)
    x = np.sin(phase)
    
    # Create waveform plot
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(t*1e3, x)
    ax.set_xlabel('Time t [ms]')
    ax.set_ylabel('Chirp Signal x(t)')
    ax.set_title('Hyperbolic Chirp Signal (Example)')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'example-hyperbolic-chirp-signal.png')
    plt.close()
    
    # Create spectrogram with padding
    # With 500 kHz sampling: NFFT=2048 gives ~244 Hz freq resolution and 4.1ms window
    nfft = 2048
    pad_samples = nfft
    
    # For hyperbolic chirps, we can safely extrapolate backwards but need to be careful going forward
    # The argument (1 - (f_1-f_0)/(f_1*T)*t) must stay positive
    t_pad_start = np.linspace(-pad_samples/sample_rate, 0, pad_samples, endpoint=False)
    
    # Generate hyperbolic chirp for padded start region (safe to extrapolate backwards)
    phase_pad_start = phi_0 + 2*np.pi * (-f_0 * f_1 * T) / (f_1 - f_0) * np.log(1 - (f_1 - f_0)/(f_1*T)*t_pad_start)
    x_pad_start = np.sin(phase_pad_start)
    
    # Pad end with zeros to avoid singularity issues
    x_pad_end = np.zeros(pad_samples)
    
    x_padded = np.concatenate([x_pad_start, x, x_pad_end])
    
    # Create spectrogram
    fig, ax = plt.subplots(figsize=(10, 6))
    # Use 75% overlap for good time-frequency resolution balance
    Pxx, freqs, bins, im = ax.specgram(x_padded, Fs=sample_rate, NFFT=nfft, noverlap=int(nfft*0.75), cmap='viridis')
    
    # Adjust bins to account for padding
    pad_duration = pad_samples / sample_rate
    bins_adjusted = bins - pad_duration
    
    # Clear and replot with correct units
    ax.clear()
    bins_ms = bins_adjusted * 1e3
    freqs_khz = freqs / 1e3
    im = ax.pcolormesh(bins_ms, freqs_khz, 10*np.log10(Pxx + 1e-10), shading='gouraud', cmap='viridis')
    
    ax.set_xlabel('Time [ms]')
    ax.set_ylabel('Frequency [kHz]')
    ax.set_title('Hyperbolic Chirp Signal Spectrogram (Example)')
    ax.set_xlim((0, 20))  # Show full 20 ms range
    ax.set_ylim((0, 10))  # Show 0 to 10 kHz range (to see full sweep to 8 kHz)
    
    # Add colorbar
    cbar = plt.colorbar(im, ax=ax)
    cbar.set_label('Power Spectral Density [dB]')
    
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'example-hyperbolic-chirp-spectrogram.png', dpi=150)
    plt.close()


if __name__ == "__main__":
    main()