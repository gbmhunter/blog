---
author: gbmhunter
date: 2014-02-19 20:31:50+00:00
draft: false
title: Enumerations
type: page
url: /programming/languages/c/enumerations
---

## Overview

Enumerations in C are in their most basic sense, a way of creating a meaningful word-based list **type**.

Enumerations are an alternative to using C preprocessor macros to create words which represent numbers. For example:

```c
#define RED   	0
#define GREEN 	1
#define BLUE	2
#define YELLOW	3
```    

If you find yourself doing this, think carefully, would an enumeration be a better way? You can achieve the exact same result with:

```c   
typedef enum
{
    RED,
    GREEN,
    BLUE,
    YELLOW
} colours_t;
``` 

## Usefullness

Enumerations are commonly used for:

* Creating an list of something (e.g. COLOURS = RED, GREEN, BLUE, ...)
* Accessing hardware registers in embedded systems (used for creating meaningful register names).
* Creating state variables (variables which describe a state in a state machine, commonly used with a switch statement)

## Syntax

Enums can be defined it two seperate ways. The non-typedef way:

```c  
enum myColoursType
{
    RED,
    GREEN,
    BLUE,
    YELLOW
} colours_t;

enum colours_t myColoursType = BLUE;
```    

Or the typedef way:
   
```c  
typedef enum
{
    RED,
    GREEN,
    BLUE,
    YELLOW
} colours_t;

colours_t myColours = BLUE;
```

Notice when using the first method (non-typedef), everytime you create a variable of the enumeration type you have to write the word enum first. Using the second method (typedef), the enum keyword can be omitted.

By default, the compiler will make the first enumeration value equal to 0, the second equal to 1 and so on. However, you can specify the values you wish the enumerations to take on:

```c    
typedef enum
{
    RED = 2,
    GREEN = 5,
    BLUE,
    YELLOW = 8
} colours_t;
```    

If no value is specified, the compiler will increment by 1 as usual, so in the above case, BLUE = 6.

## Interchangeability

In C, enum types and integer types are normally interchangeable. This can either be a good or bad thing, depending on your viewpoint. C++ allows for stricter type checking with the recently introduced enum class (strongly-typed enums), which cannot be compared with integer types. Strongly-typed enums also allows you to specify the width of the integer used to store the enumeration.

## Optimisation

You are not allowed to take a reference (pointer) to an enumeration (they are not allowed to be lvalues), while you can with a const int. This means they can be optimised, while const int cannot.

## The Data Type Of An Enum

The data type of an enumeration is implemenatation defined. This is what the standard has to say...

<blockquote>The choice of type is implementation-defined, but shall be capable of representing the values of all the members of the enumeration.</blockquote>

Normally you do not care what the width is, as long as it works! However, it certain cases, such as when you are packing an enumeration into a structure and want everyting to be of a particular size, you want to exactly specify the enumeration width. You can force an enumeration to be of a larger data type than default by a simple trick of **adding a very large number to the end of your enumeration**.

```c    
typedef enum
{
    FIRST_VAL,
    SECOND_VAL,
    // ...
    FORCE_ENUM_WIDTH = MAX_INT // This here forces the enumeration to be at least a particular width
} myEnum_t;
```    

Some compilers support directives which will change the default size of an enumeration. For example, in GCC, you can add the compiler flag:
	
```c    
-fshort-enums
```    

Which will make all enumerations use the smallest width suitable. You can selectively make enumerations smaller by using:

```c    
typedef enum __attribute__ ((__packed__))
{

} myEnum_t;
```  
