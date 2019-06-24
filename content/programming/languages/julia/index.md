---
author: gbmhunter
categories: [ "Programming", "Programming Languages" ]
date: 2019-06-21
draft: false
lastmod: 2019-06-21
tags: [ "programming", "programming languages", "Julia" ]
title: "Julia"
type: page
---

## Overview

Julia code files usually end in `.jl`.

## Installation

### Linux

You can download generic Linux binaries at [https://julialang.org/downloads/](https://julialang.org/downloads/).

```bash
$ wget <URL to binary>
$ sudo mkdir -p /opt/julia
$ sudo tar xf julia.tar.gz /opt/julia
$ export PATH:"$PATH:/opt/julia/bin"
```

You will probably want 

## Compilation

You can compile a Julia file with:

```bash
$ julia my_file.jl
```