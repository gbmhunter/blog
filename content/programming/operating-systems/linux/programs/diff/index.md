---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2014-07-10
draft: false
title: diff
type: page
---

## Overview

The command-line Linux program `diff` allows you to check for differences between files and folders.

## Compare Two Folders

The following command will make `diff` compare two folders:

```sh  
$ diff Folder1 Folder2
```  

## Compare Two Files

The syntax is pretty much the same as if you were to compare two folders. The following command will make `diff` compare two files:

```sh   
$ diff file1 file2
```  

## Quietning The Output

The `-q` option tells diff to print less output. When comparing folders, this will stop diff from printing the changed content of a file it recognises in both folders, and instead will just tell you that the file has been changed.

```sh    
diff -q Folder1 Folder2
```
