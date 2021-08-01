import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import norm


def main():
    fig, ax = plt.subplots()
    x = np.linspace(norm.ppf(0.01),
                    norm.ppf(0.99), 100)
    ax.plot(x, norm.pdf(x), label='PDF of the normal distribution, $u=0$, $\sigma=1$.')
    ax.set_xlabel('$x$')
    ax.set_ylabel('$f(x)$')
    # ax.legend()
    plt.savefig('pdf-normal.png')

    fig, ax = plt.subplots()
    x = np.linspace(norm.ppf(0.01),
                    norm.ppf(0.99), 100)
    ax.plot(x, norm.cdf(x), label='CDF of the normal distribution, $u=0$, $\sigma=1$.')
    ax.set_xlabel('$x$')
    ax.set_ylabel('$F(x)$')
    # ax.legend()
    plt.savefig('cdf-normal.png')

    fig, ax = plt.subplots()
    x = np.linspace(0.01, 0.99, 100)
    ax.plot(x, norm.ppf(x))
    ax.set_xlabel('$F(x)$')
    ax.set_ylabel('$x$')
    # ax.legend()
    plt.savefig('quantile-normal.png')


if __name__ == '__main__':
    main()