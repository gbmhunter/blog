---
author: gbmhunter
date: 2013-03-18
draft: false
title: Dynamic Memory Allocation
type: page
---

## Overview

Dynamic memory allocation is the process of assigning space for variables at run time. This is done automatically for function-scope variables which are put onto the stack when they are defined, but dynamic memory allocation usually refers to the process of using one of the malloc-family functions to manually allocate space of the heap.

The biggest risk with dynamic memory allocation is forgetting to free the memory after your finished with it. This can quickly lead to you running out of memory as more and more spaces in memory are assigned to the same variable (this is called a memory leak).

The malloc-family of functions include `malloc()`, `calloc()`, `realloc()` and `free()`. Most C-programming IDE's link to a standard library with these functions. They are used by including `stdlib.h` into your project. These functions are also available in C++.

## Thread-Safety

The thread-safety of the memory functions listed below is implementation dependant. This means that their **safety when used in systems with threads (or tasks) is not guaranteed**. This normally is the case when you are running an operating system. The danger is especially relevant for memory functions on embedded systems running operating systems, as while memory functions on computers would be written with threading in mind, this is not the case for embedded systems.

The best thing to do is to wrap the functions in thread safe procedures (such as a scheduler suspender call), or write your own thread safe versions from scratch.

## malloc()

`malloc()` is the most-known about memory allocation function. Given a size (in bytes), it allocates a block of memory and returns a pointer to this memory.

```c
void* malloc(size_t size);
```

`malloc()` always returns a `void*` pointer, **so it has to be cast into the desired pointer type.**

Memory allocated in this fashion **persists until it is freed** (it is placed on the heap). This means that unlike local variables, it will persist even after the function that called `malloc()` has ended. This can lead to **memory leaks** if you are not careful and keep track of all of your allocated variables. **C does not have any garbage collection.**

When using `malloc()`, remember that it requires the **number of bytes** you wish to allocate in memory. This is **NOT necessarily the same** as the number of elements you want in your array. For example, if your array is of type `uint32_t`, and you want the array to store 10 `uint32_t` numbers, you need to allocate 40 bytes, since each `uint32_t` requires 4 bytes of memory. The safest way to make sure this does not trip you up when programming is to use the `sizeof()` command as shown in the below code.

```c    
#include <stdlib.h>

void DynamicMemoryAllocation() {
    // You can set numDoubleElements to whatever you want at run time
    // (because this is dynamic memory allocation!!!)
    uint8_t numDoubleElements = 8;

    // The safe way of creating an array dynamically.
    double *dynamicArray = (double*)malloc(numDoubleElements * sizeof(dynamicArray));

    // Now you can use dynamicArray just like a normal array
    dynamicArray[0] = 4;
    dynamicArray[1] = dynamicArray[0] + 6.2;

    // Make sure to free the memory after you have finished with it
    free(dynamicArray);
}
```

## realloc()

`realloc()` is used for reallocating memory to a different size. It takes a pointer to a memory address that has been previously allocated with malloc(), and the desired new size of the memory, and returns a pointer to the newly-sized memory block.

```c
void* realloc(void* ptr, size_t size);
```

You must consider that if `realloc()` cannot allocate enough memory at the end of the current block, it will re-allocate the entire block somewhere else, and will return a pointer to a different address in memory. Take care in making sure that **any other pointers to the old memory allocation will need updating also**. One way to stop this problem occurring is to take pointers to the original pointer instead of directly to the block in memory.

## alloca()

`alloca()` is used to allocate memory on the stack, not the heap. Unlike the `malloc()`-family of functions, memory allocated by `alloca()` is automatically de-allocated when the function returns to the caller. It also has the benefit of not causing memory fragmentation. However, it can cause stack overflows if you assign too much memory, it does not check to see whether the operation is safe before it goes ahead an assigns the memory. For this reason it is not recommended for variables larger than a couple of hundred bytes (this is platform dependant).

The function declaration:

```c
void* alloca(size_t size);
```

where `size` is the number of bytes you wish assigned (positive integer).

You can use `alloca()` in your code after including `alloca.h` in your source file (`#include <alloca.h>`).

**Do not free** a variable that has been allocated memory with `alloca()` using `free()`! This will most likely crash your program (behaviour is undefined).

If you are using GCC (and the glibc library), you should note that in most cases, the GCC compiler will inline the `alloca()` call and remove the function. It is normally replaced with just a single line of code that adjusts the stack pointer.

On many systems, you cannot call `alloc()` from within the list of arguments for a function call, as the memory allocated would be interspersed with the arguments when the function is entered.

```c
int main() {
    // This will throw a compiler error on most systems
    MyFunc(2, "string", alloca(2));
}
```

`alloca()` is used in the GNU glibc function `getopt()` (used for command-line option processing).

## Appending An Element To An Array

When using dynamic memory allocation, you commonly want to add a new element to the end of an array that had been dynamically allocated yourself, and initialise it to 0. This can be done with clever use of the realloc() and memset() functions. The code below shows a function which can does this for you. This essentially increase the array size by 1.

```c    
//! @brief	Dynamically appends a new element onto the end of an array.
//! @details	Uses dynamic memory allocation.
//! @param	arrayStart 		Pointer to the start of the array
//! @param	currNumElements 	The number of elements in the array
//! @param	sizeofElement		The size (in bytes) of the individual elements in the array.
//!					This can be found by using sizeof(arrayType_t)
//! @returns	Pointer to new position of array[0]. Remember to cast back to the original type.
void* AppendNewArrayElement(void* arrayStart, uint32_t currNumElements, uint32_t sizeOfElement) {
    // Create a new option at end of option array
    arrayStart = realloc(arrayStart , (currNumElements+1)*sizeOfElement);
    // Cast to char pointer to get around the "arthimetic on type void* compiler warning)
    char* arrayStartChar = (char*)arrayStart;
    // Set to 0
    memset(arrayStartChar + (currNumElements*sizeOfElement), '\0', sizeOfElement);
    // Return pointer to the start of array (realloc() could of changed this)
    return arrayStart;
}
```
