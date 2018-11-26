---
author: gbmhunter
date: 2011-09-06 22:04:21+00:00
draft: false
title: C Programming
type: page
url: /programming/languages/c
---

# Overview




This is the main parent page for C programming. The information in the following child pages is mostly geared towards C programming in an embedded environment, although there are some parts dedicated to programming on Linux and other environments.




# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Endless Loops




Endless loops are usually used in embedded programming for the main function. They are used to keep the code running continuously, since exiting the main function from most embedded systems is undefined (and why would you want to?). In a non-scheduler based environment (i.e., no operating system), it is commonly called the "main loop". The only code not placed inside (or called from) the main loop is the initialisation code and interrupt handlers. Two common ways of making an endless loop are:



    
    // Endless loop method one (1 could be replaced by a similar constant, such as true)
    while(1)
    {
       // Put code here
    }
    
    // Endless loop method two
    for(;;)
    {
       // Put code here
    }
    
    // A code trap is an endless loop with no executable code inside it.
    // It causes the processor to halt indefintely at the statement
    // and is good for debugging. It is commonly written like this
    while(1);
    // or this
    for(;;);




In an embedded operating system based environment, there may be more than one endless loop. Typically, there is one per concurrent task or process (such as with FreeRTOS). An interrupt driven scheduler controls which loop the processor is currently executing by changing the CPU's instruction pointer.




# The Standard Libraries


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >**Library Name**
</td>

<td >**Description**
</td>

<td >**Popular Objects In Library**
</td>

<td >**Comments**
</td>
</tr>
<tr >

<td ><stdio.h>
</td>

<td >Contains functions for input/output data streams
</td>

<td >printf(), sprintf(), scanf()
</td>

<td >Very common header file. You be searching hard to find a C project which didn't use this library.
</td>
</tr>
<tr >

<td ><stdlib.h>
</td>

<td >
</td>

<td >atoi(), atof(), rand(), malloc(), abs(), div(), NULL
</td>

<td >Contains a mixture of different functions, some mathematically based, while others related to memory management.
</td>
</tr>
<tr >

<td ><stdbool.h>
</td>

<td >Contains definitions for true and false
</td>

<td >true, false
</td>

<td >Added in C99, contains macros for true and false. C++ supports these natively.
</td>
</tr>
<tr >

<td ><math.h>
</td>

<td >Contains mathematical functions
</td>

<td >sin(), cos(), tan(), pow(), sqrt(), exp(), log, ceil(), floor()
</td>

<td >Software based operations. These can be computationally expensive!
</td>
</tr>
</tbody>
</table>





# Coding Standards




The Joint Strike Fighter C++ Coding Standards (semi-applicable to C also). Created by Lockhead Martin. A bit of a hefty read (I would never read this cover-to-cover unless I had too), but there is some good stuff in there. [scribd id=3969122 key=key-2kngufjhmo9zcs93g4mf mode=list] There are programs out there which format and tidy up your code. One such example is AStyle (or Artistic Stylle), a open-source program which is a




<blockquote>...source code indenter, formatter, and beautifier for the C, C++, C# and Java programming languages</blockquote>




Click [here](http://astyle.sourceforge.net/) to visit their website.




# External Links




The C library reference ([http://www.cplusplus.com/reference/clibrary/](http://www.cplusplus.com/reference/clibrary/)) provides good explanations on standard functions that are included with the C programming language, organised by file and then by function. Also check out the [GNU C Pre-processor reference](http://gcc.gnu.org/onlinedocs/cpp.pdf).





<table style="width: 1000px;" border="0" >
<tbody >
<tr >

<td >**Link**
</td>

<td >**Title**
</td>

<td >**Reference**
</td>
</tr>
<tr >

<td style="text-align: center;" >{{< figure src="http://blog.mbedded.ninja/wp-includes/images/crystal/document.png" caption="The GNU C Library Reference Manual"  >}}
</td>

<td style="text-align: center;" >The GNU C Library Reference Manual
</td>

<td style="text-align: center;" >[www.gnu.org](http://www.gnu.org/)
</td>
</tr>
<tr >

<td style="text-align: center;" >{{< figure src="http://blog.mbedded.ninja/wp-includes/images/crystal/document.png" caption="C Reference Card (ANSI) v2.2"  >}}
</td>

<td style="text-align: center;" >C Reference Guide (ANSI) v2.2
</td>

<td style="text-align: center;" >http://www.digilife.be/quickreferences/QRC /C%20Reference%20Card%20%28ANSI%29%202.2.pdf (**as of Dec 2017, link dead**)
</td>
</tr>
</tbody>
</table>

