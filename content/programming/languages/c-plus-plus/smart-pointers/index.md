---
authors: [ "Geoffrey Hunter" ]
date: 2015-08-12
draft: false
title: "Smart Pointers"
type: page
---

## Overview

Smart pointers in C++ are pointer objects which have added functionality over the concept of a _raw pointer_, in where these advanced pointer objects can automatically delete the memory once there are no more references to it, preventing the user from having to remember to call delete/delete[]. It **could be seen as some form of basic garbage collection**, except it is still deterministic (i.e. you can know exactly when the memory will be freed).

{{% aside type="warning" %}}
Although smart pointers may seem like the magic bullet and that you never should use raw pointers or references again, please note, it's VERY EASY TO ABUSE SMART POINTERS. Boring standard pointers and references still have very valid use cases. Smart pointers should only be used when dealing with object ownership (more on this below).
{{% /aside %}}

**Problems With Raw Pointers**

Before we touch on what a smart pointer is, it's probably best to review the disadvantages of raw pointers:

1. It's declaration doesn't indicate whether it points to a single object or array. This also means than when it comes to deleting it, you don't know whether to use delete or delete[].
2. It doesn't tell you anything about whether you should delete what it points to once you have finished using it (it doesn't tell you whether the pointer _owns_ the thing it points to).
3. It's difficult to delete a pointer once an only once only all paths of execution in you code.
4. There is no way to tell if a pointer dangles, and it can be prudent to also check to make sure the pointer is non-null (typically when a pointer is non-initialised, or been deleted and then set to null) before attempting to use it.

**C++ std Library To The Rescue**

Fortunately, the C++ standard library (std) provides a range of smart pointers to overcome these problems with raw pointers. These are described in detail below.

## std::unique_ptr

`std::unique_ptr` is your bread and butter when it comes to smart pointers. A unique_ptr enforces _exclusive ownership_. One and only one pointer may own the memory at one time, and no other pointers may point to that memory. For that reason, you cannot **copy** a unique_ptr (copying would result in two unique_ptr's pointers pointing to the same memory), but you may **move** it.

Moving a `unique_ptr` moves ownership of the memory from the source pointer to the destination pointer. After a move, the source pointer is automatically set to null.

Upon destruction of a `unique_ptr` (let's say the pointer goes out of scope), the pointer also destroys the memory it points to. By default, unique_ptr's destroy the memory by calling delete, but, during construction, they can be assigned **custom deleters**. Custom deleters are user-defined functions (or function objects, if using lambda expressions) that are automatically called by unique_ptr when it is time for the memory to be destroyed.

Because of the limited abilities of a `unique_ptr`, it does not add much overhead or size compared to a raw pointer. It is small and light-weight.

## std::shared_ptr

A `std::shared_ptr` can be used **when an object has multiple owners**. Unlike `std::unique_ptr`, **shared pointers can be copied**, and these copies passed to other owners. The underlying object that the shared pointer points to will not be deleted until all shared pointers pointing to it are destroyed.

**How It Works**

A shared pointer works by performing **reference counting**. A count of the total number of shared pointer's pointing to an object is retained in memory, and the object is only deleted when this count reaches 0. For this to occur, this count must be stored in a completely separate piece of memory to any one of the shared pointers, and that is allocated on the heap.

**Cyclic Ownership**

Watch out for cyclic ownership! One example of cyclic ownership is where a class A and B both contain a `std::shared_ptr` to each other. If this happens, neither of them will ever be deleted, as the `std::shared_ptr` in each class is keeping the other class "alive".

This code example below highlights a cyclic ownership issue with `std::shared_ptr` objects.

```c++
#include <iostream>
#include <memory>

class A;
class B;

class A {
public:
    A() {
        std::cout << "A's constructor called." << std::endl;
    }
    ~A() {
        std::cout << "A's destructor called." << std::endl;
    }
    std::shared_ptr<B> b_;
};

class B {
public:
    B() {
        std::cout << "B's constructor called." << std::endl;
    }
    ~B() {
        std::cout << "B's destructor called." << std::endl;
    }
    std::shared_ptr<A> a_;
};

int main() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    
    a->b_ = b;
    b->a_ = a;
    
    // There is a memory leak!
    // Because of the cyclic shared pointer's, neither
    // A nor B will be destroyed here
    return 0;
}
```

Run this code online at [https://wandbox.org/permlink/ilQJXkeFARS6JOQt](https://wandbox.org/permlink/ilQJXkeFARS6JOQt).


How do you prevent cyclic ownership? The only answer is to think carefully about who "owns" the memory, and make sure that two objects do not "own" each other. If two objects do need to hold references to each other, make sure at least one of them is a `std::weak_ptr` (or a plain old pointer).

**Should I Pass A std::shared_ptr By Reference Or Value?**

What should you do if you are passing a `std::shared_ptr` into a function which needs temporary access to the underlying object? Do you pass it by value:

```c++    
#include <iostream>
#include <memory>

void PrintString(std::shared_ptr<std::string> msg) {
    std::cout << *msg;   
}

int main() {
    auto msg = std::make_shared<std::string>("Hello, world!");
    PrintString(msg);
    return 0;
}
```

Run this code online at [https://wandbox.org/permlink/QIWUgBRC4eKP5PKi](https://wandbox.org/permlink/QIWUgBRC4eKP5PKi).

Or do you pass by reference?

```c++    
#include <iostream>
#include <memory>

void PrintString(const std::shared_ptr<std::string>& msg) {
    std::cout << *msg;   
}

int main() {
    auto msg = std::make_shared<std::string>("Hello, world!");
    PrintString(msg);
    return 0;
}
```

Run this code online at [https://wandbox.org/permlink/lWvdqx6rGPsSlkcH](https://wandbox.org/permlink/lWvdqx6rGPsSlkcH).

The answer is, it depends. It could even be wiser to pass as a raw pointer or raw reference instead, depending on what the function is going to do with the object.

Here is [Herb Sutter's view](https://herbsutter.com/2013/06/05/gotw-91-solution-smart-pointer-parameters/) on the issue:

> Guideline: Don’t pass a smart pointer as a function parameter unless you want to use or manipulate the smart pointer itself, such as to share or transfer ownership.

> Guideline: Express that a function will store and share ownership of a heap object using a by-value shared_ptr parameter.
 
> Guideline: Use a non-const shared_ptr& parameter only to modify the shared_ptr. Use a const shared_ptr& as a parameter only if you’re not sure whether or not you’ll take a copy and share ownership; otherwise use widget* instead (or if not nullable, a widget&).

He also goes on to say:

> "an essential best practice for any reference-counted smart pointer type is to avoid copying it unless you really mean to add a new reference"

{{% aside type="note" %}}
By in passing by copy, a new shared pointer is made, and the reference count is incremented (and decremented again when the function returns). This procedure does not have to occur when passing by reference.
{{% /aside %}}
