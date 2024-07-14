from pathlib import Path
import math

import matplotlib.pyplot as plt
import matplotlib.ticker
import numpy as np

import util

SCRIPT_PATH = Path(__file__).parent

def main():
    assert math.isclose(calc_p_of_collision_exact_np(100_000, 32), 0.6878122819637014)

    # p_collision = calc_p_of_collision_approx(100_000, 32)
    # print(p_collision)
    # return

    p_collision = calc_p_of_collision_exact_np(4, 8)
    print("Probability of collision when using 4 serial numbers with 8 bits: ", p_collision)

    num_of_serial_nums = np.arange(1, 200_000 + 1, 1000)

    p_collisions = []
    for serial_num in num_of_serial_nums:
        p_collision = calc_p_of_collision_approx(serial_num, 32)
        p_collisions.append(p_collision)
    fig, ax = plt.subplots()
    ax.plot(num_of_serial_nums, p_collisions)
    ax.set(xlabel='Number of Serial Numbers', ylabel='Probability of Collision',
              title='Probability of Collision vs. Number of 32-bit Serial Numbers')
    ticker = matplotlib.ticker.EngFormatter(unit='')
    ax.xaxis.set_major_formatter(ticker)
    ax.set_ylim(-0.1, 1.1)
    ax.grid()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_PATH / 'probability-of-collision-32-bit.png')

    # Create graph of approximate vs. exact
    # ===========================================================================
    p_collisions_exact = []
    for serial_num in num_of_serial_nums:
        p_collision = calc_p_of_collision_approx(serial_num, 32)
        p_collisions_exact.append(p_collision)
    fig, ax = plt.subplots()
    ax.plot(num_of_serial_nums, p_collisions, label='Approximate')
    ax.plot(num_of_serial_nums, p_collisions_exact, label='Exact')
    ax.set(xlabel='Number of Serial Numbers', ylabel='Probability of Collision',
              title='Probability of Collision vs. Number of 32-bit Serial Numbers')
    ticker = matplotlib.ticker.EngFormatter(unit='')
    ax.xaxis.set_major_formatter(ticker)
    ax.legend()
    ax.set_ylim(-0.1, 1.1)
    ax.grid()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_PATH / 'probability-of-collision-32-bit-approx-vs-exact.png')



    num_of_serial_nums = np.arange(1, 1_000_000_000, 1_000_000)
    p_collisions = []
    for serial_num in num_of_serial_nums:
        p_collision = calc_p_of_collision_approx(serial_num, 64)
        p_collisions.append(p_collision)
    fig, ax = plt.subplots()
    ax.plot(num_of_serial_nums, p_collisions)
    ax.set(xlabel='Number of Serial Numbers', ylabel='Probability of Collision',
              title='Probability of Collision vs. Number of 64-bit Serial Numbers')
    ticker = matplotlib.ticker.EngFormatter(unit='')
    ax.xaxis.set_major_formatter(ticker)
    ax.set_ylim(-0.1, 1.1)
    ax.grid()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_PATH / 'probability-of-collision-64-bit.png')

def calc_p_of_collision_exact(num_of_serial_nums, num_of_bits):
    """
    This is the exact formula for calculating the probability of a collision.

    However, it is very slow when num_of_serial_nums is > 100,000.

    :param num_of_serial_nums: The number of serial numbers.
    :param num_of_bits: The number of bits in the serial number (e.g. 32 for a 32-bit serial number).
    :return: The probability of a collision as a number in the range [0, 1].
    """
    probability_unique = 1.0
    # Don't use numpy
    for i in range(1, num_of_serial_nums):
        probability_unique *= 1 - (i / (2 ** num_of_bits))

    return 1 - probability_unique

def calc_p_of_collision_exact_np(num_of_serial_nums, num_of_bits):
    """
    This is the exact formula for calculating the probability of a collision.

    However, it is very slow when num_of_serial_nums is > 100,000.

    :param num_of_serial_nums: The number of serial numbers.
    :param num_of_bits: The number of bits in the serial number (e.g. 32 for a 32-bit serial number).
    :return: The probability of a collision as a number in the range [0, 1].
    """
    probability_unique = 1.0
    # Use numpy array to make this slightly faster
    i = np.arange(1, num_of_serial_nums)
    probability_unique = np.prod(1 - (i / (2 ** num_of_bits)))
    return 1 - probability_unique

def calc_p_of_collision_approx(num_of_serial_nums, num_of_bits):
    """
    This works better when num_of_serial_nums is > 100,000.

    :param num_of_serial_nums: The number of serial numbers.
    :param num_of_bits: The number of bits in the serial number (e.g. 32 for a 32-bit serial number).
    :return: The probability of a collision as a number in the range [0, 1].
    """
    # From https://en.wikipedia.org/wiki/Birthday_problem and
    # https://stackoverflow.com/questions/62664761/probability-of-hash-collision
    return 1 - math.exp(-((float(num_of_serial_nums)*float(num_of_serial_nums - 1)) / (2*(2 ** (float(num_of_bits) + 1)))))

if __name__ == "__main__":
    main()