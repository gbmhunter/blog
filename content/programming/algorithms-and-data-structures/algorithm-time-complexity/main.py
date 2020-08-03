#! /usr/bin/env python3

import math

from matplotlib import pyplot as plt
from matplotlib.colors import hsv_to_rgb
import numpy as np

def main():
    draw_non_weighted_graph()
    # draw_weighted_graph()

def draw_non_weighted_graph():

    y_clip = 200    
    num_x = 200
    x = np.arange(1, num_x + 1)

    def constant(x):
        return 0
    y_constant = _calc_y_vals(x, constant, y_clip)

    def log_n(x):
        return math.log2(x)
    y_logn = _calc_y_vals(x, log_n, y_clip)

    def n(x):
        return x
    y_n = _calc_y_vals(x, n, y_clip)

    def nlogn(x):
        return x*math.log2(x)
    y_nlogn = _calc_y_vals(x, nlogn, y_clip)

    def n2(x):
        return x**2
    y_n2 = _calc_y_vals(x, n2, y_clip)

    def n3(x):
        return x**3
    y_n3 = _calc_y_vals(x, n3, y_clip)

    def twon(x):
        return 3**x
    y_2n = _calc_y_vals(x, twon, y_clip)

    fig, ax = plt.subplots()
    ax.plot(x, y_constant, label='O(1)')
    ax.plot(x, y_logn, label='O(log(n))')
    ax.plot(x, y_n, label='O(n)')
    ax.plot(x, y_nlogn, label='O(nlog(n))')
    ax.plot(x, y_n2, label='O(n^2)')
    ax.plot(x, y_n3, label='O(n^3)')

    ax.set_title('Algorithm Time Complexity')
    ax.set_xlabel('Number of Elements, n')
    ax.set_ylabel('Time, t')
    ax.legend()

    plt.savefig('big-o-notation-algorithm-complexity-non-weighted.png')

    graph_data = [
        {
            'title': 'Constant Time Complexity',
            'label': r'$\mathcal{O}(1)$',
            'y_vals': y_constant,
        },
        {
            'title': 'Logarithmic Time Complexity',
            'label': r'$\mathcal{O}(\log{n})$',
            'y_vals': y_logn,
        },
        {
            'title': 'Linear Time Complexity',
            'label': r'$\mathcal{O}(n)$',
            'y_vals': y_n,
        },
        {
            'title': 'nlog(n) Time Complexity',
            'label': r'$\mathcal{O}(n\log{n})$',
            'y_vals': y_nlogn,
        },
        {
            'title': 'n^2 Time Complexity',
            'label': r'$\mathcal{O}(n^2)$',
            'y_vals': y_n2,
        },
        {
            'title': 'n^3 Time Complexity',
            'label': r'$\mathcal{O}(n^3)$',
            'y_vals': y_n3,
        },
        {
            'title': '2^n Time Complexity',
            'label': r'$\mathcal{O}(2n)$',
            'y_vals': y_2n,
        },
    ]

    for graph in graph_data:
    
        fig, ax = plt.subplots()

        for graph_2 in graph_data:
            if graph == graph_2:
                color = 'tab:orange' # default matplotlib color
            else:
                color = '#777777' # grey 
            ax.plot(x, graph_2['y_vals'], label=graph_2['label'], color=color)

        ax.set_title(graph['title'])
        ax.set_xlabel('Number of Elements, n')
        ax.set_ylabel('Time, t')
        ax.legend()

        plt.savefig(f"graph-{_sanitize_filename(graph['title'])}.png")

def _calc_y_vals(x_array, fx_func, y_clip):
    y_array = np.full((len(x_array)), np.nan)
    for i, x in enumerate(x_array):
        print(x)
        y_val = fx_func(x)
        if y_val > y_clip:
            y_array[i - 1] = y_clip
            break
        y_array[i] = y_val

    return y_array

def _sanitize_filename(filename):
    filename = filename.replace(' ', '-')
    filename = filename.lower()
    return "".join([c for c in filename if c.isalpha() or c.isdigit() or c=='-']).rstrip()

def draw_weighted_graph():

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

    ax.set_title('Algorithm Time Complexity (weighted)')
    ax.set_xlabel('Number of Elements, n')
    ax.set_ylabel('Time, t')
    ax.legend()

    plt.savefig('big-o-notation-algorithm-complexity.png')

if __name__ == '__main__':
    main()