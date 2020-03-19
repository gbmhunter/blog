---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2020-03-18
description: "A tutorial on how to use geopandas."
draft: false
lastmod: 2020-03-19
tags: [ "programming", "programming languages", "Python", "geopandas", "rtree" ]
title: "A Tutorial On geopandas"
type: "page"
---

## Overview

`geopandas` is a Python library that adds extra functionality to `pandas` to make it more useful for dealing with geospatial data.

## Common Warnings/Errors

```text
/usr/local/lib/python3.7/site-packages/geopandas/base.py:116: UserWarning: Cannot generate spatial index: Missing package `rtree`.
```

You are missing the package `rtree`. `rtree` can not usually easily be installed with `pip` alone because it depends on a number of dependencies that `pip` does not manage. It is best to use your systems package manager to install `rtree` instead.

