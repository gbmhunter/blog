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
    create_doppler_matched_filter_comparison()


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


def create_doppler_matched_filter_comparison():
    """
    Create comparison plots showing matched filter response for linear vs hyperbolic
    chirps under Doppler shift. Demonstrates the Doppler tolerance of hyperbolic chirps.
    
    Uses ~5% time scaling (alpha = 1.05) to simulate Doppler effect from a moving target.
    """
    from scipy import signal as scipy_signal
    
    # Common parameters for both chirps
    f_0 = 1e3       # Initial frequency: 1 kHz
    f_1 = 8e3       # Final frequency: 8 kHz
    T = 20e-3       # Duration: 20 ms
    phi_0 = 0       # Initial phase: 0 rad
    
    # Doppler scaling factor (5% time compression = target approaching)
    # For radar: alpha = 1 + 2v/c, so alpha=1.05 corresponds to v ≈ 7500 km/s (extreme for EM)
    # For sonar: alpha = 1 + v/c, so alpha=1.05 corresponds to v ≈ 75 m/s (fast boat/torpedo)
    alpha = 1.05
    
    # High sample rate for good resolution
    sample_rate = 500e3  # 500 kHz
    num_samples = int(sample_rate * T)
    t = np.linspace(0, T, num_samples)
    
    # ==========================================================================
    # Generate Linear Chirps
    # ==========================================================================
    # Linear chirp: f(t) = f_0 + c*t where c = (f_1 - f_0) / T
    c_linear = (f_1 - f_0) / T
    
    # Original linear chirp
    phase_linear = phi_0 + 2*np.pi * (c_linear/2 * t**2 + f_0 * t)
    x_linear = np.sin(phase_linear)
    
    # Doppler-shifted linear chirp: s(alpha * t)
    # This is equivalent to compressing the time axis
    phase_linear_doppler = phi_0 + 2*np.pi * (c_linear/2 * (alpha*t)**2 + f_0 * (alpha*t))
    x_linear_doppler = np.sin(phase_linear_doppler)
    # Truncate to original duration (signal ends earlier due to compression)
    
    # ==========================================================================
    # Generate Hyperbolic Chirps
    # ==========================================================================
    # Hyperbolic chirp phase: phi(t) = phi_0 + 2*pi * (-f_0*f_1*T)/(f_1-f_0) * ln(1 - (f_1-f_0)/(f_1*T)*t)
    
    # Original hyperbolic chirp
    phase_hyper = phi_0 + 2*np.pi * (-f_0 * f_1 * T) / (f_1 - f_0) * np.log(1 - (f_1 - f_0)/(f_1*T)*t)
    x_hyper = np.sin(phase_hyper)
    
    # Doppler-shifted hyperbolic chirp: s(alpha * t)
    # Need to be careful with the log argument staying positive
    t_scaled = alpha * t
    # Only compute where the argument is positive
    valid_mask = (1 - (f_1 - f_0)/(f_1*T)*t_scaled) > 0
    x_hyper_doppler = np.zeros_like(t)
    phase_hyper_doppler = phi_0 + 2*np.pi * (-f_0 * f_1 * T) / (f_1 - f_0) * np.log(1 - (f_1 - f_0)/(f_1*T)*t_scaled[valid_mask])
    x_hyper_doppler[valid_mask] = np.sin(phase_hyper_doppler)
    
    # ==========================================================================
    # Compute Matched Filter Outputs (Cross-correlation)
    # ==========================================================================
    # Matched filter = cross-correlation of received signal with transmitted template
    
    # For linear chirp
    corr_linear_orig = scipy_signal.correlate(x_linear, x_linear, mode='full')
    corr_linear_doppler = scipy_signal.correlate(x_linear_doppler, x_linear, mode='full')
    
    # For hyperbolic chirp
    corr_hyper_orig = scipy_signal.correlate(x_hyper, x_hyper, mode='full')
    corr_hyper_doppler = scipy_signal.correlate(x_hyper_doppler, x_hyper, mode='full')
    
    # Normalize all correlations to have peak of 1 (using original chirp's peak as reference)
    corr_linear_orig_norm = corr_linear_orig / np.max(np.abs(corr_linear_orig))
    corr_linear_doppler_norm = corr_linear_doppler / np.max(np.abs(corr_linear_orig))
    corr_hyper_orig_norm = corr_hyper_orig / np.max(np.abs(corr_hyper_orig))
    corr_hyper_doppler_norm = corr_hyper_doppler / np.max(np.abs(corr_hyper_orig))
    
    # Time axis for correlation (centered at zero)
    corr_len = len(corr_linear_orig)
    lag_samples = np.arange(corr_len) - (corr_len - 1) // 2
    lag_ms = lag_samples / sample_rate * 1e3
    
    # ==========================================================================
    # Create Side-by-Side Comparison Plot
    # ==========================================================================
    _, axes = plt.subplots(1, 2, figsize=(14, 5))
    
    # Plot range for detail view (±2 ms around peak)
    plot_range = np.abs(lag_ms) <= 2
    
    # Left plot: Linear chirp matched filter
    ax1 = axes[0]
    ax1.plot(lag_ms[plot_range], corr_linear_orig_norm[plot_range], 
             'b-', linewidth=1.5, label='No Doppler shift')
    ax1.plot(lag_ms[plot_range], corr_linear_doppler_norm[plot_range], 
             'r--', linewidth=1.5, label=f'Doppler shifted (α={alpha})')
    ax1.set_xlabel('Time Lag [ms]')
    ax1.set_ylabel('Normalized Correlation')
    ax1.set_title('Linear Chirp Matched Filter Output')
    ax1.legend(loc='upper right')
    ax1.grid(True, alpha=0.3)
    ax1.set_ylim((-0.3, 1.05))
    
    # Right plot: Hyperbolic chirp matched filter
    ax2 = axes[1]
    ax2.plot(lag_ms[plot_range], corr_hyper_orig_norm[plot_range], 
             'b-', linewidth=1.5, label='No Doppler shift')
    ax2.plot(lag_ms[plot_range], corr_hyper_doppler_norm[plot_range], 
             'r--', linewidth=1.5, label=f'Doppler shifted (α={alpha})')
    ax2.set_xlabel('Time Lag [ms]')
    ax2.set_ylabel('Normalized Correlation')
    ax2.set_title('Hyperbolic Chirp Matched Filter Output')
    ax2.legend(loc='upper right')
    ax2.grid(True, alpha=0.3)
    ax2.set_ylim((-0.3, 1.05))
    
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'doppler-matched-filter-comparison.png', dpi=150)
    plt.close()
    
    # ==========================================================================
    # Create Overlay Plot for Direct Comparison
    # ==========================================================================
    _, ax = plt.subplots(figsize=(10, 6))
    
    # Plot range (±2 ms)
    plot_range_narrow = np.abs(lag_ms) <= 2
    
    ax.plot(lag_ms[plot_range_narrow], corr_linear_doppler_norm[plot_range_narrow], 
            'r-', linewidth=2, label='Linear chirp (Doppler shifted)')
    ax.plot(lag_ms[plot_range_narrow], corr_hyper_doppler_norm[plot_range_narrow], 
            'b-', linewidth=2, label='Hyperbolic chirp (Doppler shifted)')
    
    ax.set_xlabel('Time Lag [ms]')
    ax.set_ylabel('Normalized Correlation')
    ax.set_title(f'Matched Filter Response Comparison (Doppler α={alpha})')
    ax.legend(loc='upper right')
    ax.grid(True, alpha=0.3)
    ax.set_ylim((-0.3, 1.05))
    
    # Add annotation showing peak values
    linear_peak = np.max(corr_linear_doppler_norm)
    hyper_peak = np.max(corr_hyper_doppler_norm)
    ax.annotate(f'Linear peak: {linear_peak:.2f}', xy=(0.02, 0.92), xycoords='axes fraction',
                fontsize=10, color='red')
    ax.annotate(f'Hyperbolic peak: {hyper_peak:.2f}', xy=(0.02, 0.85), xycoords='axes fraction',
                fontsize=10, color='blue')
    
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'doppler-tolerance-overlay.png', dpi=150)
    plt.close()
    
    # ==========================================================================
    # Create Waveform Comparison Plot (Original vs Doppler-shifted)
    # ==========================================================================
    _, axes = plt.subplots(1, 2, figsize=(14, 5))
    
    # Zoom into a portion of the waveform
    t_ms = t * 1e3
    zoom_mask = (t_ms >= 0) & (t_ms <= 5)
    
    # Left plot: Linear chirp waveforms
    ax1 = axes[0]
    ax1.plot(t_ms[zoom_mask], x_linear[zoom_mask], 
             'b-', linewidth=1.5, label='Original', alpha=0.8)
    ax1.plot(t_ms[zoom_mask], x_linear_doppler[zoom_mask], 
             'r--', linewidth=1.5, label=f'Doppler shifted (α={alpha})', alpha=0.8)
    ax1.set_xlabel('Time [ms]')
    ax1.set_ylabel('Amplitude')
    ax1.set_title('Linear Chirp Waveforms')
    ax1.legend(loc='upper right')
    ax1.grid(True, alpha=0.3)
    
    # Right plot: Hyperbolic chirp waveforms
    ax2 = axes[1]
    ax2.plot(t_ms[zoom_mask], x_hyper[zoom_mask], 
             'b-', linewidth=1.5, label='Original', alpha=0.8)
    ax2.plot(t_ms[zoom_mask], x_hyper_doppler[zoom_mask], 
             'r--', linewidth=1.5, label=f'Doppler shifted (α={alpha})', alpha=0.8)
    ax2.set_xlabel('Time [ms]')
    ax2.set_ylabel('Amplitude')
    ax2.set_title('Hyperbolic Chirp Waveforms')
    ax2.legend(loc='upper right')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'doppler-waveform-comparison.png', dpi=150)
    plt.close()
    
    # Print some statistics
    print(f"Linear chirp peak correlation under Doppler: {linear_peak:.3f}")
    print(f"Hyperbolic chirp peak correlation under Doppler: {hyper_peak:.3f}")
    print(f"Hyperbolic advantage: {(hyper_peak/linear_peak - 1)*100:.1f}% higher peak")


if __name__ == "__main__":
    main()