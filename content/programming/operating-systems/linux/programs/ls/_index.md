---
author: gbmhunter
date: 2014-03-25
draft: false
title: ls
type: page
---

## Overview

The ls command **lists directory contents**. It is one of the most commonly used commands in a Linux environment. ls is similar to dir in a Windows environment.

## List File/Folder Size

You can use the `-l` option to list file and folder sizes:

```sh    
$ ls -l
```

By default, ls outputs file/folder sizes in bytes, no matter how large the file. To improve on this when using ls, use the -h flag to enable "human readable" output.

```sh    
$ ls -lh
```

## Finding What Shell You Are Using

You can use the `ls` program along with the flag `-l` (use the long list format) to determine what shell program you are using (bash, dash, Bourne, e.t.c).

Type the following command:

```sh  
$ ls -l /bin/sh
```  

If I was running bash, the program will output something like this:

```sh    
lrwxrwxrwx 1 root root 4 Mar 25 10:02 /bin/sh -> bash
```