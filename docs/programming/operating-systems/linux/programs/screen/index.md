---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2014-09-17
draft: false
title: screen
type: page
---

## Overview

screen can be used as a terminal, to send and receive information from a serial port.

## Pausing The Terminal And Scrolling Through Past Data

You can pause the output from screen with:

```text
Ctrl-A, Esc 
```

This enters copy mode. You can then use your mouse wheel or the arrow keys to scroll through the received data. Note that any data received while in copy mode will be lost.

## Killing Screen Processes

If you exit screen and go back to the terminal using `Ctrl-C`, the screen process is actually still running (it's just detached). This will prevent you from opening the same device with screen again until it's actually killed. You can still see it if you list all screen processes. To list all screen processes, type the command `screen -ls`.

To kill a specific process, use:

```sh
$ screen -X -S [session number of process] quit
```

The session number is the number listed in front of the device name when you run `screen -ls`. This even destroys detached screen process, in which the `screen kill` command cannot.
