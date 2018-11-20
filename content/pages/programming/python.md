---
title: "Python"
date: 2018-11-14T14:39:50-08:00
type: page
---

![Example image](/images/python-logo-generic.svg)

# Multiprocessing

## A Simple Example

A simple multiprocessing example which shows how to use child processes to calculate square roots:

```python
#!/usr/bin/env python3

import multiprocessing

def worker(num):
    return num*num

def main():
    pool = multiprocessing.Pool()
    results = pool.map(worker, range(10))
    pool.close()
    pool.join()
    print(f'results = {results}')
    # results = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

if __name__ == '__main__':
    main()

```

`pool.map()` does not return until all the results are ready (it is blocking). However, we still need to close the pool to properly clean-up after ourselves. If you forget to `close()` and `join()`, Python will automatically call `terminate()` when the Pool object is garbage collected. `terminate()` is not as friendly as close and may lead to problems.


One caveat with Python's multiprocessing is that everything passed to the processes must be picklable. This means you cannot pass locks, lambdas.


An example using `map_async()` to give the user feedback on the progress.

```python
import multiprocessing
import time
from random import randint

PRINT_PERIOS_S = 2.0

def worker(worker_id):
    # Sleep a random amount of time from 1 to 4s.
    time_to_sleep = randint(1,4)
    time.sleep(time_to_sleep)
    print(f'worker with id = {worker_id} finished.')

    # Return something so we can show how results are collected in parent process
    return worker_id

def map_async_test(num_tasks, print_period_s):
    """
    This will create `num_tasks` number of subprocesses, and report
    back on the completeion status of the processes every `print_period_ms`.
    """
    pool = multiprocessing.Pool(processes=4, maxtasksperchild=1)

    start_time = time.time()
    async_result = pool.map_async(worker, range(num_tasks))

    while True:
        # Accessing "internal" variable in Python stdlib! Not the best practise, but no public API exists for this.
        # Be warned it may change without warning with different versions of Python. However, this is a non-critical
        # call as it's only used for logging (rs.ready() is used to loop termination)
        # _number_left is the number of "chunks" remaining, which is not the same as the number of tasks!!!
        remaining = async_result._number_left
        elapsed_time = time.time() - start_time
        print(f'Waiting for child processes to complete. Function = {worker.__name__}(), '
            f'chunks remaining = {remaining}, elapsed time = {time.strftime("%H:%M:%S", time.gmtime(elapsed_time))}.')

        # Wait until all child processes are complete, or it's time to print log message again
        async_result.wait(print_period_s)

        if async_result.ready():
            break
        
    print(f'Child processes complete. Function = {worker.__name__}(), '
        f'total time = {time.strftime("%H:%M:%S", time.gmtime(elapsed_time))}.')

    # We are finished using the pool, so close and join
    pool.close()
    pool.join()

    # Subprocesses must be finished! Print results
    print(f'results = {async_result.get()}')

if __name__ == '__main__':
    print('main() called.')
    
    map_async_test(10, PRINT_PERIOS_S)

    print('main() finished.')
```

# Shebangs

The recommended shebang for Python 3 is:

```python
#!/usr/bin/env python3
```

And for Python 2:

```python
#!/usr/bin/env python2
```

# pipenv

To create a new environment and install dependencies:

```bash
$ pipenv install
```

## Anaconda Incompatibility

pipenv can be incompatible with Anaconda installations. The problem occurs when Anaconda installs the Python executable into `/usr/sbin/`, and pipenv tries to get the version of this Python installation.

A way to resolve this is to temporarily remove `/usr/sbin/` from your `PATH` environment variable.