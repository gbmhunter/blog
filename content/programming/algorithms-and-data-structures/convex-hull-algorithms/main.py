import matplotlib.pyplot as plt
import numpy as np

def main():

    points = np.array([
        [2, 2],
        [1, 1],
        [3, 4],
        [5, 2],
        [6, 3],
        [2, 5],
        [2, 6],
        [5, 4],
        [4, 3],
    ])
    convex_hull = gift_wrapping_algorithm(points)
    fig, ax = plt.subplots()

    ax.scatter(points[:,0], points[:,1], label='points')
    ax.plot(convex_hull[:,0], convex_hull[:,1], color='C1', label='convex hull')

    ax.set_xlabel('$x$')
    ax.set_ylabel('$y$')

    ax.set_title('The 2D convex hull for set of points.')
    ax.legend()

    plt.savefig('convex_hull.png')

def orientation(p0, p1, p2):
    """
    Returns 0 if points are co-linear, 1 if clockwise, -1 if counterclockwise.
    """

    angle = (p1[1] - p0[1])*(p2[0] - p1[0]) - (p2[1] - p1[1])*(p1[0] - p0[0])
    if angle == 0.0:
        return 0
    elif angle < 0.0:
        return -1
    elif angle > 0.0:
        return 1

def gift_wrapping_algorithm(points):
    print(f'gift_wrapping_algorithm() called with points = {points}')

    # Find left-most point to start
    x_vals = points[:, 0]
    y_vals = points[:, 1]

    x_min_idxs = np.argmin(x_vals)
    # breakpoint()

    # Pick left-most point, guaranteed to be in convex-hull
    left_point = [ x_vals[x_min_idxs], y_vals[x_min_idxs] ]

    convex_hull = []
    convex_hull.append(left_point)

    while(True):
        print(f'Performing iteration...')
        # Make sure we haven't picked the same point twice
        next_point = points[0].tolist()
        if np.array_equal(convex_hull[-1], next_point):
            next_point = points[1].tolist()
        print(f'Next point = {next_point}')
        for point in points:
            angle = orientation(convex_hull[-1], next_point, point)
            if angle == -1:
                print(f'Found a more counter-clockwise point! Point = {point}')
                next_point = point.tolist()
        convex_hull.append(next_point)
        if np.array_equal(convex_hull[-1], convex_hull[0]):
            print(f'Back at start!')
            break

    print(f'convex_hull = {convex_hull}')

    # Convert to array and return
    return np.array(convex_hull)

    




if __name__ == '__main__':
    main()