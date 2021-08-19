---
authors: [ "Geoffrey Hunter" ]
date: 2012-10-23
draft: false
tags: [ "mathematics", "fixed point"]
title: Fixed Point Mathematics
type: page
---

## Overview

Fixed-point mathematics is a method for representing numbers on a binary computer architecture. It allows the storage numbers with decimal points, similar to the float and double, but with the benefit of requiring less computation time. The trade-off is lower precision and flexibility.

If you think about it, normal integers are just a special case of a fixed-point number in where the decimal point is to the right of the least-significant bit. A 32-bit unsigned integer (`uint32_t`), would be `fp(32, 0)`. It is common to use the bit-width of the architecture as the default fixed-point length, as the architecture has native support for manipulating these variables (commonly 32-bit on the more powerful embedded microcontrollers).

Most programming languages and hardware that code runs on does not have native support for fixed-point mathematics (however there are many third-party libraries out there!). C++ has a nice advantage over C in the fact that it supports operator overloading, meaning that you can write a fixed-point library so that you could multiply/divide two fixed-point numbers just by using the `*` or `/` syntax, just like when dealing with other native number types (in C you would have to use functions/macros).

## Notation

Q is a number format used to describe fixed-point numbers. It uses the form:

<div>$$ Qi.f $$</div>

<p class="centered">
where:<br>
\(i\) = number of integer bits<br>
\(f\) = number of fractional bits<br>
</p>

For example, Q24.8 would represent a 32-bit fixed-point number with 24 integer bits and 8 fractional bits.

## How We Store Them In Software

Floating point numbers are just stored in software as regular integers (signed or unsigned depends on your needs).

For example, a `Q4.12` number storing the value of `6.5` will be stored in a unsigned 16-bit integer (`uint16_t`) as:

```text
0110 1000 0000 0000
----|--------------
int  frac
(4b)  (12b)
```

This could be created by using the following code:

```c    
uint16_t fp1 = (uint16_t)(6.5 * (float)(1 << 12));
```

## The Range Of Fixed-Point Numbers

**Unsigned Fixed-Point Numbers**

The range of an unsigned fixed-point number with `\(i\)` bits for the integer and `\(f\)` bits for the decimal parts is:

<div>$$ 0 \textrm{ to } (2^i -1) + 2^{-f} \times (2^{f} - 1) $$</div>

For example, an 8-bit fixed-point number with 5 bits for the integer and 3 bits for the fractional part (Q5.3) would have a range from 0 to 31.875.

**Signed Fixed-Point Numbers**

The range for a signed fixed-point number is given by:

<div>$$ -2^{i-1} \textrm{ to } (2^{i-1} -1) + 2^{-f} \times (2^{f} - 1) $$</div>

For example, an 8-bit fixed-point number with `\(5\)` bits for the integer and `\(3\)` bits for the fractional part (`\(Q5.3\)`) would have a range from `\(-16\)` to `\(15.875\)`.

## The Precision Of Fixed-Point Numbers

The precision of a fixed-point number is determined solely by the number of fractional bits. The precision is equal to:

<div>$$ 2^{-f} $$</div>

For example, the precision of a `\(Q3.5\)` fixed-point number would be `\(2^{-5} = 0.03125\)`. The precision of a `\(Q8.0\)` number (no fractional bits) would be `\( 2^{-0} = 1\)`, as expected.

## Converting To Fixed-Point

**Integer To Fixed Point Number**

Converting from an integer to a fixed point number is easy, all you need to do is left-shift the integer by the number of fractional bits:

```c    
/// \brief	Create a fixed-point value from a integer and a num. of fractional bits.
FpS(int32_t integer, uint8_t numFracBits) {
    rawVal_ = integer << numFracBits;
    numFracBits_ = numFracBits;
}
```

The rawVal_ class variable is the how the fixed-point number is stored in memory.

**Double To Fixed Point Number**

Converting from a double to a fixed point number is not much harder! We just need to multiple the double by a scaling factor, where the scaling factor is defined as 1 << num. fractional bits.

```c    
/// \brief		Converts from double to a raw 32-bit fixed-point number.
template <uint8_t q>
int32_t DoubleToRawFix32(double f) {
    return (int32_t)(f * (double)(1 << q));
}
```

## Mathematical Operations On Fixed-Point Numbers

The first thing you need to realize is that **fixed-point arithmetic is just integer arithmetic**, but with some scaling factors applied on certain operations (e.g. multiplication/division).

## Adding/Subtracting Fixed-Point Numbers

If the numbers had the same precision, they can be added directly without any manipulation. Be wary of overflowing though! To ensure no overflow, the resultant fixed-point number has to have one more bit of integer precision than that of the inputs.

```c    
// Adding two fixed-point numbers of the same precision
fp<8><8> fpNum1 = fp<8><8>(3.45);
fp<8><8> fpNum2 = fp<8><8>(2.22);

// No operator overloading for '+' needed when adding two same-precision fixed-point numbers.
fp<8><8> fpNum3 = fpNum1 + fpNum2;
```

If the numbers have different precision, they must be converted to the same precision before adding. Either number can be converted to the precision of the other by bit shifting, but you must be aware that information could be lost in the process.

## Multiplying/Dividing Fixed-Point Numbers

**Multiplication**

Standard multiplication of two fixed-point numbers results in a fixed-point number which has a different number of integer `\(i\)` and fractional bits `\(f\)`. The number of integer bits in the output is the sum of the number of integer bits in both input numbers, `\( i_{out} = i_{in,1} + i_{in,2} \)`. The same applies for the fractional bits, `\( f_{out} = f_{in,1} + f_{in,2} \)`.

```c    
uint16_t fp1 = 5 << 4; // Q12.4 format
uint16_t fp2 = 3 << 8; // Q8.8 format
// fp3 is in Q((12 + 8).(4 + 8)) = Q(20.12) format
uint32_t fp3 = fp1 * fp2;
```

Multiplying any fixed-point number other than one with no fractional part (e.g. a standard int32_t, but no one really treats that as a "fixed-point" number anyway) requires a standard multiplication, and then a division (which happens to be an easy bit shift in code).

Because the end result is less than intermediatary result from multiplying the two numbers together, **care has to be taken to make sure that it does not overflow**. One way to do this is to cast the inputs into a data type twice as large (in terms of bits). If using int32_t fixed-point numbers, this is possible with a cast to int64_t , which most compilers support (including embedded ones, such as GCC).

```c    
// Create two fixed-point numbers with 8 bits of integer precision and 24 bits of fractional precision
int32_t fp1 = 3 << 24;
int32_t fp2 = 7 << 24;

// This method of multiplication is overflow unsafe!!!
int32_t fp3 = (fp1*fp2) >> 24;
std::cout << (fp3 >> 24); // Prints 0, something is wrong here!

// Because of the type casting to an intermediatary int64_t, this
// method is overflow safe
int32_t fp4 = ((int64_t)fp1*fp2) >> 24;
std::cout << (fp4 >> 24); // Prints 21, which is correct!
```

Both of the fixed-point numbers have to have the same number of fractional bits. If they don't, one must be left/right shifted so it has the same number of fractional bits as the other before the multiplication takes place. Typically, you would convert the fixed-point number with highest number of fractional bits to the same representation as the lowest resolution number (this is a loss in precision, but guarantees you have enough bits to hold the output).

**Division**

Fixed point division is similar to fixed point multiplication, you have to take the number of fractional digits into account and perform a scaling factor.

To perform the division of fixed point number fp1 by fixed-point number fp2, you first left-shift fp1 by the number of fractional digits (q), and then perform a normal division by fp2.

```c    
// Fixed point division
fp3 = (fp1 << q)/fp2
```

**Of course, you run into the same overflow issue as you do with multiplication.** Even if the resulting division is small enough to be help in the output variable (fp3 in the example above), the intermediary left-shift of fp1 can result in an overflow, giving an incorrect result.

Again, the way to rectify this is to cast fp1 into integer type large enough that the left shift will not cause an overflow, and once the shifted number has been divided by fp2, cast it back to the original integer type.

## Modulus/Modulo

The modulus of two numbers is the remainder left over once you divide them. Thankfully, this is really easy to do with fixed-point numbers, and is equal to the modulo division on the integer values themselves, as long as the two fixed point numbers have the same number of fractional bits.

```c    
int32_t fp1 = 7 << 8;
int32_t fp2 = 3 << 8;
int32_t fp3 = fp1 % fp2
std::cout << (fp3 >> 8); // Prints 1, which is correct answer for 7%3!
```

If they don't have the same number of fractional bits, you have to convert one of them so they are the same, and then perform simple modulo division. Typically, you would convert the fixed-point number with highest number of fractional bits to the same representation as the lowest resolution number (this is a loss in precision, but guarantees you have enough bits to hold the output).

## Inverse

Of course, the inverse of a fixed-point number can be found the standard way by dividing a left-shifted 1 by the number, using the rules for fixed point division above.

```c    
// The division must be fixed-point division
fp2 = 1 / fp3
```

However, there are clever ways of performing an inverse far quicker than using division.

## Embedded C++ Fixed-Point Library

I have written an embedded C++ fixed-point library called MFixedPoint. It is freely available for [download from GitHub here](https://github.com/gbmhunter/Cpp-FixedPoint).

## External Resources

See [Fixed-Point Representation and Fractional Math by Erick L. Oberstar](http://www.superkits.net/whitepapers/Fixed%20Point%20Representation%20&%20Fractional%20Math.pdf).

[Tonc: Fixed Point Numbers And LUTs](http://www.coranac.com/tonc/text/fixed.htm) is a good tutorial of fixed-point numbers and how they are implemented in a computer software/hardware.

From The Book of Hook, [An Introduction To Fixed Point Math](http://trac.bookofhook.com/bookofhook/trac.cgi/wiki/IntroductionToFixedPointMath) is another great resource.
