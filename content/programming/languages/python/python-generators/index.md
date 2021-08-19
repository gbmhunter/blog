---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-03-25
description: "A tutorial on Python generators, including code examples and info on type annotations."
draft: false
lastmod: 2019-03-25
tags: [ "Python", "generator", "type annotation", "yield", "iterable", "iterator" ]
title: "Python Generators"
type: "page"
---

<h2>Overview</h2>

Python generators are a type of iterator in Python, with the important caviat that <b>you can only iterate over them once</b>.

They are created by writing a function what uses the keyword <code>yield</code> rather than <code>return</code>.

<h2>Type Annotations</h2>

Generators can be annotated with the <code>Generator</code> type that is defined in the <code>typing</code> module:

{{< highlight python >}}
Generator[yield_type, send_type, return_type] 
{{< /highlight >}}

<h2>Code Examples</h2>

<p>The following code example chunks up a list:</p>

{{< highlight python >}}
def chunkify(l: List[Any], n: int) -> Generator[List[Any], None, None]:
    """
    Provides a generator which provides chunks of size n of the list.

    Args:
        l: The list to chunk up.
        n: The number of list elements to include in each chunk. Each chunk will be of length n,
            except for the last chunk, which may be from 1 to length n depending on the number
            of remaining elements.

    Returns:
        A generator which, when iterated over, provides the chunks.
    """

    for i in range(0, len(l), n):
        # Make sure we don't go over the bounds of the iterable on the last chunk
        upper_bound = min(i + n, len(l))
        yield l[i : upper_bound]
{{< /highlight >}}