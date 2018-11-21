---
author: gbmhunter
date: 2016-06-08 23:16:55+00:00
draft: false
title: Primitive Data Types
type: page
url: /programming/languages/java/primitive-data-types
---

[mathjax]

# Overview

Java has 8 primitive data types. It does not support unsigned primitive types (all primitive numerical types are signed).

You cannot use the new keyword with primitive data types as they are not considered objects.

Note that the String class, although it has special support by the language, is not a primitive data type.

# byte

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >8-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Default Value
</td>
<td style="width: 377px; height: 28px;" >0
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >-128 to +127
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Format
</td>
<td style="width: 377px; height: 28px;" >Signed two's complement.
</td></tr></tbody></table>

# short

<table width="658" style="height: 171px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 218px; height: 28px;" >Size
</td>
<td style="width: 411px; height: 28px;" >16-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 218px; height: 28px;" >Default Value
</td>
<td style="width: 411px; height: 28px;" >0
</td></tr><tr style="height: 28px;" >
<td style="width: 218px; height: 28px;" >Range
</td>
<td style="width: 411px; height: 28px;" >-32768 to +32767
</td></tr><tr style="height: 28px;" >
<td style="width: 218px; height: 28px;" >Format
</td>
<td style="width: 411px; height: 28px;" >Signed two's complement.
</td></tr></tbody></table>

# int

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >32-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Default Value
</td>
<td style="width: 377px; height: 28px;" >0
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >\(2^{31} to 2^{31} - 1\)
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Format
</td>
<td style="width: 377px; height: 28px;" >Signed two's complement.
</td></tr></tbody></table>

int literals can be created by just writing integers directly in the code. An integer is always of type int unless it is prefixed with an L  or l, in which case it is of type long.
    
    int i = 1234; // The 1234 is an integer literal

# long

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >64-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Default Value
</td>
<td style="width: 377px; height: 28px;" >0L
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >\(2^{63}\) to \(2^{63} - 1\)
</td></tr><tr style="height: 28.5469px;" >
<td style="width: 200px; height: 28.5469px;" >Format
</td>
<td style="width: 377px; height: 28.5469px;" >Signed two's complement.
</td></tr></tbody></table>

# float

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >32-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Default Value
</td>
<td style="width: 377px; height: 28px;" >0.0f
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >Variable
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Format
</td>
<td style="width: 377px; height: 28px;" >Single-precision 32-bit IEEE 754 floating point.
</td></tr></tbody></table>

# double

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >64-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Default Value
</td>
<td style="width: 377px; height: 28px;" >0.0d
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >Variable
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Format
</td>
<td style="width: 377px; height: 28px;" >Double-precision 64-bit IEEE 754 floating point.
</td></tr></tbody></table>

The double  type should be your default go-to for any general-purpose decimal number. If you are using many of them and space/performance is an issue, consider using the smaller, lower accuracy float type instead.

# boolean

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >Variable (not specified by Java standard)
</td></tr><tr style="height: 28.5469px;" >
<td style="width: 200px; height: 28.5469px;" >Default Value
</td>
<td style="width: 377px; height: 28.5469px;" >false
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >true or false
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Format
</td>
<td style="width: 377px; height: 28px;" >Not specified by Java standard.
</td></tr></tbody></table>

Even though a boolean can only be used to represent one bit of information, the amount of memory it uses isn't specified by the Java standard.

# char

<table width="501" style="height: 157px;" ><tbody ><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Size
</td>
<td style="width: 377px; height: 28px;" >16-bits
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Default Value
</td>
<td style="width: 377px; height: 28px;" >'\u0000'
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Range
</td>
<td style="width: 377px; height: 28px;" >'\u0000' to '\uffff'
</td></tr><tr style="height: 28px;" >
<td style="width: 200px; height: 28px;" >Format
</td>
<td style="width: 377px; height: 28px;" >A single 16-bit Unicode character.
</td></tr></tbody></table>

# Converting Between byte And int

Notice that the only 8-bit number representation Java has is for a signed two complement. This means that you can only store the numbers -128 to +127 in a byte.
    
    byte myByte;
    
    // Compiler will throw error, 240 is outside the maximum range
    // of the byte type
    myByte = 240;  
    
    // This next one is o.k.
    // myByte = -16, or 0b11110000, which is the same bit-pattern
    // as the int 240
    myByte = (byte)(240);
    

Note here that when converting from an int to a byte, the bit pattern will not be changed (0b11110000 is still 0b11110000), but the decimal representation will (e.g. 240 is now -16).

People with a C/C++ background would be used to datatype uint8_t, which is an unsigned 8-bit number, and allows you to store numbers between 0 to 255.

Above we have shown you how to convert from a int to a byte. Converting back is slightly different...
    
    // myByte will equal -16 after this assignment
    byte myByte = (byte)240;
    
    // Woah, what???
    // This is needed to tell Java to get the bits from myByte and 
    // plonk them into myInt. myInt should = 240 after this assignment.
    // If you instead let Java do a "conversion" from
    // byte to int, you will get myInt = -16
    int myInt = myByte & 0xFF;
    
    myInt = (int)myByte;
    // myInt is now = - 16
