import numpy as np
import pandas as pd
from sklearn import datasets

def main():
    iris_dataset = datasets.load_iris()

    data = iris_dataset.data
    print(data)

if __name__ == '__main__':
    main()