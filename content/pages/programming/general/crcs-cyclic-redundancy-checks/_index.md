---
author: gbmhunter
date: 2016-06-07 21:24:31+00:00
draft: false
title: CRCs (Cyclic Redundancy Checks)
type: page
url: /programming/general/crcs-cyclic-redundancy-checks
---

[mathjax]

# Overview

<blockquote>"Everything you wanted to know about CRC algorithms, but were afraid to ask for fear that errors in your understanding might be detected." - Ross N. Williams.
> 
> </blockquote>

# Generator Polynomial

The hexadecimal representation of the polynomial is what you end up exclusively-ORing the data with when writing the CRC software algorithm.

# Start Value

A value of all 0's or all 1's are common start values for CRC calculations (e.g. 0x0000 and 0xFFFF for a 16-bit CRC calculations).

Start values that are not 0 are better at detecting errors if the message begins with one or more bits that are 0.

# MSB-first vs. LSB-first

The least-significant-bit first CRC algorithm is slightly simpler to implement in software/firmware, however the most-significant-bit first algorithm is easier to conceptulise.

# Properties Of CRCs

When checking a CRC, rather than recalculating the CRC for the message and comparing with the sent CRC, the CRC calculation can be run on the all the data bits received (including the sent CRC). If the result is 0, the CRC check is O.K.

# CRC Calculators

[NinjaCalc](http://mbedded-ninja.github.io/NinjaCalc/) has a CRC calculator which allows you to calculate the CRC value for ASCII or hex data, using either common pre-loaded CRC algorithms or your own custom algorithm.

[caption id="attachment_13651" align="aligncenter" width="1094"][![Example usage of the CRC Calculator within NinjaCalc (http://mbedded-ninja.github.io/NinjaCalc/).](/images/2016/07/ninja-calc-crc-calculator-example.gif)
](/images/2016/07/ninja-calc-crc-calculator-example.gif) Example usage of the CRC Calculator within NinjaCalc (http://mbedded-ninja.github.io/NinjaCalc/).[/caption]

# Some Common CRC Algorithms

Note that this does in no way try and be an exhaustive list. Sites like [CRC RevEng - Catalogue of parametised CRC algorithms](http://reveng.sourceforge.net/crc-catalogue/all.htm) and [Prof. Koopman's CRC Polynomial Zoo](https://users.ece.cmu.edu/~koopman/crc/notes.html) have great detailed lists of CRC algorithms.

## CRC-8-ATM

It uses the generator polynomial:

$$ x^{8} + x^{2} + x + 1 $$

It can be represented by the following hexadecimal numbers:

Normal: 0x

## CRC-16 (CCITT-FALSE)

<table ><tbody ><tr >
<td >Aliases
</td>
<td >  * CRC-16  * CCITT-FALSE
</td></tr><tr >
<td >Width
</td>
<td >16 bits
</td></tr><tr >
<td >Polynomial
</td>
<td >0x1021
</td></tr><tr >
<td >Initial Value
</td>
<td >0x0000
</td></tr><tr >
<td > 
</td>
<td > 
</td></tr><tr >
<td > 
</td>
<td > 
</td></tr></tbody></table>

CRC-16-CCITT was first used by IBM in it's SDLC data link protocol. It is also known as just CRC-CCITT (it always uses a 16-bit CRC checksum).

However, CRC-16-CCITT are not all the same. There are a few common variants of the CRC-16-CCITT in use:  * XModem  * 0xFFFF. This is an adaptation of the CRC-CCITT algorithm but with a starting CRC value of 0xFFFF rather than 0x0000.  * 0x1D0F  * Kermit. This is in fact the "true" CRC-CCITT CRC algorithm.

All of the CRC-CCITT variants use the following generator polynomial:

$$ x^{16} + x^{12} + x^{5} + 1 $$

It can be represented by the following hexadecimal numbers:

Normal: 0x1021  
Reverse: 0x8408  
Koopman: 0x8810

# External Resources

[http://reveng.sourceforge.net/crc-catalogue/16.htm](http://reveng.sourceforge.net/crc-catalogue/16.htm) is a great webpage catalogue of many 16-bit CRC algorithms.

[A Painless Guide To CRC Error Detection Algorithms](http://www.ross.net/crc/download/crc_v3.txt) is an old (1993), sore-on-the eyes (pure text article) but great in-depth introduction to CRC algorithms. 
