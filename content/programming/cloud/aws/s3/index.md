---
author: "gbmhunter"
categories: [ "Programming", "Cloud", "AWS" ]
date: 2019-10-01
description: "An introduction to S3, a popular key/value storage service provided by AWS."
draft: false
lastmod: 2020-02-28
tags: [ "programming", "cloud", "Amazon", "AWS", "S3", "buckets", "keys", "objects", "systems", "Amazon Web Services", "sync", "timestamps", "directories", "storage", "boto", "boto3", "CLI", "data consistency", "read-after-write", "eventual consistency" ]
title: "S3"
type: "page"
---

## Overview

S3 is a popular key-value storage service provided by Amazon Web Services (AWS). It offers cheap and moderately fast (not as fast as a hard-drive, but faster than deep archive systems) mechanism for the storage and retrieval of arbitrary files.

{{% img src="aws-s3-logo.png" width="300px" caption="The AWS S3 logo." %}}

## S3 Doesn't Have Directories, But It Does?

**One major point of confusion when beginning to use S3 is the appearance of directories**. It is important to remember that S3 is purely a key-value type storage system. This means if you want to store an file (e.g. `myfile.txt`) on S3, you provide a key to store it at (e.g. `this_is_the_key`). Later, you can retrieve the object with the same key. That's all there is to it. **The confusion arises because it is common practise to use path-looking keys to store objects**. For example, I could choose to say `myfile.txt` to the key `user/my_usr/myfile.txt`. Further adding to the confusion is that when navigating through a bucket using the S3 web interface, it will detect path-like keys and show the user a directory tree structure.

However, once this is understood, this directory-like structure of the key-value storage (could we call it a key/directory duality?) is very useful for both intuitively grouping objects together and for providing a seamless mapping from a collection of files in a file system to their respective objects in S3 (you can `sync` a whole directory to S3 with the command `aws s3 sync ...`).

## sync

AWS supports the concept of syncing "directories" between S3 or between your local file system and S3. The syncing functionality can be done through the AWS CLI. Unfortunately as of Feb 2020 it is not yet available through `boto3` (see [this GitHub issue](https://github.com/boto/boto/issues/3343) for the status).

For example, the following command will sync all files and directories under the local path `~/my-dir/` to the prefix `my-dir/` in the bucket `my-bucket`:

```bash
aws s3 sync ~/my-dir/ s3://my-bucket/my-dir/
```

Note that `aws s3 sync` will not re-sync a changed file if it has the exact same filesize as before, even though the timestamps are different. This could happen quite easily if for example you changed a single character in a text file and re-saved it. The `sync` command does not use checksums to verify the content is the same. This default behaviour is not what you would expect from a `sync` command, and deviates from the behaviour of other sync tools such as `rsync`. You can force `sync` to also look at the timestamps by adding the command-line option `--exact-timestamps`. 

{{% warning %}}
Most of the time, you probably want to add the option `--exact-timestamps` so that `aws s3 sync` behaves as you would expect. 
{{% /warning %}}

## Data Consistency

AWS S3 provides _read after write_ consistency for when you put an object under a new key into a bucket for the first time, as long as you haven't queried for that key in the past (if you have, then only _eventual consistency_ is guaranteed).

S3 provides _eventual consistency_ when you overwrite an existing key in a bucket, or when you delete a key from a bucket. This means that if you update a key with a new object and then try and retrieve that object, you are not guaranteed to get the new version of the object.

Buckets have a very similar consistency model to the keys mentioned above. Bear in mind that if you delete a bucket and then immediately list all your buckets, the deleted bucket may still in the list! Buckets which have public access seem to take longer to disappear from listings after they have been deleted, they can take many hours (or even days!) to disappear. Note you can't do anything with the bucket (if you try and copy an object into it an error will be thrown).

See [AWS S3: Introduction - Consistency Model](https://docs.aws.amazon.com/AmazonS3/latest/dev/Introduction.html#ConsistencyModel) for more information on the S3 data consistency model.