---
authors: [ "Geoffrey Hunter" ]
date: 2019-03-14
draft: false
lastmod: 2019-03-14
tags: [ "QGIS", "geographic", "geospatial", "imagery", "satellite", "tile server", "xyz" ]
title: QGIS
type: page
---

## Overview

_QGIS_ is a open-source and free-to-use desktop GUI application for viewing and processing geospatial imagery. The Q comes from the fact that it using the QT GUI framework, the GIS stands for _geographic information systen_.

{{< img src="qgis-logo.png" width="200px" caption="The QGIS logo." >}}

The official site for QGIS can be found at <https://www.qgis.org/>.

## Adding A XYZ Tile Server As A Layer

Since QGIS v2.18, you can **add XYZ style tile servers as layers** in QGIS (without having to rely on a plugin such as `QuickMapServices`). This allows you to easily view basemaps over the area of interest. They are loaded on demand and at the required resolution, allowing for faster response times and reprojections.

Firstly, right click on _XYZ Tiles_ in the left-hand side _Browser_ window in QGIS and then click on _New Connection_.

{{< img src="qgis-xyz-tiles-new-connection.png" width="500px" caption="Right-click on 'XYZ tiles' and then click on 'New Connection'." >}}

Then add your desired XYZ tile server information:

{{< img src="qgis-xyz-tiles-google-tile-server.png" width="500px" caption="Adding the Google tile map service to QGIS." >}}

To use this tile server, click on the newly added tile server and drag in down into the _Layers_ pane:

{{< img src="qgis-xyz-tiles-dragging-server-into-layers.png" width="500px" caption="Dragging the tile server into the Layers pane to display the basemap imagery." >}}

Some popular tile servers are listed below (non of them require authentication):

<table>
    <thead>
        <tr>
            <th>Provider</th>
            <th style="word-break: break-word;">URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bing Aerial</td>
            <td style="word-break: break-word;">http://ecn.t3.tiles.virtualearth.net/tiles/a{q}.jpeg?g=1</td>
        </tr>
        <tr>
            <td>ArcGIS Tile Server (Esri)</td>
            <td style="word-break: break-word;">https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}</td>
        </tr>
        <tr>
            <td>Google Hybrid</td>
            <td style="word-break: break-word;">https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}</td>
        </tr>
        <tr>
            <td>Google Satellite</td>
            <td style="word-break: break-word;">https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}</td>
        </tr>
        <tr>
            <td>Google Streetview</td>
            <td style="word-break: break-word;">https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}</td>
        </tr>
        <tr>
            <td>OpenStreetMap</td>
            <td style="word-break: break-word;">http://tile.openstreetmap.org/{z}/{x}/{y}.png</td>
        </tr>
    </tbody>
</table>

## Opening Up Multiple QGIS Instances On Mac

You cannot open multiple instances of QGIS with the Mac _Launchpad_. However, you can open up multiple instances of QGIS on Mac via the command-line with:

```sh
$ open -n /Applications/QGIS3.6.app/
```

replacing `3.6` with the version of QGIS that you have installed.

## Python Incompatibilities

For non-Windows platforms, QGIS requires a system installed version of Python to run. This can lead to version conflicts if you use different versions of Pythons for other projects. One way to get around this is to use Python enviroments (as provided by software such as _pipenv_ and _Anaconda_).

## QGIS Keyboard Shortcuts

<table>
  <thead>
    <tr>
      <th>macOS</th>
      <th>Windows</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>⌘-N</code></td>
      <td><code>Ctrl-N</code></td>
      <td>New project.</td>
    </tr>
    <tr>
      <td><code>⌘-Shift-R</code></td>
      <td><code>Ctrl-Shift-R</code></td>
      <td>Add new Raster layer.</td>
    </tr>
  </tbody>
</table>