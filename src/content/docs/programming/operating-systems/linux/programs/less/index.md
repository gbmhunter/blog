---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-01-20
draft: false
tags: [ "programming", "operating systems", "Linux", "programs", "less", "searching" ]
title: less
type: page
---

## Overview

`less` is a Linux-based program that can be used to read sections of large text-based files to the terminal. Unlike `cat`, `less` will limit the output to the height of the current terminal session and implements a scroll buffer to scroll forward and backwards through the file.

A consequence of `less` implementing it's own scroll buffer is that the terminal history will not be polluted with the contents of the file once `less` is closed.

## Basic Commands

Type the following at the command-prompt to open a file for viewing in `less`:

```sh
$ less my_file.txt
```

Once in `less`, use the arrow keys to scroll forward and back in the file. You can also use the mouse wheel for scrolling.

Press `q` or `Q` to exit `less`.

## Searching

You can search for text in `less` with the `/<search string>` command:

While in `less`, the following will find the first instance of `foo`:

```text
/foo
```

To continue jumping to each successive match, press `n`.

To include spaces in the search pattern you must enclose the search pattern in quotes:

```text
/"find me"
```
