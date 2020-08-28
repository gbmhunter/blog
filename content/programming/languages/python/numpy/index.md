---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2018-06-25
description: "A tutorial on how to use Numpy, a popular library for Python that provides powerful array/matrix manipulation."
draft: false
lastmod: 2020-08-28
tags: [ "programming", "programming languages", "Python", "Numpy", "array", "axis", "computation", "dimension", "np", "example", "code", "tutorial", "slicing", "indexing" ]
title: "Numpy"
type: "page"
---

## The Array

The main object that you throw around in NumPy is called a multidimensional array. Typically you store numbers in it. Each "dimension" is called an axes. For example, a single co-ordinate in 3D space could be stored as:

```python
V = [2, 4, 3]
```

This has one axis (one dimension).

A 2D rotation transformation could be described with:

```python
R = [
    [2, 3, 5],
    [1, 7, 2]
] 
```

This has two axes.

### Creating An Array

NumPy arrays can be created with standard Python lists:

```python
>>> import numpy as np
>>> a = np.array([2,1,5])
>>> a
array([2, 5, 1])
```

If we wanted to create a 2 axis array we could pass in a list of lists:

```python
>>> import numpy as np
>>> a = np.array([[1,2,3],[4,5,6])
>>> a
array([[1, 2, 3],
        [4, 5, 6]])
```

You can continue to nest lists within lists to create an array with any number of axes (dimensions).

You can also create arrays with special values, such as arrays full of 1's, arrays full of zero's, arrays full of random numbers and arrays with 1's on the diagonal (like identity matrices).

An array of 1's:

```python
>>> a = np.ones([2,3])
>>> a
array([[1., 1., 1.],
        [1., 1., 1.]])
```

An array with 1's on the diagonal:

```python
>>> a
array([[1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]])
```

Another really useful way of creating arrays is with `np.arange()`. This does exactly what is says, it creates an array with a range of values:

```python
>>> np.arange(4)
array([0, 1, 2, 3])

>>> a = np.arange(9)
>>> np.reshape(a, [3, 3])
array([[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]])
```

`np.linspace()` is another great array creating tool, which creates an array of linearly spaced numbers. The following example creates 5 numbers, linearly spaced from 4.0 to 10.0:

```python
>>> np.linspace(4.0, 10.0, 5)
array([ 4. ,  5.5,  7. ,  8.5, 10. ])
```

{{% warning %}}
The difference between `np.arange()` and `np.linspace()` is subtle but important to understand. `arange()` lets you specify the step size, and will create equally spaced points from the start up to (but not necessarily including) the end point. Whether the end point is included or not depends if the step size fits an integer number of times into the interval. `linspace()` lets you specify the number of steps in the interval, and will always include the start and end points.
{{% /warning %}}

### Indexing And Reading/Writing

NumPy arrays have one index per axis, forming a tuple. The indexed are zero-indexed, like all sensible languages/libraries :-D.

Reading from a 1 axis array:

```python
>>> a = np.array([2,1,5])
>>> a[2]
5
```

Reading from a 2 axis array:

```python
>>> a = np.array([[2,5],[1,3]])
>>> a[0,1]
5
```

Writing to a 2-axis array:

```python
>>> a = np.array([[2,5],[1,3]])
>>> a[1,1] = 10
>>> a
array([[ 2,  5],
        [ 1, 10]])
```

### Doing Basic Operations With Arrays

NumPy arrays can be added element wise with the `+` operator:

```python
>>> a = np.array([[1,2,3],[4,5,6]])
>>> b = np.array([[1,1,2],[2,2,1]])
>>> a+b
array([[2, 3, 5],
        [6, 7, 7]])
```

They can be multiplied element-wise with the `*` operator (this is the same as `np.multiply`):

```python
>>> a = np.array([[2,5],[1,3]])
>>> b = np.array([[1,4],[2,1]])
>>> a*b
array([[ 2, 20],
        [ 2,  3]])
```

A dot-product of two arrays can be done with `np.dot()`:

```python
>>> a = np.array([[2,5],[1,3]])
>>> b = np.array([[1,4],[2,1]])
>>> np.dot(a, b)
array([[12, 13],
        [ 7,  7]])
```

The cross-product of two arrays can be done with `np.cross()`:

```python
>>> a = np.array([4,5,1])
>>> b = np.array([3,1,2])
>>> np.cross(a, b)
array([ 9, -5, -11])
```

## Slicing

One of the powerful features of Numpy arrays is the simple and terse slicing syntax (which is built upon Python's slicing syntax). A slice is when you extract just a portion of the array for further use:

### Simple Slicing

Very simple slicing is really the same as indexing:

```python
my_array = np.array([4, 5, 6])
my_slice = my_array[1]
# my_slice = 5
```

Extract the first two elements:

```python
my_array = np.array([4, 5, 6])
my_slice = my_array[0:2]
# my_slice = array([4, 5])
```

### Multidimensional Slicing

Some of the real power of slicing is seen when you slice multidimensional arrays (arrays with more than 1 axis).

`my_array[:, 0]` tells Numpy to make a slice using all elements from the 1st axis (`:`), and only the first element from the second axis (`0`). An example of this slice is shown below:

```python
my_array = np.array([[1, 2, 3], [4, 5, 6])
my_slice = my_array[:, 0] # Take all from 1st axis, and element 0 from second axis
# my_slice = array([1], [4])
```

Note that `:` is the same as `0:<len - 1>`, and captures all data.

This is commonly used to extract columns from data. For example, if you had the following array of x, y pairs:

```python
xy_pairs = np.array([[1, 2], [3, 4], [5, 6], [7, 8]])
```

You could extract all the x values and all the y values with:

```python
x_values = xy_pairs[:, 0]
y_values = xy_pairs[:, 1]

# x_values = array([[1], [3], [5], [7]])
# y_values = array([[2], [4], [6], [8]])
```

You can also use this to extract "rows" from an array:

```python
data = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])
two_rows = data[1:3, :]
# two_rows = array([[4, 5, 6], [7, 8, 9]])
```

### Adding A Step

You can also add a step size while slicing Numpy arrays, just as you can when using standard Python slicing. The step size is the third argument in the slice syntax, i.e. `start:stop:step`.

```python
data = np.arange(10)
# data = array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
my_slice = data[3:8:2] # Slice from 3 to 8, with a step size of 2
# my_slice = array([3, 5, 7])
```

## Stacking

Stacking is used to join arrays along a _new_ axis. A classic example of this would be if you had two separate arrays of x and y values, and you wanted to to combine them into a single array of (x, y) coordinate pairs.

```python
x_vals = np.array([ 1, 2, 3, 4])
y_vals = np.array([ 10, 20, 30, 40])
coords = np.stack([x_vals, y_vals], axis=1)
# coords = [
#   [ 1 10]
#   [ 2 20]
#   [ 3 30]
#   [ 4 40]
# ]
```

## Concatenation

If you want to start of with an empty array and add values to it in a loop, you can use concatenate, but you have to `reshape` your empty array first to make sure it has the right dimensions:

```python
data = np.array([]).reshape(0,3) # This reshape() call is important!
for i in range(3)
  np.concatenate([data, np.array([[ i*1, i*2, i*3]])])
print(data)
```

## Reading A CSV File

You can use Numpy's `genfromtxt()` method to read in CSV files and convert the data into a Numpy array:

```python
data = np.genfromtxt('my_file.csv', delimiter=',')
```

Each line will be a different element in axis 1 of the array. Each CSV value on a line will be a different element in axis 2 of the array.

For example, if your CSV looked like:

```csv
0, 1, 2
10, 11, 12
```

The array would look like:

```
[ [0 1 2], [10 11 12] ]
```

### Skip Header Rows

You can skip a header line/row in the CSV file by providing `skip_header=1` to `genfromtxt()`:

```python
data = np.genfromtxt('my_file.csv', delimiter=',', skip_header=1)
```

This is good when you have column data names in the first row (which is a common practice), e.g.:

```
Time (s), Depth (m), Width (m)
0, 1, 2
10, 11, 12
```

## Functions

**dot()**

```python
np.dot(a, b, out=none)
```

Dot product of two arrays.

**np.eye()**

Returns an array with 1's on the diagonal and 0's elsewhere (also known as an identity matrix).

```python
my_array = np.eye(3)
# my_array = array([
#   [1, 0, 0],
#   [0, 1, 0],
#   [0, 0, 1]])
```

**np.ravel()**

Returns a flattened array.

## Masked Arrays

Numpy has a powerful feature called a masked array. A masked array is essentially composed of two arrays, one containing the data, and another containing a mask (a boolean `True` or `False` value for each element in the data array).

Retrieving an array value which is masked will result in `masked` being returned.

### Creating A Masked Array

You can use the `np.ma.masked_equal()` function to create a masked array from a standard array, specifying the value you want to use as the mask as the second parameter:

```python
import numpy as np
standard_array = np.arange(4)
print(standard_array)
# stdout: array([0, 1, 2, 3])
masked_array = np.ma.masked_equal(standard_array, 2)
print(masked_array)
# stdout: masked_array(data=[0, 1, --, 3],
#           mask=[False, False,  True, False],
#           fill_value=2)
```

### Checking If An Array Is Masked

You can check if an array is masked with `np.ma.is_masked()`:

```python
import numpy as np

standard_array = np.arange(4)
print(np.ma.is_masked(standard_array))
# stdout: False

masked_array = np.ma.masked_equal(standard_array, 2)
print(np.ma.is_masked(masked_array))
# stdout: True
```

### Removing Masked Values From An Array

You can trim down an array and remove all masked values by using the `compressed()` function that belong to an `ndarray`:

```python
masked_array = np.ma.masked_equal([1, 2, 3, 4], 2)
no_masked_values = masked_array.compressed()
print(no_masked_values)
# [1 3 4]
```

## Numpy Warnings And How To Silence Them

For example, running `np.mean([])` using Python 3.7 and a up-to-date version of Numpy will produce the following:

```python
>>> import numpy as np
>>> np.mean([])
/usr/local/lib/python3.7/site-packages/numpy/core/fromnumeric.py:3118: RuntimeWarning: Mean of empty slice.
  out=out, **kwargs)
/usr/local/lib/python3.7/site-packages/numpy/core/_methods.py:85: RuntimeWarning: invalid value encountered in double_scalars
  ret = ret.dtype.type(ret / rcount)
nan
```

Not how this is not an exception. Numpy prints a warning stating that you are trying to calculate a mean of an empty slice, as well as that there is an invalid value, but continues execution and returns `nan`. These warnings are usually helpful in debugging problems with the data you are providing, but in some cases you will want to silence the warnings as the data is as expected.

The safest way to suppress Numpy warnings is to use the `np.errstate` context manager, which only changes the warning state while the content is active. However, this has some problems...

```python
with np.errstate(invalid='ignore'):
   # Numpy "invalid number" warnings will be suppressed here,
   # but not the "Mean of empty slice." warnings
   np.mean([])

# Warnings are back to normal here
```

However, the problem with this is that it will silence the `RuntimeWarning: invalid value encountered in double_scalars` warning, BUT NOT the `RuntimeWarning: Mean of empty slice.` warning. A better approach is to use the `warnings` module (which is shipped with Python), however this comes at the expense of silencing a larger group of warnings (what if a `RuntimeWarning` was emitted here for a different reason?):

```python
import warnings
import numpy as np

with warnings.catch_warnings():
    warnings.simplefilter("ignore", category=RuntimeWarning)
    # The better way! Both warnings from the line below are now silenced
    np.mean([])
```

If you want to convert all warnings into exceptions, you can use the following code. This is particular dangerous as in applies to all code after this call.

```python
np.seterr(all='raise')
```