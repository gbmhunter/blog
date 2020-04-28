---
author: "gbmhunter"
date: 2020-04-21
description: "A beginners tutorial/introduction to KiCAD."
categories: [ "Electronics", "General" ]
lastmod: 2020-04-21
tags: [ "electronics", "KiCAD", "CAD", "Eeschema", "PcbNew", "kicad_pcb", "component libraries" ]
title: "A Beginners Intro To KiCAD"
type: "page"
---

{{% warning-is-notes %}}

## Overview

KiCAD is an open-source electronic design CAD software package. It runs on Windows, Linux and MacOS.

KiCAD organizes work into _projects_. Each project has a project file ending in `.pro`. A _Project_ consists of _schematics_ (`.sch`), a _PCB design file_ (`.kicad_pcb`), _component library files_ (`.lib`), and more.

The two main sub-applications bundled with KiCAD are `Eeschema`, the schematic editing tool, and `PcbNew`, the PCB editing tool.

## Installation

### Debian-Like Linux (Ubuntu, Debian, ...)

You can install KiCAD via the command-line with:

```bash
sudo add-apt-repository --yes ppa:js-reynaud/kicad-5.1
sudo apt update
sudo apt install --install-recommends kicad
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

M                     Move schematic item
C                     Duplicate symbol or label
```

## Libraries

```text
.lib     Schematic symbol library (contains multiple schematic symbols)
.pretty  Folder for component footprints
```

`.lib` files are text based, so play well with version control systems such as `.git`.

By default, on Windows the symbol libraries are installed to: `C:\Program Files\KiCad\share\kicad\library`

Each project can pull schematic symbols and footprints from two "tables" (groups) of libraries, _global libraries_ and _project libraries_.


## Board Routing

### Getting Around

**Keyboard Shortcuts**

```text
D          Start drawing a track
PgUp       Switch to top layer
PgDwn      Switch to bottom layer
Ctrl-B     Hide pours
B          Show pours
```

KiCAD has a push and shove router.