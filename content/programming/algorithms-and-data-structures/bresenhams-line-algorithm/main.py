import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as mpatches
import matplotlib.lines as mlines
from matplotlib.collections import PatchCollection
def main():
    x_val = [1, 4]
    y_val = [1, 3]

    ax = plt.subplot()

    plt.scatter(x_val, y_val)
    # data = np.array([[0,0, 1],[1,1, 0], [0,0,1]])
    # plt.imshow(data, interpolation='nearest')

    patches = []
    rect = mpatches.Rectangle([0.5, 0.5], 1, 1, ec="none")
    patches.append(rect)
    collection = PatchCollection(patches, cmap=plt.cm.hsv, alpha=0.3)
    ax.add_collection(collection)

    # ax.set_xticks(np.arange(0, 5))
    # ax.set_yticks(np.arange(0, 5))

    plt.xticks(np.arange(0, 5, 1))
    plt.yticks(np.arange(0, 5, 1))
    # plt.grid(xdata=[0.5, 1.5], ydata=[0.5, 1.5])

    line = mlines.Line2D([0.5, 0.5], [0, 4.5], lw=1, alpha=0.5)
    ax.add_line(line)

    plt.show()

def draw_line_simple(x_val, y_val):
    pass



if __name__ == '__main__':
    main()