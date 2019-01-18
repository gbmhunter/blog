---
author: gbmhunter
date: 2017-08-25 18:20:19+00:00
draft: false
title: Monitor Linux Process Memory Usage Using C/C++
type: page
---

## Overview

Although it is relatively easy to obtain memory usage statistics in Linux, it can be non-trivial to get a good idea on the exact memory that a particular process is using.

Here is one method that will provide you with the virtual and physical memory that the Linux process which calls this code is using (the memory used by yourself):

https://gist.github.com/gbmhunter/00c57b55e2616cd8e1f21f77b79e59fc
