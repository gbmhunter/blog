---
aliases: [
    "/programming/languages/c-plus-plus/passing-a-cpp-member-function-to-a-c-callback/", # Combined the content into this page
]
author: "gbmhunter"
categories: [ "Programming", "Languages", "C++" ]
date: 2014-01-17
draft: false
lastmod: 2021-06-12
tags: [ "programming", "languages", "C++", "callbacks", "methods", "functors", "functions", "Vlpp", "libsigc++", "signals", "slots", "callee" ]
title: "C++ Callbacks"
type: "page"
---

## Overview

Callbacks are functions which are passed to other functions (or modules, libraries e.t.c) that then call the function at their choosing.

C++, being a strongly-typed object-orientated language, makes callbacks a tricker subject to deal with than say, in C (non-object orientated) or Javascript (object orientated but NOT strongly typed). **This is especially true for embedded systems where you cannot always rely on having newer C++ standard library header files** such as `<functional>` at your disposal (it's a mixed bag, some embedded C++ environments I've used do support `<functional>`, others do not).

{{% note %}}
I have written an open-source C++ callback library called slotmachine-cpp, which you can download from [GitHub here](https://github.com/gbmhunter/slotmachine-cpp).
{{% /note %}}

## Terminology

First, let's get some terminology out of the way:

Term            | Description
----------------|---------------
Callee			    | An object which gets passes a callback function, and then calls (executes) it.
Function        | A basic function that does not require an instance of a class to run (e.g. standard C style functions, or static member functions).
Method			    | A function that belongs to an class, and requires an instance of that class to run. 
Signals			    | Term used for "events" in an event/listener system.
Slots			      | Term used for objects which listen to signals in an event/listener system. These are normally implemented with a callback system.

## The Main Problem With Callbacks In C++

The problem arises when you want to pass in a non-static method (function belonging to an class, that requires an instance of that class) as a callback to a library. A method is a member function of an object. To call a method, you can't just know the functions memory address and call it, you also have to know the object that the function belongs to (the `this` pointer!).

This means that for C++ method callbacks in their most simple form, **the callee has to know the type of the object the function belongs to**. For example:
    
```c++
class A {
	// Create a method that needs to be called
	PleaseCallMe();
};

class B {
	// Create a method which can call A::PleaseCallMe
	// Note that the object A has to be known here! This creates undesired coupling!
	PassACallbackToMe(void (A::* pleaseCallMe)()) {
		// Call the callback function, this part is just the same as if in C
		pleaseCallMe();
	}
}

int main() {
	// Create objects of type A and B
	A a;
	B b;

	// Pass a callback to A::PleaseCallMe() into B so that
	// B can then call it
	b.PassACallackToMe(&a.*PleaseCallMe);
}
```

## Using Static Methods Or Non-Member Functions (C-Style)

One way to implement callbacks in C++ is to use static methods or non-member functions. This is pretty much how you do it in C, and callbacks of the type `void (*myFunctionPtr)()` can be used. However, this has the following disadvantages:

* You have to create stand-alone callback functions.
* Member methods cannot be called directly (obvious). All of the preceding points relate to calling methods...
* If you want to then call member methods, the static function has to know about the object, requiring the object to be global, yuck.
* Member methods have to be made public to be called from the function/static method, messing with what should really be public and private.
* All of the above hint at the fact that this is not really an OOP solution

The above bullet list should suggest that while easy, static methods or non-member function callbacks is not really an ideal solution. Luckily, there are better solutions (keep reading).

## Using std::function

If you have authorship of the library wanting to callback, the recommended approach is to change the signature away from a C-style callback and use `std::function` and lambdas instead. Rather than the library accepting a C-style callback in the format `int (callback*) (int num1, int num2)`, update the library to accept a `std::function<int(int, int)> callback`. This allows you to pass in a lambda, which as you'll see below, allows you to easily call a member function.

(run this code at <a href="http://cpp.sh/4q3tt" target="_blank">http://cpp.sh/4q3tt</a>)

```c++
#include <cstdio>
#include <functional>

class LibraryClass {
public:
	void passACallbackToMe(std::function<int(int, int)> callback) {
	    // Now invoke (call) the callback
		int o = callback(1, 2);
        printf("Value: %i\n", o); // We might be on an embedded system, use printf() and not std::cout
	}
};

class MyClass {
public:
      int methodToCallback(int num1, int num2) {
          return num1 + num2;
      }
};

int main()
{
    MyClass myClass;
    
    LibraryClass libraryClass;
    // Use a lambda to capture myClass and call the member method
    libraryClass.passACallbackToMe([&myClass](int num1, int num2) -> int {
        return myClass.methodToCallback(num1, num2);
    });
    
    // Alternate way to using a lambda, use std::bind instead. However I recommend the lambda way.
    libraryClass.passACallbackToMe(std::bind(&MyClass::methodToCallback, myClass, std::placeholders::_1, std::placeholders::_2));
}
```

Rather than a lambda like in the example above, you can use `std::bind` instead. I strongly recommend the lambda way of doing things, but for sake of completeness let's introduce the `std::bind` technique (run this code at <a href="http://cpp.sh/3v6kt" target="_blank">http://cpp.sh/3v6kt</a>):

```c++
#include <cstdio>
#include <functional>

class LibraryClass {
public:
	void passACallbackToMe(std::function<int(int, int)> callback) {
	    // Now invoke (call) the callback
		int o = callback(1, 2);
        printf("Value: %i\n", o); // We might be on an embedded system, use printf() and not std::cout
	}
};

class MyClass {
public:
      int methodToCallback(int num1, int num2) {
          return num1 + num2;
      }
};

int main()
{
    MyClass myClass;
    
    LibraryClass libraryClass;

    // Alternate way to using a lambda, use std::bind instead. However I recommend the lambda way.
    libraryClass.passACallbackToMe(std::bind(&MyClass::methodToCallback, myClass, std::placeholders::_1, std::placeholders::_2));
}

```

## Passing a C++ Member Function To A C Callback

The above solution of accepting a `std::function` works great if you also have authorship of the library which wants a callback passed to it. But in many cases you don't have the ability to change the library, and you might be stuck with trying to provide a member function to a library which wants a C-style callback. Never fear, there is a solution to this.

Ready for some magic (o.k., not magic, but I am pretty impressed with how this works!)? Let's look at the code example below (run this code at <a href="http://cpp.sh/4usaf" target="_blank">http://cpp.sh/4usaf</a>):

```c++
#include <stdio.h>
#include <functional>

template <typename T>
struct Callback;

template <typename Ret, typename... Params>
struct Callback<Ret(Params...)> {
   template <typename... Args> 
   static Ret callback(Args... args) {                    
      return func(args...);  
   }
   static std::function<Ret(Params...)> func; 
};

template <typename Ret, typename... Params>
std::function<Ret(Params...)> Callback<Ret(Params...)>::func;

// C-style API which just wants a standard function for callback
void c_function_which_wants_callback(int (*func)(int num1, int num2)) {
   int o = func(1, 2);
   printf("Value: %i\n", o);
}

class ClassWithCallback {
   public:
      int method_to_callback(int num1, int num2) {
          return num1 + num2;
      }
};

typedef int (*callback_t)(int,int);

int main() {
    ClassWithCallback my_class;
    Callback<int(int,int)>::func = std::bind(&ClassWithCallback::method_to_callback, &my_class, std::placeholders::_1, std::placeholders::_2);
    callback_t func = static_cast<callback_t>(Callback<int(int,int)>::callback);

    // Now we can pass this function to a C API which just wants a standard function callback    
    c_function_which_wants_callback(func);      
}
```

## C++ Callback Libraries

### cpgf

Website: <a href="http://www.cpgf.org/" target="_blank">http://www.cpgf.org/</a>

* Uses the signals and slots syntax
* Callbacks can be functions, member methods, virtual methods...
* Really easy to use syntax.
* Powerful.

License: Apache License, Version 2.0</td>
  
### libsigc++

Website: <a href="http://libsigc.sourceforge.net/" target="_blank">http://libsigc.sourceforge.net/</a>

* Supports signals and slots.
* Many features.
* Powerful.
* Uses advanced C++ compiler features.
* Somewhat complex to use

License: GNU Library General Public License

### Vlpp

_Vlpp_ is an open source C++ library which provides cross-platform replacements for `<functional>` (among other std libraries). Typically, the `<functional>` library provided by the C++ standard library will not work on embedded systems (simple test: try and include it and use `std::function` to see if your platform supports it). _Vlpp_ can be used as a substitute, allowing you to use `vl::Func<void(void)>` to replace `std::function<void(void)>` and implement callbacks in this manner on embedded platforms.

## External Resources

[Callbacks In C++ Using Template Functors](http://www.tutok.sk/fastgl/callback.html) is a great page explaining and analysing all the different ways for implementing callbacks in C++. This includes the functional model, single rooted hierarchy, parameterize the caller, callee mix-in, and functors (which they promote).

[The Type-safe Callbacks In C++](http://www.codeproject.com/Articles/6136/Type-safe-Callbacks-in-C) library on the Code Project gives a great, complete callback library for C++ which allows callbacks with 0 to 5 input arguments.

[Functors to Encapsulate C and C++ Function Pointers](http://www.newty.de/fpt/functor.html) is a short and simple tutorial on using functors.

