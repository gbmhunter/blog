---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux" ]
date: 2020-06-26
description: "How to get/set the IO scheduling class and priority for processes running in Linux via the command-line."
draft: false
lastUpdated: 2020-06-26
tags: [ "programming", "operating systems", "Linux", "IO", "scheduling class", "priority", "processes", "command-line", "ionice" ]
title: "How To Change The IO Scheduling Class And Priority In Linux"
---

## Overview

This tutorial makes use of the Linux command-line program `ionice`.

Scheduling classes:

0. **none**: 
1. **real time**: The hgihest-importantance schduling class. There are eight priorites (`0-7`), with lower numbers meaning higher priorites. This scheduling class cannot be assigned by a non-root user.
2. **best effort**: This class will be assigned to any process which didn't explicitly assign a class.
3. **idle**: The process will only get disk time when no other non-idle process has requested disk access for a defined grace period. idle IO usage should no have impact on normal system activity.

## To Get The IO Scheduling Class And Priority Of An Existing Process

Use the following command:

```bash
ionice -p <PID>
```

where `<PID>` is the process ID of the process you want to get the IO scheduling class and priority for. The command will return the IO scheduling class `<class>` and priority `<prio>` in the form:

```bash
<class>: prio <priority>
```

For example:

```bash
$ ionice -p 0
none: prio 4
```

Thus the process with `PID=0` has a scheduling class of `none` and a priority of `4`.

## To Set The IO Scheduling Class And Priority Of An Existing Process

To change the IO scheduling class and priority for an already running process:

```bash
ionice -c <class> -n <class-priority> -p <PID>
```

To start a process and set the IO scheduling class and priority at the same time:

```bash
ionice -c <class> -n <class-priority> <COMMAND>
```

where `<COMMAND>` is standard command-line command + arguments. For example, to start a process running `fstrim /` with the lowest IO schdeduling class and lowest priority:

```bash
ionice -c 3 -n 7 fstrim /
```