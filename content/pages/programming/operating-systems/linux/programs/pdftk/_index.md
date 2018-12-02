---
author: gbmhunter
date: 2014-04-16 06:04:05+00:00
draft: false
title: pdftk
type: page
url: /programming/operating-systems/linux/programs/pdftk
---

# Installing

pdftk can be installed with the following command on Debian-like systems (e.g. Ubuntu):

```sh    
$ sudo apt-get install pdftk
```  

# Reversing Pages

The following example command reverses some of the pages in the pdf in.pdf. It has over 9 pages, and reverses the direction of pages 3-8.

```sh    
$ pdftk in.pdf cat 1-2 8-3 9-end output out.pdf
```