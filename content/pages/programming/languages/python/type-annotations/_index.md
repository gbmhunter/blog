---
author: gbmhunter
date: 2018-08-20 23:31:53+00:00
draft: false
title: Types
type: page
url: /programming/languages/python/type-annotations
---

# Type Hints/Annotations

Type hints/annotations for Python are introduced in [PEP 484](https://www.python.org/dev/peps/pep-0484/) and [PEP 526](https://www.python.org/dev/peps/pep-0526/). The python interpreter completely ignores type hints/annotations, it is type syntax which is formalized so that third-party tools such as IDEs or type checkers such as MyPy can then use it to provide type checking and other useful type inference capabilities.

The JetBrains range of IDEs support these type hints (e.g. PyCharm, IntelliJ IDEA).

# Basic Types
    
```python
my_int: int = 3
my_float: float = 1.234
my_string: str = 'Hello'
```

There is also None, which is commonly used to define the return type of a function that doesn't return anything.

# Lists, Dicts, e.t.c

```python    
from typing import Dict, List, Tuple
```

# Optional

When a variable is optional, use Optional.
    
```python
myVar: Optional[str] = my_function()
```

If you want to ignore any type checking:

```python    
x = causes_weird_type_error() # type: ignore
```
