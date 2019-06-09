---
author: gbmhunter
categories: [ "Posts", "Updates" ]
date: 2019-05-30
description: "Blog updates during May 2019."
draft: false
lastmod: 2019-05-30
tags: [ "component designators", "PCB design tools", "PCB layers", "less", "convolution", "git", "fixup", "logs", "chown", "ownership", "Linux" ]
title: "May 2019 Updates"
type: "post"
---

* The {{% link text="Component Designators page" src="/electronics/circuit-design/component-designators" %}} was updated. The mobile unfriendly one-big-table design was removed in favour of separate sections for each component and designator/schematic symbol. Some of the symbols were also updated using InkScape.

* The PCB Design Tools section of the main PCB Design page was moved onto it's own {{% link text="PCB Design Tools page" src="/pcb-design/pcb-design-tools" %}}.

* All section on the main PCB Design page regarding PCB layers were moved into their own new {{% link text="PCB Layers page" src="/pcb-design/pcb-layers" %}}.

* Big updates to the {{% link text="Convolution page" src="/programming/signal-processing/convolution" %}}, including the addition of a worked example where the convolution of two box-car functions is calculated.

    {{% img src="convolution-two-box-car-functions.gif" width="500px" caption="An animated .gif showing the convolution of two box-car functions. The value of the convolution function at any time t (bottom line in red) is the amount area shown in red in the middle plot, which is the area under the curve of f(t)g(t) (the two waveforms multiplied together)." %}}

* Added a new page on {{% link text="less" src="/programming/operating-systems/linux/programs/less" %}}, the basic Linux command-line utility for displaying text.

* Added a new {{% link text="Image Processing subsection" src="/programming/image-processing" %}} under Programming. Added a new {{% link text="Morphology page" src="/programming/image-processing/morphology" %}} under the Image Processing section.

* Addition of information on `git commit --fixup` and `git log` to the {{% link text="git page" src="/programming/version-control-systems/git" %}}.

* Addition of ownership (`chown`) information to the {{% link text="Users, Groups, And Permissions In Linux page" src="/programming/operating-systems/linux/users-groups-and-permissions-in-linux" %}}.

* Added a `LICENSE.txt` (containing the MIT license) to many of my Git repos, including:
    * [AltiumScriptCentral](https://github.com/gbmhunter/AltiumScriptCentral)
    * [CppLinuxSerial](https://github.com/gbmhunter/CppLinuxSerial)
    * [CppTemplate](https://github.com/gbmhunter/CppTemplate)
    * [CppUtils](https://github.com/gbmhunter/CppUtils)
    * [FunctionPointerStateMachineExample](https://github.com/gbmhunter/FunctionPointerStateMachineExample)
    * [MPid](https://github.com/gbmhunter/MPid)
    * [MRingBuff](https://github.com/gbmhunter/MRingBuff)
    * [LinuxCanBus](https://github.com/gbmhunter/LinuxCanBus)
    * [YoctoHelloWorldApp](https://github.com/gbmhunter/YoctoHelloWorldApp)

* Released `v5.0.0` of [MPid](https://github.com/gbmhunter/MPid), which included the following changes:
    * Added .gitignore file.
    * Added `LICENSE.txt` (MIT license).
    * Replaced Make build script with CMake.
    * Replace the custom four number versioning with the standardized semantic versioning (three number).
    * Changed README from ReStructuredText to Markdown format.

* Updates to the {{% link text="rsync page" src="/programming/operating-systems/linux/programs/rsync" %}} including a redesign of the _Options_ section.