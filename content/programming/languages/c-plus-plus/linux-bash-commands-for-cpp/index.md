---
authors: [ "Geoffrey Hunter" ]
date: 2013-05-28
draft: false
title: Linux Bash Commands For C++
type: page
---

The following is a Linux cheat-sheet for compiling C++ code. Tested on Ubuntu v12.04.
    
```sh
# Install GNU compiler and other essential programs onto Linux platform
sudo apt-get install build-essential

## Creates c file called main.cpp in current directory and opens gedit to begin editing it
# (and frees terminal)
gedit main.cpp &

## Compiles C++ program main.cpp with standard flags and creates executable called main.o
g++ -Wall main.cpp -o main.o

## Run a compiled executable called main in the current directory
# Note that './' is mandatory, otherwise bash will think you have typed a command
./main.o

## Change file permissions on executable called main so that it will run (if experiencing 'Permission denied' errors)
chmod +x main.o

## Compiles C program main.cpp and creates executable called main.o with debugging symbols
gcc -Wall main.cpp -o main.o -g

## Starts debugging session on compile program called main.
# Make sure -g flag was used when compiling
gdb main.o

# GDB commands (omit the (gdb) prefix, this will be present in the terminal already)
(gdb) break 16   # Set breakpoint at line 16 (when running gdb)
(gdb) run        # Run program (when in gdb)
(gdb) n          # Move to next line
(gdb) c          # Continue to next breakpoint
(gdb) s          # Step to next line (unlike n, will jump into functions)
(gdb) print x    # Print the variable x
```