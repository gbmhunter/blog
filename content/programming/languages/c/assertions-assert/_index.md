---
authors: [Geoffrey Hunter]
date: 2013-06-17
draft: false
lastmod: 2024-03-27
tags: [C, programming, assert, asserts, exception, firmware, macro, pre-processor, GCC]
title: Assertions (assert())
type: page
---

## Overview

`assert()` is a useful tool to check that certain conditions hold true during the runtime. Assertions are generally meant for checking fatal errors only. For example, it's usually a good idea to use assert to make sure a pointer is not null. If it was `null`, it means there is a bug in the firmware and it needs fixing. It also generally means you are not able to continue with execution. It's not a good idea to use assert to check if the current room temperature is above 20C.

{{% aside type="tip" %}}
It's also getting popular to use similar `assert()` like calls to perform certain checks at compile time. More on this below!
{{% /aside %}}

The basic premise behind an `assert(bool_t value)` is that the **macro/function checks to make sure that value is true.** The developer adds the checks where the expected result should be true. If the value is not true (i.e. false), the software/firmware takes specific action.

For a software application, this "specific action" may be printing out the filename and line number the `assert()` was raised in, and then exiting the application. For a firmware application, this may be printing out the filename and line number the `assert()` was raised in, and then restarting (it does not make sense to "quit" in a firmware environment).

Assertions refer to the use of both the standard C library `assert()` macro, and the use of similar user-defined macros.

If you are looking for a full-blown `assert()` example, check out the compilable/testable `assert()` code snippet at [http://ideone.com/CSX6wN](http://ideone.com/CSX6wN).

## A Simple assert() Using A Macro

**`assert()` is usually defined in C using a macro (rather than a function)**. This provides the ability of automatically keep track of things such as the filename and line number that the `assert()` was written on.

A basic assert macro could have the following definition:

```c
#define ASSERT(exp) (exp ? : assertFailed(__FILE__, __LINE__))
```

Note that the ternary operator is used here instead of an if statement.

`assertFailed()` is a function you have to write that will handle any raised `assert()`'s. You just need to declare that it exists in the same header file the ASSERT macro is in, and then define it in a `.c` file somewhere as:

```c
void assertFailed(const char * filename, int lineNumber)
{
    // Assuming printf() sends the data to somewhere like a serial debug port on
    // your embedded device
    printf("ERROR: Assert raised in file %s at line number %i.", filename, lineNumber);
}
```

You could then use it like this:

```c
ASSERT(myPtr); // Makes sure pointer is not null.
ASSERT(x == 4); // Makes sure x = 4
ASSERT(msgLength <= bufferSize); // A common use case is to check array sizes
```

## A Note On __FILE__ and __LINE__

`__FILE__` and `__LINE__` are special _Standard Predefined Macros_ as defined by the C language specifications[^geeks-for-geeks-predefined-macros-in-c-with-examples]. For more info, see the [File Names And Line Numbers section of the Preprocessor page](/programming/languages/c/preprocessor#file-names-and-line-numbers).

`__FILE__` and `__LINE__` can be **removed from the macro in flash constrained embedded systems** (storing the filename strings can take up a decent amount of flash).

Note that use of `__FILE__` **may not take up as much flash memory as you think,** as most compilers with any sort of optimisation turned on will collate all string literals which are exactly the same into one (i.e. all the the `__FILE__` pointers in the same file will point to the same string literal).

Are there any other useful preprocessor keywords? How about `__func__`? This gets replaced with a `const char *` that contains the name of the current function the macro is in. You could add that info in there too!

## Printing The Failed assert() Condition

Even more useful than just having the filename and line number is also printing the expression which caused the failed assert() . Luckily, this is easy to do, using the [preprocessor stringification symbol](/programming/languages/c/preprocessor#stringification), #.

```c    
#define ASSERT(exp) (exp ? : assertFailed(__FILE__, __LINE__, #exp))
```

The function which handled the failed `assert()` would then have the following declaration:

```c
void assertFailed(const char * filename, int lineNumber, const char * expression)
{
    // Assuming printf() sends the data to somewhere like a serial debug port on
    // your embedded device
    printf("ERROR: Assert expression %s failed in file %s at line number %i.", expression, filename, lineNumber);
}
```

Note that this would **consume much more flash memory** than `__FILE__` alone would, as rarely any of the `const char *` expression string literals would be the same.

## Preventing Side-Effects

`assert()` checks **should NOT have any side effects**. That is, you should not embed assignments or function calls with side-effects inside `assert()` checks. This is to prevent the logic of your application changing when enabling/disabling `assert()`'s.

```c    
// This is good
assert(x == 3);

// This is BAD
// (this makes x = 1)
assert(x = 1);

// This is BAD...assuming myFunc()
// has side effects. If myFunc() was a pure function, i.e.
// only operated on it's inputs, contains no state, and returns a value
// then this is ok
assert(myFunc(x));
```

The `assert()` macro can be re-written to stop developers from writing `assert()`'s with side effects. This can be done by **making clever use of the C comma operator** (note that this is not the same as the comma used as a separator between variables in a function call).

```c    
#define ASSERT(a)  ((void)(exp), (exp ? : assertFailed(__FILE__, __LINE__, #exp)))
```

Is using the GCC compiler, and you write an assert with side effects, you should get the following error:

```c
error: void value not ignored as it ought to be
```

Note that I was using gcc-5.1 when I was presented with this error.

{{% figure src="_assets/screenshot-of-compiler-error-disallowing-assert-side-effects.png" width="700px" caption="A screenshot of the C compiler throwing an error when an assignment is attempted within the parameter passed to an assert()." %}}

## Complete Code Example

I have written a working `assert()` example at [http://ideone.com/CSX6wN](http://ideone.com/CSX6wN). It employs all of the functionality described above, including filename and line number reporting, expression printing, and syntax which disallows the use of assignments or function calls within the parameter passed to `assert()`.

{{< figure src="_assets/assert-example-code-on-ide-one.png" width="900px" caption="Example assert() code on Ideone (http://ideone.com/CSX6wN)."  >}}

## Assert With printf() Style Messages

The below macro allows you to use assert with `printf()` style messages:

```c    
#define LOG_ERROR(M, ...) fprintf(stderr, "[ERROR] (%s:%d) " M "\r\n", __FILE__, __LINE__, ##__VA_ARGS__)
#define assertf(A, M, ...) if(!(A)) { LOG_ERROR(M, ##__VA_ARGS__); assert(A); }
```

A working example of the above code can  be found at [https://ideone.com/DD1PJs](https://ideone.com/DD1PJs).

## Compile Time Asserts

Since C11, the standard library has provided an easy way of writing asserts that get checked at compile time rather than runtime. In C11, `<assert.h>` introduced the following macro[cppreference-c-static-assert]:

```c
#define static_assert _Static_assert
```

You can use `static_assert()` like this:

```c
#include <assert.h>

#define MAX_MSG_LENGTH 20
#define BUFFER_SIZE 30

int main(void)
{
    // Check we can hold the message in the buffer
    static_assert(MAX_MSG_LENGTH <= BUFFER_SIZE);

    // You can check integer constants at compile time
    static_assert(4 == 4);
}
```

Because these are compile time checks, you can't check for things that are not known until runtime.

```c
#include <assert.h>
 
int main(void)
{
    static_assert(3.14 == 3.14, "Is Pi Pi?"); // Won't work, can't check floats!
    
    const int x = 4;
    static_assert(x == 4); // Can't check variables, even if they are declared const
                           // You could in C++ with constexpr.

    static_assert(myFunc()); // Can't check function return variables. You can in C++
                             // with constexpr.
}
```

In C23, `static_assert()` was turned into a keyword[cppreference-c-static-assert], so you don't even need to `#include <assert.h>`!

## External Links

[Assert Yourself, by Niall Murphy](http://www.embedded.com/electronics-blogs/other/4023329/Assert-Yourself), is a good read about using the assert() macro.

## References

[^geeks-for-geeks-predefined-macros-in-c-with-examples]: GeeksforGeeks. _Predefined Macros in C with Examples_. Retrieved 2024-03-27, from https://www.geeksforgeeks.org/predefined-macros-in-c-with-examples/.
[cppreference-c-static-assert]: cppreference.com (2023, Feb 21). _C - Error handling - static_assert_. Retrieved 2024-03-27, from https://en.cppreference.com/w/c/error/static_assert.