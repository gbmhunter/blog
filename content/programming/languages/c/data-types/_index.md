---
author: gbmhunter
date: 2013-06-14
draft: false
title: Data Types
type: page
---

## The Basic Data Types


<table>
  <tbody>
    <tr>
      <td><code>char</code></td>
      <td>The smallest type on an architecture. Usually 8-bits wide. Sign depends on implementation.
    </td>
    </tr>
    <tr>
      <td><code>int</code></td>
      <td>The only type that the modulus operation can be applied on. At least 16-bits in size. Usually 32-bits on 32-bit systems.</td>
    </tr>
    <tr>
      <td><code>float</code></td>
      <td>Single precision floating point number. Typically 32-bits wide.</td>
    </tr>
    <tr>
      <td><code>double</code></td>
      <td>Double precision floating point number. Typically 64-bits wide, although can be analogous to float (i.e. 32-bits wide) on smaller systems such as 8-bit microcontrollers.</td>
    </tr>
    <tr>
      <td><code>long double</code></td>
      <td>Not normally supported on embedded platforms. 128-bits.</td>
    </tr>
    <tr>
      <td><code>void</code></td>
      <td>Special case data-type.</td>
    </tr>
  </tbody>
</table>

## Using sizeof()

`sizeof()` can be used to return the number of bytes each type uses.

<blockquote>
	“There was a young man named Wight,  
	Who invented the thirteen bit byte.  
	You’ll get so much more,  
	from your memory, I’m sure.  
	But sadly your sizeof ain’t right.”
</blockquote>

## Fixed-width Integral Types

The problem with using `int` and all of it's derivatives (`short int`, `long int`, `long long int`, e.t.c) is that the width of the integer is platform specific. It is normally the same width as the platforms bus, but at least 16-bits. It is also called the natural width. For example, on an 8-bit system, an `int` will be 16 bits wide (remember, the C standard specifies it can't be less than 16 bits). On a 16-bit platform, it will usually be 16 bits, 32 bits for a 32-bit platform, 64 bits for a 64-bit platform, and so on, you get the idea!

To write portable code, it is usually better to use fixed-width integral types.

Fixed-width integral types also need special symbols for `printf()` statements. These are specified in `<cinttypes.h>`. They begin with the letters `PRI`.

## Floating Point Support

Most higher-end microcontrollers and CPUs will have a hardware floating-point unit (FPU) inside them, which allows the CPU to do fast floating-point arithmetic. If you have a lower-end, cheaper microcontroller, it may not contain a FPU. In this case, you really have two options if you want to manipulate numbers with decimal precision:

* Use a software-based floating point library (it does the floating-point arithmetic using the CPU). This is usually much lower than when there is a FPU. [Berkeley Softfloat](http://www.jhauser.us/arithmetic/SoftFloat.html) is one of the most powerful, widely available software-based floating-point libraries.
* Use fixed-point numbers instead! See [/programming/general/fixed-point-mathematics](/programming/general/fixed-point-mathematics) for more info, or check out my C++ fixed-point library for embedded systems at [https://github.com/gbmhunter/MFixedPoint/](https://github.com/gbmhunter/MFixedPoint/).
