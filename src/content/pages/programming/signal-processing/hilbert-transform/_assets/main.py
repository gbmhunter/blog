from pathlib import Path

import numpy as np
from scipy.signal import hilbert
from scipy.fft import fft, fftfreq
import matplotlib.pyplot as plt

SCRIPT_DIR = Path(__file__).parent

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

# Calculate FFTs for frequency domain comparison
signal_fft = fft(signal)
hilbert_fft = fft(hilbert_transform)
frequencies = fftfreq(len(signal), 1/fs)

# Only plot positive frequencies
positive_freq_mask = frequencies >= 0
frequencies_plot = frequencies[positive_freq_mask]  # type: ignore
signal_fft_plot = np.abs(signal_fft[positive_freq_mask])  # type: ignore
hilbert_fft_plot = np.abs(hilbert_fft[positive_freq_mask])  # type: ignore

# Calculate phase in frequency domain
signal_phase = np.unwrap(np.angle(signal_fft[positive_freq_mask]))  # type: ignore
hilbert_phase = np.unwrap(np.angle(hilbert_fft[positive_freq_mask]))  # type: ignore

# Create time domain comparison plot
fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(12, 14))

# Time domain plot
ax1.plot(t, signal, label='Original Signal', linewidth=2, alpha=0.8)
ax1.plot(t, hilbert_transform, label='Hilbert Transform', linewidth=2, alpha=0.8, linestyle='--')
# ax1.plot(t, amplitude_envelope, label='Amplitude Envelope', linewidth=1.5, alpha=0.6, linestyle=':')
ax1.legend()
ax1.set_xlabel('Time [s]')
ax1.set_ylabel('Amplitude')
ax1.set_title('Time Domain: Original Signal vs Hilbert Transform')
ax1.grid(True, alpha=0.3)

# Frequency domain plot
ax2.plot(frequencies_plot, signal_fft_plot, label='Original Signal', linewidth=2, alpha=0.8)
ax2.plot(frequencies_plot, hilbert_fft_plot, label='Hilbert Transform', linewidth=2, alpha=0.8, linestyle='--')
ax2.legend()
ax2.set_xlabel('Frequency [Hz]')
ax2.set_ylabel('Magnitude')
ax2.set_title('Frequency Domain: Magnitude of Original Signal vs Hilbert Transform')
ax2.set_xlim(0, 50)  # Focus on relevant frequency range
ax2.grid(True, alpha=0.3)

# Phase plot
ax3.plot(frequencies_plot, signal_phase, label='Original Signal', linewidth=2, alpha=0.8)
ax3.plot(frequencies_plot, hilbert_phase, label='Hilbert Transform', linewidth=2, alpha=0.8, linestyle='--')
ax3.legend()
ax3.set_xlabel('Frequency [Hz]')
ax3.set_ylabel('Phase [rad]')
ax3.set_title('Frequency Domain: Phase of Original Signal vs Hilbert Transform')
ax3.set_xlim(0, 50)  # Focus on relevant frequency range
ax3.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig(SCRIPT_DIR / 'original-signal-vs-hilbert-transform.png', dpi=150, bbox_inches='tight')
plt.close()