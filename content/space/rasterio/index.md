---
authors: [ "Geoffrey Hunter" ]
categories: [ "Space" ]
date: 2019-10-04
description: "An introduction to the Python library rasterio, used for manipulating geospatial data."
draft: false
lastmod: 2020-04-03
tags: [ "space", "rasterio", "GDAL", "raster", "GeoTIFF", "geospatial", "APIs", "mapbox", "Python", "projections", "context manager", "coordinates", "pixels" ]
title: "rasterio"
---

## Overview

`rasterio` is a Python package which aims to provide a friendlier API to GDAL than GDAL's own Python API (which feels very C-like). It is an [open source project on GitHub](https://github.com/mapbox/rasterio) that is created and maintained by [mapbox](https://www.mapbox.com/).

{{% img src="raster-io-example-image.png" width="400px" caption="A GeoTIF file which has been reprojected and displayed using rasterio." %}}

Most of the code examples below assume you have imported `rasterio` into the current module with:

```py
import rasterio
```

`rasterio`'s API documentation can be found at [https://rasterio.readthedocs.io/en/stable/index.html](https://rasterio.readthedocs.io/en/stable/index.html). Be warned that it is very incomplete (as of November 2019) --- there is missing documentation for many `rasterio` features.

## Reading A GeoTIFF

There are two common ways to do this, with or without a _context manager_.

With a context manager:

```py
with rasterio.open('example.tif') as dataset:
    pixels = dataset.read() # This will read all bands

# Dataset (the file) is closed automatically once you leave the context
```

Without a context manager:

```py
ds = rasterio.open('example.tif')
pixels = ds.read()
# You have to remember to close the dataset yourself
ds.close()
```

The `read()` function as used above will read all bands of data from the `.tif` file. You can read a specific band by providing a band index to `read()`. The band indexes start from `1`, just as they do in GDAL. The following example just reads the first band:

```py
pixels = ds.read(1)
```

You can also open a raster by passing in a `Path` object to `open()` (Python v3.4 or higher only):

```py
from pathlib import Path
file_path = Path('example.tif')
ds = rasterio.open(file_path)
```

## Getting Projection Info

The projection information in obtained through the `Dataset.crs` property:

```py
ds = rasterio.open('example.tif')
ds.crs
# EPSG:4326
```

You can get also get the "Well Known Text" (WKT) syntax:

```py
ds.crs.wkt
# GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AXIS["Latitude",NORTH],AXIS["Longitude",EAST],AUTHORITY["EPSG","4326"]]
```

To get the Affine transformation:

```py
ds.transform
# | 0.00, 0.00, 26.04|
# | 0.00,-0.00,-15.29|
# | 0.00, 0.00, 1.00|
```

## Converting Coordinates To Pixels

rasterio provides the `index()` function in the `Dataset` class to convert coordinates from the projection space (e.g. `(latitude, longitude)` if in WGS 84) of a dataset to `(x, y)` pixel coordinates in the image. 

```py
lat = [ 10.0, 20.0 ]
lng = [ -120.0, -110.0 ]
x, y = ds.index(lat, lng)
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

## Masking

More on masking can be found at [https://rasterio.readthedocs.io/en/latest/api/rasterio.mask.html](https://rasterio.readthedocs.io/en/latest/api/rasterio.mask.html).

## Common Errors

```text
rasterio._err.CPLE_AppDefinedError: Too many points (10201 out of 10201) failed to transform, unable to compute output bounds.
```

This error usually occurs if you are trying to reproject an image into a projection space that does not contain the image (e.g. images are in completely different UTM zones).

## External Info

The documentation for the latest version of `rasterio` can be found at [https://rasterio.readthedocs.io/en/latest/](https://rasterio.readthedocs.io/en/latest/).
