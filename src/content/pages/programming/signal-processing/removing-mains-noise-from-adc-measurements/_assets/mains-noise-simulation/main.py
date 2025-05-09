from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from scipy import signal

import util

SCRIPT_DIR = Path(__file__).parent

def main():
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
    digital_sampling_times_s = np.arange(0, total_sim_time_s, DIGITAL_SAMPLING_PERIOD_S)
    digital_signal = np.interp(digital_sampling_times_s, analogue_sampling_times_s, analogue_signal)

    # Plot the signal
    fig, ax = plt.subplots()
    ax.plot(digital_sampling_times_s, digital_signal)
    ax.set_title("Sampled Signal")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "sampled-signal-with-noise.png")

    # Now run this through a EMA filter
    filtered_values = []
    alpha = 0.05
    for i in range(len(digital_signal)):
        if i == 0:
            filtered_values.append(digital_signal[i])
        else:
            filtered_values.append(alpha * digital_signal[i] + (1 - alpha) * filtered_values[i - 1])

    # Plot the filtered signal
    fig, ax = plt.subplots()
    ax.plot(digital_sampling_times_s, filtered_values, color='C0', label=f'Filtered digital signal')
    # Also plot the unfiltered signal as a comparison. Make it in the background
    ax.plot(digital_sampling_times_s, digital_signal, color='C1', alpha=0.5, label='Unfiltered digital signal')
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
    ax.plot(jittered_sampling_times_s, filtered_jittered_samples, color='C0', label=f'Filtered jittered signal')
    # Also plot the unjittered filtered signal as a comparison
    ax.plot(digital_sampling_times_s, filtered_values, color='C1', alpha=0.5, label='Filtered non-jittered signal')
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
    ax.plot(sampled_in_phase_times_s, filtered_sampled_in_phase_samples, color='C0', label=f'Filtered sampled in phase signal')
    # Plot for filtered signal as a comparison
    ax.plot(digital_sampling_times_s, filtered_values, color='C1', alpha=0.5, label='Basic filtered signal')
    ax.set_title(f"EMA Filtered \"Sampled in Phase\" Signal ($\\alpha = {alpha}$)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    ax.set_ylim(2 - DELTA_Y, 2 + DELTA_Y)
    ax.legend()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "filtered-sampled-in-phase-signal.png")

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
    digital_sampling_times_s = np.arange(0, total_sim_time_s, DIGITAL_SAMPLING_PERIOD_S)
    digital_signal_rc_filtered = np.interp(digital_sampling_times_s, analogue_sampling_times_s, analogue_signal_rc_filtered)

    # Plot the digital signal
    fig, ax = plt.subplots()
    ax.plot(digital_sampling_times_s, digital_signal_rc_filtered, color='C0', label=f'RC filtered digital signal')
    # Compare to the original filtered signal
    ax.plot(digital_sampling_times_s, filtered_values, color='C1', alpha=0.5, label='Original filtered signal')
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

if __name__ == "__main__":
    main()