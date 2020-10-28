---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "C" ]
date: 2013-03-18
draft: false
lastmod: 2014-03-18
tags: [ "programming", "programming languages", "C", "strings", "ASCII", "char", "special characters", "itoa()", "sprintf()", "snprintf()" ]
title: "String Manipulation"
type: "page"
---

## ASCII Characters

### Null Character

The null character (represented by `'\0'` , `0x00` , or a constant defined as `NULL`) is used to terminate strings and arrays (essentially the same thing anyway). Most string-based commands will automatically insert the null character at the end of a string, while memory commands won't. Special care has to be taken to make sure the memory set aside for a string can accommodate the null character (when talking in bytes, the number of ASCII characters + 1).

### Carriage Return And New Line

These two characters are used to being a new line of text. The carriage return moves the cursor back to the start of the line, and the new line shifts the cursor down one line. These characters are reminiscent of the typewriter days. The carriage return is inserted into code using `\r`, and a new line using `\n`. The standard order is to write the carriage return first, and then the new line `\r\n`.

```c    
stringBuff[100];
// Nicely formatted text
snprintf(stringBuff, sizeof(stringBuff), "This is a line of text.\r\n");
snprintf(stringBuff, sizeof(stringBuff), "This is a second line of text.\r\n");

// Muddled text
snprintf(stringBuff, sizeof(stringBuff), "This is a line of text.");
snprintf(stringBuff, sizeof(stringBuff), "This text will be muddled with the first because there is no carriage return or new line.\r\n");
```

### Case Switching

The case of ASCII characters can be switched in code by inverting the 5th bit. It can also be done by exclusive ORing with the space character.

```c    
printf("A" ^ " ");
// stdout: a

printf("a" ^ " ");
// stdout: A
```

## Strings

Strings in C are arrays where each element of the array holds an ascii character. When they are defined using double quotes, they are called a string literal. Normally these are 8-bit elements representing the standard ascii format (click for ascii table). The arrays can be defined first, and then ascii characters assigned to them, of the ascii values can be assigned easily when the array is defined as follows:

This will define a 7 byte string, 6 bytes to hold "abc123" and then the 7th to terminate the string with `\0` (`0x00`). Here are two ways of writing this.

```c    
char* myString = "abc123";
char myString[] = "abc123";
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

## C Number To String Functions

### printf (And It's Variants)

`printf()` can be a very taxing function on the processor, and may disrupt the real-time deadlines of code (especially relevant to embedded programming). It is a good idea to keep `printf()` function calls away from high-priority interrupts and control loops, and instead use them in background tasks that can be pre-empted (either by interrupts or a higher-priority threads when running a RTOS).

**printf()**

`printf()` is the most commonly used string output function. It is a variadic function (it takes a variable number of arguments, note that this is not the same as function overloading, which is something that C does not support).

On Linux, this will print the string to the calling terminal window. Most embedded systems do not support `printf()` as their is no "standard output" (although this can be re-wired to say, a UART). Instead, in embedded applications, `printf` variants like `sprintf()` are more common.

If you want to print an already-formulated string using `printf` (with no additional arguments to be inserted), do not use the syntax `printf(msg)`. Instead, use the format `printf(%s, msg)`.

```c    
char* msg = "Example message";

// This is the incorrect and unsafe way of printing
// an already formulated string, and the compiler
// should give you a warning.
printf(msg);

// The correct way of printing an already-formulated
// string
printf(%s, msg);
```

The `printf()` function takes format specifiers which tell the function how you want the numbers displayed.


Most C compiler installations include standard C libraries for manipulating strings. A common one is `stdio.h`, usually included into a C file using the syntax `#include <stdio.h>`. This library contains string copy, concatenate, string build and many others. Most of them rely on null-terminated strings to function properly. Some of the most widely used ones are shown below.


### itoa()

**`itoa()` is a widely implemented but non-standard extension to the C programming language**. Although widely implemented, it is not ubiquitous, as GCC on Linux does not support it (which has a huge share of the C compiler space). Even though it is not specified in the C programming standard, it is confusingly included via `stdlib.h` as it complements the existing functions in that header. It is typically defined as:

```c
char * itoa(int value, char * str, int base);
```

Usage:

```c
#include <stdlib.h>
int main() {
  int number = 436;
  char buffer[10];
  itoa(number, buffer, 10);
  printf(buffer);
}
```

`itoa()` can cause undefined behaviour if the buffer is not large enough to hold the string-representation of the passed in integer. If you have a restricted range of integer that are provided to `itoa()`, you can quite easily determine how big the buffer should be. If it could be any integer, you need a buffer that can handle `INT_MIN` (and a trailing `NULL`). A safer alternative (that is also portable) to `itoa()` is to use `snprintf("%d", ...)`.

Another good reason to abandon `itoa()` is that it is not supported in C++.


## C String To Number Functions

### atof()

`atof()` is a historic way of converting a string to a double-precision float (yes, even though the function has `f` in it's name, it actually returns a `double`).

The biggest let-down with `atof()` is that you cannot distinguish between the text input `"0.0"` and when there is no valid number to convert. This is because `atof()` returns `0.0` if it can't find a valid float number in the input string. For example:

```c    
// Result is the same (0.0) in both of these cases).
double result;
result = atof("0.0");
result = atof("blah blah");
```

There is a better alternative `strtod()`, which allows you to test for this condition, **if your system supports it**.

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

Memory manipulation functions are also useful for string manipulation. Some of the useful functions are shown below.

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{% code %}}`memset(char* stringBuff, int value, size_t num);`{{% code %}}</td>
      <td>Writes a constant value to a set number of elements in memory.</td>
      <td>Used to clear a string at run-time (e.g. {{% code %}}`memset(buff1, '\0', sizeof(buff1));`{{% code %}}). A common mistake is to put the input variables value and num around the wrong way, **which screws up the systems memory**!</td>
    </tr>
  </tbody>
</table>

## Decoding/Encoding Strings

`strtok()` is a standard function which is useful for decoding strings. It splits a string up into a subset of strings, where the strings are split at specific delimiters which are passed into the function. It is useful when decoding ASCII-based (aka human readable) communication protocols, such as the command-line interface, or the [NMEA protocol](/electronics/communication-protocols/nmea-protocol/). Read more about it on the [C++ Reference site](http://www.cplusplus.com/reference/cstring/strtok/).

`getopt()` is a standard function for finding command-line arguments passed into main() as an array of strings. It is included in the [GCC glibc library](http://www.gnu.org/software/libc/). The files are also downloadable locally [here](/docs/getopt.zip) (taken from GCC gLibC v2.17).

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

### snprintf()

`sprintf()` has plenty of special characters you can add to format the output number exactly how you want it.

The length parameter specifies the length of the variable (for example, you can have 8-bit, 16-bit, 32-bit, e.t.c integers). In the Keil C51 compiler, the `b` or `B` length specifier is used to tell `sprintf` that the number is 8-bit. If you don't use this, 8-bit numbers stored in `uint8_t` or `char` data types will not print properly. You do not have to use the `b/B` specifier when using GCC.

```c    
// Print a float to 2 decimal places
snprintf(txBuffer, sizeof(txBuffer), "Float to 2dp: %.2f", float1);

// Print a 8-bit number in the Keil C51 compiler, using the length specifier 'b' ('B' can be used also)
uint8 eightBitNum = 23;
sprintf(txBuffer, "This is an 8-bit number: %bu", eightBitNum);
```