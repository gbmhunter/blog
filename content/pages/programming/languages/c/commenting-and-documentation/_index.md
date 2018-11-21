---
author: gbmhunter
date: 2013-04-14 05:30:21+00:00
draft: false
title: Commenting And Documentation
type: page
url: /programming/languages/c/commenting-and-documentation
---

# General Tips





  * Always use \\ style comments where possible. This allows you to use /* style comments for commenting out large blocks of code when debugging. If you want to comment a block of code which has /* comments inside it, you will run into problems! (unfortunately, */ style comments don't nest in c).
  * However, sometimes you still need to comment out blocks of code which have /* comments already inside them (maybe your using someone else's code?). To do this, you can use the preprocessor trick #if 0 (see code below).


    
    // This is a single lined comment, and the preferred way of doing things
    
    /* This is
    a multilined
    comment.
    And should be used sparingly as these don't nest */
    
    // The following example shows how you can comment out code blocks
    // containing "/*" comments using the pre-processor and "#if 0"
    #if 0
    void test1()
    {
       /* Annoying multi-line
       comment in a block
       of code you want to comment */
    }
    #endif // #if 0




# C Supports URL's, Wait What?




Did you know that:



    
    http://www.google.com




 is valid syntax in C? Wait, what? O.K., I was lying, C doesn't support URL's, but the syntax is still valid! What it actually represents is a label (http:), followed by a single-line comment (//www.google.com).




# Commenting Styles




Some people put function descriptions after the function name and parameters, and before the opening curly brace (for example, some windows driver files). I find this method weird and hard to read.



    
    NTSTATUS
    DriverEntry(
        IN PDRIVER_OBJECT  DriverObject,
        IN PUNICODE_STRING RegistryPath
        )
    /*++
    
    Routine Description:
    
        Installable driver initialization entry point.
        This entry point is called directly by the I/O system.
    
    Arguments:
    
        DriverObject - pointer to the driver object
    
        RegistryPath - pointer to a unicode string representing the path,
                       to driver-specific key in the registry.
    
    Return Value:
    
        STATUS_SUCCESS if successful,
        STATUS_UNSUCCESSFUL otherwise.
    
    --*/
    {
        WDF_DRIVER_CONFIG               config;
        NTSTATUS                        status;
    
        rest of function code...




# Doxygen




Doxygen is a powerful documentation generator that can be used with the C language. For more information and code examples with Doxygen, go to the [Doxygen page](http://blog.mbedded.ninja/programming/general/doxygen).
