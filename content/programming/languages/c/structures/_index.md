---
authors: [ "Geoffrey Hunter" ]
date: 2013-03-18
draft: false
lastmod: 2022-10-30
title: Structures
type: page
---

## Overview

Structures can be used to do a "object-orientated" style of programming in C, a language which was originally designed to be functional.

## Initialising Structures

Initialising structures is way of defining what the values of the variables inside the `struct` will be at the time of creation. Note that there is a big syntax difference between initialising structures in C and in C++.

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

## Copying Structures

You can easily copy a `struct` in C with the assignment operator (`=`). Although not the recommended method, you can also use `memcpy()` to do the same thing.

```c
#include <memory.h>
#include <stdint.h>
#include <stdio.h>

typedef struct {
  uint16_t value1;
  uint16_t value2;
} demoStruct_t;

int main(void) {
  demoStruct_t struct1;
  demoStruct_t struct2;

  // Copy using assignment (recommended way)
  struct2 = struct1;

  // Copy using memcpy()
  memcpy(&struct2, &struct1, sizeof(struct2));
  
  return 0;
}
```

{{% warning %}}
Be careful, as passing in a `struct` to a function will copy the entire structure, which is some cases might NOT be what you were expecting as:

1. For a large struct, this could result in a lot of memory on the stack being used up.
1. Any changes the function makes to the struct will not be seen from the calling function.

In these cases you what to pass in a pointer to the `struct` instead.
{{% /warning %}}

## Self-referencing Structures

You can self-reference a structure, but you cannot include the structure type in the structure itself (with would cause infinite recursion). To self-reference a structure, you have to use the little-used (in C anyway) name after typedef struct.
	
```c    
typedef struct cmd_t {
    // This is a legal self-reference
    cmd_t* cmdPtr;
} cmd_t;

typedef struct cmd_t {
    // This is an illegal infinite recursion error
    cmd_t cmd;
} cmd_t;

// This following declaration has got the first cmd_t
// missing. This will cause an cmd_t is undefined error.
typedef struct {
    cmd_t cmd;
} cmd_t
```