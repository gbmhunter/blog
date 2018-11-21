---
author: gbmhunter
date: 2017-05-31 16:47:12+00:00
draft: false
title: fsck (File System Consistency checK)
type: page
url: /programming/operating-systems/linux/programs/fsck-file-system-consistency-check
---

# Overview




Sometimes you are asked to run fsck manually when a UNIX system boots and presents you with the error:



    
    UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY







# Automatic Yes To Everything




If you are repairing a hard drive with lots of errors, if can become tedious to manually say "yes" to each one. Instead, you can provide fsck with the -y option, which will automatically approve all changes. This is called non-interactive mode:



    
    ~$ fsck -y /dev/sda1



