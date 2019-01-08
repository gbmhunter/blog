---
author: "gbmhunter"
date: 2018-11-24
description: "A tutorial on Python dictionaries, including how to check if keys exits, delete items while iterating, and more."
draft: false
lastmod: 2019-01-07
tags: [ "Python", "dict", "dictionary", "code", "software", "data structure", "container", "iteration" ]
title: "Dictionaries"
type: "page"
---

## Checking If A Key Exists In A Dictionary

The recommended way to check if a key exists in a Python dictionary is to use the `in` keyword, as shown in the code example below:

```python
my_dict = {
    'foo': 1,
    'bar': 2
}

if 'foo' in my_dict:
    print('Found key')
else:
    print('Did not find key')
# stdout: Found key
```

## Get A List Of Dictionary Keys

Calling `keys()` on a Python dictionary returns a `dict_keys` object. A `dict_keys` object is similar to a List, but you cannot index or modify the object.

```python
my_dict = {
    'foo': 1,
    'bar': 2
}

print(my_dict.keys())
# stdout: dict_keys(['foo', 'bar'])
```

If you really want a list, you can pass this `dict_keys` object into the `list()` constructor.

```python
keys_list = list(my_dict.keys())

print(keys_list)
# stdout: ['foo', 'bar']
```

## Iterating And Deleting Keys At The Same Time

Strictly speaking, you can't iterate over a dictionary and delete entries at the same time. However, you can quite easily create a copy of the dictionary keys, iterate of that, and delete entries from the dictionary, as shown in the following example:

```python
my_dict = {
    'foo': 1,
    'bar': 2
}
for key in list(my_dict.keys()):
    if key == 'foo':
        del my_dict[key]

print(my_dict)
# stdout: {'bar': 2}
```

This does not occur much overhead as you are just copying the keys, and not the values.

Another way you can do it is by creating a new dictionary using _dictionary comprehension_:

```python
my_dict = {
    'foo': 1,
    'bar': 2
}
my_dict_2 = { k: v for k, v in my_dict.items() if k != 'foo' }
print(my_dict_2)
# stdout: {'bar': 2}
```

This however creates a copy, and might be too memory intensive for large dictionaries.

## del vs. pop()

Both `del` and `pop()` can be used to remove items from a dictionary:

```python
my_dict = {
    'foo': 1,
    'bar': 2
}

del my_dict['foo']
my_dict.pop('foo')
```

It is recommended to use `del` if you just want to delete the item, as it will be slightly faster than `pop()`. Use `pop()` if you want to capture the removed item, as `pop()` returns the removed item:

```python
my_item = my_dict.pop('foo')
```

## Combining Dictionaries

Python dictionaries can be combined (merged) with the `update()` function.

```python
my_dict1 = { 'a': 1, 'b': 2 }
my_dict2 = { 'b': 3, 'c': 4 }

my_dict1.update(my_dict2)
print(my_dict1)
# stdout: {'a': 1, 'b': 3, 'c': 4}
```

As of Python 3.5 and higher, they can also be combined with the `**` syntax below:

```python
my_dict1 = { 'a': 1, 'b': 2 }
my_dict2 = { 'b': 3, 'c': 4 }
my_dict3 = {**my_dict1, **my_dict2}
print(my_dict3)
# stdout: {'a': 1, 'b': 3, 'c': 4}
```

## Sorting Dictionaries

You can get a sorted list of the dictionary keys with the built-in `sorted()` function:

```python
my_dict = { 2: 'a', 4: 'dict', 3: 'sorted', 1: 'I\'m' }
sorted_keys = sorted(my_dict)
print(sorted_keys)
# stdout: [1, 2, 3, 4]
for key in sorted_keys:
    print(my_dict[key])
# stdout:   I'm
#           a
#           sorted
#           dict
```