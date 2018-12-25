---
author: gbmhunter
date: 2014-01-05 01:00:54+00:00
draft: false
title: Special Casts
type: page
url: /programming/languages/c-plus-plus/special-casts
---

## Dynamic Casts

The `dynamic_cast<>()` operator is part of the RTTI (run-time type information) engine in C++. It is a typecast, which unlike the standard C style (your-type-here) cast operator, performs a type conversion check when the operator is called (i.e. at runtime).

If the types are compatible (i.e. convertible), then the conversion occurs. If they are not, one of two things happen:

1. If the variable acted upon is a pointer, then null is returned.
2. If the variable acted upon is a reference, then an exception is thrown.

You can use the `dynamic_cast<>()` operator to work out the type of an object at run-time.

## Example

The following example shows how you can use dynamic_cast<>() to work out the type of an object at runtime. It uses the example where there are base and derived classes, and you wish to know to what one of these objects the pointer points to.

```c++
// A base class pointer can point to objects of any class which is derived 
// from it. RTTI is useful to identify which type (derived class) of object is 
// pointed to by a base class pointer.
    
#include <iostream>
    
class Base
{
    public:
        Base() { } 
        virtual ~Base() { } 
        
        virtual void Test() 
        {
            std::cout << "Base object.";
        }
};
    
class Derived : public Base
{
    public:
        void Test() 
        {
            std::cout << "Derived object.";
        }
};
    
int main()
{
    // Create a pointer of Base type, which actually points to a Derived object
    Base* basePointer = new Derived();

    // A variable to try and cast too
    Derived* derivedPointer = NULL;
    
    // To find whether basePointer is pointing to Derived type of object
    derivedPointer = dynamic_cast<Derived*>(basePointer);
    
    if (derivedPointer != NULL)
    {
        std::cout << "basePointer is pointing to a Derived class object";
    }
    else
    {
        std::cout << "basePointer is NOT pointing to a Derived class object";
    }
    
    // Requires virtual destructor 
    delete basePointer;
    basePointer = NULL;
    
    return 0;
}
```

## What Does This Mean For Embedded Devices?

If you use the `dynamic_cast<>()` operator in code that is going onto a microcontroller, this now means the entire RTTI engine has to be included (assuming you are not already using the typeid operator, which also uses the RTTI).

Note that RTTI is only availiable for functions which are polymorphic (i.e. have at least one virtual method), so by using RTTI-specific features, you are also implying you are using virtual methods, which is another resource cost on an embedded device.
