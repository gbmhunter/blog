---
author: gbmhunter
date: 2014-12-02 21:10:33+00:00
draft: false
title: Inertial Measurement Units (IMUs)
type: page
url: /electronics/components/sensors/inertial-measurement-units-imus
---

# Overview




The IMU can either consist of 3 separate chips mounted onto a small piece of PCB, or a single system-on-chip that integrated all of the components into one package.




They normally combine accelerometers. gyroscopes and sometimes magnetometers together as a single device (monolithic package). Devices with accelerometers and magnetometers are usually called 6-axis devices, while ones that also have magnetometers are called 9-axis devices.




The can include digital motion processors (DMPs). This offloads some of the processing required by the host microcontroller. They can also provide additional features such as motion gesture recognition. They do not normally include more advanced processing tasks such as an **attitude and heading reference system** (AHRS). This normally has to be provided by the host microcontroller.




The accelerometers usually exploit the Coriolis effect and a capacitor sensor to measure the angular rate in a axis.




Some IMU's negate the temperature drift by measuring their own temperature and performing self-compensation for these errors.




# Performance




The performance of IMU is normally expressed as a full-scale range and resolution for each sensor. The resolution might be specified in terms of the number of bits of the ADC. A "_Sensitivity Scale Factor_" might also provided, which is the full-scale range divided by the resolution. Sensitivity is usually specified at 100Hz and per lowest significant bit (LSB).




# Navigation




IMU's calculate their current position based on data from it's last known position(s), and they suffer from locational errors which accumulate over time. This is called **dead reckoning**. GPS does not have this problem.




# Communication




SPI is preferable over I2C when high data throughput's are required.




# GPS




More and more GPS units are beginning to support integration with an IMU unit to improve their accuracy.




# Software




[RTIMULib](https://github.com/RTIMULib/RTIMULib) is a pretty nice software package which makes it easier to get IMU's working with operating systems (including "embedded" ones such as the RaspberryPi). The writer, "richards-tech", also has a version of this for the Arduino, which makes it easy to use the Arduino as an I2C host to read back data from popular IMU's, send it via UART to a computer, where it can be processed.



{{< figure src="/images/2014/12/screenshot-playing-around-with-rthostimugl.png" width="782px" caption="Playing around with RTHostIMUGL and a connected IMU through an Arduino." caption-position="bottom" >}}



# Packages




A big advantage of an IMU is the reduced PCB footprint due the the combination of multiple sensors into a single package. These are sometimes called system-in-packages (SIP's). 3x3x1mm package.




# Examples




## MPU-9250


<table style="width: 600px;" >
<tbody >
<tr >

<td >Manufacturer
</td>

<td >IvenSense
</td>
</tr>
<tr >

<td >Part Number
</td>

<td >MPU-9250
</td>
</tr>
<tr >

<td >Supply Voltage
</td>

<td >2.4-3.6V
</td>
</tr>
<tr >

<td >Gyroscope Full-scale Range
</td>

<td >±250º/s, ±500º/s, ±1000º/s, ±200º/s
</td>
</tr>
<tr >

<td >Gyroscope Sensitivity (max)
</td>

<td >7.63mº/LSB
</td>
</tr>
<tr >

<td >Gyroscope Accuracy
</td>

<td >±3%
</td>
</tr>
<tr >

<td >Accelerometer Full-scale Range
</td>

<td >±2g, ±4g, ±8g, ±16g
</td>
</tr>
<tr >

<td >Accelerometer Sensitivity (max)
</td>

<td >30.5ug/LSB
</td>
</tr>
<tr >

<td >Accelerometer Accuracy (initial)
</td>

<td >±3%
</td>
</tr>
<tr >

<td >Magnetometer Full-scale Range
</td>

<td >±4800uT
</td>
</tr>
<tr >

<td >Magnetometer Sensitivity
</td>

<td >600nT/LSB
</td>
</tr>
<tr >

<td >Magnetometer Accuracy (initial calibration accuracy)
</td>

<td >±300uT
</td>
</tr>
<tr >

<td >Communication Interfaces
</td>

<td >I2C, SPI
</td>
</tr>
<tr >

<td >Package
</td>

<td >QFN-24 3x3x1mm P0.40 Pad (see comments below)
</td>
</tr>
<tr >

<td >Price (as of Dec 2014)
</td>

<td >US$12.70 (1)
</td>
</tr>
</tbody>
</table>


It has an on-board digital motion processor (DMP). Note that although the QFN package this IMU comes in has a exposed pad on the bottom, InvenSense recommend that you **do not connect it** to anything to reduce the amount of stress put on the sensitive MEMS device.




## LSM9DS1


<table style="width: 600px;" >
<tbody >
<tr >

<td >Manufacturer
</td>

<td >ST
</td>
</tr>
<tr >

<td >Part Number
</td>

<td >LSM9DS1
</td>
</tr>
<tr >

<td >Supply Voltage
</td>

<td >1.9-3.6V
</td>
</tr>
<tr >

<td >Gyroscope Full-scale Range
</td>

<td >±245º/s, ±500º/s, ±2000º/s
</td>
</tr>
<tr >

<td >Gyroscope Sensitivity (max)
</td>

<td >7.48mº/LSB
</td>
</tr>
<tr >

<td >Gyroscope Accuracy
</td>

<td >±%
</td>
</tr>
<tr >

<td >Accelerometer Full-scale Range
</td>

<td >±2g, ±4g, ±8g
</td>
</tr>
<tr >

<td >Accelerometer Sensitivity (max)
</td>

<td >61.0ug/LSB
</td>
</tr>
<tr >

<td >Accelerometer Accuracy (initial)
</td>

<td >±%
</td>
</tr>
<tr >

<td >Magnetometer Full-scale Range
</td>

<td >±400uT, ±800uT, ±1200uT,±1600uT
</td>
</tr>
<tr >

<td >Magnetometer Sensitivity
</td>

<td >12.2nT/LSB
</td>
</tr>
<tr >

<td >Magnetometer Accuracy (initial calibration accuracy)
</td>

<td >±uT
</td>
</tr>
<tr >

<td >Communication Interfaces
</td>

<td >I2C, SPI
</td>
</tr>
<tr >

<td >Package
</td>

<td >LGA-24L (3.5x3.0x1.0mm)
</td>
</tr>
<tr >

<td >Price (as of Dec 2014)
</td>

<td >US$8.35 (1)
</td>
</tr>
</tbody>
</table>


The LSM9DS1 is part of the iNEMO family.




## Others




Analog devices makes high-end military grade IMU's.




ST makes the iNEMO family of IMU modules.




DigiKey lists IMU's under the section [Sensors, Transducers -> Multifunction](http://www.digikey.com/product-search/en/sensors-transducers/multifunction/). The [STMicroelectronics LSM330TR](http://www.digikey.com/product-detail/en/LSM330TR/497-14381-1-ND/) is the cheapest accelerometer/gyro I could find on DigiKey as of Dec 2014 with a price of US$3.40 (100).




ST and InvenSense are the dominant manufacturers of the chips used on the [Sparkfun IMU modules](https://www.sparkfun.com/categories/160).




The cheapest 9-axis IMU I have found on the internet ANYWHERE is the [GY-85 sold by DealExtreme](http://www.dx.com/p/gy-85-6dof-9dof-imu-sensor-module-for-arduino-148436), which as of Dec 2014 is US$9.49 (1).
