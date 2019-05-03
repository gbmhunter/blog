---
author: gbmhunter
categories: [ "Programming", "Web Design" ]
date: 2014-09-05
draft: false
tags: [ "programming", "web design" ]
title: "Folder And File Permissions"
type: page
---

## Overview

Folder and file permissions are an important aspect of web design. They need to be set carefully to allow the server and users the correct privileges so they can use the site correctly, however they need to be strict enough so that there are no security vulnerabilities.

## Bulk Change Of Permissions Using SSH

You can change the permissions of a folder and all sub-folders by using the following command:
    
```sh
$ find ./MyDirectory -type d -exec chmod -v 0755 '{}' \;
```

You can do a similar thing, but this time with files in the current folder and all sub-folders by changing the `-type d` to `-type f` as in the following command:

```sh    
$ find ./MyDirectory -type f -exec chmod -v 0755 '{}' \;
```

You can do a test run to make sure it will do the right thing by inserting the command `echo` between `-exec` and `chmod`, as shown in the following command:

```sh    
$ find ./MyDirectory -type d -exec echo chmod -v 0755 '{}' \;
```