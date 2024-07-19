---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux" ]
date: 2014-01-07
draft: false
last_update: 2014-01-07
tags: [ "programming", "operating systems", "Linux", "serial ports", "tty", "permissions", "dialout" ]
title: Using Serial Ports In Linux
type: page
---

## Where Do Serial Ports Show Up In Linux?

Serial ports typically show up as files under the `/dev/` folder. They are usually prefixed with `tty`. Common names include:

<table>
  <tbody>
    <tr>
      <td><code>ttyUSB0</code></td>
      <td>A common name for a generic USB-to-serial adapter. Most FTDI or Prolific adapters show up with this name.</td>
    </tr>
    <tr>
      <td><code>ttyACM0</code></td>
      <td>Arduinos show up under this name. ACM stands for "Abstract Control Model".</td>
    </tr>
    <tr>
      <td><code>ttyS0</code></td>
      <td>Some UART ports on SoC devices (such as the Xilinx Zynq) show up with this name.</td>
    </tr>
</tbody>
</table>

## Changing The Permissions On A Serial Port

You can change the permissions for a serial port so you don't have to keep using `sudo` by typing:

```sh
sudo chmod 666 /dev/ACM0
```

where `/dev/ACM0` is the file corresponding to the serial port you wish to control.

You can permanently change the permissions by adding the user to the group dialout with the following command:

```sh   
~$ sudo adduser username dialout
```

which for the current user would just be:

```sh    
~$ sudo adduser $USER dialout
```

Note that this depends on the `username` and `dialout` group already existing (which is normally the case).

:::warning
This new permission will not come into effect until the user has logged out and back in again.
:::
