---
author: gbmhunter
date: 2017-01-06 11:12:05+00:00
draft: false
title: mv (move)
type: page
url: /programming/operating-systems/linux/programs/mv-move
---

## Overview

The mv (a.k.a. move) program is commonly used on Linux systems to both move and rename files (to copy files, use the `cp` command).

## Be Careful, Overwriting Is The Default!

Those of you who are used to Windows systems will appreciate the fact that you get "do you wish to overwrite?" warnings whenever you try and copy/move/rename a file, but the file already exists at the new location.

However, mv, by default, will not show any warning and will silently overwrite files. To prevent mv from overwriting files, use the `-n` option like so:

```sh    
$ mv -n old_file_path new_file_path
```

Even better, you can also add the verbose flag (`-v`), and mv will tell you what files were moved and which weren't.

```sh    
$ mv -nv old_file_path new_file_path
```