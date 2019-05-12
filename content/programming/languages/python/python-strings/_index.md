---
author: gbmhunter
date: 2017-08-16
draft: false
tags: [ "Python", "string", "concatenation", "repetition", "indexing", "slicing", "length" ]
title: Python Strings
type: page
---

## Overview

Python has built-in support for strings and all of the common string manipulation actions.

## Concatenation

Strings can be concatenated with the + operator.

```py    
"part 1" + " part 2" = "part 1 part2"
```

## Repetition

```py    
"repeat me "*3 = "repeat me repeat me repeat me"
```

## Indexing

```py    
"hello"[0] = "h"
"hello"[-1] = "o"
```

## Slicing

The slicing of strings can be easily done by using array-like syntax on a string object.

```py    
"hello"[1:3] = "ell"
```

## Find The Length

To find the length of a Python string, use the `len()` function as shown below:

```py    
myString = "hello"
length = len(myString)
// length = 5
```

To get the amount of memory (in bytes) used to store a string, use the `getsizeof()` function from sys:

```py    
from sys import getsizeof
numBytes = getsizeof("hello")
// numBytes = 54 (in my specific case)
```

Note that the number of bytes assigned to store the string may be much larger than the number of characters (even if they are single byte chars!) in the string itself.