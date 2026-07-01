import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as mpatches
import matplotlib.lines as mlines
from matplotlib.collections import PatchCollection
def main():
    draw_graph()
    draw_graph_pixels_shaded([1, 4], [1, 3], 'bresenham-pixels-shaded.png')
    draw_graph_pixels_shaded([1, 20], [1, 7], 'bresenham-large-line.png')

    # draw_line_simple(1, 1, 4, 3)
    # draw_line_error(1, 1, 4, 3)
    # draw_line_bresenham(1, 1, 4, 3)

def draw_graph():
    x_val = [1, 4]
    y_val = [1, 3]

    ax = plt.subplot()

    plt.scatter(x_val, y_val)
    plt.plot(x_val, y_val)

    annotation_text_size = 16

    plt.annotate(r'$x_k, y_k$', (1.1, 1), size=annotation_text_size)

    plt.scatter(2, 1, color='C1')
    plt.annotate(r'$x_{k+1}, y_k$', (2.1, 1), size=annotation_text_size)

    plt.scatter(2, 2, color='C1')
    plt.annotate(r'$x_{k+1}, y_{k+1}$', (2.1, 2), size=annotation_text_size)

    x_min = 0
    x_max = 6
    y_min = 0
    y_max = 5

    plt.xticks(np.arange(x_min, x_max, 1))
    plt.yticks(np.arange(y_min, y_max, 1))
    plt.grid()
    plt.xlabel('x')
    plt.ylabel('y')

    plt.savefig('bresenham-selecting-next-pixel.png', bbox_inches='tight', dpi=200)

def draw_graph_pixels_shaded(line_x, line_y, img_path):

    print(line_x)
    print(line_y)
    pixel_x, pixel_y = draw_line_bresenham(line_x[0], line_y[0], line_x[1], line_y[1])

    # plt.figure(figsize=(70, 70))
    fig, ax = plt.subplots()

    ax.scatter(pixel_x, pixel_y,  color='C1')
    ax.plot(line_x, line_y)

    patches = []
    for i in range(len(pixel_x)):
        rect = mpatches.Rectangle([pixel_x[i] - 0.5, pixel_y[i] - 0.5], 1, 1, ec="none")
        patches.append(rect)
    collection = PatchCollection(patches, cmap=plt.cm.hsv, alpha=0.3)
    ax.add_collection(collection)

    x_min = line_x[0] - 1
    x_max = line_x[1] + 2
    y_min = line_y[0] - 1
    y_max = line_y[1] + 2

    plt.xticks(np.arange(x_min, x_max, 1))
    plt.yticks(np.arange(y_min, y_max, 1))
    plt.xlabel('x')
    plt.ylabel('y')
    ax.set_aspect('equal')
    plt.grid()
    plt.title('Drawing A Line In Pixels Using Bresenham\'s Line Algorithm')

    # plt.tight_layout()
    plt.savefig(img_path, bbox_inches='tight', dpi=200)
    plt.close()

def draw_line_simple(x_start, y_start, x_end, y_end):
    slope = (y_end - y_start)/(x_end - x_start)    
    
    for x in range(x_start, x_end + 1):        
        # Works but is "slow", floating point addition/multiplication on every pixel increment
        y_true = slope*(x - x_start) + x_start
        y_pixel = round(y_true)
        draw_pixel(x, y_pixel)    

def draw_line_tracking_error(x_start, y_start, x_end, y_end):
    slope = (y_end - y_start)/(x_end - x_start) 
    error = 0
    curr_y = y_start
    for x in range(x_start, x_end + 1):       
        draw_pixel(x, curr_y)
        # Now we just keep track of the error,
        # and if it is > 0.5, increment y
        # We are still using floating-point arithmetic though!
        error += slope
        if error > 0.5:
            curr_y += 1
            error -= 1 # error drops by 1 since we increment y

def draw_line_bresenham(x_start, y_start, x_end, y_end):
    dy = y_end - y_start
    dx = x_end - x_start

    # Note that the initial error does not start at zero!
    error = 2*dy - dx    
    y = y_start

    pixel_x = []
    pixel_y = []
    for x in range(x_start, x_end + 1):       
        pixel_x.append(x)
        pixel_y.append(y)
        
        # If error integer is > 0, we need to increment y and
        # update error
        if error >= 0:
            y += 1
            error -= 2*dx            
        
        error += 2*dy
    return pixel_x, pixel_y

def draw_pixel(x_pixel, y_pixel):
    print(f'{x_pixel}, {y_pixel}')

if __name__ == '__main__':
    main()