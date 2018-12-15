---
author: gbmhunter
date: 2014-01-17 03:36:28+00:00
draft: false
title: Callbacks
type: page
url: /programming/languages/c-plus-plus/callbacks
---

# Overview

Callbacks are a vital part of event-driven, decoupled programming. C++, being a strongly-typed object-orientated language, makes callbacks that much harder to implement than, say in C (non-object orientated) or Javasciprt (object orientated but NOT strongly typed).

**NOTE:** I have written an open-source C++ callback library called slotmachine-cpp, which you can download from [GitHub here](https://github.com/gbmhunter/slotmachine-cpp).

# Terminology

<table style="width: 600px;" ><tbody ><tr >TermDescription</tr><tr >
<td >Callee
</td>
<td >A object which gets passes a callback function, and then calls (executes) it.
</td></tr><tr >
<td >Method
</td>
<td >A function that belongs to an object.
</td></tr><tr id="signals" >
<td >Signals
</td>
<td >Term used for "events" in an event/listener system.
</td></tr><tr >
<td >Slots
</td>
<td >Term used for objects which listen to signals in an event/listener system. These are normally implemented with a callback system.
</td></tr></tbody></table>

# The Problem

The problem arises when you want to make a callback to a method. A method is a member function of an object. To call a method, you can't just know the functions memory address and call it, you also have to know the object that the function belongs to. This means that for method callbacks in their most simple form, the callee has to know the type of the object the function belongs to. For example:
    
    class A
    {
    	// Create a method that needs to be called
    	PleaseCallMe();
    };
    
    class B
    {
    	// Create a method which can call A::PleaseCallMe
    	// Note that the object A has to be known here! This creates undesired coupling!
    	PassACallbackToMe(void (A::* pleaseCallMe)())
    	{
    		// Call the callback function, this part is just the same as if in C
    		pleaseCallMe();
    	}
    }
    
    int main()
    {
    	// Create objects of type A and B
    	A a;
    	B b;
    
    	// Pass a callback to A::PleaseCallMe() into B so that
    	// B can then call it
    	b.PassACallackToMe(&a.*PleaseCallMe);
    }
    

# Using Static Methods Or Non-Member Functions (C-Style)

One way to implement callbacks in C++ is to use static methods or non-member functions. This is pretty much how you do it in C, and callbacks of the type void (*myFunctionPtr)() can be used. However, this has the following disadvantages:  * You have to create stand-along callback functions  * Member methods cannot be called directly (obvious). All of the preceding points relate to calling methods...  * If you want to then call member methods, the static function has to know about the object, requiring the object to be global  * Member methods have to be made public to be called from the function/static method, messing with what should really be public and private.  * All of the above hint at the fact that this is not really an OOP solution

The above bullet list should suggest that while easy, static methods or non-member function callbacks is not really an ideal solution. Luckily, there are better solutions (keep reading).

# Using Functors

Functors are objects in C++ in where the () operator has been overloaded. The () operator gives a function-like feel to the operator, in where you can do:
    
    functorObj myFunctorObj;     // A functor object (the () operator is overloaded)
    myFunctorObj();              // Using the object like a function
    

# A Type Indepedent Method

The ideal callback can be passes around with the callee knowing nothing about the object it is calling. This allows for the creation of proper, decoupled, re-usable librares. With a bit of what may first seem like C++ black-magic, you can implement type agnostic callbacks in C++.

A key trick is that at some point you have to strip away the type to pass the object and method address from a type-knowing object to a type-agnostic object. This uses memcpy(). Sounds dangerous?

# C++ Callback Libraries

<table ><tbody ><tr >LibraryProsConsLicenseMy RatingLink</tr><tr >
<td >cpgf
</td>
<td >  * Uses the signals and slots syntax  * Callbacks can be functions, member methods, virtual methods...  * Really easy to use syntax.  * Powerful.
</td>
<td > 
</td>
<td >Apache License, Version 2.0
</td>
<td >9/10
</td>
<td >[http://www.cpgf.org/](http://www.cpgf.org/)
</td></tr><tr >
<td >libsigc++
</td>
<td >  * Supports signals and slots.  * Many features.  * Powerful.
</td>
<td >  * Uses advanced C++ compiler features  * Somewhat complex to use
</td>
<td >GNU Library General Public License
</td>
<td >7/10
</td>
<td >[http://libsigc.sourceforge.net/](http://libsigc.sourceforge.net/)
</td></tr></tbody></table>

# External Resources

[Callbacks In C++ Using Template Functors](http://www.tutok.sk/fastgl/callback.html) is a great page explaining and analysing all the different ways for implementing callbacks in C++. This includes the functional model, single rooted hierarchy, parameterize the caller, callee mix-in, and functors (which they promote).

[The Type-safe Callbacks In C++](http://www.codeproject.com/Articles/6136/Type-safe-Callbacks-in-C) library on the Code Project gives a great, complete callback library for C++ which allows callbacks with 0 to 5 input arguments.

[Functors to Encapsulate C and C++ Function Pointers](http://www.newty.de/fpt/functor.html) is a short and simple tutorial on using functors.
