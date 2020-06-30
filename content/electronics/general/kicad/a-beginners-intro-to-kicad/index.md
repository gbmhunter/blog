---
author: "gbmhunter"
date: 2020-04-21
description: "A beginners tutorial/introduction to KiCAD."
categories: [ "Electronics", "General" ]
lastmod: 2020-06-15
tags: [ "electronics", "KiCAD", "CAD", "Eeschema", "PcbNew", "kicad_pcb", "component libraries", "DigiKey" ]
title: "A Beginners Intro To KiCAD"
type: "page"
---

{{% warning-is-notes %}}

## Overview

KiCAD is an open-source electronic design CAD software package. It runs on Windows, Linux and MacOS.

{{% img src="kicad-logo.png" width="300px" caption="The KiCAD logo." %}}

KiCAD is a C++ program which uses the wxWidgets library to provide the GUI elements.

KiCAD organizes work into _projects_. Each project has a project file ending in `.pro`. A _Project_ consists of _schematics_ (`.sch`), a _PCB design file_ (`.kicad_pcb`), _component library files_ (`.lib`), and more.

KiCAD is not a single program, but rather a collection of applications that are bundled together. KiCAD consists of:
* `KiCAD`: The self-titled project management tool. This can load `.pro` files and open other parts of the application such as Eeschema and PcbNew.
* `Eeschema`: The schematic editing tool.
* `PcbNew`: The PCB editing tool.
* `GerbView`: The Gerber file viewer.

Any of these programs can be run individually if desired.

## Installation

### Debian-Like Linux (Ubuntu, Debian, ...)

You can install the most recent stable release of KiCAD via the command-line with:

```bash
sudo add-apt-repository --yes ppa:js-reynaud/kicad-5.1
sudo apt update
sudo apt install --install-recommends kicad
```

To start KiCAD from the command line you can use:

```bash
kicad
```

## Configuring The Global Symbol Library Table

{{% img src="kicad-configure-global-symbol-library-table.png" width="500px" caption="The pop-up that occurs when you run KiCAD for the first time." %}}

## Schematics

### Getting Around

By default, the mouse wheel will zoom in/out on the current schematic.

You can navigate the schematic hierarchy using the _Navigate Schematic Hierarchy_ button as shown:

{{% img src="kicad-navigate-schematic-hierarchy-button.png" width="500px" caption="The 'Navigate Schematic Hierarchy' button in KiCAD." %}}

**Keyboard Shortcuts**

```text
Mouse Wheel           Zoom in/out
Mouse Wheel + Ctrl    Pan left/right
Mouse Wheel + Shift   Pan up/down
Ctrl-D                Load datasheet for selected component (opens web browser)
```

The following keybaord shortcuts are to be pressed when the mouse cursor is over a component:

```text
E                     Show symbol properties (Edit item)
M                     Move schematic item
C                     Duplicate symbol or label
G                     Grab the end of a wire and shorten/lengthen it
```


## Libraries

```text
.lib     Schematic symbol library (contains multiple schematic symbols)
.pretty  Folder for component footprints
```

`.lib` files are text based, so play well with version control systems such as `.git`.

By default, the symbol libraries are installed to:

* On Windows: `C:\Program Files\KiCad\share\kicad\library`
* On Linux: `/usr/share/kicad/library/`

Each project can pull schematic symbols and footprints from two "tables" (groups) of libraries, _global libraries_ and _project libraries_.

DigiKey maintains the [digikey-kicad-library](https://github.com/Digi-Key/digikey-kicad-library), a KiCAD schematic and footprint library of a large number of components that can be supplied by DigiKey. The aim of this library is to provide collection of visually consistent, accurate library parts that have been curated by the DigiKey team. The organization of the library follows the DigiKey family taxonomy.


## Board Routing

### Getting Around

**Keyboard Shortcuts**

```text
D          Start drawing a track
PgUp       Switch to top layer
PgDwn      Switch to bottom layer
Ctrl-B     Hide pours
B          Show pours
Ctrl-H     Toggle high contrast mode
```

KiCAD has a push and shove router.

### DRC Rules

As of May 2020, there is no way to add a check for silkscreen over pad in the design rules. The best you can do is select `exclude pads from silkscreen` when exporting the gerbers, which will remove all silkscreen from pads. This is not as ideal though, as this may remove important information from the silkscreen such as designators, version numbers or polarization marks.