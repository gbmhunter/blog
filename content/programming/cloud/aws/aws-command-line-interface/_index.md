---
author: "gbmhunter"
categories: [ "Programming", "Cloud", "AWS" ]
date: 2019-01-14
draft: false
tags: [ "AWS", "CLI", "command-line interface", "boto3", "S3", "sync", "bucket", "file" ]
title: "AWS Command-Line Interface"
type: "page"
---

<h2>S3</h2>

<h3>Listing Files</h3>

<p>To list buckets:</p>

{{< highlight bash >}}
$ aws s3 ls
{{< /highlight >}}

<h3>Copying Files</h3>

```bash
$ aws s3 cp <source> <destination>
```

{{< highlight bash >}}
# Copy local file to S3
$ aws s3 cp my_file.txt s3://&lt;my_bucket&gt;/&lt;my_prefix&gt;

# Copy file from S3 to local
$ aws s3 cp s3://&lt;my_bucket&gt;/&lt;my_prefix&gt; my_file.txt
{{< /highlight >}}

### Syncing Files

Syncing can copy a group of files which all share a similar prefix (or part of a prefix), so you can treat the prefixes almost like directories in this case.

```bash
$ aws s3 sync <source> <destination>
```

```bash
# Sync all objects with the prefix "my_prefix/" to the current directory 
$ aws s3 sync s3://my_bucket/my_prefix/ ./
```