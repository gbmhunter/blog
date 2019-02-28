---
author: gbmhunter
date: 2019-02-21
draft: false
lastmod: 2019-02-21
tags: [ "matrix", "dot product" ]
title: "Matrices"
type: page
---

## Dot Product

### Numpy

The dot product of arrays of vectors can be calculated using Numpy with:

```python
import numpy as np
a = np.array([[1, 1, 1], [2, 2, 2]])
b = np.array([[1, 2, 3], [4, 5, 6]])
np.sum(a*b, axis=1)
```

### Projection

The dot product can be used to calculate the projection of a vector onto an axis in 3D space.
