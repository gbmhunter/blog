---
author: gbmhunter
date: 2011-09-05 07:23:03+00:00
draft: false
title: Power Management
type: page
url: /electronics/circuit-design/power-management
---

# Overview

Power management is a big design consideration of battery powered and eco-friendly mains powered circuits. There are many ways of saving energy, some of the commonly used techniques are:

* Switching of sections of the circuit when they are not needed
* Slowing the clock speed of digital logic when high-speed is not needed

The following points need to be considered:

* The start and stop times of the circuitry being switched off
* The effect of having input signals still being applied to the chips which are 'off' (e.g. unwanted ESD conduction)
* The leakage currents of the device you're using to turn it off with (anything solid state has some form of leakage current, however mechanical relays do not).

# Disabling Sections Of A Circuit

Disabling sections of the circuit is an easy way to save power. This can be done with  low-side or high-side switch. High side switches disconnect the load from the positive voltage rail (an source current to the load), while low-side switches connect the load to ground (and conversly sink current from the load). This can be done with a number of components, their advantages/disadvantages are explained below:

* MOSFET's - An n-channel can be used for low-side switching or a p-channel for high-side switching. You could combine an n and p to perform high-side switching with a standard non-inverted logic signal. This is one of the cheapest options. However, MOSFET's can have quite a large leakage current (0.1 to 1uA @ 25C), which climbs rapidly as the temperature increases. If this is a concern, a JFET maybe a better option.
* JFET's - A benefit of using a JFET is the tiny leakage currents (nano-amps). However a dis-advantage of using a JFET is the large on-resistance compared to that of a MOSFET, you will only be able to switch mA's of current. Also, they require about 4-4.5V to switch them, meaning they are not compatible with 3.3V or lower circuitry.
* Integrated Load Switch/Smart Power Switch - These are essentially MOSFET's and supporting components built into a small chip for ease of use. Some feature the mentioned n and p combo to make it easy to control the load from a micro-controller. They normally also have build in ESD protection, thermal protection, overvoltage protection and current limiting which makes them hardened against all-sorts of abuse.
* Voltage Regulator - Voltage regulators can be used to turn off power to circuits as long as they have a shut-down pin. Not the cheapest solution or the most power efficient (especially if it's a linear voltage regulator), but you might just happen to already be using one.

# The "Suicide Switch"

In low-power, battery operated devices, when the battery is running flat, you need to disconnect all the load from the battery until the charger is plugged back in. It can be hard to remove all current drain from the battery as most parts of a circuit draw quiescent current, even in shutdown modes, and these sum together to draw an appreciable amount of current that will ruin the battery after a period of time. To get around this, you can use what I call a "suicide switch".

For it to work, you need to have a single device downstream of the battery which has a shutdown function. Linear regulators are great for this. The image below shows the suicide switch logic to disconnect the load from the battery, until the USB is plugged in.

{{< figure src="/images/2011/09/circuit-schematic-suicide-switch-with-usb-powered-lipo-charger.png" width="1331px" caption="A circuit schematic of a 'suicide switch' powered from a USB port."  >}}

The microcontroller disconnects the load (which includes itself) by pulling the SHUTDOWN pin low until the RC circuit discharges (about 4s). The only load on the battery is the shutdown current on the linear regulator, which is very low. As soon as the USB is plugged in, SHUTDOWN once again goes high, which enables the load, turns the microcontroller on, which takes over control of pulling the line high until such a time to disconnect again.

# UVLO (Under-voltage Lockout)

UVLO pins usually monitor the supply voltage and turn of the IC if the supply voltage drops below a set threshold. They normally indirectly measure the supply voltage by using an external resistor divider. This reduced voltage is then compared against an internally sourced reference voltage (e.g. 1.2V). The resistor divider lets the PCB designer choose the supply cut-off voltage by adjusting the ratio of the resistances.

Because the supply voltage can be slow-changing, UVLO pins usually have some form of hysteresis to prevent rapid triggering on the boundary between low and high (the threshold voltage). The hysteresis is either built in (e.g. 40mV of hysteresis), or a user-customisable hysteresis is provided. Customisable hysteresis is usually provided by the chip manufacturer making the UVLO pin sink a small amount of current when the pin is below the threshold. The user then chooses an appropriate resistor connected to the UVLO pin to provide the right amount of hysteresis.

UVLO pins are popular on DC/DC converter ICs. 

UVLO pins are sometimes named LBI (low battery input) instead (Texas Instruments uses this term for there battery-related ICs).

## Stabilising UVLO

One issue with UVLO pins is that they introduce instabilities when there is any kind of resistance between the power supply and the IC. If powering the IC from a battery, this **includes the internal resistance** of the battery. When the voltage drops below the threshold, the IC turns off, reducing the load current. Because of the source resistance, this causes the voltage the IC see's to increase, potentially rising above the threshold and turning the IC on again. This cycle will repeat and the IC will quickly oscillate between the on and off states.

The solution to this is to add the right amount of hysteresis. Note that the IC may already have hysteresis, but it may not be enough (especially if it wasn't specifically designed for battery or other high-resistance power source operation). The hysteresis can be increased by the designed by adding a resistor between `\( V_{OUT} \)` and the UVLO pin.

The two equations are:

<div>$$ \frac{V_{BAT} - V_{UVLO}}{R1} + \frac{V_{OUT} - V_{UVLO}}{R3} = \frac{V_{UVLO}}{R_2} $$</div>

<div>$$ \frac{V_{BAT} - V_{UVLO}}{R1} = \frac{V_{UVLO}}{R_2} + \frac{V_{UVLO}}{R_3} $$</div>

<p class="centered">
    where:<br>
    \( R1\) = top resistance divider resistor<br>
    \( R2 \) = bottom resistance divider resistor<br>
    \( R3 \) = resistor between \( V_{OUT} \) and the UVLO pin<br>
</p>

# Voltage/Current/Power Monitoring

The [Texas Instruments INA226](http://www.ti.com/product/ina226) is an example of a voltage/current and power monitoring IC. It relies on an external high or low-side current-sense resistor. It is controlled via I2C. 

{{< figure src="/images/2011/09/ina226-power-monitor-ic-internal-diagram-with-external-filtering.png" width="878px" caption="The internal diagram (with some external filtering circuitry) of the INA226 voltage/current/power monitoring IC. Image from http://www.ti.com/."  >}}
