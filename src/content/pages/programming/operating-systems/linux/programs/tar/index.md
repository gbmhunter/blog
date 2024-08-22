---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2017-04-09
draft: false
title: tar
type: page
---

`tar` is a UNIX utility program which can be used to package and unpackage files using the `.tar` format. It is commonly used along with `gzip` to produce compressed archives (usually with the `.tar.gz` extension).

## What About .tar.gz Files?

.tar.gz files are files which have been packaged by tar, and then compressed with `gzip`. Fortunately, tar can both decompress and unpackage in one step.

To decompress a `.tar.gz` file:

```sh
$ tar -xvzf my_file.tar.gz
```

Note that `f` must be the last option in the group as the filename must come after it.

To compress all the files in the current directory into a `.tar.gz` archive:

```sh
$ tar -cvzf my_archive.tar.gz *
```

The above options are:

<table>
    <thead>
        <tr>
            <th>Argument</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr >
            <td>x</td>
            <td>Instructs <code>tar</code> to decompress the archive.</td>
        </tr>
        <tr>
            <td>v</td>
            <td>Verbose output. This is not strictly needed, but is nice to see what files are being compressed/decompressed.</td>
        </tr>
        <tr>
            <td>z</td>
            <td>Tells <code>tar</code> to decompress the archive using <code>gzip</code>. This is not strictly needed, as tar can detect the compression from the <code>.gz</code> extension.</td>
        </tr>
        <tr>
            <td>f</td>
            <td>The file to decompress and unpackage. This must be the last argument in the group, and the file name must follow directly after.</td>
        </tr>
    </tbody>
</table>

## What If I'm Lazy?

Due to `tar`'s long history, it happens to support a variety of different option styles. You can infact provide _old style_ options that do not contain a hyphen `-` (if you want to read more about the history of the option styles, see [here](https://www.gnu.org/software/tar/manual/html_section/tar_21.html)). Aside from no hyphen, they have the same meaning as the above _short style_ options.

To decompress an archive in **as little typing as possible**:

```sh
$ tar xf my_archive.tar.gz
```

Note that lack of a hyphen in-front of `xf`. We also drop of `v` and `z` because they are not strictly needed.

To compress an archive in **as little typing as possible**:

```sh
$ tar cf my_archive.tar.gz *
```

## Decompress To A Specific Folder

By default, `tar` will decompress the files into the current working directory. Sometimes you will want to specify the folder manually. To do this with the GNU version for tar, you can use the `-C` option.

```sh    
$ tar -xvzf my_archive.tar.gz -C destination_folder/
```

Note that `destination_folder` has to already exist, tar will not create it for you.

`--directory` is the long name for `-C`.

## What About .tar.xz Files?

`tar` can also decompress and extract `.tar.xz` files. The `-J` flag can be used to specifically deal with `.xz` files:

```sh   
$ tar -xJf file.tar.xz
```

Also note that more recent versions of tar can automatically workout the compression format for you! Just use:

```sh    
$ tar xf file.tar.xz
```