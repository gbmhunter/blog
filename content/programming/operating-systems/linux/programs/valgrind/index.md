---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-06-12
draft: false
lastmod: 2017-06-12
tags: [ "programming", "operating systems", "Linux", "programs", "Valgrind", "memory management", "C", "C++", "kcachegrind" ]
title: "valgrind"
type: "page"
---

## Overview

Valgrind is a tool that can be used to detect memory management and threading bugs.

{{% figure src="valgrind-logo.jpg" width="316px" caption="The Valgrind logo."  %}}

## Installation

1. Download the latest Valgrind source code from http://valgrind.org/downloads/. For example, this downloads version 3.12.0:  

    ```sh   
    ~$ wget http://valgrind.org/downloads/valgrind-3.12.0.tar.bz2
    ```

2. Unpack the tarball with tar:   

    ```SH
    ~$ tar -jxvf valgrind-3.12.0.tar.bz2
    ```

3. cd into the root directory of the unpacked source code.  

    ```sh    
    ~$ cd valgrind-3.12.0
    ```

4. Run configure with  

    ```sh    
    ~/valgrind-3.12.0$ /configure
    ```

5. Run make with:  

    ```sh    
    ~/valgrind-3.12.0$ make
    ```

6. Install valgrind onto your system with:  

    ```sh    
    ~/valgrind-3.12.0$ sudo make install
    ```

7. Done! You should now be able to run valgrind by typing:  

    ```sh
    ~/valgrind
    ```

    from any directory in your shell.


## Profiling With Valgrind

The most simple way to run a program with Valgrind is to call `valgrind` and pass in the executable at the only parameter:

```sh    
~$ valgrind ./profiling_test
```

This will run Memcheck, a memory error detector. Expect your program to run 4-10x slower!

To run callgrind, use the following command:

```sh    
~$ valgrind --tool=callgrind ./profiling_test
```

The order of the optional parameters to valgrind is important! Make sure `--tool=callgrind` comes BEFORE the path to your executable.

{{% warning %}}
Again, callgrind will make your program run 4-10x slower than usual. If this slow down is unacceptable for whatever reason, but you still want to profile your application, you may want to check out GCC's `gprof` which in my experience, causes much less of a performance drop.
{{% /warning %}}

This will generate a profile data file called `callgrind.out.<pid>` in the same folder as the exectuable. To display the results of the profiling:

```sh
~$ callgrind_annotate callgrind.out.<pid>
```

`--dump-instr=yes` allows you to get profile information at the instruction level.

However, this text can be hard to analyze! Thankfully, there is a visual tool called kcachegrind which can create visual graphs from the callgrind output (yes, kCACHEgrind can display the results of CALLgrind). kcachegrind can be installed on Ubuntu with:

```sh
$ sudo apt install kcachegrind
```

Be warned, kcachegrind could require around 350MB of space! I recommend you install kcachegrind on your development machine rather than embedded Linux.

kcachegrind can then be started by calling kcachegrind in the same directory as the cachegrind output data file:

```sh
$ kcachegrind
```

You should then be presented with wonderful profiling data as shown below!

{{% figure src="callgrind-profiling-output-displayed-in-kcachegrind.png" width="1310px" caption="The callgrind profiling output data being displayed in kcachegrind for a simple test application (with Fibonacci calculation and looping)." %}}
