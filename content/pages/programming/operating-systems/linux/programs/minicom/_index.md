---
author: gbmhunter
date: 2014-07-07 00:36:56+00:00
draft: false
title: minicom
type: page
url: /programming/operating-systems/linux/programs/minicom
---

# Overview




minicom is a Linux program to . It calls itself a "friendly serial communications program". It is also available for the RaspberryPi.




If you want to connect two terminals together and test the output/input of minicom, check out the [Connecting Two COM Ports Together" section on the socat program page](http://blog.mbedded.ninja/programming/operating-systems/linux/programs/socat#connecting-two-com-ports-together).




# Installing




If using a Debian-style Linux (incl. the RaspberryPi), you can install minicom with the following command:



    
    sudo apt-get install minicom
    




# Config




You normally start minicom with the -s flag, so that you can set the configuration settings correctly.



    
    minicom -s
    




**WARNING: Most serial devices will not used hardware flow control, but this is enabled by default in minicom. Sometimes, if this is left enabled and the hardware does not use it, you will receive no serial data from the device.**




However, you can configure some of the most-used settings directly from the command line. Use -D to set the device name:



    
    minicom -D /dev/ttyUSB0
    




Use -b to set the baud rate:



    
    minicom -b 9600
    




# Logging




Start minicom with the following command to enable logging:



    
    minicom -C MyLogFile.txt
    




minicom describes this option as "open capture file at startup". A quick way to clear a log file is by using the command cat /dev/null > MyLogFile.txt.




# Macros




minicom supports the use of macros (key press sequences) that can be bound to the F1-F9 keys.




To setup macros, follow the instructions below:





	  1. While Minicom is running, press Ctrl-A, O to bring up the "Configure Minicom" menu.
	  2. Scroll down and select Screen and keyboard.
	  3. Press M to select "Edit Macros".
	  4. Press 1-9 (or A) to edit the associated macro.



## Special Characters




minicom macros support the insertion of special characters (such as new lines and carriage returns) via the following syntax:


<table >
<tbody >
<tr >

<td >**Syntax**
</td>

<td >**Character It Inserts**
</td>
</tr>
<tr >

<td >^J
</td>

<td >New line (\n)
</td>
</tr>
<tr >

<td >^M
</td>

<td >Carriage return (\r)
</td>
</tr>
</tbody>
</table>


# How To Exit Minicom




To exit minicom while it is being used as a serial terminal, type:



    
    Ctrl-A
    Q




This should bring up a dialogue window which allows you to quit.
