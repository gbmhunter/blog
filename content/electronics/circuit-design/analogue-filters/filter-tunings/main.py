import math
from pathlib import Path

from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import scipy.signal
from sympy import *
from tabulate import tabulate

SCRIPT_DIR = Path(__file__).parent

def main():
    create_butterworth_magnitude_plot()
    create_butterworth_factored_polynomial_table()
    create_butterworth_polynomial_coeffs_table()

def calc_butterworth_coeffs_for_order(n):
    # Equation from https://en.wikipedia.org/wiki/Butterworth_filter
    # {\displaystyle a_{k}=\prod _{\mu =1}^{k}{\frac {\cos((\mu -1)\gamma )}{\sin(\mu \gamma )}}\,,}
    # Coefficients are returned in a list, in this order: [ a0, a1, ..., an ]
    gamma = np.pi / (2*n)
    # Need to calculate n + 1 coefficients
    coeffs = []
    for k in range(n + 1):
        if k == 0:
            coeffs.append(1.0)
        else:
            # Use product formula
            product = 1.0
            for mew in range(1, k + 1):
                product *= np.cos((mew - 1)*gamma) / np.sin(mew * gamma)
            coeffs.append(product)
    return coeffs

def create_butterworth_magnitude_plot():
    """
    Creates a bode plot (mag and phase) of various order Butterworth tunings, with
    n = 1, 2, 4, 8.
    """

    fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(15, 7))
    for n in [1, 2, 4, 8]:
        coeffs = calc_butterworth_coeffs_for_order(n)
        # Reverse coeffs, scipy wants them from highest power to lowest
        coeffs = np.flip(coeffs)
        sys = scipy.signal.TransferFunction([1], coeffs)
        w = np.linspace(1e-1, 1e1, 500)
        w, mag, phase = scipy.signal.bode(sys, w)

        ax = axes[0]
        ax.plot(w, mag, label=f'n={n}')
        
        ax = axes[1]
        ax.plot(w, phase, label=f'n={n}')

    ax = axes[0]
    ax.set_xlabel('$\omega$ [$rads^{-1}$]')
    ax.set_ylabel('Gain [$dB$]')
    ax.set_xscale('log')
    ax.set_ylim(-60, 1)
    ax.axvline(x=1, ls='--', c='0.5') # Draw vertical line at characteristic freq.
    ax.legend()
    ax.grid(which='both')

    ax = axes[1]
    ax.set_xlabel('$\omega$ [$rads^{-1}$]')
    ax.set_ylabel('Phase [$deg$]')
    ax.set_xscale('log')
    ax.set_ylim(-360, 0)
    ax.axvline(x=1, ls='--', c='0.5') # Draw vertical line at characteristic freq.
    ax.legend()
    ax.grid(which='both')

    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'butterworth-bode-plot-for-various-n.png')

def create_butterworth_factored_polynomial_table():
    
    def create_polynomial_expr(n):
        """
        Generates a printable sympy expression of the factored Butterworth polynomial of degree n  
        Polynomial equations from https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Analog-Filters/Butterworth-Filters.html
        """
        init_printing(use_unicode=True)
        s = symbols('s')        
        if n % 2 == 0:
            # n is even
            end = n//2
            output = 1
        else:
            # n is off
            output = (s + 1)
            end = (n - 1)//2
        # The rest is the same regardless of odd or even
        for k in range(end):
            # The round to 3 decimal places below keeps the printed number sensible
            output *= (s**2 - round(2*math.cos(2*math.pi*(2*k + n + 1)/(4*n)), 3)*s + 1)
        return output

    table = [['n', 'polynomial']]
    for i in range(1, 9):
        poly = create_polynomial_expr(i)
        # If we are a 1st or 2nd order filter, add brackets manually as these
        # are removed by sympy
        if i == 1 or i == 2:
            table.append([f'{i}', f'\(({latex(poly)})\)'])
        else:
            table.append([f'{i}', f'\({latex(poly)}\)'])

    html_table = tabulate(table, headers='firstrow', tablefmt='html')
    soup = BeautifulSoup(html_table, features='html.parser')
    
    # Add a fixed width to column with latex equations in it, otherwise the table width goes crazy
    second_col = soup.table.thead.tr.find_all('th')[1]
    second_col['style'] = 'width: 700px;'    
    table_file_path = SCRIPT_DIR / 'butterworth-factored-polynomial-table.html'
    with table_file_path.open('w') as file:
        file.write(soup.prettify())

def create_butterworth_polynomial_coeffs_table():
    """
    Creates an HTML table containing Butterworth polynomial coefficients, and writes it to a file.
    """
    

    table = [['n', '\(a_0\)', '\(a_1\)', '\(a_2\)', '\(a_3\)', '\(a_4\)', '\(a_5\)', '\(a_6\)', '\(a_7\)', '\(a_8\)']]
    for n in range(1, 9):
        coeffs = calc_butterworth_coeffs_for_order(n)
        # Convert floats to strings with rounding
        coeffs = [ f'{coeff:.4}' for coeff in coeffs ]
        row = [ f'{n}' ]
        row.extend(coeffs)
        table.append(row)
    html_table = tabulate(table, headers='firstrow', tablefmt='html')
    soup = BeautifulSoup(html_table, features='html.parser')
    
    # Add a fixed width to column with latex equations in it, otherwise the table width goes crazy
    for col in soup.table.thead.tr.find_all('th'):
        col['style'] = 'width: 80px;'
    table_file_path = SCRIPT_DIR / 'butterworth-polynomial-coeffs-table.html'
    with table_file_path.open('w') as file:
        file.write(soup.prettify())

if __name__ == '__main__':
    main()