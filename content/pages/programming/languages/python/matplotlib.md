---
author: gbmhunter
date: 2018-11-29
draft: false
title: matplotlib
type: page
url: /programming/languages/python/matplotlib
---

# Two Y-Axis Example

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.1)
y1 = x**2
y2 = np.sin(x)

fig, ax1 = plt.subplots()

ax2 = ax1.twinx()

ax1.plot(x, y1, color='g')
ax2.plot(x, y2, color='b')

fig.suptitle('Two Y-Axis Example')
ax1.set_xlabel('x')
ax1.set_ylabel('y1')
ax2.set_ylabel('y2')

plt.show()
```

This will produce the following graph:

{{< figure src="/images/programming/languages/python/matplotlib-two-y-axis-example.png" width="500px" caption="Example matplotlib graph using two separate Y-axis." >}}