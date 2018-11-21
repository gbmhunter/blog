---
author: gbmhunter
date: 2013-08-06 21:23:43+00:00
draft: false
title: Verilog Operators
type: page
url: /programming/languages/verilog/verilog-operators
---





Operators are used to manipulate variables.


# Bitwise Operators


Bitwise operators act on the individual bits of a variable. They are very similar to the bitwise operations in other languages, such as [C](http://blog.mbedded.ninja/programming/languages/c).
<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >AND
</td>

<td >&
</td>
</tr>
<tr >

<td >OR
</td>

<td >|
</td>
</tr>
<tr >

<td >XOR
</td>

<td >^
</td>
</tr>
<tr >

<td >XNOR
</td>

<td >~^
</td>
</tr>
<tr >

<td >NOT
</td>

<td >~
</td>
</tr>
</tbody>
</table>
These operators get synthesized directly into their equivalent logic gate.


# Reduction Operators


Reduction operators are similar to bitwise operators, except they act on all bits of a variable simultaneously, to produce a 1-bit output (hence the name reduction). Some of the operators are the same as the bitwise operators, and so operator used depends on the **context**.
<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >AND
</td>

<td >&
</td>
</tr>
<tr >

<td >NAND
</td>

<td >~&
</td>
</tr>
<tr >

<td >OR
</td>

<td >|
</td>
</tr>
<tr >

<td >XOR
</td>

<td >~|
</td>
</tr>
<tr >

<td >XNOR
</td>

<td >^
</td>
</tr>
<tr >

<td >NOT
</td>

<td >~^
</td>
</tr>
</tbody>
</table>


# Shift Operators


Shift operators shift the bits in a variable left or right by a number of specified places. The basic shifts are very similar to the shift operations in other languages, such as [C](http://blog.mbedded.ninja/programming/languages/c). The arithmetic shift operators preserve the sign of the value when dealing with variables that represent signed numbers (this is done automatically in C, depending on the type of the variable).
<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >Left Shift
</td>

<td ><<
</td>
</tr>
<tr >

<td >Right Shift
</td>

<td >>>
</td>
</tr>
<tr >

<td >Arithmetic Left Shift
</td>

<td ><<<
</td>
</tr>
<tr >

<td >Arithmetic Right Shift
</td>

<td >>>>
</td>
</tr>
</tbody>
</table>


# Concatenation And Replication Operators


Concatenation is used to combine two input variables into a wider output variable. Replication is used to repeat a variables many times in a pattern.
<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >Concatenation
</td>

<td >{,}
</td>
</tr>
<tr >

<td >Replication
</td>

<td >{{}}
</td>
</tr>
</tbody>
</table>


# Arithmetic Operators


Arithmetic operators are used to perform basic mathematics on variables. Most follow the same syntax as C, except the power operator (**), which is not supported in C.
<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >Addition
</td>

<td >+
</td>
</tr>
<tr >

<td >Subtraction
</td>

<td >-
</td>
</tr>
<tr >

<td >Multiplication
</td>

<td >*
</td>
</tr>
<tr >

<td >Division
</td>

<td >/
</td>
</tr>
<tr >

<td >Modulus
</td>

<td >%
</td>
</tr>
<tr >

<td >Power
</td>

<td >**
</td>
</tr>
</tbody>
</table>
Remember that an FPGA does not have ALU like a microcontroller, so all of these operations will be created with gates in hardware! In some cases, this can be very taxing, so you must always be careful when using arithmetic operators in a hardware description language.


# Comparison Operators


These operators compare two values and produce a single bit output.
<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >Less Than
</td>

<td ><
</td>
</tr>
<tr >

<td >Greater Than
</td>

<td >>
</td>
</tr>
<tr >

<td >Less Than Or Equal
</td>

<td >=
</td>
</tr>
<tr >

<td >Greater Than Or Equal
</td>

<td >>=
</td>
</tr>
<tr >

<td >Equal To
</td>

<td >==
</td>
</tr>
<tr >

<td >Not Equal To
</td>

<td >!=
</td>
</tr>
<tr >

<td >Case Equality
</td>

<td >===
</td>
</tr>
<tr >

<td >Case Inequality
</td>

<td >!==
</td>
</tr>
</tbody>
</table>


# Logical Operators


<table style="width: 300px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Operator**
</td>
</tr>
<tr >

<td >Logical And
</td>

<td >&&
</td>
</tr>
<tr >

<td >Logical Or
</td>

<td >||
</td>
</tr>
<tr >

<td >Logical Not
</td>

<td >!
</td>
</tr>
</tbody>
</table>
