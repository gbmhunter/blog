---
author: "gbmhunter"
categories: [ "Space", "Projections" ]
date: 2019-11-13
draft: false
lastmod: 2019-11-13
tags: [ "space", "projections", "Mercator", "Google Maps", "Gerhard Kremer", "Gerhard Mercator", "WKT" ]
title: "Map Projections"
---

## Overview

## Mercator Projection

The Mercator projection is one of the **most common map projections in existence**. The primary reason for it's success is that it plots any course of constant bearing (angle w.r.t to North, a.k.a a _rhumb line_) as a straight line, which was extremely useful for ship navigation in the early days of it's existence.

The Mercator map was created in-full firstly by _Gerhard Kremer_, who went by the trade name of _Gerhard Mercator_. He created the map in 1569, and named it _Nova et Aucta Orbis Terrae Descriptio ad Usum Navigantium Emendata_[^wikipedia].

## Web Mercator Projection

The Web Mercator projection is a slight variant of the standard Mercator projection. It is used in many web-based mapping programs (e.g. Google Maps, Leaflet).

### WKT

[^spatialreference.org]

```text
PROJCS["WGS 84 / Pseudo-Mercator",
    GEOGCS["WGS 84",
        DATUM["WGS_1984",
            SPHEROID["WGS 84",6378137,298.257223563,
                AUTHORITY["EPSG","7030"]],
            AUTHORITY["EPSG","6326"]],
        PRIMEM["Greenwich",0,
            AUTHORITY["EPSG","8901"]],
        UNIT["degree",0.0174532925199433,
            AUTHORITY["EPSG","9122"]],
        AUTHORITY["EPSG","4326"]],
    PROJECTION["Mercator_1SP"],
    PARAMETER["central_meridian",0],
    PARAMETER["scale_factor",1],
    PARAMETER["false_easting",0],
    PARAMETER["false_northing",0],
    UNIT["metre",1,
        AUTHORITY["EPSG","9001"]],
    AXIS["X",EAST],
    AXIS["Y",NORTH],
    EXTENSION["PROJ4","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],
    AUTHORITY["EPSG","3857"]]
```

## Transverse Mercator Projection

Like the Mercator projection, the Transverse Mercator projection is a cylindrical projection. However, the main difference is that the cylinder's axis is not coincident with the polar axis of the earth. Instead, the cylinder is rotated 90 degrees, so that the cylinder's axis is parallel to the equator. The cylinder's axis can be chosen to be coincident with any line of meridian (line of constant latitude).

### WKT

[^spatialreference.org]

```text
PROJCS["NMMM",
    GEOGCS["GCS_Hartebeesthoek_1994",
        DATUM["D_Hartebeesthoek_1994",
            SPHEROID["WGS_1984",6378137.0,298.257223563]],
        PRIMEM["Greenwich",0.0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["False_Easting",0.0],
    PARAMETER["False_Northing",0.0],
    PARAMETER["Central_Meridian",25.0],
    PARAMETER["Scale_Factor",1.0],
    PARAMETER["Latitude_Of_Origin",0.0],
    UNIT["Meter",1.0]]
```

## References

[^wikipedia]: [https://en.wikipedia.org/wiki/Mercator_projection](https://en.wikipedia.org/wiki/Mercator_projection)
[^spatialreference.org] [https://spatialreference.org/](https://spatialreference.org/)