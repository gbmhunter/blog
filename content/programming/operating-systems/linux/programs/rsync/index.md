---
author: gbmhunter
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2013-10-21
description: "A tutorial on the popular file copying command-line tool rsync, including option explanations, code examples, common use cases and more."
draft: false
lastmod: 2019-05-15
tags: [ "programming", "operating systems", "Linux", "programs", "rsync", "sync", "scp", "files", "backup", "tutorial" ]
title: "rsync"
type: page
---

## Overview

`rsync` is a file copying utility for Linux which is similar to `scp` (secure copy), but with more functionality. It can be used to **copy/sync files locally or between computers connected on a network**. Unlike `scp`, it can **compare the source and destination and only copy over the differences**, reducing the amount of data transferred and the transfer time. It even supports the resuming of partially transferred files. For this reason it is very popular for backup purposes and other situations where either large files or a large amount of files need to be transferred.

`rsync` can copy/sync locally or across a network.

It has the following basic syntax:

```sh   
$ rsync [options] source destination
```

## Options

The most popular options are (sorted alphabetically by short option):

### -a (Archive Mode)

Short Option: `-a`
Long Option: n/a

Archive mode. This makes rsync also sync user and group settings for files and directories. Archive mode can be both extremely useful and extremely unhelpful. Archive mode will not work correctly if the source and destination systems do not have the same users and groups.

### -n (Dry Run)

Short Option: `-n`
Long Option: `--dry-run`

Do a trial run which doesn't actually make any changes. This is usually used in conjunction with -v to make sure you are doing it correctly before make any modifications.

### --progress (Progress)

Prints the progress to `stdout`. This is very useful for large transfers!

### -r (Recursive)

Recursive, will sync all files in child directories also.

### -t (Preserve Modification Time)

Preserves the modification times.

### -u (Update)

Short Option: `-u`
Long Option: `--update`

### -v (Verbose)

Short Option: `-v`
Long Option: `--verbose`

Verbose. Will prints out more information when process is run. You can add extra v's (e.g. `-vv`) to make rsync print out even more info.

### -z (Compress)

Short Option: `-z`
Long Option: n/a

Compress data while doing transfer. Some files cannot be compressed, which includes <code>gz zip z rpm deb iso bz2 tbz tgz 7z mp3 mp4 mov avi ogg jpg jpeg</code>. WARNING: When using rsync to copy locally, compressing can SLOW DOWN the transfer as the time cost of compressing/decompressing outweighs the slightly faster transfer time.

## Popular Use Cases


Good general purpose rsync use, without propagating deletions:

```
rsync -arvz source destination
```

Good general purpose rsync use with deletion propagation (be careful!):

```
rsync -adrvz source destination
```


`rsync` is a great tool for allowing you write code on a fully-fledged computer, and then transfer it to a RaspberryPi easily and quickly for running. Normally it only takes a matter to seconds to transfer after you have made modest code changes.

An interesting side-note is that you can replicate the capabilities of the Mac OS time machine with rsync using the following commands (taken from [http://en.wikipedia.org/wiki/Rsync](http://en.wikipedia.org/wiki/Rsync)):

```sh
#date=`date "+%Y-%m-%dT%H:%M:%S"`
date=`date "+%FT%T"`
rsync -aP --link-dest=$HOME/Backups/current /path/to/important_files $HOME/Backups/back-$date
ln -nfs $HOME/Backups/back-$date $HOME/Backups/current
```

Another interesting side-note for those interested is that at the core of the compare algorithm is a MD5 checksum and a rolling checksum. This speeds up the checking, rather than comparing the files bit-by-bit. However, this can lead to errors. The probability of rsync believing two files are in sync, but actually are not, requires both a collision (a collision is when different inputs product the same output) in the MD5 and rolling checksum, which sits around the 2^-160 mark (very unlikely).

## How To Incrementally Copy A Large File From Server To Local Folder

If you want to copy a large file, you may want to do it incrementally because of disconnection issues, or to resume copying at a different time. rsync supports this with the `--append` option.

```sh    
$ rsync username@ip_address:/directory_on_server/file_on_server.big --progress --append
```

`--progress` is useful as it continuously prints the percentage progress of the operation.

## Including And Excluding Files

`rsync` supports a glob-like syntax for matching against files/directories you wish to include/exclude.

### Excluding Files

You can use the `--exclude-from` flag to pass in a file containing a list of files/directories to exclude.

`*` matches any partial substring of a **single directory**. `**` matches **any** substring of the path.

If you want to match against a `.git` directory at the root level of your directory tree:

```sh
$ rsync --exclude=".git"
```

If you want to match against `__cache__` directories that could be at any level in your directory tree:

```sh
$ rsync --exclude="**/__cache__"
```

`***` can be used with `--include` so that when matching against directories, all sub-directories and files below it will also be included.

An alternative to using `rsync`'s include/exclude rules is to combine `rsync` with the popular file-finding utility `find`.

### Including Files

You can choose to only include specific files by first matching them with `--include`, and then excluding everything with `--exclude='*'`:

For example, to copy all `*.png` files from `~/source/` to `~/destination/`:

```sh
$ rsync -r --include="*.png" --exclude='8' ~/source/ ~/destination/
```

## Combining rsync With find

```sh
find source_dir -iname '*.jpg' -print0 |  rsync -0 -v --files-from=- . destination_dir/
```
