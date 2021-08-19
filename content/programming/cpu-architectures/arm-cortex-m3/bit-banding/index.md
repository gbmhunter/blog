---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "CPU Architectures", "ARM Cortex-M3" ]
date: 2014-09-30
draft: false
tags: [ "programming", "CPU architectures", "ARM Cortex-M3", "bit banding", "ANSI C", "C", "memory", "alias" ]
title: Bit Banding
type: page
---

<h2>Overview</h2>

<p>Bit banding maps a complete word in one memory space (this can be virtual) to a single bit in another memory space (this has to be a real memory space). This allows you to perform single-instruction read and write operations on individual bits. The benefit of single instruction reads and writes is that it is atomic and uses less processor time.</p>

<p>This technique is fully compatible with ANSI C, requiring no special compiler keywords or assembly instructions. Note that there are many solutions to the problem of performing atomic read/writes to memory, bit banding is just one of them.</p>

<p>Bit banding is not to be confused with another embedded programming technique called bit banging, which is when you implement what is typically done using in a hardware peripheral purely in the firmware.</p>

<h2>Memory Regions</h2>

<p>The Cortex-M3 has two 32MB regions that map onto the two 1MB bit-band regions. The two regions are separate, one in the SRAM region and one in the peripheral region (but both of course in the same memory space). The diagram below shows the entire Cortex-M3 memory space, with the bit band locations being close to the bottom of memory.</p>

{{< img src="cortex-m3-memory-regions.png" caption="The ARM Cortex-M3 memory regions." width="500px" >}}

<p>Each bit in the bit-band region is addressed sequentially in the 32MB alias region. For example, the eighth bit in the bit-band region can be accessed using the eighth word in the 32MB alias region.</p>

<p>If you are changing many bits in the same byte at once, it may be quicker to forgo the bit banging technique, disable interrupts (only if you need atomic access of course) and perform the reads and writes as usual.</p>
