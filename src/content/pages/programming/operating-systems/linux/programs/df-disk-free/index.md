---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-04-13
draft: false
title: df (disk free)
type: page
---

## Overview

The df (_disk free_) program allows you to see how much space has been used up (and how much is still available) on all of the current mounted file systems.

## Usage

The basic way to use df is simply:

```sh    
$ df
```

However, this displays sizes in bytes, which on today's GB+ systems, is not very human readable. To fix this, use:

```sh    
$ df -h
```

This prints out sizes with human-readable prefixes (e.g. kB, MB, GB). The h stands for "Human readable". Note `-H` can also be used, but this will use powers of 1000 rather than 1024 is calculate sizes (this is normally not recommended, as the "correct" way is to use powers of 1024).