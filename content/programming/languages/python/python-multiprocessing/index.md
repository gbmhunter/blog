---
author: gbmhunter
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-05-23
draft: false
lastmod: 2019-05-23
tags: [ "programming", "programming languages", "Python" ]
title: Python Multiprocessing
type: page
---

## Overview

Multiprocessing in Python is supported through the `multiprocessing` library.

## Pools Within Pools

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