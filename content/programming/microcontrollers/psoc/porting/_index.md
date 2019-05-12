---
author: gbmhunter
date: 2013-07-26
draft: false
title: Porting
type: page
---

## Porting From PSoC 5 To PSoC 3

When rewriting PSoC 5 code for compilation on a PSoC 3 device, these are some of the things you have to watch out for.

1. You can't cast variables as input parameters to a function all in one go (which is a nice feature). This is caused by the different compilers used. You must first create a variable of the cast type, cast to it, and then use the variable as an input parameter.

    ```c
    // This works with a PSoC 5 but not a PSoC 3
    SomeFunction((char*)buffer);

    // This works with a PSoC 3 and 5
    char* charPtr;
    charPtr = buffer;
    SomeFunction(charPtr);
    ```

2. Variables must be declared at the top of the functions, or the top of loops, before any statements. This is due to the different compilers. If this is not done, Keil will give you the following error:
    
    ```c
    ERROR: .\<filename>:<linenumber>: syntax error near 'type'
    ```

3. When building, watch out for the compiler not noticing some changes, especially in header file. Use Clean and Rebuild to make the program up-to-date.
4. Take care when type casting. For example, typecasting a 16-bit buffer to an 8-bit buffer on the PSoC 5 required to reverse the two bytes to keep the order correct. However, you don't have to do this on a PSoC 3.
5. Get used to using 'Clean And Build' more often. The smarts which the compiler uses to determine which files have changed when you do a build are not that, well, smart. I've noticed that you can change header files and the compiler won't attempt to re-compile them in the build, resulting you in programming a device with old/incorrect code. To get around this, you have to use the time-intensive 'Clean And Rebuild' option.
