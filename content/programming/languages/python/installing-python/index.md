---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-09-16
description: "How to install Python on Windows, MacOS and Linux."
draft: false
lastmod: 2020-07-03
tags: [ "Python", "programming", "programming languages", "software", "installing", "Windows", "Linux", "PATH", "pip" ]
title: "Installing Python"
type: "page"
---

## Overview

Python can be installed onto operating systems in a variety of different ways.

## Windows

The easiest way is to visit [https://www.python.org/downloads/](https://www.python.org/downloads/) and download the web-based installer which will downloaded the needed components at install time.

You may have to add the `python.exe` install location to your system `PATH` manually. Python will typically be installed to:

```text
C:\Users\<username>\AppData\Local\Programs\Python\Python<version>\
```

when installed for a single user on Windows 10. You will also want to add the `Scripts\` folder so that you can call `pip` from the command-line, so also add the following to your `PATH`:

```text
C:\Users\<username>\AppData\Local\Programs\Python\Python<version>\Scripts\
```

The [Anaconda distribution](https://www.anaconda.com/) is also contains the Python interpreter. 

## CentOS

### ModuleNotFoundError: No module named '_ctypes'

This is likely due to `libffi-dev` (Debian-like) or `libffi-devel` (RedHat-like) missing from your systems. Install with (on RedHat-like systems):

```bash
$ sudo yum install libffi-devel
```

and then try building Python again.