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

## Reprojection

`reproject()` does not create the destination array for you, you have to create the array yourself and pass it into the function.

```py
rasterio.reproject(
    src_array,
    dst_array,
    src_transform,
    src_crs,
    dst_transform,
    dst_crs,
    resampling)
```

## Common Errors

```text
rasterio._err.CPLE_AppDefinedError: Too many points (10201 out of 10201) failed to transform, unable to compute output bounds.
```

This error usually occurs if you are trying to reproject an image into a projection space that does not contain the image (e.g. images are in completely different UTM zones).
