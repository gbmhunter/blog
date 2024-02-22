---
authors: [ "Geoffrey Hunter" ]
date: 2017-04-17
draft: false
tags: [ "Linux", "Zynq", "Xilinx", "ZC702", "evaluation kit", "Yocto", "meta-xilinx", "VMware", "bit-bake", "poky", "SD card" ]
title: Building Linux For The Zynq ZC702 Eval Kit Using Yocto
type: page
---

## Overview

Xilinx provides device and board information for the Zynq SoC for Yocto through the repository [meta-xilinx](https://github.com/Xilinx/meta-xilinx). This includes board information for the [ZC702 Evaluation Kit](https://www.xilinx.com/products/boards-and-kits/ek-z7-zc702-g.html).

This tutorial has been tested on Ubuntu 16.04 64bit, running inside a VMware virtual machine on a Windows host. Exact procedure and commands might have to be changed slightly for other configurations.

More information on building and booting Linux on the Zynq ZC702 using Yocto can be found at the Xilinx pages [https://github.com/Xilinx/meta-xilinx/blob/master/meta-xilinx-bsp/README.building.md](https://github.com/Xilinx/meta-xilinx/blob/master/meta-xilinx-bsp/README.building.md) and [https://github.com/Xilinx/meta-xilinx/blob/master/meta-xilinx-bsp/README.booting.md](https://github.com/Xilinx/meta-xilinx/blob/master/meta-xilinx-bsp/README.booting.md).

## Download/Setup Yocto

If you want to get more familiar with Yocto, check out the [Yocto Quick Start guide](/programming/embedded-linux/yocto-project).

Firstly, install all the dependencies needed by Yocto:

```sh
~$ sudo apt-get install gawk wget git-core diffstat unzip texinfo gcc-multilib build-essential chrpath socat cpio python python3 python-pip libsdl1.2-dev xterm
```

Then we need to get a Yocto release. We will use the `poky` release for this tutorial:

```sh    
~$ git clone git://git.yoctoproject.org/poky
```

Now enter the poky directory:

```sh    
~$ cd poky/
```

Switch to the `morty` branch:

```sh    
~/poky$ git checkout morty
```

## Configuring Yocto For The ZC702 Eval Kit

Now that Yocto has been setup, we need to configure it for the Xilinx ZC702 Evaluation Kit.

To start this step, we need to clone the meta-xilinx repository into the Yocto source directory (e.g. poky/).

```sh    
~/poky$ git clone https://github.com/Xilinx/meta-xilinx.git
```

This should clone the repo into `~/poky/meta-xilinx/`.

We then need to make sure the branch of meta-xilinx is the same as the branch of poky.

```sh    
~/poky$ cd meta-xilinx
~/poky/meta-xilinx$ git checkout morty
```

Then go back to the `poky` directory, and initialise the build environment:

```sh    
~/poky/meta-xilinx$ cd ..
~/poky$ source oe-init-build-env
```

You should now automatically be in the `~/poky/build/` directory. Tell bitbake about the new `meta-xilinx` layer:

```sh   
~/poky/build$ bitbake-layers add-layer "$HOME/poky/meta-xilinx"
```

Add the following line to the `conf/local.conf` file:

```text
<code>MACHINE ?= "zc702-zynq7"</code>
```

We then start the build with:

```sh    
~/poky/build$ bitbake core-image-minimal
```

Go have lunch! This build is going to take a while...

{{< figure src="/images/2017/04/screenshot-building-linux-for-zynq-7-using-yocto.png" width="1067px" caption="Screenshot while building embedded Linux for the ZC702 Eval Kit board using Yocto."  >}}

## Booting Via SD Card

The ZC702 can be configured to boot a Yocto Linux distribution from the SD card. The following instructions show how:

**Setting Up A Bootable SD Card**

Use `dd` to erase the first sector (replace `X` with the number of the SD card):

```sh
~$ dd if=/dev/zero of=/dev/sdX bs=1024 count=1
```

Now let's partition the SD card using the interactive `fdisk` command:

```sh    
~$ sudo fdisk /dev/sdX
```text

Follow the following procedure, entering commands such as `n`, `a` and `t` where shown (the rest is `fdisk` output).

```text
Command (m for help): n Partition type: p primary (0 primary, 0 extended, 4 free) e extended Select (default p): p Partition number (1-4, default 1): 1 First sector (2048-15759359, default 2048): Using default value 2048 Last sector, +sectors or +size{K,M,G} (2048-15759359, default 15759359): +200M Command (m for help): n Partition type: p primary (1 primary, 0 extended, 3 free) e extended Select (default p): p Partition number (1-4, default 2): 2 First sector (411648-15759359, default 411648): Using default value 411648 Last sector, +sectors or +size{K,M,G} (411648-15759359, default 15759359): Using default value 15759359
```

Now set the bootable flag for the first partition, and set the partition IDs:

```text
Command (m for help): a
Partition number (1-4): 1
    
Command (m for help): t
Partition number (1-4): 1
Hex code (type L to list codes): c
Changed system type of partition 1 to c (W95 FAT32 (LBA))
    
Command (m for help): t
Partition number (1-4): 2
Hex code (type L to list codes): 83
```

Check the new partition table is correct, and then write the changes:

```text
Command (m for help): p
    
Disk /dev/sdb: 8068 MB, 8068792320 bytes
249 heads, 62 sectors/track, 1020 cylinders, total 15759360 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x920c958b
    
    Device Boot Start End Blocks Id System
/dev/sdb1 * 2048 411647 204800 c W95 FAT32 (LBA)
/dev/sdb2 411648 15759359 7673856 83 Linux
    
Command (m for help): w
The partition table has been altered!
    
Calling ioctl() to re-read partition table.
    
WARNING: If you have created or modified any DOS 6.x
partitions, please see the fdisk manual page for additional
information.
Syncing disks.
```

Create file systems on the new partitions (this would cause VirtualBox to crash, but seemed to work fine using VMWare Workstation):

```sh    
~$ sudo mkfs.vfat -F 32 -n boot /dev/sdX1
~$ sudo mkfs.ext4 -L root /dev/sdX2
```

Mount the partitions, `sdX1` being the first partition (boot), and `sdX2` being the second partition (where the root filesystem will be placed).

```sh    
~$ sudo mkdir -p /mnt/sdX1
~$ sudo mount /dev/sdX1 /mnt/sdX1
~$ sudo mkdir -p /mnt/sdX2
~$ sudo mount /dev/sdX2 /mnt/sdX2
```

**Copying Build Output Onto SD Card**

You will want to copy over the following files from `poky/build/tmp/deploy/<image>/` onto the first partition (boot partition) of the SD card.

```sh    
$ sudo cp boot.bin /mnt/sdX1/
$ sudo cp u-boot.img /mnt/sdX1/
$ sudo cp uImage /mnt/sdX1/
$ sudo cp .dtb /mnt/sdX1/
$ sudo cp uEnv.txt /mnt/sdX1/
```

We now will extract the root filesystem onto the second partition:

```sh    
$ sudo tar x -C /mnt/sdX2/ -f core-image-minimal-zc702-zynq7.tar.gz
```

{{% aside type="note" %}}
If you now insert this SD into windows, you should be able to see the files on the first (boot) partition, but not those on the second partition.
{{% /aside %}}

`uEnv.txt` should contain information similar to the following:

```text
kernel_image=uImage
devicetree_image=uImage-zynq-zc702.dtb
bootargs=console=ttyPS0,115200 root=/dev/mmcblk0p2 rw rootwait earlyprintk
uenvcmd=echo Copying Linux from SD to RAM... && fatload mmc 0 0x3000000 ${kernel_image} && fatload mmc 0 0x2A00000 ${devicetree_image} && bootm 0x3000000 - 0x2A00000
```

**Booting From SD Card**

Insert the SD card onto the ZC702 dev board. Make sure the DIP switches (SW16) on the ZC702 board are set as follows:

* 1 -> LOW
* 2 -> LOW
* 3 -> HIGH
* 4 -> HIGH
* 5 -> LOW

Connect a cable from the mini-USB port on the dev. board (labelled `J17` or `USB UART`) to your computer. Open a terminal on the COM port with the following settings:

* Baud rate = 115000
* Num. data bits = 8
* Parity = None
* Num. stop bits = 1
* Flow control = None

Now turn on the power switch to the dev. board. Hopefully, you should see it boot up!

{{< figure src="/images/2017/04/terminal-output-start-of-zynq-zc702-linux-boot-using-yocty.png" width="1656px" caption="The terminal output during the start of a Linux boot built using Yocty, and running on the Xilinx ZC702 dev. board."  >}}

You should be able to log in as user `root`, with no password.

## Booting Via TFTP

You can also use TFTP to transfer and boot compiled images from your desktop computer to the embedded device. The embedded device must have an internet/intranet connection to do so (e.g. Ethernet).

You must remember that U-Boot is required to be already present on the embedded device to support TFTP (you obviously need TFTP drivers to perform the communication, and this is what U-Boot provides). You can use TFTP to download the Linux kernel image, root filesystem and device tree.

```text
setenv bootcmd 'tftpboot 0x2000000 uImage; tftpboot 0x3000000 core-image-minimal-zc702-zynq7.cpio.gz.u-boot; tftpboot 0x2A00000 uImage-zynq-zc702.dtb; bootm 0x2000000 0x3000000 0x2A00000'
```

The above command assumes you have set up tftp on your server and then copied the Yocto build output into your tftpboot folder (e.g. `/tftpboot/`). Even better, you can make `/tftpboot` a symlink to your build directory:

```sh    
$ sudo ln -s ~/poky/build-real/tmp/deploy/images/zc702-zynq7/ /tftpboot
```

You can then run this command by simply typing:

```sh
boot
```

In my experience, it usually takes about 30s from the time you type boot to the time to get to the Linux login screen, which includes downloading the files via TFTP and then booting the Linux image (for a 100MiB or so filesystem).

## Booting Via Flash

Yocto produces a `boot.bin` file when building a Linux image for the ZC-702 (using the _meta-xilinx_ layer), but this doesn't seem to be directly suitable for QSPI flash boot.

## Create A FSBL Using Xilinx SDK

Load up the SDK. Select New->Application Project.

{{< figure src="/images/2017/04/xilinx-sdk-new-application-project-screenshot.png" width="513px" caption="Creating a 'New Application' in the Xilinx SDK."  >}}

Enter a name:

{{< figure src="/images/2017/04/xilinx-sdk-new-application-project-settings-screen.png" width="465px" caption="Give the Zynq FSBL project a name and make sure the right platform/processor is selected."  >}}

Click Next. Select FSBL.

{{< figure src="/images/2017/04/xilinx-sdk-new-application-project-settings-screen-2-select-fsbl.png" width="456px" caption="Select 'Zynq FSBL' as the template for the application."  >}}

The Xilinx SDK should now create all the necessary files and run the build once.

This should create a FSBL as a .elf file in the Debug build directory.

Xilinx also has instructions for creating a Zynq FSBL at [https://www.xilinx.com/support/documentation/sw_manuals/xilinx2013_4/SDK_Doc/tasks/sdk_t_project_creation_zynq_fsbl.htm](https://www.xilinx.com/support/documentation/sw_manuals/xilinx2013_4/SDK_Doc/tasks/sdk_t_project_creation_zynq_fsbl.htm)

## Create bootimage.bif

Manually create a `bootimage.bif` (bif is an acronym for _Bootable Image Format_) file using a text editor. It is pretty simple, and just needs to contain the following code:

```sh    
the_ROM_image:
{
[bootloader]Zynq_FSBL.elf
[load = 0x04000000, startup = 0x04000000]u-boot.elf
}
```

This file is used as a configuration file for `bootgen` (see below).

## Create Flash Image Using bootgen

`bootgen` is a command-line application provided by the Xilinx SDK. It is used to stitch together the many files needed for an embedded OS to boot properly into one image file. For myself, it was located at `/opt/Xilinx/SDK/2017.1/bin/`.

Use the following command:

```sh    
$ bootgen -image bootimage.bif -o BOOT.bin -w
```

This creates a `BOOT.bin` file from the `bootimage.bif` and the sources listed in the `bootimage.bif` file.

More information about bootgen can be found in Appendix A - Using Bootgen (page 55) of [https://www.xilinx.com/support/documentation/user_guides/ug821-zynq-7000-swdev.pdf](https://www.xilinx.com/support/documentation/user_guides/ug821-zynq-7000-swdev.pdf).

## Program The Flash

You can program the flash connected to the Zynq on the ZC-702 using Xilinx's `xsdb` and `program_flash` utilities.

Firstly, make sure the micro-USB cable to the JTAG device on the ZC-702 (`U23`) is connected to your Linux OS (see the [Installing xsdb And JTAG Drivers page](/programming/embedded-linux/zynq/installing-xsdb-and-jtag-drivers) for more info).

The, connect to the target using `xsdb`:

```text
./xsdb
connect
target
```

Then use the `program_flash` utility to write the `BOOT.bin` file generated above to the flash:

```sh  
~$ program_flash -f BOOT.bin -offset 0x0 -flash_type qspi_single -verify -cable type xilinx_tcf url tcp:localhost:3121
```

More information on the Program Flash Utility can be found in the [Embedded System Tools Reference Manual (UG1043)](https://www.xilinx.com/support/documentation/sw_manuals/xilinx2015_2/ug1043-embedded-system-tools.pdf).

## Running In The Simulator (QEMU)

This assumes you have poky already downloaded onto your computer (see above). Create a new build directory for the QEMU build.

```sh    
~/poky$ source oe-init-build-env build-qemu
```

Note how an argument was provided to `oe-init-build-env` this time (`build-qemu`). This tells `oe-init-build-env` to initialise a build directory called `build-qemu/` instead of the default, which is just `build/` (we will keep `build/` for the Linux build that runs on the real hardware).

Start the Linux build:

```sh    
~/poky/build-qemu$ bitbake core-image-minimal
```

Now run QEMU, passing in the location of the just-built QEMU configuration file.

```sh    
~/poky/build-qemu$ runqemu tmp/deploy/images/qemu-zynq7/core-image-minimal-qemu-zynq7.qemuboot.conf
```

{{< figure src="/images/2017/04/xilinx-zc702-yocto-linux-build-qemu-boot-console-screenshot.png" width="728px" caption="The final stages of a Yocto Linux (built for the Xilinx ZC702 dev. board) boot running in QEMU."  >}}

You should be able to log onto the Linux system with the username `root`, no password required.

## Help! I Get A "No Recipes Available For..." Error

Is your error similar to:

```text
ERROR: No recipes available for:
/home/username/poky/meta-xilinx/recipes-microblaze/glibc/glibc-initial_2.25.bbappend
/home/username/poky/meta-xilinx/recipes-microblaze/glibc/glibc_2.25.bbappend
```

This can happen if you forgot to checkout the correct branch of meta-xilinx. Remember, when you use the command `git clone https://github.com/Xilinx/meta-xilinx`, it will checkout the master branch. You then need to checkout the branch which matches the branch of poky you are using (this was `morty` when I did it), e.g.

```sh    
~/poky/meta-xilinx$ git checkout morty
```

## Other Resources

[http://www.wiki.xilinx.com/Prepare+Boot+Medium](http://www.wiki.xilinx.com/Prepare+Boot+Medium) explains how to make a bootable SD card using Linux.
