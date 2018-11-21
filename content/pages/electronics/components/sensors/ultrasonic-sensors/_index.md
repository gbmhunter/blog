---
author: gbmhunter
date: 2013-12-03 22:08:04+00:00
draft: false
title: Ultrasonic Sensors
type: page
url: /electronics/components/sensors/ultrasonic-sensors
---

[mathjax]




# Overview




Ultrasound is sound waves that are at a frequency **above** the audible range. This is usually frequencies above 18kHz. Also note that **infrasound** are sound waves with a frequency of 16Hz or below, which is below the audible range.




# Terminology


<table style="width: 657px;" border="0" >
<tbody >
<tr >

<td style="width: 122px;" >**Term**
</td>

<td style="width: 505px;" >**Description**
</td>
</tr>
<tr >

<td style="width: 122px;" >Acoustic Impedance
</td>

<td style="width: 505px;" >The acoustic impedance of a material is a measure of it's opposition to displacement by ultrasonic waves. The symbol for acoustic impedance is \(Z\).
</td>
</tr>
<tr >

<td style="width: 122px;" >Apodization
</td>

<td style="width: 505px;" >When referring to ultrasound, _apodization_ is usually referring to the technique of shaping the wave so that the intensity of the side lobes is reduced. Used in medical ultrasound machines.
</td>
</tr>
<tr >

<td style="width: 122px;" >Bandwidth
</td>

<td style="width: 505px;" >The _bandwidth_ of a ultrasonic transducer is the frequency range at which the transducer can operate within.
</td>
</tr>
<tr >

<td style="width: 122px;" >Bulk Waves
</td>

<td style="width: 505px;" >_Bulk waves_ are ultrasonic waves that do not depend on the surface or boundary of the medium it is travelling through. Two types of bulks waves can exist in an isotropic medium, longitudinal and shear waves.
</td>
</tr>
<tr >

<td style="width: 122px;" >Capacitance
</td>

<td style="width: 505px;" >When talking about piezo-electric transducers, this refers to the capacitance of the transducer, which is typically around 180pF-2.2nF.
</td>
</tr>
<tr >

<td style="width: 122px;" >CMUT
</td>

<td style="width: 505px;" >CMUT (or cMUT) is an initialism for "**Capacitive Micromachined Ultrasonic Transducers**". They emit ultrasonic waves from a cavity in silicon as their capacitance changes. They work easily at high frequencies due to their small size.
</td>
</tr>
<tr >

<td style="width: 122px;" >Collapse Voltage
</td>

<td style="width: 505px;" >Applies to CMUT transducers only. Also see _Snapback Voltage_.
</td>
</tr>
<tr >

<td style="width: 122px;" >Couplant
</td>

<td style="width: 505px;" >A medium which is used to transfer ultrasonic energy from the transducer to the medium under investigation. Common couplants are water, oil or glycerine.
</td>
</tr>
<tr >

<td style="width: 122px;" >Directivity
</td>

<td style="width: 505px;" >A measure of the interaction angle of a ultrasonic sensor with the medium under investigation. Normally defined as the angle range at which the signal is no less the -3dB than the peak. Normally 5-15°.
</td>
</tr>
<tr >

<td style="width: 122px;" >Fixed Capacitance
</td>

<td style="width: 505px;" >Applies to _CMUT_ transducers only.
</td>
</tr>
<tr >

<td style="width: 122px;" >Free Capacitance
</td>

<td style="width: 505px;" >Applies to _CMUT_ transducers only.
</td>
</tr>
<tr >

<td style="width: 122px;" >Heterodyne Laser Interferometer
</td>

<td style="width: 505px;" >A laser-based tool that can be used to detect ultrasonic waves.
</td>
</tr>
<tr >

<td style="width: 122px;" >Input Voltage
</td>

<td style="width: 505px;" >When talking about piezo-electric ultrasonic sensors, this is normally the maximum peak-to-peak voltage that can be applied across it's two pins. Normally between 30-200Vp2p.
</td>
</tr>
<tr >

<td style="width: 122px;" >Kundt's Tube
</td>

<td style="width: 505px;" >Kundt's tube is a long glass tube held in the horizontal direction with lycopodium powder sprinkled inside it. When ultrasonic waves pass through the tube the power forms heaps at the nodal points and is blown off the antinodal points. This works as long as the wavelength of the ultrasound is not too small.
</td>
</tr>
<tr >

<td style="width: 122px;" >LNA
</td>

<td style="width: 505px;" >LNA is an initialism for _**low noise amplifier**_. LNAs are used on the front-end of ultra-sonic transducer circuits.
</td>
</tr>
<tr >

<td style="width: 122px;" >Longitudinal Waves
</td>

<td style="width: 505px;" >_**Longitudinal waves**_ (also called distortional, compression or primary waves) are waves whose particles motion is parallel to the direction of the wave propagation. This is opposed to shear waves.
</td>
</tr>
<tr >

<td style="width: 122px;" >Phased Array
</td>

<td style="width: 505px;" >An array of ultrasonic transducers that is designed to produce a linear wavefront, as opposed to a singular transducer which produces a circular wavefront.
</td>
</tr>
<tr >

<td style="width: 122px;" >PRF
</td>

<td style="width: 505px;" >PRF is an initialism for _**pulse repetition frequency**_. It is the number of ultrasound pulses per second.
</td>
</tr>
<tr >

<td style="width: 122px;" >Ringing
</td>

<td style="width: 505px;" >The is the self-oscillation of a piezo-electric sensor after it has just been driven. The ringing limits the minimum distance that can be measured.
</td>
</tr>
<tr >

<td style="width: 122px;" >Sensitivity
</td>

<td style="width: 505px;" >Used to describe an ultrasonic transducers electrical response to received ultrasonic energy, usually measure in \(dB\). Common values are around \(-75dB\).
</td>
</tr>
<tr >

<td style="width: 122px;" >Shear Waves
</td>

<td style="width: 505px;" >Shear waves (also called distortional, transverse or secondary waves) are waves whose particle motion is perpendicular to the direction of the wave propagation. This is opposed to longitudinal waves.
</td>
</tr>
<tr >

<td style="width: 122px;" >Snapback Voltage
</td>

<td style="width: 505px;" >Applies to CMUT transducers only. Also see _Collapse Voltage_.
</td>
</tr>
<tr >

<td style="width: 122px;" >Sonotrode
</td>

<td style="width: 505px;" >A sonotrode is a tool used in ultrasonic welding to apply the vibration energy to the material to be welded.
</td>
</tr>
<tr >

<td style="width: 122px;" >SPL
</td>

<td style="width: 505px;" >SPL is an initialism for _**Sound Pressure Level**_. A common value for an ultrasonic transducer is \(110dB\).
</td>
</tr>
<tr >

<td style="width: 122px;" >Temporal Resolution
</td>

<td style="width: 505px;" >A ability to accurately locate events at a particular instant in time. Related to _Spatial Resolution_.
</td>
</tr>
<tr >

<td style="width: 122px;" >TGA
</td>

<td style="width: 505px;" >TGA is an initialism for _**T****ime Gain Amplifier**_. They are used on the front-end of ultrasonic transducer circuits to compensate for the fact that returning ultrasonic signals are attenuated the further they travel.
</td>
</tr>
<tr >

<td style="width: 122px;" >TOF
</td>

<td style="width: 505px;" >TOF is an initialism for _**Time Of Flight**_. It is when the time is measured between emitted and received waveforms, and distance information is determined from this, when knowing the speed and which the wave travels through the medium.
</td>
</tr>
<tr >

<td style="width: 122px;" >TOFD
</td>

<td style="width: 505px;" >TOFD is an initialism for _**Time Of Flight Diffraction**_. It is used for the non-destructive testing of weld defects.
</td>
</tr>
</tbody>
</table>


# Basic Principle




Ultrasonic sensors work by emitting high-frequency sound waves (18-50MHz), and analysing the reflected waves  (including time of flight). Ultrasonic waves are longitudinal sound waves and require an elastic medium to travel through. They are normally made with a piezo-electric material that vibrates when a AC voltage is applied to it. Because piezo-electric materials convert energy in both ways (they also convert mechanical vibration into electricity), the same sensor can be used as the receiver, while some setups use separate transmitters and receivers. Smooth surfaces are hard to detect on inclined levels (e.g. only up to 10°). Rough/jagged surfaces are much easier to detect on inclined angles. The higher the ultrasound frequency, the better it will reflect of smaller objects (such as defects in materials).




# Comparison Against Other Sensors




Ultrasound sensors are not effected by the translucence of the target object. For this reason they are better then photo-sensitive sensors are detecting transparent objects, or objects where there is high glare. They are also relatively cheap compared to other forms of distance sensors. Piezo-electric ultrasonic transducers are larger than most other photo-sensitive sensors.




# Variations




Open and closed types. The following image shows a open type piezo-electric ultrasonic transducer commonly used by electronic hobbyists, robiticists, and the maker community, called the HC-SR04. These modules integrate easily with the Arduino microcontroller platform.



[caption id="attachment_13156" align="aligncenter" width="1200"][![An Arduino compatible ultrasound module.](/images/2013/12/arduino-ultrasound-module.jpg)
](/images/2013/12/arduino-ultrasound-module.jpg) An Arduino compatible ultrasound module.[/caption]



High-power types have a power rating between 40-150W. These types of ultrasonic transmitters are used for ultrasonic cleaning.




# Uses





	  * Ultrasound modules for tank level measurement. They normally can measure a range of liquids including water, black water, oil, petrol, diesel without any adjustment (liquid type agnostic). Range is typically from 100mm to 4m. Some have focusers made of materials such as glass-reinforced polypropylene to produce narrow beams.
	  * Ultrasound cleaners are used to clean objects by vibrating the dirt/greese from them. They are commonly used to clean the resin of circuit boards after soldering.
	  * High-end wind sensors (anemometers) use ultrasound to measure the wind speed and direction (or more concisely, it's velocity).
[caption id="attachment_13157" align="aligncenter" width="149"][![A 3D sonic anemometer. Image from http://www.thiesclima.com/ultrasonic_anemometer_3d_e.html.](/images/2013/12/3d-sonic-anemometer.jpg)
](/images/2013/12/3d-sonic-anemometer.jpg) A 3D sonic anemometer. Image from http://www.thiesclima.com/ultrasonic_anemometer_3d_e.html.[/caption]
  

 
	  * Similar to anemometers, ultrasonic flowmeters can be used to determine the speed and direction of liquid within pipes.
	  * Ultrasonic devices are used in the medical world for getting images of body parts (e.g. an unborn baby). Human tissue attenuates ultrasound by approximately 1dB/cm/MHz.
[caption id="attachment_13158" align="aligncenter" width="286"][![The C60X medical ultrasound sensor by Sonosite. Image from http://www.sonosite.com/accessories/c60x-0.](/images/2013/12/medical-ultrasonic-sensor-sonosite-c60x.jpg)
](/images/2013/12/medical-ultrasonic-sensor-sonosite-c60x.jpg) The C60X medical ultrasound sensor by Sonosite. Image from http://www.sonosite.com/accessories/c60x-0.[/caption]
  

 
	  * Parking sensors in vehicles commonly use ultrasound sensors for distance detection.
	  * Manufacturing processes such as flaw detection, thickness gauging, weld inspection.
	  * Ultrasonic welding is the process of using high-energy ultrasonic sound waves (20-40kHz) to soften or melt thermoplastics to join them together. Welds are very fast (typically less than a second to completion).
	  * Gas leak detection (leaks usually produce a high-frequency sound).
	  * Ultrasonic fuel vaporizers. They use ultrasound to vaporize fuel, usually before entering the combustion chamber on a vehicle.
	  * Bat detectors. Ultrasonic bat detectors listen for the ultrasonic noises made by bats, and either graph them or convert them to the audible spectrum (heterodyning). The circuit below converts ultrasonic waves into the audible spectrum.



# Common Outputs For Modules





	  * 4-20mA current output
	  * Voltage output (max voltage varies, usually 3.3-12V)
	  * Relay outputs (both NC and NO)



# Beam Pattern And Range




With a simple single transducer acting as both the receiver and transmitter, the further away the object you wish to detect, the slower your maximum sample frequency can be, as you have to wait longer for the ultrasonic wave to return.






[caption id="attachment_13163" align="aligncenter" width="358"][![The detection beam pattern of some ultrasonic transducers by Sonarange. Image from http://www.sntag.ch/data/Datenblatt%20e%20UPS.pdf.](/images/2013/12/detection-beam-pattern-of-sonarange-ups-ultrasonic-transducers.png)
](/images/2013/12/detection-beam-pattern-of-sonarange-ups-ultrasonic-transducers.png) The detection beam pattern of some ultrasonic transducers by Sonarange. Image from http://www.sntag.ch/data/Datenblatt%20e%20UPS.pdf.[/caption]



## Minimum Range




The minimum range of a single ultrasonic transmitter/receiver is primarily determined by three things:





	  * The rise-time to full-power of the drive circuitry
	  * The ring-down time of the transducer
	  * The medium the ultrasound is travelling through



The combination of these three factors creates a dead-zone right in-front of the transducer at which the ultrasonic transceiver cannot detect anything. A larger rise-time, a larger ring-down time, or a denser medium (one which ultrasound travels faster through), will all increase the dead-zone distance. A separate transmitter/receiver circuit like the one shown below does not suffer from the first two issues.



[caption id="attachment_13164" align="aligncenter" width="988"][![A ultrasonic proximity detector circuit with separate transmitter and receiver. Image from http://www.datasheetarchive.com/dl/Scans-004/Scans-0082375.pdf.](/images/2013/12/ultrasonic-proximity-detector-circuit-with-seperate-transmitter-and-receiver.png)
](/images/2013/12/ultrasonic-proximity-detector-circuit-with-seperate-transmitter-and-receiver.png) A ultrasonic proximity detector circuit with separate transmitter and receiver. Image from http://www.datasheetarchive.com/dl/Scans-004/Scans-0082375.pdf.[/caption]



## Maximum Range




The maximum range of a ultrasonic transducer is primarily determined by:





	  * The output power
	  * The acoustic impedance matching between any different mediums
	  * The amount of attenuation by the medium
	  * The texture and angle of the surface the ultrasound bounces of
	  * The sensitivity of the receiver
	  * The quality of the analogue front-end receiver circuitry (especially in relation to noise)



# Frequency




Higher frequency ultrasonic waveforms lose energy quicker when travelling through a medium. For this reason low-frequency (40kHZ) is normally used when air is the medium. Higher frequencies such as 1MHz are used when the medium is water or metal.



[caption id="attachment_13165" align="aligncenter" width="561"][![A graph showing the audible and ultrasound ranges of the sound spectrum, with subsections. Image from http://www.olympus-ims.com/data/File/panametrics/UT-technotes.en.pdf.](/images/2013/12/graph-of-audible-and-ultrasound-frequency-range-with-subsections.png)
](/images/2013/12/graph-of-audible-and-ultrasound-frequency-range-with-subsections.png) A graph showing the audible and ultrasound ranges of the sound spectrum, with subsections. Image from http://www.olympus-ims.com/data/File/panametrics/UT-technotes.en.pdf.[/caption]



When using ultrasound for imaging, the frequency of the ultrasound determines the image resolution.




# Amplitude




Strong pressure waves suffer from deformation. This generates harmonics and causes non-linear propagation.




# Electrical Model




An piezo-based ultrasound transducer can be modeled as a capacitor and resistor in series. This can be represented as a parallel capacitor and resistor with a suitable electrical transformation.




# Tuned Driving




See the External Resources section at the bottom of this page.




# Transmission Speeds




Speed of sound through various mediums:


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >**Medium**
</td>

<td >**Speed (m/s @ 10°C)**
</td>
</tr>
<tr >

<td >Air
</td>

<td >331.32
</td>
</tr>
<tr >

<td >Ammonia
</td>

<td >414.83
</td>
</tr>
<tr >

<td >Argon
</td>

<td >301.90
</td>
</tr>
<tr >

<td >Carbon Dioxide
</td>

<td >257.86 (low freq), 268.53 (high freq)
</td>
</tr>
<tr >

<td >Carbon Disulfide
</td>

<td >184.71
</td>
</tr>
<tr >

<td >Carbon Monoxide
</td>

<td >337.12
</td>
</tr>
<tr >

<td >Chlorine
</td>

<td >205.44
</td>
</tr>
<tr >

<td >Ethylene
</td>

<td >313.94
</td>
</tr>
<tr >

<td >Helium
</td>

<td >969.87
</td>
</tr>
<tr >

<td >Hydrogen
</td>

<td >1269.49
</td>
</tr>
<tr >

<td >Methane
</td>

<td >431.90
</td>
</tr>
<tr >

<td >Neon
</td>

<td >434.95
</td>
</tr>
<tr >

<td >Nitric Oxide
</td>

<td >324.92
</td>
</tr>
<tr >

<td >Nitrogen
</td>

<td >334.06
</td>
</tr>
<tr >

<td >Nitrous Oxide
</td>

<td >261.82
</td>
</tr>
<tr >

<td >Oxygen
</td>

<td >317.30
</td>
</tr>
<tr >

<td >Steam (100°C)
</td>

<td >403.25
</td>
</tr>
</tbody>
</table>


# Sound Pressure Level (SPL)




The sound pressure level (SPL) is a measure of the magnitude of the sound waves from a ultrasonic transmitter. Note that SPL varies with the distance to the source, but the sound power does not. As sound travels through a medium, the magnitude of the sound pressure is reduced due to two things:





	  * Attenuation due friction as the medium's particles vibrate
	  * The spreading loss due to the expanding surface area of the radiating beam as it travels outwards from the transmitter



The sound pressure decreases proportionally as the distance between the source and receiver increases, i.e. \(\rho \propto \frac{1}{r}\). The SPL at a distance R from the transmitter is given by:




$$ SPL(R) = SPL(R_0) - 20 log(\frac{R}{R_0}) - \alpha_f R $$




where:  

 \(SPL(R)\) = sound pressure at distance \(R\) in \(dB/1uPa\)  

 \(SPL(R)\) = sound pressure at distance \(R_0\) in \(dB/1uPa\)  

 \(\alpha(f)\) = attenuation coefficient in \(dB/unit distance\) at frequency \(f\)




It is interesting to note that the SPL threshold of pain for a human is somewhere between \(120-140dB\).




# Acoustic Impedance




Acoustic impedance is the measure of opposition to deflection of a mediums particles due to sound. It has the SI units \(N \cdot s \cdot m^{-3}\) or \(Pa\cdot s \cdot m^{-1}\).




$$ Z = \rho c $$




where:  

 \(Z\) = acoustic impedance (\(Nsm^{-3}\))  

 \(\rho\) = material density  

 \(c\) = material sound velocity




## Impedences Of Common Mediums


<table style="width: 500px;" border="0" >
<tbody >
<tr >

<td >**Medium**
</td>

<td >**Characteristic Specific Acoustic Impedance (\(Pa \cdot s \cdot m^{-1}\))**
</td>
</tr>
<tr >

<td >Air (room temperature)
</td>

<td >415
</td>
</tr>
<tr >

<td >Lead
</td>

<td >246
</td>
</tr>
<tr >

<td >Steel (1020)
</td>

<td >454
</td>
</tr>
<tr >

<td >Tin
</td>

<td >242
</td>
</tr>
</tbody>
</table>


Note that acoustic impedance is also commonly expressed in the units:




$$ \frac{g}{cm^2 \cdot s} $$




where:  

 \( g \) = mass (in grams)  

 \( cm \) = centimeters  

 \( s \) = seconds




You can convert between the two different units with:




$$ \frac{Pa \cdot s}{m^1} = 10 \cdot \frac{g}{cm^2 \cdot s} $$







## Intensity Reflection Coefficient




This determines how much intensity will be reflected at the boundary between two mediums with different acoustic impedances.




$$ IRC = (\frac{Z_2 - Z_1}{Z_2 + Z_1}) $$




## Intensity Transmission Coefficient




This determines how much intensity will be transmitted at the boundary between two mediums with different acoustic impedances.




$$ ITC = 1- IRC$$




# Acoustic Interface




The boundary between two mediums with different acoustic impedances is called an acoustic interface. The loss (in dB) of a sound wave travelling from medium 1 to medium 2 is given by:




$$ dB_{loss} = 10Log_{10}\frac{4 Z_1 Z_2}{(Z_1 + Z_2)^2}$$




where:  

 \(Z_1\) = acoustic impedance of the first medium  

 \(Z_2\) = acoustic impedance of the second medium




# Classification Of Detected Object Shapes




Detected objects can be classified as follows:





	  * (A) Flat-surface objects such as fluids, boxes, paper, and windows
	  * (B) Cylindrical objects such as cans, bottles and human bodies
	  * (C) Powders and chunky objects such as minerals, rocks, coal, plastic, rubbish



# CMUT's




CMUTs use a change in capacitance to perform energy transduction. They are micromachined (i.e. small), and therefore easier to assemble into 2D and 3D arrays than traditional pizeo transducers. They have a large frequency bandwidth.




# External Resources




The [Olympus Ultrasonic Transducers Technical Notes](http://www.olympus-ims.com/data/File/panametrics/UT-technotes.en.pdf) is a great document explaining some of the basics of ultrasonic transducers and related equations. If the link is dead, you can use the local download below:




[wpdm_file id=4 title="true" desc="true"]




A technical resource on ultrasonic flowmeter basics can be found at [http://www.sensorsmag.com/sensors/acoustic-ultrasound/ultrasonic-flowmeter-basics-842](http://www.sensorsmag.com/sensors/acoustic-ultrasound/ultrasonic-flowmeter-basics-842).




For information on how to tune circuits with piezo transducers in them, see http://traktoria.org/files/sonar/system_design/notes_on_the_design_of_matching_systems_for_piezo_elements.pdf . If the link is dead (**which it has been since Dec 2017**), you can use the local download below:




[wpdm_file id=3 title="true" desc="true"]




A good journal article on ultrasound losses in air is at [http://www.ktu.lt/ultra/journal/pdf_50_1/50-2004-Vol.1_09-A.Vladisauskas.pdf](http://www.ktu.lt/ultra/journal/pdf_50_1/50-2004-Vol.1_09-A.Vladisauskas.pdf) [Cypress - Automotive Ultrasonic Distance Measurement For Park Assist Systems](http://www.cypress.com/?docID=42341) is a good document describing an ultrasonic system built from a transducer and a PSoC 1 microcontroller. You can also use the local download below:




[wpdm_file id=5 title="true" desc="true"]




_Maxim - Proximity Detector Features In Ultrasonic Transducers_ shows a good circuit when using a separate transmitter and receiver. You can also use the local download link below:




[wpdm_file id=6  title="true" desc="true"] 
