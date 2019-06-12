---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-06-11
description: "A tutorial on pandas, a popular testing framework for Python."
draft: false
lastmod: 2019-06-11
tags: [ "programming", "programming languages", "Python", "pandas", "dataframe" ]
title: "pandas"
type: "page"
---

## Overview

pandas is a data analystics library for Python. It provides high-level data structures and analytics tools for data analysis.

## Installation

pandas can be installed with `pip`:

```bash
$ pip install pandas
```

or conda:

```bash
$ conda install pandas
```

## The Dataframe

The core data structure in pandas is the dataframe. A DataFrame is a container for holding tabular data (2D), and supports labelled rows and columns.

You can create a dataframe by passing in a `dict`:

```python
df = pd.DataFrame({
  'Name': [ 'John', 'Geoff', 'Brett' ],
  'Age': [ 45, 23, 30 ],
  'Height': [ 1.23, 4.56, 7.89 ],
})
```

## Selecting Rows Based On A Column Value

To select all rows in a dataframe in where a particular column has a certain value, use the following code:

```python
df.loc[df['column_name'] == some_value]
```

This returns a new dataframe with only the applicable rows included.

For example:

```python
import pandas as pd

df = pd.DataFrame({
    'A': [ 1, 5, 6, 3, 4 ],
    'B': [ 'foo', 'bar', 'bar', 'foo', 'foo' ]
})
print(df)
#    A    B
# 0  1  foo
# 1  5  bar
# 2  6  bar
# 3  3  foo
# 4  4  foo

filtered_df = df.loc[df['B'] == 'foo']
print(filtered_df)
#    A    B
# 0  1  foo
# 3  3  foo
# 4  4  foo
```