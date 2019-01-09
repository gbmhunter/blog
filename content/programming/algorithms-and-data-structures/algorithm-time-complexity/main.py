#! /usr/bin/env python3

import math

from matplotlib import pyplot as plt
from matplotlib.colors import hsv_to_rgb
import numpy as np

def main():

    num_x = 1000
    x = np.arange(1, num_x+1)
    y_constant = np.full((num_x), 10.0)
    y_logn = 3*np.log(x)
    y_n = 4e-2*x
    y_nlogn = 8e-3*x*np.log(x)
    y_n2 = 8e-5*x*x
    y_2n = 1e-1*np.power(2, x*1e-2)
    
    y_nfact = np.zeros_like(x)
    for i, val in enumerate(x):
        y_nfact[i] = 1e-15*math.gamma(20e-3*x[i])

    fig, ax = plt.subplots()

    print(hsv_to_rgb([0.9, 0, 1]))

    ax.plot(x, y_constant, label='O(1)', color=hsv_to_rgb([0.5, 1, 1]))
    ax.plot(x, y_logn, label='O(log(n))')
    ax.plot(x, y_n, label='O(n)')
    ax.plot(x, y_nlogn, label='O(nlog(n))')
    ax.plot(x, y_n2, label='O(n^2)')
    ax.plot(x, y_2n, label='O(2^n)')
    ax.plot(x, y_nfact, label='O(n!)')

    ax.set_title('Algorithm Time Complexity')
    ax.set_xlabel('Number of Elements, n')
    ax.set_ylabel('Time, t')
    ax.legend()

    plt.savefig('big-o-notation-algorithm-complexity.png')

if __name__ == '__main__':
    main()