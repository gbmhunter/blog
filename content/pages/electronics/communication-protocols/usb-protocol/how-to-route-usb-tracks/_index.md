---
author: gbmhunter
date: 2015-10-05 03:39:51+00:00
draft: false
title: How To Route USB Tracks
type: page
url: /electronics/communication-protocols/usb-protocol/how-to-route-usb-tracks
---

[mathjax]

# Overview

The D+ and D- (data) USB traces on circuit boards require impedance controlled routing. The tolerance depends on the exact USB standard used (e.g. USB1.0, USB2.0 full-speed/high-speed, USB3.0).

The USB2.0 spec specifies a 90R differential impedance and a 45R single-ended impedance for the D+ and D- data lines.

For most normal sized PCBs, signal integrity starts becoming an issue at the 480Mb/s USB baud rate.

I recommend visiting the [Impedance Controlled Routing page](http://blog.mbedded.ninja/pcb-design/impedance-controlled-routing) before continuing here...

# What Is My Bandwidth?

Lets recall the well-known rule-of-thumb:

$$ BW \approx \frac{0.35}{t_r} $$

where:  
\( t_r \) is the maximum rise time from 10 to 90% (this is stated in the USB spec.), in seconds (s).  
\( BW \) the resulting maximum bandwidth the track has to support, in Hertz (Hz). You can also think of this as a maximum frequency, since the bandwidth starts at 0Hz.

The USB specification states a maximum rise time of 4ns. Using the equation above, this gives us a bandwidth of approximately 87.5MHz. 

From this, we can calculate the wavelength of an 87.5MHz signal travelling down a track on standard FR-4 PCB.

$$ \lambda = \frac{c}{f\sqrt{\epsilon_r}} $$

where:  
\( c \) is the speed of light, in meters per second  
\(  f \) is the frequency that you worked out above (which we called bandwidth)  
\( \epsilon_r \) is the di-electric of the material the electro-magnetic wave is travelling through, and is unitless. In our case this will be the di-electric of the PCB. For standard FR4, this is about 4.35.

<blockquote>Another general rule-of-thumb is that the impedance of a PCB track is not important if it is at least 10 times smaller than the wavelength of the signal.
> 
> </blockquote>

Thus, the minimum wavelength of the USB full-speed signal is 1.65m, and the characteristic impedance of the track is only important if the total track length is greater than 165mm.

<table ><tbody ><tr >
<td >USB Standard
</td>
<td >Minimum Rise Time, \( t_r \)
</td>
<td >Track Length At Which Impedance Matters
</td></tr><tr >
<td >2.0 Low-speed (1.5Mb/s)
</td>
<td >75ns (USB Spec Rev 2.0, Table 7-10)
</td>
<td >3.1m
</td></tr><tr >
<td >2.0 Full-speed (12Mb/s)
</td>
<td >4ns (USB Spec Rev 2.0, Table 7-9)
</td>
<td >165mm
</td></tr><tr >
<td > 2.0 High-speed (480Mb/s)
</td>
<td >500ps (USB Spec Rev 2.0, Table 7-8)
</td>
<td >20.5mm
</td></tr></tbody></table>

As you can see from the above table, for most PCB's designs, you don't really have to worry about USB2.0 low-speed tracks, you might be concerned about really long USB2.0 full-speed tracks, and you have to control the impedance for all but the smallest USB2.0 high-speed tracks.

For more information, see the [Impedance Controlled Routing page](http://blog.mbedded.ninja/pcb-design/impedance-controlled-routing) in the [PCB Design section](http://blog.mbedded.ninja/pcb-design) of this website.

# What Should My Impedance Be?

The impedance depends on the USB standard.

<table ><tbody ><tr >
<td >USB Standard
</td>
<td >Differential Impedance
</td>
<td >Single-ended Impedance
</td></tr><tr >
<td >1.0
</td>
<td > 
</td>
<td > 
</td></tr><tr >
<td >2.0 Full-speed (12Mb/s)
</td>
<td >\( 90 \Omega \pm 15\% \)
</td>
<td > 
</td></tr><tr >
<td >2.0 High-speed (480Mb/s)
</td>
<td >\( 90 \Omega \pm 15\% \)
</td>
<td > \( 45 \Omega \pm 10\% \)
</td></tr></tbody></table>
