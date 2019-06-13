---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-06-11
description: "A tutorial on pandas, a popular testing framework for Python."
draft: false
lastmod: 2019-06-11
tags: [ "programming", "programming languages", "Python", "pandas", "DataFrame", "CSV" ]
title: "pandas"
type: "page"
---

## Overview

pandas is a data analystics library for Python. It provides high-level data structures and analytics tools for data analysis.

{{% img src="pandas_logo.png" width="700px" caption="The pandas logo." %}}

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

The core data structure in pandas is the `DataFrame`. A `DataFrame` is a container for holding tabular data (2D), and supports labelled rows and columns.

You can create a `DataFrame` by passing in a `dict`:

```python
df = pd.DataFrame({
  'Name': [ 'John', 'Geoff', 'Brett' ],
  'Age': [ 45, 23, 30 ],
  'Height': [ 1.23, 4.56, 7.89 ],
})
```

You can then `print` the dataframe, and pandas will render the data nicely in a tabular form:

```python
print(df)
#     Name  Age  Height
# 0   John   45    1.23
# 1  Geoff   23    4.56
# 2  Brett   30    7.89
```

### Selecting Columns

You can then select (extract) certain columns of data by passing in a `list` of the column names you want:

```python
print(df[['Name', 'Height']])
#     Name  Height
# 0   John    1.23
# 1  Geoff    4.56
# 2  Brett    7.8
```

The command above returns a dataframe.

### Selecting Rows Based On A Column Value

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

## Parsing CSV Files

pandas has first-tier support for CSV files. It can load in a CSV file directly into a `DataFrame`, ready for analyzing, without having to write any line-by-line CSV parsing. It will also label the columns if the CSV file has a header row (which is recommended!).

To load a CSV file into a `DataFrame`:

```python
df = pandas.read_csv('file_path.csv')
```