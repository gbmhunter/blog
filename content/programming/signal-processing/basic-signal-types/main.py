import matplotlib.pyplot as plt
import matplotlib.ticker as tck
import numpy as np

def plot_sinusoidal():

    A = 2.0
    omega = 2
    theta = np.pi/4

    x_min = 0.0
    x_max = 2*np.pi

    y_min = -2.5
    y_max = 2.5

    x = np.arange(x_min, x_max, 0.01)
    y_1cosx = np.cos(x) 
    y_2cosx = 2*np.cos(x)
    y_cos2x = np.cos(2*x)
    y_cosxshift = np.cos(x + np.pi/4)
    
    fig, ax = plt.subplots()

    ax.plot(x, y_1cosx, label="$f(t) = \cos(t)$")
    ax.plot(x, y_2cosx, label="$f(t) = 2\cos(t)$")
    ax.plot(x, y_cos2x, label="$f(t) = \cos(2t)$")
    ax.plot(x, y_cosxshift, label="$f(t) = \cos(t + \\frac{}{})$")

    ax.axis([x_min, x_max, y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$f(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    ax.xaxis.set_major_formatter(tck.FormatStrFormatter('%g $\pi$'))
    ax.xaxis.set_major_locator(tck.MultipleLocator(base=1.0))

    plt.title("Examples of Basic Sinusoidal Signals")
    plt.savefig('examples-of-basic-sinusoidal-signals.png')

def plot_exponential():

    x_min = 0.0
    x_max = 3.0

    y_min = 0.0
    y_max = 10.0

    x = np.linspace(x_min, x_max, 100)
    y_1e1t = 1*np.exp(1*x) 
    y_2e1t = 2*np.exp(1*x) 
    y_1e2t = 1*np.exp(2*x)
    y_1en1t = 1*np.exp(-1*x)
    fig, ax = plt.subplots()

    ax.plot(x, y_1e1t, label="$f(t) = e^{t}$")
    ax.plot(x, y_2e1t, label="$f(t) = 2e^{t}$")
    ax.plot(x, y_1e2t, label="$f(t) = e^{2t}$")
    ax.plot(x, y_1en1t, label="$f(t) = e^{-t}$")
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$f(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    # ax.text(0.3, 0.3, '$f(t) = e^{t}$', transform=ax.transAxes)

    plt.title("Examples of Basic Real Exponential Signals")
    plt.savefig('examples-of-basic-real-exponential-signals.png')

if __name__ == '__main__':
    plot_sinusoidal()
    plot_exponential()