---
author: gbmhunter
date: 2014-04-06 23:02:20+00:00
draft: false
title: ELF Files
type: page
url: /programming/general/elf-files
---

ELF is an initialism for executable and linkable format. ELF files are binary object files. There are three different types of object files that an ELF could be:



<table>
    <thead>
		<tr>
            <th>Type Of Object File</th>
            <th>Description</th>
		</tr>
    </thead>
<tbody>

<tr>	
<td >Relocatable File
</td>		
<td >A relocatable object file holds code and data suitable for linking with other object files to create an exectuable file or shared-object file.
</td>
		</tr>
		<tr >
			
<td >Executable File
</td>
			
<td >An executable files holds a program suitable for execution. These files typically have either a .elf extension or no extension.
</td>
		</tr>
		<tr >
			
<td >Shared-Object File
</td>
			
<td >These are also known as shared library files (as opposed to static library files). These files normally have a lib prefix and a .so extension.
</td>
		</tr>
	</tbody>
</table>

ELF files are the files typically produced by a linker, the last step of a build operation in a language that compiles to machine code. This includes languages like C and C++ but excludes "scripting" languages such as Python and Java.


.elf files replaced the older a.out object file standard (and COFF file format). Some compilers still produce an object file named a.out, even if they do not still use this file format (it is likely to be in the .elf format).

## What Is The Difference Between BIN and ELF Files?

Both BIN and ELF files are files which can be run as programs by the operating system. What is the difference? A bin file is just a list of addresses and data, to run a program. An elf file is a bin file but with lots of additional information, including a symbol table (debug info), and can distuigish code from data.

## Programs That Operate On ELF Files

There are many programs that operate/work with ELF files, especially on UNIX-like systems. These include:

* elfcheck
* objcopy: Used to create a raw binary file from an .elf file.
* objdump
* [readelf](/programming/operating-systems/linux/programs/readelf): Provides the user with information on .elf files.

## ELF Code Libraries


## ELFIO

<table >
	<tbody >
		<tr >
			
<td >Website
</td>
			
<td >http://elfio.sourceforge.net/
</td>
		</tr>
		<tr >
			
<td >Language
</td>
			
<td >C++
</td>
		</tr>
	</tbody>
</table>


ELFIO is a header-only C++ code library for reading and creating ELF files. It is well documented and follows the ISO C++ standard. It supports both 32-bit and 64-bit architectures.
