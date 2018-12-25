---
author: gbmhunter
date: 2017-01-05 14:47:50+00:00
draft: false
title: pkill
type: page
url: /programming/operating-systems/linux/programs/pkill
---

## Overview

pkill is a program that can be used to send a signal to a processes, by specifying a regex pattern that matches part of the process name (or it's full command line name with the -f option).

## Force Kill

The most direct way to kill a process is with:

```sh   
$ sudo pkill -9 "this_matches_part_of_process_name"
```

The `-9` option tells pkill to issue the SIGKILL signal.

## Be Careful!

pkill can be the nuclear bomb of all kill tools, as it is surprisingly easy to make the pattern too weak, and it matches something you didn't intend. And a way to crash your computer:

```sh   
$ sudo pkill -9 ".*" 
```