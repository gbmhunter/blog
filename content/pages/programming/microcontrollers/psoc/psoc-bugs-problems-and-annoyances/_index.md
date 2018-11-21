---
author: gbmhunter
date: 2011-09-08 06:12:10+00:00
draft: false
title: PSoC Bugs, Problems And Annoyances
type: page
url: /programming/microcontrollers/psoc/psoc-bugs-problems-and-annoyances
---

# Overview

The PSoC development environment tends to be mostly bug free. However, there are a few bugs I've noticed...  * The MiniProg pragrammer can have trouble working when other USB devices are plugged in that emulate a COM port.  * Find and replace can freeze when a search is started in a large number of files, even after the search is supposedly 'cancelled'.

[singlepic id=805 w=600 h=600 float=center template=caption]

The PSoC 3 and 5 range of microcontrollers are relatively new (as of writing this, September 2011), and therefore have a few issues here and there that need to be smoothed out. Let it be mentioned here that all-in-all they are already a very capable and powerful microcontroller, with this being more like little annoyances than huge problems. This page does not detail all issues, rather just some of the more major ones.

<table style="width: 600px;" border="0" class="aligncenter" ><tbody ><tr >
<td >**Problem**
</td>
<td >**Affected Revisions**
</td>
<td >**Status**
</td></tr><tr >
<td >Wake-up sources not selectable when putting micro to sleep
</td>
<td >PSoC ES2 or earlier
</td>
<td >Fixed
</td></tr><tr >
<td >USBUART v1.0 is not compatible with power reduction modes (such as standby or sleep). Communication is impossible without re-enumerating USB device after PSoP device has returned from a sleep state
</td>
<td >USBUART v1.0 with PSoC 5
</td>
<td >Problem as of 09-11
</td></tr><tr >
<td >The internal die temperature sensor does not work
</td>
<td >PSoC 5 ES1
</td>
<td >Problem as of 09-11
</td></tr><tr >
<td >PSoC Creator does not report all build errors in the condensed 'Notice List', meaning the build can fail without any apparent cause. However, if you check the Build Output tab (next to the Notice List tab), you can find the cause.
</td>
<td >PSoC Creator
</td>
<td >Problem as of 09-11
</td></tr></tbody></table>

# PSoC Creator Crashing

## Debug Crash

Sometimes PSoC Creator crashes when running the debugger. If I investigate the exception using Visual Studio, the exception I see is caused by "Invalid characters in path". [singlepic id=1108 w=450 h=450 float=center template=caption] [singlepic id=1109 w=450 h=450 float=center template=caption]

## Programming Crash

I've also had PSoC Creator crash while attempting to program a PSoC, if the PSoC chip has been programmed before, but now unavailable because it is unpowered/disconnected from MiniProg header. PSoC Creator crashes while the "Selecting Target" message is displayed at the bottom of the screen.

I have found that you can recover from this error by closing the "Select Debug Target" application from Task Manager, without killing PSoC Creator (and without losing any unsaved work).

[singlepic id=1156 w=600 h=600 float=center template=caption]

# Flash And SRAM Sizes Incorrect

The Flash and SRAM sizes calculated when you build a project don't take into account the Stack size defined in the Design-wide resources file.

[singlepic id=866 w=600 h=600 float=center template=caption]

Even when Creator reports this

[singlepic id=864 w=600 h=300 float=center template=caption]

After adding another single-byte variable to the project, you might receive this error.

[singlepic id=863 w=400 h=240 float=center template=caption]

# Invalid Input Module

This applies to PSoC 3 and the Keil tool chain.

.

[singlepic id=1011 w=400 h=150 float=center template=caption]

This is caused it you select "True" for the "Browse Information" setting under Build Options->Compiler->General.

[singlepic id=1010 w=450 h=450 float=center template=caption]

# Math Functions Won't Work In PSoC 5

If you keep getting "undefined reference errors" at build time when trying to use PSoC 5 math functions, don't fret. This is a well known problem, and the fix is discussed in [this documentation on the PSoC website](http://www.cypress.com/?rID=42838). Basically, you have to type 'm' into the Additional Libraries field in the linker settings.

# Find/Replace Stepwise Search Resets On Edit

When using Find/Replace in PSoC Creator, you will notice that the search resets itself if you edit any text while doing a stepwise search. This becomes really annoying, because every time it resets, you end up iteration through all the previously found strings before searching for any new ones.

[singlepic id=1153 w=450 h=400 float=center template=caption]

# PSoC Creator Doesn't Delete Old Files When Renaming Project

PSoC Creator automatically creates a number of project files that incorporate the project name in their file name. When renaming a project, the old files are not deleted, leaving old, redundant files in the working code directory.

The workaround is to delete these manually. This is not hard, as you can group them altogether based on file name. You can safely delete this without corrupting your PSoC Creator project.

# You Can Use The Two USB Pins As GPIO, But...

But they have to set-up with either the "strong drive" or "open-drain drive low" drive mode first (even if they are inputs)! See the [Pins section on the PSoC->Components page](http://blog.mbedded.ninja/programming/microcontrollers/psoc/components#pins) for more info.
