---
author: gbmhunter
date: 2013-06-17 21:34:52+00:00
draft: false
title: Assertions (assert())
type: page
url: /programming/languages/c/assertions-assert
---

# Overview




The basic premise behind an assert(bool_t value) is that the **macro/function checks to make sure that value is true.** The coder adds the checks where the expected result should be true. (i.e. don't use them as an if statement).  If the value is not true (i.e. false), the software/firmware takes specific action.




For a software application, this "specific action" may be printing out the filename and line number the assert() was raised in, and then exiting the application. For a firmware application, this may be printing out the filename and line number the assert() was raised in, and then restarting (it does not make sense to "quit" in a firmware environment).




Assertions refer to the use of both the standard C library assert() macro, and the use of similar user-defined macros.




If you are looking for a full-blown assert() example, check out the compilable/testable assert() code snippet at [http://ideone.com/CSX6wN](http://ideone.com/CSX6wN).




# A Simple assert() Using A Macro




**assert() is usually defined in C using a macro **(rather than a function), due to the ability of automatically keep track of things such as the filename and line number that the assert() was written on.




A basic assert macro could have the following definition:



    
    #define ASSERT(exp) (exp ? : AssertFailed(__FILE__, __LINE__))
    




Note that the ternary operator is used here instead of an if statement.




AssertRaised() is a function you have to write that will handle any raised assert() 's. It would have the following declaration:



    
    void AssertRaised(const char * filename, int lineNumber); 




# A Note On __FILE__ and __LINE__




__FILE__ and __LINE__ are special _Standard Predefined Macros_ as defined by the C language specifications. For more info, see the [File Names And Line Numbers section of the Preprocessor page](http://blog.mbedded.ninja/programming/languages/c/preprocessor#file-names-and-line-numbers).




__FILE__ and __LINE__ can be **removed from the macro in flash constrained embedded systems** (storing the filename strings can take up a decent amount of flash).




Note that use of __FILE__ **may not take up as much flash memory as you think,** as most compilers with any sort of optimisation turned on will collate all string literals which are exactly the same into one (i.e. all the the __FILE__ pointers in the same file will point to the same string literal).




Are there any other useful preprocessor keywords? How about __func__? This gets replaced with a const char * that contains the name of the current function the macro is in.




# Printing The Failed assert() Condition




Even more useful than just having the filename and line number is also printing the expression which caused the failed assert() . Luckily, this is easy to do, using the [preprocessor stringification symbol](http://blog.mbedded.ninja/programming/languages/c/preprocessor#stringification), #.



    
    #define ASSERT(exp) (exp ? : AssertFailed(__FILE__, __LINE__, #exp))




The function which handled the failed assert() would then have the following declaration:



    
    void AssertRaised(const char * filename, int lineNumber, const char * expression);




Note that this would **consume much more flash memory** than __FILE__ alone would, as rarely any of the const char * expression string literals would be the same .




# Preventing Side-Effects




assert() checks **should NOT have any side effects**. That is, they should only do a boolean comparison between two variables/values. You should not embed assignments or function calls inside assert() checks. This is to prevent the logic of your application changing when enabling/disabling assert()'s.



    
    // This is good
    assert(x == 3);
    
    // This is BAD
    // (this makes x = 1)
    assert(x = 1);
    
    // This is BAD
    // (this calls a function)
    assert(myFunc(x));




The assert() macro can be re-written to stop developers from writing assert()'s with side effects. This can be done by **making clever use of the C comma operator** (note that this is not the same as the comma used as a separator between variables in a function call).



    
    #define ASSERT(a)  ((void)(exp), (exp ? : AssertFailed(__FILE__, __LINE__, #exp)))




Is using the GCC compiler, and you write an assert with side effects, you should get the following error:



    
    error: void value not ignored as it ought to be




Note that I was using gcc-5.1 when I was presented with this error.



{{< figure src="/images/2013/06/screenshot-of-compiler-error-disallowing-assert-side-effects.png" width="736px" caption="A screenshot of the C compiler throwing an error when an assignment is attempted within the parameter passed to an assert()."  >}}



# Complete Code Example




I have written a working assert() example at [http://ideone.com/CSX6wN](http://ideone.com/CSX6wN). It employs all of the functionality described above, including filename and line number reporting, expression printing, and syntax which disallows the use of assignments or function calls within the parameter passed to assert().



{{< figure src="/images/2013/06/assert-example-code-on-ide-one.png" width="1060px" caption="Example assert() code on Ideone (http://ideone.com/CSX6wN)."  >}}



# Assert With printf() Style Messages




The below macro allows you to use assert with printf() style messages:



    
    #define LOG_ERROR(M, ...) fprintf(stderr, "[ERROR] (%s:%d) " M "\r\n", __FILE__, __LINE__, ##__VA_ARGS__)
    #define assertf(A, M, ...) if(!(A)) { LOG_ERROR(M, ##__VA_ARGS__); assert(A); }




A working example of the above code can  be found at [https://ideone.com/DD1PJs](https://ideone.com/DD1PJs).




# External Links




[Assert Yourself, by Niall Murphy](http://www.embedded.com/electronics-blogs/other/4023329/Assert-Yourself), is a good read about using the assert() macro.
