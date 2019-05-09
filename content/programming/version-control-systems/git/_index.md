---
author: gbmhunter
categories: [ "Programming", "Version Control Systems" ]
date: 2014-02-08
draft: false
lastmod: 2019-05-08
tags: [ "programming", "version control systems", "VCSs", "git" ]
title: Git
type: page
---

## Pulling In Temporary Changes To Your Branch

If you have some small improvements on branch `A` that make debugging/testing easier that are not yet reviewed/pushed to master, and you are working on branch `B`, you can bring these useful changes into `B` without polluting the branch with:

```sh
$ git merge --no-commit --squash A
$ git reset HEAD
```

## Ammending To The Last Commit

Using `--amend` is a useful way to add more changes to the last commit. When using `--amend`, git will add staged changes to the last commit, rather than creating a new one. It will also let you modify the commit message (unless you pass the `--no-edit` flag).

```sh
$ git commit --amend
```

If you don't want to modify the commit message, pass the `--no-edit` flag:

```sh
$ git commit --amend --no-edit
```

{{% warning %}}
Ammending a commit modifies the git history. You should ammend commits on private (local) branches, and never on public branches. Ammending commits that have been shared with other developers will cause history conflicts which are difficult to resolve.
{{% /warning %}}

If you are pushing a branch with an amended commit, you may have to use the `-f` (force) flag if the remote already has a copy of the commit you modified.

```sh
$ git push -f
```

When force pushing, make sure you are pushing to the right branch, as this command can overwrite/delete history!
