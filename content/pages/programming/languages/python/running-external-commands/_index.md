---
author: gbmhunter
date: 2017-05-24 17:07:54+00:00
draft: false
title: Running External Commands
type: page
url: /programming/languages/python/running-external-commands
---

# Overview

Python gives you the ability to run/call external commands from within python scripts. For example, you may wish to call a Linux shell program from within your python code.

# An Example

The below example provides a function which can run a sub-process from within Python. It prints output from the sub-process line-by-line to stdout (which is a great feature for seeing the status of the shell program, instead of being dumped with the entire output once the sub-process is finished). The python function returns when the sub-process finishes, returning the sub-processes exit code (normally you would check if it is non-zero, to see if an error occurred).

```py    
import subprocess
import shlex


def run_command(command):
    """
    Runs the provided shell command as a sub-process within the current operating system. Prints output from this
    sub-process line-by-line to stdout until the process finishes, at which point this function returns the "return code"
    of the finished sub-process.
    
    :param command:     The shell command you want to run, as a single string (do NOT provide
                        an array of arguments, run_command() will split it for you).
    :return:            The return code of the command, once the process has finished.
    """
    print(command)
    process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
    while True:
        output = process.stdout.readline().decode('utf-8')
        if output == '' and process.poll() is not None:
            break
        if output:
            print(output.strip() + '\r')
    rc = process.poll()
    return rc
```

The above code should also preserve text colouring (ANSI escape codes). It has been designed to work with Python 3.

shlex is used to split up the string into an array of command-line argument strings, so that the user doesn't have to do this themselves.
