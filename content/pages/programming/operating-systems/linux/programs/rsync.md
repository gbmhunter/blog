---
author: gbmhunter
date: 2013-10-21 22:06:19+00:00
draft: false
title: rsync
type: page
url: /programming/operating-systems/linux/programs/rsync
---

# Overview

rsync is similar to scp , except, well, better in most cases. It keeps a file table of all transferred files, and only transfers those that have been modified (hence the sync bit). It has the following syntax:

```sh   
$ rsync [options] source destination
```

# Options

The most popular options are:

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr >
<td >-r
</td>

<td >Recursive, will sync all files in child directories also.
</td>
</tr>
<tr >

<td >-a
</td>

<td >Archive mode.
</td>
</tr>
<tr >

<td >-z
</td>

<td >Compress data while doing transfer. Some files cannot be compressed, which includes gz zip z rpm deb iso bz2 tbz tgz 7z mp3 mp4 mov avi ogg jpg jpeg.
</td>
</tr>
<tr >

<td >-v
</td>

<td >Verbose. Will prints out more information when process is run. You can add extra v's (e.g. -vv) to make rsync print out even more info.
</td>
</tr>
<tr >

<td >-n
</td>

<td >Do a trial run which doesn't actually make any changes. This is usually used in conjunction with -v to make sure you are doing it correctly before make any modifications.
</td>
</tr>
</tbody>
</table>


Some of the most popular combinations of options are:


<table>
    <thead>
        <tr>
            <th>Command</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr>
<td >rsync -arvz source destination
</td>

<td >Good general purpose rsync use, without propagating deletions.
</td>
</tr>
<tr >

<td >rsync -adrvz source destination
</td>

<td >Good general purpose rsync use with deletion propagation (be careful!)
</td>
</tr>
</tbody>
</table>

rsync is a great tool for allowing you write code on a fully-fledged computer, and then transfer it to a RaspberryPi easily and quickly for running. Normally it only takes a matter to seconds to transfer after you have made modest code changes.

An interesting side-note is that you can replicate the capabilities of the Mac OS time machine with rsync using the following commands (taken from [http://en.wikipedia.org/wiki/Rsync](http://en.wikipedia.org/wiki/Rsync)):

```sh
#date=`date "+%Y-%m-%dT%H:%M:%S"`
date=`date "+%FT%T"`
rsync -aP --link-dest=$HOME/Backups/current /path/to/important_files $HOME/Backups/back-$date
ln -nfs $HOME/Backups/back-$date $HOME/Backups/current
```

Another interesting side-note for those interested is that at the core of the compare algorithm is a MD5 checksum and a rolling checksum. This speeds up the checking, rather than comparing the files bit-by-bit. However, this can lead to errors. The probability of rsync believing two files are in sync, but actually are not, requires both a collision (a collision is when different inputs product the same output) in the MD5 and rolling checksum, which sits around the 2^-160 mark (very unlikely).

# How To Incrementally Copy A Large File From Server To Local Folder

If you want to copy a large file, you may want to do it incrementally because of disconnection issues, or to resume copying at a different time. rsync supports this with the `--append` option.

```sh    
$ rsync username@ip_address:/directory_on_server/file_on_server.big --progress --append
```

`--progress` is useful as it continuously prints the percentage progress of the operation.