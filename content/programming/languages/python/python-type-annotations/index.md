---
author: "gbmhunter"
date: 2018-08-20
description: "A tutorial on Python type annotations, including basic types, Optional, casts and mypy."
draft: false
lastmod: 2019-01-15
tags: [ "Python", "type hints", "type annotations", "syntax", "mypy", "PEP 526", "PEP 484", "code" ]
title: "Python Type Annotations"
type: "page"
---

## Overview

Type hints/annotations for Python are introduced in [PEP 484](https://www.python.org/dev/peps/pep-0484/) and [PEP 526](https://www.python.org/dev/peps/pep-0526/). The python interpreter completely ignores type hints/annotations, it is type syntax which is formalized so that third-party tools such as IDEs or type checkers such as MyPy can then use it to provide type checking and other useful type inference capabilities.

The JetBrains range of IDEs support these type hints (e.g. PyCharm, IntelliJ IDEA).

## Basic Types

Type annotations are specified for variables by adding a `:` and then a type after the variable name. The type for variables returned from a function are specified by adding a `->` and then the type after the input parameter list of the function, but before the `:` which delimits the end of the function definition.

```python
# The basic types (no import needed!)
my_int: int = 3
my_float: float = 1.234
my_string: str = 'Hello'

# Declaring the return type for a function
def my_func() -> str:
    return "foo!!"
```

There is also `None`, which is commonly used to define the return type of a function that doesn't return anything.

```python
def my_func() -> None:
    print('Hello, world')
```

## Lists, Dicts, e.t.c

Although for basic types you do not have to import anything, for the more advanced types it is recommended you use the types defined in the `typing` module, which is included in the basic Python installation.

```python    
from typing import Dict, List, Tuple

# For a list, you speicfy the type of the elements stored
# in the list
my_list: List[int] = [ 1, 2, 3 ]

# For a dictionary, you specify the type of
# the key and the type of the value
my_dict: Dict[str, int] = {
    'foo': 2,
    'bar': 5,
}

# You specify the type for each variable in the Tuple
my_tupe: Tuple[str, int, int] = ('foo', 1, 2)
```

{{% warning %}}
Although you can also specify the type of collection types with `my_dict: dict`, this is NOT recommended as you lose the ability to specify the type of the keys or values. Use the `Dict` and equivalent types from the `typing` module instead.
{{% /warning %}}

## Optional

When a variable could be either of a particular type or `None`, use the `Optional[<Type>]` type.
    
```python
# If my_var could return either be a string or None, use:
my_var: Optional[str]
```

`Optional[<Type>]` is the same as `Union[Type, None]` but is easier to type, and expresses the design intent of the code in a clearer fashion.

```python
# Both my_var1 and my_var2 have the same type
my_var1: Optional[str]     
my_var2: Union[str, None]
```

If you want to ignore any type checking (this works with mypy):

```python    
x = causes_weird_type_error() # type: ignore
```

## Generators

Python functions that use the `yield` keyword return a special type of object called a _generator_. You can use the `Generator[]` type annotation for the return type of generator functions.

The generator type has the syntax: `Generator[yield_type, send_type, return_type]`. If you don't send anything to the generator, no return anything with the `return` statement, this simplifies to `Generator[yield_type, None, None]`:

```python
from typing import Generator

def my_generator() -> Generator[int, None, None]:
    for i in range(10):
        yield i

```

You can also specify the return type as `Iterable[yield_type]`:

```python
from typing import Iterable

def my_generator() -> Iterable[int]:
    for i in range(10):
        yield i
```

## mypy

[mypy](http://mypy-lang.org/) is a third-party static type checker for Python, which utilizes the official Python type annotation specification described above (which applied to Python 3.6 or greater, but you can use mypy on lower versions of Python using a different, non-official type syntax).

mypy allows you to slowly introduce types into an existing code base without having to convert everything at once.

You can install mypy with:

```sh
$ pip install mypy
```

You can check a Python program with the command:

```sh
$ mypy my_file.py
```

### The mypy.ini File

mypy can read a project level `mypy.ini` file which you can use to configure mypy. You can use this configuration file to enable/disable certain type checking features, to prevent certain files/directories from being type checked, and more.