from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    create_ntc_beta_curve_two_point_fit()

def create_ntc_beta_curve_two_point_fit():
    # Same thermistor as used in the worked example on the page
    beta_K = 4120.0
    ref_temp_K = 55.0 + 273.15
    ref_resistance_Ohms = 14.05e3

    def beta_eqn_resistance_Ohms(temp_degC):
        temp_K = temp_degC + 273.15
        return ref_resistance_Ohms*np.exp(beta_K*(1/temp_K - 1/ref_temp_K))

    temps_degC = np.linspace(0, 100, 500)
    resistances_kOhms = beta_eqn_resistance_Ohms(temps_degC)/1e3

    # The two measured points the Beta curve was fitted through
    fit_temps_degC = np.array([25.0, 50.0])
    fit_resistances_kOhms = beta_eqn_resistance_Ohms(fit_temps_degC)/1e3

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(temps_degC, resistances_kOhms, label=r'Fitted Beta curve, $\beta_{25/50} = 4120\,K$')
    ax.plot(fit_temps_degC, fit_resistances_kOhms, 'o', color='C1', markersize=8,
            label='Measured points', zorder=3)

    for i, (temp_degC, resistance_kOhms) in enumerate(zip(fit_temps_degC, fit_resistances_kOhms), start=1):
        ax.annotate(
            rf'$T_{i} = {temp_degC:.0f}\,°C$, $R_{i} = {resistance_kOhms:.1f}\,k\Omega$',
            xy=(temp_degC, resistance_kOhms), xytext=(10, 10), textcoords='offset points')

    ax.set_xlabel('Temperature [$^{\circ}C$]')
    ax.set_ylabel('Resistance [$k\Omega$]')
    ax.grid()
    ax.legend()

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'ntc-beta-curve-two-point-fit.png')

if __name__ == '__main__':
    main()
