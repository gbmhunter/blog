---
author: gbmhunter
date: 2013-06-28 06:03:35+00:00
draft: false
title: Assembly
type: page
url: /programming/languages/assembly
---

# Overview




If you are writing assembly for ARM processors, make sure to check out the [GNU ARM Assembler Quick Reference](http://bel.gsi.de/scripts/gnu-arm-assy-quick-ref.pdf).



{{< figure src="/images/2013/06/assembly-code-example.png" width="481" caption="An example of assembly code from the glibc library (an optimised memcpy() function)." caption-position="bottom" >}}



# Intel vs. AT&T Syntax




**Intel Syntax**




Intel syntax always puts the destination address before the source address.



    
    instr dest, source
    mov eax, [ecx]




**AT&T Syntax**




AT&T syntax always puts the source address before the destination address. It also requires a % infront of every register access, and a $ infront of immediate operands.



    
    instr source, dest
    movl (%ecx), %eax




# NASM




The NASM assembly language is a very popular language that works on the x86 and x86-64 architectures. It has similar syntax to Intel's x86/x86-64 assembly, but it designed to be more "user friendly".




**Compiling NASM Assembly**




You can download the NASM compiler for Ubuntu and other Debian-like systems with:



    
    $ sudo apt install nasm




To compile a NASM .asm file, first convert it to an object file with the nasm program:



    
    $ nasm -f elf test.asm




OR for a 64-bit object file:



    
    $ nasm -f elf64 test.asm




This will produce an object file called myfile.o. NOTE: Not all assembly instructions are supported for both 32-bits and 64-bits.




You then have two options for linking:





	  1. Use the linker program ld
	  2. Use gcc. This automatically links against the C standard library for you.



Using ld:




Using gcc:




For 32-bit object files:



    
    $ gcc -m32 test.o -o test




For 64-bit object files:



    
    $ gcc -m64 test.o -o test




**Hello World (using NASM)**




This Hello, World example will be as bare-bones as possible, and will not even use the printf() function call (instead it will make a Linux system call directly).




First, we need a .section text to tell the compiler that this is our executable code.



    
    .section text




We then need to define an entry point for our program:



    
       global _start
    _start:
       ... more code here ...




Now, printing "Hello, world!" requires the use of a Linux system call to print the text to stdout (specifically, sys_write). We will use the Linux _fastcall_ convention which **allows us to put the input arguments into registers, rather than on the stack**. The system call number is placed in eax, and the arguments in the successive registers ebx, ecx, e.t.c. The function number for sys_write is 4 ([see here](https://syscalls.kernelgrok.com/)). We need to place the file we wish to write to in ebx, a pointer to the message (char *) in ecx, and the number of characters in edx.



    
    section .text
       global _start
    _start:
       mov edx, <msg size>
       mov ecx, <pointer to msg>
       mov ebx, 1
       mov eax, 4
      




Note that I have assigned the registers in reverse order (starting at edx and going to eax). This is not necessary (any order would work), however this practise stems from the sequence required making a system call by pushing to the stack instead, in where this order is important. I just kept the same practise for good readability.




So, now we need to place the message in memory somewhere, and also find out it's size, so we can fill in <pointer to msg> and <msg size>. We can create a data section just for this purpose:



    
    section .text
       global _start
    _start:
       mov edx, <msg size>
       mov ecx, <pointer to msg>
       mov ebx, 1  ; File descriptor 1 is stdout
       mov eax, 4  ; System call 4 is sys_write
    section .data
       msg db 'Hello, world!' ; Creates a string of characters. Note: No null terminator.
       len equ $ - msg        ; Calculate the length of the string (note, this does not store anything in memory)




db is a NASM instruction which stands for _define bytes_. It defines a sequence of bytes in memory. equ just tells the compiler to calculate the length of the message and save it to len (called a symbol), which can then be used in the code (it does not save the value to memory, it is similar to #define in C).




Lets use the new msg variable in our code:



    
    section .text
       global _start
    _start:
       mov edx, len
       mov ecx, msg
       mov ebx, 1  ; File descriptor 1 is stdout
       mov eax, 4  ; System call 4 is sys_write
    section .data
       msg db 'Hello, world!' ; Creates a string of characters. Note: No null terminator.
       len equ $ - msg        ; Calculate the length of the string (note, this does not store anything in memory)




Great, everything is setup for a system call! But how do we perform a system call? In Linux, a system call is made by triggering the 0x80 interrupt, so we will do just that:



    
    section .text
       global _start
    _start:
       mov edx, len
       mov ecx, msg
       mov ebx, 1  ; File descriptor 1 is stdout
       mov eax, 4  ; System call 4 is sys_write
       int 0x80
    section .data
       msg db 'Hello, world!' ; Creates a string of characters. Note: No null terminator.
       len equ $ - msg        ; Calculate the length of the string (note, this does not store anything in memory)




Running the above code should print "Hello, world!" to stdout. But your program might then just seg fault. This is because we have not exited cleanly. To do this, we can make another sys call, this time to sys_exit (0x01).



    
    section .text
       global _start
    _start:
       mov edx, len ; len was calculated in .data section
       mov ecx, msg ; Pointer to array of chars in .data section
       mov ebx, 1   ; File descriptor 1 is stdout
       mov eax, 4   ; System call 4 is sys_write
       int 0x80     ; sys call
       mov ebx, 0   ; Return code of o.k.
       mov eax, 1   ; sys_exit function number
       int 0x80     ; sys call
    section .data
       msg db 'Hello, world!' ; Creates a string of characters. Note: No null terminator.
       len equ $ - msg        ; Calculate the length of the string (note, this does not store anything in memory)




All done! Run this code online at [https://www.tutorialspoint.com/tpcg.php?p=qjMuBp](https://www.tutorialspoint.com/tpcg.php?p=qjMuBp).




**Hello World With printf()**




Because we want to know use a standard library function, we are going to take a slightly different approach.




Create a test.asm file with the following contents:



    
    extern printf   ; Make sure to link with gcc so that standard library is automatically linked against
    
    SECTION .data
    msg: db "Hello, world!",0xA,0x0     ; 0xA = new line, 0x0 = end of string
    
    SECTION .text                       ; Code section
    
    global main
    main:               ; The program label for the entry point
        push ebp        ; Save stack base pointer
        mov ebp, esp    ; Move stack pointer onto stack base pointer
        push msg        ; Last thing on stack is printf formatting string
        call printf
    
        mov esp, ebp    ; Unwind stack
        pop ebp         ; Replace base pointer
    
        mov eax,0       ; Return error code of 0 (no error)
        ret             ; Return from main()




Now compile and run with the following commands:



    
    $ nasm -f elf test.asm
    $ gcc test.o -m32 -o test
    $ ./test
    Hello, world!






