---
author: gbmhunter
date: 2011-09-08
draft: false
title: PSoC Bugs, Problems And Annoyances
type: page
---

## Overview

The PSoC development environment tends to be mostly bug free. However, there are a few bugs I've noticed...  * The MiniProg pragrammer can have trouble working when other USB devices are plugged in that emulate a COM port.  * Find and replace can freeze when a search is started in a large number of files, even after the search is supposedly 'cancelled'.

{{< figure src="/images/programming-psoc/psoc-creator-bug-find-replace-freezing-with-large-num-files.png" caption="PsoC Creator freezing when using find-replace on a large number of files."  width="600px" >}}

The PSoC 3 and 5 range of microcontrollers are relatively new (as of writing this, September 2011), and therefore have a few issues here and there that need to be smoothed out. Let it be mentioned here that all-in-all they are already a very capable and powerful microcontroller, with this being more like little annoyances than huge problems. This page does not detail all issues, rather just some of the more major ones.

<table>
    <thead>
        <tr>
            <th>Problem</th>
            <th>Affected Revisions</th>
            <th>Status</th>
        </tr>
    </thead>
<tbody ><tr >
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

## PSoC Creator Crashing

## Debug Crash

Sometimes PSoC Creator crashes when running the debugger. If I investigate the exception using Visual Studio, the exception I see is caused by "Invalid characters in path". {{< figure src="/images/programming-psoc/psoc-creator-exe-has-stopped-working.png" caption="The less than helpful error message when PSoC crashes. The actual cause can be investigated further if you have Visual Studio installed."  width="450px" >}} {{< figure src="/images/programming-psoc/psoc-creator-debug-crash-illegal-characters-in-path.png" caption="Exception thrown when trying to enter debug mode in PSoC Creator. This information was discovered with Visual Studio."  width="450px" >}}

## Programming Crash

I've also had PSoC Creator crash while attempting to program a PSoC, if the PSoC chip has been programmed before, but now unavailable because it is unpowered/disconnected from MiniProg header. PSoC Creator crashes while the "Selecting Target" message is displayed at the bottom of the screen.

I have found that you can recover from this error by closing the "Select Debug Target" application from Task Manager, without killing PSoC Creator (and without losing any unsaved work).

{{< figure src="/images/programming-psoc/psoc-debug-target-in-task-manager.png" caption="Closing the 'Select Debug Target' application from Windows task manager can unfreeze PSoC Creator when it crashes during a programming attempt."  width="600px" >}}

## Flash And SRAM Sizes Incorrect

The Flash and SRAM sizes calculated when you build a project don't take into account the Stack size defined in the Design-wide resources file.

{{< figure src="/images/programming-psoc/psoc-creator-screenshot-dwr-stack-and-heap-size-fields.png" caption="How to change the stack and heap sizes for PSoc 5 devices in PSoC Creator."  width="600px" >}}

Even when Creator reports this

{{< figure src="/images/programming-psoc/psoc-creator-screenshot-compile-flash-and-sram-used.png" caption="PSoC Creator tells you the amount of flash and SRAM used, however, does not take into account the stack."  width="600px" >}}

After adding another single-byte variable to the project, you might receive this error.

{{< figure src="/images/programming-psoc/psoc-creator-region-ram-overflowed.png" caption="PSoC Creator RAM overflowed error message."  width="400px" >}}

## Invalid Input Module

This applies to PSoC 3 and the Keil tool chain.

{{< figure src="/images/programming-psoc/psoc-3-build-error-invalid-input-module-build-message.png" caption="The PSoC 3 build error 'Invalid Input Module',"  width="400px" >}}

This is caused it you select "True" for the "Browse Information" setting under Build Options->Compiler->General.

{{< figure src="/images/programming-psoc/psoc-3-build-error-invalid-input-module-browse-information-setting.png" caption="How to get rid of the PSoC 3 build error 'Invalid Input Module' (change it to FALSE)."  width="450px" >}}

## Math Functions Won't Work In PSoC 5

If you keep getting "undefined reference errors" at build time when trying to use PSoC 5 math functions, don't fret. This is a well known problem, and the fix is discussed in [this documentation on the PSoC website](http://www.cypress.com/?rID=42838). Basically, you have to type `m` into the Additional Libraries field in the linker settings.

## Find/Replace Stepwise Search Resets On Edit

When using Find/Replace in PSoC Creator, you will notice that the search resets itself if you edit any text while doing a stepwise search. This becomes really annoying, because every time it resets, you end up iteration through all the previously found strings before searching for any new ones.

{{< figure src="/images/programming-psoc/psoc-creator-find-replace-bug-stepwise-search-resets-on-edit.png" caption="When using Find/Replace in PSoC Creator, you will notice that the search resets itself if you edit any text while doing a stepwise search."  width="450px" >}}

## PSoC Creator Doesn't Delete Old Files When Renaming Project

PSoC Creator automatically creates a number of project files that incorporate the project name in their file name. When renaming a project, the old files are not deleted, leaving old, redundant files in the working code directory.

The workaround is to delete these manually. This is not hard, as you can group them altogether based on file name. You can safely delete this without corrupting your PSoC Creator project.

## You Can Use The Two USB Pins As GPIO, But...

But they have to set-up with either the "strong drive" or "open-drain drive low" drive mode first (even if they are inputs)! See the [Pins section on the PSoC->Components page](/programming/microcontrollers/psoc/components#pins) for more info.
