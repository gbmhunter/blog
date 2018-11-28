---
author: gbmhunter
date: 2017-04-09 00:25:31+00:00
draft: false
title: tar
type: page
url: /programming/operating-systems/linux/programs/tar
---

# Overview

tar is a program which can be used to package and unpackage files using the .tar format.

# What About .tar.gz Files?

.tar.gz files are files which have been packaged by tar, and then compressed with gzip. Fortunately, tar can both uncompress and unpackage in one step. Usually you would want to use the following command:

```sh
$ tar -xvzf my_file.tar.gz
```

To compress all the files in the current directory into a .tar.gz archive:

```sh
$ tar -cvzf my_archive.tar.gz *
```

The above options are:


<table >
<tbody >
<tr >

<td >Argument
</td>

<td >Description
</td>
</tr>
<tr >

<td >x
</td>

<td >Instructs tar to decompress the archive.
</td>
</tr>
<tr >

<td >v
</td>

<td >Verbose output.
</td>
</tr>
<tr >

<td >z
</td>

<td >Tells tar to decompress the archive using gzip.
</td>
</tr>
<tr >

<td >f
</td>

<td >The file to decompress and unpackage. This must be the last argument in the group, and the file name must follow directly after.
</td>
</tr>
</tbody>
</table>


# Uncompress To Specific Folder




By default, tar will uncompress the files into the current working directory. Sometimes you will want to specify the folder manually. To do this with the GNU version for tar, you can use the -C option.



    
    tar -xvzf my_archive.tar.gz -C destination_folder/




Note that destination_folder has to already exist, tar will not create it for you.




--directory is the long name for -C.




# What About .tar.xz Files?




tar can also decompress and extract .tar.xz files. The -J flag can be used to specifically deal with .xz files:



    
    $ tar -xJf file.tar.xz




Also note that more recent versions of tar can automatically workout the compression format for you! Just use:



    
    $ tar xf file.tar.xz



