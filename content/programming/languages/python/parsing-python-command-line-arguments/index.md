---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-01-17
description: "A tutorial on parsing command-line arguments in Python."
draft: false
lastmod: 2019-01-17
tags: [ "programming", "programming languages", "Python", "code", "software", "argparse", "argument parser", "command-line", "CLI", "sub-commands" ]
title: "Parsing Command-Line Arguments In Python"
type: "page"
---

## Overview

This tutorial uses the built-in Pyton module `argparse`.

## Sub-Commands

Complex command-line programs can be simplified with the concept of `sub-commands`. Sub-commands are named commands as the first argument passed into a program, where each sub-command has it's own unique set of required and optional arguments.

A well-known program with sub-commands is `git`. The `git` command-line program has various sub-commands such as:

* `git clone`
* `git add`
* `git commit`

Each one of these sub-commands has it's own required and optional arguments.

If you find yourself starting to add options that are only applicable when certain other arguments are present, then it might be time to look into sub-commands.

`argparse` has sub-command support through the use of `add_subparsers()`. The following working example shows a Python program which has two sub-commands, `add` and `print`.

{{% note %}}
Passing in `dest='command'` to `add_subparsers()` allows us to query the sub-command invoked through `args.command`.
{{% note %}}

```python
#!/usr/bin/env python3
import argparse

def main():
    parser = argparse.ArgumentParser(description='Example argument parser with sub-commands.')

    # Setting dest='command' means we can later check args.command to see what
    # subcommand was invoked
    subparsers = parser.add_subparsers(dest='command', help='Sub-commands.')

    parser_subcmd_foo = subparsers.add_parser('add', help='Add two numbers together.')
    parser_subcmd_foo.add_argument('num1', type=int, help='First number to add.')
    parser_subcmd_foo.add_argument('num2', type=int, help='Second number to add.')

    parser_subcmd_bar = subparsers.add_parser('print', help='Print a message.')
    parser_subcmd_bar.add_argument('message', help='Message to print.')

    args = parser.parse_args()

    if args.command == 'add':
        print(f'{args.num1 + args.num2}')
    elif args.command == 'print':
        print(args.message)

if __name__ == '__main__':
    main()
```

The following code shows how this Python file can be called with command-line arguments from a shell/terminal:

```sh
$ my_program.py add 1 2
3

$ my_program.py print hello
hello
```

`argparse` also provides nice help for these sub-commands:

```sh
$ ./my_program.py -h
usage: my_program.py [-h] {add,print} ...

Example argument parser with sub-commands.

positional arguments:
  {add,print}  Sub-commands.
    add        Add two numbers together.
    print      Print a message.

optional arguments:
  -h, --help   show this help message and exit
```