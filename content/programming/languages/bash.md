---
author: gbmhunter
date: 2013-05-12 23:47:37+00:00
draft: false
title: Bash
type: page
url: /programming/languages/bash
---

# Overview

Bash, apart from being a UNIX shell, is also a programming language in it's own right. It is commonly referred to as a _scripting language_ because the script is not compiled, but rather interpreted at runtime.

# Shebang

The recommended shebang to use at the top of a bash script is:

```sh
#!/usr/bin/env bash

# Make sure ^^^ is the first line in your bash script!!!
```

The above variant gives the **greatest portability**, as **different UNIX systems put the bash program at different locations** on the system (e.g. OpenBSD and FreeBSD both do not have bash at /bin/bash). The above shebang is an instruction to run the first bash that is found on the PATH.

A less optimal bash shebang is:

```sh    
#!/bin/bash
```

This is not as portable as the bash location is hard-coded into the shebang.

Finally, it is not recommended to use the shebang:

```sh    
#! /bin/sh
```

if you want to run bash, as `/bin/sh` is usually a symlink to the operating systems default shell, which may or may not be bash (it could also be dash).

# Returning From Scripts

The return statement can be used to return from a function within a script. return has nothing to do with the exit code.

The exit code of the last command run in a script is used as the exit code that is returned to the parent program.

You can also use the command exit <number> at any time to return from the script.

```sh    
exit 0 # Return indicating success
exit 1 # Return indicating generic failure
```

# ANSI Escape Codes

Bash supports various ANSI escape codes. This includes the commonly used codes to colour text printed to the terminal.

# Getting The Current Script Directory

You can read the current script directory as a string into a variable using the following code:

```sh    
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
```

# Command-line Argument Parsing

Command-line argument parsing in bash is notoriously tricky.

Thankfully, some open-source third party libraries come to the rescue. One of the most powerful command-line argument parsing libraries for shell scripts is [shflags](https://github.com/kward/shflags), a port of the Google gflags library for the UNIX shell.

The simple Hello, World example (taken from their website) is shown below. If you create a file called hello_world.sh with the following contents:

```sh    
#!/bin/sh

# source shflags
. /path/to/shflags

# define a 'name' command-line string flag
DEFINE_string 'name' 'world' 'name to say hello to' 'n'

# parse the command-line
FLAGS "$@" || exit $?
eval set -- "${FLAGS_ARGV}"

# say Hello!
echo "Hello, ${FLAGS_name}!"
```

You could then call this as so:

```sh    
$ ./hello_world.sh
Hello, world!

$ ./hello_world.sh -n Eugene
Hello, Eugene!

$ ./hello_world.sh -h
USAGE: ./hello_world.sh [flags] args
flags:
    -h  show this help
    -n  name to say hello to
```

As shown above, it also supports automatic help! Although the shebang in the above example is #!/bin/sh, this can be changed to #!/usr/bin/env bash without any issues. Please note: If using bash, make sure that set -e is not active when shflags is sourced, otherwise your script will crash when sourcing, with no helpful error message displayed.

# Refreshing The Current Working Directory After It Was Deleted And Recreated

If the directory you are currently in during a bash session gets deleted and recreated, you may notice that commands like ls don't work. That is because the directory you were in no longer exists, the new directory is a different directory (different inode) but shares the same name.

To quickly get back to a valid state of the working directory, type:

```sh
cd `pwd`
```

The works by re-entering a directory with the same path as the old one you are currently in.

# Command Substitution

You can use `` ` `` (backticks) or `$()` for command substitution. For example:

```sh
A=`ls .`
```

The above command will store the output of the command `ls .` (which will be a list of the contents of the current directory) into the variable `A`. It will not print the output of `ls` to the console (as it usually would). Now if we went:

```sh
echo $A
# <contents of dir will be printed here>
```

It is recommended that you use the `$()` syntax rather than `` ` ``, as `$()` is standardized by POSIX and should work for most shells.