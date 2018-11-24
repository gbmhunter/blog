---
author: gbmhunter
date: 2012-11-22 21:36:23+00:00
draft: false
title: RFID
type: page
url: /electronics/circuit-design/rfid
---

[mathjax]




# Overview




RFID (radio-frequency identification) is a wireless method of transmitting data between a reader and tag, for the purposes of tracking and identification.




# Acronyms





	  * Auto-ID: Automatic Identification
	  * EPC: Electronic Product Code
	  * HF: High Frequency
	  * ISO: International Standards Organisation
	  * LF: Low Frequency
	  * MF: Microwave Frequency
	  * NFC: Near-field Communication
	  * RFID: Radio Frequency Identidfication
	  * RoHS: Restriction of Hazardous Substances
	  * SAL: Smart Active Label
	  * UHF: Ultra-high Frequency
	  * UPC: Universal Product Code
	  * WEEE: Waste Electrical And Electronic Equipment



# Frequencies




There are four (but three common) frequency bands that RFID uses. Based on knowledge of sound and radio waves, you'd expect lower frequency RFID to achieve longer read distances. But the opposite is true! Higher frequency RFID communications get the longest read ranges.



{{< figure src="/images/2012/11/ti-radio-frequency-spectrum-diagram-with-standards.png" width="1288" caption="The radio-frequency spectrum from Texas Instruments. Image from http://www.ti.com/lit/sg/spab089/spab089.pdf." caption-position="bottom" >}}



Here is a summary of the four bands:




## Low Frequency (LF)





	  * 125kHz
	  * Uses the "near-field" effect, utilising magnetic field coupling rather the electric. Only works for short distances (<10cm).



## High Frequency (HF)





	  * 13.56MHz
	  * Typical read range of 1-1.5m



## Ultra-high Frequency (UHF)





	  * Between 868-960MHz
	  * 1-10m read range (longer read/write range than HF
	  * Uses the "far-field" effect
	  * Contains the largest number of inlay/label products
	  * Absorbed by water-containing liquids (but not as much as MF RFID)



The following graph shows the allowed UHF frequency bands in different countries.



{{< figure src="/images/2012/11/uhf-rfid-tag-freq-comparison-graph.jpg" width="715" caption="Allowed UHF frequency bands comparison graph. Image from http://www.omni-id.com/blog/2010/08/rfid_tag_comparison_guide_understanding_broadband_technology/." caption-position="bottom" >}}



## Microwave Frequency (MF)








	  * 2.4-5.8GHz
	  * 10-80m read range
	  * Longest read/write range, but waves are abosrbed readily by many materials, including water (it's the same frequency as microwaves)
	  * Rare RFID frequency
	  * MF can also stand for metal-friendly RFID



# Power Configurations




## Passive




Passive tags have no physical power source and instead get all of their power from the incoming RF signal transmitted by the reader. Passive tags usually don't have an option for external circuity, as they require to run of extremely low amount of energy. However, there are a few passive chips which provide a single I/O pin, which can be used as an input, output, or either (which is called a GPIO in the embedded world), depending on the chip. This includes the [Microchip MCRF202](http://ww1.microchip.com/downloads/en/devicedoc/21308F.pdf) and [Atmel ATA5570](http://www.atmel.com/devices/ata5570.aspx), which both operate in the LF band, and the [NXP UCODE SL351213FTB0](http://www.nxp.com/products/identification_and_security/smart_label_and_tag_ics/ucode/#products), which operates in the UHF band.




## Semi-Active




Semi-active tags have a nearby physical power source, however, they still rely solely on the transmitted energy from the reader to power the communications. The energy from the battery is used to power external circuitry for say, remote monitoring applications. Semi-active tags can be read with readers designed for passive tags.




## Active




Active tags are powered with a nearby physical power source, and don't rely on the energy from the incoming RF signal. For this reason, they can have higher transmit powers, and therefore promote greater transmission distances between tag and reader.




# Power Limitations




Regulations normally use one of the two following units to regulate power:








	  * \(EIRP\) (equivalent isotropic radiated power). Used mainly in the U.S.A
	  * \(ERP\) (effective radiated power): Used mainly in Europe



Note that the two are related by the following equation:




$$EIRP = 1.64{ERP}$$




The free-space path loss equation is also useful for determining the transmission distance behaviour of a RFID system. The free-space path loss equation is:




$$FSPL = (\frac{4\pi df}{c})^2$$




where:  

 \(FSPL\) = free-space path loss (unitless)  

 \(d\) = distance between transmitter and receiver (meters)  

 \(f\) = signal frequency (Hertz)  

 \(c\) = speed of light in a vacuum (\(2.99792458108 \times 10^8 m/s\))










# Readers




Readers are also called interrogators. UHF readers typically have transmit powers from 5-32.5dBm (3-1000mW).




## **Modules**




Reader modules exist for integrating an RFID reader into an OEM product, and are typically around the size of a credit card, and are designed to be mounted on a PCB. Skyetek and Thingmagic make popular UHF RFID modules.



{{< figure src="/images/2012/11/thing-magic-m6e-rfid-reader-module-photo.png" width="415" caption="The M6e UHF RFID reader module from Skyetek. Image from http://rfid.thingmagic.com/collateral-download---m6e/." caption-position="bottom" >}}



## Chips




Stand-alone IC's also exist. The following image is the block diagram for the Texas Instruments TRF7960A 13.56MHz RFID transceiver IC. TI provides example C firmware code for this device on both the MSP430 and 32-bit ARM architectures.



{{< figure src="/images/2012/11/ti-trf7960a-rfid-ic-block-diagram.png" width="961" caption="The block diagram for the Texas Instruments TRF7960A 13.56MHz RFID transceiver IC. Image from http://www.ti.com/product/trf7960A." caption-position="bottom" >}}



# Tags




On-metal compatibility of tags is a big issue. Nearby metal objects cause RFID signal reflections that change the received/sent signal. There are special tags that are designed to work when mounted or near metallic objects. In some cases, due to the reflections, they can out-perform non-metallic mounted tags. The typical RFID chip architecture is shown below:



{{< figure src="/images/2012/11/typical-rfid-tag-chip-architecture-block-diagram.png" width="454" caption="The typical RFID tag chip architecture (block diagram). Image from http://www.nxp.com/documents/data_sheet/SL3S1203_1213.pdf." caption-position="bottom" >}}



Tags can be made with incredibly basic materials! Once such example is the RFID tag made with just a single AVR ATtiny chip and inductor, as shown in the image below. This is an incredible hack which uses multiple "dirty tricks" to work. [Here is a link to the original article by Scanlime](http://scanlime.org/2008/09/using-an-avr-as-an-rfid-tag/).



{{< figure src="/images/2012/11/single-attiny-and-inductor-makes-rfid-tag.jpg" width="500" caption="A RFID tag made from a single Atmel ATtiny and inductor! Image from http://scanlime.org/2008/09/using-an-avr-as-an-rfid-tag/." caption-position="bottom" >}}



There are apparel label categories that tags can be certified for, these are:





	  * A - Denim apparel
	  * B - Polybagged apparel
	  * C - Boxed items
	  * D - Hanging apparel



# Passive IC's




Murata makes a [MAGICSTRAP chip](http://www.murataamericas.com/rfid), which is a passive RFID device designed to be soldered onto a PCB for circuit board tracking and inventory management. The antenna is etched onto the PCB, and sections of the antenna make up the pads in which the chip is soldered to. It operates in the UHF band, and a 4-6m range is possible.



{{< figure src="/images/2012/11/murata-magic-strap-uhf-rfid-chip-on-pcb.jpg" width="401" caption="http://www.murata.eu/news/en/pr/pcb-mounted-rfid-tag-solution-from-MUR247." caption-position="bottom" >}}



# **Inlays/Labels**




RFID inlays are a popular way form of cheap, disposable RIFD tags. They are usually paper thin, flat, and contain both an embedded RFID chip and flat planar metallic antenna.



{{< figure src="/images/2012/11/alien-uhf-rfid-short-inlay-pattern.jpg" width="1218" caption="An example of the antenna/chip layout on a RFID UHF inlay. This image is of the Alien ALN-9662 'Short' inlay. Image from http://www.alientechnology.com/tags/index.php." caption-position="bottom" >}}



They commonly follow the layer makeup shown below:



{{< figure src="/images/2012/11/rfid-label-layer-makeup.png" width="215" caption="The layer makeup of a RFID label. Image from http://www.tageos.com/index.php?idpage=256&langue=eng." caption-position="bottom" >}}



Larger inlays give more room the antenna, giving longer read ranges. You can either get "dry" or "wet" inlays. Dry inlays have no adhesive on the back, while wet ones do. The difference between an inlay and a label is pretty ambiguous, but in general, an inlay is just the RFID chip, antenna, and supporting structure, while a label is an inlay coated in printable surface with adhesive on the back. The distance between one inlay and another also effects the read distance. There are special inlay-style tags that are suitable for when the tags are stacked within millimeters of one another.



{{< figure src="/images/2012/11/roll-of-uhf-rfid-inlays.jpg" width="306" caption="A roll of UHF RFID inlays. Image from http://hcaeditor.blogspot.co.nz/2011/07/want-some-salsa-with-your-chips.html." caption-position="bottom" >}}



The following image shows the dimensions of a typical inlay (the Tageos EOS-300), along with a graph of the measured read distances when it is attached to a number of different materials.



{{< figure src="/images/2012/11/tageos-eos-300-rfid-inlay-mechanical-dimensions-and-read-range-graph.png" width="959" caption="The dimensions of a standard inlay (the Tageos EOS-300), and the measured read ranges when it is attached on a different number of materials. Image from http://www.tageos.com/index.php?idpage=256&langue=eng." caption-position="bottom" >}}



A few select manufacturers make metal-capable UHF RFID inlays. As of 2012, they are still quite rare (as opposed to metal-capable tags, which there are more of). The following is a image of the Xerafy metal-capable UHF inlay.



{{< figure src="/images/2012/11/xerafy-mercury-rfid-inlay-metal-capable.png" width="1026" caption="The outline of the Xerafy 'Mercury' UHF RFID metal-capable inlay." caption-position="bottom" >}}



The following image shows a typical radiation pattern from an RFID inlay.



{{< figure src="/images/2012/11/rfid-uhf-inlay-radiation-pattern.png" width="1576" caption="A typical radiation pattern from an RFID inlay. Image from http://www.lab-id.com/datasheet/inlay_UHF/SKLI4218.pdf." caption-position="bottom" >}}



# Cables




RFID tags exist which use wire cables for their antennas. They normally look like a piece of wire (about 150mm long for a UHF version), with a piece of heatshrink in the middle. Compared to solid tags and inlays, they have the benefit of being very flexible and thin.




# Metal Compatible




Specialised tags/inlays exist for attaching/putting in close proximity to metal in where a normal tags range would be greatly limited/not work at all. They are normally more expensive than the standard RFID products. Xerafy makes a range of these metal-compatible tags/inlays. The article "Small Proximity Coupled Ceramic Patch Antenna For UHF RFID Tag Mountable On Metallic Objects" is an interesting read if you want to know more about metal-compatible RFID products. The following picture is a cross-section of the proposed antenna in the article.



{{< figure src="/images/2012/11/metallic-rfid-antenna-geometry-with-coupled-ceramic-patch.png" width="348" caption="A cross-section of the proposed antenna in the article 'Small Proximity Coupled Ceramic Patch Antenna For UHF RFID Tag Mountable On Metallic Objects'. Image from http://www.jpier.org/PIERC/pierc04/10.08061809.pdf." caption-position="bottom" >}}



# Antennas




The are different types of antenna used in different RFID designs. UHF antenna input is typically between 1-5W. 13.56MHz antennas between 100-200mW. Antennas can either be stand-along items, or part of a substrate/PCB. [AN1715: UHF RFID PCB Antenna Design](http://www.nxp.com/documents/application_note/AN171530.pdf) by NXP explains how to design an PCB-based UHF RFID antenna. One of the key parameters of an antenna is it's gain. The gain is usually expressed in \(dBi\) (decibels isotropic), or more rarely, \(dBd\) (decibels relative to a lossless half-wave dipole antenna). To convert between \(dBi\) and \(dBd\), use the following equation:




$$dBi = dBd + 2.15dB$$




Smith charts are useful when designing impedance matching circuits between the antenna and RFID transceiver. A great free Smith chart program is [Smith by Fritz Dellsperger](http://www.fritz.dellsperger.net/).



{{< figure src="/images/2012/11/example-smith-chart-from-smith-program-for-windows.png" width="353" caption="Screenshot of an example Smith chart generated by Smith, a windows program by Fritz Dellsperger (http://www.fritz.dellsperger.net/)." caption-position="bottom" >}}



The following diagram is of a planar PCB 13.56MHz RFID antenna design, recommended by Texas Instruments (TI). TI states in Application Report SLOA135: Antenna Matching for the TRF7960 RFID Reader that,




<blockquote>

> 
> "A rule of thumb is that the expected read range is twice the antenna diagonal measurement."
> 
> 
</blockquote>



{{< figure src="/images/2012/11/rfid-13-56mhz-typical-pcb-antenna-circuit-diagram-with-dimensions.png" width="331" caption="Diagram of a typical 13.56MHz planar PCB antenna. Image from http://www.ti.com/lit/an/sloa135/sloa135.pdf." caption-position="bottom" >}}



## Properties




**Front-to-Back Ratio:** The ratio (in dB) of the gain in the maximum direction vs. the gain of that 180° away from the maximum direction. Typical values for UHF antennas are around 20dB. It is a measure of the directionality of an antenna.




## Linear Polarization (Dipole)




The best method if the tag orientation (with respect to the reader) is known and fixed.




## Circular Polarization




The best method when the tag orientation could be anything. You lose at least 3dB of signal when using this method compared to linear polarization. A circular polarized antenna is not necessarily circular in shape, it's to do with the fact the emitted electromagnetic wave's electrical and magnetic components rotate 360° once every wavelength. You can get "left" or "right" polarized waveforms. Some antennas which are circularly polarized are:





	  * PCB slot antennas: Lengths between 20-50mm for UHF RFID is common on 1.6mm thick PCB



# Standards




## EPC Global Class 1 Generation 2 UHF Air Interface Protocol Standard "Gen 2"




One of (possibly the) most common standard for UHF RFID. Also called the EPC Global C1G2 standard. The international standard organization made it an amendment of the ISO18000-6C standard in 2006. A quote from the standards website:




<blockquote>

> 
> "Commonly known as the "Gen 2" standard, this standard defines the physical and logical requirements for a passive-backscatter, Interrogator-talks-first (ITF), radio-frequency identification (RFID) system operating in the 860 MHz - 960 MHz frequency range. The system comprises Interrogators (also known as Readers), and Tags (also known as Labels)."
> 
> 
</blockquote>




## ISO/IEC 11784/11785




Standards for RFID tags on animals.




## ISO/IEC 14443




Standard for RFID ID cards operating at 13.56MHz.




## ISO/IEC 15693




A standard for HF RFID. Also called I-Code 2, I-Code STL, or C370. It defines the frequency (13.56MHz) and the communication methods (but not the data itself, this is vendor specific).




## ISO/IEC 18000-3




Part 3 of the ISO/IEC 18000 standard. It is a standard for passive RFID item identification operating at 13.56MHz. This standard contains "3 non-contending nodes",which are:





	  * Mode 1: Based on ISO/IEC 15693
	  * Mode 2: High-speed interface
	  * Mode 3: High-speed interface with 2 options. Option 1 is ASK based, option 2 is JSK based. Both use the same command interface as 18000-6C to be compatible with EPCglobal.



Is is specially designed for high-performance tag reading when the tag antennas are small and closely packed. They can employ phase-jitter modulation (PJM) to read closely packed tags.




## ISO/IEC 18000-6C




Part 6 of the ISO/IEC 18000 standard. Defines parameters for RFID operating between 860-960MHz (UHF RFID). The EPC Global Class 1 Generation 2 UHF Air Interface Protocol Standard "Gen 2" standard was amended to this standard in 2006.




# Recycling




Aside from recycling the RFID tag itseld, RFID tags also affect the the recycling of the product it is attached too. The presence of paper, aluminium, copper, gold and silver in the RFID tag can introduce new challenges to the recycling of the product. The cost of an RFID tag is low and still dropping, reducing the incentive to recycle it. Active tags, mainly because of the battery, are considered electronic equipment under the European WEEE directive, and has to be recycled under the appropriate regulations. Passive tags are outside the WEEE scope. There are special glues/adhesives which facilitate the removal of the RFID tag from the product it is attached to. A current area of research (as of 2013) are biodegradable tags that degrade naturally on paper products.




# RFID Software




Most RFID reader development kits come with suppporting software to get a RFID project started quickly. They usually provide a PC-based GUI which connects to the reader via Ethernet, USB, or serial, can provides a readout of tags that are in range (and shows you things like their ID and RSSI), and allows you to adjust things like read interval and read power.



{{< figure src="/images/2012/11/uhf-rfid-tag-read-results-astra-ex-to-usa.png" width="1042" caption="Readout of RFID tags in the near vicinity by the ThingMagic AstraEX." caption-position="bottom" >}}



## RFdump




Website: [http://www.rf-dump.org/](http://www.rf-dump.org/) In their own words:




<blockquote>

> 
> RFDump is a backend GPL tool to directly interoperate with any RFID ISO-Reader to make the contents stored on RFID tags accessible.
> 
> 
</blockquote>




It is a computer program, that when connected with standard RFID hardware, can read and write to a number of RFID tags. It has a strong "hacker" feel to it.




# Manufacturers/Suppliers




You can use [www.veryfields.net](http://www.veryfields.net/) to do a parametric search for RFID tags. They require you to register to do search with all of the parameters, but registration is free.




<blockquote>

> 
> VeryFields is the world’s largest showcase of RFID tags and provide RFID professionals with the best search tool for finding the best RFID tags for their needs.
> 
> 
</blockquote>




**LF**




[Priority 1 Design](http://www.priority1design.com.au/rfid_reader_modules.html) make LF reader modules.




**HF**




[Skyetek](http://www.skyetek.com/) make HF and UHF reader modules.




**UHF**




[Impinj](http://www.impinj.com/) is a leading UHF RFID designer/manufacturer. They make the [Monza family](http://www.impinj.com/Monza_X_RFID_Chips.aspx) of RFID tag chips.




[Alien](http://www.alientechnology.com) is another leading UHF RFID manufacturer. They make the Alien Higgs-H2, -H3, -H4 range of chips as well as a varied range of inlays.




[NXP](http://www.nxp.com/) manufacture the [HiTAG (LF), ICODE (HF), and UCODE (UHF) range of RFID tags](http://www.nxp.com/products/identification_and_security/smart_label_and_tag_ics/). These feature GPIO for simple open/closed circuit detection and also data communication with other chips.




[Tageos](http://www.tageos.com) is a manufacter of UHF RFID inlays, using Alien or Impinj chips.




[Skyetek](http://www.skyetek.com/) make HF and UHF reader modules.




[Unique Micro Design](http://www.umd.com.au/) is a oceania region supplier of RFID products, based in Australia.




**Printers**




[Zebra](http://www.zebra.com) make [RFID label printers](http://www.zebra.com/us/en/products-services/printers/printer-type/rfid.html).




# External Links




[SkyRFID](http://www.skyrfid.com/) is a useful site which explains how RFID works.
