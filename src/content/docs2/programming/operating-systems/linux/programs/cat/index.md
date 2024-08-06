---
title: "cat"
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
description: "Creating files, outputing files, appending to files, emptying files and more info on the command-line UNIX program called cat."
tags: [ "cat", "UNIX", "Linux", "concatenate", "program", "command-line" ]
authors: [ "Geoffrey Hunter" ]
date: 2014-07-08
lastUpdated: 2018-12-29
type: "page"
---

## Overview

`cat` (short for concatenate), is a basic terminal-based Linux program for manipulating text-based files. It is commonly used to quickly output the contents of a text file to the screen, so that you can read it without having to open an editor.

Some of the following examples use `.txt` file extensions to indicate they contain textual information, but remember that this is optional, there is no notion of a "file extension" in Linux.

## To Create A File

```sh    
$ cat >filename.txt
```  

Now type the text you want in the file. Press `CTRL-D` to exit and save the file. Warning: This will overwrite pre-existing files.

## Output A File To The Screen

This basic command will print the contents of the text file to the terminal.

```sh    
$ cat filename.txt
```  

## To Append To A File

```sh    
$ cat >>filename.txt
```

Now type the text you want in the file. Press `CTRL-D` to exit and save the file. Warning: This will overwrite pre-existing files.

## Empty A File

This trick works by redirecting the null output to your file, which clears it's contents.

```sh    
$ cat /dev/null > filename.txt
```

Warning: This will delete all the contents of a file, without prompt.

## To Output Line Numbers

Use the `-n` switch.

```sh    
$ cat -n filename.txt
```

## Append/Concatenate Files To Another

You can use redirection (`>`) to append the contents of one file into another.

```sh
$ cat file1 > file 2
```

You can list multiple files all at one to concatenate them into a single output file.

```sh
$ cat file1 file2 file3 > file4
```

