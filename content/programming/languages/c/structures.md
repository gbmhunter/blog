---
author: gbmhunter
date: 2013-03-18 07:35:28+00:00
draft: false
title: Structures
type: page
url: /programming/languages/c/structures
---

## Overview

Structures can be used to do a "object-orientated" style of programming in C, a language which was originally designed to be functional.

## Initialising Structures

Initialising structures is way of defining what the values of the variables inside the struct will be at the time of creation. Note that there is a big syntax difference between initialising structures in C and in C++.

```c   
Defining a structure type
typedef struct
{
    uint16_t value1;
    uint16_t value2;
} demoStruct_t;

// Creating a structure and initialising the variables
// Note that this is won't work in C++
demoStruct_t struct1 =
{
    .value1 = 560;
    .value2 = 34;
}
```   

Unfortunately, **you cannot define default variables for a structure when you declare it**, only when you create an instance of that structure type. If this is annoying you, you might want to consider switching to C++, which allows you to do such a thing by using the class and constructor mechanisms.

## Manipulating Structures

Because structure can contain more than one data type, you can't use the standard procedure for manipulating other 'variables'. For example you can't use struct 1 = struct 2 to copy one structure to another or use `struct1= 0` to set all values to 0. Instead, you have to use memory operations.

However, you can still copy individual variables that belong to a structure just like usual.

```c    
typedef struct
{
    uint16_t value1;
    uint16_t value2;
} demoStruct_t;

demoStruct_t demoStruct1;
demoStruct_t demoStruct2;
// Clear all of the variables in a structure (set to 0)
memset(&struct1, 0x00, sizeof(struct1));
// Copy the contents of struct1 into struct 2 (of the same type)
// Note that the size of the destination variable is used rather
// than the source, this is a safer method as it prevents
// memory overruns.
memcpy(&struct2, &struct1, sizeof(struct2));

// You can still use the standard methods when copying individual variables that belong to a structure
struct1.value1 = struct2.value2;
```

## Self-referencing Structures

You can self-reference a structure, but you cannot include the structure type in the structure itself (with would cause infinite recursion). To self-reference a structure, you have to use the little-used (in C anyway) name after typedef struct.
	
```c    
typedef struct cmd_t
{
    // This is a legal self-reference
    cmd_t* cmdPtr;
} cmd_t;

typedef struct cmd_t
{
    // This is an illegal infinite recursion error
    cmd_t cmd;
} cmd_t;

// This following declaration has got the first cmd_t
// missing. This will cause an cmd_t is undefined error.
typedef struct
{
    cmd_t cmd;
} cmd_t
```