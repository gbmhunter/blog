---
author: gbmhunter
date: 2017-05-31
draft: false
title: fsck (File System Consistency checK)
type: page
---

## Overview

Sometimes you are asked to run `fsck` manually when a UNIX system boots and presents you with the error:

```text
UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY
```

## Automatic Yes To Everything

If you are repairing a hard drive with lots of errors, if can become tedious to manually say "yes" to each one. Instead, you can provide `fsck` with the `-y` option, which will automatically approve all changes. This is called non-interactive mode:

```sh    
~$ fsck -y /dev/sda1
```