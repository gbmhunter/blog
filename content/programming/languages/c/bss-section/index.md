---
author: gbmhunter
date: 2014-11-04
draft: false
title: .bss Section
type: page
---

## Overview

The .bss section can be remembered as the "better save space" section. What it actually stands for _block started by symbol_.

It is a section used by many compilers and linkers (including GCC) to store part of the data segment containing statically-allocated variables that are initialised to 0 on startup in a compiled program.

The .bss section in the compiled object file **doesn't actually consume up any space** (because all the memory is initialised to 0), apart from remembering the total size that this section will require at runtime.
