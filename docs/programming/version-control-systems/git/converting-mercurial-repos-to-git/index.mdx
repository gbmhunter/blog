---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Version Control Systems" ]
date: 2013-05-20
draft: false
tags: [ "programming", "version control systems", "VCS", "git", "Mercurial", "conversion" ]
title: Converting Mercurial Repos To Git
type: page
---

I have tried many different ways of converting Mercurial (Hg) repositories to Git repositories. Some of them didn't work, some of them worked, and some of them, well, worked better.

Here is my favourite method, assuming you are using Linux (I was running Ubuntu). If you are not running Linux, I seriously recommend running it on a virtual machine just because it is easier to manipulate repositories that way.

Firstly, download the `hggit` plugin for Mercurial. Don't get this confused with the `githg` plugin (which has similar, but different, functionality).

```sh   
$ sudo aptitude install mercurial-git
```

Now, you have to add a few lines to your global Mercurial config file (`~/.hgrc`) so that Mercurial will load the `hggit` plugin next time you use it.

```text
[extensions]
hggit =
```

Now, navigate to the root directory of your Mercurial repo that you wish to convert, and run the following command, which adds a `master` branch to the repo, so that it is Git-compatible.

```sh    
$ hg bookmark -r default master
```

Now, all you have to do is push to your empty Git repository, using the standard Mercurial push command! The hggit plugin automatically converts it for you as part of the push command. For example, if you were pushing to a newly created repository on [GitHub](https://github.com/),

```sh    
$ hg push git+ssh://git@github.com:username/projectname.git
```

You don't have push to GitHub, you can push to any Git repo, including those on [BitBucket](https://bitbucket.org), or one you have created on you computer (using the command $ git init in an empty directory).

Note that you must have set up SSH keys on GitHub for this to work correctly. If you haven't, [go here and find out how](https://help.github.com/articles/generating-ssh-keys).
