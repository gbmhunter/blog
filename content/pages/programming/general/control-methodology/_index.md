---
author: gbmhunter
date: 2011-09-22 05:58:46+00:00
draft: false
title: Control Methodology
type: page
url: /programming/general/control-methodology
---

# Overview

You may think that after writing the state machine for flashing a few LEDs and a buzzer that control metholody is a simple task that doesn't require further discussion. However, add in a multi-threaded operating system, asynchronous events, more objects to control and boom, suddenly control methodlogy is no simple topic.

# State Machines (single process)

State machines are coding structures/methodologies to write the top-level code which performs the high level control of your program. State machines are essential for any thing but the most simple of programs, as they organise the code, improve the readability, and make it easy for the code to be changed. A state machine is based on the theory that a program will rest in certain states, and that particular inputs will cause the program to change into another state.


Sequential logic theory (the subject which involves these state machines) says that if the combination of the inputs and the state which the program is in determines the outputs it is a Mealy state machine. If just the state determines the outputs, then it is a Moore state machine. Usually however, when writing a state machine in C for a program, you don't have to strictly follow these rules, as you will find that it can make unnecessary complications to your code.

Go to the [A Function Pointer State Machine](http://blog.mbedded.ninja/programming/c-programming/control-methodology/a-function-pointer-based-state-machine) page for a worked example on how to write a moderately powerful state machine.

There is software out there that lets you convert graphical state machine diagrams into usable code. One popular one is the QP state machine framework and the QM modelling tool ([http://www.state-machine.com/](http://www.state-machine.com/)).

# A Big switch() Statement

This is one of the easiest state machines to implement, and is one of the first that programmers will encounter, most often by intuitive happenstance.

The code below demonstrates the switch() state machine with a basic motor-based example:

```c
enum class MotorStates
{
    NONE,
    INIT,
    STOPPED,
    RUNNING
};

int main()
{
    MotorStates currState = MotorStates::INIT;

    // Loop indefinetly
    while(true)
    {
        switch(currState)
        {
            case MotorStates::NONE :
                break;
            case MotorStates::INIT :
                // Init complete, goto STOPPED state
                currState = MotorStates::STOPPED;
                break;
            case MotorStates::STOPPED :
                break;
            case MotorStates::RUNNING :
                break;
        }
    }
}
```

You can add code which runs only on the entry to each state by keeping track of the previous state. You will now see why I added the MotorStates::NONE state.

```c    
int main()
{
    MotorStates currState = MotorStates::INIT;
    MotorStates prevState = MotorStates::NONE;
    
    // Loop indefinetly
    while(true)
    {
        switch(currState)
        {
            case MotorStates::NONE :
                break;
            case MotorStates::INIT :
                if(prevState != currState)
                {
                    // This code will run once on entry to state
                    prevState = currState;
                }
                // Init complete, goto STOPPED state
                currState = MotorStates::STOPPED;
                break;
            case MotorStates::STOPPED :
                if(prevState != currState)
                {
                    // This code will run once on entry to state
                    prevState = currState;
                }
                break;
            case MotorStates::RUNNING :
                if(prevState != currState)
                {
                    // This code will run once on entry to state
                    prevState = currState;
                }
                break;
        }
    }
}
```

One of the drawbacks is that you have to remember to break out of every case, otherwise you will get fall through to the next state.

# Real Time Operating Systems (RTOS, multiple process)

Let's not get confused here, RTOS's still need state machine or other control methodologies, but they offer increased simplicity of these state machines and a powerful architecture to handle concurrent matters. Their principal function is to provide processes (or tasks), aka separate sections of code which can run concurrently (at the same time).

The central control code which handles the switching between tasks and memory allocation is called the kernel.

RTOS's can either be co-operative or pre-emptive. With a co-operative RTOS you cannot guarantee a fixed time from when an event occurs and the process related to this event runs. This is because processes can only be executed when the kernel gets a return call from a previously called process, the kernel has no ability to stop the cpu half-way through a process to begin another. However, interrupts (in the physical/hardware sense), can still 'interrupt' the CPU (for example, in embedded systems, the 'interrupting ability' of 'interrupts' is built into hardware, and there is no way of stopping it...(well, at least without disabling it)).

However, you guessed it, preemptive RTOS's can halt the current process to execute another, hence they are slightly more real-time than their co-operative counter-parts. Preemptive RTOS's are more complex and memory intensive than co-operative ones. Most advanced RTOS's these days are preemptive.

## Examples

FreeRTOS ([http://www.freertos.org/](http://www.freertos.org/)) {{< figure src="/images/misc/freertos-logo.jpg" caption="The FreeRTOS logo. Image from http://www.freertos.org/."  width="320px" >}}


Currently officially supports 20+ architectures and is open-source and free to use in commercial applications without having to disclose your code. Huge support from its large user-base. Designed for embedded systems. Can be both co-operative or pre-emptive.

Micrium uC/OS-II

A (stolen straight from their marketing blurb) "Portable, ROMable, scalable, preemptive, real-time deterministic multitasking kernel for microporcessors, microcontrollers and DSPs". Supports a number of architectures. The only problem with it is the price! At over US$5000 for a license, you have to have a good reason for buying it.

# Frameworks

[QL's QP framework and the associated QM modelling tool](http://www.state-machine.com/) are prevelent tools for developing event driven embedded applications. Based on my experience with QM, the program appears highly polished and is coupled tightly with the code. You can even build and upload code for the Arduino from within QM, so you never have to open the Arduino IDE!

Boost has a [Meta State Machine (MSM) library](http://www.boost.org/doc/libs/1_55_0/libs/msm/doc/HTML/index.html). Probably unsuitable for embedded applications, due to the depedance on high-level containers and other Boost objects.

# Other External Links

* The State Machine Framework - Qt Reference Documentation ([https://doc.qt.io/archives/4.6/statemachine-api.html](https://doc.qt.io/archives/4.6/statemachine-api.html))
* State Machines - Basics of Computer Science ([http://blog.markwshead.com/869/state-machines-computer-science/](http://blog.markwshead.com/869/state-machines-computer-science/))

