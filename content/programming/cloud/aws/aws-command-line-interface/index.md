---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Cloud", "AWS" ]
date: 2019-01-14
draft: false
lastmod: 2019-11-21
tags: [ "AWS", "CLI", "command-line interface", "boto3", "S3", "sync", "bucket", "file" ]
title: "AWS Command-Line Interface"
type: "page"
---

## Installation

```bash
$ curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
$ unzip awscli-bundle.zip
$ sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```

## S3

### Creating A Bucket

```bash
$ aws s3 mb s3://<bucket_name> --region <region>
```

### Listing Files

To list buckets:

```bash
$ aws s3 ls
```

### Copying Files

```bash
$ aws s3 cp <source> <destination>
```

```bash
# Copy local file to S3
$ aws s3 cp my_file.txt s3://my_bucket/my_prefix

# Copy file from S3 to local
$ aws s3 cp s3://my_bucket/my_prefix my_file.txt
```

### Syncing Files

Syncing can copy a group of files which all share a similar prefix (or part of a prefix), so you can treat the prefixes almost like directories in this case.

```bash
$ aws s3 sync <source> <destination>
```

```bash
# Sync all objects with the prefix "my_prefix/" to the current directory 
$ aws s3 sync s3://my_bucket/my_prefix/ ./
```

### Speeding Up Copy And Sync Commands

You can speed up copy and sync transfers (especially when small files are involved) by running the following commands:

```text
$ aws configure set default.s3.max_concurrent_requests 100
$ aws configure set default.s3.max_queue_size 10000
```

This modifies the `default` profile. It will add the below to the `.aws/config` file:

```text
[default]
s3 =
    max_concurrent_requests = 100
    max_queue_size = 10000
```