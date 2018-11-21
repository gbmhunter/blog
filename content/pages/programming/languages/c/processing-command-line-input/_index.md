---
author: gbmhunter
date: 2013-07-09 10:16:44+00:00
draft: false
title: Processing Command-Line Input
type: page
url: /programming/languages/c/processing-command-line-input
---

# Overview


This page concerns itself largely on the GNU implementation of getopt() and it's variants (more likely than not you will be using this library), and how they relate to the POSIX standard.


# First, A Little Terminology


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >**Name**
</td>

<td >**Description**
</td>

<td >**Example**
</td>
</tr>
<tr >

<td >Command-line
</td>

<td >A text-based program (called a terminal) that is used to call and control other programs.
</td>

<td >
</td>
</tr>
<tr >

<td >Options
</td>

<td >Optional arguments in a command-line message.
</td>

<td >In git commit -m "Example" , -m is the option.
</td>
</tr>
<tr >

<td >Long Options
</td>

<td >Long options are distinguished from just "options" by the fact they use more than one ASCII character to describe them. This is a GNU extension to the POSIX standard.
</td>

<td >In git commit --verbose, --verbose is a long option.
</td>
</tr>
<tr >

<td >Parameters
</td>

<td >Non-optional arguments in the command-line message.
</td>

<td >
</td>
</tr>
<tr >

<td >Option Arguments
</td>

<td >Options can have associated values. They may non-optional or optional. The fact that they are name option arguments and that **they can be optional themselves** can lead to confusion!
</td>

<td >In git commit -m "Example", "Example" is the non-optional option argument.
</td>
</tr>
</tbody>
</table>



# getopt()


getopt() is a standard C library function that is commonly used to decode command-line options that are passed into the main()  function from the calling program (which is usually a terminal, e.g. bash). It can be used in your C code by including getopt.h (#include <getopt.h>).

It is a recursive function which is designed to be called multiple times until it returns -1, indicating that it has finished processing all of the options.

It supports single character options preceeded by a single -, e.g. -s 54.

The header file getopt.h exposes four variables used by getopt() that you can check to find the state of the function.

Note that getopt() re-arranges the variable pointer array as it is processing, so that when it is complete, the program name is first (as it was originally), followed by all the options, and lastely all the parameters. You can use this feature to identify the parameters once getopt() is finished.


## Example


coming soon...


# getopt_long()


getopt_long() is an extension of getopt() that allows long options, that is, options that are described with more than one ASCII character and preceeded by -- (e.g. --speed=54). It is part the GNU C library (glibc).

The way long options are specified and handled is radically different to that for short options. The getopt_long() function accepts...


## Example


coming soon...


# Similar Functions


[Argtable](http://argtable.sourceforge.net/) is an open-source ANSI C library for parsing GNU-style command line options. Because it is ANSI compliant it is compilable on a huge range of operating systems, including Linux, FreeBSD, Cygwin, Apple Mac OS X and Windows, a compilable with the most common compilers on these operating systems. This library is well documented.

There is a C++ version of getopt() in the GNU C++ library. It is used by including GetOpt.h (#include <GetOpt.h>) into your C++ project (note the captilised 'G' and 'O'). It is described in more detail [here](http://www.chemie.fu-berlin.de/chemnet/use/info/libgpp/libgpp_39.html).

Another popular C++ version is called [getoptpp](https://code.google.com/p/getoptpp/source/checkout). It is pretty code heavy (uses <sstream>, <map>, <vector>, e.t.c, and probably not suitable for embedded systems. Supports long options.

There is a C++ version, "[The Lean Mean C++ Option Parser](http://optionparser.sourceforge.net/)", which is a header-only, light-weight, option parser which is meant to be easy to use. Differs from getopt() in it's extra functionality.

[gFlags](https://code.google.com/p/gflags/?redir=1) (a portmanteau of Google Flags) is a C++ options parser that is released under the [New BSD License](http://opensource.org/licenses/BSD-3-Clause).
