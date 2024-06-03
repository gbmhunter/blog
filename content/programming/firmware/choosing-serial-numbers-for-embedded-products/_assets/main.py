from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.ticker
import numpy as np

SCRIPT_PATH = Path(__file__).parent

def main():
    numOfSerialNumbers = np.linspace(1, 200000, 1000)
    # numOfSerialNumbers = np.linspace(1, 1000, 1000)
    numOfBits = 32
    pCollision = calcProbabilityOfCollision(numOfSerialNumbers, numOfBits)
    fig, ax = plt.subplots()
    ax.plot(numOfSerialNumbers, pCollision)
    ax.set(xlabel='Number of Serial Numbers', ylabel='Probability of Collision',
              title='Probability of Collision vs. Number of 32-bit Serial Numbers')
    ticker = matplotlib.ticker.EngFormatter(unit='')
    ax.xaxis.set_major_formatter(ticker)
    ax.grid()
    plt.savefig(SCRIPT_PATH / 'probability-of-collision-32-bit.png')

def calcProbabilityOfCollision(numOfSerialNumbers, numOfBits):
    numOfComparisons = numOfSerialNumbers * (numOfSerialNumbers - 1) / 2
    pComparisonCollision = 1 / (2 ** numOfBits)
    pComparisonNoCollision = 1 - pComparisonCollision
    pNoCollision = pComparisonNoCollision ** numOfComparisons
    pCollision = 1 - pNoCollision
    return pCollision

if __name__ == "__main__":
    main()