---
author: gbmhunter
date: 2013-10-09 00:55:03+00:00
draft: false
title: Mercurial Extensions
type: page
---

## Overview

Mercurial has plenty of extensions (plugins) to extended it's core functionality (git doesn't, this is one of the benefits of Mercurial!). Some are distributed with Mercurial but not enabled, others have to be downloaded separately. A large list of them is maintained at [https://www.mercurial-scm.org/wiki/UsingExtensions](https://www.mercurial-scm.org/wiki/UsingExtensions).

This page details how to install Mercurial extensions, and covers a few of the extensions I have personally used.

## How To Install Mercurial Extensions

Mercurial supports 3rd-party extensions that add additional functionality to the core repository engine. Mercurial extensions are usually enabled for a user by adding a line to the either the users Mercurial.ini (global) or hgrc (local to a repo) file, under the [extensions] section. Note that extension paths **cannot be delimited with quotation marks!** For example:

```    
[extensions]
# This will not work!
myExtension = "C:\path\in\quotations.py"

## This will work
myExtension = C:\path\in\quotations.py
```    

Mercurial can handle both forward-slash (Linux) and back-slash (Windows) paths quite easily, so you the format appropriate for your system. For more on extensions, see [here](https://www.mercurial-scm.org/wiki/UsingExtensions).

## hglock


* Wiki: [https://www.mercurial-scm.org/wiki/LockExtension](https://www.mercurial-scm.org/wiki/LockExtension)
* Repo: [https://bitbucket.org/jameslheard/hglock/](https://bitbucket.org/jameslheard/hglock/)

hglock is a mercurial extension that adds file "locking" capabilities, just like non-distributed version control systems have. It allows you to lock a file, at which point no-one else working with the same repository can then edit the file, until it has been unlocked again.

Note that file locking goes against the grain of distributed VCS (version control systems) philosophy. But yet it still it useful for **binary, image and video files** in which file merging is difficult or impossible. For it to work, a **central repository** must be identified.

hglock uses a one-per-repo file called .hglocks in the repo root directory for determining for what files locking is mandatory. This is similar to the well-known .hgignore file, except it **only supports glob syntax!**. Unlike the .hgignore file, regex won't work.

hglock prevents you from locking outdated files (forcing you to pull and/or update/merge before you can lock). This is a good thing, otherwise you could get a lock out on a old version of a file, thinking you are safe to modify it without and conflicts further down the track.

When you push changes to locked file, the lock is automatically removed.

I have used this extension for handeling a repository containing Altium libraries (schematic, PCB and component libraries). Since the schematic and PCB libraries are stored in a binary format, this tool is indespensible for making sure no two users edit the same file simultaneously.

## Bugs

As of Jan 2014 I have discovered one bug with this plugin. When using the TortoiseHg UI, and pushing to a remote repo using the --force option, it would give the error "...does not allow pushing new heads..." even though no new heads existed. Removing the --force option would allow pushing as normal.

## Purge

Purge is a useful Mercurial extension for deleting untracked and/or ignored files from your local version of the repository. It is bundled with the base Mercurial install, but is not installed by default. To install it, add the following line underneath [extensions] in your Mercurial configuration file.

```    
[extensions]
purge =
```    

Purge can be run from the command line (both *nix systems and Windows) by typing:

```sh    
$ hg purge [options] [path to folder to purge]
```  

Some of the most popular (and maybe the only?) options are:

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody >
<tr >

<td >--all
</td>

<td >Removes ignored files.
</td>
</tr>
<tr >

<td >--print
</td>

<td >Prints a list of changes, rather than actually doing them. Use this option to test the behaviour.
</td>
</tr>
</tbody>
</table>


If you do not provide a path, purge will operate on the whole repo. If you provide a path, purge will just operate on that directory and any child directories.
