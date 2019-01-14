---
author: gbmhunter
date: 2016-02-04 21:12:58+00:00
draft: false
title: Object-Orientated C
type: page
url: /programming/languages/c/object-orientated-c
---

## Overview

Although C is not generally thought of as an object-orientated language, it's flexibility does allow **object-orientated style code** to be written, albeit with slightly more verbose syntax than a "object-orientated" language such as C++.

Object-orientated code is a broad term for a number of different coding ideas. These include:  * _Encapsulation_. An object encapsulates all of it's data and functions (called methods in the object-orientated world).  * _Abstraction_. The user of an object can only see and use it's public interface, and has no knowledge of it's internal workings.  * _Polymorphism_.  * _Inheritance_.

The above points can be implemented in C with varying levels of success and simplicity. 

Also miss out on compiler-enforced encapsulation and abstraction.

## The Basic Object

In C, _structures_ (`typedef struct`) can be used to represent an object. Here is C code which defines a very simple object, which only holds data and contains no functions. Think of a struct in C being the equivalent of a class in dedicated OO-languages.
    
```c
typedef struct {
    double real;
    double imag;
} complexNum_t;
```

We would then create an instance of our object with the code:

```c 
void main () {
    complexNum_t myComplexNum;
    myComplexNum.real = 3.4;
    myComplexNum.imag = 5.7;
}
```

Note that by itself, the above code is not very object-orientated, even non-OO styled C would make extensive use of structures. This is where methods come in (functions which belong to an object).

## Methods

A method is just a name for a **function which belongs to an object**. When we say "belong" we mean that the function can **manipulate the data** or call other methods of a particular object instance.

In stronger OO languages, methods are declared as part of a _class_, and a pointer to the current instance of the object (the keyword this) is automatically passed into each method.

We don't have such luxuries in C, and so have to declare our methods as normal functions, and pass in the pointer to the object instance explicitly.

```c  
double ComplexNum_GetMagnitude(complexNum_t * obj) {

}
```

The first (and only, in this case) argument passed into this "method" is a pointer to instance of a complexNum_t object that you wish to operate on. **All non-static methods of an object will have this as their first argument.** Note I choose to use the name obj rather than this to prevent any confusion to viewers or the compiler if it also understands C++.

## Wait, What About A Constructor?

In OO-universe, a constructor is a special method which is run automatically when a new instance of an object is created. Unfortunately, in C, there is no way to enforce a method to run upon creation of our `struct` object (o.k., yes you could wrap the creation of a struct inside a macro which also called a method).

A simple way to have constructor-like behaviour is to create an `Init()` method.

```
void ComplexNum_Init(complexNum_t * obj) {
    obj->real = 0.0;
    obj->imag = 0.0;
}
```

The downside of this is that we have to remember to call it every time we create a new `complexNum_t` object.
    
```
void main() {
    complexNum_t myComplexNum;
    // We have to remember to call the "constructor"
    // If we forget, bad things could happen
    ComplexNum_Init(&myComplexNum);
}
```

## Polymorphism

Both Microsoft Direct X, the Linux kernel, GObject use C polymorphism.

## Interfacing To Imperative Code

You may be happy-as-Larry, writing all your C code in an OO style. But what happens when you want to interface with third-party (or previously written) code which is written in the standard C "imperative" style.

The example I will use is based around the PSoC family of microcontrollers. When you create a new UART for the microcontroller (via the graphical schematic editor in the PSoC Creator IDE), the PSoC libraries provide an associated set of functions to control the UART (e.g., if you had named the UART component CyUart1, then you would be given functions such as CyUart1_Start(), CyUart2_Read(), e.t.c). This functions are not written in an OO-style.

The solution I propose is to create your own object-orientated UART driver, which wraps provides an interface from the imperative-style PSoC UART functions to the rest of your OO code.

Here is an complete, working example:

```c
#include <stdio.h>
#include <stdint.h>

//========== MOCK CYPRESS API FOR UART ================//

void CyUart1_Start() {
    printf("CyUart1_Start() called.\r\n");
}

void CyUart1_Stop() {
    printf("CyUart1_Stop() called.\r\n");
}

void CyUart1_Read() {
    printf("CyUart1_Read() called.\r\n");
}

void CyUart1_Write() {
    printf("CyUart1_Write() called.\r\n");
}

//=============== OUR UART DRIVER ================//

typedef struct {
    void (* CyUart_Start)(void);
    void (* CyUart_Stop)(void);
    uint8_t (* CyUart_Read)(void);
    void (* CyUart_Write)(uint8_t byte);
} uart_t;

void Uart_Init(uart_t * obj,
    void (* CyUart_Start)(void),
    void (* CyUart_Stop)(void),
    uint8_t (* CyUart_Read)(void),
    void (* CyUart_Write)(uint8_t byte)) {
    
    obj->CyUart_Start = CyUart_Start;
    obj->CyUart_Stop = CyUart_Stop;
    obj->CyUart_Read = CyUart_Read;
    obj->CyUart_Write = CyUart_Write;
            
}

void Uart_Start(uart_t * obj) {
    obj->CyUart_Start();
}

void Uart_Stop(uart_t * obj) {
    obj->CyUart_Stop();
}

uint8_t Uart_Read(uart_t * obj) {
    return obj->CyUart_Read();
}

void Uart_Write(uart_t * obj, uint8_t byte) {
    obj->CyUart_Write(byte);
}

#define GET_CY_UART_FUNCTIONS(prefix) \
    prefix##_Start, \
    prefix##_Stop, \
    prefix##_Read, \
    prefix##_Write

//=============== MAIN PROGRAM ================//

int main(void) {
    
    uart_t myUart;
    
    Uart_Init(&myUart, GET_CY_UART_FUNCTIONS(CyUart1));
    
    Uart_Start(&myUart);
    uint8_t byte = Uart_Read(&myUart);
    Uart_Write(&myUart, 0x2A);
    Uart_Stop(&myUart);

    return 0;
}
```
