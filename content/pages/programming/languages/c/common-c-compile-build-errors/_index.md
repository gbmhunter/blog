---
author: gbmhunter
date: 2013-03-18 08:53:14+00:00
draft: false
title: Common C Compile/Build Errors
type: page
url: /programming/languages/c/common-c-compile-build-errors
---

# Overview





These C compile/build errors and warnings are talked about largely in relation to embedded systems (i.e. microcontrollers).





# "pointer of type void used in arithmetic"





Usually occurs when you are doing memory arithmetic, and can actually be a warning you ignore!




    
    
    void* AppendNewArrayElement(void* arrayStart, uint8 currNumElements, uint8 sizeOfArrayElement)
    {
    	// Create a new option at end of option array
    	arrayStart = realloc(arrayStart , (currNumElements+1)*sizeOfArrayElement);
    	// Set to 0
    	memset(arrayStart + currNumElements*sizeOfArrayElement, '\0', sizeOfArrayElement);
    }





# "elf section '.bss' will not fit in region 'ram'





[singlepic id=1081 w=700 h=240 float=center]





The .bss section contains all 0-initialized global and static variables. This error normally occurs when you have overly large static variables, or you haven't allocated the stack/heap sizes correctly.





# "Suggested parenthesis around assignment used as a truth value"





[singlepic id=775 w=500 h=240 float=center]





This is usually because you've forgotten to add the second '=' in the if statement.




    
    
    // Only one equal sign, if statement will produce unexpected results!
    // value2 will be assigned to value1 and then
    // checked to see if non-zero
    if(value1 = value2)
    {
       // blah blah
    }
    
    // Correct way of comparing two values, with two equal signs
    if(value1 == value2)
    {
       // blah blah
    }
    





# "Subscripted value is neither array nor pointer"





[singlepic id=815 w=500 h=240 float=center]





Normally occurs when you try and index something like an array which isn't. For example...




    
    
    #include 
    
    double value;
    
    // This will produce the error, as sin is a function, not an array
    value = sin[180];
    
    // The proper way of using sin
    value = sin(180);
    





# "#pragma once in main file"





[singlepic id=852 w=500 h=240 float=center]





This occurs when you incorrectly write "#pragma once" in a .c file (even though the error would suggest it, it doesn't have to be main.c). "#pragma once" is a header guard which prevents an .h file from being included twice in a project and causing multiple declaration/definition errors. Hence "#pragma once" should be only place in .h files. It is an alternative to the "#ifndef" header guard style (see [this page](http://blog.mbedded.ninja/programming/languages/c/header-guards) for more info).





# "variable or field declared void"





[singlepic id=853 w=500 h=240 float=center]





This can occur when you declare/define a function in C++ and the compiler doesn't recognise one of the data types used for an input variable. It will precede a "<variable> was not declared in scope" error.




    
    
    // A function declaration with an unrecognised type used in the input.
    // The will cause both a 'variable or field declared void' and 'inputVar was not declared in scope' error
    void function1(unrecognisedType_t inputVar);
    





# "macro names must be identifiers"





If you get the error macro names must be indentifiers it is usually because you have been using both #if()  and #ifdef directives, and accidentely used the combination #ifdef() . This is not allowed! When using #ifdef, do not enclose the proceeding identifier with brackets.




    
    
    // BAD!
    #ifdef(__linux)
       ...
    #endif
    
    // GOOD!
    #ifdef __linux__
       ...
    #endif
    





# "Not In Formal Parameter List"





[singlepic id=1048 w=500 h=240 float=center]





Applies To: Keil C51 Compiler





The "not in formal parameter list" build error is most likely to occur when you have forgotten to add the semi-colon at the end of a function declaration. Without the semi-colon, the compiler continues to read onto the following lines, and usually produces this error. Check the first first function declaration preceding this error for a missing semi-colon.




    
    
    // The following function declaration is missing a semi-colon at the end
    void function1()
    // The "not in formal parameter list" build error will occur on this following line
    void function2();
    





# double free or corruption





Error Type: Run Time





This error normally codes with another keyword at the end, e.g.




    
    
    double free or corruption (!prev)
    





It normally occurs when you accidently free() the same piece of memory twice. I have also got this error due to a incremental-build bug in the Xilinx SDK (xsdk) for it's Zynq FGPA's/microncontroller chips.
