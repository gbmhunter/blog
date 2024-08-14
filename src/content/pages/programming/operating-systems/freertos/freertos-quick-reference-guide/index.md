---
authors: [ "Geoffrey Hunter" ]
date: 2016-06-21
draft: false
lastUpdated: 2019-04-22
title: FreeRTOS Quick Reference Guide
type: page
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
  <tbody>
    <tr>
      <td colspan="2"><b>GENERAL TASK MANIPULATION</b></td>
    </tr>
    <tr>
      <td><code>vTaskDelay(200/portTICK_RATE_MS);</code></td>
      <td>Will block current task for 200ms.</td>
    </tr>
    <tr>
      <td><code>vTaskSuspendAll();</code></td>
      <td>Stops scheduler, but not interrupts. Do not call non-interrupt FreeRTOS API from within a suspend section.</td>
    </tr>
    <tr>
      <td><code>xTimerCreate();</code></td>
      <td>Used to create a software timer, based of the system ticks. <code>#configUSE_TIMERS</code> has to be set to <code>1</code> and <code>#configTIMER_TASK_PRIORITY</code> set before this function is available (in <code>FreeRTOSConfig.h</code>).</td>
    </tr>
    <tr>
      <td colspan="2"><b>TASK MAINTENANCE/DEBUG</b></td>
    </tr>
    <tr>
      <td><code>vTaskList(debugBuff);</code></td>
      <td>Writes a task list to a debug buffer. Recommended to have about 40 bytes of space in the buffer per task.</td>
    </tr>
    <tr>
      <td><code>uxTaskGetSystemState(taskStatusArray, 5, &totalRunTime);</code></td>
      <td>Returns system debug information for 5 tasks (function added in v7.5.0). Stores total run time into 3rd argument.</td>
    </tr>
    <tr>
      <td colspan="2"><b>QUEUES</b></td>
    </tr>
    <tr>
      <td><code>xQueueHandle myQueue = xQueueCreate(50, 2);</code></td>
      <td>Creates a queue of length 50 (elements) and width 2 (bytes).</td>
    </tr>
    <tr>
      <td><code>portBASE_TYPE xQueueReceive(xQueueHandle xQueue, void* pvBuffer, portTickType, xTicksToWait);</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>xQueueSendToBack(xQueueHandle xQueue, const void* pvItemToQueue, portTickType xTicksToWait);</code></td>
      <td>Puts item onto the end of the queue. Standard way of putting data onto queue.</td>
    </tr>
    <tr>
      <td colspan="2"><b>SEMAPHORES</b></td>
    </tr>
    <tr>
      <td><code>xSemaphoreHandle xSemaphoreCreateMutex(void);</code></td>
      <td>Use for mutual exclusion (to prevent contention problems).</td>
    </tr>
    <tr>
      <td><code>xSemaphoreHandle mySemaphore = xSemaphoreCreateRecursiveMutex();</code></td>
      <td>Creates a mutex.</td>
    </tr>
    <tr>
      <td><code>SemaphoreCreateBinary(mySemaphoreHandle);</code></td>
      <td>Creates a binary semaphore. Use for interrupt-to-task synchronisation</td>
    </tr>
    <tr>
      <td><code>xSemaphoreHandle mySem = xSemaphoreCreateCounting(10, 0);</code></td>
      <td>Creates a counting semaphore which counts to 10, and starts counting from 0 (so 10 free at creation).</td>
    </tr>
    <tr>
      <td><code>xSemaphoreGive(mySem);</code></td>
      <td>Gives a semaphore.</td>
    </tr>
    <tr>
      <td><code>xSemaphoreGiveFromISR(mySem, NULL);</code></td>
      <td>Interrupt safe version of xSemaphoreGive().</td>
    </tr>
  </tbody>
</table>

`tskIDLE_PRIORITY` - Priority of the idle task. Usually used as a way of setting the priority of other tasks relative to the idle task (e.g. tskIDLE_PRIORITY + 1).

`portTICK_RATE_MS` -  Period of the ticks (in milli-seconds). Used when calling timing/delay functions so that you can specify a delay in ms rather than ticks
