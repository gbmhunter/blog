---
author: gbmhunter
date: 2013-10-29 02:23:42+00:00
draft: false
title: Impedance Controlled Routing
type: page
url: /pcb-design/impedance-controlled-routing
---

[mathjax]

# Overview

[caption id="attachment_12305" align="aligncenter" width="316"][![An isometric diagram of a microstrip. Image from www.maximintegrated.com.](http://blog.mbedded.ninja/wp-content/uploads/2013/10/microstrip-track-example-in-isometric-view-microchip.gif)
](http://blog.mbedded.ninja/wp-content/uploads/2013/10/microstrip-track-example-in-isometric-view-microchip.gif) An isometric diagram of a microstrip. Image from www.maximintegrated.com.[/caption]

# Child Pages

[sb_child_list template=2 orderby=title order=asc nest_level=1]

# Dielectric Constant

This is related to the capacitive ability of the medium between two copper layers to store charge. In a typical PCB stack-up, it is either the dielectric of the prepreg or the dielectric of the core.

# Characteristic Impedance

This is the impedance (kind of like resistance) a signal "sees" when travelling down a transmission line. Note that the main difference between standard resistance and the characteristic impedance is that the impedance does not depend on the length of the conductor. It has the same value no matter how long the transmission line.

The characteristic impedance of a transmission line need to equal the impedance of the end devices connected to it, otherwise reflections will occur.

Typical impedances and their associated uses are:

<table style="width: 500px;" ><tbody ><tr >
<td >**Characteristic Impedance**
</td>
<td >**Uses**
</td></tr><tr >
<td >50Ω
</td>
<td >GPS antennas, GPRS antennas, BNC cables (for things like oscilloscopes)
</td></tr><tr >
<td >100Ω
</td>
<td >Differential ethernet signals. Differential PCIe signals.
</td></tr><tr >
<td >120Ω
</td>
<td >RS-485 bus
</td></tr></tbody></table>

# When Should I Worry About Impedance?

There is a well-known rule-of-thumb for applies to digital waveforms:

$$ BW \approx \frac{0.35}{t_r} $$

where:  
\( t_r \) is the maximum rise time from 10 to 90% (this is stated in the USB spec.), in seconds (s).  
\( BW \) the resulting maximum bandwidth the track has to support, in Hertz (Hz). You can also think of this as a maximum frequency, since the bandwidth starts at 0Hz.

For example, the USB 2.0 specification states a maximum rise time of 4ns. Using the equation above, this gives us a bandwidth of approximately 87.5MHz. 

From this, we can calculate the wavelength of an 87.5MHz signal travelling down a track on standard FR-4 PCB.

$$ \lambda = \frac{c}{f\sqrt{\epsilon_r}} $$

where:  
\( c \) is the speed of light, in meters per second  
\(  f \) is the frequency that you worked out above (which we called bandwidth)  
\( \epsilon_r \) is the di-electric of the material the electro-magnetic wave is travelling through, and is unitless. In our case this will be the di-electric of the PCB. For standard FR4, this is about 4.35.

<blockquote>The impedance of a PCB track is not important if it is at least 10 times smaller than the wavelength of the signal.
> 
> </blockquote>

Thus, the minimum wavelength of the USB full-speed signal is 1.65m, and the characteristic impedance of the track is only important if the total track length is greater than 165mm.

# Co-planar Waveguides (CPW)

Co-planaer waveguides (CPW) are a third alternative to microstrips and striplines for controlling the impedance of a circuitboard trace. There are two variants, the basic _co-planar waveguide_ and the _co-planar waveguide with ground_. The main advantage of a co-planar waveguide is that it **does not require a solid power plane** above or below it, making it a more flexible choice for layer and space constrained PCBs.

[caption id="attachment_12760" align="aligncenter" width="490"][![A co-planer waveguide for a GSM antenna feed-line. The co-planar waveguide is the curved track that starts at E1. The three 0402 components are for a impedance matching circuit.](http://blog.mbedded.ninja/wp-content/uploads/2013/10/coplanaer-waveguide-for-gsm-antenna.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/10/coplanaer-waveguide-for-gsm-antenna.png) A co-planer waveguide for a GSM antenna feed-line. The co-planar waveguide is the curved track that starts at E1. The three 0402 components are for a impedance matching circuit.[/caption]

Although you can't see it in the image above, there is a ground plane underneath the CPW (there are two internal layers between the visible top layer (red) and bottom layer (blue)).

# The Effects Of Vias

Vias are a bit of a nuisance when it comes to impedance controlled traces. They create imep

# External Links

A good impedance calculator for a number of different transmission lines is found at [http://www.eeweb.com/toolbox/wire-microstrip-impedance/](http://www.eeweb.com/toolbox/wire-microstrip-impedance/).
