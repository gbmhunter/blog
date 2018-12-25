---
author: gbmhunter
date: 2011-09-15 07:24:03+00:00
draft: false
title: ATMEL Xmega - General I/O
type: page
url: /programming/microcontrollers/atmel/atmel-xmega-family/atmel-xmega-general-io
---

## Controlling A Port

The Xmega has hardware registries that speeds up controlling ports by skipping the read-execute-write cycle. The following example shows ways of controlling a port pin.

```c
PORTB.DIRSET = (1 << 3);
PORTB.OUTSET = (1 << 3);
PORTB.OUTTGL = (1 << 3);
```
