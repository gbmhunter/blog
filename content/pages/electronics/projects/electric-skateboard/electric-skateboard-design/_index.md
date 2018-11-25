---
author: gbmhunter
date: 2011-09-06 06:38:10+00:00
draft: false
title: Electric Skateboard Design
type: page
url: /electronics/projects/electric-skateboard/electric-skateboard-design
---


	  * The Skateboard That Started It All...



# The Skateboard That Started It All...


{{< figure src="/images/electronics-electricskateboard-firstprototype/first-skateboard-top-view.jpg" caption="Top view of the first skateboard." caption-position="bottom" width="400px" >}}

I brought this electric skateboard of a friend for NZ$20. This is what started my craze to build something better, faster, harder, stronger (did I get that in the right order?). This board comes fitted with a 120W brushed DC motor, which does get you places, but not quickly. It is powered by two 12V lead-acid batteries, which make it quite heavy. I managed to get about 5-6km from this board before it would crap out, leaving me to drag the thing the rest of the way home. Admittedly, the batteries weren't in the best of condition, being many years old and having no charge/discharge activity in a long time. It's operated by pressing down on a big button with your foot on the top of the board (it has one speed and one speed only).
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/first-skateboard-front-wheels.jpg" caption="The front axle and turning system of the first electric skateboard" caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/first-skateboard-bottom-view.jpg" caption="The bottom side of the first electric skateboard." caption-position="bottom" width="300px" >}}
</td>
</tr>
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/first-skateboard-motor.jpg" caption="The small 120W motor in the first electric skateboard." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/first-skateboard-motor-and-wheels.jpg" caption="The drive chain of the first electric skateboard." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>


# Finding A Motor


The first thing to do was to find a new motor. The motor could possibly be the single most important part of the skateboard design. The motor is one of the primary factors in deciding how fast the board will go, the amount of power drawn from the battery, the acceleration/deceleration, and the ability to climb up hills (essentially the torque).

A skateboard requires a fairly powerful motor (in a non-commercial sense). The NZ$20 second-hand el-cheapo china skateboard mentioned above barely made it to 20km/h after 10 seconds at full throttle. Some of the more powerful commercial ones have a 500-800W motor on-board. Every single board I saw used a brushed DC motor (BDC). These are simple to control, but wear out faster and more importantly have a small power-to-weight ratio.

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6210.jpg" caption="A supposedly '3kW' BLDC motor I got from Hobby King." caption-position="bottom" width="400px" >}}

I decided to use the brushless DC (BLDC) motor shown above. BLDC motors have an awesome power-to-weight ratio and high efficiency (90%+), which will extend the distance the board can travel. This is at the expensive of being slightly harder to control (see the page [BLDC Motor Control](http://blog.mbedded.ninja/electronics/circuit-design/bldc-motor-control) for more on that).


# The ESC


Designing a control system for a BLDC motor is not trivial, so I decided to use an off-the-shelf ESC (electronic speed controller).

{{< figure src="/images/electronics-electricskateboard-firstprototype/bldc-esc-size-comparison.jpg" caption="A size comparison of the BLDC ESC (electronic speed controller)." caption-position="bottom" width="400px" >}}


# Battery


I decided to get a 29.6V, 5800mAh Li-Po (full details on the Hardware page). This gives it 171.68Wh's of energy (it can supply 172W for 1 hour, or 343W for 30mins e.t.c).

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6221.jpg" caption="A lithium-ion polymer battery from Hobby King." caption-position="bottom" width="400px" >}}

I also got this multi-chemistry battery charger shown below to charge it.

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6228.jpg" caption="A multi-chemistry battery charger from Hobby King." caption-position="bottom" width="400px" >}}


# Wheels And Axles


The wheels and axles where brought of TradeMe, New Zealands equivalent of eBay. I needed axles and wheels that would allow me to transfer power from the motor somehow. After much consideration, and tossing up the idea of making them myself, I decided to buy some axles and wheels that were designed for skateboards in the first place (half-cheating, I know, but it would of added so much more work to the project, and it had enough already).

There were two wheel/axle variants, a smaller package for street only use and a larger package for off-roading. I decided to go with the off-road version. They are huge! The wheels are self-sealing pneumatic tires and the axles are huge (and heavy :-(...). Although this adds a decent amount of weight to the board, they will be able to take on shallow curbs and ruts which I was worried about when flying down the streets in the dark. Being large they offer more side-to-side stability, but also increase the centre of weight, which is bad for stability. It's a healthy compromise...
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/skateboard-wheels-and-cog.jpg" caption="The wheel cog which is driven from the motor by a belt." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/skateboard-wheel-size-comparison.jpg" caption="A size comparison of the skateboard wheels." caption-position="bottom" width="300px" >}}
</td>
</tr>
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/skateboard-wheel-motor-mount.jpg" caption="The wheel motor mount, next to one of the back wheels." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/skateboard-axle-and-wheels.jpg" caption="The skateboard wheels and axle." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>


# Drive Cog


The drive cog was brought from the same place as the wheels and axles. Fortunately, the cog was designed for a 10mm shaft, exactly what my motor shaft happened to be. However, the cog was a 'D' type so it could deliver torque, while the motor shaft was circular. Thankfully, the kind folk at [Nivens Engineering](http://www.nivenengineering.co.nz/)[ ](http://www.nivenengineering.co.nz/)were able to machine a D into the shaft, as well as drilling and treading a hole in the side of the cog for a retaining grub screw.


{{< figure src="/images/electronics-electricskateboard-firstprototype/cog_02.jpg" caption="The grub screw added to the cog." caption-position="bottom" width="400px" >}}





# Mounting The Motor To The Rear Axle


The motor mount on the rear axle was not designed for the BLDC motor (it was designed for a larger 800W brushed motor). To fix the motor in the correct position I had to drill new holes in the mount. Luckily, the BLDC motor came with it's own mounting bracket, and even luckier was that it fitted quite nicely inside the original motor mount, needing minimal modifications. Notice the difference in size between the expected motor and the BLDC! And note that this smaller motor is 4-5 times more powerful, and lighter (ahem, as "they" quote, keep reading to find out why this figures may be wrong)!


{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6314.jpg" caption="The BLDC motor mounted onto the electric skateboards axle." caption-position="bottom" width="400px" >}}





# The Prototype Motherboard


The first prototype control circuitry (aka motherboard), was assembled on strip-board. I used an ATmega8L-8PC microcontroller since the [DIP package](http://localhost/?q=node/50) makes it easy to hand solder into strip board, requiring no breakout PCB.
<table style="width: 850px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/sam_0136.jpg" caption="The first electric skateboard prototype circuit." caption-position="bottom" width="400px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/sam_0138.jpg" caption="The first electric skateboard prototype circuit up close." caption-position="bottom" width="400px" >}}
</td>
</tr>
</tbody>
</table>


# Wireless Control


I wanted to be able to hold down a trigger in my hand to control the motor speed wirelessly. To do this I used the MaxStream XBee module, a 'plug and play' wireless module that accepts standard TTL serial input and output. It is used in 'Transparent Mode' (non API), making it very easy to use (you don't have to worry about packetising the data or using a defined structure on the data).

{{< figure src="/images/electronics-electricskateboard/xbee-wireless-module.jpg" caption="The wireless Xbee module I used for communication with the Electric Skateboard wireless remote." caption-position="bottom" width="500px" >}}

To make prototyping easier, I created a breakout board for the Xbee (the module has nasty non-prototyping-friendly 2mm pitch connectors). I managed to sneak this PCB in with a bunch of other that were being made by the University I was studying at, so these were done for free!

{{< figure src="/images/electronics-electricskateboard/xbee-on-breakout-board-01.jpg" caption="The Xbee module on a homemade breakout board." caption-position="bottom" width="600px" >}}

However, if you want your own Xbee breakout board, I suggest you look on [SparkFun](http://www.sparkfun.com/). They have much better looking and cheaper [Xbee breakout boards](https://www.sparkfun.com/products/8276), along with [Dongles](https://www.sparkfun.com/products/9819), so that you can customise the way the Xbee module works with the free X-CTU software.

The first wireless controller looked awesome, if your a prototyping geek like me. However, any product designer would of barfed as soon as they glimpsed at it's rat's nest of cables and  duct tape.

{{< figure src="/images/electronics-electricskateboard-secondprototype/testing-the-pwm-with-remote-and-light-bulb.jpg" caption=" " caption-position="bottom" width="700px" >}}


# RPM Counter


I needed to measure the RPM range of the motor to work out what gearing I needed between the motor and the wheel. To do this I glued a section of KNEX (basically a plastic rod) onto the rotor and placed an infrared emitting diode and transistor either side of the KNEX.

{{< figure src="/images/electronics-electricskateboard-firstprototype/rpm-counter-01.jpg" caption="A bit of KNEX was glued onto the motor to interrupt the infrared beam twice per revolution.," caption-position="bottom" width="400px" >}}

When the motor spun, the infrared transistor would essentially switch from 'off' to 'on' when the beam was blocked by the KNEX. This happened twice per revolution and I could measure this on my oscilloscope. The infrared diode and transistor set-up to the left of the motor. My old-school oscilloscope picking up the rod cutting the infrared beam twice per revolution.

{{< figure src="/images/electronics-electricskateboard-firstprototype/rpm-counter-02.jpg" caption="The RPM counter output on the oscilloscope." caption-position="bottom" width="400px" >}}

Table showing the calculations for working out the maximum and minimum rpm of the motor.


# Power Requirements


The power requirements of the circuits and motor determine the run time of both the skateboard unit and the remote control. They also determine the size and complexity of the power circuitry. Larger power requirements demands larger heatsinks, or better efficiency voltage conversion circuitry (e.g. a simple and cheap inefficient linear voltage regulator versus a more complex but efficient switch-mode power supply).


### Skateboard Power Requirements


The skateboard power is largely used by the 800W (max) motor. A small amount will be taken up the LED lighting (both front/rear and skirting lights), a smaller amount by the comms, and a tiny amount by the micro-controller itself. A breakdown of the power usage is below:

The battery voltage is nominally 48V, although this can be as high as 53V and as low as 42V depending on the charge. This is dropped down to 12V by a switch-mode power supply for the lights. Two linear voltage regulators drop the voltage even further to 3.3V for the digital circuitry.


### Remote Power Requirements


The remote uses far less power than the board, and is largely consumed by the comms and leds. The remote is powered from a 9V Ni-MH battery with a capacity of 180mAh (I'm hoping to get some higher capacity 300mAh battery as the run time is currently only about an hour). This is dropped down to 3.3V by a linear voltage regulator to power all of the circuity.


# 




# Electric Skateboard v1.0


{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-01-29-13-55-47.jpg" caption="Drilling holes in a plank of wood to attach the axles to a test skateboard." caption-position="bottom" width="150px" >}} The test board was to make sure the basic principle worked, and to make sure I hadn't done something fundamentally wrong such as brought motor that was utterly too small or wheels/gear-ratio combo that wouldn't work properly. The mechanical part was as simple as mounting the axles onto a piece of MDF.

The proto-type electronics were stuck onto the top, and after lots of testing and debugging, I finally managed to get it moving! With code bugs and problems using the RC trigger pot, I wasn't able to get the electric skateboard up to full speed, but I still managed to break the 30km/h mark. The [ESC](http://localhost/?q=content/hardware) got damn hot! This may need heatsinking in the future...

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6323.jpg" caption=" " caption-position="bottom" width="400px" >}}

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6338.jpg" caption=" " caption-position="bottom" width="400px" >}}

{{< figure src="/images/electronics-electricskateboard-firstprototype/sam_0138.jpg" caption="The first electric skateboard prototype circuit up close." caption-position="bottom" width="400px" >}}

After fixing up the code, it was time to take the board a little further down the road. I decided to heatsink the ESC to the trucks after discovering it was burning hot after the last test. I covered the heatsink side of the [ESC](http://localhost/?q=content/hardware) with heat transfer compound and duct taped it securely to the rear truck.

{{< figure src="/images/electronics-electricskateboard-firstprototype/adding-silicone-heat-transfer-to-esc.jpg" caption="Adding silicone heat transfer paste to the ESC for better heatsinking." caption-position="bottom" width="400px" >}}

I also thought it would be nice to 'mount' all the electronics on the underside of the board.

Getting ready for a test run to work!

{{< figure src="/images/electronics-electricskateboard-firstprototype/getting-ready-to-test-ride.jpg" caption="Getting ready to test ride the electric skateboard." caption-position="bottom" width="400px" >}}


# An Explosion


Unfortunately, the BLDC ESC blew up about half way to work (a few kilometers into the test run). My best guess is that both the RC plane designed motor and  controller were under-powered for the job (even though rated well enough). The picture on the right shows the blown ESC.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/smoked-esc-01.jpg" caption="The blown-up ESC." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-firstprototype/smoked-esc-02.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>


# The New Motor + Battery


However, after I made the change from a BLDC to brushed-DC motor, I made an upgrade to a 48V, 10Ah LiFePO battery! However, the first battery they sent was the wrong size (I had ordered a flatter shape, could you see this fitting on the bottom of a skateboard?).

{{< figure src="/images/electronics-electricskateboard-secondprototype/img_6614.jpg" caption=" " caption-position="bottom" width="400px" >}}

And along with this battery, I got a brushed DC motor.

{{< figure src="/images/electronics-electricskateboard-secondprototype/bdc-motor-01.jpg" caption="The new 800W, 36V brushed motor I got after the BLDC motor blew up." caption-position="bottom" width="400px" >}}

The electronics mounted onto the top of the second prototype.

{{< figure src="/images/electronics-electricskateboard-secondprototype/img_6639.jpg" caption="The electronics mounted onto the top of the second prototype board." caption-position="bottom" width="400px" >}}


# Custom Half-Bridge


The next attempt at motor control was done, using a brushed DC motor and a homemade half-bridge controller.

{{< figure src="/images/electronics-electricskateboard-secondprototype/img_6628.jpg" caption=" " caption-position="bottom" width="400px" >}}

Alas, it kept blowing up (see the post [Skateboard H-Bridge Blew Up (for the +10th time](http://blog.mbedded.ninja/electronics/electronics-electric-skateboard/skateboard-h-bridge-blew-up-for-the-10th-time)). The MOSFETs were getting very warm, and there was an oscillating signal on the gates of the half-bridge MOSFETs.

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-02-18-16-17-26.jpg" caption="The oscillating gate drive to the MOSFETs." caption-position="bottom" width="500px" >}}

I was also getting oscillations on the half-bridge bus voltage (+48VDC). The bulk capacitor was getting very warm.

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-02-23-19-44-58.jpg" caption="The huge oscillations on the bus voltage (yellow) when the high-side MOSFET was turned on (low-side shown turning off in blue). This was due to me not putting enough bulk capacitance on the rail. Only 100uF was present when taking this picture." caption-position="bottom" width="500px" >}}

It turns out I did not have enough bulk capacitance, causing the voltage to oscillate due to the MOSFET switching. This was causing high currents through the bulk capacitor and heating it up due to its parasitic resistance (equivalent series resistance, or ESR). I only had 200uF, which is pretty insignificant. The following image show the initial bulk capacitor hanging of the side (it wasn't enough).

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-02-18-17-08-57.jpg" caption=" " caption-position="bottom" width="500px" >}}


# Alarm Prototype


I wanted a motion alarm on the skateboard so I could "arm" it when locking it to a bike rack in public places.

I used the MS24 motion sensor.

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-03-04-21-17-27.jpg" caption="The MS24 motion sensor (works in any direction, unlike most tilt sensors)." caption-position="bottom" width="300px" >}}

And built this test circuit on breadboard. There is a PSoC development kit in the background.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-03-08-21-37-14.jpg" caption="The BJT full-bridge used to drive the alarm speaker." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-03-08-21-36-14.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>


# The Final PCB Design




Once the electronic design had been verified with the prototypes, it was time to get some professional PCB's made. The PCB's were designed in Altium. I used a PSoC 5 [microcontroller](http://localhost/?q=node/56) from Cypress for the final designs.



<table style="width: 800px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/schematic-collage.jpg" caption="A collage of the 5 schematic sheets that make up the remote circuit. Most of them were pretty sparse except for the microcontroller sheet." caption-position="bottom" width="250px" >}}
</td>

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/collage-remote.jpg" caption=" " caption-position="bottom" width="250px" >}}
</td>

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/half-bridge.jpg" caption=" " caption-position="bottom" width="250px" >}}
</td>
</tr>
<tr >

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/board-2d.jpg" caption="2D PCB design of the mother-board, showing the top and bottom tracks." caption-position="bottom" width="250px" >}}
</td>

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/remote-pcb-2d-bottom.jpg" caption=" " caption-position="bottom" width="250px" >}}
</td>

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/half-bridge-2d.jpg" caption="2D PCB design of the half-bridge, showing the top and bottom tracks." caption-position="bottom" width="250px" >}}
</td>
</tr>
<tr >

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/board-3d-front.jpg" caption="3D model of the motherboard." caption-position="bottom" width="250px" >}}
</td>

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/remote-pcb-3d-model-back-side.jpg" caption="3D model of the bottom side of the remote PCB v2." caption-position="bottom" width="250px" >}}
</td>

<td style="text-align: center;" >{{< figure src="/images/electronics-electricskateboard/half-bridge-3d-front.jpg" caption="3D model of the half-bridge motor controller. In case you were wondering, the 8 large cylindrical thingys are bulk capacitors." caption-position="bottom" width="250px" >}}
</td>
</tr>
</tbody>
</table>


# 




# The Schematics




## Motherboard PCB


The schematics for the motherboard are shown below.

[gview file="/images/2011/09/Electric-Skateboard-Motherboard-v1.1-Schematics.pdf"]


## Remote Control PCB


The schematics for the remote control are shown below.

[gview file="/images/2011/09/Electric-Skateboard-Remote-v1.1-Schematics.pdf"]


## Motor Driver PCB


The schematics for the Half Bridge Driver v1.1 (please remember, this is the one that kept blowing up) are shown below. From v1.0->v1.1, I removed the low-side MOSFET switch that was designed to disconnect the battery. This didn't work when tested, so I replaced it with a high-current relay instead (still operating from the same key-switch). I'm still at a loss to as why this did not work. I made multiple prototypes, and enlisted help/advice from many engineering friends and even a 40-year old motor control and design veteran, yet still coaxed the magic smoke out of ever PCB I tested.

[gview file="/images/2011/09/Half-Bridge-Driver-v1.1-Schematics.pdf"]


# PCB Manufacturing


Once the PCB's were designed, I had them etched by [PCB Cart](http://www.pcbcart.com/) (see the [Electrical Suppliers page](http://blog.mbedded.ninja/electronics/other/electrical-suppliers)). The PCB's came back in a colour what I like to call 'spew orange', which was less than ideal, since I wanted orange.

{{< figure src="/images/electronics-electricskateboard/2012-04-04-15-45-02.jpg" caption="This photo shows the gross orange colour of the electric skateboard PCB's compared to the kind of yellow I was expecting." caption-position="bottom" width="500px" >}}

I got to the point where PCB Cart would redo them in red if I paid for half the manufacturing cost. They came back with a much better colour scheme (and you can actually read the silkscreen).

{{< figure src="/images/electronics-electricskateboard/2012-04-25-13-28-16.jpg" caption=" " caption-position="bottom" width="500px" >}}

See the post [Electric Skateboard PCB’s Arrived In The Wrong Colour](http://blog.mbedded.ninja/electronics/electronics-electric-skateboard/electric-skateboard-pcbs-arrived-in-the-wrong-colour) for more info. Most of the components were populated by hand, with the help of a infrared rework station for soldering the PSoC 5 chips (in TQFP packages).

{{< figure src="/images/electronics-electricskateboard/2012-04-27-18-48-39.jpg" caption=" " caption-position="bottom" width="500px" >}}

The hardest things to solder were the transistors for the speaker h-bridge. They were in the tiny 6-pin packages shown below.

{{< figure src="/images/electronics-electricskateboard/2012-05-14-18-33-17.jpg" caption="One of the hardest packages to solder on the electric skateboard PCB's, these tiny 6-pin packages were for the full-bridge transistors that drove the speaker." caption-position="bottom" width="500px" >}}

I designed the half-bridge motor controller high-current tracks to have no soldermask. This enabled me to thicken up the tracks with solder.

{{< figure src="/images/electronics-electricskateboard/2012-06-02-17-54-43.jpg" caption="Thickening the current-carrying tracks on the half-bridge PCB." caption-position="bottom" width="500px" >}}

I also put all of the MOSFETs on the half-bridge in a row, so that I could easily attach a heatsink to them. The heatsink was made from a piece of Aluminium "T-section".

{{< figure src="/images/electronics-electricskateboard/2012-06-03-11-51-17.jpg" caption="I put all of the MOSFETs on the half-bridge in a row, so that I could easily attach a heatsink to them. The heatsink was made from a piece of Aluminium 'T-section'." caption-position="bottom" width="500px" >}}

The finished motherboard.

{{< figure src="/images/electronics-electricskateboard/2012-06-03-12-52-13.jpg" caption="A photo of the populated motherboard." caption-position="bottom" width="500px" >}}

The finished half-bridge motor controller (which didn't work).

{{< figure src="/images/electronics-electricskateboard/2012-06-03-12-26-59.jpg" caption="A photo of the populated half-bridge driver. Note that this didn't work, I ended up replacing it with one brought from AliExpress." caption-position="bottom" width="500px" >}}


# Writing/Testing Firmware


I ran into plenty of mysterious problems while testing the firmware, such as LEDs randomly turning on and off, microcontrollers programming and then refusing to be recognised, and more. I eventually discovered the problem was the flux I had used, Fluxite, which it actually a plumbers flux and not designed for electronic circuits. The flux residue (present even when the PCBs were ultrasonically cleaned), absorbed water and became conductive, causing micro shorts all throughout the circuits.

{{< figure src="/images/electronics-electricskateboard/2012-05-21-21-13-45.jpg" caption="Fluxite, soldering paste which caused all sorts of problems since it is a plumbers flux which is not designed for electronics." caption-position="bottom" width="500px" >}}

I managed to blow up and Xbee and PSoC microcontroller while testing. I accidentally connected two circuits with grounds at a potential difference of over 30V.

{{< figure src="/images/electronics-electricskateboard/2012-05-29-18-04-31.jpg" caption="The fried PSoC and Xbee module after I accidentally connected two circuits with grounds at a potential difference of over 30V. Purple sparks and smoke came from the PSoC, but I was surprised that the Xbee died too." caption-position="bottom" width="500px" >}}

I was very happy once the PCBs finally powered up and were working correctly.

{{< figure src="/images/electronics-electricskateboard/2012-05-14-22-38-35.jpg" caption=" " caption-position="bottom" width="500px" >}}


# Fibreglassing


The final board was made from fibreglass and plywood. Here is an image of all the gear I used.

{{< figure src="/images/electronics-electricskateboard-fibreglassing/gear-for-fibreglassing.jpg" caption="The basic gear you need for fibreglassing." caption-position="bottom" width="500px" >}}

The skateboard 'board'  is hand-made from fibreglass and plywood. The structural part is made from two layers of 4mm thick, 3ply wood with 3 layers of Fibreglass chop stran mat in the middle, held together with polyester resin.

{{< figure src="/images/electronics-electricskateboard-fibreglassing/just-before-the-boards-are-sandwidched-together.jpg" caption="Wet fibreglass, taken just before the plywood was sandwidched together." caption-position="bottom" width="500px" >}}

The two pieces of plywood and wet (at the time) fibreglass were pressed together by adding weights onto the top of the board while it was on a flat surface. The board was not curved as some (well, most) longboards are since it would have taken way too much time (this project took enough time already!), and would have made it hard to mount the battery and electronics to the underside of the board. The resin was mixed with 1% catalyst (10mL catalyst for every litre of resin) to provide long enough time to work with the board (it was the middle of summer, so the resin would set quickly). It is not advisable to fibreglass so many layers at once, but I managed to get away with it. The plywood was roughened with 40grit sandpaper to improve adhesion with the fibreglass.

When making the board for the first time, I accidentally added 1mL of catalyst per litre instead of 10mL (it's meant to be 1%, oops!). This meant the resin didn't set, and I was lest with a stick mess of wood, fibreglass and goop. I had to throw out the entire board and start over again. It was about a NZ$60 mistake

{{< figure src="/images/electronics-electricskateboard-fibreglassing/adding-weight-to-compress-boards.jpg" caption="Adding whatever I could find from around the house to add weight ontop of the boards while the fibreglass resin was setting." caption-position="bottom" width="500px" >}}

There is a layer of thin fibreglass 'Airplane' cloth on the top and bottom sides of the plywood to provide a fibreglass surface for the gell-coat paint (gell-coat paint does not stick well to wood). This cloth is so thin that it does not add any mechanical strength to the board, or much weight. It used about 100mL or resin per side.

{{< figure src="/images/electronics-electricskateboard-fibreglassing/the-fibreglass-weave-used-for-top-and-bottom-finishes.jpg" caption="The fibreglass 'Aircraft Cloth' used to the top and bottom finishes." caption-position="bottom" width="500px" >}}

After all the fibreglass resin had set, I was left with a rectangular board that I could then cut into the correct shape. The board ended up being 12mm thick, 4.5mmx2 from each of the pieces of plywood (they are meant to be 4mm, maybe they swelled a bit when the resin was added?), and 3mm from the 3 layers of fibreglass chopstran mat in the middle. The rigidity of the board was a complete guess (I had made a skateboard from fibreglass and plywood before, but it was a different size and many years ago), so it was not a surprise that the board was a little too flexible for my liking. The greater the flexibility, the nicer it is to ride (more responsiveness and shock-absorbing capability), but the greater risk of it snapping and the harder to mount items onto the underside of it.

{{< figure src="/images/electronics-electricskateboard-fibreglassing/finished-product.jpg" caption="The finished board after fibreglassing! Next step, cutting out the shape." caption-position="bottom" width="320px" >}}

The board shape was designed in Alibre.

{{< figure src="/images/electronics-electricskateboard-final-mech/electric-skateboard-board-outline-dimensions.jpg" caption="The outline dimensions of the board, used for printing out a 1:1 scaled template as a guide for the jigsaw." caption-position="bottom" width="800px" >}}

Drawing the lines to follow with the Jigsaw using rulers, protractors and compasses.

{{< figure src="/images/electronics-electricskateboard-fibreglassing/2012-01-28-20-07-11.jpg" caption=" " caption-position="bottom" width="500px" >}}

Cutting the board outline out with a jigsaw.

{{< figure src="/images/electronics-electricskateboard-fibreglassing/2012-01-29-09-46-52.jpg" caption="Cutting the skateboard out with a jigsaw." caption-position="bottom" width="500px" >}}

The end result!

{{< figure src="/images/electronics-electricskateboard-fibreglassing/2012-01-29-10-41-05.jpg" caption="The board, after the outline had been cut-out." caption-position="bottom" width="500px" >}}

The idea was to create an outline of the board which glowed at night, using E-wire. The electrical E-wire needed a groove to sit in that ran around the perimeter of the board. I made this groove with a dremel and a spherical routing attachment.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-fibreglassing/2012-01-29-11-26-19.jpg" caption="Routing out a groove for the E-wire." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-fibreglassing/2012-01-29-13-07-48.jpg" caption="The finished groove around the boards perimeter for the E-wire." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>


# Painting


Once the fibreglass board was cut to shape, it was time to paint it! I used "fibreglass-like" paints that use fibreglass resin and a solid powder pigment to provide the colour.

{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-11-15-32-00.jpg" caption="The various things needed for painting, gel-coat, paint brushes, measuring jugs, catalyst and acetone." caption-position="bottom" width="500px" >}}

Black on the bottom side was the first colour to go on.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-11-15-39-20.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-11-15-47-55.jpg" caption="Painting the underside of the board." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
The finished underside (the easy part).

{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-11-16-51-23.jpg" caption="The underside of the board complete." caption-position="bottom" width="500px" >}}

The top-side had all the pacman artwork, so I had to make masks to protect certain parts.

{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-12-11-31-41.jpg" caption="Making the various shaped masks for protecting paintwork." caption-position="bottom" width="500px" >}}

Then I started painting all the coloured sections.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-12-11-43-51.jpg" caption="Starting the painting with the lightest colour." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-12-12-04-14.jpg" caption="Painting pac-man." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
To add grip, I added crushed glass to the final layers of all the paintwork on the top surface.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-12-13-06-38.jpg" caption="The crushed glass that I added to the top coats on the top layer of the board to add grip." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-12-13-14-00.jpg" caption="Adding the crushed glass to the small white Pacman food." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
Masking off and painting more areas.

{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-12-22-08-11.jpg" caption="Putting the final colour of the top layer." caption-position="bottom" width="500px" >}}

The bottom-side was sanded with wet-and-dry to give a smooth finish (the top side has a rough surface from the crushed glass, so sandpapering that would of been futile).

{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-18-11-31-26.jpg" caption="Sanding the bottom of the board with wet-and-dry." caption-position="bottom" width="500px" >}}

The finished paint job!

{{< figure src="/images/electronics-electricskateboard-final-paint/2012-02-13-00-06-43.jpg" caption="The finished paint job!" caption-position="bottom" width="500px" >}}


# Final Mechanical Construction/Assembly


Here is me working out how to mount it onto the bottom of the board (click the pic for more info).

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-01-29-15-05-51.jpg" caption="Working out how to mount the 48V 10Ah LiFePO battery onto the bottom of the board. The foam is used to pad the battery and protect it when the board flexes during use." caption-position="bottom" width="400px" >}}

The battery mounts where made up from sections of angled steel.
<table style="width: 500px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-14-42-02.jpg" caption="Cutting the battery brackets." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-15-02-25.jpg" caption="The battery brackets." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
Mounting the battery onto the PCB

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-16-38-23.jpg" caption="The battery mounted to the board." caption-position="bottom" width="400px" >}}

The electrical enclosure was mounted next to the battery.
<table align="center" style="width: 800px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-17-43-43.jpg" caption="Drilling holes for the electrical enclosure." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-17-57-32.jpg" caption="Screwing the enclosure onto the underside of the board." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
One thing to take into consideration when mounting things onto the bottom of the board is the flex of the fibreglass board, especially when someone is standing on it. This flex could cause any large inflexible object (e.g. the battery and electronics enclosure) mounted onto the underside to snap or be ripped from its mounts. The way around this was to place a piece of foam pad underneath both the battery and enclosure as shown in the image below. This allowed board flex without putting stress on the parts.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-18-23-09.jpg" caption="A piece of foam pad was put underneath both the battery and enclosure. This allowed board flex without putting stress on the parts." caption-position="bottom" width="500px" >}}

I decided to add lights to the board so that I could use it at night, and also for safety when riding on the road (this proved to be very useful)

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-04-25-13-26-51.jpg" caption=" " caption-position="bottom" width="400px" >}}

The LED lights were mounted to the underside of the PCB with some angled steel brackets.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-15-44-24.jpg" caption="The LED light brackets to mount them on the underside of the electric skateboard." caption-position="bottom" width="400px" >}}

The lights were attached with "nylock" bolts so they wouldn't fall off.
<table align="center" style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-19-01-18.jpg" caption="The front LED light mounts." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-04-18-22-51.jpg" caption="The back LED light mount." caption-position="bottom" width="300px" >}}
</td>
</tr>
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/attaching-lights-to-boad.jpg" caption="Attaching the LED lights to the board." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/fixing-light-wires-to-board.jpg" caption="Fixing the light wires to the underside of the board." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
The electrical enclosure needed waterproof ways of getting cables in and out (for the battery, motor, and LED lights). I decided to use metal cable clamps. The following images show the construction.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-12-24-17.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-12-25-04.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>
</tr>
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-12-36-24.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-12-56-31.jpg" caption=" " caption-position="bottom" width="300px" >}}
</td>
</tr>
<tr >

<td colspan="2" >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-13-36-57.jpg" caption=" " caption-position="bottom" width="600px" >}}
</td>
</tr>
</tbody>
</table>
4 PCBs needed to be fitted into a pretty small enclosure. A mounting plate was made up to accommodate the multi-level PCB stack.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-15-06-21.jpg" caption="The mounting plate for the PCBs." caption-position="bottom" width="500px" >}}

The stand-off supports attached to the base plate. These support the 4 circuits boards that are held above it in the enclosure.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-17-16-00-25.jpg" caption="The stand-off supports attached to the base plate. These support the 4 circuits boards that are held above it in the enclosure." caption-position="bottom" width="500px" >}}

The EL-wire driver with added standoff.
<table style="width: 650px;" border="0" class="aligncenter" >
<tbody >
<tr >

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-15-22-33.jpg" caption="The standoff on the EL wire driver." caption-position="bottom" width="300px" >}}
</td>

<td >{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-15-34-23.jpg" caption="The EL-wire driver on the mounting plate." caption-position="bottom" width="300px" >}}
</td>
</tr>
</tbody>
</table>
Drilling holes in the BMS PCB for standoffs.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-15-43-01.jpg" caption="Drilling holes in the BMS PCB for standoffs." caption-position="bottom" width="500px" >}}

The BMS and EL-wire PCBs in enclosure.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-16-22-37.jpg" caption="The BMS and EL-wire PCBs in enclosure." caption-position="bottom" width="500px" >}}

Adding the charging port and key switch to the side of the board enclosure lid.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-17-15-41-22.jpg" caption="Adding the charging port and key switch to the side of the board enclosure lid." caption-position="bottom" width="500px" >}}

The EL-wire could now be pushed into the slot on the perimeter of the board and glued into place with see-through RV silicone glue.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-17-34-56.jpg" caption="Glueing the EL-wire into place." caption-position="bottom" width="500px" >}}

Testing the glow from the EL-wire at night!

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-26-20-28-20.jpg" caption="Testing the glow from the EL-wire at night." caption-position="bottom" width="500px" >}}

The handheld enclosure needed to be made. This was made from a Hammond electrical enclosure and various shaped sections of Aluminium tube/beam/pipe. The following image showss the making of the handle part of the hand-held enclosure.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-19-45-16.jpg" caption="Making the handle part of the hand-held enclosure." caption-position="bottom" width="500px" >}}

Attaching the enclosure onto the hand grip.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-20-13-22.jpg" caption="Attaching the enclosure onto the hand grip." caption-position="bottom" width="500px" >}}

The finished enclosure, apart from the trigger.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-20-38-05.jpg" caption="The finished enclosure, apart from the trigger." caption-position="bottom" width="500px" >}}

The electronics was then added to the handheld controller along with the trigger.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-17-21-03-27.jpg" caption="The electronics added to the handheld controller along with the trigger." caption-position="bottom" width="500px" >}}


# Giving Up On The DIY Half-Bridge


So the motor controller that I eventually ended up using...a quarter-bridge motor controller from AliExpress. Yes, a bit of a cop-out considering this board was meant to be homemade, but at least it works! The unfortunate thing about the quarter bridge is that it has no breaking ability, meaning the skateboard has not breaks. Something to fix in the future...

{{< figure src="/images/electronics-electricskateboard/2012-06-15-18-31-28.jpg" caption="The quarter-bridge motor driver that I ended up buying from AliExpress." caption-position="bottom" width="600px" >}}

Installing the new motor controller into the enclosure.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-17-21-09-23.jpg" caption="Finishing off the last bit of wiring." caption-position="bottom" width="600px" >}}


# Desiccant


After a few longer test drives, I noticed a bit of moisture condensing on the insides of the enclosure. So I added some desiccant to the skateboard enclosure to absorb any trapped moisture. Find out more about desiccant [here](http://blog.mbedded.ninja/electronics/components/desiccant).

{{< figure src="/images/electronics-electricskateboard/desiccant-in-skateboard-enclosure.jpg" caption="Desiccant was added to the skateboard enclosure to absorb any trapped moisture." caption-position="bottom" width="500px" >}}


# The Finished Electric Skateboard!


A mug shot of the finished board next to some greenery :-D.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-18-10-59-10.jpg" caption="A mug shot of the finished board next to some greenery :-D." caption-position="bottom" width="800px" >}}

And here is a shot of it at night with the lights on.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-16-19-17-34.jpg" caption="The electric skateboards lights proving useful at night." caption-position="bottom" width="800px" >}}

The underside of the finished electric skateboard.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-06-16-19-10-09.jpg" caption="The underside of the finished electric skateboard." caption-position="bottom" width="800px" >}}


# Weigh-In




Fibreglass Board = 2.84kg
Front Truck + It's 2 Wheels = 4.68kg
Back Truck + Motor + It's 2 Wheels = 8.84kg
Tires = 1.42kg (each)





# Timesheet


I kept a timesheet because I thought it would be interesting to see how much time was spent on the project. This following graph shows the days and the number of hours in that day that I spent I working on the skateboard.

{{< figure src="/images/electronics-electricskateboard-final-mech/electric-skateboard-timesheet-hours.png" caption="Graph of the hours spent on the Electric Skateboard project." caption-position="bottom" width="600px" >}}

The following graph is the number of cumulative hours.

{{< figure src="/images/electronics-electricskateboard-final-mech/electric-skateboard-cumulative-timesheet-hours.png" caption="Graph of the cumulative hours spent on the Electric Skateboard project." caption-position="bottom" width="600px" >}}

And this is a pie graph showing the proportional amount of time I spent on each "task" or category.

{{< figure src="/images/electronics-electricskateboard-final-mech/electric-skateboard-timesheet-task-piegraph.png" caption="The proportion of time spent on each task in the Electric Skateboard project." caption-position="bottom" width="600px" >}}
