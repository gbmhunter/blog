import matplotlib.pyplot as plt
import matplotlib.ticker as tck
import numpy as np

def main():
    plot_sinusoidal()
    plot_exponential()
    plot_complex_exponential()
    plot_unit_step()

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
    ax.plot(x, y_cosxshift, label="$f(t) = \cos(t + \\frac{\pi}{4})$")

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

def plot_complex_exponential():

    x_min = 0.0
    x_max = 10.0
    y_min = -10.0
    y_max = 10.0

    x = np.linspace(x_min, x_max, 500)

    sigma = 0.2
    omega = 2*np.pi
    theta = 0.0
    y_growing_real = 1*np.exp(sigma*x)*np.cos(omega*x + theta) 
    y_growing_env_top = np.exp(sigma*x)
    y_growing_env_bottom = -np.exp(sigma*x)
    fig, ax = plt.subplots()

    ax.plot(x, y_growing_real, label="$Re\{f(t)\} = |A|e^{\sigma t} \cos(\omega t + \\theta)$", color='C0')
    ax.plot(x, y_growing_env_top, color='C0', linestyle='--')
    ax.plot(x, y_growing_env_bottom, color='C0', linestyle='--')
    ax.text(2, 2.5, '$|A|e^{\sigma t}$', ha='center', va='center')
    ax.text(2, -2.5, '$-|A|e^{\sigma t}$', ha='center', va='center')
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$Re\{f(t)\}$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('The Real Component of a Growing Complex\nExponential Signal ($\sigma > 0$)')
    plt.savefig('complex-exponential-signals-real-component-growing.png')

    a = 7
    sigma = sigma*-1
    y_decaying_real = a*np.exp(sigma*x)*np.cos(omega*x + theta) 
    y_growing_env_top = a*np.exp(sigma*x)
    y_growing_env_bottom = -a*np.exp(sigma*x)
    fig, ax = plt.subplots()

    ax.plot(x, y_decaying_real, label="$Re\{f(t)\} = |A|e^{\sigma t} \cos(\omega t + \\theta)$", color='C0')
    ax.plot(x, y_growing_env_top, color='C0', linestyle='--')
    ax.plot(x, y_growing_env_bottom, color='C0', linestyle='--')
    ax.text(2, 6.5, '$|A|e^{\sigma t}$', ha='center', va='center')
    ax.text(2, -6.5, '$-|A|e^{\sigma t}$', ha='center', va='center')
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$Re\{f(t)\}$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('The Real Component of a Decaying Complex\nExponential Signal ($\sigma < 0$)')
    plt.savefig('complex-exponential-signals-real-component-decaying.png')

def plot_unit_step():

    x_min = -1.0
    x_max = 1.0
    y_min = -0.5
    y_max = 1.5

    x = np.array([-1, 0, 0, 1])
    y = np.array([0, 0, 1, 1])
    
    fig, ax = plt.subplots()

    ax.plot(x, y, label="$H(t)$")
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$H(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title("The Heaviside (Unit-Step) Function")
    plt.savefig('the-unit-step-function-heaviside.png')

    # H(0) = 0
    fig, ax = plt.subplots()

    ax.plot(x[0:2], y[0:2], label="$H(t)$", marker='o', markevery=[1])
    ax.plot(x[2:4], y[2:4], color='C0', marker='o', markevery=[0], markerfacecolor='none')
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$H(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('Heaviside Function where $H(0) = 0$')
    plt.savefig('heaviside-unit-step-function-h0-eq-0.png')

    # H(0) = 0.5
    fig, ax = plt.subplots()

    ax.plot(x[0:2], y[0:2], label="$H(t)$", marker='o', markevery=[1], markerfacecolor='none')
    ax.plot([0], [0.5], color='C0', marker='o')
    ax.plot(x[2:4], y[2:4], color='C0', marker='o', markevery=[0], markerfacecolor='none')
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$H(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('Heaviside Function where $H(0) = 0.5$')
    plt.savefig('heaviside-unit-step-function-h0-eq-0p5.png')

    # H(0) = 1
    fig, ax = plt.subplots()

    ax.plot(x[0:2], y[0:2], label="$H(t)$", marker='o', markevery=[1], markerfacecolor='none')
    ax.plot(x[2:4], y[2:4], color='C0', marker='o', markevery=[0])
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$H(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('Heaviside Function where $H(0) = 1$')
    plt.savefig('heaviside-unit-step-function-h0-eq-1.png')

    # H(0) = [0, 1]
    fig, ax = plt.subplots()

    ax.plot(x[0:2], y[0:2], label="$H(t)$", marker='o', markevery=[1])
    ax.plot(x[2:4], y[2:4], color='C0', marker='o', markevery=[0])
    ax.set_xlim([x_min, x_max])
    ax.set_ylim([y_min, y_max])
    ax.set_xlabel('$t$')
    ax.set_ylabel('$H(t)$')
    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('Heaviside Function where $H(0) = [0, 1]$')
    plt.savefig('heaviside-unit-step-function-h0-eq-set-0-1.png')


if __name__ == '__main__':
    main()