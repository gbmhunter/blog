---
author: "gbmhunter"
categories: [ "Programming", "Build Systems And Package Managers", "CMake" ]
date: 2016-12-19
draft: false
title: "Finding Packages"
type: "page"
---

## Overview

You can instruct cmake to find external packages/software with the `find_package()` command.

This `find_package()` function attempts to solve the problem with resolving the path to external libraries and software that are already installed on your system.

CMake comes with a number of pre-made modules for finding popular software packages. All of the pre-made modules can be listed with the following command-line command:

```sh
$ cmake --help-module-list
```

It looks in all directories specified by `${CMAKE_MODULE_PATH}`.
