---
author: gbmhunter
date: 2013-07-18 02:05:32+00:00
draft: false
title: Inserting Assembly Code Into C
type: page
url: /programming/languages/c/inserting-assembly-code-into-c
---

# Overview


Assembly code can be inserted into C code. This is usually done when you want to optimise something for a particular architecture (assembly is **NOT** as portable as C).

There are two types, "**basic inline"** assembly, and "**extended"** assembly.

If you are using the GCC compiler, you can insert assembly code using the __asm voltaile { (assembly code as a string here) } wrapper (that with two underscores at the start). asm("assembly code as a string here") also works.

Note that the assembly code has to be written as a single string, with each new line of assembly being delimited by the \n character. Use compiler string concatenation to spread the assembly over multiple lines of source code to make it more readable.


# The Volatile Keyword


The keyword volatile is used when you don't want the compiler to perform any optimisation on the assembly code. Without the volatile keyword, the compiler may move the code around, take it out of a loop, or delete in entirely if it deems it uneccesary. To stop this from happening, add the word volatile after the asm keyword and before the opening curly brace.

Note that the \n (newline characters) at the end of each line are important for GCC to correctly parse the assembly code.


# An Example


Here is an example from the FreeRTOS PSoC port which uses inserted assembly into the C code in port.c.

    
    void vPortSVCHandler( void )
    {
    	__asm volatile (
    					"	ldr	r3, pxCurrentTCBConst2		\n" /* Restore the context. */
    					"	ldr r1, [r3]					\n" /* Use pxCurrentTCBConst to get the pxCurrentTCB address. */
    					"	ldr r0, [r1]					\n" /* The first item in pxCurrentTCB is the task top of stack. */
    					"	ldmia r0!, {r4-r11}				\n" /* Pop the registers that are not automatically saved on exception entry and the critical nesting count. */
    					"	msr psp, r0						\n" /* Restore the task stack pointer. */
    					"	mov r0, #0 						\n"
    					"	msr	basepri, r0					\n"
    					"	orr r14, #0xd					\n"
    					"	bx r14							\n"
    					"									\n"
    					"	.align 2						\n"
    					"pxCurrentTCBConst2: .word pxCurrentTCB				\n"
    				);
    }



