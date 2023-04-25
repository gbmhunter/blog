---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Circuit Simulation" ]
date: 2023-04-15
draft: false
lastmod: 2023-04-25
tags: [ "electronics", "circuit simulation", "SPICE" ]
title: "How To Use Micro-Cap"
type: "page"
---

{{% warning-is-notes %}}
 
## Overview

Micro-Cap is a powerful SPICE-based electronics simulator GUI which runs on the Windows operating system. It is used to cost money, but since it is no longer maintained the author has released it to use for free. Even without any new development, as of 2023 it still remains a powerful software package for simulation.

## Installation

As of April 2023, the SpectrumSoft website is down. You can still find the download page at the [Wayback Machine](https://web.archive.org/web/20230214034946/http://www.spectrum-soft.com/download/download.shtm), and the download links still work!

### Micro-Cap 12 Locally-Cached Downloads

In case the download links disappear elsewhere, I have saved the Micro-Cap v12.2.5 installer files locally for download. All files are in English. The links are below:

* Version: `12.2.0.5`
* Full CD: [mc12cd.zip (58MB)](micro-cap-12-installer/mc12cd.zip)
* Executable only: [mc12.zip (16MB)](micro-cap-12-installer/mc12.zip)
* Date: 2021-06-17
* User's Guide: [ug12.pdf (15MB)](micro-cap-12-installer/ug12.pdf)
* Reference Guide: [rm12.pdf (15MB)](micro-cap-12-installer/rm12.pdf)
* Brochure: [mc12_brochure.pdf (6.2MB)](micro-cap-12-installer/mc12_brochure.pdf)


## Digital Simulation

### Digital Stimulus

You can't use normal voltage or current sources to power and control digital circuits (I learnt this the hard way). Instead, you need to use _Digital Stimulus_. They can be found in the Components Browser under _Digital Primitives -> Stimulus Generators_.

Once you have placed a Digital Stimulus on your circuit, you configure it by double-clicking it and then enter in logic level transitions in the large text box. Example syntax is shown in the image below:

{{% figure src="1-bit-digital-stimulus-config.png" width="800px" caption="Screenshot showing how to configure a 1-bit digital stimulus." %}}

The above settings gives the following waveform if we perform a transient analysis:

{{% figure src="1-bit-digital-stimulus-sim/transient-analysis.png" width="900px" caption="Transient analysis for the 1-bit digital stimulus." %}}

There are four preset timings you can choose from to help you get started. These are `1MHzClk`, `Clear`, `Set` and `Train`. The "1MHzClk" preset inserts the following text:

```text
.define _1MHzClk 
 +0ns 0 
 +label=start 
 +500n 1 
 +1u 0 
 +1.5u goto start -1 times
```

### Initial Conditions

_Initial conditions_ let you specify starting values for various simulation parameters.

`.IC`

<div class="worked-example">

One such example when initial conditions are needed is to construct and simulate a NAND-based JK flip-flop. The schematic looks like this:

{{% figure src="jk-flipflop-nand-sim/schematic.png" width="600px" caption="The simulation schematic for the JK flip-flop." %}}

Without specifying initial conditions, `Q` and `nQ` will always stay in an indeterminate state. This is because one of `R` or `S` of the SR latch needs to go to `0` for the latch to be set into a valid state. But you can't get `R` or `S` into the `0` state without one of the outputs being `1`, as they are fed back as feedback into the front-end NAND gates. The simulator does not care about indeterminate states if one of the NAND gates inputs is `0`, because it can become a "don't care" signal and the simulator can set the output to `1`. But for the output of a NAND gate to be `0`, ALL of the inputs have to be `1`. 

{{% figure src="jk-flipflop-nand-sim/transient-analysis-without-initial-conditions.png" width="900px" caption="Simulation results without specifying initial conditions. The outputs get stuck in an indeterminate state forever." %}}

We add the following initial conditions in the `Text` tab of the Micro-Cap "circuit" simulation:

```text
.IC D(NQ)=1 D(Q)=0
```

A screenshot of the initial conditions added to the Micro-Cap simulation is shown below:

{{% figure src="jk-flipflop-nand-sim/initial-conditions.png" width="400px" caption="The initial conditions specified for the JK flip-flop simulation." %}}

Now the outputs start in a determinate state, and the simulation works as expected:

{{% figure src="jk-flipflop-nand-sim/transient-analysis-with-initial-conditions.png" width="900px" caption="Simulation with initial conditions." %}}

</div>

### More Examples

For more examples of digital simulation in Micro-Cap, see the [Latches and Flip-flops page](/electronics/circuit-design/digital-logic/latches-and-flip-flops/).