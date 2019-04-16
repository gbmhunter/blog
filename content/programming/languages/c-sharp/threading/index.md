---
author: gbmhunter
date: 2013-04-11
draft: false
title: Threading
type: page
---

## Updating The UI From Another Task

In WPF, the "Dispatcher" is the way to call a function that belongs to a class in one thread from another thread.

As long as the class you are calling supports the `Dispatcher` object (all UI classes such as `Window` do), you can use the following code. Note that the function to execute is defined in the function call to `BeginInvoke()`.

```c#    
// Need to do this because called from another thread
_mainWindowHndle.Dispatcher.BeginInvoke(new Action(delegate() { 
        _mainWindowHndle.WriteToConsole("Writing message from different thread!"); 
    }));
```

If you want the calling thread to wait until the dispatcher function has run to completion before continuing (i.e. synchronous execution), you can use the `Invoke()` method rather than `BeginInvoke()`.

## Locking

Locking is the common way of making thread-safe code in C#. It is done with the keyword lock, which is a native keyword in C# (it doesn't require any library or .dll to be included for it to work).

A lock can be taken out on any object, although it is common to make a separate object of type `object`, just for locking.

```c# 
static object _locker = new object();

// This function can be called from multiple threads, and
// since it uses statics, will result in corruption if
// not "locked".
void MethodUsedInMultipleThreads() {
    static int x = 1;
    static int y = 1;

    // Only one instance of this method can "lock"
    // at a time, other instance in other threads will
    // wait until it is "unlocked" at the end of this 
    // block
    lock(_locker) {
        // The code in here is thread-safe
        x = x*x;
        y = x + y;
    }
    // _locker is now unlocked again.
}
```

## Queues

Queues are a good way of passing information between two asynchronous threads. The .NET language supports queues with the `System.Collections.Generic.Queue<T>` class.

The actual objects that are queued can be defined as any standard class. To be thread-safe, reading and writing from the queue (enqueue and dequeue respectively), requires the use of a lock so you don't happen to be half way through writing to it when you start to read from it.

```c#
Queue<string> cmdQueue = new Queue<string>(10);
static object _locker = new object();

void SendCmd(string txCmd) {
    lock(_locker) {
        cmdQueue.Enqueue(txCmd);
    }
}

void ReadCmd() {
    string rxCmd;
    lock(_locker) {
        if(cmdQueue.Count > 0)
            rxCmd = cmdQueue.Dequeue();
    }
}
```