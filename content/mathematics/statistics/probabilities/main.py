import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import norm


def main():
    create_pdf_cdf_quantile_plots()
    generate_rvs_from_pdf()


def create_pdf_cdf_quantile_plots():
    fig, ax = plt.subplots()
    x = np.linspace(norm.ppf(0.01),
                    norm.ppf(0.99), 100)
    ax.plot(x, norm.pdf(x),
            label='PDF of the normal distribution, $u=0$, $\\sigma=1$.')
    ax.set_xlabel('$x$')
    ax.set_ylabel('$f(x)$')
    # ax.legend()
    plt.savefig('pdf-normal.png')

    fig, ax = plt.subplots()
    x = np.linspace(norm.ppf(0.01),
                    norm.ppf(0.99), 100)
    ax.plot(x, norm.cdf(x),
            label='CDF of the normal distribution, $u=0$, $\\sigma=1$.')
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


def generate_rvs_from_pdf():

    from scipy import integrate
    from scipy.interpolate import interp1d
    from scipy import stats

    # Make up a example PDF
    pdf_x = np.linspace(0, np.pi)
    pdf_y = np.sin(pdf_x)
    # Normalize pdf_y (make area = 1)
    pdf_y_interp = interp1d(pdf_x, pdf_y, kind='cubic')
    integral, _ = integrate.quad(pdf_y_interp, 0, np.pi)
    pdf_y = pdf_y / integral
    # Plot this example PDF
    fig, ax = plt.subplots()
    ax.scatter(pdf_x, pdf_y)
    ax.set_xlabel('Random variable, $x$')
    ax.set_ylabel('Probability $P(x)$')
    plt.savefig('generating-rvs-starting-pdf.png')

    discrete_cdf1 = integrate.cumtrapz(y=pdf_y, x=pdf_x, initial=0)
    cdf1 = interp1d(pdf_x, discrete_cdf1)
    ppf1 = interp1d(discrete_cdf1, pdf_x, bounds_error=False,
                    fill_value=np.NaN, kind='cubic')

    class Dist(stats.rv_continuous):
        def _cdf(self, x):
            return cdf1(x)

        def _ppf(self, x):
            return ppf1(x)

    dist = Dist(a=pdf_x[0], b=pdf_x[-1], xtol=1e-6)

    # Now generate 100,000 random values that follow the
    # distribution as specified by your PDF
    random_values = dist.rvs(size=10000)
    # Plot these random values
    fig, ax = plt.subplots()
    ax.hist(random_values, bins=50)
    ax.set_xlabel('Random Variable $x$')
    ax.set_ylabel('Occurrence')
    plt.savefig('generating-rvs-hist-of-rvs.png')


if __name__ == '__main__':
    main()
