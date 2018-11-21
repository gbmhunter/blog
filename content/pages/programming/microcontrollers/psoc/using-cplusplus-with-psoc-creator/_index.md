---
author: gbmhunter
date: 2013-04-03 04:17:58+00:00
draft: false
title: Using C++ With PSoC Creator
type: page
url: /programming/microcontrollers/psoc/using-cplusplus-with-psoc-creator
---

# Overview

With a few hacks, you can compile C++ with the [PSoC Creator IDE](http://www.cypress.com/?id=2494) and run C++ code on PSoC microcontrollers!

For more information about C++, check out the pages under Programming->Languages->C++.

# Using "-x c++"

To some degree PSoC Creator disregards the code file extensions, and passes all files to GCC, so that calling the file main.cpp will not force it to compile as C++. This is why you need to enable the command-line parameter -x c++ to force GCC to use the C++ compiler.

But you'll notice that if you right-click a file called main.cpp, the 'Build Settings' option has gone! To get this back, from the same menu, select properties. **Then change the "File Type" to C_FILE.** Now the "Build Settings" option will be availiable for main.cpp. Select this, and navigate to Compiler->Command Line. In the "Custom Flags" box, enter the flag -x c++.

[singlepic id=854 w=800 h=700 float=center template=caption]

Also, when you open up .hpp/.cpp files in PSoC Creator, they will not have syntax highlighting, which is rather annoying. Because of this and the C_FILE issue, I use the .h/.c file extension for C++ files, since the compiler doesn't care anyway. The only difficulty with this is that it makes it hard to easily see what a C++ and what are C code files.

Note that you **add -x c++ to the build settings of each individual C++ file**, not the overall build settings (which are accessed via right clicking on the project in the Workspace explorer). If I add the compiler flags to the project build settings, I get compiler errors when the C++ compiler tries to compile C code. In a pure C++ project, this may be O.K. If someone has done this, please let me know.

# Main Has To Return An Int

If you start a new PSoC project, and add -x c++  to the global build setting parameters, you will get the compiler error .\main.c:14: error '::main' must return 'int' . This has got to be the easiest fix, just obey the compiler and modify void main()  to int main() in main.c, as shown in the following code.
    
    #include <device.h>
    
    // The following line was modified from void main() so
    // that it would compile as C++
    int main()
    {
        /* Place your initialization/startup code here (e.g. MyInst_Start()) */
    
        /* CyGlobalIntEnable; */ /* Uncomment this line to enable global interrupts. */
        for(;;)
        {
            /* Place your application code here. */
        }
    }
    
    /* [] END OF FILE */
    

# Wrapping External C Code

Wrap extern C{< C code goes here>} around all C header includes or global C functions (including device.h), that don't have inbuilt protection. This is to provide C linkage. You don't have to do this for standard C libraries, they all have this protection built into them.

The following code shows an example.
    
    #ifdef __cplusplus
    extern "C" {
    #endif
    
    	// PSoC include, this has to be wrapped
    	#include <device.h>
    
    #ifdef __cplusplus
    }
    #endif
    
    // System includes, these have in-built protection,
    // and therefore don't have to be wrapped
    #include <stdio.h>		// snprintf()
    #include <stdlib.h>		// realloc(), malloc(), free()
    #include <cctype>			// isalnum() 
    #include <getopt.h>		// getopt()	
    

# Defining New And Delete

The operators new and delete are not defined when compiling C++ with the ARM compiler. Before you can dynamically create objects with new and delete, you need to define them, as shown in the following code.
    
    void* operator new(size_t size) 
    { 
    	return malloc(size); 
    } 
    
    void operator delete(void* ptr) 
    { 
    	free(ptr); 
    }
    

If your dealing with dynamically-allocated arrays, you'll also want to declare these:
    
    void * operator new[](size_t size) 
    { 
        return malloc(size); 
    } 
    
    void operator delete[](void * ptr) 
    { 
        free(ptr); 
    }
    

# Preventing Exceptions

You'll notice that if you are trying to use your own versions of new and delete, you will get a error from the linker saying undefined reference to __gxx_personality_v0 .

[singlepic id=1099 w=600 h=100 float=center template=caption]

and/or the reported error from PSoC Creator saying undefined reference to __cxa_end_cleanup.

[singlepic id=1098 w=600 h=100 float=center template=caption]

To prevent this, you have the to include the build flag -fno-exceptions  to **every .cpp file that produces this error**. To add the build flag to a particular file, right click the file in the Workspace Explorer and click "Build Settings". Then click "Compiler", then "Command Line", and enter "-fno-excpetions" to the "Custom Flags" field.

[singlepic id=1100 w=800 h=700 float=center template=caption]

Incase you didn't wan't to globally disable exceptoins, you can disable exceptions for the new operator on a case-by-case basis by using the nothrow keyword. For example:
    
    // Using nothrow to prevent an exception being thrown if the memory allocation of 2000 bytes fails
    char* p = new (std::nothrow) char [2000];
    

When using the nothrow keyword, new will return NULL if the memory allocation failed.

# Virtual Functions

If you get the linker error, undefined reference to "__cxa_pure_virtual", it's probably because you are trying to use virtual functions (it's related to the vtable). Use the compiler flag -fno-rtti  to suppress this error.

An alternative is to provide the missing function, as shown below:
    
    // Declaration
    extern "C" void __cxa_pure_virtual(void); 
    
    // Definition
    void __cxa_pure_virtual(void) {}; 
    

Becuase it's only the linker that looks for this function, you can normally get by with only providing the declaration and omitting the definition, and the definition can be placed in any C file. Perhaps you want to replace this empty function with some error reporting/debug code to detect if you either attempt to call a derived class whose virtual function has not been defined.

# Guard Acquire And Guard Release Errors

If you get the error undefined reference to '__cxa_guard_aquire'  and/or undefined reference to '__cxa_guard_release', it's because C++ is looking for a few functions which implement thread safety for static variables. You usually get this error while initialising static variables/classes which are inside functions (statics that are global to the file will not cause this error).

To prevent this error, add the compile flag -fno-threadsafe-statics  to the build options for that C++ file. Note that you must make sure that the static is only used in one thread (or provide your own locks to make it thread-safe)!

To provide your own locks, you need to complete function definitions and declarations as shown below:
    
    __extension__ typedef int __guard __attribute__((mode (__DI__))); 
    
    // Definitions
    extern "C" int __cxa_guard_acquire(__guard *); 
    extern "C" void __cxa_guard_release (__guard *); 
    extern "C" void __cxa_guard_abort (__guard *); 
    
    // Declarations
    int __cxa_guard_acquire(__guard *g) {return !*(char *)(g);}; 
    void __cxa_guard_release (__guard *g) {*(char *)g = 1;}; 
    void __cxa_guard_abort (__guard *) {}; 
    

Becuase it's only the linker that looks for these functions, you can normally get by with only providing the declarations and omitting the definitions, and they can be placed in any C file. Note that these functions only serve to stop the linker from complaining, and don't actually offer any thread-safe static support. This will have to be implemented yourself! (or only use an object from one thread).

# Being Careful About What C++ Library Features You Use

The standard C++ library contains many powerful utilities, however, most of these come at the expense of using plenty of code/RAM space, as well as potentially using exceptions (I have not got exceptions to work correctly on a PSoC device).

For example, including <iostream> can cause your memory to instantly overflow. I assume this is probably because of advanced features such a locale support. Upon removing the include, the memory usage didn't shrink back to normal until I did a clean build.

Because of this, I almost use no standard C++ library features for embedded firmware. Instead, I have written a number of firmware modules which emulate the most useful standard C++ library features (such as strings, vectors, e.t.c) but are suitable for running on microcontrollers. You can download the modules from the [MToolkit repository on GitHub](https://github.com/mbedded-ninja/MToolkit).

# Build Warnings That Are O.K.

You can safely ignore the "warning: IO function 'xxx' used" messages that pop up while compiling (xxx tends to be _close, _fstat, _isatty, _kill, _lseek, _read, and _write). I don't know exactly what these do, but the programs seem to work fine even though they are used.

[singlepic id=1120 w=700 h=500 float=center template=caption]

# Debugging

C++ code can be debugged using the MiniProg3 and the in-built debugging facilities in the PSoC Creator IDE, **as long as code optimisation is turned off**. Optimisation is turned off in the build settings for the project, as shown in the image below.

[singlepic id=1107 w=600 h=600 float=center template=caption]

# Interrupts

A useful feature about interrupts on the PSoC is that you can create one schematically, and then pass in a callback function for the interrupt using the auto-generated API Interrupt_StartEx(&CallbackFunction); . However, this poses a problem if you are creating a class, and want the interrupt to call one of the classes functions. C++ will not allow you to take the address of the member function (as a single parameter, although you can have method callbacks if you store both the object and a method reference, see the project [slotmachine-cpp](https://github.com/gbmhunter/slotmachine-cpp)). One way to get around this is to declare your class interrupt callback functions as static  as shown in the following code.
    
    // Assumes ISR component is added on schematic called
    // IsrCpAdc
    
    // Class with static ISR callback member function
    class VoltageMeas
    {
    	public:
    	   // Function prototype of ISR callback function AdcDone
    	   static CY_ISR_PROTO(AdcDone);
    }
    
    // ISR callback function definition
    // Notice you can still wrap function
    // with CY_ISR macro (the recommended and 
    // portable way of declaring ISR functions)
    CY_ISR(VoltageMeas::AdcDone)
    {
       // Do interrupt stuff...
    }
    
    main()
    {
       VoltageMeas voltMeas;
    
       // Since AdcDone() is static, this next line
       // is allowed.
       IsrCpAdc_StartEx(&voltMeas.AdcDone);
    }
    

Note that if you start creating multiple objects of classes with these static interrupt handler functions inside, bad things will happen. But at that point you have to stop and ask why you are creating multiple objects which both use the same resource.

# Compiling/Linking With arm-none-eabi-g++.exe

I have also experimented with building with the C++ compiler/linker directly (as opposed to the -c c++ method. Why would we want to do this? There are differences between building with the GCC compiler and -x c++ compared to building directly with arm-none-eabi-g++.exe. I believe most of the differences (if not all) are because in the first case, the C-linker is used, while in the latter case, the C++-linker is used. Without using the C++ linker, we can't use virtual methods or exceptions in our code (note: all PSoC code with exceptions compiles fine with G++, I havn't got it to actually work without crashing a PSoC microcontroller yet).

This is not easy, as unfortunately, PSoC creator is hard coded to call arm-none-eabi-gcc.exe, no matter what GCC/ARM toolchain you point it too. However, I have found that you can get around this by renaming arm-none-eabi-g++.exe to arm-none-eabi-gcc.exe.

These files are located in C:\Program Files (x86)\Cypress\PSoC Creator\3.0\PSoC Creator\import\gnu_cs\arm\4.7.3\bin (or similar) if you are on a modern Windows machine and using the default toolchain. Before you rename arm-none-eabi-g++.exe, rename the pre-existing arm-none-eabi-gcc.exe so that you won't overwrite it.

Building with arm-none-eabi-g++.exe seems to get rid of the thread-safe static function definitions missing errors, exception fuction missing errors, and allows you to use virtual functions. This highlights the differences between building with the GCC compiler and -x c++ compared to building directly with arm-none-eabi-g++.exe.

# Questions I Still Don't Have An Answer Too...

Can we use exceptions with the PSoC microcontroller? Yes, I know they can be resource intensive, but none-the-less it would be interesting to know if it were possible. If you have had any luck with exceptions, please leave a comment below!

# External Resources

There are some instructions on using C++ with PSoC Creator [here](http://www.egr.msu.edu/classes/ece480/capstone/fall11/group01/doc-6-notes-from-matt.pdf). However, this method shows you how to edit custom machine-generated xml, which I don't think you should unless absolutely needed.
