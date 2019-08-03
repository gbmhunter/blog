---
author: "gbmhunter"
categories: [ "Mathematics", "Statistics" ]
date: 2019-08-02
draft: false
lastmod: 2019-08-02
tags: [ "mathematics", "statistics", "standard deviation" ]
title: "Standard Deviation"
type: "page"
---

## Overview

The standard deviation is a metric which is used to measure the amount of variation in a set of data values.

The standard deviation has the same units as the data.

## Software

You can calculated the standard deviation of an array in Numpy with `np.std()`:

```python
np.std(my_array)
```

By default, the array is flattened. However, you can specify an `axis` on which to calculate the standard deviation.