---
author: gbmhunter
date: 2015-07-15 21:55:37+00:00
draft: false
title: FPGAs
type: page
url: /electronics/components/fpgas
---

# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Complexity




FPGA's are associated with a fair amount of design complexity.




Below is an A3-sized schematic sheet with JUST one 236-pin FPGA component added to it (no actual routing).


[caption id="attachment_11910" align="aligncenter" width="1245"][![An A3 schematic sheet with just one 236-pin FPGA IC added to it (no routing).](/images/2015/07/fpga-schematic-just-the-ic-no-routing.png)
](/images/2015/07/fpga-schematic-just-the-ic-no-routing.png) An A3 schematic sheet with just one 236-pin FPGA IC added to it (no routing).[/caption]





# Power Supplies




Typically, FPGAs require a large number different voltages to operate. This makes PSU design an important step in the FPGA design process. Most of these voltages are quite low. For example, an FPGA could require 1.0V, 1.2V, 1.8V and 3.3V to operate.




They also place tight restraints on the power-up/power-down sequence of these voltage rails.




# Boot-up




Because the data that configures (the _bitstream_) an FPGA is stored in CMOS configuration latches (CCL's), Xilinx FPGA's loose their configuration everytime they are powered down.



