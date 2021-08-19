---
authors: [ "Geoffrey Hunter" ]
date: 2012-07-02
draft: false
title: "Delphi"
type: page
---

## Overview

Delphi grew out of the Turbo Pascal language.

Delphi is one of the languages available for [writing scripts in Altium](/electronics/general/altium/altium-scripting-and-using-the-api/), a PCB design program.

## Code Blocks

Delphi uses begin and end; keywords to create blocks of code (similar to the { and } characters in c).

Note that after the end keyword you must include a semi-colon, but

{{< figure src="/images/2012/07/delphi-logo.png" width="261px" caption="The Delphi logo."  >}}

not after the begin keyword!

## Operators

## Binary Arithmetic

```delphi    
=  // Equal to
<> // Not equal too
```

## Comments

Single line comments are started with `//` and finish on the start of a new line.

Multi-line comments are started with either `{` or `(*` and finished with `}` or `*)`.

## Rounding

Rounding in Delphi can be done with the in-built function `Round()`. It rounds a number to the nearest integer. To round to a specified number of decimal places, you can use this function in conjunction with the divide/multiply technique.

Divide the number by the precision you want, use the Round function, and then multiply it again by the precision.

```delphi    
// Rounds a value to 2 decimal places
procedure RoundAValueTo2Dp();
var
    unRoundedValue : double;
    roundedValue : double;
begin
    unRoundedValue := 2.4798;
    roundedValue := Round(unRoundedValue/0.01)*0.01;
    // roundedValue now equals 2.48
end;
```