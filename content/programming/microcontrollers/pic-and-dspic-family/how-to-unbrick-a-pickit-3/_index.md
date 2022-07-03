---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Embedded", "Microcontrollers" ]
date: 2014-04-14
draft: false
lastmod: 2022-07-03
tags: [ "unbrick", "bricked", "PICkit", "PICkit 3", "Microchip", "programmer", "microcontroller" ]
title: "How To Unbrick A PICkit 3"
type: "page"
---

## Overview

You can quite easily brick a PICkit3 when using it with the buggy standalone apps Microchip has written (especially when attempting to download the standalone OS to it). Here is how to unbrick a unresponsive PICkit3.

## You Will Need

Aside from the bricked PICkit3 you a trying to fix, you will also need:

* A working PICkit3 to program the bricked PICkit3 with.
* A standard 6-pin, 2.54mm header strip and some small bits of wire for converting `J2` on the bricked PICkit3 into a something we can program with the working PICkit3
* The standalone PICkit3 v3.01 or similar application written by Microchip that allows you to program with the PICkit3 (it also provides the hex file we will be downloading to the bricked PICkit3).

## Unbricking Steps

1. Remove the PCB from the PICkit 3 enclosure. The connections we are interested in for programming a those circled in yellow (J2).  
  
     {{< figure src="/images/2014/04/01-opening-up-the-pic-kit-3-edit.jpg" width="494px" caption="Opening up the bricked PICkit3. The programming header we are interested in (J2) is circled in yellow."  >}}  
  
2. The exact PICkit3 I had contained the text `Microchip PICkit 3 Assembly No. 02-02038` (on the top side) and `04-02038 REV C` (on the bottom side). Solder a 6-pin 2.54mm pitch male header with wires onto the header J2 (unfortunately you can't solder it directly on, as it is the wrong pitch). Notice that the silkscreen for J2 has a little notch a one end indicating pin 1.  
  
    {{< figure src="/images/2014/04/02-soldering-on-a-6-pin-header.jpg" width="591px" caption="Soldering on a 6-pin 2.54mm header to J2 on the bricked PICkit3. If you make the wires short enough, you can leave this header on and fit it back into the enclosure without any problems."  >}}  
  
3. Connect a working PICkit3 to this header, noting that pin 1 on the programmer (the working PICkit3), which is the white arrow, matches up with the white notch on header J2 on the bricked PICkit3.  
  
    {{< figure src="/images/2014/04/03-connecting-up-another-working-pic-kit-3-programmer.jpg" width="1000px" caption="Connecting up a working PICkit3 to the bricked PICkit3. Notice the polarity of the white arrow on the working PICkit 3 with the notch on J2."  >}}  
  
4. Load up the stand-alone PICkit 3 v3.01 programmer application. The microcontroller inside the PICkit3 is the `PIC24FJ256GB106-I/PT`, so you have to select `PIC24` from the `Device Family` menu.  
  
    {{< figure src="/images/2014/04/04-select-pic-24-from-device.jpg" width="429px" caption="Selecting 'PIC24' from the 'Device Family' menu in the PICkit 3 v3.01 standalone programmer."  >}}  
  
    Once connected, you should see something like this...  
  
    {{< figure src="/images/2014/04/05-isp-prog-the-pic-kit3-pic24-device-found.png" width="445px" caption="Bricked programmer microcontroller has been detected."  >}}  
  
5. Now you have to select the PICkit3 firmware to upload to the bricked PICkit3. Select `File->Import Hex` and then select the file `PK3IMG020005.hex` which should be in `C:\Program Files (x86)\Microchip\PICkit 3 v3\` or similar (on Windows). Note that the PICkit 3 software has to be installed for this file to be present (as per the requirements above).The hex file should be about 962KB in size.  
  
    {{< figure src="/images/2014/04/06-select-the-pic-kit-3-os-image.png" width="985px" caption="Select the PICkit3 hex file 'PK3IMG0200005.hex' from 'C:/Program Files (x86)/Microchip/PICkit 3 v3' or similar."  >}}
    
6. Hit "Write". It could take up to 20s to program, and appear to freeze, but don't worry, you should end up seeing something like this...  
  
    {{< figure src="/images/2014/04/07-programming-successful.png" width="412px" caption="Programming was successful!"  >}}  
  
7. The PICkit 3 should now be unbricked!  
  
    {{< figure src="/images/2014/04/08-led-on-its-now-fixed.jpg" width="455px" caption="The bricked PICkit3 is now fixed, the LED's come on correctly!"  >}}  
8. If you want to keep the programming header attached just in case it happens again, I suggest wrapping tape around the header so that you don't cause any shorts.  
  
    {{< figure src="/images/2014/04/10-taping-up-the-header-to-prevent-shorts.jpg" width="1000px" caption="Taping up the header to prevent shorts. I decided to keep this attached just in case it happens again..."  >}}  
  
9. The unbricked PICkit3 can now be put back in its case!
  
    {{< figure src="/images/2014/04/09-putting-the-pic-kit-3-back-in-its-enclosure.jpg" width="449px" caption="Putting the now un-bricked PICkit3 back into it's enclosure, with the programming header still attached (it fits quite nicely)."  >}}
