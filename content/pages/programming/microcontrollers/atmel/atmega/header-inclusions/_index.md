---
author: gbmhunter
date: 2011-09-14 21:53:00+00:00
draft: false
title: ATmega Header Inclusions
type: page
url: /programming/microcontrollers/atmel/atmega/header-inclusions
---

Include files that contains functions that are used by your code. Use double quotation marks (") around files that are in the same directory structure as your code, and use greater than, less than symbols for files that are in the default win-avr directory. e.g.

Included file is in the same directory structure as your code

```c    
#include "filename.h"
```

Included file is in the dafault win-avr directory structure

```c    
#include <filename.h>
```

Some of the recommended files to include in your code when using ATmega architecture microcontrollers are:

```c    
#include <stdio.h>
#include <stdint.h>
#include <avr/io.h>
#include <avr/interupt.h>
```