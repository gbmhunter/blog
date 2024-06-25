---
authors: [Geoffrey Hunter]
categories: [Programming]
date: 2024-06-25
draft: false
lastmod: 2024-06-25
tags: [ANSI, escape codes, escape sequences, ASCII, terminal, console, color, text, formatting]
title: ANSI Escape Sequences
type: page
---

## Overview

ANSI escape sequences (also called ANSI escape codes) are special "in-band" character sequences that are used to control the formatting, color, and other output characteristics of text in a terminal or console. They can be used to enhance the user experience of a terminal, create advanced text-based user interfaces, and are often used in command-line applications. They are also very useful in microcontroller firmware for creating sophisticated debug shells and colouring debug logs when sending serial data to a terminal program.

[NinjaTerm](https://ninjaterm.mbedded.ninja/), a web-based program for viewing serial data from microcontrollers, supports many ANSI escape codes. So do many other terminal programs, such as PuTTY and minicom.

## Escape Character

ANSI escape sequences begin with the escape character, which is represented by the ASCII code `27` (decimal) or `0x1B` (hexadecimal). This character is often represented in code as `\x1B` or `\033`.

This page will use the text `ESC` to represent the escape character. Anytime you see `ESC`, replace it with the actual escape character using `0x1B` or equivalent in your code.

Terminal programs which support ANSI escape sequences will interpret the escape character as the start of a special command sequence, and will not print these received bytes to the screen (the values don't correspond to any printable characters anyway).

## Control Sequence Introducer (CSI)

A `[` after `ESC` is used to introduce a control sequence. Most of the useful ANSI escape sequences (including cursor movement, text clearing and text styling) are in this CSI subset.

### Cursor Movement

The following escape sequences can be used to move the cursor around the terminal[^fnky-ansi]:

* `ESC[<n>A`: Move the cursor up `n` lines.
* `ESC[<n>B`: Move the cursor down `n` lines.
* `ESC[<n>C`: Move the cursor right `n` columns.
* `ESC[<n>D`: Move the cursor left `n` columns.

These commands have no effect if the cursor is already at the edge of the terminal (as defined by the number of rows and columns of the terminal).

### Display Attribute and Mode Commands

The sequence `ESC[<attr>m` is used to set display attributes and modes. This includes text color, background color and text style.

Attributes can be chained together by separating them with a `;`. For example, `ESC[1;31m` sets the text to bold and red.

## References

[^fnky-ansi]: Fnky. _ANSI Escape Sequences_. Retrieved 2024-06-25, from https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797.
