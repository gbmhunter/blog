from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

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

    total_sim_time_s = (NUM_DIGITAL_SAMPLES - 1) * DIGITAL_SAMPLING_PERIOD_S

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
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "analogue-signal-zoomed.png")

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
    ax.plot(digital_sampling_times_s, filtered_values)
    ax.set_title(f"EMA Filtered Signal ($\\alpha = {alpha}$)")
    ax.set_xlabel("Time [s]")
    ax.set_ylabel("Voltage [V]")
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_DIR / "filtered-signal.png")

    


if __name__ == "__main__":
    main()