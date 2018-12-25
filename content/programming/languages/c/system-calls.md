---
author: gbmhunter
date: 2013-07-17 23:47:50+00:00
draft: false
title: System Calls
type: page
url: /programming/languages/c/system-calls
---

Most standard C libraries depend on a number of subroutine calls for interacting with system services. These are called system calls.

## Standard C System Calls

## _exit()

Exits a program without cleaning up files.


## close()

Closes a file

```c    
int close(int file) {
    return -1;
}
```






