---
author: gbmhunter
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2015-01-02
draft: false
title: kill
type: page
---

## Overview

`kill` is a UNIX-based program that makes it easy to "kill" (stop running) process running in the operating system.

## Find And Kill Processes By Name

You can use the following bash shell command to find and kill processes by name (or partially by name). This is good if you have a bunch of related processes you want to kill and don't want to manually hunt down their PIDs first.

```sh    
kill $(ps aux | grep 'text for find here' | awk '{print $2}')
```

Replace text to find here with the text that will be in all the processes you want to kill. Aside from kill, this command also used the programs `ps`, `grep` and `awk`.
