---
author: gbmhunter
date: 2013-03-27 19:48:15+00:00
draft: false
title: Shields And Hardware
type: page
url: /programming/microcontrollers/arduino/shields-and-hardware
---

# Infrared Sensors

Supplier: [DealExtreme](http://dx.com/)  
Supplier Link: (unknown)  
Price: (unknown)

A simple three PIN device that is good for binary (on/off) short-range detection between 0-30mm. Uses a POT to adjust the threshold. This came with the Arduino 4WD Robot platform.

{{< figure src="/images/electronics-arduino/arduino-infrared-sensors.jpg" caption="Arduino-compatible infrared sensors."  width="400px" >}}

# Freetronics LCD And Keypad Shield

Part Number: SH-16X2LCD  
Supplier: [Freetronics](http://www.freetronics.com/collections/display/products/lcd-keypad-shield#.UXtkG7V_rSg), Jaycar  
Price: US$29.95 (as of 2013)

The Freetronics LCD And Keypad shield is a very popular display/UI shield for the Arduino.

The Arduino comes with a LCDCrystal library, making it almost too easy to use the LCD display (see the minimal code example below).

```c    
#include <LiquidCrystal.h>

// Code example taken from the Freetronics website

LiquidCrystal lcd( 8, 9, 4, 5, 6, 7 );

void setup()
{
    lcd.begin(16, 2);
    lcd.print("hello, world!");
}

void loop()
{
    // your main loop code here...
}
```

# Motor Controller

{{< figure src="/images/electronics-arduino/arduino-4wd-robot-motor-controller.jpg" caption="The controller for a Arduino 4WD robot."  width="400px" >}}

# Sensor Shield

{{< figure src="/images/electronics-arduino/arduino-sensor-shield.jpg" caption="An Arduino sensor shield."  width="400px" >}}

# Ultrasonic Ranging Module HCSR-04

Part Number: HCSR-04  
Supplier: [DealExtreme](http://dx.com/)  
Supplier Link: ([click here](http://dx.com/p/hc-sr04-ultrasonic-sensor-distance-measuring-module-133696))  
Price: US$4.00 (as of 2012)

Very easy to interface to, due there being a native Arduino API function called pulseIn(), which returns the length of a digital pulse measured on one of it's pins. Example firmware code for this module can be found on the [xAppSoftware Blog](http://www.xappsoftware.com/wordpress/2012/03/15/how-to-interface-the-hc-sr04-ultrasonic-ranging-module-to-arduino/). Included in the Arduino 4WD Robot Platform.

{{< figure src="/images/electronics-arduino/arduino-ultrasound-module.jpg" caption="An Arduino compatible ultrasound module."  width="600px" >}}

# The DealExtreme Robotic Platform

{{< figure src="/images/electronics-arduino/bottom-side-of-arduino-4wd-robot.jpg" caption="The bottom side of the 4WD Arduino robot."  width="200px" >}}

Supplier: [DealExtreme](http://dx.com/)  
Product Link: (http://dx.com/p/multi-function-4wd-arduino-robot-raider-car-kits-128715, **as of Dec 2017, URL is unavailable**)  
Price: US$71.70 (as of 2012)

A cheap, versatile, easy-to-use (well, kind of, but read the next paragraph) robotics platform.

No instructions come with this! You are left on your own to figure out how to assemble and then use it. That said, you can find instructions written by users for most of the individual components on online blogs.

{{< figure src="/images/electronics-arduino/arduino-4wd-robot-base-wheels-motor-driver.jpg" caption="A Arduino robot base."  width="600px" >}}
