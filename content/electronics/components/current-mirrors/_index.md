---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components ]
date: 2022-08-06
description: Info about current mirrors.
draft: false
lastmod: 2022-08-06
tags: [ electronics, components, current mirrors ]
title: Current Mirrors
type: page
---

## Overview

A _current mirror_ is a circuit designed to "copy" (mirror) the current through one part of a circuit into another. The output current is kept relatively constant even though the load resistance may be dynamically changing.

Current mirrors are used extensively inside analogue ICs such as operation amplifiers (op-amps).

## Basic BJT Current Mirror

{{% img src="basic-bjt-current-mirror.png" width="400px" caption="A basic BJT current mirror made from two NPN bipolar junction transistors." %}}

Below is a circuit simulation of this basic BJT current mirror. 4.37mA is provided to the input leg of the current mirror, and the current mirror sinks 4.28mA from the output. Close enough for many applications!

{{< circuitjs data="CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKABcKAWTkFPPCmBS9+UcGJiFs2MFmwYwhThkIJshZFQAmdAGYBDAK4AbNuwoqRAwvitiIDTtHWECRPtgQpsnDZOmyOApKKmoaYHAgOgYmZgBKgsKyGghC4NwSIJy0mTAILABOiby2qcIo2fbwLADuxRW0aSgIfrX1LfUYwpBtZbwdCBnNrXWDPHwCY-0jXOOiCJYTUCwA5sW4PH3YaBKrIDYCG-u221RnLPKNSZZ9aAIQ5wkHvJXPd5mVSGdQ0PmXxwIGgDeF1xOcgA" >}}

## Buffered Feedback Current Mirror

The main current error in the basic BJT current mirror circuit is because the base of `Q1` and `Q2` "suck" away some of the current you are tying to measure through the collector of `Q1`. If `Q1`/`Q2` had current gains of 100, then `\(2*\frac{1}{101} = \frac{2}{101}\)` of the current will be diverted into the bases rather than through the collector, and hence not mirrored on the output.  To improve on this, we can add another NPN BJT on the input side to "buffer" the base of `Q1`/`Q2`. Now only `\(\frac{1}{101} * \frac{2}{101} = \frac{3}{10201}\)` of the current is diverted away.

Below is a simulation of the buffered feedback current mirror. Notice now the the output current is only `\(0.03\%\)` different from the input! This is a great improvement on the `\(2\%\)` error of the basic BJT current mirror!

{{< circuitjs data="CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKABcKAWTkFPPCmBS9+UcCAYwEfYihRDICbGmL4o0QrmybihTpEJhChZFQAmdAGYBDAK4AbNuwoYTfAYTXuxEBp2jautqQ2AjE2HjYPDCaITp6BkYmYHAgFjYOTgBKgsJCAghCILpiVPrUVJXQCCwATrngng1gsj7wLADuDSjlhcIoCCaQnd2D3RjCw10I3CIFrnNQLADmDbg8fSDKlUurngLrIPtbaKUs2Bi0RfnNTRCVLDnHPVTPaju9peo1F69e5c8JuIHhxNi8uDxwVRfNhoHh9BgwNhiGAZgYesQkFIZHIFEoVGoUuYrHZHCMZpDRBTeGMpt1etdWsMctS5BtZi1JmJPjspCwgA" >}}
