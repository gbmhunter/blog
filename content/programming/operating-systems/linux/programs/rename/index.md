---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2014-04-06
draft: false
title: rename
type: page
---

## To Check Changes Before Actually Renaming

The `-n` option allows you to check changes before actually renaming. This is very useful, and recommended, as there is no undo button once you have done the renaming!

With this option present, rename will print a list of the changes to stdout rather than actually performing the changes.

## Making All Filenames Title Case

The following command makes all filenames title case, e.g. `this is a file.pdf` will become `This Is A File.pdf`.

```sh    
$ rename 's/(^|[\s_-])([a-z])/$1\u$2/g' * -f
```  

The `-f` option is there to force the rename, because sometimes it will not recognise the change (for example, when running Linux on a virtual machine and accessing a shared drive on a Windows host).
