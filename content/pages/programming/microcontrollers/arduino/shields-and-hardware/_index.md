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




[singlepic id=963 w=400 h=400 float=center template=caption]




# Freetronics LCD And Keypad Shield




Part Number: SH-16X2LCD  

 Supplier: [Freetronics](http://www.freetronics.com/collections/display/products/lcd-keypad-shield#.UXtkG7V_rSg), Jaycar  

 Price: US$29.95 (as of 2013)




The Freetronics LCD And Keypad shield is a very popular display/UI shield for the Arduino.




The Arduino comes with a LCDCrystal library, making it almost too easy to use the LCD display (see the minimal code example below).



    
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







# Motor Controller




[singlepic id=962 w=400 h=400 float=center template=caption]




# Sensor Shield




[singlepic id=964 w=400 h=400 float=center template=caption]




# Ultrasonic Ranging Module HCSR-04




Part Number: HCSR-04  

 Supplier: [DealExtreme](http://dx.com/)  

 Supplier Link: ([click here](http://dx.com/p/hc-sr04-ultrasonic-sensor-distance-measuring-module-133696))  

 Price: US$4.00 (as of 2012)




Very easy to interface to, due there being a native Arduino API function called pulseIn(), which returns the length of a digital pulse measured on one of it's pins. Example firmware code for this module can be found on the [xAppSoftware Blog](http://www.xappsoftware.com/wordpress/2012/03/15/how-to-interface-the-hc-sr04-ultrasonic-ranging-module-to-arduino/). Included in the Arduino 4WD Robot Platform.




[singlepic id=965 w=600 h=600 float=center template=caption]




# The DealExtreme Robotic Platform




[singlepic id=967 w=200 h=200 float=right template=caption]




Supplier: [DealExtreme](http://dx.com/)  

 Product Link: (http://dx.com/p/multi-function-4wd-arduino-robot-raider-car-kits-128715, **as of Dec 2017, URL is unavailable**)  

 Price: US$71.70 (as of 2012)




A cheap, versatile, easy-to-use (well, kind of, but read the next paragraph) robotics platform.




No instructions come with this! You are left on your own to figure out how to assemble and then use it. That said, you can find instructions written by users for most of the individual components on online blogs.




[singlepic id=961 w=600 h=600 float=center template=caption]
