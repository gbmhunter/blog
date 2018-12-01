---
author: gbmhunter
date: 2017-07-06 00:11:39+00:00
draft: false
title: Time Complexity
type: page
url: /programming/algorithms-and-data-structures/time-complexity
---

# Overview

The Big O notation ignores behaviour when n is small, and ignores coefficients (e.g. an algorithm that grows at `\(2n\)` is still `\(O(n)\)`).

The following complexities are described from best to worst.

# Constant Time

The following algorithm just prints "hello" once, and doesn't depend on the number of elements (n). It will always run in constant time, and therefore is `\(O(1)\)`.

```c    
    print "hello"
```

Note that even though the following algorithm prints out "hello" three times, it still does not depends on n, and runs in constant time. Again, it is still classified as `\(O(1)\)`.

```c    
    print "hello"
    print "hello"
    print "hello"
```

`\(O(1)\)` complexity is the best algorithm complexity you can achieve. Common software operations that have `\(O(1)\)` complexity are:

* Reading an element from an array (or vector).
* Reading an element from hash table (in the average and best case only)

# log(n) Time

Note that whenever we are talking about software algorithms with `\(O(log(n))\)` complexity, we are really talking about `\(O(log_2(n))\)` complexity.

```c    
    for(int i = 1; i <= n; i = i * 2)
       print "hello";
```

Notice the i = i * 2, which makes in run in `\(O(log(n))\)` time.

Common software operations that have `\(O(log(n))\)` complexity are:

* Reading an element from a binary search tree

# Linear Time

Linear time is when an algorithm grows at a rate proportional to the number of elements, `\(n\)`. A simple for loop has `\(O(n)\)` complexity:

```c    
    for(int i = 0; i < n; i++)
       print "hello";
```

Another example:

```c    
    for(int i = 0; i < n; i = i + 2)
       print "hello";
```

Note that even though the above example prints "hello" for every second `\(n\)` (`\(0.5n\)`), it is still said to have `\(O(n)\)` complexity (remember that coefficients are dropped).

# nlog(n) Time

`\(O(nlog(n))\)` complexity can be thought of as a combination of `\(O(n)\)` and `\(O(log(n))\)` complexity.

This can be demonstrated by a nested for loop, one having `\(O(n)\)` complexity and the other `\(O(log(n))\)` complexity

```c    
    for(int i = 0; i < n; i++)
       for(int j = 1; j < n; j = j * 2)
          print "hello";
```

# n^2 Time

`\(O(n^2)\)` complexity is proportional to the square of the number of elements `\(n\)`. This is a bad form of complexity to have, especially when `\(n\)` grows large.

```c    
    for(int i = 0; i < n; i++)
       for(int j = 0; j < n; j++)
          print "hello";
```

Here is another example which has `\(O(n^2)\)` complexity.

```c    
    for(int i = 0; i < n; i++)
       for(int j = 0; j < n; j++)
          print "hello";
    
    for(int i = 0; i < n; i++)
       for(int j = 0; j < n; j++)
          print "hello";
```

Note that this is just a 2x repetition of a algorithm with `\(O(n^2)\)` complexity. Repeating an algorithm (i.e. performing it twice) does not change the complexity.

# n^3 Time

`\(O(n^3)\)` complexity is rarely seen in a single software algorithms (but can easily arise from the combination of multiple algorithms to solve a problem).

```c    
    for(int i = 0; i < n; i++)
       for(int j = 0; j < n; j++)
          for(int k = 0; k < n; k++)
             print "hello";
```

Naturally, we could keep going forever explaining poorer and poorer complexities (`(\n^4\)`, `\(n^5\)`, e.t.c), but these are hardly educational and rarely seen in real software algorithms.
