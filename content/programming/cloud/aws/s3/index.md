---
author: "gbmhunter"
categories: [ "Programming", "Cloud", "AWS" ]
date: 2019-10-01
description: "An introduction to S3, a popular key/value storage service provided by AWS."
draft: false
lastmod: 2019-10-01
tags: [ "programming", "cloud", "Amazon", "AWS", "S3", "keys", "objects", "systems", "Amazon Web Services" ]
title: "S3"
type: "page"
---

## Overview

S3 is a popular key-value storage service provided by Amazon Web Services (AWS). It offers cheap and moderately fast (not as fast as a hard-drive, but faster than deep archive systems) mechanism for the storage and retrieval of arbitrary files.

## S3 Doesn't Have Directories, But It Does

**One major point of confusion when beginning to use S3 is the appearance of directories**. It is important to remember that S3 is purely a key-value type storage system. This means if you want to store an file (e.g. `myfile.txt`) on S3, you provide a key to store it at (e.g. `this_is_the_key`). Later, you can retrieve the object with the same key. That's all there is to it. **The confusion arises because it is common practise to use path-looking keys to store objects**. For example, I could choose to say `myfile.txt` to the key `user/my_usr/myfile.txt`. Further adding to the confusion is that when navigating through a bucket using the S3 web interface, it will detect path-like keys and show the user a directory tree structure.

However, once this is understood, this directory-like structure of the key-value storage (could we call it a key/directory duality?) is very useful for both intuitively grouping objects together and for providing a seamless mapping from a collection of files in a file system to their respective objects in S3 (you can `sync` a whole directory to S3 with the command `aws s3 sync ...`).