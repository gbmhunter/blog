---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Programming Languages" ]
date: 2019-06-21
description: "Info about the Julia programming language."
draft: false
lastmod: 2019-06-21
tags: [ "programming", "programming languages", "Julia", "install" ]
title: "Julia"
type: page
---

## Overview

Julia is a dynamically-typed, compiled language with a strong emphasis on mathematics and data visualization applications. Julia code files usually end in `.jl`.

{{% figure src="julia_programming_language_logo.png" width="200px" caption="The Julia logo." %}}

## Installation

### Linux

You can download generic Linux Julia binaries at [https://julialang.org/downloads/](https://julialang.org/downloads/).

```bash
$ wget <URL to binary>
$ sudo mkdir -p /opt/julia
$ sudo tar xf julia.tar.gz /opt/julia
$ export PATH:"$PATH:/opt/julia/bin"
```


## Compilation

You can compile a Julia file with:

```bash
$ julia my_file.jl
```