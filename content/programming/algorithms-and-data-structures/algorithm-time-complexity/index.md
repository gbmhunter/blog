---
author: "gbmhunter"
date: 2017-07-06
description: "A tutorial on the time complexity of algorithms, including Big-O notation and amortized complexity."
draft: false
lastmod: 2019-01-17
tags: [ "big O notation", "big O", "little o", "theta", "omega", "algorithm", "time complexity", "complexity", "class", "linear", "logarithmic", "nlog(n)", "programming", "amortized", "n^2" ]
title: "Algorithm Time Complexity"
type: "page"
---

## Overview

Algorithmic time complexity is a measure of how long it takes for an algorithm to complete when there is a change in size of the input to the algorithm (which is usually the number of elements, `\( n \)`. Rather than actually measure the time taken, which varies on the programming language, processor speed, architecture, and a hundred other things, we consider the "time" to be the number of basic operations that the algorithm has to take. This gives us an metric independent on the users computer, that we can use to rate one algorithm against another when solving a problem.

{{< img src="big-o-notation-algorithm-complexity-non-weighted.png" width="700px" caption="A graph showing the response of different time complexities as the number of elements increase. Coefficients were chosen so that the worst time complexities were the largest by the time n = 1000." >}}

{{< img src="big-o-notation-algorithm-complexity.png" width="700px" caption="A graph showing the response of different time complexities as the number of elements increase. Coefficients were chosen so that the worst time complexities were the largest by the time n = 1000." >}}

## Big-O, Little-o, Theta And Omega 

Big-O, little-o, Theta and Omega are all mathematical methods of **describing an algorithms growth as the size of the input increases**. We can look at growth in two different ways: the increase in computational cost and the increase in storage (memory). 

There are three different mathematical notations used:

* `\( \mathcal{O}(f(n)) \)` describes the **upper bound** in complexity
* `\( \Omega(f(n)) \)` describes the **lower bound** in complexity
* `\( \Theta(f(n)) \)` describes the **exact bound** in complexity

`\( \mathcal{O}(f(n)) \)` (Big-O) is the most commonly used complexity, as we are normally interested in the worst case computational cost/memory usage when choosing/designing an algorithm. Note that you can also describe Big-O average case and worst case scenarios, which can become confusing.

Normally, we use Big O notation to describe time complexity. Basically, it's a big `\( \mathcal{O}() \)` with brackets, and inside the bracket you write how the time complexity scales with the input. The input is usually called `\( n \)`, and usually represents the "number of things" the algorithm has to deal with.

Big O notation ignores and constant terms and any constant coefficients (e.g. an algorithm that grows at `\( 2n \)` is still written as `\( \mathcal{O}(n) \)`. This is because constant terms and constant coefficients do not effect the growth, you can think as Big-O notation as kind of analysis on the "derivative".

## Complexity Algebra

When adding two big-O complexity classes we can move the functions inside the `\( \mathcal{O} \)`:

<div>$$ \mathcal{O}(f(n)) + \mathcal{O}(g(n)) = \mathcal{O}(f(n) + \mathcal{O}(g(n))) $$</div>

Then the larger complexity class becomes dominant and we drop the lower class. For example:

<div>$$ \mathcal{O}(n) + \mathcal{O}(log(n)) = \mathcal{O}(n + log(n)) = \mathcal{O}(n) $$</div>

`\( n \)` grows faster than `\( \log{n} \)`, as `\( \lim_{n \to \infty} \frac{\log{n}}{n} = 0 \)`.

## Common Complexity Classes

The following complexities are described from best to worst.

### Constant Time

{{< img src="graph-constant-time-complexity" width="700px" caption="The growth of constant time complexity compared with other common complexity classes." >}}

The following algorithm just prints "hello" once, and doesn't depend on the number of elements (`\( n \)`). It will always run in constant time, and therefore is `\( \mathcal{\mathcal{O}}(1) \)`.

```python
print('hello')
```

Note that even though the following algorithm prints out `hello` three times, it still does not depends on `\( n \)`, and runs in constant time. Again, it is still classified as `\( \mathcal{O}(1) \)`.

```python
print('hello')
print('hello')
print('hello')
```

`\(\mathcal{O}(1)\)` complexity is the best algorithm complexity you can achieve. Common software operations that have _amortized_ `\(\mathcal{O}(1)\)` complexity are:

* Reading a value from an array (e.g. a Python `list`, a C `array`, or a C++ `std::vector`). To read a value from a from an array, you just read the memory address at `base_address + index * value_size`. This takes a constant amount of time.
* Reading an element from hash table (e.g. a Python `dictionary`). Computing the hash of a key takes a constant amount of time, and then looking up the memory location at that hash is also constant.

{{% note %}}
Even if an algorithm takes a long time to calculate something, e.g. computing a hash, as long as this operation takes the same amount of time, no matter if there are 3 elements or 9000, it is still considered `\( \mathcal{O}(1) \)`.
{{% /note %}}

### log(n) Time

{{< img src="graph-logarithmic-time-complexity" width="700px" caption="The growth of logarithmic time complexity compared with other common complexity classes." >}}

`\(\mathcal{O}(\log{n})\)` is a time complexity where the number of operations.

Note that whenever we are talking about software algorithms with `\(\mathcal{O}(\log{n})\)` complexity, we are usually referring `\(\mathcal{O}(\log_2{n})\)` complexity (due to the binary nature of most algorithms). However, this does not matter, as all logarithmic complexities belong to the same class, no matter what the _base_ is.

```c    
for(int i = 1; i <= n; i = i * 2)
    print "hello";
```

Notice the `i = i * 2`, which makes in run in `\( \mathcal{O}(\log{n}) \)` time.

Common software operations that have `\( \mathcal{O}(\log{n}) \)` complexity are:

* Reading an element from a binary search tree. a 1-node binary tree has height `\( \log_2{1} + 1 = 1 \)`, a 2-node binary tree has height `\( \log_2{2} + 1 = 2 \)`, a 4-node binary tree has height `\(\log_2{4} + 1 = 3\)`, and so on. An n-node tree has height `\( \log_2{n} + 1 \)`, so adding elements to the tree causes the height to grow logarithmically. Because 

### Linear Time

{{< img src="graph-linear-time-complexity" width="700px" caption="The growth of linear time complexity compared with other common complexity classes." >}}

Linear time is when an algorithm grows at a rate proportional to the number of elements, `\(n\)`. A simple for loop has `\(\mathcal{O}(n)\)` complexity:

```c    
for(int i = 0; i < n; i++)
    print "hello";
```

Another example:

```c    
for(int i = 0; i < n; i = i + 2)
    print "hello";
```

Note that even though the above example prints "hello" for every second `\(n\)` (`\(0.5n\)`), it is still said to have `\(\mathcal{O}(n)\)` complexity (remember that coefficients are dropped).

### nlog(n) Time

{{< img src="graph-nlogn-time-complexity" width="700px" caption="The growth of nlogn time complexity compared with other common complexity classes." >}}

`\( \mathcal{O}(nlog(n)) \)` complexity can be thought of as a combination of `\( \mathcal{O}(n) \)` and `\( \mathcal{O}(log(n)) \)` complexity.

This can be demonstrated by a nested `for` loop, one having `\( \mathcal{O}(n) \)` complexity and the other `\( \mathcal{O}(log(n)) \)` complexity:

```c    
for(int i = 0; i < n; i++)
    for(int j = 1; j < n; j = j * 2)
        print "hello";
```

### n^2 Time

{{< img src="graph-n2-time-complexity" width="700px" caption="The growth of n^2 time complexity compared with other common complexity classes." >}}

`\( \mathcal{O}(n^2) \)` complexity is proportional to the square of the number of elements `\( n \)`. This is a bad form of complexity to have, especially when `\( n \)` grows large.

```c    
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        print "hello";
```

Here is another example which has `\( \mathcal{O}(n^2) \)` complexity.

```c    
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        print "hello";

for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        print "hello";
```

Note that this is just a 2x repetition of a algorithm with `\( \mathcal{O}(n^2) \)` complexity. Repeating an algorithm (i.e. performing it twice) does not change the complexity.

### n^3 Time

{{< img src="graph-n3-time-complexity" width="700px" caption="The growth of n^3 time complexity compared with other common complexity classes." >}}

`\( \mathcal{O}(n^3) \)` complexity is rarely seen in a single software algorithms (but can easily arise from the combination of multiple algorithms to solve a problem).

```c    
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        for(int k = 0; k < n; k++)
            print "hello";
```

Naturally, we could keep going forever explaining poorer and poorer complexities (`(\ n^4 \)`, `\( n^5 \)`, e.t.c), but I think by now you understand the concept, and these higher complexities are rarely seen in real software algorithms.

### 2^n Time

{{< img src="graph-2n-time-complexity" width="700px" caption="The growth of 2^n time complexity compared with other common complexity classes." >}}

Exponential time is written as `\( \mathcal{O}(2^n) \)`. Exponential time is always greater than any polynomial time, e.g. `\( 2^n \)` grows faster than `\( n^{1000} \)`.

An example of `\( \mathcal{O}(2^n) \)` time is the naive (and simple) implementation of an algorithm that calculates the Fibonacci sequence, without the use of dynamic programming. It would look something like this:

```python
def fibonacci(n):
    if n <= 1:
        return n
    else
        return fibonacci(n - 1) + fibonacci(n - 2)
```

### n! Time

Factorial time is written as `\(\mathcal{O}(n!)\)`. It is a very rare and hugely expensive complexity class. Permutation algorithms.

## Amortized Complexity

When we talk about _amortized complexity_, we are referring to complexity per run, as the number of runs goes to infinity. This means that if sometimes, the runtime is much longer, as long as this event is infrequent enough, the amortized complexity can still be quite good.

In formal terms:

> Amortized complexity is the total expense per operation, evaluated over a sequence of operations.

For example, take the example of adding a value to an array. The array starts of being able to hold one value, and it's size is doubled every time we run out of space. When we add a value, it normally doesn't need resizing, which is `\(\mathcal{O}(1)\)`. But when adding the 1st, 2nd, 4th, 8th, 16th, e.t.c value, we need to resize the array. This takes `\(\mathcal{O}(n)\)`. The probability of having to resize the array is `\( \frac{1}{n} \)`. This gives an amortized complexity of `\( \frac{\mathcal{O}(n)}{n} = \mathcal{O}(1) \)`.

{{% warning %}}
Amortized complexity is not the same thing as average complexity.
{{% /warning %}}