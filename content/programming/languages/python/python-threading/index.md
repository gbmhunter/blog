---
author: gbmhunter
date: 2015-01-02 21:43:24+00:00
draft: false
title: Python Threading
type: page
---

## Overview

Python supports threading. However, because of the GIL lock, only one thread is allowed to run at once. There Python threading supports _concurrency_, but not _parallelism_. This makes Python **threading suitable for IO bound operations, but not for processor bound operations**. Most threading functions are made available by adding the code `import threading` to the top of your Python script.

## Gracefully Exiting Multiple Threads

I followed [this example at regexprn.com](http://www.regexprn.com/2010/05/killing-multithreaded-python-programs.html) for the most part, except I discovered the example code was buggy and had to make some tweaks, as outlined below.

```py    
import time
import threading

DEBUG = 0

class MyThread1(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        # A flag to notify the thread that it should finish up and exit
        self.kill_received = False

    def run(self):
        while not self.kill_received:
            self.do_something()

    def do_something(self):

        # Do your thread logic here!

        # Make sure to add some kind of pause as to not starve other threads
        time.sleep(5.0)
    # END | def do_something(self):
# END | class MyThread1(threading.Thread):

# @brief    main() function for script.
# @details  Starts up the individual threads and controls their execution.
def main(args):

    threads = []

    #----- START THE THREADS -----#

    # Start the internet check thread
    print 'Starting MyThread1...'
    t = MyThread1()
    threads.append(t)        
    t.start()
    print 'MyThread1 started...'

    # Start the knob control thread
    print 'Starting MyThread2...'
    t = MyThread2()
    threads.append(t)        
    t.start()
    print 'MyThread2 started...'

    #----- MONITOR THE THREADS -----#

    while len(threads) > 0:
        if DEBUG:
            print 'len(threads) = ', len(threads)
        
        try:
            if DEBUG:
                print 'In try block.'
            # Join all threads using a timeout so it doesn't block
            # Filter out threads which have been joined or are None
            for i in range(len(threads)):
                # Make sure thread still exists
                if threads[i] is not None:
                    if DEBUG:
                        print 'Attemping to join()...'
                    threads[i].join(1)
                    if threads[i].isAlive() is False:
                        if DEBUG:
                            print 'isAlive() is False, removing thread from list...'
                        threads.pop(i)
            if DEBUG:
                print 'Exiting try block...'
        except KeyboardInterrupt:
            print "Ctrl-c received! Sending kill to threads..."
            for t in threads:
                t.kill_received = True
        except Exception as e:
            print "Unknown exception caught! Sending kill to threads...", e
            for t in threads:
                t.kill_received = True

    print 'main() is returning...'

if __name__ == '__main__':
    main(sys.argv)
```

{{% note %}}
The code in class `MyThread1` can be copied to create as many threads as you want (for example, to create `MyThread2`).
{{% /note %}}

## Examples

The [Columbus Radio project](/electronics/projects/columbus-radio) uses multiple Python threads for the UI control. The code is in the [ColumbusRadio repo on GitHub](https://github.com/mbedded-ninja/ColumbusRadio). The threads should gracefully exit if Ctrl-C is pressed in the terminal while they are running.
