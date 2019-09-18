---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-09-16
description: "A tutorial on Python async."
draft: false
lastmod: 2019-09-16
tags: [ "Python", "programming", "programming languages", "software" ]
title: "Python Async"
type: "page"
---

## Overview

A coroutine is a Python function that has the keyword `await` before the `def`, e.g.:

```py
async def my_coroutine():
  print('Hello')
```

Calling a coroutine normally won't actually do what you expect!

```py
my_coroutine() # Nothing happens!
```

But it will give you a warning:

```text
main.py:6: RuntimeWarning: coroutine 'my_coroutine' was never awaited
```

Before Python v3.5, the `async` keyword is not available. You can however use a decorator to define a coroutine:

```py
@asyncio.coroutine
def my_coroutine():
  print('Hello')
```

Also, instead of `await`, you can use the `yield from` syntax:

```py

```