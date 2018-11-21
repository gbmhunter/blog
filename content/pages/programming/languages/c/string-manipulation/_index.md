---
author: gbmhunter
date: 2013-03-18 04:50:53+00:00
draft: false
title: String Manipulation
type: page
url: /programming/languages/c/string-manipulation
---

# ASCII Characters




## Null Character




The null character (represented by '\0' , 0x00 , or a constant defined as NULL ) is used to terminate strings and arrays (essentially the same thing anyway). Most string-based commands will automatically insert the null character at the end of a string, while memory commands won't. Special care has to be taken to make sure the memory set aside for a string can accommodate the null character (when talking in bytes, the number of ASCII characters + 1).




## Carriage Return And New Line




These two characters are used to being a new line of text. The carriage return moves the cursor back to the start of the line, and the new line shifts the cursor down one line. These characters are reminiscent of the typewriter days. The carriage return is inserted into code using  \r , and a new line using \n . The standard order is to write the carriage return first, and then the new line \r\n .



    
    stringBuff[100];
    // Nicely formatted text
    snprintf(stringBuff, sizeof(stringBuff), "This is a line of text.\r\n");
    snprintf(stringBuff, sizeof(stringBuff), "This is a second line of text.\r\n");
    
    // Muddled text
    snprintf(stringBuff, sizeof(stringBuff), "This is a line of text.");
    snprintf(stringBuff, sizeof(stringBuff), "This text will be muddled with the first because there is no carriage return or new line.\r\n");




## Case Switching




The case of ASCII characters can be switched in code by inverting the 5th bit. It can also be done by exclusive ORing with the space character.



    
    printf("A" ^ " ");
    a
    
    printf("a" ^ " ");
    A




# The Standard Libraries


<table style="width: 800px;" border="0" >
<tbody >
<tr >

<td >**Library Name**
</td>

<td >**Description**
</td>

<td >**Popular Objects In Library**
</td>

<td >**Comments**
</td>
</tr>
<tr >

<td ><stdio.h>
</td>

<td >Contains functions for input/output data streams
</td>

<td >printf(), sprintf(), scanf()
</td>

<td >Very common header file. You be searching hard to find a C project which didn't use this library.
</td>
</tr>
<tr >

<td ><stdlib.h>
</td>

<td > 
</td>

<td >atoi(), atof(), rand(), malloc(), abs(), div(), NULL
</td>

<td >Contains a mixture of different functions, some mathematically based, while others related to memory management.
</td>
</tr>
<tr >

<td ><stdbool.h>
</td>

<td >Contains definitions for true and false
</td>

<td >true, false
</td>

<td >Added in C99, contains macros for true and false. C++ supports these natively.
</td>
</tr>
</tbody>
</table>


# Strings




Strings in C are arrays where each element of the array holds an ascii character. When they are defined using double quotes, they are called a string literal. Normally these are 8-bit elements representing the standard ascii format (click for ascii table). The arrays can be defined first, and then ascii characters assigned to them, of the ascii values can be assigned easily when the array is defined as follows:




This will define a 7 byte string, 6 bytes to hold "abc123" and then the 7th to terminate the string with \0 (0x00) . Here are two ways of writing this.



    
    char* myString = "abc123";
    char myString[] = "abc123";




# Special Characters




Special characters can be added to strings using the escape character \  followed by a single identifier.


<table border="0" >
<tbody >
<tr >

<td >**Syntax**
</td>

<td >**Special Character**
</td>

<td >**Inserted Number (in Hex)**
</td>
</tr>
<tr >

<td >\0
</td>

<td >NULL
</td>

<td > 0x00 
</td>
</tr>
<tr >

<td >\ddd
</td>

<td >Ascii char representing the three octal chars 'ddd'. Note that \0 is a special case of this more generic notation
</td>

<td >n/a
</td>
</tr>
<tr >

<td >\r 
</td>

<td >Carriage Return
</td>

<td > 0x0D 
</td>
</tr>
<tr >

<td >\n 
</td>

<td >New line
</td>

<td > 0x0A 
</td>
</tr>
<tr >

<td >\\ 
</td>

<td >Backslash (since a single backslash is the escape character)
</td>

<td > 0x5C 
</td>
</tr>
</tbody>
</table>


Typically, both the carriage return and new line characters are used for making a new line (and in that order). This is normally appended at the end of strings to be printed with \r\n.




# Copying




strcpy() is a standard library function for copying the contents of one C string to another.




Did you know: The following short piece of code...



    
    while (*p++ = *q++);




 is the equivalent to the standard library function strcpy(p, q)!




# Number To String Manipulation




Most C compiler installations include standard C libraries for manipulating strings. A common one is stdio.h, usually included into a C file using the syntax #include <stdio.h>. This library contains string copy, concatenate, string build and many others. Most of them rely on null-terminated strings to function properly. Some of the most widely used ones are shown below.


<table border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Description**
</td>

<td >**Declared In**
</td>

<td >**Comments**
</td>
</tr>
<tr >

<td >snprintf(char* stringBuff, int limit, <string>, <input variable 1>, <input variable 2>, ...);
</td>

<td >Safe version of sprintf, which builds a null-terminated string based on input parameters.
</td>

<td ><stdio.h>
</td>

<td >One of the most (if not the most) useful string functions in C!
</td>
</tr>
<tr >

<td >int atoi(char* stringBuffer);
</td>

<td >Converts a string into an integer (typicaly 16-bit)
</td>

<td ><stdlib.h>
</td>

<td >'Undoes' the snprintf operation by accepting a string input and outputting a number.
</td>
</tr>
<tr >

<td >double atof(char* stringBuffer);
</td>

<td >Converts a string into a double.
</td>

<td ><stdlib.h>
</td>

<td >Has limitations (see belo
</td>
</tr>
<tr >

<td >long int atol(char* stringBuffer
</td>

<td >Converts a string into a long integer (typically 32-bit)
</td>

<td ><stdlib.h>
</td>

<td > 
</td>
</tr>
</tbody>
</table>


## atof()




The biggest let-down with atof()  is that you cannot distinguish between the text input "0.0" and when there is no valid number to convert. This is because atof()  returns 0.0 if it can't find a valid float number in the input string. For example:



    
    // Result is the same (0.0) in both of these cases).
    double result;
    result = atof("0.0");
    result = atof("blah blah");




There is a better alternative strtod , which allows you to test for this condition, **if your system supports it**.




## strtod()




This stands for (string-to-double). It is a safer way of converting strings to doubles than atof() . The code example below shows how to use strtod()  to convert a string to a double and also how to check that the input string contained a valid number.



    
    double ConvertStringToDouble(char* input)
    {
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




Memory manipulation functions are also useful for string manipulation. Some of the useful functions are shown below.


<table style="width: 800px;" border="0" >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Description**
</td>

<td >**Comments**
</td>
</tr>
<tr >

<td >memset(char* stringBuff, int value, size_t num);l
</td>

<td >Writes a constant value to a set number of elements in memory.
</td>

<td >Used to clear a string at run-time (e.g. memset(buff1, '\0', sizeof(buff1)); ). A common mistake is to put the input variables value and num around the wrong way, **which screws up the systems memory**!
</td>
</tr>
</tbody>
</table>


# Decoding/Encoding Strings




strtok()  is a standard function which is useful for decoding strings. It splits a string up into a subset of strings, where the strings are split at specific delimiters which are passed into the function. It is useful when decoding ASCII-based (aka human readable) communication protocols, such as the command-line interface, or the [NMEA protocol](http://blog.mbedded.ninja/electronics/circuit-design/communication-protocols/nmea-protocol). Read more about it on the [C++ Reference site](http://www.cplusplus.com/reference/cstring/strtok/).




getopt() is a standard function for finding command-line arguments passed into main() as an array of strings. It is included in the [GCC glibc library](http://www.gnu.org/software/libc/). The files are also downloadable below (taken from GCC gLibC v2.17).




[wpfilebase tag=file id=11 /]




# printf (And It's Variants)




printf() can be a very taxing function on the processor, and may disrupt the real-time deadlines of code (especially relevant to embedded programming). It is a good idea to keep printf() function calls away from high-priority interrupts and control loops, and instead use them in background tasks that can be pre-empted (either by interrupts or a higher-priority threads when running a RTOS).




## printf()




printf()  is the most commonly used string output function. It is a variadic funciton (it takes a variable number of arguments, note that this is not the same as function overloading, which is something that C does not support).




On Linux, this will print the string to the calling terminal window. Most embedded systems do not support printf()  as their is no "standard output" (although this can be re-wired to say, a UART). Instead, in embedded applications, printf's variants like sprintf()  are more common.




If you want to print an already-formulated string using printf (with no additional arguments to be inserted), do not use the syntax printf(msg) . Instead, use the format printf(%s, msg) .



    
    char* msg = "Example message";
    
    // This is the incorrect and unsafe way of printing
    // an already formulated string, and the compiler
    // should give you a warning.
    printf(msg);
    
    // The correct way of printing an already-formulated
    // string
    printf(%s, msg);




The printf() function takes format specifiers which tell the function how you want the numbers displayed.




## Conversion Specifiers




Conversion specifiers determine how printf() interprets the input variables and displays their value as a string. Conversion specifiers are added in the input string after the % character (optional format specifiers may be added between the % symbol and the conversion specifier).




Although the basic behaviour is defined in the ANSI standard, the exact implementation of printf() is likely to vary slightly between C libraries.


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >**Specifier**
</td>

<td >**Descripton**
</td>

<td >**Example**
</td>
</tr>
<tr >

<td >%c
</td>

<td >Prints a single ASCII character, given a 8-bit number
</td>

<td >printf("%c", 103);  // Prints "g"
</td>
</tr>
<tr >

<td >%i
</td>

<td >Prints a signed integer (whose exact width is implementation-specific, usually 16 or 32-bit).
</td>

<td >printf("%i", -34); // Prints "-34"
</td>
</tr>
<tr >

<td >%u
</td>

<td >Prints an un-signed integer (whose exact width is implementation-specific, usually 16 or 32-bit).
</td>

<td >printf("%u", 456); // Prints "456"
</td>
</tr>
<tr >

<td >%s
</td>

<td >Prints a null-delimited string of ASCII characters (of arbitrary length).
</td>

<td >printf("%s", "This is a string"); // Prints "This is a string"
</td>
</tr>
<tr >

<td >%x
</td>

<td >Prints a hexidecimal number
</td>

<td >printf("%x", 10); // Prints "a"
</td>
</tr>
<tr >

<td >%X
</td>

<td >Same as %x, except it prints all in upper-case.
</td>

<td >printf("%X", 10); // Prints "A"
</td>
</tr>
<tr >

<td >%f
</td>

<td >Prints a float (or double). All floats are converted to doubles anyway via default argument promotions.
</td>

<td >printf("%f", 2.345); // Prints "2.345"
</td>
</tr>
</tbody>
</table>


If you actually wanted to print the % character rather than use it to specify a conversion, use two of them (printf("%%"); // prints "%").




## Format Specifiers




There are plenty of format specifiers that you can use with printf() which changes the way the text is formatted. Format specifiers go between the % symbol and the conversion specifier, mentioned above. They are optional, but if used, have to be added in the correct order.




I have come across embedded implementations of printf() which do not support string padding (e.g. %5s or %-6s). This includes the version used with the [PSoC 5](http://blog.mbedded.ninja/programming/microcontrollers/psoc).




## Portable size_t Printing




For portability, you can use the z format specifier when you want to print a value of size_t (e.g. the number returned by sizeof()).



    
    // Portable way of printing a size_t number,
    // using the 'z' modifier.
    // (which sizeof() returns)
    printf("Size of int = %zi.\r\n", sizeof(int));




This was introduced in ISO C99. Z (upper-case z) was a GNU extension predating this standard addition and should not be used in new code.




## snprintf()




sprintf  has plenty of special characters you can add to format the output number exactly how you want it.




The length parameter specifies the length of the variable (for example, you can have 8-bit, 16-bit, 32-bit, e.t.c integers). In the Keil C51 compiler, the 'b' or 'B' length specifier is used to tell sprintf that the number is 8-bit. If you don't use this, 8-bit numbers stored in uint8_t  or char data types will not print properly. You do not have to use the b /B  specifier when using GCC.



    
    // Print a float to 2 decimal places
    snprintf(txBuffer, sizeof(txbuffer), "Float to 2dp: %.2f", float1);
    
    // Print a 8-bit number in the Keil C51 compiler, using the length specifier 'b' ('B' can be used also)
    uint8 eightBitNum = 23;
    sprintf(txBuffer, "This is an 8-bit number: %bu", eightBitNum);
