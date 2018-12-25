---
author: gbmhunter
date: 2014-04-17 05:23:22+00:00
draft: false
title: C++ On Embedded Systems
type: page
url: /programming/languages/c-plus-plus/cpp-on-embedded-systems
---

## Overview

The document "[Technical Performance on C++ Performance](http://www.open-std.org/jtc1/sc22/wg21/docs/TR18015.pdf)" is a good read if you are really interested in the advantages/disadvantages of using C++ on an embedded platform.

[The Embedded C++ Homepage](http://www.caravan.net/ec2plus/) is sort of a hub for embedded C++ programming. They define a sub-set of the full C++ language for use on embedded devices such as microcontrollers.

## Performance Concerns

One fear about using C++ on an embedded system is a decrease in performance (in terms of memory and processing speed). As with most complex issues, the answer really is, "it depends".

I believe you can carefully select a subset of the C++ language which provides most of the benefits of OO-based design, but does not incur any performance hits for the target system.

## C++ Features That Should Be Used

* Classes (pretty much no overhead)
* Templates (no overhead, can be thought of as a more powerful version of a macro). However, incorrect/careless use of template can cause a huge increase in code size.
* Function overloading
* Typesafe enums (i.e. enum class), typesafe typedefs
* Operator overloading (when done sensibly!)
* References (they are just safer pointers!)
* Namespaces (no overhead)
* Inhertiance 
* auto

## C++ Features That Could Be Used, But Only After Careful Consideration

* Virtual Methods - 
* RTTI -
* STL
* Boost

## C++ Standrad Libraries For Embedded Devices

[uClibc++](http://cxx.uclibc.org/index.html) is a C++ standard library designed specifically for microcontrollers. It even has exception support!

[Check out The Standard Template Library (STL) For AVR With C++ Streams](http://andybrown.me.uk/wk/2011/01/15/the-standard-template-library-stl-for-avr-with-c-streams/) if you want to get a library for using things like string and iostream with AVR microcontrollers.
