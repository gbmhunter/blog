---
author: gbmhunter
date: 2012-08-28 06:16:38+00:00
draft: false
title: PSoC Power Management
type: page
url: /programming/microcontrollers/psoc/psoc-power-management
---

# Processor Speed

As with almost all digital electronics, as the clock speed increases, so does the power consumption. However, this does not neccesarily mean that you save power by running at a faster clock speed. You have to consider that at faster clock speeds, you get the 'job' done faster, meaning the processor is consuming power for less time. In fact, at faster clock speeds, the mA per MHz actually decreases, as shown by the following graph. [singlepic id=757 w=400 h=400 float=center]

# Sleep Code

[code] // PSoC 5 (both parameters to CyPmSleep() are ignored) CyPmSaveClocks(); CyPmSleep(PM_SLEEP_TIME_NONE, PM_SLEEP_SRC_NONE); // Device is asleep. Code will re-enter here once wakeup ISR is finished. CyPmRestoreClocks(); [/code]
