---
author: gbmhunter
date: 2013-04-11
draft: false
title: Timers
type: page
---

The `System.Windows.Threading.DispatcherTimer` dispatch timer is used when you only want a single event. It fires of an event, and DOES NOT create a new thread. However, this means that the timer function will not run while other code in the  same thread is executing.

The `System.Timers.Timer` timer creates a new thread for the timer expired event. This can be a useful way of creating a multi-threaded application without going into the hassle of creating the thread yourself.

```c#
// Timer is used for main control loop
private System.Timers.Timer _timer;

public void SetupTimer() {
    // Create a new timer
    _timer = new System.Timers.Timer();
    _timer.Elapsed += new System.Timers.ElapsedEventHandler(Timer_Run);
    _timer.Interval = 100;
    // This is so the thread is only run once at a time,
    // timer is restarted in event handler.
    _timer.AutoReset = false;
}

public void Timer_Run() {
    // Code to run when timer expires. This code
    // will be run in a seperate thread to the one which
    // called SetupTimer()

    // Code here

    // Start the timer again, as AutoReset = false
    // _timer.Start();
}
```