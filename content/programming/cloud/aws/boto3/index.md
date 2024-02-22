---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Cloud", "AWS" ]
date: 2019-01-14
description: "A quick tutorial on Boto 3, Amazon's Python-based API for AWS."
draft: false
lastmod: 2019-07-19
tags: [ "programming", "cloud", "Amazon", "AWS", "boto", "boto3", "Boto 3", "cloud", "Python", "API", "S3", "libraries", "copy", "bucket", "key" ]
title: "boto3"
type: "page"
---

## Overview

Boto is a **Python based API to Amazon's AWS resources**. Boto 3 is the most current release (as of Jan 2019). All of the examples on this page use Boto 3.

## Installation

You can install Boto (Boto 3 in this example) using `pip`:

```sh
$ pip install boto3
```

## The Basics

Before you can access any AWS resources, you need to setup credentials for Boto to use. Boto can use the credentials that are by default saved in `~/.aws/credentials` (when setup using the AWS CLI). It will use the `default` profile by, well, default.

Then you import Boto into your Python file:

```python
import boto3
```

## Using S3 With Boto

Assuming you have setup the credentials correctly, you can print out a list of all buckets with:

```python
for bucket in s3.buckets.all():
    print(bucket.name)
```

{{% aside type="note" %}}
This will print out the names of all buckets in the region specified by the credentials/config file.
{{% /aside %}}

## Copying Between Two Buckets

You can use `boto3` to copy an object from one S3 location to another using the following code example:

```python
import boto3

client = boto3.client('s3')

src = {
    'Bucket': 'my-src-bucket',
    'Key': 'my-file.txt',
}

# This will copy s3://my-src-bucket/my-file.txt to s3://my-dest-bucket/copy-of-my-file.txt
client.copy(src, 'my-dest-bucket', 'copy-of-my-file.txt')
```