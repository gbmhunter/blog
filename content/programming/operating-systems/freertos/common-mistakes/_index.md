---
author: gbmhunter
categories: [ "Embedded", "Operating Systems", "Software" ]
date: 2014-07-20
draft: false
tags: [ "FreeRTOS", "stack", "main()", "scheduler", "portTICK_RATE_MS" ]
title: Common Mistakes When Using FreeRTOS
type: page
---

## main() Stack Overwritten When vTaskStartScheduler() Called

Be warned, the stack used by `main()` could potentially be overwritten as soon as `vTaskStartScheduler()` is called. This is true is using a Cortex-M3 and interrupts, as the interrupts use the same stack space as `main()`.

This is shown in the following example:

```c
int * ptrToMyInt;

void MyTask(void * pvParameters)
{
	// This will start running after vTaskStartScheduler() is called in main()

	// Task loop
	while(true)
	{
		// *ptrToMyInt could be invalid!!!
		// Could cause segmentation fault
		printf("The int is '%i'.", *ptrToMyInt);
	}
}

main()
{
	// Create an int variable, this is what will become invalid!!!
	int	myInt = 10;
	// Make ptrToMyInt point to this integer we just created
	ptrToMyInt = &myInt;

	TaskHandle_t xHandle = NULL;
	xTaskCreate(
		&MyTask,
		"Task Name",
		200,
		NULL,
		tskIDLE_PRIORITY, 
		&xHandle);

	// Now start the FreeRTOS task scheduler
	vTaskStartScheduler()

	// Code should never reach here
}
```

Accessing variables created in `main()` from tasks could result in segmentation faults. This is not what you would expect, as you have probably learnt that variables stay valid as long as they are still in scope, and since `main()` never exits, the variable should still be valid! However, FreeRTOS re-used `main()`'s stack to save space. This is what the FreeRTOS website had to say (take in July 2014):

> Recover the stack used by `main()`. The stack used upon program entry is not required once the RTOS scheduler has been started (unless your application calls `vTaskEndScheduler()`, which is only supported directly in the distribution for the PC and Flashlite ports, or uses the stack as an interrupt stack as is done in the ARM Cortex-M and RX ports). Every task has its own stack allocated so the stack allocated to `main()` is available for reuse once the RTOS scheduler has started.

## Interpreting portTICK_RATE_MS Incorrectly

What causes this confusion is that `portTICK_RATE_MS` is incorrectly named. It doesn't represent the number of ticks per millisecond as the name suggests, but rather the number of milliseconds per tick. A better name would be `portTICK_PERIOD_MS`.

The incorrect way of using `portTICK_RATE_MS` to delay the current task for 400 milliseconds would be:

```c
vTaskDelay(400*portTICK_RATE_MS);
```

The correct way would be:

```c    
vTaskDelay(400/portTICK_RATE_MS);
```