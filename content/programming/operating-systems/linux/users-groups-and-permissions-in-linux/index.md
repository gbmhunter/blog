---
author: gbmhunter
date: 2018-07-04
draft: false
tags: [ "programming", "operating systems", "Linux", "users", "groups", "permissions", "chmod", "chown", "useradd", "ownership" ]
title: Users, Groups, And Permissions In Linux
type: page
---

## User Manipulation

To add a user called `bart`:

```sh    
$ sudo useradd bart
```

## Group Manipulation

To add a pre-existing user called bart to the group simpsons:

```sh    
$ groupadd -g simpsons bart
```

## Permissions

File and directory permissions are set in Linux with pe

`chmod` is the default UNIX tool for modifying file and directory permissions.

**Group Permissions**

To allow anyone in the same group to read, write or execute files (only files which are currently executable by a user), as well as allow them to read contents of all sub-directories:

```sh    
$ sudo chmod -R g+rwX my_parent_dir/
```

To change permissions recursively on a group of files, use:

```sh    
$ sudo chmod -R <mode flags> my_directory/
```

Using a capital `X` instead of a lower-case `x` results in the executable bit only being set if the file is a directory or the executable bit is already set for some user. This is useful when applying changes to multiple files (using the recursive option `-R`), as you usually don't want to make things such as text files executable!

## Ownership

You can recursively change the ownership of all files and directories with the `-R` flag:

```sh
chown -R myuser:mygroup .
```

If the user or group contains a space, you must quote it:

```sh
chown -R "my user":"my group" .
```
