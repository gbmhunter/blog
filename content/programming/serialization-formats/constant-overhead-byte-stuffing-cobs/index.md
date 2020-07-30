---
author: "gbmhunter"
categories: [ "Programming", "Serilization Formats" ]
date: 2020-07-27
description: "The encoding and decoding process for packetizing (framing) data using Constant Overhead Byte Stuffing (COBS)."
draft: false
images: [ "/programming/serialization-formats/constant-overhead-byte-stuffing-cobs/cobs-encoding-diagram.png" ]
lastmod: 2020-07-29
tags: [ "programming", "serialization formats", "constant overhead byte stuffing", "COBS", "C++", "encoding", "decoding", "packetizing", "framing" ]
title: "Constant Overhead Byte Stuffing (COBS)"
type: "page"
---

## Overview

_Constant overhead byte stuffing_ (COBS) is an encoding algorithm for framing serial data which provides a **consistent, guaranteed maximum overhead per quanta of data** (i.e. fixed amount of overhead per `n` bytes of data). Framing allows the use of a special byte value which can be used mark the end of the packet, so that a decoder on the other end of a serial communication bus/network can reliably split up one packet from the next and decode the data.

## The Encoding/Decoding Process

COBS encoding transforms bytes in the range `[0, 255]` to `[1, 255]` so that `0x00` (or any other one byte) can be used to **unambiguously mark the end of the packet**. The encoding process is best explained with a diagram as below:

{{% img src="cobs-encoding-diagram.png" width="800px" caption="A step-by-step diagram of the COBS encoding process." %}}

### Dealing With 255 Bytes

The one problem with using a single byte to store where the next `0x00` arises when the next `0x00` is more than 255 bytes away. It should now be obvious why, as a single byte cannot store a number higher than `255` (`0xFF`). So a special thing happens when this occurs --- if you encounter a "pointer" byte with `0xFF`, it doesn't mean the next `0x00` is 255 bytes away, it means that there were no `0x00`'s in the next *254* bytes, and that the 255th byte will contain the next pointer.

Because we have reserved the pointer value `0xFF`, we can only use the pointer values `0x01` through to `0xFE` to indicate where a real `0x00` is next in the data.

An follow-on effect of this rule is that for a large amount of data containing no `0x00`'s, a `0xFF` pointer byte will be **added after every 254 bytes.** **This is where the _Constant Overhead_ part of the COBS acronym comes from.** Many over packetization/framing algorithms suffer from the fact that the payload can increase significantly if the data contains the specific probelmatic values (e.g. many algorithms produce a payload which is double the size of the original data!).

## Source Code

I wrote C++ functions which can peform COBS encoding and decoding as part of an open source serial communications protocol, they can be found at <https://github.com/gbmhunter/SerialFiller/blob/master/src/CobsTranscoder.cpp>.