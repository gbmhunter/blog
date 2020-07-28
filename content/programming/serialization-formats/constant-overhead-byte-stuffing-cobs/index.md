---
author: "gbmhunter"
categories: [ "Programming", "Serilization Formats" ]
date: 2020-07-27
description: ""
draft: false
lastmod: 2020-07-27
tags: [ "programming", "serialization formats", "constant overhead byte stuffing", "COBS", "C++", "encoding", "decoding" ]
title: "Constant Overhead Byte Stuffing (COBS)"
type: "page"
---

## Overview

_Constant overhead byte stuffing_ (COBS) is an encoding algorithm for framing serial data which provides a **consistent, guaranteed maximum overhead per quanta of data** (i.e. fixed amount of overhead per `n` bytes of data). Framing allows the use of a special byte value which can be used mark the end of the packet, so that a decoder on the other end of a serial communication bus/network can reliably split up one packet from the next and decode the data.

COBS encoding transforms bytes in the range `[0, 255]` to `[1, 255]` so that `0x00` (or any other one byte) can be used to **unambiguously mark the end of the packet**.

```text
   23 00 AA 81

02 23 03 AA 81 00 
```

## Source Code

I wrote C++ functions which can peform COBS encoding and decoding as part of an open source serial communications protocol, they can be found at <https://github.com/gbmhunter/SerialFiller/blob/master/src/CobsTranscoder.cpp>.