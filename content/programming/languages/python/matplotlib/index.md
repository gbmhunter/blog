---
author: gbmhunter
date: 2018-11-29
draft: false
lastmod: 2019-02-20
tags: [ "matplotlib", "Python", "code", "programming", "graphs", "numpy", "pyplot", "pie chart", "chart" ]
title: "matplotlib"
type: page
---

## Importing

`matplotlib`, just like `numpy`, is one of those libraries which has so much legacy behind the import statement that it's worth breaking Python style rules and using the `at` keyword to change the name of the imported library. Traditionally, `matplotlib.pyplot` is imported as `plt`, with the statement:

```py
import matplotlib.pyplot as plt
```

## Using subplots

```py
# Create two plots, in a grid with 2 rows and 1 column
# (plots will be stacked vertically)
fig, axs = plt.subplots(1, 2)

ax1 = axs[0]
ax2 = axs[1]

# Use each axX object normally...
```

## Two Y-Axis Example

```py
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