---
author: gbmhunter
date: 2013-06-28
draft: false
title: Creating And Editing Your Own PSoC Components
type: page
---

## Overview

PSoC Creator allows you to **create your own (or edit existing) components**, a powerful feature which allows you to capture both hardware (VHDL hardware) and software and package it into a reusable "block" which can be dropped into other projects.

PSoC components can be created from the PSoC Creator IDE. If you are looking for a very comprehensive and detailed tutorial on how to create your own components, I would recommend the [Cypress Component Author Guide](http://www.cypress.com/?docID=27377). **This page serves only to highlight the important bits** and the things you will typically struggle with when creating your own components.

## Component File Structure

<table>
    <thead>
        <tr>    
            <th>File Extension</th>
            <th>File Format</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr >
<td >.cs</td>
<td >text, C# language</td>
<td >Contains C# code for the component settings GUI. Uses Microsoft WinForms. Usually has a seperate file for each tab element in the settings GUI.
</td>
</tr>
<tr >
<td >.resx </td>
<td >text-xml</td>
<td >Unknown?
</td>
</tr>
<tr >
<td >.cystate </td>
<td >text-xml</td>
<td >Contains component state rules for different PSoC chip families.</td>
</tr>
<tr >
<td >.cysym </td>
<td >?</td>
<td >Contains the schematic symbol of the component (the one the user sees when they drop it onto a project schematic). This is also where you specify component parameters and any associated validators (right-click on the schematic and select _Symbol Parameters_).</td>
</tr>
<tr >
<td >.cycdx </td>
<td >text-xml</td>
<td >Contains an xml listing of the individual components used to build up your custom component (which are in the .cysch file).</td>
</tr>
<tr >
<td >.cysch </td>
<td >?</td>
<td >Contains the internals (guts) of the component. This is where you can design the hardware for your custom component in just the same way you would design the hardware for a PSoC component.</td>
</tr>
<tr >
<td >./API/.c </td>
<td >text, C language</td>
<td >Contains source code that will from the API for the component. This is added to the users project when they use this component in their design.
</td>
</tr>
<tr >
<td >./API/.h </td>
<td >text, C language</td>
<td >Header files for the source code.</td>
</tr>
</tbody>
</table>

## Special Flags

`'$INSTANCE_NAME'` - The name of the component in the schematic editor (e.g `UartCpDebug`). This is user editable. All component API is typically prefixed with this name and an underscore (e.g. `UartCpDebug_Start();`, `UartCpDebug_PutChar();`).

## Building The Component

**The build menu for components is hidden by default**, right-click on the PSoC taskbar and click "Build Customizer" to show this. The component can be built by clicking the "Build All Customizers" button.

## Editing Existing Components

Make sure to rename the component in the Workspace Explorer, otherwise the name will clash with the existing component. Once you have done this, make sure to change the namespace name in all of the .cs files to the same name, as well as any other references to the project name that you find (use find/replace for this to make sure you don't miss any!).

**Watch out for validators which check inputs.** These could end up excluding your custom changes which use different input ranges/values.
