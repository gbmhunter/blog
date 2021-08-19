---
authors: [ "Geoffrey Hunter" ]
date: 2012-08-28
draft: false
title: PSoC Power Management
type: page
---

## Processor Speed

As with almost all digital electronics, as the clock speed increases, so does the power consumption. However, this does not neccesarily mean that you save power by running at a faster clock speed. You have to consider that at faster clock speeds, you get the 'job' done faster, meaning the processor is consuming power for less time. In fact, at faster clock speeds, the mA per MHz actually decreases, as shown by the following graph.

{{< figure src="/images/programming-psoc/psoc-5-power-consumption-ma-vs-mhz-graph.png" caption="A graph of the PSoC 5 power consumption expressed as mA per MHz."  width="400px" >}}

## Sleep Code

```c
// PSoC 5 (both parameters to CyPmSleep() are ignored)
CyPmSaveClocks();
CyPmSleep(PM_SLEEP_TIME_NONE, PM_SLEEP_SRC_NONE); // Device is asleep. Code will re-enter here once wakeup ISR is finished.
CyPmRestoreClocks();
```