---
author: gbmhunter
date: 2014-09-05 23:33:51+00:00
draft: false
title: Folder And File Permissions
type: page
url: /programming/website-design/folder-and-file-permissions
---

# Overview

Folder and file permissions are an important aspect of web design. They need to be set carefully to allow the server and users the correct privileges so they can use the site correctly, however they need to be strict enough so that there are no security vulnerabilities.

# Bulk Change Of Permissions Using SSH

You can change the permerssions of a folder and all sub-folders by using the following command:
    
```sh
$ find ./MyDirectory -type d -exec chmod -v 0755 '{}' \;
```

You can do a similar thing, but this time with files in the current folder and all sub-folders by changing the -type d to -type f as in the following command:

```sh    
$ find ./MyDirectory -type f -exec chmod -v 0755 '{}' \;
```

You can do a test run to make sure it will do the right thing by inserting the command echo between -exec and chmod, as shown in the following command:

```sh    
$ find ./MyDirectory -type d -exec echo chmod -v 0755 '{}' \;
```