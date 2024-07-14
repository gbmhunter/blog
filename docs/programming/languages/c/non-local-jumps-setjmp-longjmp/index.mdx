---
authors: [ "Geoffrey Hunter" ]
date: 2014-01-24
draft: false
title: Non-local Jumps (setjmp(), longjmp())
type: page
---

## Overview

The C functions `setjmp()` and `longjmp()` provide the ability to perform non-local jumps. A non-local jump is a jump in code execution between two separate functions. This is opposed the the local jump, goto which can perform jumps as long as you stay within the same function.

Non-local jumps have complications, as the stack needs to be saved/modified when switching context between two separate functions.

## Definitions

`setjmp()` and `longjmp()` are defined as:

```c
int setjmp(jmp_buf env);
void longjmp(jmp_buf env, int val);
```

`setjmp()` is used to declare a place you want to jump back to at some future point in time. `setjmp()` takes a `jmp_buf` type variable as it's input. This `jmp_buf` is used to save the state of the stack.

`setjmp()` has to be called before `longjmp()`.

## What Do I Need To Include?

`setjmp()` and `longjmp()` are both defined in setjmp.h.

```c    
#include <setjmp.h>
```

## Making Your Own Exception Handlers In C

A cool feature about `setjmp()` and `longjmp()` is that they can be used to make your own exception handling in C. If you have use any higher-level, OOP languages before, you may be familiar with the notion of an exception handler, using the try/catch/throw keywords (or similar) that allow you to run "may not work" code and catch any errors that may occur.

```c    
try {
    // May not work code goes here
}
catch(SomeExceptionType e) {
    // Deal with error here
}
```

C does not have native exception support, but you can make your own with some clever use of `setjmp()`, `longjmp()` and preprocessor macros.

```c    
#include <stdio.h>		// printf()
#include <setjmp.h>		// setjmp(), longjmp()

// Preprocessor macros for creating basic exception support
#define TRY do{ jmp_buf excepBuf; if( !setjmp(excepBuf) ){		// This part creates the varable excepBuf, used for storing stack state
#define CATCH } else {
#define END_TRY } }while(0)										// We have to have a macro of ending the try loop 
#define THROW longjmp(excepBuf, 1)

int main(int argc, char** argv)
{
    TRY
    {
        printf("We are now in a try statement.\r\n");
        // Lets throw an exception for testing!
        THROW;
        printf("This will never be printed.\r\n");
    }
    CATCH
    {
        printf("Caught exception!\r\n");
    }
    END_TRY;

    return 0;
}
```

This basic example does not have any support for differing exception types.

Note that this primitive form of exception handling does not come with all advanced functionality you get with higher-level languages. For example, higher-level languages will automatically de-allocate memory when an object's constructor throws an exception (not that you have objects in C anyway).

If you are interested in this and still want more information, see [http://www.di.unipi.it/~nids/docs/longjump_try_trow_catch.html](http://www.di.unipi.it/~nids/docs/longjump_try_trow_catch.html) for a basic implementation. [http://www.on-time.com/ddj0011.htm](http://www.on-time.com/ddj0011.htm) also has some nice explanations and worked tutorial code.

[https://code.google.com/p/exceptions4c/](https://code.google.com/p/exceptions4c/) is a C-based exception library.

## A Word Of Caution To C++ Users

The C standard for the `setjmp()` and `longjmp()` functions makes no assurances that the destructors will be called for objects that are created after `setjmp()` (aka `TRY`) and before `longjmp()` (aka `CATCH`) (essentially the portion of code that will be "unwound"). In fact, the behaviour in these cases is undefined. 

Therefore, these functions can be very dangerous to use in C++, causing unexpected behaviour and memory leaks. I once investigated the use of these functions as a replacement for the traditional exceptions for embedded microcontrollers, but ruled it out due to this issue.
