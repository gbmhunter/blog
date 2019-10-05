---
author: gbmhunter
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-01-06
draft: false
lastmod: 2019-10-04
tags: [ "programming", "operating systems", "Linux", "Programs", "mv", "move", "bash", "shell", "command-line", "file paths", "directories", "verbose" ]
title: "mv (move)"
type: "page"
---

## Overview

The mv (a.k.a. move) program is commonly used on Linux systems to both move and rename files (to copy files, use the `cp` command).

## Be Careful, Overwriting Is The Default!

Those of you who are used to Windows systems will appreciate the fact that you get "do you wish to overwrite?" warnings whenever you try and copy/move/rename a file, but the file already exists at the new location.

However, mv, by default, will not show any warning and will silently overwrite files. To prevent mv from overwriting files, use the `-n` option like so:

```sh    
$ mv -n old_file_path new_file_path
```

Even better, you can also add the verbose flag (`-v`), and mv will tell you what files were moved and which weren't.

```sh    
$ mv -nv old_file_path new_file_path
```

## Excluding Directories Using Bash Extensions

In most bash shells, you can exclude certain directories/files from the move command using `!(exclude_pattern)` syntax. This is really useful to quickly move all files/directories in the current working directory into a new sub-directory, while excluding the new sub-directory from the move:

```sh
$ mkdir new_sub_dir # Create a new sub-directory to move all files/directories in PWD into
$ mv !(new_sub_dir) new_sub_dir # Move all files/directories in PWD into new_sub_dir, excluding new_sub_dir itself (avoiding the obvious recursion problem)
```

Please note that `!(exclude_pattern)` is not a feature of `mv`, but is a `bash` feature. It is called the `extglob` feature and is enabled using the `shopt` built-in. Bash will expand `!(exclude_pattern)` before passing the arguments to `mv`. For example, if you had the files `f1.txt`, `f2.txt` and `f3.txt` in a directory, then `bash` would expand:

```sh
$ mv !(f2.txt) ~/path_to_move_to/
```

to:

```sh
$ mv f1.txt f3.txt ~/path_to_move_to/
```