---
author: gbmhunter
categories: [ "PCB Design" ]
date: 2011-09-05
draft: false
tags: [ "Altium", "keyboard", "shortcut" ]
title: Altium Keyboard Shortcuts
type: page
---

## Route With The Pro's!

This is a selection of some of the most useful shortcuts in Altium. It is in no-way a complete guide but just lists the ones you'd normally care to remember. If you've never used Altium before, you'll soon see why they are needed when you see the menus for the first time :-).

You may notice that although some keyboard shortcuts that perform the same function are the same key combo when switching between the schematic and PCB editor, other keyboard shortcuts in each are radically different! This is likely due to the fact Altium acquired the PCB editor from another company after they had already started writing the schematic editor, and decided to keep some of the proprietary PCB keyboard shortcuts.

## Schematic Designer

## General

**Ctrl-M**: Measure (works in PCB designer also)  

**Alt-(X, S)**:Choose a script to run (works in any Altium window).  

**C, C**: Compile the active project.  

**D, U**: Update the PCB with any schematic changes. **Careful!** In the PCB editor, this is achieved with the shortcut D, I, while using D, U in the PCB editor will cause changes on the PCB to be pushed back to the schematic, not something you usually want to do!  

**D, O**: Open the "Document Options" window. This is where you can edit the snap grid, change from imperial to metric units (I never thought I'd say this, but I recommend staying with imperial units in the schematic editor), change the sheet template, and add schematic parameters.  

**G**: Cycle through the predefined grids.  

**Q**: Toggle the measurement unit system between metric and imperial.  

**T, C**: Cross-probe a net, pin or component between the SCH and the PCB (or between the PCB and the SCH).

## Schematic Routing

**P, W**: Start placing wires (similar to P, T in the PCB designer).

## Component Placement

**J, C**: Jump to component (works in PCB designer also)  

**J, N**: Jump to net  

**D, P**: Synchronises schematic symbols with ports (to update the sheet with the new ports you've added on the schematic). Can only be used when a schematic sheet is selected (the top-level design).  

**T, A, A**: Open the "Annotate" window. You can use **T, A, U** instead to perform a "quick annotate".

## PCB Designer

## General

**D, I**: Import changes from schematic to PCB. Careful! In the schematic, this is achieved with the shortcut **D, U**, while using this in the PCB editor will cause changes on the PCB to be **pushed back** to the schematic, not something you usually want to do!  

**T, D, R**: Run DRC (design rule checks). I normally deselect "_Create Report File_" so that it just displays the rule violations in the bottom window.  

**Alt-(X, S)**: Choose a script to run (works in any Altium window).  

**C, K**: Open the _Edit Component Links_ window.  

**Q**: Toggle the measurement unit system between metric and imperial.  

**T, C**: Cross-probe a net, pin or component between the SCH and the PCB (or between the PCB and the SCH).

## **Routing**

**P, T**: Begin routing a track.   

**Tab (while routing)**: Brings up routing options/properties windows (very helpful).  

**Shift-Space**: Change the track routing style (e.g. from straight to 45 to curved and back again).  

**Shift-W**: Set the track width to something from the predefined track width list.  

**T, G, A, A**: Repour all polygons.




## **Component Placement**




**E, M, M**: Move component (useful for when you can't select it because it's ontop of other components).  

**E, M, I**: Flip a component.  

**Spacebar**: Rotate object by 90°.  

**J, C**: Jump to component (works in schematic designer also).  

**A, C**: Align horizontal centers.  

**A, V**: Align vertical centers.

## **Visualisation**

**Shift-S**: Hide all but selected layer (this one should definitely be committed to memory, I use it every 10s or so...).  

**V, B**: Flip board.  

**MouseScroll**: Move up/down.  

**Shift-MouseScroll**: Move left/right.  

**Ctrl-MouseScroll**: Zoom in/out.  

**Ctrl-M**: Measure (works in schematic designer also).  

**+,-**: Increment/Decrement through the enabled layers.  

*****: Increment/Decrement through routing layers only.  

**S, S**: Enables you to select a section of connected copper. Stops the selection at a via, pad or intersection.  

**Ctrl-H**: Selects all connected copper and objects to a net. Similar to S, S.  

**D, T, `<letter>`**: Select a view configuration. These views and their key shortcuts are user configurable. I usually configure Altium so that D, T, U selects the "up" configuration (all top layers), while D, T, D selects the "down" configuration (all bottom layers).  

**D, O**: Open Board Options window. This is the quickest way to change the active snap options. To change the grid size for snapping, use the shortcut Ctrl-G.  

**Ctrl-G**: Open the Grid Editor window. This is where you can set the grid snap distances.  

**L**: Show the _Layers_ dialogue box to adjust the visible layers and/or enable/disable layers.  

**G**: Cycle through the predefined grids.

## Scripting

**Ctrl-Space**: Provides a list of available commands, very helpful!
