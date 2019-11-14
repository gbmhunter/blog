---
author: "gbmhunter"
date: 2019-10-04
draft: false
lastmod: 2019-10-04
tags: [ "space", "rasterio", "GDAL", "raster", "GeoTIFF", "geospatial", "API" ]
title: "rasterio"
---

## Overview

`rasterio` is a Python package which aims to provide a friendlier API to GDAL than GDAL's own Python API (which feels very C-like). 

Most of the code examples below assume you have imported `rasterio` into the current module with:

```py
import rasterio
```

## Reading A GeoTIFF

There are two common ways to do this, with or without a context manager.

With a context manager:

```py
with rasterio.open('example.tif') as dataset:
    pixels = dataset.read() # This will read all bands

# Dataset (the file) is closed automatically once you leave the context
```

Without a context manager:

```py
dataset = rasterio.open('example.tif')
pixels = dataset.read()
# You have to remember to close the dataset yourself
```

## Windowing

```py
Window()
```

## Polygons

