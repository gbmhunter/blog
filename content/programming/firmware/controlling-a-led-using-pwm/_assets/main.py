from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    # Create lightness values from 0 to 1
    lightnessValues = np.linspace(0, 1, 100)

    # Convert lightness values to luminance values
    luminanceValues = [lightnessToLuminance(lightness) for lightness in lightnessValues]

    # Plot the lightness and luminance values
    fig, ax = plt.subplots()
    ax.plot(lightnessValues, luminanceValues)
    ax.set(xlabel='Lightness', ylabel='Luminance', title='Lightness to Luminance Conversion')
    ax.grid()
    plt.savefig(SCRIPT_DIR / 'lightness-to-luminance.png')

def lightnessToLuminance(lightness):
    """
    Convert a lightness value to a luminance value.

    Equation from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm.

    :param lightness: The lightness value to convert in the range [0, 1].
    :return: The luminance value in the range [0, 1].
    """

    # Equation from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm
    lightness *= 100
    if lightness <= 8:
        return lightness / 902.3
    else:
        return ((lightness + 16) / 116) ** 3
    
if __name__ == '__main__':
    main()
