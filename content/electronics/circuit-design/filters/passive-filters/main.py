import matplotlib.pyplot as plt
import numpy as np

def main():
    create_freq_response_plot()

def create_freq_response_plot():

    RESISTANCE_OHMS = 1e3
    CAPACITANCE_FARADS = 1e-6
    V_IN_VOLTS = 5.0

    LOG_X_MIN = 0
    LOG_X_MAX = 5

    freq_data = np.logspace(LOG_X_MIN, LOG_X_MAX, num=100)

    # Xc = 1 / (2pi fC)
    x_c_data = 1 / (2*np.pi*freq_data*CAPACITANCE_FARADS)

    # Vout = Vin * (Xc / ( sqrt(Xc^2 + R^2) ))
    v_out_data = V_IN_VOLTS*(x_c_data/np.sqrt(x_c_data**2 + RESISTANCE_OHMS**2))

    phase_shift_deg = np.rad2deg(-1*np.arctan(2*np.pi*freq_data*RESISTANCE_OHMS*CAPACITANCE_FARADS))

    fig, ax = plt.subplots(1)

    line1, = ax.plot(freq_data, v_out_data, label='$|V_{out}|$')
    ax2 = ax.twinx()
    line2, = ax2.plot(freq_data, phase_shift_deg, label='$\phi(V_{out})$', color='C2')

    f_cutoff = 1 / (2*np.pi*RESISTANCE_OHMS*CAPACITANCE_FARADS)
    ax.axvline(x=f_cutoff, color='C1')

    ax.set_xscale('log')
    ax.set_xlabel('Frequency f (Hz)')

    x_ticks = [ 10**x for x in range(LOG_X_MIN, LOG_X_MAX + 1) ]
    x_ticks_labels = [ str(x) for x in x_ticks ]
    x_ticks.append(f_cutoff)
    x_ticks_labels.append('$f_c$')

    ax.set_xticks(x_ticks)
    ax.set_xticklabels(x_ticks_labels)
    ax.set
    ax.set_ylabel('$V_{out}$ Magnitude V (V)')

    ax2.set_ylabel('$V_{out}$ Phase $\phi$ (deg)')
    ax2.set_ylim(-135, 45)

    ax.set_title('Frequency Response of a Low-Pass RC Filter')

    lines = [ line1, line2 ]
    ax.legend(lines, [line.get_label() for line in lines ])

    plt.tight_layout()
    plt.savefig('rc-low-pass-filter-frequency-response.png')

if __name__ == '__main__':
    main()