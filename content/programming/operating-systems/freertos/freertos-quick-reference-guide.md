---
author: gbmhunter
date: 2016-06-21 04:15:09+00:00
draft: false
title: FreeRTOS Quick Reference Guide
type: page
url: /programming/operating-systems/freertos/freertos-quick-reference-guide
---

## FreeRTOS Quick Reference Guide

This contains examples of the most common functions, designed to jog your memory when writing FreeRTOS code.

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Comments</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >**GENERAL TASK MANIPULATION**
</td>
<td > 
</td></tr><tr >
<td >
    
    vTaskDelay(
       200/portTICK_RATE_MS);

</td>
<td >Will block current task for 200ms.
</td></tr><tr >
<td >
    
    vTaskSuspendAll();

</td>
<td >Stops scheduler, but not interrupts. Do not call non-interrupt FreeRTOS API from within a suspend section.
</td></tr><tr >
<td >
    
    xTimerCreate();

</td>
<td >Used to create a software timer, based of the system ticks. #configUSE_TIMERS has to be set to 1 and #configTIMER_TASK_PRIORITY set before this function is available (in "FreeRTOSConfig.h").
</td></tr><tr >
<td >**TASK MAINTENANCE/DEBUG**
</td>
<td > 
</td></tr><tr >
<td >
    
    vTaskList(debugBuff);

</td>
<td >Writes a task list to a debug buffer. Recommended to have about 40 bytes of space in the buffer per task.
</td></tr><tr >
<td >
    
    uxTaskGetSystemState(
       taskStatusArray,
       5,
       &totalRunTime);

</td>
<td >Returns system debug information for 5 tasks (fuction added in v7.5.0). Stores total run time into 3rd argument.
</td></tr><tr >
<td >**QUEUES**
</td>
<td > 
</td></tr><tr >
<td >
    
    xQueueHandle myQueue = 
       xQueueCreate(50, 2);

</td>
<td >Creates a queue of length 50 (elements) and width 2 (bytes).
</td></tr><tr >
<td >
    
    portBASE_TYPE xQueueReceive(
       xQueueHandle xQueue,
       void* pvBuffer,
       portTickType, xTicksToWait);

</td>
<td > 
</td></tr><tr >
<td >
    
    xQueueSendToBack(
       xQueueHandle xQueue,
       const void* pvItemToQueue,
       portTickType xTicksToWait);

</td>
<td >Puts item onto the end of the queue. Standard way of putting data onto queue.
</td></tr><tr >
<td >**SEMAPHORES**
</td>
<td > 
</td></tr><tr >
<td >
    
    xSemaphoreHandle xSemaphoreCreateMutex(void);

</td>
<td >Use for mutual exclusion (to prevent contention problems).
</td></tr><tr >
<td >
    
    xSemaphoreHandle mySemaphore =
       xSemaphoreCreateRecursiveMutex();

</td>
<td >Creates a mutex.
</td></tr><tr >
<td >
    
    SemaphoreCreateBinary(mySemaphoreHandle);

</td>
<td >Creates a binary semaphore. Use for interrupt-to-task synchronisation
</td></tr><tr >
<td >
    
    xSemaphoreHandle mySem =
       xSemaphoreCreateCounting(10, 0);

</td>
<td >Creates a counting semaphore which counts to 10, and starts counting from 0 (so 10 free at creation).
</td></tr><tr >
<td >
    
    xSemaphoreGive(mySem);

</td>
<td >Gives a semaphore.
</td></tr><tr >
<td >
    
    xSemaphoreGiveFromISR(mySem, NULL);

</td>
<td >Interrupt safe version of xSemaphoreGive().
</td></tr></tbody></table>

tskIDLE_PRIORITY - Priority of the idle task. Usually used as a way of setting the priority of other tasks relative to the idle task (e.g. tskIDLE_PRIORITY + 1). portTICK_RATE_MS -  Period of the ticks (in milli-seconds). Used when calling timing/delay functions so that you can specify a delay in ms rather than ticks
