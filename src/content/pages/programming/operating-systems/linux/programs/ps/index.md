---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-01-28
draft: false
title: ps
type: page
---

## Overview

The ps command (a.k.a _process status_) provides a **snapshot of the current processes** running on the system.

For **repetitive updating of the process information** (e.g. updates on how much CPU and memory each process is using, similar to Task Manager in Windows) see the top command instead.

## Default Implementation

By default, ps only prints processes owned by the current user, **AND** are processes that are associated with the terminal that called `ps`. Normally this will result in quite a small amount of output, perhaps only 2-5 processes.

```sh    
gbmhunter@ubuntu:~$ ps
    PID TTY          TIME CMD
    71811 pts/3    00:00:00 bash
    73771 pts/3    00:00:00 ps
gbmhunter@ubuntu:~$ 
```

You will always be guaranteed these two above when running from a bash terminal, obviously bash is running, and so is the ps command (it includes itself).

## More Complete Information

More complete information on the running processes of the system can be found by providing arguments, such as the UNIX-style `ps -e`:

```sh   
[ghunter@ubuntu ~]$ ps -e
    PID TTY          TIME CMD
        1 ?        01:15:50 systemd
        2 ?        00:00:26 kthreadd
        3 ?        00:02:24 ksoftirqd/0
        8 ?        00:01:55 migration/0
        9 ?        00:00:00 rcu_bh
    10 ?        06:22:40 rcu_sched
    11 ?        00:00:51 watchdog/0
    12 ?        00:01:00 watchdog/1
...
```

If you want more detail on the command that started each process, use `ps -ef`.

```sh    
[ghunter@ubuntu ~]$ ps -ef
UID         PID   PPID  C STIME TTY          TIME CMD
root          1      0  0 Jan02 ?        01:15:51 /usr/lib/systemd/systemd --system --deserialize 22
root          2      0  0 Jan02 ?        00:00:26 [kthreadd]
root      45147      1  0 Jun06 ?        00:00:19 /usr/sbin/crond -n
root      45697      1  0 Jun06 ?        00:06:39 /usr/sbin/irqbalance --foreground
root      45718      1  0 Jun06 ?        00:00:00 /usr/sbin/atd -f
ntp       45742      1  0 Jun06 ?        00:00:18 /usr/sbin/ntpd -u ntp:ntp -g
```

Remember that `PID` is the process ID and `PPID` is the parent process ID.

If you use BSD style options (no dash), `ps` will print the command and the provided options for each process, rather than the executable name:

```sh    
gbmhunter@ubuntu:~$ ps -aux
USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          1  0.0  0.0  33896  4020 ?        Ss   Jan27   0:02 /sbin/init
root          2  0.0  0.0      0     0 ?        S    Jan27   0:00 [kthreadd]
root          3  0.0  0.0      0     0 ?        S    Jan27   0:01 [ksoftirqd/0]
root          5  0.0  0.0      0     0 ?        S<   Jan27   0:00 [kworker/0:0H]
root          7  0.0  0.0      0     0 ?        S    Jan27   0:30 [rcu_sched]
root          8  0.0  0.0      0     0 ?        S    Jan27   0:00 [rcu_bh]
root          9  0.0  0.0      0     0 ?        S    Jan27   0:00 [migration/0]
root         10  0.0  0.0      0     0 ?        S    Jan27   0:00 [watchdog/0]
root         11  0.0  0.0      0     0 ?        S    Jan27   0:00 [watchdog/1]
root         12  0.0  0.0      0     0 ?        S    Jan27   0:00 [migration/1]
root         13  0.0  0.0      0     0 ?        S    Jan27   0:01 [ksoftirqd/1]
root         15  0.0  0.0      0     0 ?        S<   Jan27   0:00 [kworker/1:0H]
...
```

This is only a snapshot of the total number of processes it will print!

## Supported Options

`ps` can support a large and confusing amount of different option styles, including UNIX options (one dash), BSD options (no dash) and GNU long options (two dashes).

## ps With grep

The output of `ps` can be piped to `grep` to filter the results. For example, if you wanted to only look for processes with the word `hocus_pocus` in it:

```sh    
$ ps -aux | grep hocus_pocus
```

Note: grep will **match anything on the line** printed by `ps -aux`. That means that `hocus_pocus` will be matched against the username column and any paths in the process name.

However, aside from having to use two commands, there are other disadvantages to using `ps` with `grep`. A completely new program, `pgrep` was built to try and provide a better process-searching tool.
