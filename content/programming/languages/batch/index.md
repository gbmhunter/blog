---
authors: [ "Geoffrey Hunter" ]
date: 2013-06-02
draft: false
title: "Batch Files"
type: page
---

> MS-DOS commands use a `/` character to signify a flag. All command syntax on this page uses square brackets for optional parameters.

## Overview

This page is all about the programming language used to write functioning batch file scripts for running in the Windows operating system. For native Windows commands/programs that you call call from a batch file or command prompt, see the [Windows page](/programming/operating-systems/windows).

A batch file is a text file with the extension `.bat`. They are scripting files for the Windows command-line.

## Comments

Single-line comments can be inserted with either the double colon (`::`) or `rem` command.

```
:: This is a comment.

rem This is also a comment.
```

Text stops being a comment once there is a new line.

## Echo

Echo is usually turned off to stop every line of code from being printed to the user:

```text
echo off
```

Notice though, although no lines after echo off will be printed, echo off is still printed since it is not executed until after it has been printed. To stop this from happening, you can suppress echoing with the `@` symbol like so:

```text
@echo off
```

Once echo is turned off, the only thing that will be printed is stuff which is explicitly being instructed to do so by the word echo.

Naturally, you turn echo back on at any point with the command echo on.

## Variables

Variables are set to a value, or cleared/deleted by using the set command.

```text
:: This sets the variable to 3
set myVar=3
:: This clear the variable
set myVar=
```

{{% aside type="warning" %}}
When setting a variable, anything after the equals sign, including white-space, is part of the variable, up-to the last non-white character. You have to be careful you don't accidentally add space to strings when assigning to them:
{{% /aside %}}

```text
set myVar = This is a string
echo "%myVar%"

:: This will echo " This is a string". Notice the space at the start!
```

Variables are used by enclosing them with the `%` character, e.g. `%myVar%`.

```text
set myVar2 = %myVar%
```

## Replacing Substrings Within Strings

Batch files provides a way to replace substrings within a string (or more generically, find and replace parts of a variable).

```text
set str1=%1
set searchText=find me
set replaceText=replacement text
set modifiedText=!str1:%searchText%=%replaceText%!
```

This technique can be used to detect whether a string contains a particular substring, as you can compare the replaced text with the original and check if they are equal (I know this sounds convoluted, but this is how you must do things in batch files).

## Processing The Output Of A Command

You can process the output of a command by using a for loop. The `\f` flag is commonly used.

If the command output only has one line, you can use:

```text
for /F %%G in ('hg id') do call :CheckId "%%G"
```

If the command output contains multiple lines, you can use:

```text
setlocal enabledelayedexpansion
set CONCAT_STR=
for /f "delims=" %%i in ('hg status') do set "CONCAT_STR=!CONCAT_STR! %%i"
echo !CONCAT_STR!
```

You can replace `hg status` with any command that you can run from the command line.

## Delayed Expansion

This a great method for preventing expansion of variables at parse time. It delays the expansion until execution time.

Delayed expansion can be set with the following command:

```text
setlocal enabledelayedexpansion
```
