s---
author: gbmhunter
date: 2013-04-30 23:17:40+00:00
draft: false
title: Doxygen
type: page
url: /programming/general/doxygen
---

# Overview

Doxygen is an open-source program for **documenting code**. It is commonly used to build documentation from **source files which have special identifiers added** to help generate useful documentation. Doxygen supports many languages (including C, C++, C#, Java, Python, VHDL, PHP and others...), however only C/C++ documentation is covered here. As of 2016, it is guessed to be the **most popular method for documenting C/C++ code**.

{{< figure src="/images/2013/05/doxygen-logo.png"   >}}

It is essentially a program which looks through your source code and extracts information about functions, variables, enumerations, defines and almost everything else, including special comments and identifies that you place in the code, and compiles it into a nice looking html, pdf, or latex document. With the right commands, you can create a customised main page, linking between similar functions, automatic bug/todo lists, insert latex equations and more!

{{< figure src="/images/2013/05/doxygen-html-documentation-screenshot.png" width="1919px" caption="Screenshot of the html documentation that Doxygen generates with properly commented code."  >}}

# Doxygen Quick Reference

A quick reference of the most popular Doxygen keywords for documenting source code:

<table>
    <thead>
        <tr>
            <th>Command</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >@brief
</td>

<td >Gives a brief description of the object (variable/function/enum/struc/define) that will appear beside the name of the object in the index at the top of the pages that Doxygen produces.
</td>
</tr>
<tr >

<td >@details
</td>

<td >A more detailed description of the object that will appear below the index at the top of the page.
</td>
</tr>
<tr >

<td >@param
</td>

<td >Used to describing parameters (arguments) into a function.
</td>
</tr>
<tr >

<td >@returns
</td>

<td >Used to describe the return value from a function (if any). Has the same functionality as @return.
</td>
</tr>
<tr >

<td >@sa
</td>

<td >Used to refer to other objects (acronym for 'see also').
</td>
</tr>
<tr >

<td >@public
</td>

<td >Defines the object as public. Useful in C programming since the visibility is not usually implicit.
</td>
</tr>
<tr >

<td >@private
</td>

<td >Define the object as private. Useful in C programming since the visibility is not usually implicit.
</td>
</tr>
<tr >

<td >@todo
</td>

<td >I add it anywhere where I want to come back a change something at a later date. Doxygen automatically finds these notes and combines them into a "To Do" page in the documentation!
</td>
</tr>
<tr >

<td >@debug
</td>

<td >I add this wherever I have added code which is specifically for debugging.
</td>
</tr>
</tbody>
</table>

# How To Use Doxygen

To use Doxygen, you first place appropriate documenting comments in the source files. The comments must be made with a special comment operator that Doxygen recognizes. Normally, the documentation comments are placed directly before the object (e.g. function, variable) that you want to document. Then to generate the documentation, run Doxygen from the command-line in Linux, or Doxywizard on Windows, and it will make some nicely formatted HTML or Latex (PDF) documentation.

```c
// Normal C comment. Doxygen will ignore this
//! Comment Doxygen will recognise that tells you something
//! about DocumentedFunction()
void DocumentedFunction()
{
    // function code...
}
```

# Example File Header

I normally use the following file headers when documenting with Doxygen.

```c
//!
//! @file 	DoxygenExample.h
//! @author 	Geoffrey Hunter (gbmhunter@gmail.com)
//! @edited 	n/a
//! @date 	12/09/2012
//! @brief 	Doxygen example file.
//! @details
//!	<b>Last Modified: </b> 07/11/2012\n
//!	<b>Version: </b> v1.0.0\n
//!	<b>Company: </b> CladLabs\n
//!	<b>Project: </b> Doxygen Examples\n
//!	<b>Language: </b> C++\n
//!	<b>Computer Architecture: </b> ARM\n
//!	<b>Compiler: </b> GCC\n
//! 	<b>uC Model: </b> PSoC5\n
//! 	<b>Operating System: </b> FreeRTOS v7.2.0\n
//!	<b>Documentation Format: </b> Doxygen\n
//!	<b>License: </b> GPLv3\n
//!
```

**EXAMPLE: A full working Doxygen example in C++ can be found at [https://github.com/mbedded-ninja/CppTemplate](https://github.com/mbedded-ninja/CppTemplate). The Doxygen configuration file generates documentation for this C++ template project and the HTML documentation output can be viewed on GitHub pages at [https://mbedded-ninja.github.io/CppTemplate/index.html](https://mbedded-ninja.github.io/CppTemplate/index.html).**

# The Main Page

The first time you use Doxygen, you open up your newly created documentation and discover that the first page (aka the main page or landing page) is blank. This is because Doxygen designed it this way, and to put stuff on it, you have to specifically tell Doxygen to do so. This can be done with the @mainpage command. The following example adds a main page with two sections.

```    
/*!

    @mainpage

        This is the main page

        @section section1 Section 1

            This is section 1 on the main page

        @section section2 Section 2

            This is section 2 on the main page

*/
```

Note that this code to create a main page doesn't have to be anywhere special, it can be in of the files that Doxygen parses during document creation.

# Doxygen "Escapes" For Comment Blocks

Doxygen supports a number of "escapes", ways of signalling that a code comment should be parsed by the Doxygen engine.

```c
/**
    * A JavaDoc style Doxygen comment block
    */

/*!
    * A Qt style Doxygen comment block
    */

///
/// Another Doxygen comment block
///

//!
//! And another Docygen comment block!
//!
```

All of the above comment blocks are treated identically by Doxygen.

There is also provision for putting documentation after objects such as variables and function parameters. This can be done by adding a < to the end of the Doxygen escape sequence, e.g.:

```c    
int myVar; /*!< This is my variable! */

int myVar; /**< This is my variable! */

int myVar; //!< This is my variable!

int myVar; ///< This is my variable!
```

# Groups

Groups are good for...grouping things together.

```c    
// Groups
//! \defgroup TestGroup
//! @{

// Anything in here will belong to TestGroup

void FuncInTestGroup()
{
    // Code
}

//! @}
```

Groups are good for grouping bunches of related variables together.

# Doxywizard Settings

Doxywizard is a Windows GUI for using Doxygen. Desired Extraction Mode: Documented Entities Only Optimise For: C or PHP output Output format: HTML (with navigation panel, search function) Setting EXTRACT_PRIVATE = 1 and EXTRACT_STATIC = 1 results in doxygen including all commented objects into the documentation, not just the ones that it deems public or accessible from other files (static). I find this to be much more useful than to exclude them, as without these objects present in the documentation it can leave the reader wondering how on earth your code works (C doesn't have the nice public interface structure that object orientated programming has). The following picture shows the two options selected when using the Doxygen GUI (Doxywizard).

{{< figure src="/images/2013/05/doxygen-gui-extract-private-and-static-selected.png" width="829px" caption="Selecting 'EXTRACT_PRIVATE' and 'EXTRACT STATIC' in the Doxygen GUI."  >}}

Make sure to save your configuration file (doxyfile, no extension) somewhere with the source code so you can run it again and doxygen will remember the settings.
