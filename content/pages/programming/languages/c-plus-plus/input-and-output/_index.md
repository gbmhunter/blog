---
author: gbmhunter
date: 2014-01-05 00:52:08+00:00
draft: false
title: Input And Output
type: page
url: /programming/languages/c-plus-plus/input-and-output
---

# Overview

Input/output (I/O) is how a program interacts with the computers file system. The C/C++ standard librarys provide methods for reading and writing to files.

Some parts of I/O are standard, others are platform specific.

# cin And cout

std::cin and std::cout are both of the type . They are declared in <iostream>.

File descriptors for std::cin and std::cout can be found in the header file <unistd.h>. They are defined as STDIN_FILENO and STDOUT_FILENO respectively.

# Input

Most input in a C++ program to grabbed via std::cin.

After calling cin.get(), I have found it nessecary to call cin.ignore() to remove the still-present new-line character. If this is not done, cin.get() will keep triggering.

# Flushing

The function fflush() can be used on an output buffer to write an unwritten data in it's output buffer to the file. The stream remains open after this function call. It returns 0 if the operation was a success.

# select()

select() is used to wait on multiple files for input/output at the same time (and returns whenever one of them has data). select() is a BSD UNIX function, and therefore not portable to other systems. Ubuntu GCC has this function.

# Non-Blocking IO

By default, reading from stdin and writing to stdout are blocking operations, that is, they don't return until their job is complete. For input, this is until a character or line had received.

If you desire, you can use non-blocking I/O. I do recommend against it though, and instead suggest you use threads to solve the concurrancy problem (assuming that is why you are wanting non-blocking I/O in the first place). This is because threads and blocking I/O are less computationally intensive, you can run into performance issues when using non-blocking I/O.

There are two common ways of performing non-blocking I/O:  1. Use the ncurses library. The disadvanatage with this is that it also effects the terminal display, and things like printf() stop working correctly.  2. Directly change the low-level file I/O settings. This can be a little confusing at first, but this method does not upset the terminal like ncurses does.

## Using ncurses

## Directly Modifying The Low-Level Settings

This involves using the terminos library. So make sure you #include <terminos.h>.

## Detecting Keyboard Presses

The following code can be used to detect keyboard presses, without waiting for a carriage return character.
    
    	int KeyboardPress()
    	{
    	    struct timeval tv;
    	    fd_set fds;
    	    tv.tv_sec = 0;
    	    tv.tv_usec = 0;
    	    FD_ZERO(&fds);
    	    FD_SET(STDIN_FILENO, &fds); //STDIN_FILENO is 0
    	    select(STDIN_FILENO+1, &fds, NULL, NULL, &tv);
    	    return FD_ISSET(STDIN_FILENO, &fds);
    	}
    
