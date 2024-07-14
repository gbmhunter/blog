---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-05-23
draft: false
lastmod: 2019-05-23
tags: [ "programming", "programming languages", "Python", "multiprocessing", "processes", "pools", "workers", "children", "daemonic processes", "zombie processes", "Global Interpreter Lock" ]
title: Python Multiprocessing
type: page
---

## Overview

The Python `multiprocessing` library allows you to spawn multiple child processes from the main Python process. This allows you to take advantage of multiple cores inside of a processor to perform work in a parallel fashion, improving performance.

Multiprocessing is especially important in Python due to the GIL (Global Interpreter Lock) which prevents multithreading from being a good solution for resource bound applications (Python threads still work for I/O bound applications).

The following differences must be remembered:
* It is much harder/slower to share data when using multiprocessing than with multithreading. The Python `multiprocessing` library supports the somewhat simple passing of data between the parent and child processes, however it requires all objects to be serializable (which puts a restriction on what data can be shared). Sharing data between child processes requires the use of OS objects such as pipes or queues.
* New processes use more OS resources than new threads.
* Child processes do not crash the main process if they throw an exception/seg fault e.t.c, resulting in a more resiliant application than when using multithreading.

## Multiprocessing Pools

Python's `multiprocessing.Pool` allows you create a number of "workers" which run in child processes. The parent process can then give the `Pool` tasks, and the pool will distribute the tasks as evenly as possible across the workers. A `Pool` is a great way of distributing work across multiple processes without you having to manage the process creation/teardown and work dirstribution yourself.

### Pools Within Pools

If you try and create a `Pool` from within a child worker that was already created with a `Pool`, you will run into the error: `daemonic processes are not allowed to have children`.

This is because Python's `Pool` class creates workers processes which are daemonic. It does this for a number of reasons, one being to disallow children processes to spawn of children processes to prevent an "army of zombie grandchildren".

The following code is from [https://stackoverflow.com/questions/6974695/python-process-pool-non-daemonic](https://stackoverflow.com/questions/6974695/python-process-pool-non-daemonic):

```py
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import multiprocessing
# We must import this explicitly, it is not imported by the top-level
# multiprocessing module.
import multiprocessing.pool
import time

from random import randint


class NoDaemonProcess(multiprocessing.Process):
    # make 'daemon' attribute always return False
    def _get_daemon(self):
        return False
    def _set_daemon(self, value):
        pass
    daemon = property(_get_daemon, _set_daemon)

# We sub-class multiprocessing.pool.Pool instead of multiprocessing.Pool
# because the latter is only a wrapper function, not a proper class.
class MyPool(multiprocessing.pool.Pool):
    Process = NoDaemonProcess
```

The can be used as such:

```py
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import multiprocessing
# We must import this explicitly, it is not imported by the top-level
# multiprocessing module.
import multiprocessing.pool
import time

from random import randint

def sleepawhile(t):
    print("Sleeping %i seconds..." % t)
    time.sleep(t)
    return t

def work(num_procs):
    print("Creating %i (daemon) workers and jobs in child." % num_procs)
    pool = multiprocessing.Pool(num_procs)

    result = pool.map(sleepawhile,
        [randint(1, 5) for x in range(num_procs)])

    # The following is not really needed, since the (daemon) workers of the
    # child's pool are killed when the child is terminated, but it's good
    # practice to cleanup after ourselves anyway.
    pool.close()
    pool.join()
    return result

def test():
    print("Creating 5 (non-daemon) workers and jobs in main process.")
    pool = MyPool(5)

    result = pool.map(work, [randint(1, 5) for x in range(5)])

    pool.close()
    pool.join()
    print(result)

if __name__ == '__main__':
    test()
```