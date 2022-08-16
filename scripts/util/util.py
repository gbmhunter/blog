from pathlib import Path

import matplotlib.image as image

SCRIPT_DIR = Path(__file__).parent

def add_watermark_to_fig(fig):
    with open(SCRIPT_DIR / 'mbedded-ninja-watermark.png', 'rb') as file:
        img = image.imread(file)

    newax = fig.add_axes([0.8, 0.0, 0.2, 0.05], anchor='NE', zorder=-1)
    newax.imshow(img)
    newax.axis('off')

prefix = {"y":1e-24, "z":1e-21, "a":1e-18, "f":1e-15, "p": 1e-12,
          "n":1e-9, "u":1e-6, "µ":1e-6, "m":1e-3, "c":1e-2, "d":0.1,
          "h":100, "k":1000, "M":1e6, "G":1e9, "T":1e12, "P":1e15,
          "E":1e18, "Z":1e21, "Y":1e24}

def parse_metric(s: str) -> float:
    if s == '0':
        return 0
    try:
        # multiply with meter-prefix value
        return float(s[:-1])*prefix[s[-1]]
    except KeyError:
        # no or unknown meter-prefix
        return float(s)