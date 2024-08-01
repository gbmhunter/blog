from cProfile import label
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

script_dir = Path(__file__).parent

def main():
    plot_three_tapers()
    plot_parametric_log_law()
    plot_tapering_resistors()

def plot_parametric_log_law():
    rotation_0_to_1 = np.linspace(0, 1, 1000)
    y_m_array = np.array([0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9])

    fig, ax = plt.subplots(figsize=(7, 7))

    for y_m in y_m_array:
        b = (1/y_m - 1)**2
        # y = (b^x - 1) / (b - 1)
        resistance_0_to_1 = (np.power(b, rotation_0_to_1) - 1) / (b - 1)
        ax.plot(rotation_0_to_1, resistance_0_to_1, label=f'$y_m = {y_m}$')
    ax.set_xlabel('Potentiometer Position Factor [0-1]')
    ax.set_ylabel('Resistance Factor [0-1]')
    ax.set_aspect('equal')
    ax.legend()
    ax.grid()
    plt.tight_layout()
    plt.savefig(script_dir / 'plot-of-parametric-log-law.png')

def plot_three_tapers():
    position_factor = np.linspace(0, 1, 1000)
    resistance_factor_linear_taper = position_factor

    # Set y_m = 0.1 for log taper
    y_m = 0.1
    b = (1/y_m - 1)**2
    resistance_factor_log_taper = (np.power(b, position_factor) - 1) / (b - 1)

    # Set y_m = 0.9 for antilog taper
    y_m = 0.9
    b = (1/y_m - 1)**2
    resistance_factor_antilog_taper = (np.power(b, position_factor) - 1) / (b - 1)

    fig, ax = plt.subplots(figsize=(7, 7))
    ax.plot(position_factor, resistance_factor_linear_taper, label='Linear Taper')
    ax.plot(position_factor, resistance_factor_log_taper, label='Log Taper')
    ax.plot(position_factor, resistance_factor_antilog_taper, label='Antilog Taper')
    ax.set_xlabel('Position Factor [0-1]')
    ax.set_ylabel('Resistance Factor [0-1]')
    ax.set_aspect('equal')
    ax.legend()
    ax.grid()
    plt.tight_layout()
    plt.savefig(script_dir / 'plot-of-tapers.png')


def plot_tapering_resistors():
    position_factor = np.linspace(0, 1, 1000)
    vin_V = 1.0
    r_pot = 1.0
    r_taper = 0.1  # As a proportion of R, the resistance of the pot

    # TAPERING RESISTOR: LOG
    # r_bot = r_pot_position || r_taper
    r_bot = (r_pot*position_factor * r_taper) / \
        (r_pot*position_factor + r_taper)
    r_top = 1 - r_pot*position_factor
    tapering_res_log_v_out = (r_bot / (r_top + r_bot)) * vin_V

    # Compare with proper log taper
    # Set y_m = 0.1 for log taper
    y_m = 0.1
    b = (1/y_m - 1)**2
    actual_log_taper = (np.power(b, position_factor) - 1) / (b - 1)

    # TAPERING RESISTOR: ANTILOG
    # r_top = (1 - r_pot_position) || r_taper
    r_top = (r_pot*(1 - position_factor) * r_taper) / \
        (r_pot*(1 - position_factor) + r_taper)
    r_bot = r_pot*position_factor
    tapering_res_antilog_v_out = (r_bot / (r_top + r_bot)) * vin_V

    # Compare with proper antilog taper
    # Set y_m = 0.1 for antilog taper
    y_m = 0.9
    b = (1/y_m - 1)**2
    actual_antilog_taper = (np.power(b, position_factor) - 1) / (b - 1)

    # TAPERING RESISTOR: LOG-ANTILOG
    # r_top = (1 - r_pot_position) || r_taper
    # r_bot = r_pot_position || r_taper
    r_top = (r_pot*(1 - position_factor) * r_taper) / \
        (r_pot*(1 - position_factor) + r_taper)
    r_bot = (r_pot*position_factor * r_taper) / \
        (r_pot*position_factor + r_taper)
    tapering_res_logantilog_v_out = (r_bot / (r_top + r_bot)) * vin_V

    # PLOT
    fig, axes = plt.subplots(nrows=1, ncols=3, figsize=(20, 7))

    ax = axes[0]
    ax.plot(position_factor, tapering_res_log_v_out, label='Log Tapering Resistor ($R_{taper} = 0.1R_{pot}$)') 
    ax.plot(position_factor, actual_log_taper, label='Actual Log Taper ($y_m = 0.1$)')   
    ax.set_xlabel('Position Factor [0-1]', fontsize=12)
    ax.set_ylabel('$\\frac{V_{OUT}}{V_{IN}}$ [V/V]', fontsize=15)
    ax.set_aspect('equal')
    ax.set_title('Log Tapering Resistor Response')
    ax.legend()
    ax.grid()

    ax = axes[1]
    ax.plot(position_factor, tapering_res_antilog_v_out, label='Antilog Tapering Resistor ($R_{taper} = 0.1R_{pot}$)') 
    ax.plot(position_factor, actual_antilog_taper, label='Actual Antilog Taper ($y_m = 0.9$)')   
    ax.set_xlabel('Position Factor [0-1]', fontsize=12)
    ax.set_ylabel('$\\frac{V_{OUT}}{V_{IN}}$ [V/V]', fontsize=15)
    ax.set_aspect('equal')
    ax.set_title('Antilog Tapering Resistor Response')
    ax.legend()
    ax.grid()

    ax = axes[2]
    ax.plot(position_factor, tapering_res_logantilog_v_out, label='Log-Antilog Tapering Resistor ($R_{taper} = 0.1R_{pot}$)')       
    ax.set_xlabel('Position Factor [0-1]', fontsize=12)
    ax.set_ylabel('$\\frac{V_{OUT}}{V_{IN}}$ [V/V]', fontsize=15)
    ax.set_aspect('equal')
    ax.set_title('Log-Antilog Tapering Resistor Response')
    ax.legend()
    ax.grid()

    # Save finished plot
    plt.tight_layout()
    plt.savefig(script_dir / 'tapering-resistor-plots.png')



if __name__ == '__main__':
    main()