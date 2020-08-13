---
author: "gbmhunter"
categories: [ "Programming", "Serilization Formats" ]
date: 2020-07-27
description: "The encoding and decoding process for packetizing (framing) data using Consistent Overhead Byte Stuffing (COBS)."
draft: false
images: [ "/programming/serialization-formats/consistent-overhead-byte-stuffing-cobs/cobs-encoding-diagram.png" ]
lastmod: 2020-08-13
tags: [ "programming", "serialization formats", "consistent overhead byte stuffing", "COBS", "C++", "encoding", "decoding", "packetizing", "framing" ]
title: "Consistent Overhead Byte Stuffing (COBS)"
type: "page"
---

## Overview

_Consistent overhead byte stuffing_ (COBS) is an encoding algorithm for framing serial data which provides a **consistent, guaranteed maximum overhead per quanta of data** (i.e. fixed amount of overhead per `n` bytes of data). Framing allows the use of a special byte value which can be used mark the end of the packet, so that a decoder on the other end of a serial communication bus/network can reliably split up one packet from the next and decode the data.

## The Encoding/Decoding Process

COBS encoding transforms bytes in the range `[0, 255]` to `[1, 255]` so that `0x00` (or any other one byte) can be used to **unambiguously mark the end of the packet**. The encoding process is best explained with a diagram as below:

{{% img src="cobs-encoding-diagram.png" width="800px" caption="A step-by-step diagram of the COBS encoding process." %}}

### Dealing With 255 Bytes

The one problem with using a single byte to store where the next `0x00` arises when the next `0x00` is more than 255 bytes away. It should now be obvious why, as a single byte cannot store a number higher than `255` (`0xFF`). So a special thing happens when this occurs --- if you encounter a "pointer" byte with `0xFF`, it doesn't mean the next `0x00` is 255 bytes away, it means that there were no `0x00`'s in the next *254* bytes, and that the 255th byte will contain the next pointer.

Because we have reserved the pointer value `0xFF`, we can only use the pointer values `0x01` through to `0xFE` to indicate where a real `0x00` is next in the data.

An follow-on effect of this rule is that for a large amount of data containing no `0x00`'s, a `0xFF` pointer byte will be **added after every 254 bytes.** **This is where the _Consistent Overhead_ part of the COBS acronym comes from.** Many other packetization/framing algorithms suffer from the fact that the payload can increase significantly if the data contains the specific probelmatic values (e.g. many algorithms produce a payload which is double the size of the original data!).

### Some Examples

One of the quickest ways to understand how COBS work is to look a simple examples of raw and encoded data. The following table shows basic examples which demonstrate the encoding process and highlight the edge-cases. All data is byte-wise in hexidecimal.

<table class="code">
  <thead>
    <th>Raw Data (hex)</th>   <th>Encoded Data (hex)</th>
  </thead>
  <tbody>
    <tr><td>00</td>       <td>01  01  00</td></tr>
    <tr><td>01</td>       <td>02  01  00</td></tr>
    <tr><td>02</td>       <td>02  02  00</td></tr>
    <tr><td>03</td>       <td>02  03  00</td></tr>
    <tr><td>00  00</td>   <td>01  01  01  00</td></tr>
    <tr><td>00  01</td>   <td>01  02  01  00</td></tr>
    <tr><td>01 02 03 ... FD FE FF</td>  <td>FF 01 02 03 ... FD FE 02 FF 00</td></tr>
  </tbody>
</table>

## Source Code

I wrote C++ functions which can peform COBS encoding and decoding as part of an open source serial communications protocol, they can be found at <https://github.com/gbmhunter/SerialFiller/blob/master/src/CobsTranscoder.cpp>.