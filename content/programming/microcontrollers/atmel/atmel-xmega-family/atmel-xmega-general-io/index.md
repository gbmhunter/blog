---
author: gbmhunter
date: 2011-09-15
draft: false
title: ATMEL Xmega - General I/O
type: page
---

## Controlling A Port

The Xmega has hardware registries that speeds up controlling ports by skipping the read-execute-write cycle. The following example shows ways of controlling a port pin.

```c
PORTB.DIRSET = (1 << 3);
PORTB.OUTSET = (1 << 3);
PORTB.OUTTGL = (1 << 3);
```
