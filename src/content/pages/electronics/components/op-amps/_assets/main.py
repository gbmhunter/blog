# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "matplotlib==3.8.3",
#     "numpy==1.26.4",
#     "scipy==1.15.2",
# ]
# ///
from pathlib import Path

import matplotlib.pylab as plt
import numpy as np
from scipy import signal

SCRIPT_DIR = Path(__file__).parent


def main():
    create_ideal_diode_basic_response()
    create_slew_rate_distortion_diagrams()
    create_differentiator_io_waveforms()
    create_differentiator_bode_plot_general()
    create_differentiator_bode_plot_example()


def create_differentiator_io_waveforms():
    # Ideal, inverting differentiator: vout = -k * d(vin)/dt. Outputs are
    # normalised because the true amplitude scales with Rf*C and frequency.
    # Generate a little beyond the [0, 2] view window (and space samples so the
    # half-period transitions land exactly on samples) so that every *visible*
    # square/triangle edge gets a proper centred derivative - giving uniform
    # spike heights and no endpoint artifacts inside the plot.
    t = np.linspace(-0.1, 2.1, 2201)  # two periods of a 1Hz signal, padded
    w = 2 * np.pi * 1.0 * t

    def deriv_norm(x):
        d = -np.gradient(x, t)  # negative sign -> inverting differentiator
        peak = np.max(np.abs(d))
        return d / peak if peak else d

    panels = [
        ('Sine wave', np.sin(w)),
        ('Triangle wave', signal.sawtooth(w, width=0.5)),
        ('Square wave', signal.square(w)),
    ]

    fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(11, 9), sharex=True)
    for row, (name, x) in enumerate(panels):
        ax_in, ax_out = axes[row]
        ax_in.plot(t, x, color='tab:blue')
        ax_out.plot(t, deriv_norm(x), color='tab:orange')
        ax_in.set_ylabel(f'{name}\nAmplitude')
        for ax in (ax_in, ax_out):
            ax.set_ylim(-1.3, 1.3)
            ax.set_xlim(0, 2)
            ax.grid()

    axes[0][0].set_title('Input ($v_{in}$)')
    axes[0][1].set_title('Output ($v_{out}$, normalised)')
    axes[-1][0].set_xlabel('Time (periods)')
    axes[-1][1].set_xlabel('Time (periods)')

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'differentiator-input-output-waveforms.png')


def _differentiator_bode_mag_dB(f, Ri, Ci, Rf, Cf):
    """Return the magnitude (in dB) of the practical differentiator's response.

    H(s) = -Rf*s*Ci / [(1 + s*Rf*Cf)(1 + s*Ri*Ci)]
    """
    w = 2 * np.pi * f
    mag = (Rf * w * Ci) / (
        np.sqrt(1 + (w * Rf * Cf) ** 2) * np.sqrt(1 + (w * Ri * Ci) ** 2)
    )
    return 20 * np.log10(mag)


def create_differentiator_bode_plot_general():
    # Underlying values are hidden - this plot is symbolic. They only need to
    # give f1 < f2 with a wide enough gap for a clearly flat plateau.
    Ri, Ci, Rf, Cf = 1e3, 100e-9, 100e3, 10e-12

    f1 = 1 / (2 * np.pi * Ri * Ci)  # Gain-limiting corner
    f2 = 1 / (2 * np.pi * Rf * Cf)  # Feedback roll-off corner
    plateau_dB = 20 * np.log10(Rf / Ri)

    f = np.logspace(1, 7, 1000)
    mag_dB = _differentiator_bode_mag_dB(f, Ri, Ci, Rf, Cf)

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(f, mag_dB)

    ax.axvline(f1, color='gray', linestyle='--')
    ax.axvline(f2, color='gray', linestyle='--')
    ax.axhline(plateau_dB, color='gray', linestyle=':')

    ax.annotate('+20 dB/decade', xy=(f1 / 25, plateau_dB - 22),
                ha='center', color='tab:blue')
    ax.annotate('Flat at $-R_f/R_i$', xy=(np.sqrt(f1 * f2), plateau_dB - 8),
                ha='center', color='tab:blue')
    ax.annotate('$-$20 dB/decade', xy=(f2 * 25, plateau_dB - 22),
                ha='center', color='tab:blue')

    ax.set_xscale('log')
    ax.set_xticks([f1, f2])
    ax.set_xticklabels(['$f_1$', '$f_2$'])
    ax.set_yticks([plateau_dB])
    ax.set_yticklabels(['$\\left|\\dfrac{R_f}{R_i}\\right|$'])
    ax.set_xlabel('Frequency (log scale)')
    ax.set_ylabel('Gain')

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'differentiator-amplifier-bode-plot-general.png')


def create_differentiator_bode_plot_example():
    # Design example: differentiate up to ~10kHz, roll off after ~120kHz, with
    # a mid-band gain of 10. See the worked design steps on the op-amps page.
    Ri = 1.59e3   # Input resistor [Ohms]
    Ci = 10e-9    # Input capacitor [F]
    Rf = 15.9e3   # Feedback resistor [Ohms]
    Cf = 83e-12   # Feedback capacitor [F]

    f1 = 1 / (2 * np.pi * Ri * Ci)  # Gain-limiting corner
    f2 = 1 / (2 * np.pi * Rf * Cf)  # Feedback roll-off corner
    plateau_dB = 20 * np.log10(Rf / Ri)

    f = np.logspace(1, 7, 1000)  # 10Hz to 10MHz
    mag_dB = _differentiator_bode_mag_dB(f, Ri, Ci, Rf, Cf)

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(f, mag_dB, label='|Gain|')

    ax.axvline(f1, color='tab:green', linestyle='--',
               label=f'$f_1$ = {f1/1e3:.1f} kHz')
    ax.axvline(f2, color='tab:red', linestyle='--',
               label=f'$f_2$ = {f2/1e3:.1f} kHz')

    ax.annotate('Differentiates\n(+20 dB/decade)', xy=(f1 / 30, plateau_dB - 26),
                ha='center', color='tab:blue')
    ax.annotate(f'Flat at $-R_f/R_i$\n({plateau_dB:.0f} dB)',
                xy=(np.sqrt(f1 * f2), plateau_dB - 9), ha='center', color='tab:blue')
    ax.annotate('Rolls off\n($-$20 dB/decade)', xy=(f2 * 30, plateau_dB - 26),
                ha='center', color='tab:blue')

    ax.set_xscale('log')
    ax.set_xlabel('Frequency [Hz]')
    ax.set_ylabel('Gain [dB]')
    ax.grid(which='both')
    ax.legend(loc='lower center')

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'differentiator-amplifier-bode-plot-example.png')


def create_ideal_diode_basic_response():
    x_vals = np.linspace(-10, 10, 100)
    y_vals = np.where(x_vals > 0, x_vals, 0)

    size=15
    params = {
        # 'font.family': "Times New Roman",
        'legend.fontsize': 'large',
        'figure.figsize': (20, 8),
        'axes.labelsize': size*1.5,
        'axes.titlesize': size,
        'xtick.labelsize': size*0.75,
        'ytick.labelsize': size*0.75,
        'axes.titlepad': 25}
    plt.rcParams.update(params)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(x_vals, y_vals)
    ax.set_xticks(np.arange(-10, 10 + 2, 2))
    ax.set_xlabel('$v_{in}$')
    ax.set_ylabel('$v_{out}$')
    ax.grid()
    ax.set_aspect('equal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'ideal-diode-basic-response.png')


def ratelimit(x: np.ndarray, t: np.ndarray, rlim: float):
    """
    Args:
        x: Array of values at each time in t.
        t: Array of times for each value in x. Each time does not have to be evenly spaced.
        rlim: The maximum rate of change of x in units [units x per units t].
    """
    def helper():
        y = x[0]
        tprev = t[0] 
        for (xi, ti) in zip(x, t):
            dy = xi - y
            dt = ti - tprev
            y += np.clip(dy, -rlim*dt, rlim*dt)
            tprev = ti
            yield y
    return np.array(list(helper()))


def create_slew_rate_distortion_diagrams():
    slew_rate_Vpus = 0.4
    time_vals_us = np.linspace(0, 500, 1000)

    input_waveform_vals = np.where((time_vals_us > 100) & (time_vals_us < 300), 10, 0)
    output_waveform_vals = ratelimit(input_waveform_vals, time_vals_us, slew_rate_Vpus)

    size = 15
    params = {
        # 'font.family': "Times New Roman",
        'legend.fontsize': 'medium',
        'figure.figsize': (20, 8),
        'axes.labelsize': size,
        'axes.titlesize': size,
        'xtick.labelsize': size*0.75,
        'ytick.labelsize': size*0.75,
        'axes.titlepad': 25}
    plt.rcParams.update(params)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(time_vals_us, input_waveform_vals, label='Input')
    ax.plot(time_vals_us, output_waveform_vals, label='Output (0.4V/us slew limit)')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.grid()
    ax.legend()
    # ax.set_aspect('equal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'slew-rate-distortion-diagram-square-wave.png')

    # With 0.4V/us slew rate and 10V peak signal, fmax=6.37kHz (before distortion)
    sine_wave_freq_Hz = 20e3
    voltage_peak_V = 10.0
    time_vals_us = np.linspace(0, 100, 1000)
    input_waveform_vals = voltage_peak_V*np.sin(2*np.pi*sine_wave_freq_Hz*time_vals_us)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(time_vals_us, input_waveform_vals, label='Input (20kHz sine wave)')
    ax.plot(time_vals_us, ratelimit(input_waveform_vals, time_vals_us, 0.4), label='Output (0.4V/us slew limit)')    
    ax.plot(time_vals_us, ratelimit(input_waveform_vals, time_vals_us, 1.0), label='Output (1.0V/us slew limit)')
    ax.set_xlabel('$Time\ [us]$')
    ax.set_ylabel('$Voltage\ [V]$')
    ax.grid()
    ax.legend()
    # ax.set_aspect('equal')
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'slew-rate-distortion-diagram-sine-wave.png')


if __name__ == '__main__':
    main()