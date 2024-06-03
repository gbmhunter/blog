from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.ticker
import numpy as np

import util

SCRIPT_PATH = Path(__file__).parent

def main():
    numOfSerialNumbers = np.linspace(1, 200000, 1000)
    # numOfSerialNumbers = np.linspace(1, 1000, 1000)
    pCollision32Bit = calcProbabilityOfCollision(numOfSerialNumbers, 32)
    fig, ax = plt.subplots()
    ax.plot(numOfSerialNumbers, pCollision32Bit)
    ax.set(xlabel='Number of Serial Numbers', ylabel='Probability of Collision',
              title='Probability of Collision vs. Number of 32-bit Serial Numbers')
    ticker = matplotlib.ticker.EngFormatter(unit='')
    ax.xaxis.set_major_formatter(ticker)
    ax.set_ylim(-0.1, 1.1)
    ax.grid()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_PATH / 'probability-of-collision-32-bit.png')

    numOfSerialNumbers = np.linspace(1, 1e12, 1000)
    pCollision64Bit = calcProbabilityOfCollision(numOfSerialNumbers, 64)
    fig, ax = plt.subplots()
    ax.plot(numOfSerialNumbers, pCollision64Bit)
    ax.set(xlabel='Number of Serial Numbers', ylabel='Probability of Collision',
              title='Probability of Collision vs. Number of 64-bit Serial Numbers')
    ticker = matplotlib.ticker.EngFormatter(unit='')
    ax.xaxis.set_major_formatter(ticker)
    ax.set_ylim(-0.1, 1.1)
    ax.grid()
    util.add_watermark_to_fig(fig)
    plt.savefig(SCRIPT_PATH / 'probability-of-collision-64-bit.png')

def calcProbabilityOfCollision(numOfSerialNumbers, numOfBits):
    numOfComparisons = numOfSerialNumbers * (numOfSerialNumbers - 1) / 2
    pComparisonCollision = 1 / (2 ** numOfBits)
    pComparisonNoCollision = 1 - pComparisonCollision
    pNoCollision = pComparisonNoCollision ** numOfComparisons
    pCollision = 1 - pNoCollision
    return pCollision

if __name__ == "__main__":
    main()