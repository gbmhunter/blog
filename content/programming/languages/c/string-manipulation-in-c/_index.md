---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Programming Languages, C ]
date: 2013-03-18
draft: false
lastmod: 2023-12-22
tags: [ programming, programming languages, C, strings, ASCII, char, special characters, itoa(), sprintf(), snprintf(), atoi() ]
title: String Manipulation in C
type: page
---

## Overview

The page teaches you how to work with strings in the C programming language. If you are used to higher level languages such as Python or Javascript, you'll quickly discover that C does not have some of the "nice" string manipulation features such as string concatenation with `+` (e.g. `str1 + str2`), no easy `.length()` property (although there is a function for that, `strlen()`) nor things like a built in regex engine. It doesn't really even have the concept of a string type, just "pointer to char" (`char*`) (some would argue that for all intents and purposes that is a string type).

## What Are Strings In C?

Strings in C are represented by either a pointer to char `char* myStr` or array of char `char myStr[10]`. What is laid out in memory is a series of byte sized ASCII encoded characters, terminated by the null character (`'\0'` or `0x00`).

Say we wanted to store the string "Hello". We could write `char* myStr = "Hello";`. If the compiler decided to plonk this at memory address `0x01` (I avoided `0x00` since that invalid -- it's the null pointer) then the memory would look like this:

```text
Memory address | Value | ASCII
0x00           |       |
0x01           | 0x48  | H
0x02           | 0x65  | e
0x03           | 0x6C  | l
0x04           | 0x6C  | l
0x05           | 0x6F  | o
0x06           | 0x00  | \0
0x07           |       |
```

But this is not all, the memory above is used just to create the literal `"Hello"`. What also is created is the variable `myStr`, which points to the first character in this string. Let's assume the compile decides to plonk this at memory address `0x08`, then your memory will look like this.

```text
Memory address | Value | ASCII
0x00           |       |
0x01           | 0x48  | H
0x02           | 0x65  | e
0x03           | 0x6C  | l
0x04           | 0x6C  | l
0x05           | 0x6F  | o
0x06           | 0x00  | \0
0x07           |       |
0x08           | 0x01  |      // This is myStr
```

Whenever you pass your string variable `myStr` to functions, this `0x01` value is what is passed in. String functions, aware of the type (it's a pointer to char), know to increment through memory until they hit the null char when they want to do operations on the string.

One thing C does differently to a lot of other languages is it's choice of using null to determine the end of the string, rather than reserving some bytes at the start of the character array for holding it's length. To find the length of the string you have to iterate through the bytes until you find `0x00`, which is what `strlen()` does (more on this below).

## Different Ways Of Creating Strings

Whenever you write anything in double quotes in C (e.g. `"abc"`), you are creating what is called a string literal.

```c
char* myStr = "abc"; // This is a string literal
```

You can also declare strings using array notation.

```c
char* myStr1 = "abc"; // Creating a string literal and assigning it to a pointer
char myStr2[] = "abc"; // Creating a string literal and assigning it to any array
                       // (the size is inferred from the right-hand side of the equation)
```

These two ways are mostly equivalent, BUT you must remember that `myStr2` is an array with a known size (at compile time), whilst `myStr1` is just a pointer to a char. Thus, `sizeof()` is going to behave differently.

When compiled for a 64-bit architecture, `sizeof(myStr1)` returns 8, the number of bytes required for the pointer `myStr1` which points to the memory address of the `a` in `"abc"`; However, `sizeof(myStr2)` returns 4, the number of bytes in the array `myStr2` which consists of `['a', 'b', 'c', '\0']`. This difference is bound to trip you up at some point, so be aware of this difference.

{{% aside type="tip" %}}
Most of the time you will be passing strings into functions, and if you use the `char myStr[]` style syntax, the compiler will have no idea what size the array of chars is (you could call it with with a `char str[10]` from one function and a `char str[20]` from another). The array will "decay" to the same thing as `char* myStr`, and sizeof will return the size of a pointer (unless the function is designed to only ever taking a string of a certain size, e.g. `char myStr[10]`, but that is a very odd use case).

Thus you can't use `sizeof()` to work out how big your string is. You have two options. Ever use `strlen()` to get the number of characters in the string, or if you are interested in just how many valid characters there are in the string but how big the array is, **you'll have to pass the size into the function also**. Passing the size of the string array is very common practise in C applications (as with any array, not just for strings), and after a while it will become second nature.
{{% /aside %}}


You can also create an empty string of a certain size:

```c
char myEmptyString[50];
```

{{% aside type="warning" %}}
`char myEmptyString[50];` inside a function will not initialize any of the bytes (it will however if it's outside of a function and on the heap). This means it will not be a well-defined string, and may or may not have a null character in it depending on what the memory happens to be. For example:

```c
int main() {
    char myEmptyString[50];
    printf("%s", myEmptyString); // BAD! Undefined behaviour. Could get lucky and print nothing, could print garbage, 
                                 // or could get really unlucky and print from memory until it reaches the end of memory
                                 // (it will keep printing until it finds a 0x00 in memory).
}
```

What you must do is initialize the string. The easiest way to do this is to use `= {0}`:

```c
int main() {
    char myEmptyString[50] = {0};
    printf("%s", myEmptyString); // Better! Will print nothing, but at least you have defined behaviour.
}
```

Another option is to just set the first byte to the null character, which is all you really need to do for it to be a valid string. However, I still don't like using this method as it's harder to diagnose issues (if you initialize EVERYTHING to 0, you can be sure that if you get a weird value in your string, it's because you have a bug somewhere in your code).

```c
int main() {
    char myEmptyString[50];
    myEmptyString[0] = '\0'; // All you really need to set is the first byte to 0x00
    printf("%s", myEmptyString); // Also good!
}
```

{{% /aside %}}

## Char vs. String

In C, `'a'` and `"A"` are completely different types (as opposed to say, Javascript, in where you can swap `"` for `'` and it doesn't change anything). `'a'` is a single character, whilst `"A"` is a string literal (which is an array of characters). You can't do this:

```c
char myChar = "A"; // This is wrong!
char* myString = 'A'; // This is also wrong!
```

You have to do this:

```c
char myChar = 'A'; // This is correct!
char* myString = "A"; // This is also correct!
```

It then makes sense that to set an individual character in a string, you can use the `'` notation:

```c
char* myString = "Hello";
myString[0] = 'h'; // Sets the first character to 'h', now it's "hello"
```

A `char` literal does not get a null character appended to the end of it, it is just a single byte.

## ASCII Characters

### Null Character

The null character (represented by `'\0'` , `0x00` , or a constant defined as `NULL`) is used to terminate strings and arrays (essentially the same thing anyway). Most string-based commands will automatically insert the null character at the end of a string, while memory commands won't. Special care has to be taken to make sure the memory set aside for a string can accommodate the null character (when talking in bytes, the number of ASCII characters + 1).

### Carriage Return And New Line

These two characters are used to being a new line of text. If you take the names literally, the carriage return moves the cursor back to the start of the line, and the new line shifts the cursor down one line. These characters are reminiscent of the typewriter days.

In Linux style systems, only the new line character is used to begin a new line of text. In Windows, both the carriage return and new line characters are used. For embedded systems, I've seen either preference used (probably depending on what development OS the writer was using!). Most terminal programs support both approaches. The carriage return is inserted into code using `\r`, and a new line using `\n`. In Windows, the standard order is to write the carriage return first, and then the new line `\r\n`.

{{% aside type="tip" %}}
The Windows style `\r\n` will generally work on most Linux style systems as long as the `\r` is just ignored.
{{% /aside %}}

In many other programming languages, you do not need to add the line endings manually as the `print` style function will automatically do that for you (by default -- you can still usually disable it if you don't want that behaviour). C++ is half-way between the two with the standard way of using `std::endl`.

### Case Switching

The case of ASCII characters can be easily switched in code by inverting the 5th bit. This can be done by exclusive ORing with the space character, as shown below:

```c    
printf("%c", 'A' ^ ' ');
// a

printf("%c", 'a' ^ ' ');
// A
```

## Special Characters

Special characters can be added to strings using the escape character `\` followed by a single identifier.

<table>
  <thead>
    <tr>
      <th>Syntax</th>
      <th>Special Character</th>
      <th>Inserted Number (in Hex)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{% code %}}`\0`{{% /code %}}</td>
      <td>{{% code %}}`NULL`{{% /code %}}</td>
      <td>{{% code %}}`0x00`{{% /code %}}</td>
    </tr>
    <tr>
      <td>{{% code %}}`\ddd`{{% /code %}}</td>
      <td>Ascii char representing the three octal chars 'ddd'. Note that \0 is a special case of this more generic notation</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>{{% code %}}`\r`{{% /code %}}</td>
      <td>Carriage Return</td>
      <td>{{% code %}}`0x0D`{{% /code %}}</td>
    </tr>
    <tr>
      <td>{{% code %}}`\n`{{% /code %}}</td>
      <td>New line</td>
      <td>{{% code %}}`0x0A`{{% /code %}}</td>
    </tr>
    <tr>
      <td>{{% code %}}`\\`{{% /code %}}</td>
      <td>Backslash (since a single backslash is the escape character)</td>
      <td>{{% code %}}`0x5C`{{% /code %}}</td>
    </tr>
  </tbody>
</table>

Typically, both the carriage return and new line characters are used for making a new line (and in that order). This is normally appended at the end of strings to be printed with `\r\n`.

## Finding The Length

Use the `strlen()` function provided by 

```c
#include <stdio.h>
#include <string.h>

int main() {
  char my_string[] = "Hello"; 
  print("%z\n", strlen(my_string));
  return 0;
}
// Prints "5"
```

## Copying

`strcpy()` is a standard library function for copying the contents of one C string to another.

```c

```

{{% note %}}
Did you know: The following short piece of code...

```c    
while (*p++ = *q++);
```

is the equivalent to the standard library function `strcpy(p, q)`!
{{% /note %}}



## Concatenating

Unlike many higher level languages, you cannot just concatenate C "strings" together like so: `my_string_1 + my_string_2` (remember, they are just arrays of characters!). Instead you have to use the `strcat()` function:

```c

```


## printf (and variants)

`printf()` and it's variants such as `sprintf()` are some of the most common "something to string" functions. They can be used to convert signed integers, unsigned integers, floats, doubles and other types to strings. They can also be used to print already formatted strings, and/or concatenate existing strings together. They also support formatting options, which allow you to control how the numbers are displayed (e.g. number of decimal places, padding, display number as hex, e.t.c).

{{% aside type="note" %}}
`printf` stands for "print formatted"[^wikipedia-printf].
{{% /aside %}}

### printf()

`printf()` is the most commonly used string output function. It is a variadic function (it takes a variable number of arguments, note that this is not the same as function overloading, which is something that C does not support).

On most mainstream operating systems such as Linux, MacOS and Windows, calling `printf()` will send the formatted string to the terminal (if the application was invoked from a terminal). On an embedded system there is no "standard output", but increasingly on more modern embedded systems `printf()` is routed to a default debug serial port.

If you want to print an already-formulated string using `printf()` (with no additional arguments to be inserted), do not use the syntax `printf(msg)`. Instead, use the format `printf("%s", msg)`.

```c    
char* msg = "Example message";

// This is the incorrect and unsafe way of printing
// an already formulated string, and the compiler
// should give you a warning.
printf(msg);

// The correct way of printing an already-formulated
// string
printf("%s", msg);
```

The `printf()` function takes format specifiers which tell the function how you want the numbers displayed.


Most C compiler installations include standard C libraries for manipulating strings. A common one is `stdio.h`, usually included into a C file using the syntax `#include <stdio.h>`. This library contains string copy, concatenate, string build and many others. Most of them rely on null-terminated strings to function properly. Some of the most widely used ones are shown below.

{{% aside type="warning" %}}
`printf()` and friends can be a very taxing function on the processor, and may disrupt the real-time deadlines of code (especially relevant to embedded programming). It is a good idea to keep `printf()` function calls away from high-priority interrupts and control loops, and instead use them in background tasks that can be pre-empted (either by interrupts or a higher-priority threads when running a RTOS).

For example, the RTOS/framework [Zephyr](/programming/operating-systems/zephyr-project/) uses deferred logging by default, in which the format strings and variables are saved and passed to a low priority logging thread for processing.
{{% /aside %}}

### Conversion Specifiers

Conversion specifiers determine how `printf(`) interprets the input variables and displays their value as a string. Conversion specifiers are added in the input string after the `%` character (optional format specifiers may be added between the `%` symbol and the conversion specifier).

Although the basic behaviour is defined in the ANSI standard, the exact implementation of `printf()` is likely to vary slightly between C libraries.

<table>
  <thead>
    <tr>
      <th>Specifier</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
<tbody>
<tr>
<td>{{% md %}}`%c`{{% /md %}}</td>
<td>Prints a single ASCII character, given a 8-bit number</td>
<td>{{% md %}}`printf("%c", 103);  // Prints "g"`{{% /md %}}</td>
</tr>
<tr>
<td>{{% md %}}`%i`{{% /md %}}</td>
<td>Prints a signed integer (whose exact width is implementation-specific, usually 16 or 32-bit).</td>
<td>{{% md %}}`printf("%i", -34); // Prints "-34"`{{% /md %}}</td>
</tr>
<tr>
<td>{{% md %}}`%u`{{% /md %}}</td>
<td>Prints an un-signed integer (whose exact width is implementation-specific, usually 16 or 32-bit).</td>
<td>{{% md %}}`printf("%u", 456); // Prints "456"`{{% /md %}}</td>
</tr>
<tr>
<td>{{% md %}}`%s`{{% /md %}}</td>
<td>Prints a null-delimited string of ASCII characters (of arbitrary length).</td>
<td>{{% md %}}`printf("%s", "This is a string"); // Prints "This is a string"`{{% /md %}}</td>
</tr>
<tr>
<td>{{% md %}}`%x`{{% /md %}}</td>
<td>Prints a hexidecimal number</td>
<td>{{% md %}}`printf("%x", 10); // Prints "a"`{{% /md %}}</td>
</tr>
<tr>
<td>{{% md %}}`%X`{{% /md %}}</td>
<td>Same as %x, except it prints all in upper-case.</td>
<td>{{% md %}}`printf("%X", 10); // Prints "A"`{{% /md %}}</td>
</tr>
<tr>
<td>{{% md %}}`%f`{{% /md %}}</td>
<td>Prints a float (or double). All floats are converted to doubles anyway via default argument promotions.</td>
<td>{{% md %}}`printf("%f", 2.345); // Prints "2.345"`{{% /md %}}</td>
</tr>
</tbody>
</table>

If you actually wanted to print the % character rather than use it to specify a conversion, use two of them (`printf("%%"); // prints "%"`).

### Format Specifiers

There are plenty of format specifiers that you can use with `printf()` which changes the way the text is formatted. Format specifiers go between the `%` symbol and the conversion specifier, mentioned above. They are optional, but if used, have to be added in the correct order.

I have come across embedded implementations of `printf()` which do not support string padding (e.g. `%5s` or `%-6s`). This includes the version used with the {{% link text="PSoC 5" src="/programming/microcontrollers/psoc" %}}.

### Portable size_t Printing

For portability, you can use the `z` format specifier when you want to print a value of `size_t` (e.g. the number returned by `sizeof()`).

```c    
// Portable way of printing a size_t number,
// using the 'z' modifier.
// (which sizeof() returns)
printf("Size of int = %zi.\r\n", sizeof(int));
```

This was introduced in ISO C99. `Z` (upper-case `z`) was a GNU extension predating this standard addition and should not be used in new code.

### sprintf()/snprintf()

`sprintf()` is a variant of `printf()` which writes the formatted string to a buffer (which you provide a pointer to) rather than to the standard output. It is useful for building strings which you don't want to go to standard output, or want to send to standard output at a later date.

`snprintf()` is a safer version of `sprintf()` (I recommend always using the safer "n" style `printf()` functions) which takes an additional argument which specifies the size of the buffer. This prevents buffer overflows. If the buffer is not large enough to hold the formatted string, the string will be truncated to fit the buffer.

An example of `snprintf()` (notice the use of `sizeof()` to pass the size of the buffer into the function, this prevents overruns if the formatted string is larger than the bugger):

```c
char stringBuff[100] = {0}; // Create buffer for snprintf() to write to. Init. to 0 is not strictly needed here.

snprintf(stringBuff, sizeof(stringBuff), "Hello %s", "World"); // Write formatted string to buffer
// stringBuff now contains "Hello World\0" at the start of it
```

#### Keil C51 Compiler

In the Keil C51 compiler, the `b` or `B` length specifier is used to tell `sprintf` that the number is 8-bit. If you don't use this, 8-bit numbers stored in `uint8_t` or `char` data types will not print properly. You do not have to use the `b/B` specifier when using GCC.

```c
// Print a float to 2 decimal places
snprintf(txBuffer, sizeof(txBuffer), "Float to 2dp: %.2f", float1);

// Print a 8-bit number in the Keil C51 compiler, using the length specifier 'b' ('B' can be used also)
uint8 eightBitNum = 23;
sprintf(txBuffer, "This is an 8-bit number: %bu", eightBitNum);
```

## itoa()

**`itoa()` is a widely implemented but non-standard extension to the C programming language**. Although widely implemented, it is not ubiquitous, as GCC on Linux does not support it (which has a huge share of the C compiler space). Even though it is not specified in the C programming standard, it is confusingly included via `stdlib.h` as it complements the existing functions in that header[^wikibooks-itoa]. It is not part of the C++ standard either[^cplusplus-itoa].

`iota()` is typically defined as:

```c
char* itoa(int value, char* str, int base);
```

The radix is generally limited to octal (8), decimal (10) or hexadecimal (16)[^ibm-zos-docs-itoa].

Usage:

```c
#include <stdlib.h>
int main() {
    int number = 436;
    char buffer[10];
    itoa(number, buffer, 10);
    printf(buffer); // Prints 436
}
```

`itoa()` can cause undefined behaviour if the buffer is not large enough to hold the string-representation of the passed in integer. If you have a restricted range of integers that are provided to `itoa()` you can quite easily determine how big the buffer should be. If it could be any integer, you need a buffer that can handle `INT_MIN` (and a trailing `NULL`). A safer alternative (that is also portable) to `itoa()` is to use `snprintf()`.

## String to Number Functions

`printf()` and friends convert things to strings. But what about the other way around? The C standard library provides a number of different functions for converting strings to numbers. The most common ones are shown below.

### atof()

`atof()` is a historic way of converting a string to a double-precision float (yes, even though the function has `f` in it's name, it actually returns a `double`).

A significant disadvantage with `atof()` is that you cannot distinguish between the text input `"0.0"` and when there is no valid number to convert. This is because `atof()` returns `0.0` if it can't find a valid float number in the input string. For example, it can't tell the difference between `"0.0"` and `"poos"`:

```c
double result;
result = atof("0.0"); // result = 0.0
result = atof("poos"); // result = 0.0
```

Another issue is that `atof()` does not allow you check if the input string was just a valid number, and did not contain garbage after the number. This is because it iterates through the characters in the string, and stops processing as soon as it finds an invalid character.

There is a better alternative `strtod()`, which fixes both of the problems described above.

### strtod()

This stands for (string-to-double). It is a safer way of converting strings to doubles than `atof()`. The code example below shows how to use `strtod()` to convert a string to a double and also how to check that the input string contained a valid number. Newer versions of C/C++ also provide `strtof()` which performs the same function but returns a `float` rather than a `double`.

```c
double ConvertStringToDouble(char* input) {
    char* input = "34.56";
    char* numEnd;

    // Do the conversion
    double output = strtod(input, &numEnd);

    // Bounds checking
    if(numEnd == input)
    {
        printf("Error: Input to strtod was not a valid number.\r\n");
        return false;
    }
}
```

### strtol()

`strtol()` behaves very similarly to `strtod()` except parses the string into a `long int` rather than a `double`.

## Decoding/Encoding Strings

`strtok()` is a standard function which is useful for decoding strings. It splits a string up into a subset of strings, where the strings are split at specific delimiters which are passed into the function. It is useful when decoding ASCII-based (aka human readable) communication protocols, such as the command-line interface, or the [NMEA protocol](/electronics/communication-protocols/nmea-protocol/). Read more about it on the [C++ Reference site](http://www.cplusplus.com/reference/cstring/strtok/).

`getopt()` is a standard function for finding command-line arguments passed into `main()` as an array of strings. It is included in the [GCC glibc library](http://www.gnu.org/software/libc/). The files are also downloadable locally [here](/docs/getopt.zip) (taken from GCC gLibC v2.17).

## Converting a Version String to Numbers

Sometimes you might want to convert a version string in the form `v1.2.3` into the individual major, minor and patch numbers.

The following C code shows a function `VersionStringToNumbers()` which can do this, along with an example `main()` which runs some tests against the function to make sure it can handle valid and invalid input correctly.

`strtol()` was used instead of `atoi()` because `atoi()` cannot distinguish between invalid input and `"0"` (i.e. it can't tell the difference between `"0"` and `"poop"`!). Also, the returned `end` pointer is used to increment through the string, check that a `.` follows immediately after the last number, and then to work out where to begin processing the next integer.

```c
#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * @brief Converts a version string in the form "1.2.3" into numbers.
 *
 * @param[in] version A null-terminated string of the form "1.2.3". The
 *    major number must be in the range [0, 255]. The patch number must
 *    be in the range [0, 65536]. There must not be a "v" at the start.
 * @param[out] major The converted major version number.
 * @param[out] minor The converted minor version number.
 * @param[out] patch The converted patch version number.
 * @return Returns 0 on success, or -1 on failure.
 */
int8_t VersionStringToNumbers(char const *const versionString,
                                                            uint8_t *const major, uint8_t *const minor,
                                                            uint16_t *const patch) {

    char const *offset = versionString;
    char *end;

    // MAJOR NUMBER
    // Don't use atoi(), can't detect difference between "0" and "poop"!
    int majorLocal = strtol(offset, &end, 10);
    if (end == offset) {
        return -1;
    }
    if (majorLocal < 0 || majorLocal > 255) {
        return -1;
    }
    offset = end;
    // Make sure a "." is immediately after the major version number
    if (*offset != '.') {
        return -1;
    }

    // MINOR NUMBER
    offset += 1; // Increment offset to point to first char after found "."
    int minorLocal = strtol(offset, &end, 10);
    if (end == offset) {
        return -1;
    }
    if (minorLocal < 0 || minorLocal > 255) {
        return -1;
    }
    offset = end;
    if (*offset != '.') {
        return -1;
    }

    // BUILD NUMBER
    offset += 1; // Increment offset to point to first char after found "."
    long patchLocal = strtol(offset, &end, 10);
    if (end == offset) {
        return -1;
    }
    if (patchLocal < 0 || patchLocal > 65535) {
        return -1;
    }
    offset = end;
    // Make sure the string ends after the build number
    if (*offset != '\0') {
        return -1;
    }

    // Save to outputs, we can safely cast because we performed range checks above
    *major = (uint8_t)majorLocal;
    *minor = (uint8_t)minorLocal;
    *patch = (uint16_t)patchLocal;

    return 0;
}

int main(void) {
    uint8_t major, minor;
    uint16_t patch;

    printf("Running VersionStringToNumbers() tests...\n");
    int8_t rc = VersionStringToNumbers("1.2.3", &major, &minor, &patch);
    assert(rc == 0);
    assert(major == 1);
    assert(minor == 2);
    assert(patch == 3);

    rc = VersionStringToNumbers("56.234.9876", &major, &minor, &patch);
    assert(rc == 0);
    assert(major == 56);
    assert(minor == 234);
    assert(patch == 9876);

    rc = VersionStringToNumbers("256.1.2", &major, &minor, &patch);
    assert(rc != 0);

    rc = VersionStringToNumbers("", &major, &minor, &patch);
    assert(rc != 0);

    rc = VersionStringToNumbers("1.2.", &major, &minor, &patch);
    assert(rc != 0);

    rc = VersionStringToNumbers("1a.2.3", &major, &minor, &patch);
    assert(rc != 0);

    rc = VersionStringToNumbers("1.2.3a", &major, &minor, &patch);
    assert(rc != 0);

    rc = VersionStringToNumbers("..", &major, &minor, &patch);
    assert(rc != 0);

    printf("Tests complete.\n");
    return 0;
}
```

You can test this code live at https://replit.com/@gbmhunter/c-version-string-to-numbers.

## References

[^wikipedia-printf]: Wikipedia (2023, Aug 23). _printf_. Retrieved 2023-12-25, from https://en.wikipedia.org/wiki/Printf.
[^wikibooks-itoa]: Wikibooks (2020, Apr 16). _C Programming/stdlib.h/itoa_. Retrieved 2023-12-26, from https://en.wikibooks.org/wiki/C_Programming/stdlib.h/itoa.
[^ibm-zos-docs-itoa]: IBM (2021). _z/OS Docs - itoa() - Convert int into a string_. Retrieved 2023-12-26, from https://www.ibm.com/docs/en/zos/2.1.0?topic=functions-itoa-convert-int-into-string.
[^cplusplus-itoa]: cplusplus.com (2023). _function - itoa_. Retrieved 2023-12-26, from https://cplusplus.com/reference/cstdlib/itoa/.