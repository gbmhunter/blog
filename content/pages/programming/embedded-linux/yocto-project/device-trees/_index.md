---
author: gbmhunter
date: 2017-05-31 21:05:15+00:00
draft: false
title: Device Trees
type: page
url: /programming/embedded-linux/yocto-project/device-trees
---

# Converting From Binary (.dtb) To Human-Readable (.dts) Device Tree Files




Yocto **normally produces `.dtb` (_Device Tree Blob_) files** when you are building an image. These are in a binary format. While this format is great for loading onto your target system, **it's not very good for developing/debugging**. Luckily, you can **convert** a Device Tree Blob (`.dtb`) file back **into a human-readable Device Tree Source (.dts) file**.




The program that can do this is called `dtc` (_Device Tree Compiler_). This program is downloaded when you perform a Yocto build and should be in the `/usr/bin/` folder within the host `sysroot` directory (e.g. `build/tmp/sysroots/x86_64-linux/`).




The following command **converts** the device tree blob file `devicetree.dtb` into a human-readable device tree source file (`devicetree.dts`):



    
    $ build/tmp/sysroots/x86_64-linux/usr/bin/dtc -I dtb -O dts -o devicetree.dts devicetree.dtb




This `.dts` file is much more useful to a developer than the `.dtb` file, and can be inspected to make sure the Yocto build is configured correctly!



[caption id="attachment_14505" align="aligncenter" width="1159"][![](/images/2017/06/yocto-device-tree-conversion-from-blob-to-source.png)
](/images/2017/06/yocto-device-tree-conversion-from-blob-to-source.png) A comparison between the Yocto generated binary Device Tree Blob (.dtb) file and the human-readable Device Tree Source (.dts) file that can be created from the .dtb file using the program dtc.[/caption]





