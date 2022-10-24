import math
from pathlib import Path
from shutil import which
from typing import List

from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import scipy.signal
from sympy import *
from tabulate import tabulate

SCRIPT_DIR = Path(__file__).parent

def main():
    # create_butterworth_magnitude_plot()
    # create_butterworth_factored_polynomial_table()
    # create_butterworth_polynomial_coeffs_table()

    # chebyshev_poly()
    # create_chebyshev_poly_graph()

    # create_bessel_poly_table()
    create_bessel_bode_plots()

#==========================================================
# Butterworth
#==========================================================

def calc_butterworth_coeffs_for_order(n: int) -> List[float]:
    """
    Calculates the Butterworth polynomial coefficients for the given degree n.

    Equation from https://en.wikipedia.org/wiki/Butterworth_filter:
        {\displaystyle a_{k}=\prod _{\mu =1}^{k}{\frac {\cos((\mu -1)\gamma )}{\sin(\mu \gamma )}}\,,}

    Args:
        n   Degree of Butterworth polynomial. Must be >= 0.
    Returns:
        Coefficients of Butterworth polynomial of degree n. Coefficients are returned in a list, in this order: [ a0, a1, ..., an ].
    """

    gamma = np.pi / (2*n)
    # Need to calculate n + 1 coefficients
    coeffs = []
    for k in range(n + 1):
        if k == 0:
            # a_0 = 1.0
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

#==========================================================
# Chebyshev
#==========================================================

import numpy.polynomial
def chebyshev_poly_coeffs(n: int) -> List[float]:
    """
    Calculates the Chebyshev polynomial coefficients (of the first kind) for the provided degree n.

    Args:
        n: Degree of polynomial. Must be >= 0.
    Returns:
        List of Chebyshev polynomial coefficients, sorted from lowest degree to highest degree i.e. [ a_0, a_1, ..., a_n ].
    """
    # First build up coefficients for a_0T_0 + a_1T_1 + ... a_nT_n
    input_coeffs = [0] * (n + 1)
    input_coeffs[-1] = 1 # Set the last item to 1, this corresponds to T_n(x)
    # Now convert this to Chebyshev polynomial coefficients
    poly_coeffs = numpy.polynomial.chebyshev.cheb2poly(input_coeffs)
    return poly_coeffs

def create_chebyshev_poly_graph():
    fig, ax = plt.subplots()
    x_vals = np.linspace(-1.5, 1.5, 100)

    # Plot the first 6 polynomials
    for n in range(0, 6):
        poly_coeffs = chebyshev_poly_coeffs(n)        
        x = symbols('x')
        poly = Poly(reversed(poly_coeffs), x)
        # Convert the Polynomial object into an expression object, otherwise lambdify won't work
        poly = poly.as_expr()
        lam_poly = lambdify(x, poly, modules=['numpy', 'sympy'])
        y_vals = lam_poly(x_vals)
        # If n=0, the poly is just 1, and sympy doesn't return an array of 1's, just
        # and single 1. Let's fix that.
        if n == 0:
          y_vals = [y_vals]*x_vals.size
        ax.plot(x_vals, y_vals, label=f'$T_{n}$')

    ax.set_xlabel('$x$')
    ax.set_ylabel('$T_n$')
    ax.set_ybound(-1.5, 1.5)
    ax.axvline(-1.0, c='grey', ls='--')
    ax.axvline(1.0, c='grey', ls='--')
    ax.axhline(-1.0, c='grey', ls='--')
    ax.axhline(1.0, c='grey', ls='--')
    ax.legend()
    plt.tight_layout()
    plt.savefig(SCRIPT_DIR / 'chebyshev-poly-graph.png')

#==========================================================
# Bessel
#==========================================================

def bessel_ak(n: int, k: int) -> int:
    """
    Calculates the coefficient a_k that goes in front of s_k as part of a reverse Bessel polynomial.
    Equation from https://en.wikipedia.org/wiki/Bessel_filter 
    """
    return int(math.factorial(2*n - k) / (2**(n - k)*math.factorial(k)*math.factorial(n - k)))

def create_bessel_poly_table() -> None:
    """
    Creates a HTML table of bessel reverse polynomials.
    """

    soup = BeautifulSoup('<table></table>', features='html.parser')

    soup.table.append(soup.new_tag('thead'))
    soup.table.thead.append(soup.new_tag('tr'))

    cell = soup.new_tag('th')
    cell.append('Degree \(n\)')
    cell['style'] = 'width: 80px;'
    soup.table.thead.tr.append(cell)

    cell = soup.new_tag('th')
    cell.append('Reverse Bessel Polynomial')
    cell['style'] = 'width: 600px;'
    soup.table.thead.tr.append(cell)

    new_tag = soup.new_tag('tbody')
    soup.table.append(new_tag)
    
    # Generate polynomials for degree 0 to 8
    for n in range(9):
        s = symbols('s')
        poly = 0*s
        for k in range(n + 1):
            poly += bessel_ak(n, k)*(s**k)

        # New table row
        html_row = soup.new_tag('tr')

        # col 1: n
        td = soup.new_tag('td')
        td.append(f'{n}')
        html_row.append(td)

        # col 2: polynomial
        td = soup.new_tag('td')
        td.append(f'\({latex(poly)}\)')
        html_row.append(td)

        soup.table.tbody.append(html_row)
    
    table_file_path = SCRIPT_DIR / 'bessel-polynomial-coeffs-table.html'
    with table_file_path.open('w') as file:
        file.write(soup.prettify())

def create_bessel_bode_plots():
    # H(s) = 3 / (s^2 + 3s + 3)
    # | H(w) | = 3 / sqrt(w^4 + 3w^2 + 9)
    omega = np.logspace(-1, 1, num=500)
    gain = 3 / np.sqrt(omega**4 + 3*omega**2 + 9)
    gain_dB = 20*np.log(gain)
    # angle(H(w)) = Arg(0/3) - Arg(3w/(3-w^2))
    phase_rad = np.arctan2(0, 3) - np.arctan2(3*omega, 3 - omega**2)
    phase_deg = np.rad2deg(phase_rad)

    fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(7, 7))
    ax = axes[0]
    ax.plot(omega, gain_dB)
    ax.set_xscale('log')
    ax.set_xlabel('$\omega$ [$rads^{-1}$]')
    ax.set_ylabel('Gain [$dB$]')
    ax.grid(which='both')

    ax = axes[1]
    ax.plot(omega, phase_deg)
    ax.set_xscale('log')
    ax.set_xlabel('$\omega$ [$rads^{-1}$]')
    ax.set_ylabel('Phase [$^{\circ}$]')
    ax.set_yticks([-180, -135, -90, -45, 0])
    ax.grid(which='both')

    fig.tight_layout()
    fig.savefig(SCRIPT_DIR / 'bessel-2nd-order-bode-plot.png')

if __name__ == '__main__':
    main()