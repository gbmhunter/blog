---
author: "gbmhunter"
date: 2020-04-21
description: "A beginners tutorial/introduction to KiCad."
categories: [ "Electronics", "General" ]
lastmod: 2020-12-24
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

The KiCad schematic editor (EESchema) supports **mixed-signal SPICE simulation using the [ngspice](http://ngspice.sourceforge.net/) SPICE engine**. Unfortunately, the simulation feature of KiCad is not very well documented. Your best bet is to start with one of the working examples provided by KiCad, and learn from there (see below).

KiCad comes with example simulation circuits located at `<KiCad installation dir>/share/kicad/demos/simulation/`. In this directory there is the following simulation schematic example directories:

* **laser_driver**: Good example if you want to know how to include op-amps and transistors into your simulation. Notice that the pinout for the op-amp used in this schematic is very different to that of the op-amps in KiCAD's two built-in simulation component libraries.

    {{% img src="kicad-laser-driver-simulation-schematic-screenshot.png" width="600px" caption="A screenshot of the Laser Driver simulation example that comes shipped with KiCad. Layout of circuit slightly adjusted to improve screenshot." %}}

* rectifier
* pspice
* **sallen_key**

{{% img src="kicad-sallen-key-simulation-schematic-screenshot.png" width="600px" caption="A screenshot of the Sallen Key simulation example that comes shipped with KiCad. Layout of circuit slightly adjusted to improve screenshot."%}}

{{% img src="kicad-sallen-key-simulation-plots.png" width="700px" caption="The simulation plots for the op-amp output of the KiCad Sallen Key simulation example." %}}

### Simulation Specific Symbol Parameters

There are a few schematic symbol parameters which have dedicated purposes for SPICE simulations. I've tried to list as many as I've encountered below:

* `Fieldname`: Typically `Value`, pointing to the `Value` symbol property. Think of this as a symbol property pointer?
* `Spice_Primitive`: This determines the _element type_ (ngspice nomenclature) `R` for resistors, `C` for capacitors, `D` for diodes, `X` for subcircuits (anything that is built out of many primitives, i.e. ICs), e.t.c. See the below table for a list of all the supported primitives.
* `Spice_Model`: Only needed when `Spice_Primitive = X`.
* `Spice_Lib_File`: Filename (not full path) of SPICE library component that belongs to this symbol, e.g. `ad8051.lib`. This `.lib` file must be located in the same directory as the `.sch` file containing the component. Clicking `Edit Spice Model` should bring up a dialogue box with the text from the `.lib` file.
* `Spice_Netlist_Enabled`: A boolean. either `Y` or `N`.
* `Spice_Node_Sequence`: This is used to map KiCAD pin numbering with the pin numbering that ngspice expects. The value for this parameter is a space separated list of integers which map the KiCad pins to the ngspice pins. For example, almost all diodes in KiCad number the cathode as pin 1, and the anode as pin 2. ngspice expects things the other way around, with the anode as pin 1, cathode as pin 2. So simulation diodes should have a `Spice_Node_Sequence=2 1`.
* `SpiceMapping`: 

The following table lists all the supported KiCad SPICE primitive types (what ngspice calls the _element type_) as of `KiCad v5.1.6`:

First letter  | Element description
--------------|--------------------------------------------------
A             | XSPICE code model
B             | Behavioral (arbitrary) source
C             | Capacitor
D             | Diode
E             | Voltage-controlled voltage source (VCVS)
F             | Current-controlled current source (CCCs)
G             | Voltage-controlled current source (VCCS)
H             | Current-controlled voltage source (CCVS)
I             | Current source
J             | Junction field effect transistor (JFET)
K             | Coupled (Mutual) Inductors
L             | Inductor
M             | Metal oxide field effect transistor (MOSFET)
N             | Numerical device for GSS
O             | Lossy transmission line
P             | Coupled multiconductor line (CPL)
Q             | Bipolar junction transistor (BJT)
R             | Resistor
S             | Switch (voltage-controlled)
T             | Lossless transmission line
U             | Uniformly distributed RC line
V             | Voltage source
W             | Switch (current-controlled)
X             | Subcircuit
Y             | Single lossy transmission line (TXL)
Z             | Metal semiconductor field effect transistor (MESFET)

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

### MOSFETs

For discrete MOSFETs, the recommended approach is to use the `VDMOS` intrinsic model. This uses a standard 3-pin MOSFET symbol in the following order:

* Pin 1: Drain
* Pin 2: Gate
* Pin 3: Source

Make sure the symbol reference starts with an `M`, e.g. `M1`. Make sure the `Value` parameter contains the model name(e.g. `2N7002`), and then add a line of text to the schematic containing the model parameters, e.g.:

```text
.model 2N7002 VDMOS(Rg=3 Vto=1.6 Rd=0 Rs=.75 Rb=.14 Kp=.17 mtriode=1.25 Cgdmax=80p Cgdmin=12p Cgs=50p Cjo=50p Is=.04p ksubthres=.1)
```

{{% img src="crucial-discrete-mosfet-simulation-setup-in-kicad.png" width="800px" caption="Screenshot showing the crucial setup required to simulate discrete MOSFETs in KiCAD with ngspice." %}}

See the section [11.3 Power MOSFET model (VDMOS) in the ngspice User Manual](http://ngspice.sourceforge.net/docs/ngspice-33-manual.pdf) for more information.

For MOSFETs built into integrated circuits, use the `BSIM3` model. For the `BSIM3` model, ngspice expects four pins rather than the usual three, gate, drain, source and bulk (substrate). In standard 3-pin MOSFETs the bulk is typically connected internally to the source, so for most simulations you can just do that externally to mimic a standard MOSFET.

See <https://forum.kicad.info/t/generic-mosfets-solved/11155/3>.

Looking for `VDMOS` intrinsic models? LTspice ships with over a 1000 of them. Once you install LTspice, you can find all the models within a single text file at `LTspice<version>/lib/cmp/standard.mos`. For example, on Windows with `LTspice XVII` the full path would be:

```text
C:\Program Files\LTC\LTspiceXVII\lib\cmp\standard.mos
```

### Custom Model Files

ngspice model files typically have the `.lib` extension --- the same extension as used by KiCad symbol libraries. Thus it's easy to get these two confused, and makes it harder to search for system installed ngspice model files in the KiCad installation directory. 

### Placing Components

Somewhat confusingly, KiCad comes with two SPICE symbol libraries:

1. `pspice`: "Legacy pspice symbol library." --- Presumably symbols which were used when KiCad used PSPICE.
1. `Simulation_SPICE`: "Symbols specialized for SPICE circuit simulation (including ngspice)." --- Presumably newer symbols designed to work with the current bundled SPICE simulator `ngspice`.

{{% img src="kicad-pspice-legacy-symbol-libraries.png" width="700px" caption="Searching for the PSPICE symbol libraries in KiCad." %}}

### Naming Nets

Standard Eeschema _net labels_ can be used to name nets which will be carried through to the ngspice simulation.

### Modes Of Analysis

There are three main modes of analysis:

* DC analysis: The time varying behaviour of reactive elements is ignored.
  * Basic DC analysis: Analysis of the circuit with each voltage/current source at a single DC level.
  * Swept DC analysis: Basic DC analysis but repeated at a number of different DC input levels for the voltage/current sources.
* AC analysis: The simulator outputs magnitude and phase information as a function of frequency.
* Transient analysis: The entire circuit, including DC and reactive elements is simulated. The output is the voltage and currents at each node as a function of time.

Although KiCad allows you to configure modes of analysis through the simulation GUI window, this information is not saved with the schematic and gets lost every time you restart. I recommend you add a text string on the schematic instead.

**Transient**

Syntax: `.tran <step period> <simulation period>`

e.g.

```text
.tran 1u 10m
```

### Printing Out The Version Of ngspice

You can print out the version of ngspice by adding the following text to the schematic:

```text
.control
version
.endc
```

ngspice will then print out the following information when the simulation is run:

{{% img src="adding-control-text-to-print-ngspice-version-in-kicad.png" width="500px" caption="Adding the shown text anywhere on the KiCAD schematic will trigger ngspice to print out version/build information when you run the simulation." %}}

### Common Simulation Errors

#### unknown subckt

I have got the following error when the wrong `Spice_Primitive` was set (the component was a diode, `Spice_Primitive` was set to `X` for sub-circuit, was meant to be set to `D`).

```
Error: unknown subckt: xd1 <net name> 0 1n5817
Error: there aren't any circuits loaded.
```

#### There are duplicate components. You need to annotate schematics first.

{{% img src="kicad-simulation-there-are-duplicate-components-error.png" width="300px" caption="Screenshot of the 'There are duplicate components' simulation error in KiCad." %}}

This error usually arises if you have not assigned unique designators to all components. Perhaps there are still `R?`, `C?` e.t.c designators on the schematic? Or multiple instances of properly labelled components, such as two `R1`'s. The best way to fix this is just to reset and re-annotate the schematics.

#### You need to select the simulation settings first

This error pops up if ngspice cannot find a mode of analysis directive. Rather than choosing the simulation settings, I recommend you enter the directive in as text on the schematic instead.

See the _Modes of Analysis_ section for more info.

#### doAnalyses: iteration limit reached

```text
doAnalyses: iteration limit reached
run simulation(s) aborted
```
