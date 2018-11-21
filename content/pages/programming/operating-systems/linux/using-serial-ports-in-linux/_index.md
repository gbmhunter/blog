---
author: gbmhunter
date: 2014-01-07 08:54:33+00:00
draft: false
title: Using Serial Ports In Linux
type: page
url: /programming/operating-systems/linux/using-serial-ports-in-linux
---

# Where Do Serial Ports Show Up In Linux?




Serial ports typically show up as files under the /dev/ folder. They are usually prefixed with tty. Common names include:


<table >
<tbody >
<tr >

<td >ttyUSB0
</td>

<td >A common name for a generic USB-to-serial adapter. Most FTDI or Prolific adapters show up with this name.
</td>
</tr>
<tr >

<td >ttyACM0
</td>

<td >Ardunios show up under this name. ACM stands for "_Abstract Control Model_".
</td>
</tr>
<tr >

<td >ttyS0
</td>

<td >Some UART ports on SoC devices (such as the Xilinx Zynq) show up with this name.
</td>
</tr>
</tbody>
</table>


# Changing The Permissions On A Serial Port




You can change the permissions for a serial port so you don't have to keep using sudo by typing:



    
    sudo chmod 666 /dev/ACM0
    




where /dev/ACM0 is the file corresponding to the serial port you wish to control.




You can permanently change the permissions by adding the user to the group dialout with the following command:



    
    ~$ sudo adduser username dialout
    




which for the current user would just be:



    
    ~$ sudo adduser $USER dialout
    




Note that this depends on the username and dialout group already existing (which is normally the case). This new permission will not come into effect until the user has logged out and back in again.
