---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-09-16
description: "A tutorial on Python async."
draft: false
lastmod: 2019-09-16
tags: [ "Python", "programming", "programming languages", "software" ]
title: "An Introduction To Asynchronous Programming In Python"
type: "page"
---

## Overview

A coroutine is a Python function that has the keyword `await` before the `def`, e.g.:

```py
async def my_coroutine():
  print('Hello')
```

Calling a coroutine normally won't actually do what you expect!

```py
my_coroutine() # Nothing happens!
```

But it will give you a warning:

```text
main.py:6: RuntimeWarning: coroutine 'my_coroutine' was never awaited
```

Before Python v3.5, the `async` keyword is not available. You can however use a decorator to define a coroutine:

```py
@asyncio.coroutine
def my_coroutine():
  print('Hello')
```

Also, instead of `await`, you can use the `yield from` syntax:

```py

```

## Creating A Worker Model

```python
import asyncio
import random

async def worker_fn(id, job_queue):
    while True:
        sleep_for = await job_queue.get()

        print(f'Worker {id} sleeping for {sleep_for:.2}s.')
        await asyncio.sleep(sleep_for)
        print(f'Worker {id} woke up.')

        job_queue.task_done()

async def main():

    queue = asyncio.Queue()

    # Create jobs for workers to complete
    print(f'Creating jobs...')
    for i in range(1, 10):
        sleep_for_s = random.uniform(0.1, 1.0)
        queue.put_nowait(sleep_for_s)

    # Create three worker tasks
    print(f'Creating and starting workers...')
    workers = []
    for i in range(3):
        worker = asyncio.create_task(worker_fn(i, queue))
        workers.append(worker)

    print(f'Waiting for jobs to be completed.')
    await queue.join()
    print(f'Jobs finished.')

    print(f'Terminating workers...')
    for worker in workers:
        worker.cancel()

    await asyncio.gather(*workers, return_exceptions=True)
    print(f'Workers terminated. Example finished.')
    
if __name__ == '__main__':
    asyncio.run(main())
    exit(0)
```

Will produce the following output:

```text
Creating jobs...
Creating and starting workers...
Waiting for jobs to be completed.
Worker 0 sleeping for 0.88s.
Worker 1 sleeping for 0.84s.
Worker 2 sleeping for 0.65s.
Worker 2 woke up.
Worker 2 sleeping for 0.86s.
Worker 1 woke up.
Worker 1 sleeping for 0.31s.
Worker 0 woke up.
Worker 0 sleeping for 0.59s.
Worker 1 woke up.
Worker 1 sleeping for 0.16s.
Worker 1 woke up.
Worker 1 sleeping for 0.81s.
Worker 0 woke up.
Worker 0 sleeping for 0.38s.
Worker 2 woke up.
Worker 0 woke up.
Worker 1 woke up.
Jobs finished.
Terminating workers...
Workers terminated. Example finished.
```


If you terminate a task that is still waiting on a queue:

```text
Task was destroyed but it is pending!
````