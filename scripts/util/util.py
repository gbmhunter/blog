from pathlib import Path

import matplotlib.image as image

SCRIPT_DIR = Path(__file__).parent

def add_watermark_to_fig(fig):
    with open(SCRIPT_DIR / 'mbedded-ninja-watermark.png', 'rb') as file:
        img = image.imread(file)

    newax = fig.add_axes([0.8, 0.0, 0.2, 0.05], anchor='NE', zorder=-1)
    newax.imshow(img)
    newax.axis('off')