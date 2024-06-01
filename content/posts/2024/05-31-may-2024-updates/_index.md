---
authors: [Geoffrey Hunter]
categories: [Posts, Updates]
date: 2024-05-31
description: Blog updates during May 2024.
draft: false
images: []
lastmod: 2024-05-31
tags: [NinjaTerm, updates, profiles, baud rates, hex, numbers, flow control, serial port, macros, break signal]
title: April 2024 Updates
type: post
---

[NinjaTerm](https://ninjaterm.mbedded.ninja/) got four releases this May! Given all the time I spent on NinjaTerm there were no updates to this blog.

NinjaTerm can now display numerical data types such as hex, uint8, uint16, float32, e.t.c.:

{{% figure src="_assets/ninjaterm-number-types-screenshot.jpg" width="600px" %}}

You can now send a 200ms break signal by pressing Ctrl-Shift-B when the terminal is focused and the serial port open.

You can now specify a custom baud rate, and updated the default baud rates to include more common options.

A circular progress modal is shown while the port is being opened.

NinjaTerm has a new macros feature which lets you send pre-defined ASCII or HEX sequences out the serial port:

{{% figure src="_assets/ninjaterm-macros-screenshot.png" width="900px" %}}

You now have the ability to select the flow-control method (none or hardware) when opening a serial port:

{{% figure src="_assets/ninjaterm-flow-control-screenshot.png" width="700px" %}}

NinjaTerm has a new profiles feature which lets you save and load different serial port configurations.

{{% figure src="_assets/ninjaterm-profiles-screenshot.jpg" width="900px" %}}
