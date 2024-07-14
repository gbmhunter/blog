#!/usr/bin/env python3

import matplotlib.pyplot as plt
plt.switch_backend('agg') # Allow matplotlib to work in Docker

import numpy as np

def calc_tri(max_num, index):
    """
    Calculates the triangular number given the maximum number and
    the current index.
    e.g. calc_tri(3, i) for i = 0..8 would give:
    0, 1, 2, 3, 2, 1, 0, 1, 2
    """
    print(f'calc_tri() called with max_num = {max_num}, index = {index}.')
    period = max_num * 2
    print(f'period = {period}')

    mod = index % period
    print(f'mod = {mod}')


    if mod <= max_num:
        tri = mod
    else:
        tri = max_num - (mod - max_num)

    print(f'tri = {tri}')


def find_best_fit_poly(x_data, y_data, poly_degree):
    # First co-efficient is a0*x^0, second is a1*x^1, e.t.c
    poly_coefficients = np.zeros(poly_degree + 1)
    
    # POPULATE MATRIX A
    matrix_A = np.zeros([poly_coefficients.size, poly_coefficients.size])

    for i in range(poly_coefficients.size*2 - 1):
        sum = (x_data**i).sum()

        # Sum is inserted on a trailing diagonal
        # All row, col pairs that add to i are valid
        curr_col = i
        curr_row = 0
        if curr_col > poly_coefficients.size - 1:
            curr_col = poly_coefficients.size - 1
            curr_row = i - curr_col

        while True:
            matrix_A[curr_row, curr_col] = sum
            curr_col -= 1
            curr_row += 1

            if curr_col < 0 or curr_row > poly_coefficients.size - 1:
                break

    print(f'matrix_A = {matrix_A}')

    # POPULATE MATRIX B
    matrix_B = np.zeros([poly_coefficients.size, 1])

    for i in range(poly_coefficients.size):
        print(x_data**i)
        sum = ((x_data**i)*y_data).sum()
        print(f'i = {i}, sum = {sum}')
        matrix_B[i, 0] = sum

    print(f'matrix_B = {matrix_B}')

    # Solve for x. Ax = B so x = A-1*B
    x = np.dot(np.linalg.inv(matrix_A), matrix_B)

    print(f'x = {x}')
    return x


# ============================================= #
# =================== INPUTS ================== #
# ============================================= #
x_data = np.array([ 1, 2, 3, 4])
y_data = np.array([ 1, 3, 4, 8])

# A list of all the degrees of the polynomials that will be drawn on the
# graph
poly_degrees = np.array([ 0, 1, 2, 3 ])

poly_coefficients = []
for i in range(poly_degrees.size):
    poly_coefficients.append(find_best_fit_poly(x_data, y_data, poly_degrees[i]))

print(poly_coefficients)

# ============================================= #
# ================== PLOTTING ================= #
# ============================================= #
fig, ax = plt.subplots()

# Plot points
points = ax.scatter(x_data, y_data, color='green', label='Data points')

bestFitX = np.linspace(x_data.min() - 0.1, x_data.max() + 0.1, num=100)

# Plot best fit polynomials
best_fit_polys = []
for poly_coefficient in poly_coefficients:
    
    bestFitY = np.zeros(bestFitX.size)
    for i in range(poly_coefficient.size):
        bestFitY += (bestFitX**i)*poly_coefficient[i]

    best_fit, = ax.plot(bestFitX, bestFitY, label=f'{i} degree polynomial')
    best_fit_polys.append(best_fit)

plt.title('Polynomial Curve Fitting\n(Least Squares Approach)')
plt.xlabel('x')
plt.ylabel('y')
ax.legend()
plt.savefig('many-polynomial-best-fits-on-graph.png')