from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from scipy import signal

import util

SCRIPT_DIR = Path(__file__).parent

def main():
    # create_simulation_plots()
    create_aliasing_plot()

def create_simulation_plots():
    # Seed the random number generator with a constant value so we get a repeatable result
    np.random.seed(42)

    # Simulate a 2V signal, and add on some random noise

    RANDOM_NOISE_SD = 0.1
    RANDOM_NOISE_AMPLITUDE = 0.1
    NUM_DIGITAL_SAMPLES = 1000
    MAINS_FREQUENCY_HZ = 50
    MAINS_NOISE_AMPLITUDE = 0.01

    # Make the sampling period just out of sync with the mains frequency
    DIGITAL_SAMPLING_PERIOD_S = 0.1001

    # The +- amount around the 2V signal to limit the y-axis too on zoomed in plots
    DELTA_Y = 30e-3 # 30mV

    total_sim_time_s = (NUM_DIGITAL_SAMPLES - 1) * DIGITAL_SAMPLING_PERIOD_S

    #=========================================
    # Analogue signal
    #=========================================

    # Create graph of what the analog signal looks like. Need to make sure we sample well above the Nyquist frequency
    # Given the mains is 50Hz, lets have a sample interval of 1ms
    ANALOG_SAMPLING_PERIOD_S = 0.001
    analogue_sampling_times_s = []
    analogue_signal = []
    current_time_s = 0
    while current_time_s < total_sim_time_s:
        analogue_sampling_times_s.append(current_time_s)
        random_noise = RANDOM_NOISE_AMPLITUDE * np.random.normal(0, RANDOM_NOISE_SD)
        mains_noise = MAINS_NOISE_AMPLITUDE * np.sin(2 * np.pi * MAINS_FREQUENCY_HZ * current_time_s)
        # print(f'random_noise: {random_noise}, mains_noise: {mains_noise}')
        sampled_value = 2 + random_noise + mains_noise
        analogue_signal.append(sampled_value)
        current_time_s += ANALOG_SAMPLING_PERIOD_S

    # Plot the analogue signal
    fig, ax = plt.subplots()
    ax.plot(analogue_sampling_times_s, analogue_signal)
    ax.set_title("Analogue Signal")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(0, 2.5)
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "analogue-signal.png")

    # Make another plot, zoomed in on the first 100 samples
    fig, ax = plt.subplots()
    ax.plot(analogue_sampling_times_s[:100], analogue_signal[:100])
    ax.set_title("Analogue Signal (Zoomed)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "analogue-signal-zoomed.png")

    #=========================================
    # Raw digital sampling
    #=========================================

    # Now linearly interpolate the analogue signal to the digital sampling times
    basic_digital_sampling_times_s = np.arange(0, total_sim_time_s, DIGITAL_SAMPLING_PERIOD_S)
    basic_digital_sampling_signal = np.interp(basic_digital_sampling_times_s, analogue_sampling_times_s, analogue_signal)

    # Plot the signal
    fig, ax = plt.subplots()
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_signal)
    ax.set_title("Sampled Signal")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "sampled-signal-with-noise.png")

    # Now run this through a EMA filter
    basic_digital_sampling_filtered_values = []
    alpha = 0.05
    for i in range(len(basic_digital_sampling_signal)):
        if i == 0:
            basic_digital_sampling_filtered_values.append(basic_digital_sampling_signal[i])
        else:
            basic_digital_sampling_filtered_values.append(alpha * basic_digital_sampling_signal[i] + (1 - alpha) * basic_digital_sampling_filtered_values[i - 1])

    # Plot the filtered signal
    fig, ax = plt.subplots()
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_filtered_values, color='C0', label=f'Filtered digital signal')
    # Also plot the unfiltered signal as a comparison. Make it in the background
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_signal, color='C1', alpha=0.5, label='Unfiltered digital signal')
    ax.set_title(f"EMA Filtered Signal ($\\alpha = {alpha}$)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "filtered-signal.png")

    #=========================================
    # Add jitter
    #=========================================

    MAX_JITTER_AMOUNT_S = 20*1e-3 # 20ms of jitter, so measurement interval will be in the range [80, 120]ms.

    jittered_sampling_times_s = []
    current_time_s = 0
    jittered_samples = []
    while current_time_s < total_sim_time_s:
        sampling_interval_s = DIGITAL_SAMPLING_PERIOD_S + np.random.uniform(-MAX_JITTER_AMOUNT_S, MAX_JITTER_AMOUNT_S)
        jittered_sampling_times_s.append(current_time_s + sampling_interval_s)
        current_time_s += sampling_interval_s
        jittered_samples.append(np.interp(current_time_s, analogue_sampling_times_s, analogue_signal))

    # Plot the jittered signal
    fig, ax = plt.subplots()
    ax.plot(jittered_sampling_times_s, jittered_samples)
    ax.set_title("Jittered Signal")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "jittered-signal.png")

    # Now filter the jittered signal
    filtered_jittered_samples = filter_signal(jittered_samples, 0.05)

    # Plot the filtered jittered signal
    fig, ax = plt.subplots()
    ax.plot(jittered_sampling_times_s, filtered_jittered_samples, color='C0', label=f'Filtered signal (with jitter)')
    # Also plot the unjittered filtered signal as a comparison
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_filtered_values, color='C1', alpha=0.5, label='Filtered signal (basic)')
    ax.set_title(f"EMA Filtered Jittered Signal ($\\alpha = {alpha}$)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "filtered-jittered-signal.png")

    #=========================================
    # Sample in phase with the mains
    #=========================================

    # Now sample every 100ms, which will be in phase with the 20ms mains period
    SAMPLE_IN_PHASE_INTERVAL_S = 100e-3
    sampled_in_phase_times_s = []
    sampled_in_phase_samples = []
    current_time_s = 0
    while current_time_s < total_sim_time_s:
        sampled_in_phase_times_s.append(current_time_s)
        sampled_in_phase_samples.append(np.interp(current_time_s, analogue_sampling_times_s, analogue_signal))
        current_time_s += SAMPLE_IN_PHASE_INTERVAL_S

    # Plot the sampled in phase signal
    fig, ax = plt.subplots()
    ax.plot(sampled_in_phase_times_s, sampled_in_phase_samples)
    ax.set_title("\"Sampled in Phase\" Signal")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "sampled-in-phase-signal.png")

    # Now filter the sampled in phase signal
    filtered_sampled_in_phase_samples = filter_signal(sampled_in_phase_samples, 0.05)

    # Plot the filtered sampled in phase signal
    fig, ax = plt.subplots()
    ax.plot(sampled_in_phase_times_s, filtered_sampled_in_phase_samples, color='C0', label=f'Filtered signal (sampled in phase)')
    # Plot for filtered signal as a comparison
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_filtered_values, color='C1', alpha=0.5, label='Filtered signal (basic)')
    ax.set_title(f"EMA Filtered \"Sampled in Phase\" Signal ($\\alpha = {alpha}$)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "filtered-sampled-in-phase-signal.png")

    #=========================================
    # Increase the sampling rate
    #=========================================

    # Now sample at 200Hz
    INCREASED_SAMPLING_RATE_HZ = 200
    INCREASED_SAMPLING_PERIOD_S = 1 / INCREASED_SAMPLING_RATE_HZ

    # Now linearly interpolate the analogue signal to the digital sampling times
    increased_sampling_rate_sampling_times_s = np.arange(0, total_sim_time_s, INCREASED_SAMPLING_PERIOD_S)
    increased_sampling_rate_samples = np.interp(increased_sampling_rate_sampling_times_s, analogue_sampling_times_s, analogue_signal)

    # Plot the digital signal
    fig, ax = plt.subplots()
    ax.plot(increased_sampling_rate_sampling_times_s, increased_sampling_rate_samples, color='C0', label=f'Digital signal with increased sampling rate')
    ax.set_title(f"Digital Signal with Increased Sampling Rate ({INCREASED_SAMPLING_RATE_HZ}Hz)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y*2, 2 + DELTA_Y*2)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "increased-sampling-rate-digital-signal.png")

    # Now filter the digital signal
    increased_sampling_rate_filtered_samples = filter_signal(increased_sampling_rate_samples, 0.05)

    # Plot the filtered digital signal
    fig, ax = plt.subplots()
    ax.plot(increased_sampling_rate_sampling_times_s, increased_sampling_rate_filtered_samples, color='C0', label=f'Filtered signal (increased sampling rate)')
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_filtered_values, color='C1', alpha=0.5, label='Filtered signal (basic)')
    ax.set_title(f"EMA Filtered Digital Signal with Increased Sampling Rate ($\\alpha = {alpha}$)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "increased-sampling-rate-filtered-digital-signal.png")

    #=========================================
    # Add an anti-aliasing filter
    #=========================================

    # Now simulate a low-pass RC filter with a cut-off frequency of 1Hz
    RC_TIME_CONSTANT_S = 1e-3
    # Note: This RC constant (1ms) corresponds to a cutoff frequency of approx. 159 Hz.
    # The following code implements the requested 1Hz cutoff filter.

    cutoff_freq_hz = 1.0  # Desired cutoff frequency for the RC filter
    sampling_freq_hz = 1.0 / ANALOG_SAMPLING_PERIOD_S

    # Design a 1st order Butterworth filter (equivalent to an RC filter)
    # Normalize the cutoff frequency by the Nyquist frequency
    nyquist_freq_hz = 0.5 * sampling_freq_hz
    normalized_cutoff = cutoff_freq_hz / nyquist_freq_hz
    
    # Get the filter coefficients (numerator b, denominator a)
    # For a first-order filter, N=1
    b_rc, a_rc = signal.butter(1, normalized_cutoff, btype='low', analog=False)

    # Apply the filter to the analogue signal
    # signal.filtfilt applies the filter forwards and backwards, resulting in zero phase distortion
    analogue_signal_rc_filtered = signal.filtfilt(b_rc, a_rc, analogue_signal)

    # Plot the RC filtered analogue signal
    fig, ax = plt.subplots()
    ax.plot(analogue_sampling_times_s, analogue_signal_rc_filtered, color='C0', label=f'RC Filtered ({cutoff_freq_hz}Hz Cutoff)')
    # Plot the original analogue signal for comparison
    ax.plot(analogue_sampling_times_s, analogue_signal, color='C1', alpha=0.5, label='Original analogue signal')
    ax.set_title(f"Analogue Signal with {cutoff_freq_hz}Hz RC Low-pass Filter")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    # Match the y-limits of the original analogue signal plot for consistency
    ax.set_ylim(0, 2.5) 
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "analogue-signal-rc-filtered.png")

    # Zoom in the y-axis
    fig, ax = plt.subplots()
    ax.plot(analogue_sampling_times_s, analogue_signal_rc_filtered, color='C0', label=f'RC Filtered ({cutoff_freq_hz}Hz Cutoff)')

    # Plot the original analogue signal for comparison
    ax.plot(analogue_sampling_times_s, analogue_signal, color='C1', alpha=0.5, label='Original analogue signal')
    ax.set_title(f"Analogue Signal with {cutoff_freq_hz}Hz RC Low-pass Filter (Zoomed)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y*2, 2 + DELTA_Y*2)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "analogue-signal-rc-filtered-zoomed.png")

    # Now linearly interpolate the analogue signal to the digital sampling times
    basic_digital_sampling_times_s = np.arange(0, total_sim_time_s, DIGITAL_SAMPLING_PERIOD_S)
    digital_signal_rc_filtered = np.interp(basic_digital_sampling_times_s, analogue_sampling_times_s, analogue_signal_rc_filtered)

    # Plot the digital signal
    fig, ax = plt.subplots()
    ax.plot(basic_digital_sampling_times_s, digital_signal_rc_filtered, color='C0', label=f'Filtered signal (with RC filter)')
    # Compare to the original filtered signal
    ax.plot(basic_digital_sampling_times_s, basic_digital_sampling_filtered_values, color='C1', alpha=0.5, label='Filtered signal (basic)')
    ax.set_title(f"Digital Signal with {cutoff_freq_hz}Hz RC Low-pass Filter")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "digital-signal-rc-filtered.png")

def filter_signal(signal_data, alpha):
    filtered_values = []
    for i in range(len(signal_data)):
        if i == 0:
            filtered_values.append(signal_data[i])
        else:
            filtered_values.append(alpha * signal_data[i] + (1 - alpha) * filtered_values[i - 1])
    return filtered_values

def create_aliasing_plot():
    # Define the original high-frequency signal
    analog_freq_hz = 50  # Hz
    analog_period_s = 1 / analog_freq_hz

    # Calculate the period of the aliased signal
    # Based on the sampling rate (every 2.2 original periods), the aliased frequency is analog_freq_hz / 11.0
    aliased_period_s = 11.0 / analog_freq_hz
    num_aliased_cycles_to_show = 3
    total_plot_time_s = num_aliased_cycles_to_show * aliased_period_s

    # High-resolution time for plotting the analog signal smoothly
    analog_time_s = np.linspace(0, total_plot_time_s, 1000)
    analog_signal = np.sin(2 * np.pi * analog_freq_hz * analog_time_s)

    # Define the sampling instances
    # Sample at a frequency slightly less than half the analog frequency to show aliasing
    # Specifically, sample every 2.2 periods of the original signal
    sampling_period_s = 2.2 * analog_period_s
    sampled_times_s = np.arange(0, total_plot_time_s, sampling_period_s)
    sampled_signal_values = np.sin(2 * np.pi * analog_freq_hz * sampled_times_s)

    # Calculate the aliased frequency
    # fs = 1 / sampling_period_s
    # f_alias = abs(analog_freq_hz - round(analog_freq_hz / fs) * fs)
    # More simply, the new wave has to pass through the sampled points.
    # The period of the aliased wave is effectively the sampling period in this constructed example.
    aliased_freq_hz = 1 / sampling_period_s

    # Time for plotting the aliased signal smoothly
    aliased_signal_reconstructed = np.sin(2 * np.pi * aliased_freq_hz * analog_time_s)
    
    # To make the aliased sine wave fit the points, we might need to adjust its phase and amplitude.
    # For simplicity here, we will just connect the dots for the "aliased" wave visual.
    # However, a true aliased sine wave would emerge from the DFT.
    # For visualization, let's construct a sine wave that fits the sampled points.
    # The "apparent" frequency is 1 / sampling_period_s.
    # We need to ensure the phase aligns. The first sample is at t=0, sin(0)=0.
    # The second sample is at t=sampling_period_s. We want sin(2*pi*f_alias*sampling_period_s) = sampled_signal_values[1]
    # Since f_alias * sampling_period_s = 1, sin(2*pi) = 0. This is not quite right for connecting.

    # Let's find the frequency of a sine wave that would pass through the sampled points.
    # The "effective" period of the sampled points is sampling_period_s.
    # So the "effective" frequency is 1/sampling_period_s.
    # The first point is (0,0). The second point is (sampling_period_s, sin(2*pi*analog_freq_hz*sampling_period_s))
    # A sine wave that passes through (0,0) is of the form A*sin(2*pi*f*t).
    # A sine wave that passes through the sampled points:
    # The visual effect is often a wave of frequency |f_original - N * f_sample_rate_actual|
    # For this specific case, sampling_freq = 1 / (2.2 * analog_period_s) = analog_freq_hz / 2.2
    # f_alias = |analog_freq_hz - N * (analog_freq_hz / 2.2)|
    # If N=2, f_alias = |1 - 2/2.2| * analog_freq_hz = |1 - 0.909| * analog_freq_hz = 0.0909 * analog_freq_hz
    # This is analog_freq_hz / 11
    # The period of this aliased wave is 11 * analog_period_s.
    
    aliased_freq_hz_calc = analog_freq_hz / (1 / (2.2 % 1.0)) # This is not robust
    # Let's re-evaluate. The samples occur at t = 0, 2.2*T, 4.4*T, ... where T is original period
    # Values are sin(0), sin(2*pi*10*2.2/10) = sin(2*pi*2.2), sin(2*pi*10*4.4/10) = sin(2*pi*4.4)
    # sin(2*pi*2.2) = sin(4.4*pi) = sin(0.4*pi)
    # sin(2*pi*4.4) = sin(8.8*pi) = sin(0.8*pi) (incorrect: sin(8.8pi) = sin(0.8pi + 4*2pi) = sin(0.8pi))
    # sin(0.4*pi) approx 0.951
    # sin(0.8*pi) approx 0.588

    # The simplest visual is to connect the sampled points with lines,
    # and then show a sine wave that *appears* to be the result.
    # The apparent frequency from the samples:
    # The phase "slips" by 0.2 cycles each time (2.2 periods sampling)
    # So it takes 1 / 0.2 = 5 samples for the phase to "wrap around"
    # The period of the aliased wave is 5 * sampling_period_s = 5 * 2.2 * analog_period_s = 11 * analog_period_s
    # So the aliased frequency is analog_freq_hz / 11.
    
    aliased_freq_hz_visual = analog_freq_hz / (1 / (sampling_period_s/analog_period_s - int(sampling_period_s/analog_period_s)))
    aliased_freq_hz_visual = analog_freq_hz / (1 / (2.2 - 2)) # Correct for this specific case, 0.2
    aliased_freq_hz_visual = analog_freq_hz / 5 # f_original / (1/ (sampling_period_multiple - floor(sampling_period_multiple)))

    # Let sampling_multiple = sampling_period_s / analog_period_s = 2.2
    # fractional_part = sampling_multiple - floor(sampling_multiple) = 0.2
    # aliased_freq_hz = analog_freq_hz * fractional_part # if sampling from below Nyquist (undersampling)
    # This is not quite right.
    # Standard formula: f_alias = |f - k * fs| where k is integer that brings f_alias into [-fs/2, fs/2]
    # fs = 1 / sampling_period_s = analog_freq_hz / 2.2
    # f_alias = |analog_freq_hz - k * (analog_freq_hz / 2.2)|
    # We want the lowest positive frequency.
    # k=2: |1 - 2/2.2|*analog_freq_hz = |(2.2-2)/2.2|*analog_freq_hz = (0.2/2.2)*analog_freq_hz = (1/11)*analog_freq_hz
    # k=3: |1 - 3/2.2|*analog_freq_hz = |(2.2-3)/2.2|*analog_freq_hz = |-0.8/2.2|*analog_freq_hz = (0.8/2.2)*analog_freq_hz = (4/11)*analog_freq_hz
    # So the lowest positive aliased frequency is (1/11) * analog_freq_hz.

    aliased_freq_hz_actual = (analog_freq_hz / 11.0)
    
    # We need to ensure the aliased wave passes through the sampled points.
    # Sampled points are (n * sampling_period_s, sin(2 * pi * analog_freq_hz * n * sampling_period_s))
    # We want aliased_wave(t) = A * sin(2 * pi * aliased_freq_hz_actual * t + phi)
    # For t=0, sin(phi_alias) = 0 => phi_alias = 0 or pi. Let's try 0.
    # For t=sampled_times_s[1] = sampling_period_s:
    # A * sin(2 * pi * (analog_freq_hz/11) * sampling_period_s) = sampled_signal_values[1]
    # A * sin(2 * pi * (analog_freq_hz/11) * 2.2 * (1/analog_freq_hz)) = sampled_signal_values[1]
    # A * sin(2 * pi * (2.2/11)) = sampled_signal_values[1]
    # A * sin(2 * pi * 0.2) = sampled_signal_values[1]
    # A * sin(0.4 * pi) = sin(2 * pi * analog_freq_hz * sampling_period_s)
    # A * sin(0.4 * pi) = sin(2 * pi * analog_freq_hz * 2.2/analog_freq_hz)
    # A * sin(0.4 * pi) = sin(4.4 * pi) = sin(0.4*pi)
    # So A = 1, phi = 0 works for this case.

    aliased_signal_to_plot = np.sin(2 * np.pi * aliased_freq_hz_actual * analog_time_s)


    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(analog_time_s, analog_signal, label=f'Analog Signal ({analog_freq_hz} Hz)', color='C1', linewidth=1.5)
    ax.scatter(sampled_times_s, sampled_signal_values, color='red', s=50, zorder=5, label=f'Sampled Points (every {sampling_period_s/analog_period_s:.1f} original periods)')
    
    # Connect sampled points with a line to guide the eye for the aliased frequency
    # ax.plot(sampled_times_s, sampled_signal_values, '--', color='magenta', linewidth=1, label='Path connecting sampled points')

    # Plot the true aliased sine wave
    ax.plot(analog_time_s, aliased_signal_to_plot, color='C0', linewidth=2,
            label=f'Aliased Signal ({aliased_freq_hz_actual:.2f} Hz)')

    ax.set_title("Demonstration of Aliasing")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Amplitude")
    ax.legend(loc='upper right')
    ax.grid(True, which='both', linestyle='--', linewidth=0.5)
    ax.axhline(0, color='black', linewidth=0.5)
    
    # Set specific y-limits if needed, e.g., based on signal amplitude
    ax.set_ylim(-1.5, 1.5)

    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "aliasing-demonstration.png")
    print(f"Saved aliasing demonstration plot to {SCRIPT_DIR / 'aliasing-demonstration.png'}")


if __name__ == "__main__":
    main()