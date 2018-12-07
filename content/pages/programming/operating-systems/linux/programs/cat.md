---
author: gbmhunter
date: 2014-07-08 01:03:43+00:00
draft: false
title: cat
type: page
url: /programming/operating-systems/linux/programs/cat
---

# Overview

`cat` (short for concatenate), is a basic terminal-based Linux program for manipulating text-based files.

All of the following examples use .txt file extensions, but remember that this is optional, there is no notion of a "file extension" in Linux.

# To Create A File

```sh    
$ cat >filename.txt
```  

Now type the text you want in the file. Press CTRL-D to exit and save the file. Warning: This will overwrite pre-existing files.

# Output A File To The Screen

This basic command will print the contents of the text file to the terminal.

```sh    
$ cat filename.txt
```  

# To Append To A File

```sh    
cat >>filename.txt
```    

Now type the text you want in the file. Press CTRL-D to exit and save the file. Warning: This will overwrite pre-existing files.

# Empty A File

This trick works by redirecting the null output to your file, which clears it's contents.

```sh    
$ cat /dev/null > filename.txt
    
Warning: This will delete all the contents of a file, without prompt.

# To Output Line Numbers

Use the `-n` switch.

```sh    
cat -n filename.txt
```    
