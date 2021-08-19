import matplotlib.pyplot as plt
import numpy as np


def main():
    plot_vout_vin_duty_cycle()


def plot_vout_vin_duty_cycle():
    # Ratio shoots of to infinity as you get close to 1, so stop at 0.9
    duty_cycle = np.linspace(0.01, 0.90, 100)
    # Equation ignoring the negative sign
    vout_to_vin = duty_cycle / (1 - duty_cycle)

    fig, ax = plt.subplots(figsize=(7, 7))
    ax.plot(duty_cycle, vout_to_vin)
    # Draw line where ratio is 1 (duty cycle = 50%)
    ax.hlines(1.0, xmin=0.0, xmax=0.5, linestyle='--', color='C1')
    ax.vlines(0.5, ymin=0.0, ymax=1.0, linestyle='--', color='C1')

    ax.set_xlim(0, 1)
    ax.set_ylim(0, 10)

    ax.set_xlabel('Duty Cycle $D$')
    ax.set_ylabel('Voltage Ratio $|\\frac{V_{OUT}}{V_{IN}}|$')
    plt.tight_layout()
    plt.savefig('vout-to-vin-vs-duty-cycle-buck-boost.png')


if __name__ == '__main__':
    main()
