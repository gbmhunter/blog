---
author: "gbmhunter"
date: 2020-04-21
description: "A beginners tutorial/introduction to KiCad."
categories: [ "Electronics", "General" ]
lastmod: 2020-12-12
tags: [ "electronics", "KiCad", "CAD", "Eeschema", "PcbNew", "kicad_pcb", "component libraries", "DigiKey", "renaming", "project", "GerbView", "installation", "3D models", "wrl", "step", "schematic templates", "SPICE", "simulation", "ngspice", "Sallen Key", "schematics" ]
title: "A Beginners Intro To KiCad"
type: "page"
---

{{% warning-is-notes %}}

## Overview

KiCad is an open-source electronic design CAD software package. It runs on Windows, Linux and MacOS.

{{% img src="kicad-logo.png" width="300px" caption="The KiCad logo." %}}

KiCad is a C++ program which uses the wxWidgets library to provide the GUI elements.

KiCad organizes work into _projects_. Each project has a project file ending in `.pro`. A _Project_ consists of _schematics_ (`.sch`), a _PCB design file_ (`.kicad_pcb`), _component library files_ (`.lib`), and more.

KiCad is not a single program, but rather a collection of applications that are bundled together. KiCad consists of:
* `KiCad`: The self-titled project management tool. This can load `.pro` files and open other parts of the application such as Eeschema and PcbNew.
* `Eeschema`: The schematic editing tool.
* `PcbNew`: The PCB editing tool.
* `GerbView`: The Gerber file viewer.

Any of these programs can be run individually if desired.

## Installation

### Debian-Like Linux (Ubuntu, Debian, ...)

You can install the most recent stable release of KiCad via the command-line with:

```bash
sudo add-apt-repository --yes ppa:js-reynaud/kicad-5.1
sudo apt update
sudo apt install --install-recommends kicad
```

KiCad will typically install to `/usr/share/kicad/`.

To start KiCad from the command line you can use:

```bash
kicad
```

### Windows

Download and install the self-extracting installer from <https://kicad-pcb.org/download/windows/>.

## Configuring The Global Symbol Library Table

{{% img src="kicad-configure-global-symbol-library-table.png" width="500px" caption="The pop-up that occurs when you run KiCad for the first time." %}}

## Schematics

### Getting Around

By default, the mouse wheel will zoom in/out on the current schematic.

You can navigate the schematic hierarchy using the _Navigate Schematic Hierarchy_ button as shown:

{{% img src="kicad-navigate-schematic-hierarchy-button.png" width="500px" caption="The 'Navigate Schematic Hierarchy' button in KiCad." %}}

**Keyboard Shortcuts**

```text
Mouse Wheel           Zoom in/out
Mouse Wheel + Ctrl    Pan left/right
Mouse Wheel + Shift   Pan up/down
Ctrl-D                Load datasheet for selected component (opens web browser)
```

The following keyboard shortcuts are to be pressed when the mouse cursor is over a component:

```text
E                     Show symbol properties (Edit item).
Ctrl-E                Edit symbol (this loads up the symbol in the symbol editor).
M                     Move schematic item.
C                     Duplicate symbol or label.
G                     Grab the end of a wire and shorten/lengthen it.
A                     Place symbol (Add component).
P                     Place power net.
R                     Rotate item.
Del                   Delete item.
```

```text
Shift-Enter           Close a dialogue box (e.g. the edit symbol properties box)
```

### Importing Schematic Sheets

If you have an existing `.Sch` file you wish to add to your project, navigate to the parent schematic sheet you want to add the sheet to, and click _Place->Hierarchical Sheet_. Replace the contents in the _file name_ box with the existing file, give it a logical _sheet name_ and click o.k. KiCad will then prompt you saying "Filename already exists. Link sheet name to this file?". Click yes and you're done! 

### Schematic Page Templates

Click File->Page Settings to open the `Page Settings` window. You can select a template file for the `Page layout description file` field. The file must end in `.kicad_wks`.

### Power Symbols

Unfortunately, power and ground symbols in KiCad are just standard library schematic symbols with the voltage baked into the part itself. This means you have to create a new library component if you want to have a rail with a voltage which isn't in the default set of rail voltage symbols they provide with the installation! Ideally the voltage should just be considered part of the net name that is defined at schematic time, so you don't have to keep creating library parts for custom voltage rails in your design! 

**The PWR_FLAG Symbol**

The `PWR_FLAG` symbol is a special symbol in KiCad with one output power pin. This is typically attached to a power net which has no other output power pin attached (e.g. a connector pin which provides power to board, yet the pin is defined as electrically passive) so that the ERC knows that this net is provided power.

## Libraries

```text
.lib     Schematic symbol library (contains multiple schematic symbols)
.pretty  Folder for component footprints
```

Both the schematic `.lib` files and the component symbol files are text based, so they play well with version control systems such as `.git`.

By default, the symbol libraries are installed to:

* On Windows: `C:\Program Files\KiCad\share\kicad\library`
* On Linux: `/usr/share/kicad/library/`

Each project can pull schematic symbols and footprints from two "tables" (groups) of libraries, _global libraries_ and _project libraries_.

DigiKey maintains the [digikey-kicad-library](https://github.com/Digi-Key/digikey-kicad-library), a KiCad schematic and footprint library of a large number of components that can be supplied by DigiKey. The aim of this library is to provide collection of visually consistent, accurate library parts that have been curated by the DigiKey team. The organization of the library follows the DigiKey family taxonomy.

### Symbol Creation

The default grid step size is the symbol editor is 50mil (0.050" or 1.27mm). I recommend you leave the symbol grid size to it's default when placing pins into symbols, as this will make the symbols consistent when placing onto schematics and prevent pins mis-aligning with the grid.

The KiCad symbol editor has a spreadsheet-style bulk pin editor window that lets you change the properties of multiple pins at once:

{{% img src="bulk-editing-pins-in-kicad-symbol-editor.png" width="500px" caption="Bulk editing pins in KiCad's symbol editor." %}}

### 3D Models

3D models are stored at `<kicad install dir>/modules/packages3d`.

e.g. on Linux:

```
/usr/share/kicad/modules/packages3d
```

This directory is saved to the KiCad environment variable `KISYS3DMOD`. Inside this folder are folders named after part libraries with the suffix `.3dshapes`, e.g. `Capacitor_SMD.3dshapes`. Inside these folders are the 3D model `.wrl` files.

Unfortunately KiCad does not support relative file paths when linking 3D models to the footprints (relative to the footprint library). So you have two options:
* Use an absolute URL (which will work fine for one user but may break if more than one user will be using the library)
* Create a KiCad environment variable which points to the location of your 3D models (recommended approach)

## Board Routing

### Getting Around

**Keyboard Shortcuts**

```text
D          Start drawing a track
PgUp       Switch to top layer
PgDwn      Switch to bottom layer
F5         Switch to inner copper layer 1
F6         Switch to inner copper layer 2
+          Next copper layer
-          Previous copper layer
Ctrl-B     Hide pours
B          Show pours
Ctrl-H     Toggle high contrast mode
Alt-3      Load the 3D viewer
Space      Reset the relative coordinate origin to 0,0 at the mouse cursor
```

For PCBs with up to 4 layers, you can use the `PgUp, PgDwn, F5, F6` shortcuts to switch between copper layers. However once you exceed 4 layers you will have to use the `+` and `-`. It might suit you to just use `+` and `-` for any sized board, as there is less muscle memory needed!

KiCad has a push and shove router.

### DRC Rules

As of May 2020, there is no way to add a check for silkscreen over pad in the design rules. The best you can do is select `exclude pads from silkscreen` when exporting the gerbers, which will remove all silkscreen from pads. This is not as ideal though, as this may remove important information from the silkscreen such as designators, version numbers or polarization marks.

### PCB Layers

* Dwgs.User: Dimensions are placed on this layer by default

## Generating Manufacturing Outputs

- Gerbers
- Drill files
- 3D model

## File Types

```text
.dcm            # Schematic symbol library file. Stores the description, datasheet and keyword fields.
.lib            # Schematic symbol library file. Stores everything about a symbol except the description, datasheet and keyword fields.
-cache.lib
-rescue.lib     # Rescued library file
.pro            # KiCad project file
.sch            # Schematic sheet file
.sch-bak        # Backup of a schematic file.
sym-lib-table
fp-info-cache   # A cache file with info about footprints. This file is rebuilt often by KiCad.
.kicad_wks      # A schematic page template file. These can be used in the File->Page Settings window within EEschema.
```

KiCad expects the PCB filename to have the same basename (i.e. excluding the `.pcb`) as the project file (`.pro`). This has to be true if you want to open the PCB from the KiCad application by pressing the `PCB Layout Editor` button.

### Output File Types

```text
.gbr            # Gerber plot file
.drl            # Drill file. KiCad fill name the files xxx-PTH.drl and xxx-NPTH.drl
-drl.report     # A drill report file, in a human-readable format
-PTH-drl_map.ps # Drill file in PostScript format
-NPTH-drl_map.ps # Drill file in PostScript format
```

## Plugins And Python Scripting

On Linux, KiCad uses the system-installed Python (whatever the command `python` points to). On all other platforms, KiCad ships with it's own version of Python.

On non-Linux platforms, you can find the Python executable at:

```text
<KiCad installation dir>/bin/python.exe

e.g. on Windows:
C:\Program Files\KiCad\bin\python.exe
```

Plugins are installed to:

```text
<KiCad installation dir>\share\kicad\scripting\plugins
```

The Windows version of KiCad ships with Python v2.7. If you want to use Python v3.x instead, you can rename `python.exe` located at `C:\Program Files\KiCad\bin\python.exe` to something like `python.exe.old`. This will cause the system Python to be invoked instead of the version shipped with KiCad. The big limitation with this technique is that none of the scripts will be able to `import pcbnew`, so it only really suitable for running scripts which do not depend on the Python KiCad API.

The KiCad C++ source code documentation can be found at <https://docs.kicad-pcb.org/doxygen/index.html> (generated by Doxygen).

## Renaming A KiCad Project

In earlier versions of KiCad, it was unnecessarily difficult to rename a KiCad project. However, when attempted in KiCad `v5.1.6` it is now possible! To do so, you will want to rename the following files all at the same time (updating the `<ProjectName>` bit), and from outside KiCad (make sure KiCad is closed when you do this):

* `<ProjectName>.pro`
* `<ProjectName>.sch`: This is the "root level" schematic sheet. You don't to rename other schematic sheets, just the one at the top-level in the hierarchy.
* `<ProjectName>.sch-bak`
* `<ProjectName>.kicad_pcb`
* `<ProjectName>.kicad_pcb-bak`

Once you have renamed all those files, you should be able to open this project in KiCad, your schematic/PCB links should work, and it will not complain about the changes!

## Common Errors

### Access Violation - Unable to create STEP file

This error can occur when generating a STEP file from within pcbnew. The error will look something like this:

```text
Warning: Exception code=0xc0000005 flags=0x0 at 0x0000000066E952DA. Access violation - attempting to write data at address 0x0000000000000020
Error: Unable to create STEP file. Check that the board has a valid outline and models.
```

This can occur if you have "dangling" (to borrow C pointer terminology) links to 3D models which don't exist. These should hopefully be printed as warnings before this error message, e.g.:

```text
Warning: 10:58:21: C:/Jenkins/workspace/windows-kicad-msys2-stable/src/kicad/utils/kicad2step/pcb/oce_utils.cpp: AddComponent: 588
Warning: * no model defined for component 'F201'
```

Removing/fixing up these dangling 3D model links may remove the access violation error and allow you to create the STEP file. However I have encountered times when this fix alone does not remove the error, and are yet unsure of what to do next!

## Simulation

The KiCad schematic editor (EESchema) supports **SPICE simulation using the [ngspice](http://ngspice.sourceforge.net/) SPICE engine**. Unfortunately, the simulation feature of KiCad is not very well documented. Your best bet is to start with one of the working examples provided by KiCad, and learn from there (see below).

KiCad comes with example simulation circuits located at `<KiCad installation dir>/share/kicad/demos/simulation/`. In this directory there is the following simulation schematic example directories:

* laser_driver
* rectifier
* pspice
* sallen_key

{{% img src="kicad-sallen-key-simulation-schematic-screenshot.png" width="600px" caption="A screenshot of the Sallen Key simulation example that comes shipped with KiCad. Layout of circuit slightly adjusted to improve screenshot."%}}

{{% img src="kicad-sallen-key-simulation-plots.png" width="700px" caption="The simulation plots for the op-amp output of the KiCad Sallen Key simulation example." %}}

### Simulation Specific Symbol Parameters

There are a few schematic symbol parameters which have dedicated purposes for SPICE simulations. I've tried to list as many as I've encountered below:

* `Fieldname`: Typically `Value`.
* `Spice_Primitive`: `R` for resistors, `C` for capacitors, `D` for diodes, `X` for ICs, e.t.c.
* `Spice_Model`: Only needed when `Spice_Primitive = X`.
* `Spice_Lib_File`: Filename (not full path) of SPICE library component that belongs to this symbol, e.g. `ad8051.lib`.
* `Spice_Netlist_Enabled`: A boolean. either `Y` or `N`.
* `Spice_Node_Sequence`: Seen on voltage sources (`VSOURCE`).
* `SpiceMapping`: 

### Voltage And Current Sources

Refer to the [ngspice User Manual](http://ngspice.sourceforge.net/docs/ngspice-33-manual.pdf) for a complete list of voltage and current sources. Voltage sources have their `Spice_Primitive` set to `V` and current sources to `I`.

These are called _independent_ sources.

**DC**

For a simple DC voltage source, you can use the syntax:

`DC VOLT`

e.g. `DC 5` for a +5V voltage source.

**SINE**

`SINE(0 1.5 1k 0 0 0 0)`

**PULSE**

The `PULSE` voltage/current source can be used to create a single square pulse or continuous PWM signal. The syntax is:

`PULSE(VL VH TD TR TF PW PER PHASE)`

Name |Parameter       |Default Value   |Units 
-----|----------------|----------------|-----------
V1   |Initial value   |-               |V, A
V2   |Pulsed value    |-               |V, A
TD   |Delay time      |0.0             |sec
TR   |Rise time       |TSTEP           |sec
TF   |Fall time       |TSTEP           |sec
PW   |Pulse width     |TSTOP           |sec
PER  |Period          |TSTOP           |sec
PHASE|Phase           |0.0             |degrees

For example, for a continuous pulse train alternating between 0 and 5V at 100kHz with a 50% duty cycle, with `10ns` rise and fall times:

```text
PULSE(0 5 0 10n 10n 5u 10u)
```

### Placing Components

Somewhat confusingly, KiCad comes with two SPICE symbol libraries:

1. `pspice`: "Legacy pspice symbol library." --- Presumably symbols which were used when KiCad used PSPICE.
1. `Simulation_SPICE`: "Symbols specialized for SPICE circuit simulation (including ngspice)." --- Presumably newer symbols designed to work with the current bundled SPICE simulator `ngspice`.

{{% img src="kicad-pspice-legacy-symbol-libraries.png" width="700px" caption="Searching for the PSPICE symbol libraries in KiCad." %}}

### Naming Nets

Standard Eeschema _net labels_ can be used to name nets which will be carried through to the ngspice simulation.

### Specifying Simulation Type

The easiest way is to add a text string on the schematic.

**Transient**

`.tran 1u 10m`