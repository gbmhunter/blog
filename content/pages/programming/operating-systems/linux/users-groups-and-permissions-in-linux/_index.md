---
author: gbmhunter
date: 2018-07-04 20:23:00+00:00
draft: false
title: Users, Groups, And Permissions In Linux
type: page
url: /programming/operating-systems/linux/users-groups-and-permissions-in-linux
---

# User Manipulation

To add a user called bart:

```sh    
$ sudo useradd bart
```

# Group Manipulation

To add a pre-existing user called bart to the group simpsons:

```sh    
$ groupadd -g simpsons bart
```

# Permissions

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

Using a capital X instead of a lower-case x results in the executable bit only being set if the file is a directory or the executable bit is already set for some user. This is useful when applying changes to multiple files (using the recursive option -R), as you usually don't want to make things such as text files executable!
