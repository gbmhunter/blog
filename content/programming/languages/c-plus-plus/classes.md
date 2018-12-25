---
author: gbmhunter
date: 2013-12-25 11:38:20+00:00
draft: false
title: Classes
type: page
url: /programming/languages/c-plus-plus/classes
---

## What Is A Class?

A class can be basically seen as a super-charged structure. It can do all the things a structure can do, and it also supports **encapsulation (protection of members)**. This is an important difference, one which makes C++ an object-orientated language.

## A Simple Class Example

The following example defines a class for a Point (user chosen name).
    
    class Point
    {
       private:
    
          int32_t x;
          int32_t y;
    
       public:
    
          int32_t GetX()
          {
             return x;
          }
    
          int32_t GetY()
          {
             return y;
          }
    };

We can then go and use the Point class to create Point objects.
    
    Point myFirstPoint = new Point();

The above statement says two things, first it says that myFirstPoint is of type Point (Point myFirstPoint), and then it is equal to a new Point object (= new Point();). The first part **declares** the variable, the second part **initialises** the variable.

Note that a class by itself doesn't create an objects you can use (the exception to this rule is static members).

## Member Functions

Note: All C++ member functions are implicitly named inline. Thus there is no need to use the word inline, as it is already "present". Thus the two member functions below are identical:
    
    // Identical to Point2
    class Point1
    {
       int32_t GetX();
    }
    
    // Identical to Point1
    classPoint2
    {
       inline int32_t GetX();
    }

## But Structures Can Have Functions Too?

A little used feature is that C++ also allows structures (aka struct) to have functions defined inside them (as apposed to C, where you could only define function pointers inside the structure).

## Remembering The Parent

Sometimes, it is useful to remember the parent class. There is no default way of referencing this, any child classes have no knowledge of their parent by design.

To do this, you have to create your own pointer variable in the child class, and when the parent instantiates the class, the parent can pass a pointer to itself, which the child then saves in it's pointer variable.
