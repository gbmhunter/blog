---
authors: [ "Geoffrey Hunter" ]
date: 2017-05-31 17:27:09+00:00
draft: false
title: Building Yocto
type: page
---

## What Do All The Build Output Files Do?

A Yocto build normally generated a confusing amount of files in the output build directory. This section aims to help you work out what all these files do!

{{% note %}}
Only important files are listed here, and some may be symlinks to the actual file (the symlink is listed below instead of the destination file because it's file name is easier to read and understand).
{{% /note %}}

Example files are colored as they would appear with the `ls` command under Ubuntu. Normal files are in **white**. Symlinks are in **light blue**. Listed in alphabetical order.

Filename: `boot.bin`  
Description: FSBL file. This is a machine/date independent symlink to the actual FSBL file in the same directory.  
Example: **boot.bin**  
Example File Size: 89kiB (destination of symlink)

Filename: `<image-name>-<machine>-<date-time>.rootfs.cpio`  
Description: The root filesystem, in the copy-in copy-out (cpio) archive format. Also called a ramdisk.  
Example: **core-image-minimal-zc702-zynq7-20170531002052.rootfs.cpio**  
Example File Size: 315MiB

Filename: `<image-name>-<machine>-<date-time>.rootfs.cpio.gz.u-boot`  
Description: The root filesystem, with a U-boot header added to that U-boot can boot it. Also called a ramdisk.  
Example: **core-image-minimal-zc702-zynq7-20170531002052.rootfs.cpio.gz.u-boot**   
Example File Size: 103MiB

Filename: `<image-name>-<machine>-<date-time>.rootfs.manifest`  
Description: Contains a list of all the packages present in the image.  
Example: **core-image-minimal-  
zc702-zynq7-20170531002052.  
rootfs.manifest**   
Example File Size: 43kiB

Filename: `<image-name>-<machine>-<date-time>.rootfs.tar.gz`  
Description: The root filesystem, as a tar archive that has also been compressed with gz.  
Example: **core-image-minimal-  
zc702-zynq7-20170531002052.  
rootfs.tar.gz**   
Example File Size: 103MiB

Filename: `uImage`  
Description: An image of the kernal, wrapped with a U-Boot header. This is a date/machine independent symlink to the actual image file in the same directory.  
Example: **uImage**  
Example File Size: 3.5MiB (symlink destination)

Filename: `uImage-<machine>.dtb`  
Description: This is the Devicetree blob in binary format. This is a kernel/date independent symlink to the actual Devicetree file in the same directory. You can convert this to a .dts file (human-readable Devicetree file) using the dtc program.  
Example: **uImage-zynq-zc702.dtb**  
Example File Size: 15kiB (symlink destination)
