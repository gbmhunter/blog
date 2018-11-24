---
author: gbmhunter
date: 2014-11-03 08:10:02+00:00
draft: false
title: Desmear And Etchback
type: page
url: /pcb-design/desmear-and-etchback
---

# Overview

The mechanical of via's in multi-layer PCBs crates a residual resin that smears along the walls of the vias, preventing a good electrical connection between the copper layers and the via itself. The residue is due the the heat of the drill bit melting the resin and smearing it across the inner-layer copper surfaces in the via barrel. The idea behind desmear is to remove this residue so that a good connection is achieved when the via is plated (metallized). Etchback is the idea that one can go further than just removing resin, and etch away some of the epoxy/resin from the via barrel wall, giving what people call a "three-point connection" which could provide even better connectivity (this is a controversial topic). This is commonly used on high reliability PCBs (such as military, aerospace and medical PCBs).

# Positive Etchback

The images below show positive etchback.

<table style="width: 800px; height: 300px;" ><tbody ><tr >
<td >{{< figure src="/images/2014/11/etchback-none.png" width="203" caption="Cross-section of a via hole with no etchback (hole has not been plated yet)." caption-position="bottom" >}}
</td>
<td >{{< figure src="/images/2014/11/etchback-before-plating.png" width="224" caption="Cross-section of a via hole that has positive etchback (hole has not been plated yet)." caption-position="bottom" >}}
</td>
<td >{{< figure src="/images/2014/11/etchback-after-plating.png" width="204" caption="Cross-section of a via which has been plated after positive etchback was done, notice the 'three-point connection'." caption-position="bottom" >}}
</td></tr></tbody></table>

# Negative Etchback

Negative etchback is when the copper layers recede from the edge of the via hole, as shown in the diagram below.

{{< figure src="/images/2014/11/etchback-negative.png" width="314" caption="The cross-section of a via with negative etchback. Notice how the copper plane recedes from the edge of the via hole." caption-position="bottom" >}}

# Methods

Desmear and etchback can be done with chemicals or by using plasma. The chemical process usually involves a alkaline potassium permanganate based etchant. This etchant must be completely removed before the via is plated.

The plasma method uses the creation of gaseous free radicals which attack the residue to form volatiles which can be sucked away.
