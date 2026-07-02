# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "matplotlib",
#     "numpy",
# ]
# ///
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

SCRIPT_DIR = Path(__file__).parent

X_DATA = np.array([1, 2, 3, 4])
Y_DATA = np.array([1, 3, 4, 8])


def main():
    create_many_polynomial_best_fits_plot()
    create_2_degree_poly_best_fit_plot()


def find_best_fit_poly(x_data, y_data, poly_degree):
    """
    Finds the least-squares polynomial of best fit by building the A and B
    matrices and solving Ax = B (as described on the page).
    Returns the coefficients [a0, a1, ..., ak] as a column vector.
    """
    num_coefficients = poly_degree + 1

    # POPULATE MATRIX A
    matrix_A = np.zeros([num_coefficients, num_coefficients])

    for i in range(num_coefficients * 2 - 1):
        power_sum = (x_data**i).sum()

        # Sum is inserted on a trailing diagonal
        # All row, col pairs that add to i are valid
        curr_col = i
        curr_row = 0
        if curr_col > num_coefficients - 1:
            curr_col = num_coefficients - 1
            curr_row = i - curr_col

        while True:
            matrix_A[curr_row, curr_col] = power_sum
            curr_col -= 1
            curr_row += 1

            if curr_col < 0 or curr_row > num_coefficients - 1:
                break

    # POPULATE MATRIX B
    matrix_B = np.zeros([num_coefficients, 1])

    for i in range(num_coefficients):
        matrix_B[i, 0] = ((x_data**i) * y_data).sum()

    # Solve for x. Ax = B so x = A^-1 * B
    return np.dot(np.linalg.inv(matrix_A), matrix_B)


def eval_poly(coefficients, x):
    y = np.zeros(x.size)
    for i in range(coefficients.size):
        y += (x**i) * coefficients[i]
    return y


def create_many_polynomial_best_fits_plot():
    poly_degrees = [0, 1, 2, 3]

    fig, ax = plt.subplots()
    ax.scatter(X_DATA, Y_DATA, color='green', label='Data points', zorder=3)

    best_fit_x = np.linspace(X_DATA.min() - 0.1, X_DATA.max() + 0.1, num=100)
    for poly_degree in poly_degrees:
        coefficients = find_best_fit_poly(X_DATA, Y_DATA, poly_degree)
        ax.plot(best_fit_x, eval_poly(coefficients, best_fit_x),
                label=f'Degree-{poly_degree} polynomial')

    ax.set_title('Polynomial Curve Fitting\n(Least Squares Approach)')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.grid()
    ax.legend()
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'many-polynomial-best-fits-on-graph.png')


def create_2_degree_poly_best_fit_plot():
    fig, ax = plt.subplots()
    ax.scatter(X_DATA, Y_DATA, color='green', label='Data points', zorder=3)

    best_fit_x = np.linspace(X_DATA.min() - 0.1, X_DATA.max() + 0.1, num=100)
    coefficients = find_best_fit_poly(X_DATA, Y_DATA, 2)
    ax.plot(best_fit_x, eval_poly(coefficients, best_fit_x),
            label='Degree-2 polynomial')

    ax.set_title('Polynomial Curve Fitting\n(Least Squares Approach)')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.grid()
    ax.legend()
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / '2-degree-poly-best-fit-graph.png')


if __name__ == '__main__':
    main()
