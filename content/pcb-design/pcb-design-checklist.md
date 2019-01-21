---
author: "gbmhunter"
date: 2012-05-22
draft: false
title: "PCB Design Checklist"
type: "page"
---

## Schematics

### Microcontroller

* uC has supply decoupling (e.g. 100nF caps)
* [Crystal/oscillator](/electronics/components/crystals) is connected to compatible osc ports (e.g. XTAL0)
* Core power/decoupling supplied (if applicable)
* Priority crossbar functions in correct order (applicable to Si micros)
* Programming pins connected correctly and routed to appropriate header/connector

### Other ICs

* Decoupling is added were needed
* Voltage difference problems between IC's that communicate and run of different voltage supplies is considered

### Communications

* [UART/RS-232](/electronics/circuit-design/uart) RX and TX swap between devices
* USB data lines D+ and D- have 39R series resistors
* [I2C](/electronics/communication-protocols/i2c-communication-protocol/) have pull-up resistors (unless they are already internal to a device)

### Schematics Components

* Do not rely on standard Altium libraries (pinouts and footprints can be wrong). Use Beta Solutions libraries and add to it. Make sure variable labelling is consistent.
* P-Ch [MOSFET's](/electronics/components/transistors/mosfets/) have their SOURCE connected to the high-side voltage (e.g. Vcc)
* N-Ch [MOSFET's](/electronics/components/transistors/mosfets/) have their SOURCE connected to the low-side voltage (e.g. ground)
* Make sure voltages are not applied to any pins of IC's that are shut-down by removing power (unless the are designed to handle it). Leakage currents can occur.
* Systematically check BOM with every component on schematics to weed out labelling errors and component variant problems.

### Final

* Make sure schematics compile

## PCB

### General PCB

* Solder mask layer is visible on all component pads
* Remove very thin slivers of solder mask that will not ‘cure properly’. IMP minimum is 6mill (0.1524mm)
* Appropriate test points included. Untented vias can be used as test points when space is a premium. Make sure there are enough ground test points (both analogue and digital if applicable) for connecting multimeter leads and the ground connections of oscilloscope probe leads.
* The way the PCB is mounted is considered and taken account for (e.g. screw holes or sticky pads)
* No reference to client if requested (due to intellectual property protection)
* The layer stack-up is specified (core/prepeg/copper material and thicknesses)
* The impedance is specified (if applicable). This is normally related to the stack-up.
* Component links (between schematics and pcb file) are updated. This is done from the PCB editor.
* Mechanical layers are used correctly. This default is:
    * M01: Board outline and routed cut-outs  
    * M02: PCB Info  
    * M11: Top Dimensions  
    * M12: Bottom Dimensions  
    * M13: Top Component Outline And 3D Body  
    * M14: Bottom Component Outline And 3D Body  
    * M15: Top Courtyard  
    * M16: Bottom Courtyard

### PCB Rules

* No acute angles (typically set minimum angle to 85 degrees)
* No silkscreen over pads (clearance 0.01mm)
* Track and gap (typically 0.2mm)
* Minimum annular ring (typically 0.1-0.3mm)
* Minimum hole size (typically 0.2mm, 0.1mm for lazer drilled)
* Polygon connect style to via by direct connect
* Polygon connect style to all other by thermal relief

### PCB Routing

* As a general rule, make the polygon clearance to anything at least 2x the minimum track clearance. Shorts are more likely to occur between a large polygon and a track rather than between two tracks.
* Flip the board (shortcut V, B) when routing and checking correct pin connections on the bottom layer of the PCB (otherwise pins will appear the wrong way around)
* Make sure similar amounts of total copper are on each layer. A good way to ensure this is to fill each layer with a plane (either ground or a power plane). This is to prevent the PCB from going ‘banana’ during manufacturing.
* Large fiducials are placed as far apart as possible on PCB (typically two, one in each diagonally opposite corner on a square board). Micro fiducials are placed on the diagonals of fine pitch chips (such as BGA’s).
* Circular speckles of solder mask are applied to chips with large exposed pads rather than the entire area, to prevent the chip from floating during reflow soldering. This applies to chips such as QFN and DFN.
* Large exposed pads on the undersides of SMD packages are connected following the instructions on the datasheet. Most are either connected to ground or left floating.
* Tracks and vias are large enough to handle their current requirements.
* Appropriate pull-back on power planes and clearances on polygons and tracks from the edge of the board. 0.5mm is typical
* Vias are tented (except for test points). This is so that silkscreen can go over them.
* Ground vias are peppered all over board
* Ground vias are placed around edge of the board
* Polygons are set to direct connect with vias
* Polygons are set to thermal relief connect (typically four connections) with component pads
* Make sure vias are not cutting into component pads

### Silkscreen

* Connector pins are labelled, either numbered or described (especially if using terminal blocks)
* Test points are labelled

### Final

* Rebuild all polygons
* DRC (design rule check) is carried out
* Lock all PCB objects

## Release Time

### Manufacturer

* Find out wether manufacturer wants paste on Fiducials (not usually)
* Make sure Gerber output contains all the required files (including a file for every copper layer)
* Do not send the keep-out layer to the manufacturer. Some people use it just as a board outline, while others use it to also prevent Altium from drawing on layers in other specific places on the PCB (such as adding clearances to objects). This creates confusion. Use Mechanical 1 to define the board outline and any routed holes.
* Make sure manufacture information is added to the top copper layer (copper layer is good because it is included in Gerbers). This should include:

1. What layer defines the board outline
2. Board thickness
3. Copper weight
4. Who determines soldermask expansion (customer or sometimes manufacturer)
5. Number of layers
6. Minimum track clearance
7. Minimum annular ring
8. Minimum hole size
9. How many individual boards are on a PCB (if it has been panelized)
10. How board are going to be cut (e.g. v-scoring or routing, if panelized)
11. Soldermask colour

* Include additional images with PCB project to instruct manufacturer on how to build/assemble PCB. These include images for counter-sunk holes and components which need gluing

### Release

* Zip up PCB project and place in release folder

### Documentation

* Changes/notes file created (such as readme.txt). This can be incorporated into Altiums project structure.
* Once the PCB has been submitted, PCB project folder is stored and locked or committed so that it can be referred to in the future.
* Make sure version and revision numbers are labelled correctly both in project documents, folders, and zip files.
