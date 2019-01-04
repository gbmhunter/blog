import matplotlib.pyplot as plt
import numpy as np

def main():
    x_val = [1, 4]
    y_val = [1, 3]

    ax = plt.subplot()

    plt.scatter(x_val, y_val)

    ax.set_xticks(np.arange(0, 5))
    ax.set_yticks(np.arange(0, 5))

    plt.grid()
    plt.show()



if __name__ == '__main__':
    main()