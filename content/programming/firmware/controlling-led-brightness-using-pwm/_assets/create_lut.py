from pathlib import Path

import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    # Create LUTs
    # ==============================
    
    # 256 values in, 8-bit out
    createCieLightnessToPwmDutyLut(256, 8, 'cie-lightness-to-pwm-256-in-8bit-out-lut.h')

    # 256 values in, 10-bit out
    createCieLightnessToPwmDutyLut(256, 10, 'cie-lightness-to-pwm-256-in-10bit-out-lut.h')

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

def createCieLightnessToPwmDutyLut(numLightnessValues, pwmBits, filename: str):
    numPwmValues = 2**pwmBits

    # Create an array of lightness values from 0 to 1
    lightnessValues = np.linspace(0, 1, numLightnessValues)

    # Calculate PWM values for input lightness values
    # The "+ 0.5" is so that we round to the nearest integer rather than always rounding down.
    pwmValues = [int(cieLightnessToRelativeLuminance(lightness) * (numPwmValues - 1) + 0.5) for lightness in lightnessValues]

    # Calculate datatype that can hold the number of bits
    if pwmBits <= 8:
        datatype = 'uint8_t'
    elif pwmBits <= 16:
        datatype = 'uint16_t'
    elif pwmBits <= 32:
        datatype = 'uint32_t'
    else:
        raise ValueError('Num. of bits for PWM too large.')

    # Create and write to file
    with open(SCRIPT_DIR / filename, 'w') as file:
        file.write(f'const {datatype} CIE_LIGHTNESS_TO_PWM_LUT_{numLightnessValues}_IN_{pwmBits}BIT_OUT[] = {{')
        for idx, pwmValue in enumerate(pwmValues):
            # Insert a new line every 16 values
            if idx % 16 == 0:
                file.write('\n')
            file.write(f'{pwmValue:5d},')
        file.write('\n};\n')