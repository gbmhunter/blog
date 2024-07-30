---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-04-20
draft: false
last_update:
  date: 2019-09-16
  author: Geoffrey Hunter
tags: [ "programming", "operating systems", "Linux", "programs", "command-line", "du", "disk usage", "mount", "file system", "directory" ]
title: "du (disk usage)"
type: "page"
---

## Overview

`du` (disk usage) is a UNIX-based command-line program that is used for displaying estimated file space usage. It can recursively iterate through directories, listing the total space used by that directory and it's contents. Note that the common `ls` command cannot do this, and will only display the space used by the directory and not it's contents (typically around 4kB for a directory).

## Typical Usage

To produce a human-readable summary of the sizes of files/directories in the current working directory, use:

```sh   
$ du -sh *
```

This may take some time, as the command has to traverse the directory structure and count up all the file sizes.

## Excluding Other File Systems

You might want to run `du` to find out what directories/files are taking up the most space on a specific hard drive (or more correctly, a specific file system). When doing so, you want to exclude all mount points that belong to a different file system. You can use the `-x` option to ignore all files/directories that are on a different file system to the one which the first directory/file belonged to.

For example, to find out what files and directories are consuming the most space on your root-level device, use the following command:

```sh
$ du -shx /*
```