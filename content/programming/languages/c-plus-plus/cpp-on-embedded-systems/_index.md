---
authors: [ "Geoffrey Hunter" ]
date: 2014-04-17
description: A style/feature guide on writing firmware (code for microcontrollers) using C++.
draft: false
lastmod: 2022-05-31
tags: [ c++, constructors, errors, status, initialization, embedded, firmware, classes, microcontrollers ]
title: C++ On Embedded Systems
type: page
---

## Overview

The document "[Technical Performance on C++ Performance](http://www.open-std.org/jtc1/sc22/wg21/docs/TR18015.pdf)" is a good read if you are really interested in the advantages/disadvantages of using C++ on an embedded platform.

[The Embedded C++ Homepage](http://www.caravan.net/ec2plus/) is sort of a hub for embedded C++ programming. They define a sub-set of the full C++ language for use on embedded devices such as microcontrollers.

## Performance Concerns

One fear about using C++ on an embedded system is a decrease in performance (in terms of memory and processing speed). As with most complex issues, the answer really is, "it depends".

I believe you can carefully select a subset of the C++ language which provides most of the benefits of OO-based design, but does not incur any performance hits for the target system.

## C++ Features That Should Be Used

* Classes (pretty much no overhead)
* Templates (no overhead, can be thought of as a more powerful version of a macro). However, incorrect/careless use of template can cause a huge increase in code size.
* Function overloading
* Typesafe enums (i.e. enum class), typesafe typedefs
* Operator overloading (when done sensibly!)
* References (they are just safer pointers!)
* Namespaces (no overhead)
* Inheritance 
* auto

## C++ Features That Could Be Used, But Only After Careful Consideration

* Virtual Methods
* RTTI
* STL
* Boost

## Handling Errors In Constructors

One issue when writing classes in firmware is the **difficulty in signalling back to the caller when an error occurs in a C++ class constructor**. The standard function approach of returning a error number does not work as you are not allowed a return value from C++ constructors. When developing C++ applications running on a full-blown OS, the standard way to deal with it is to throw an exception. In an embedded application where you are not allowed to use exceptions, this is obviously not an option. For example, consider the following example class:

```c++
#include <cstdint>

class TempSensor {
public:
  TempSensor(uint8_t i2cAddress) {
    // Validate I2C address
    if (i2cAddress > 127) {
      // Argh, error! What do we do in firmware when we can't throw an exception?
    }
    this->i2cAddress = i2cAddress;
  }
private:
    uint8_t i2cAddress;
};

int main() {
  TempSensor tempSensor(10);
}
```

You want to check in the constructor if the caller has provided a valid I2C address (one with the range 0-127). There are a few ways you can signal this fault back to the caller, and we'll discuss these now.

{{% note %}}
Runnable code for all this examples can be found at https://replit.com/@gbmhunter/cpp-handling-constructor-errors.
{{% /note %}}

### Move All Non-Trivial Code To Init()

One popular way of getting around this problem is to move all non-trivial might-cause-an-error code out of the constructor and into an `Init()` function.

```c++
#include <cstdint>
#include <cstdio>

class TempSensor {
public:
  TempSensor() {
    // Nothing here now
  };

  uint8_t Init(uint8_t i2cAddress) {
    // Validate I2C address
    if (i2cAddress > 127) {
      return 1;
    }
    this->i2cAddress = i2cAddress;
    return 0;
  };
private:
    uint8_t i2cAddress;
};

int main() {
  TempSensor tempSensor;
  uint8_t status;
  
  status = tempSensor.Init(10); // OK, returns 0
  status = tempSensor.Init(200); // Error, returns 1  
}
```

{{% tip %}}
You might want to make sure the caller does not forget to call the `Init()` function before calling any other functions. This can be done by adding a `bool m_isInitialized` variable to the class which then gets checked upon entry to all other member functions.
{{% /tip %}}

Using an `Init()` function also **opens up the possibility of the caller being able to re-initialize the class without having to delete this object and construct a new one**. This may or may not be beneficial for a particular application!

### Pass In Status Pointer To Constructor

Another way to solve the problem is to pass into the constructor a pointer to a status variable so the constructor can assign to it, similar to how you would pass in extra "outputs" to a normal function if the function had more than one output.

```c++
#include <cstdint>
#include <cstdio>

class TempSensor {
public:
  TempSensor(uint8_t i2cAddress, uint8_t * status) {
    // Validate I2C address
    if (i2cAddress > 127) {      
      *status = 1;
      return;
    }
    m_i2cAddress = i2cAddress;
    *status = 0;
  }
private:
    uint8_t m_i2cAddress;
};

int main() {
  uint8_t status;
  TempSensor tempSensor(200, &status);
  if (status != 0) {
    printf("Error initializing temp. sensor. status=%u\n", status);
  }
}
```

### Provide Second Function Or Member Variable To Check If Constructor Worked

The final way we will solve the constructor error problem is to save the constructor success state to the class, and then provide the caller with another function to get that state:

```c++
#include <cstdint>
#include <cstdio>

class TempSensor {
public:
  TempSensor(uint8_t i2cAddress) {
    // Validate I2C address
    if (i2cAddress > 127) {
      // Returning here will mean m_initSuccessful will stay false
      return;
    }
    m_i2cAddress = i2cAddress;
    m_initSuccessful = true;
  }

  bool initSuccessful() {
    return m_initSuccessful;
  }
private:
  bool m_initSuccessful = false;
  uint8_t m_i2cAddress;
};

int main() {
  TempSensor tempSensor(10);
  if(!tempSensor.initSuccessful()) {
    printf("Initialization of temp. sensor failed.");
  }
}
```

The boolean `m_initSuccessful` could be changed to a `uint8_t` if you want to provide the caller with more detailed information as to why the constructor failed.

## C++ Standrad Libraries For Embedded Devices

[uClibc++](http://cxx.uclibc.org/index.html) is a C++ standard library designed specifically for microcontrollers. It even has exception support!

[Check out The Standard Template Library (STL) For AVR With C++ Streams](http://andybrown.me.uk/wk/2011/01/15/the-standard-template-library-stl-for-avr-with-c-streams/) if you want to get a library for using things like string and iostream with AVR microcontrollers.
