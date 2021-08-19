---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Design Patterns" ]
date: 2014-07-23
draft: false
tags: [ "programming", "dependency injection", "code", "design pattern" ]
title: Dependency Injection
type: page
---

<h2>Overview</h2>

<p>Dependency injection is a programming design pattern in where services (dependencies) are inserted into the client (the code that needs the services) at runtime.</p>

{{< img src="red-syringe.jpg" width="200px" >}}

<h2>Pros And Cons</h2>

<p>Dependency injection has the following advantages (these are explained in more detail in the following sections):</p>

<ul>
  <li>Quick and clear identification of an objects dependencies, by inspection of what is been provided by the constructor.</li>
  <li>Modularity and decouplement due to the actual instances of the dependencies being passed in as references at runtime. These references could be null, and as long as the code has been written to support null references, then it should still function o.k.</li>
  <li>Allows unit testing through the injection of mock or "stub" services.</li>
</ul>

<h2>Basic Example</h2>

<p>This basic example uses C++.</p>

{{< highlight cpp >}}
#include &lt;iostream&gt;

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

int main() {
    // Create a GpioPin object (a service), which will be later used as
    // a dependency of the Led object (the client)
    GpioPin * gpioPin1 = new GpioPin();
    
    // Create a new Led object, passing in the GpioPin dependency
    // as part of it's constructor
    Led * led1 = new Led(gpioPin1);
    
    return 0;
}
{{< /highlight >}}

<h2>How Does It Fit Into Existing Design Patterns?</h2>

<p>This programming style fits very nicely into object-orientated software/firmware. All of an objects dependencies can be injected into the object on construction. Each one of these dependencies can be represented by another object, and passed in by reference (e.g. using pointers in C++).</p>

<h2>Is It Applicable To Firmware?</h2>

<p>Dependency injection can be implemented very easily in firmware. That being said, careful consideration of it's advantages and disadvantages in a firmware environment must occur.</p>

<p>Dependency injection makes the code less statically analyisable. In a C/C++ enviroment, dependency injection will mean that services are stored as pointers, which are given values at runtime.</p>

<h2>Unit Testing</h2>

<p>Dependency injection facilitates unit testing by allowing the programmer to perform unit tests by injecting mock (or stub) services in the client under test.</p>
