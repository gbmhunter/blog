import numpy as np

def main():

    points = np.array([
        [1, 1],
        [3, 4],
        [5, 2],
        [6, 3],
        [2, 5],
        [1, 6]
    ])
    gift_wrapping_algorithm(points)

def orientation(p0, p1, p2):
    """
    Returns 0 if points are co-linear, 1 if clockwise, 2 if counterclockwise.
    """

    slope_diff = 

def gift_wrapping_algorithm(points):
    print(f'gift_wrapping_algorithm() called with points = {points}')

    # Find left-most point to start
    x_vals = points[:, 0]
    y_vals = points[:, 1]

    x_min_idxs = np.argmin(x_vals)
    breakpoint()
    left_point = [ x_vals[x_min_idxs], y_vals[x_min_idxs] ]

    for point in points:


if __name__ == '__main__':
    main()