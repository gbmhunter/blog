"""Recomputes the values used in the MIND worked example on this page.

Computes, for the 5x5 example image:
- The four patch distances for pixel (1, 2).
- The variance estimate array (mean of the four patch distances per pixel).
- The MIND descriptor array (n = 1).

Out-of-bounds pixels are handled with edge replication (the nearest valid
pixel is used), both for patch extraction and for search-space neighbours.
"""

import numpy as np

# Example image, indexed (row, column). Matches the values shown in
# mind_descriptor_search_space.svg.
IMAGE = np.array([
    [20, 10, 17,  2,  5],
    [16, 11,  4, 21, 25],
    [ 3, 12,  1, 24, 15],
    [23, 19,  9,  8, 18],
    [ 7,  6, 14, 22, 13],
], dtype=float)

# 4-neighbourhood search space, as (row, column) offsets.
SEARCH_SPACE = [(0, 1), (0, -1), (1, 0), (-1, 0)]

PATCH_SIZE = 3


def patch(image: np.ndarray, row: int, col: int) -> np.ndarray:
    """Returns the PATCH_SIZE x PATCH_SIZE patch centered on (row, col),
    using edge replication for out-of-bounds pixels."""
    half = PATCH_SIZE // 2
    padded = np.pad(image, half, mode='edge')
    return padded[row:row + PATCH_SIZE, col:col + PATCH_SIZE]


def patch_distance(image: np.ndarray, pixel_a, pixel_b) -> float:
    """Sum-of-squared differences between the patches centered on the two
    pixels, with a constant patch weighting of 1/9 (i.e. 1/3 inside the
    square)."""
    diff = (patch(image, *pixel_a) - patch(image, *pixel_b)) / PATCH_SIZE
    return float(np.sum(diff ** 2))


def clamp(value: int, low: int, high: int) -> int:
    return min(max(value, low), high)


def neighbour(image: np.ndarray, row: int, col: int, offset) -> tuple:
    """Returns the search-space neighbour of (row, col), clamped to the
    image bounds (edge replication)."""
    num_rows, num_cols = image.shape
    return (clamp(row + offset[0], 0, num_rows - 1),
            clamp(col + offset[1], 0, num_cols - 1))


def variance_array(image: np.ndarray) -> np.ndarray:
    """Variance estimate for each pixel: the mean of the patch distances to
    each pixel in the search space."""
    var = np.zeros_like(image)
    for row in range(image.shape[0]):
        for col in range(image.shape[1]):
            distances = [
                patch_distance(image, (row, col), neighbour(image, row, col, offset))
                for offset in SEARCH_SPACE
            ]
            var[row, col] = np.mean(distances)
    return var


def mind_descriptors(image: np.ndarray, var: np.ndarray) -> np.ndarray:
    """MIND descriptor for each pixel (n = 1). Axis 0 is rows, axis 1 is
    columns, axis 2 holds the descriptor values in SEARCH_SPACE order."""
    mind = np.zeros(image.shape + (len(SEARCH_SPACE),))
    for row in range(image.shape[0]):
        for col in range(image.shape[1]):
            for i, offset in enumerate(SEARCH_SPACE):
                distance = patch_distance(
                    image, (row, col), neighbour(image, row, col, offset))
                mind[row, col, i] = np.exp(-distance / var[row, col])
    return mind


def main():
    pixel = (1, 2)
    print(f'Patch distances for pixel {pixel}:')
    for offset in SEARCH_SPACE:
        distance = patch_distance(IMAGE, pixel, neighbour(IMAGE, *pixel, offset))
        print(f'  r = {offset}: {distance:.2f}')

    var = variance_array(IMAGE)
    print(f'\nVariance estimate for pixel {pixel}: {var[pixel]:.2f}')
    np.set_printoptions(precision=2, suppress=True)
    print('\nVariance array:')
    print(var)

    mind = mind_descriptors(IMAGE, var)
    print(f'\nMIND descriptor for pixel {pixel}, in SEARCH_SPACE order '
          f'{SEARCH_SPACE}:')
    print(mind[pixel])
    np.set_printoptions(precision=3, suppress=True)
    print('\nMIND descriptor array:')
    print(mind)


if __name__ == '__main__':
    main()
