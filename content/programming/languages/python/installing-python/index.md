---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-09-16
description: "How to install Python on Windows, MacOS and Linux."
draft: false
lastmod: 2019-09-16
tags: [ "Python", "programming", "programming languages", "software", "installing" ]
title: "Installing Python"
type: "page"
---

## Overview


## CentOS

### ModuleNotFoundError: No module named '_ctypes'

This is likely due to `libffi-dev` (Debian-like) or `libffi-devel` (RedHat-like) missing from your systems. Install with:

### RedHat-Like

```bash
$ sudo yum install libffi-devel
```

and then try building Python again.