---
author: gbmhunter
categories: [ "Programming", "Version Control Systems" ]
date: 2014-02-08
draft: false
lastmod: 2019-05-13
tags: [ "programming", "version control systems", "VCSs", "git", "amend", "fixup", "squash", "history", "commits" ]
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

## Using git commit --fixup

The `--fixup` option to `git commit` allows you to add commits which can be automatically squashed into a commit of your choice when rebasing.

The following command will add an staged changes to a special `fixup` commit.

```sh
$ git commit --fixup a4b5f
```

When using `--fixup`, you do not specify a commit message. **The commit message is created for you**, and will start with `!fixup`, followed by a space and then the message of the commit the fixup points to.

{{% warning %}}
Just like `--amend`, `--fixup` will also **modifies the git history** (once you rebase). You should `fixup` commits on private (local) branches, and never on public branches. Fixing up commits that have been shared with other developers will cause history conflicts which are difficult to resolve.
{{% /warning %}}

`--fixup` behaves slightly different to `--amend`, one of the main differences is that you can rewrite any commit in the current history, not just the last one as you can with `--amend`. `--fixup` is a great tool for keeping your git history clean when making small bug fixes and improvements to already committed features on a development brnach. This is best shown with an example:

```sh
$ git commit -m "My feature 1."
[develop af82c] My feature 1.
...
$ git commit -m "My feature 2."
[develop 339a1] My feature 2.

# Say you now discover a bug in feature 1 and make some changes to fix it
$ git commit --fixup af82c
[develop 6e682] fixup! My feature 1.

# Time to clean-up before submitting merge request. All commits
# flagged as fixup will automatically be set to be squashed into
# the feature commit you specified.
$ git rebase -i --autosquash
```

You can permanentely change your `git` settings so that you don't have to add `--autosquash` every time you do a rebase:

```sh
$ git config --global rebase.autoSquash true
```

## Logging

The default log message size can be quite verbose. To condense each log message to a single line and only show the last 10 log messages:

```sh
$ git log --oneline -10
```