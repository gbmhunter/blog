---
author: "gbmhunter"
date: 2019-01-14
description: "A quick tutorial on Boto 3, Amazon's Python-based API for AWS."
draft: false
lastmod: 2019-01-14
tags: [ "Amazon", "AWS", "boto", "boto3", "Boto 3", "cloud", "Python", "API
", "S3", "libraries" ]
title: "boto"
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

{{% note %}}
This will print out the names of all buckets in the region specified by the credentials/config file.
{{% /note %}}
