---
author: "gbmhunter"
date: 2019-01-14
draft: false
title: "AWS Command-Line Interface"
type: "page"
---

## S3

### Listing Files

To list buckets:

```sh
$ aws s3 ls
```

### Copying Files

```sh
$ aws s3 cp <source> <destination>
```

```sh
# Copy local file to S3
$ aws s3 cp my_file.txt s3://<my_bucket>/<my_prefix>

# Copy file from S3 to local
$ aws s3 cp s3://<my_bucket>/<my_prefix> my_file.txt
```

### Syncing Files

Syncing can copy a group of files which all share a similar prefix (or part of a prefix), so you can treat the prefixes almost like directories in this case.

```sh
$ aws s3 sync <source> <destination>
```

```sh
# Sync all objects with the prefix "my_prefix/" to the current directory 
$ aws s3 sync s3://my_bucket/my_prefix/ ./
```