---
author: "gbmhunter"
categories: [ "Programming", "Artificial Intelligence" ]
date: 2020-02-20
description: "A step-by-step introduction to machine learning."
draft: true
lastmod: 2020-02-20
tags: [ "programming", "artificial intelligence", "machine learning", "tutorial", "Python" ]
title: "A Step-by-Step Introduction to Machine Learning in Python"
type: "page"
---

## Overview

The "Hello, World" of machine learning is the [Iris Dataset](http://archive.ics.uci.edu/ml/datasets/Iris) (Iris flower). The Iris dataset is part of the [UCI Machine Learning Repository](http://archive.ics.uci.edu/ml/index.php), and originally comes from R.A. Fisher's classic 1936 paper, _The Use of Multiple Measurements in Taxonomic Problems_.

## Prepare environment

We are going to use:

* matplotlib: For creating graphs
* numpy: For quick and easy operations on arrays of data
* pandas: For quick and easy operations on tabular data
* scikit-learn (in Python, called `sklearn`): For machine learning algorithms and the Iris dataset

## Load the data.

Luckily for us, the `Iris Dataset` is so popular that it is included in the scikit-learn package. All we need to do is call `datasets.load_iris()` and we get a 

```python
from sklearn import datasets

iris_dataset = datasets.load_iris()
print(type(iris_dataset))
# <class 'sklearn.utils.Bunch'>
```

What we get is called a `Bunch`. This is just scikit terminology for some data and other information bundled together. It pretty much behaves like a standard Python dictionary. We can see it has the following keys:

```python
print(iris_dataset.keys())
# dict_keys(['data', 'target', 'target_names', 'DESCR', 'feature_names'])
```

The data key contains a 2D `numpy` array with 5 columns and 150 rows:

```python
print(iris_dataset['data'])
# [[5.1 3.5 1.4 0.2]
#  [4.9 3.  1.4 0.2]
#  [4.7 3.2 1.3 0.2]
#  [4.6 3.1 1.5 0.2]
#  [5.  3.6 1.4 0.2]
#  [5.4 3.9 1.7 0.4]
#  ... (150 rows in total)
```

Each column is a `feature`, and each row is an `observation`. Each column (feature) in this data can be identified with `iris_dataset['feature_names']`:

```python
print(iris_dataset['feature_names'])
# ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']
```

This will be all of the input data into our machine learning algorithm.

But what are we trying to predict? We are trying to predict the type of Iris from this data. The truth values for each one of these data points is contained in `iris_dataset['target']`:

```python
print(iris_dataset['target'])
# [0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
#  0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
#  1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2
#  2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
#  2 2]
```

There is one value in this array for each row in `data`. But wait, these are numbers, I was expecting names of Iris plants!?! Because we need to use numeric data, the type has been encoded as a integer (just like an `enum`). The mapping between integer and Iris type is contained in `iris_dataset['target_names']`:

```python
print(iris_dataset['target_names'])
# ['setosa' 'versicolor' 'virginica']
```

So `0` means that row in the data is a `setosa` Iris, `1` means it's a `versicolor` Iris, and `2` means its a `virginica` Iris.

## Split The Data Into Training And Test Groups

An important part of machine learning is to validate your algorithm after is had been trained. A common was to do this is to split the data into two groups, a `training` set and a `test` set. We will use the `training` set to teach our machine learning algorithm. We will hold back the data in the `test` set, and only use this to validate our algorithm after it has been trained.

An easy way to split the data is to use `scikit-learn`'s `train_test_split()` function. This function simply splits the observations into training and test groups according to the ratio given by `test_size`. We will use 80% of the data for training, and 20% of the data for testing (hence `test_size=0.2`):

```python
from sklearn.model_selection import train_test_split
X_train, X_test, Y_train, Y_test = train_test_split(iris_dataset['data'], iris_dataset['target'], test_size=0.2)
```

{{% note %}}
It is important to note the difference between the training and test set created here, and the training and test sets created as part of the `StratifiedKFold`. The test set created here will not be used again until we have a trained model, while as part of training, we further split the training set here into more training and tests sets.

This dual purpose for a `test` set can be quite confusing for a newcomer.
{{% /note %}}


## Select A Model

We will use _logistic regression_ for this machine learning example. It is beyond the scope of this tutorial to fully explain how logistic regression works