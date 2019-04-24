import matplotlib.pyplot as plt
import numpy as np

def main():
    fig, ax = plt.subplots()

    x = np.linspace(0, 10, 100)
    y_x = x
    y_2x = 2*x
    y_3x = 3*x

    ax.plot(x, y_x, label='$y = x$')
    ax.plot(x, y_2x, label='$y = 2x$')
    ax.plot(x, y_3x, label='$y = 3x$')

    leg = ax.legend()

    # Set legend text color to line color
    for line, text in zip(leg.get_lines(), leg.get_texts()):
        text.set_color(line.get_color())

    plt.title('Legend Text Color Matches Plot Line Color')
    
    plt.savefig('legend-text-color-matches-plot-line-color.png')


if __name__ == '__main__':
    main()