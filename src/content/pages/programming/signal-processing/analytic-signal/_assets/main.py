# Standard library
from pathlib import Path

# 3rd party
import numpy as np
from scipy.signal import hilbert
import matplotlib.pyplot as plt

SCRIPT_DIR = Path(__file__).parent

def main():
    create_chirp_and_analytic_signal_plot()
    create_plot_showing_widely_varying_instantaneous_frequency()

def create_chirp_and_analytic_signal_plot():
    # Create signal parameters
    duration, fs = 1, 1000  # 1 s signal with sampling frequency of 1000 Hz
    t = np.arange(int(fs*duration)) / fs  # timestamps of samples

    # Create amplitude envelope: rises quickly, falls slower
    # Using asymmetric function: peaks around t=0.3, rises faster than falls
    t_peak = 0.3
    rise_rate = 2.0  # Fast rise
    fall_rate = 0.8  # Slower fall

    amplitude_envelope = np.zeros_like(t)
    rise_mask = t <= t_peak
    fall_mask = t > t_peak

    # Rise phase: exponential rise
    amplitude_envelope[rise_mask] = np.exp(rise_rate * (t[rise_mask] / t_peak - 1))
    # Fall phase: slower exponential decay
    amplitude_envelope[fall_mask] = np.exp(-fall_rate * (t[fall_mask] - t_peak) / (duration - t_peak))

    # Normalize to [0, 1]
    amplitude_envelope = amplitude_envelope / np.max(amplitude_envelope)

    # Create amplitude modulated chirp signal (~10 cycles, frequency slowly increases)
    f0 = 5.0   # Start frequency (Hz)
    f1 = 30.0  # End frequency (Hz)
    # Linear chirp: frequency increases linearly from f0 to f1
    # Phase is integral of frequency: phase = 2π * ∫f(t)dt
    instantaneous_frequency = f0 + (f1 - f0) * t / duration
    phase = 2.0 * np.pi * (f0 * t + (f1 - f0) * t**2 / (2.0 * duration))
    signal = amplitude_envelope * np.sin(phase)

    # Calculate Hilbert transform
    analytic_signal: np.ndarray = hilbert(signal)  # type: ignore
    hilbert_transform = np.imag(analytic_signal)

    # Calculate instantaneous frequency and phase from analytic signal
    phase_analytic = np.unwrap(np.angle(analytic_signal))
    instantaneous_frequency_analytic = np.gradient(phase_analytic, t) / (2.0 * np.pi)

    # Create time domain comparison plot
    fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(12, 12))

    # Time domain plot
    ax1.plot(t, signal, label='Original signal', linewidth=2, alpha=0.8)
    # ax1.plot(t, hilbert_transform, label='Hilbert Transform', linewidth=2, alpha=0.8, linestyle='--')
    ax1.plot(t, amplitude_envelope, label='Instantaneous amplitude calculated from analytic signal', linewidth=1.5, alpha=0.6, linestyle='-', color='red')
    ax1.legend()
    ax1.set_xlabel('Time [s]')
    ax1.set_ylabel('Amplitude')
    ax1.set_title('Signal and instantaneous amplitude calculated from analytic signal')
    ax1.grid(True, alpha=0.3)

    # Phase plot
    ax2.plot(t, phase_analytic, label='Instantaneous phase calculated from analytic signal', linewidth=2, alpha=0.8, color='purple')
    ax2.legend()
    ax2.set_xlabel('Time [s]')
    ax2.set_ylabel('Phase [rad]')
    ax2.set_title('Instantaneous phase')
    ax2.grid(True, alpha=0.3)

    # Instantaneous frequency plot
    ax3.plot(t, instantaneous_frequency_analytic, label='Instantaneous frequency calculated from analytic signal', linewidth=2, alpha=0.8, color='green')
    ax3.plot(t, instantaneous_frequency, label='Theoretical frequency', linewidth=1.5, alpha=0.6, linestyle='--', color='red')
    ax3.legend()
    ax3.set_xlabel('Time [s]')
    ax3.set_ylabel('Frequency [Hz]')
    ax3.set_title('Instantaneous Frequency')
    ax3.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'chirp-and-analytic-signal.png', dpi=150, bbox_inches='tight')
    plt.close()

def create_plot_showing_widely_varying_instantaneous_frequency():
    # 1. Setup Time
    fs = 10000       # High sample rate for smooth derivatives
    duration = 0.2   # Short duration (0.2 seconds) to zoom in
    t = np.arange(0, duration, 1/fs)

    # 2. Create a "Piano Chord" (C Major Triad: C4, E4, G4)
    # We add them together to make a SINGLE real-valued signal
    f1, f2, f3 = 261.63, 329.63, 392.00
    signal = np.sin(2*np.pi*f1*t) + np.sin(2*np.pi*f2*t) + np.sin(2*np.pi*f3*t)

    # 3. Calculate Analytic Signal (Hilbert Transform)
    analytic_signal: np.ndarray = hilbert(signal)  # type: ignore

    # 4. Extract Instantaneous Phase and Frequency
    instantaneous_phase = np.unwrap(np.angle(analytic_signal))
    instantaneous_freq = (np.diff(instantaneous_phase) / (2.0*np.pi) * fs)

    # 5. Plotting
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), sharex=True)

    # Plot the real signal (Voltage/Pressure)
    ax1.plot(t, signal)
    ax1.set_title("The Real Signal (Sum of 3 Sinusoids)")
    ax1.set_ylabel("Amplitude")
    ax1.grid(True, alpha=0.3)

    # Plot the Instantaneous Frequency
    # We simply duplicate the last freq value to match the time vector length
    freq_plot = np.append(instantaneous_freq, instantaneous_freq[-1]) 

    ax2.plot(t, freq_plot)
    ax2.set_title("Instantaneous Frequency (via analytic signal)")
    ax2.set_ylabel("Frequency (Hz)")
    ax2.set_xlabel("Time (s)")
    ax2.grid(True, alpha=0.3)

    # Highlight the 'Average' frequency for reference
    avg_freq = (f1 + f2 + f3) / 3
    ax2.axhline(avg_freq, color='blue', linestyle='--', label=f"Average Freq ({avg_freq:.1f} Hz)")
    ax2.legend()

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'widely-varying-instantaneous-frequency.png', dpi=150, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    main()
