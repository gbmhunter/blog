---
author: gbmhunter
date: 2014-07-23 04:21:19+00:00
draft: false
title: Dependency Injection
type: page
url: /programming/design-patterns/dependency-injection
---

# Overview

Dependency injection is a programming design pattern in where services (dependencies) are inserted into the client (the code that needs the services) at runtime.

{{< figure src="/images/2014/07/red-syringe.jpg" caption=""  >}}

# Pros And Cons

Dependency injection has the following advantages (these are explained in more detail in the following sections):

* Quick and clear identification of an objects dependencies, by inspection of what is been provided by the constructor.
* Modularity and decouplement due to the actual instances of the dependencies being passed in as references at runtime. These references could be null, and as long as the code has been written to support null references, then it should still function o.k.
* Allows unit testing through the injection of mock or "stub" services.

# Basic Example

This basic example uses C++.

    ```c++
    #include <iostream>
    
    using namespace std;
    
    class GpioPin {
        
    };
    
    class Led {
        
        private:
        
        GpioPin * gpioPin;
        
        public:
        
        // The dependency is injected via the constructor
        Led(GpioPin * gpioPin) {
            this->gpioPin = gpioPin;
        }
    };
    
    int main()
    {
        // Create a GpioPin object (a service), which will be later used as
        // a dependency of the Led object (the client)
        GpioPin * gpioPin1 = new GpioPin();
       
        // Create a new Led object, passing in the GpioPin dependency
        // as part of it's constructor
       Led * led1 = new Led(gpioPin1);
       
       return 0;
    }
    ```

# How Does It Fit Into Existing Design Patterns?

This programming style fits very nicely into object-orientated software/firmware. All of an objects dependencies can be injected into the object on construction. Each one of these dependencies can be represented by another object, and passed in by reference (e.g. using pointers in C++).

# Is It Applicable To Firmware?

Dependency injection can be implemented very easily in firmware. That being said, careful consideration of it's advantages and disadvantages in a firmware environment must occur.

Dependency injection makes the code less statically analyisable. In a C/C++ enviroment, dependency injection will mean that services are stored as pointers, which are given values at runtime.

# Unit Testing

Dependency injection facilitates unit testing by allowing the programmer to perform unit tests by injecting mock (or stub) services in the client under test.
