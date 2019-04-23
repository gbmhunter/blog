---
author: gbmhunter
date: 2014-01-03
draft: false
title: export
type: page
---

The export command is used to make available variables and associated values for other programs called after the export command. When this happens the variable is called an **environment variable**.

## Create New

For example, to make available to following programs the variable myVar, with a value of 5, you would do the following:

```sh    
# One-liner
$ export MY_VAR=5

## Or another way
MY_VAR=5
export MY_VAR
```

To verify the variable exists, you can then type `echo $MY_VAR`. Note: You cannot put a space before or after the equals sign!

## Append To

You can append to environment variables. This is useful, for example, when adding more directories to the `$PATH` variable. You could append a directory to the `$PATH` variable using the export command in the following manner:

```sh    
$ export PATH=$PATH:/my/new/dir
```

##  Permanent Environment Variables

To make variables permanently available you can put export commands in the `~/.bash_profile` file.

## See Current Variables

To see a list of all currently exported variables and functions, use the command:

```sh    
$ export -p
```

Some standard environment variables include:

```sh
$PATH
$USER
$USERNAME
```