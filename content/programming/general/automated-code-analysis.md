---
author: gbmhunter
date: 2014-07-13 05:44:53+00:00
draft: false
title: Automated Code Analysis
type: page
---

## Overview

Automated code analysis is when code reviews other code. It can also be called static analysis, as most programs which do this check the source code without actually running the program (which is where the term static comes from).

## Static vs. Dynamic

Static analysis involves checking a programs source code for any issues, without actually running the code.

Dynamic analysis are code checks that involve running the code (which has to be compiled first for non-interpreted languages).

## Code Analysis Program Review

## ClangStatic Analyser

<table ><tbody ><tr >
<td >Supported Languages
</td>
<td >C, C++, Objective-C
</td></tr><tr >
<td >Static/Dynamic
</td>
<td >Static
</td></tr><tr >
<td >License, Pricing
</td>
<td >BSD, Free
</td></tr><tr >
<td >URL
</td>
<td >[http://clang-analyzer.llvm.org/](http://clang-analyzer.llvm.org/)
</td></tr></tbody></table>

## Cppcheck

<table ><tbody ><tr >
<td >Supported Languages
</td>
<td >C, C++
</td></tr><tr >
<td >Static/Dynamic
</td>
<td >Static
</td></tr><tr >
<td >License, Pricing
</td>
<td >BSD
</td></tr><tr >
<td >URL
</td>
<td >http://sourceforge.net/projects/cppcheck/
</td></tr></tbody></table>

The results from Cppcheck can seem a little sparse when compared to other static analysis tools.

## Flawfinder

<table ><tbody ><tr >
<td >Supported Languages
</td>
<td >C, C++
</td></tr><tr >
<td >Static/Dynamic
</td>
<td >Static
</td></tr><tr >
<td >License, Pricing
</td>
<td >GPL v2 (or greater)
</td></tr><tr >
<td >URL
</td>
<td >[http://www.dwheeler.com/flawfinder/](http://www.dwheeler.com/flawfinder/)
</td></tr></tbody></table>

Flawfinder is written in Python and designed to run on Linux. Author still responds to bugs/feature requests, even though there was an 8 year haitus (2006-2014). It is very easy to use by simply typing:
    
    flawfinder path/to/source/code

## Frama-C

<table ><tbody ><tr >
<td >Supported Languages
</td>
<td >C, C++
</td></tr><tr >
<td >Static/Dynamic
</td>
<td >Static
</td></tr><tr >
<td >License, Pricing
</td>
<td >Open-source, free
</td></tr><tr >
<td >URL
</td>
<td >[http://www.dwheeler.com/flawfinder/](http://www.dwheeler.com/flawfinder/)
</td></tr></tbody></table>

Frama-C is built in a modular way that is plug-in centric. It is designed to that plugins are easy to write, easy to install, and so that the output of one can easily be the input of another (plugin chaining).

Frama-C supports deductive verification, in where it validates functions by the rules written in the comments above the function. These rules are written in the ANSI/ISO specification language.

## PC Lint

<table ><tbody ><tr >
<td >Supported Languages
</td>
<td >C, C++
</td></tr><tr >
<td >Static/Dynamic
</td>
<td >Static
</td></tr><tr >
<td >License, Pricing
</td>
<td >Proprietary, US$385 for a single user license as of September 2015.
</td></tr><tr >
<td >URL
</td>
<td >[http://www.gimpel.com/html/pcl.htm](http://www.gimpel.com/html/pcl.htm)
</td></tr></tbody></table>

PCLint uses knowledge of certain well-known C/C++ library  functions to improve it's error checking capabilities. May C/C++ library functions have certain pre and post-conditions which must be met (e.g. the fopen() args is never null, assert() never returns, e.t.c). Where possible, PC Lint will check that these are satisfied.
