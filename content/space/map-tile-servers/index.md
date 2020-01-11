---
author: "gbmhunter"
categories: [ "Space" ]
date: 2019-12-11
description: "A tutorial on servers which provide APIs for requesting tiles of map imagery for geospatial mapping applications."
draft: false
lastmod: 2019-12-14
tags: [ "space", "map tile servers", "gdal", "OGC", "geospatial", "web server", "ArcGIS", "png", "web mercator", "WMTS", "Web Map Tile Service", "TMS", "Tile Map Service" ]
title: "Map Tile Servers"
---

## Overview

Map tile servers are web servers which have an API for returning tiles of map imagery. Most web and mobile applications (think Google maps) which provide map services do not download or store a copy of all the map data, due to the huge file sizes, latencies and data caps. Instead, as a user pans and zooms on a map, requests for square tiles of map imagery at the users current zoom level (resolution) and area-of-interest (AOI )are sent out by the user application to the map server. The map server either has pre-rendered, cached copies of these tiles or renders them on-the-fly, compresses them, and sends them back to the user (the server typically sends back compressed `.png` or `.jpeg` files). The map application inserts these tiles into the map to provide a seamless browsing experience to the user.

Typically WGS84 Web Mercator (EPSG:3857).

https://a.tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2017_3857/default/g/1/1/1.jpg returns this tile:

{{% img src="map-tile-s2-2018-epsg3857-1-1-1.png" width="400px" caption="The tile returned from a Web Map Tile Service (WMTS) at the URL https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2017_3857/default/g/1/1/1.jpg" %}}

## Standards

### Tile Map Service (TMS)

### Web Map Tile Service (WMTS)

The _Web Map Tile Service_ (WMTS) is a newer, more feature-full standard than the Tile Map Service. The WMTS standard is specified by OGC.

The simpler [OGC WMTS Simple Profile](http://docs.opengeospatial.org/is/13-082r2/13-082r2.html).

Capabilities defined in a machine-readable XML format. See [https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml](https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml) for an example.

`gdal` has built-in support for using WMTS (see [https://gdal.org/drivers/raster/wmts.html](https://gdal.org/drivers/raster/wmts.html)).

[ArcGIS supports the WMTS API](https://developers.arcgis.com/rest/services-reference/wmts-tile-map-service-.htm).

The 