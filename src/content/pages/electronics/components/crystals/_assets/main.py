import numpy as np
import matplotlib.pyplot as plt

def main():
    create_32768_crystal_drift()

def create_32768_crystal_drift():
    turnover_temp_degC = 25.0
    min_temp_degC = -40.0
    max_temp_degC = 85.0
    temps_degC = np.linspace(min_temp_degC, max_temp_degC, 100)
    alpha_ppm_per_degC2 = -0.034

    drifts_ppm = alpha_ppm_per_degC2*(temps_degC - turnover_temp_degC)**2
    fig, ax = plt.subplots()
    ax.plot(temps_degC, drifts_ppm, label='32.678kHZ crystal drift')
    ax.axvline(turnover_temp_degC, ls='--', label='Turnover temperature')
    ax.set_xlabel('Temperature [$^{\circ}C$]')
    ax.set_ylabel('Drift [ppm]')
    ax.grid()
    ax.legend()
    plt.tight_layout()
    plt.savefig('32768khz-crystal-drift.png')

if __name__ == '__main__':
    main()