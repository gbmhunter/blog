from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


import sys
import os
SCRIPT_DIR = Path(__file__).parent
sys.path.append(os.path.dirname(SCRIPT_DIR))
import create_lut

def main():
    createRelativeLuminanceToCieLightnessPlot()
    # Now create plot of the inverse
    createCieLightnessToRelativeLuminancePlot()
    createGammaCorrectionPlot()
    createCieLightnessToPwmQuantizationPlot()

    create_lut.main()


def createRelativeLuminanceToCieLightnessPlot():
    # Create luminance values from 0 to 1
    luminanceValues = np.linspace(0, 1, 100)

    # Convert luminance values to lightness values
    lightnessValues = [cieLuminanceToLightness(luminance) for luminance in luminanceValues]

    # Plot the luminance and lightness values
    fig, ax = plt.subplots()
    ax.plot(luminanceValues, lightnessValues)
    ax.set(xlabel='Relative Luminance', ylabel='Lightness', title='The CIE lightness function showing the conversion\nfrom relative luminance to lightness.')
    ax.grid()
    ax.set_aspect('equal', 'box') # Set aspect ratio to be equal, useful for visualizing response
    plt.savefig(SCRIPT_DIR / 'cie-relative-luminance-to-lightness.png')

def createCieLightnessToRelativeLuminancePlot():
    """
    Plots the inverse CIE lightness function.
    """
    # Create lightness values from 0 to 1
    lightnessValues = np.linspace(0, 1, 100)

    # Convert lightness values to luminance values
    luminanceValues = [cieLightnessToRelativeLuminance(lightness) for lightness in lightnessValues]

    # Plot the lightness and luminance values
    fig, ax = plt.subplots()
    ax.plot(lightnessValues, luminanceValues)
    ax.set(xlabel='Lightness', ylabel='Luminance',
           title='Inverse CIE lightness function showing lightness\nto relative luminance conversion.')
    ax.grid()
    ax.set_aspect('equal', 'box') # Set aspect ratio to be equal, useful for visualizing response
    plt.savefig(SCRIPT_DIR / 'cie-lightness-to-relative-luminance.png')

def createGammaCorrectionPlot():
    # Create lightness values from 0 to 1
    lightnessValues = np.linspace(0, 1, 100)

    # Calculate luminance values using CIE 1931
    luminanceValues = [cieLightnessToRelativeLuminance(lightness) for lightness in lightnessValues]

    # Convert lightness values to gamma corrected values
    gammaCorrectedValues = [gammaCorrect(lightness) for lightness in lightnessValues]

    # Plot the lightness and gamma corrected values
    fig, ax = plt.subplots()
    ax.plot(lightnessValues, gammaCorrectedValues, label='Gamma Formula')
    ax.plot(lightnessValues, luminanceValues, label='CIE Lightness Formula')
    ax.set(xlabel='Lightness', ylabel='Duty Cycle/Relative Luminance',
           title='Comparison of the Gamma Formula vs. \nthe CIE Lightness Formula')
    ax.legend()
    ax.grid()
    ax.set_aspect('equal', 'box') # Set aspect ratio to be equal, useful for visualizing response
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'gamma-correction.png')

def createCieLightnessToPwmQuantizationPlot():
    NUM_LIGHTNESS_VALUES = 256
    NUM_PWM_VALUES = 256

    # Create an array of lightness values from 0 to 1
    lightnessValues = np.linspace(0, 1, NUM_LIGHTNESS_VALUES)

    # Calculate PWM values for input lightness values
    pwmValues = [(int(cieLightnessToRelativeLuminance(lightness) * (NUM_PWM_VALUES - 1))/NUM_PWM_VALUES) for lightness in lightnessValues]

    fig, ax = plt.subplots()
    ax.plot(lightnessValues, pwmValues)
    ax.set(xlabel='CIE Lightness', ylabel='PWM Value', title='Lightness to PWM Value Conversion')
    ax.grid()
    ax.set_aspect('equal', 'box') # Set aspect ratio to be equal, useful for visualizing response
    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'cie-lightness-to-pwm-8bit.png')



def gammaCorrect(brightness):
    """
    Apply gamma correction to a brightness value, with an gamma value of 2.2.
    """
    return brightness**2.2

def cieLuminanceToLightness(luminance):
    """
    Convert a luminance value to a lightness value.

    Equation from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm.

    :param luminance: The luminance value to convert in the range [0, 1].
    :return: The lightness value in the range [0, 1].
    """

    # Equation from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm
    lightness0To100 = 0
    if luminance <= 0.008856:
        lightness0To100 = 903.3 * luminance
    else:
        lightness0To100 = 116 * luminance ** (1/3) - 16
    
    # Convert from [0, 100] to [0, 1]
    return lightness0To100 / 100

def cieLightnessToRelativeLuminance(lightness):
    """
    Convert a lightness value to a luminance value.

    Equation from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm.

    :param lightness: The lightness value to convert in the range [0, 1].
    :return: The luminance value in the range [0, 1].
    """

    # Equation from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm
    lightness *= 100 # Convert to [0, 100] to work with the equation
    if lightness <= 8:
        return lightness / 902.3
    else:
        return ((lightness + 16) / 116) ** 3
    
if __name__ == '__main__':
    main()
