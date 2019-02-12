---
author: "gbmhunter"
date: 2019-02-11
draft: false
lastmod: 2019-02-11
tags: [ "Python", "programming", "language", "software", "OOP", "object orientated", "class", "design" ]
title: "Python Classes And Object Orientated Design"
type: "page"
---

Since Python v3.3, you can use both the `@staticmethod` and `@abstractmethod` decorators on the same class function (and the `@abstractstaticmethod` decorator has been depreciated).

```python
import abc

class MyClass:

    @staticmethod
    @abstractmethod
    def my_func():
        pass

```

{{% note %}}
You have to make sure to specify `@staticmethod` before `@abstractmethod` or it will not work.
{{% /note %}}