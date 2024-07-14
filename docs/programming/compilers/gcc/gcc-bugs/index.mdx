---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Compilers", "GCC" ]
date: 2017-10-05
draft: false
lastmod: 2017-10-05
tags: [ "programming", "compilers", "bugs", "ARM", "C++", "Zynq" ]
title: "GCC Bugs"
type: page
---

## Issue With std::function (and lambdas) With gcc and arm

This specific bug has caused be much pain when cross-compiling C++ code for the Zynq 7020 SoC (which has ARM A9 processors on-board). This caused software to seg fault for not good reason. It appeared when trying to use a captured this inside of a lambda function.

Code To Cause Issue:

```c
#include <iostream>
#include <functional>

class App {

public:

    std::function<App*()> test_;

    void Run() {

        // Enable this line, ERROR is printed
        // Disable this line, app runs o.k.
        std::cout << "This print statement causes the bug below!" << std::endl;
        
        test_ = [this] () {
            return this;
        };

        App* returnedThis = test_();
        if(returnedThis != this) {
            std::cout << "ERROR: 'this' returned from lambda (" << returnedThis << ") is NOT the same as 'this' (" << this << ") !?!?!?!?!" << std::endl;
        } else {
            std::cout << "Program run successfully." << std::endl;
        }

    }
};

int main(void) {
    App app;
    app.Run();
}
```

The print to `std::cout` causes the bug to occur. Other, non-stream operations will likely cause a similar issue

**Effects:** Effects GCC v6.2.0, possibly others.

**Workaround:** Either compile with only -O0 or -O1 level optimizations, or add the gcc compiler flag -fno-schedule-insns2 (which disables instruction scheduling).

I posted a question on [StackOverflow regarding this bug](https://stackoverflow.com/questions/44830566/this-captured-by-lambda-is-incorrect-gcc-compiler-bug). Phillip Huppertz then [found the bug logged in gcc's bugzilla](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=77686).
