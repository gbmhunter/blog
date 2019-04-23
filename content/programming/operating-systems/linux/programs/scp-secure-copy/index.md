---
author: gbmhunter
date: 2017-04-26
draft: false
title: scp (secure copy)
type: page
---

## Overview

`scp` (secure copy) is a UNIX command-line program.

## Copy File From Local To Remote

```sh    
$ scp ~/myfile.txt username@187.23.43.3:~/
```

## Copy Directory From Local To Remote

```sh    
$ scp -r ~/myfolder username@ip_address:~/folder_on_remote
```

```sh    
$ scp -r ~/myfolder username@ip_address:~/folder_on_remote
```