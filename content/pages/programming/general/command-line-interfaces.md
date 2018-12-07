---
author: gbmhunter
date: 2014-01-21 07:40:34+00:00
draft: false
title: Command-line Interfaces
type: page
url: /programming/general/command-line-interfaces
---

# Overview

A command-line interface is a way of interacting (sending instructions, receiving info) with programs on a computer.

NOTE: For a C++ command-line interpreter, that can run on both embedded and P.C. architectures, see [clide-cpp on Github](https://github.com/gbmhunter/clide-cpp).

See [C->Processing Command-Line Input](/programming/languages/c/processing-command-line-input) for how to write C code for dealing with command-line arguments passed to main().

Related is the page [C#->Redirecting The Command-line To A Text Block](/programming/languages/c-sharp/redirecting-the-command-line-to-a-text-block).

# Command Description (Help) Syntax

* Angled brackets for required parameters, e.g. cd <dir name>.
* Square brackets for optional parameters, e.g. ls [-a].
* Ellipses for repeated items, e.g. cp <source1> [source2...] .
* Vertical bars and curly braces when there is a choice of items (logical or), e.g. netstat {-t|-u}.
