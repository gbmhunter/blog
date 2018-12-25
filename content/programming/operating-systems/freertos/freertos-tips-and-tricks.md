---
author: gbmhunter
date: 2014-07-17 07:54:02+00:00
draft: false
title: FreeRTOS Tips And Tricks
type: page
url: /programming/operating-systems/freertos/freertos-tips-and-tricks
---

## Diagram

The following diagram shows a holistic diagram of the architecture for a medium to large firmware application that runs on a microcontroller and uses a RTOS.

```
\begin{tikzpicture}[node distance = 2cm, scale=1.0] [+preamble] \usepackage[latin1]{inputenc} \usepackage{tikz} \usetikzlibrary{shapes,arrows} [/preamble] \tikzstyle{decision} = [diamond, draw, fill=blue!20, text width=4.5em, text badly centered, node distance=3cm, inner sep=0pt] \tikzstyle{block} = [rectangle, draw, fill=blue!20, text width=5em, text centered, rounded corners, minimum height=4em] \tikzstyle{line} = [draw, -latex'] \tikzstyle{cloud} = [draw, ellipse,fill=red!20, node distance=3cm, minimum height=2em] % Place nodes \node [block] (app) {Application}; \node [block, below of=app] (rtos) {RTOS}; \node [block, below of=rtos] (rtos-adoption) {RTOS Adoption Layer}; \node [block, below of=rtos-adoption] (drivers) {Drivers}; \node [block, below of=drivers] (hardware-abs) {Hardware Abstraction Layer}; \node [block, below of=hardware-abs] (hardware) {Hardware}; % Draw edges \path [line] (app) -- (rtos); \path [line] (rtos) -- (rtos-adoption); \path [line] (rtos-adoption) -- (drivers); \path [line] (drivers) -- (hardware-abs); \path [line] (hardware-abs) -- (hardware); \end{tikzpicture}
```

The hardware is the acutal peripherals that a particular microcontroller has, including things like a UART, I2C and ADC.

## Building In Task Dsiabling Functionality

It is good to design tasks with the ability to be able to disable that task while allowing the application to continue to run.

The idea behind this is that it allows for better and easier debugging, as well as better modularity/decoupling between tasks. If you think a particular task could be causing problems for your application, you can disable the task, and check to see if the application now works fine.

The method of actually disabling a task is up to you, although a good way is to use preprocessor #if statements and variable-like macros to include/exclude the correct code.

When disabling tasks, you have to be careful of the following things:  * Any queues used to communicate between the disabled task and still-running tasks must still exist (and be initialised correctly).  * If the disabled task is now not servicing queues, you have to consider what will happen when data backs up in the queue and the queue becomes full (however, good design mandates that you have already considered this!).

This may be hard or nigh impossible for some tasks to be disabled (e.g. a watchdog task, that if not run, would cause the microcontroller to reset).
