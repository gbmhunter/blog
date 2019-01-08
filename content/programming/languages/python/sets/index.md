---
author: "gbmhunter"
date: 2019-01-07
description: "A tutorial on Python sets."
draft: false
lastmod: 2019-01-07
tags: [ "Python", "set", "code", "software", "data structure", "container", "iteration", "unordered", "union", "intersection", "difference", "symmetric", "superset", "subset" ]
title: "Sets"
type: "page"
---

## Overview

Python sets are un-ordered. Care has to be taken to make sure you don't assume sets to be ordered like lists are. In this sense they behave similar to dictionary which is also unordered.

## Creating A Set

You create a new set in Python with the call `set()`, passing in a list of values you want in your set:

```python
my_set = set([1, 2, 3, 4])
```

You can also create a set using set literal syntax:

```python
my_set = { 1, 2, 3, 4 }
```

Set literal syntax looks very similar to dictionary literal syntax (which also uses `{`/`}`), except rather than key/value pairs there is just a single value. Set literal syntax is faster than `set()` call above as Python doesn't have to create a list first. 

## Set Operations

### Union

A set union can be done either with `.union()` or `|`. It returns a set of all elements that are in either A or B:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
C = A | B
print(C)
# stdout: {1, 2, 3, 4, 5, 6}
```

The union returns a new set and does not modify the input sets. To perform a union but to modify inplace (which can potentially save memory and increase performance), use `update()`:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
A.update(B)
print(A)
```

### Intersection

A set intersection can be done with either `.intersection()` or `&`. It returns a set of only the elements which are in both A and B:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
C = A & B
print(C)
# stdout: {3, 4}
```

To perform an inplace intersection:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
A.intersection_update(B)
print(A)
# stdout: {3, 4}
```

### Difference

The `difference()` function or `-` operator returns the difference between two sets (every item in A that is not also in B).

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
print(A - B)
# stdout: {1, 2}
```

To perform an inplace difference:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
A.difference_update(B)
print(A)
# stdout: {1, 2}
```

### Symmetric Difference

The `.symmetric_difference()` function or the `^` operator returns the elements belonging to either set A or set B, but not those that belong to both:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
C = A ^ B
print(C)
# stdout: {1, 2, 5, 6}
```

To perform an inplace symmetric difference operation use `symmetric_difference_update()`:

```python
A = { 1, 2, 3, 4 }
B = { 3, 4, 5, 6 }
A.symmetric_difference_update(B)
print(A)
# stdout: {1, 2, 5, 6}
```

### Subset

The `.issubset()` or `<=` operator returns true if A is a subset of B. A is a subset of B when B contains at least every element that A contains.

```python
A = { 1, 2 }
B = { 1, 2, 3, 4}
print(A <= B)
# stdout: True

A = { 1, 2 }
B = { 2, 3, 4}
print(A <= B)
# stdout: False
```

### Superset

The `.issuperset()` or `>=` operator returns True if A is a superset of B. A is a superset of B when A contains at least every element that B contains.

```python
A = { 1, 2, 3 }
B = { 1, 2 }
print(A >= B)
# stdout: True

A = { 1, 2 }
B = { 2, 3, 4}
print(A >= B)
# stdout: False
```

### No Addition Operator Overload

While you can find the difference of two sets with `-`, you cannot use the addition operator `+` with two sets. This is because there is no clear meaning on what this would do. Do you want the union or the intersection? Because of this ambiguity, it is clearer to use the `|` and `&` operators, which also share meaning with standard `or` and `and` operations.

## Lack Of Order

Because sets are not ordered, you cannot index into them like you can with lists:

```python
A = { 1, 2, 3 }
print(A[1]) # ERROR: This won't work!
```

But you can still iterate over them:

```python
A = { 2, 1, 3 }
for element in A:
    print(element)
# stdout:   1   < WOAH, ORDER HAS CHANGED
#           2   <
#           3
```

Note also how the order is not preserved when you print the elements! **DO NOT** rely on an ordering when using sets. Even though in the example above the order was "sorted" (i.e. `1` then `2` then `3`), you cannot rely on this either.