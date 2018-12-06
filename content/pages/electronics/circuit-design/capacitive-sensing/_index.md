---
author: gbmhunter
date: 2012-05-20 08:52:13+00:00
draft: false
title: Capacitive Sensing
type: page

---

# Overview

This page is about capacitive sensing methods.  

For information about capacitors in general, see the [Capacitor page](/electronics/components/capacitors).

Capacitive sensing is a widely used technique for proximity detection, touch-screens, level measurement, and distance measurements. It is used in the more expensive touch-screens found in today's smart phones (as opposed to the cheaper and poorer performing resistive touch screens), for contact-less buttons (see page on [Capacitive Touch Sensing](/electronics/circuit-design/capacitive-touch-sensing)), the distance measuring mechanism in digital calipers, liquid level measurement and much more.

{{< figure src="/images/2012/05/capacitive-encoder-photo-cui-amt.jpg" width="300px" caption="The CUI AMT100 series capacitive encoders with up to 2048 counts per revolution. Image from http://www.engineerlive.com/Asia-Pacific-Engineer/Time_Compression/Capacitive_encoder_offers_versatility/22119/."  >}}

# Applications

* Level measurement
* Proximity sensing
* Impurity detection
* Touch sensing (see page on [Capacitive Touch Sensing](/electronics/circuit-design/capacitive-touch-sensing))
* Flow sensing
* Position sensing

# Capacitance Sensors

## Linear

Linear capacitive sensors measure a linear position change (i.e. not rotational).

The following image shows the typical dimensions of the linear encoder typically used in digital calliper design.

<table >
	<tbody >
		<tr >
			<td >{{< figure src="/images/2012/05/digital-calliper-capacitive-encoder-strip-up-close-photo.jpg" width="284px" caption="A zoomed in photo of the capacitive linear encoder pads on a digital calliper. Image from http://www.iceinspace.com.au/forum/showthread.php?t=80356."  >}}</td>
			<td >{{< figure src="/images/2012/05/capacitance-strip-dimensions-for-linear-encoder.jpg" width="321px" caption="The dimensions for a capacitive linear encoder commonly found in digital callipers. Image from http://www.iceinspace.com.au/forum/showthread.php?t=80356."  >}}</td>
		</tr>
	</tbody>
</table>

## Rotational

Rotational capacitive sensors can be used in similar situations to those that use optical encoders.

Examples of a small capacitive encoder:

<table >
	<tbody >
		<tr >
		<td >{{< figure src="/images/2012/05/capacitive-encoder-photo-cui-amt.jpg" width="300px" caption="The CUI AMT100 series capacitive encoders with up to 2048 counts per revolution. Image from http://www.engineerlive.com/Asia-Pacific-Engineer/Time_Compression/Capacitive_encoder_offers_versatility/22119/."  >}}</td>
		</tr>
	</tbody>
</table>

# External Resources

<table >
<tbody >
<tr >
<td style="width: 400px;" >{{< figure src="/images/2012/05/toc-section-3-1-analog-devices-basic-linear-design-book-capactivie-sensings-highlighted.png" >}}
</td>
<td style="width: 200px; text-align: center; vertical-align: middle;" >Section 3.1 of the "Basic Linear Design" book by Analog Devices. Freely available from <a href="http://www.analog.com/library/analogDialogue/archives/43-09/linear_circuit_design_handbook.html">http://www.analog.com/library/analogDialogue/archives/43-09/linear_circuit_design_handbook.html</a>
</td>
</tr>
</tbody>
</table>
