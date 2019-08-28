---
author: "gbmhunter"
categories: [ "Programming", "Version Control Systems" ]
date: 2014-02-08
draft: false
lastmod: 2019-08-26
tags: [ "programming", "version control systems", "VCS", "git", "amend", "fixup", "squash", "history", "commits", "vim", "merge-base", "diff", "bisect" ]
title: "Git"
type: "page"
---

## Pulling In Temporary Changes To Your Branch

If you have some small improvements on branch `A` that make debugging/testing easier that are not yet reviewed/pushed to master, and you are working on branch `B`, you can bring these useful changes into `B` without polluting the branch with:

```sh
$ git merge --no-commit --squash A
$ git reset HEAD
```

## Amending To The Last Commit

Using `--amend` is a useful way to add more changes to the last commit. When using `--amend`, git will add staged changes to the last commit, rather than creating a new one. It will also let you modify the commit message (unless you pass the `--no-edit` flag).

```sh
$ git commit --amend
```

If you don't want to modify the commit message, pass the `--no-edit` flag:

```sh
$ git commit --amend --no-edit
```

{{% warning %}}
Amending a commit modifies the git history. You should amend commits on private (local) branches, and never on public branches. Amending commits that have been shared with other developers will cause history conflicts which are difficult to resolve.
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

`--fixup` behaves slightly different to `--amend`, one of the main differences is that you can rewrite any commit in the current history, not just the last one as you can with `--amend`. `--fixup` is a great tool for keeping your git history clean when making small bug fixes and improvements to already committed features on a development branch. This is best shown with an example:

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
$ git rebase -i --autosquash 8f82c^
```

In the `rebase` command above, `8f82c^` was used to say "I want to rebase of the commit BEFORE `8f82c`. Note all these hashes are shortened versions of the full hash, which will as long as there are no hash collisions (with 5 characters, it's unlikely there will be for a small number of commits).

You can permanently change your `git` settings so that you don't have to add `--autosquash` every time you do a rebase:

```sh
$ git config --global rebase.autoSquash true
```

## Logging

The default log message size can be quite verbose. To condense each log message to a single line and only show the last 10 log messages:

```sh
$ git log --oneline -10
```

## git reflog

`git reflog`, although sounding much like `git log`, behaves very differently. The **`reflog` is actually a very special branch that records the position of `HEAD` (i.e. auto-commits every time `HEAD` changes) for the last 30 days (by default)**. It is a local branch that is not shared with remotes, so cloning will not preserve a `reflog`.

{{% note %}}
Think of `git reflog` as the undo history of your repo.
{{% /note %}}

The purpose of `git reflog` is to provide a fail-safe incase you do a `git` operation that would otherwise wipe your data. `git reflog` allows you to:

- Recover from commits made on a detached `HEAD`
- Fix a non-bare `push`

If I run `git reflog` on this blog's repository, I see something similar to:

```sh
$ git reflog
dd86ea25 (HEAD -> master, origin/master, origin/HEAD) HEAD@{0}: commit: Updates to the Linux user permissions and Git pages.
d2193a14 HEAD@{1}: pull: Fast-forward
830dbd09 HEAD@{2}: commit: Converted some images into page resources.
2543c79d HEAD@{3}: pull: Fast-forward
bd560630 HEAD@{4}: commit: Converting images into page resources.
65ea09ac HEAD@{5}: commit: Converted images into page resources.
```

## Set vim As The Default Editor For Git

Run the following command to set `vim` as the default text editor for `git`:

```sh
$ git config --global core.editor "vim"
```

Now `vim` should load whenever git wants to present you with an editor, e.g. when calling  `git commit` without the `-m`.

## git bisect

`git bisect` is a useful tool to hunt down the exact commit which caused a regression in a test. It can do a manual or automatic binary search through all the commits from a known good to known bad commit, finding the first commit in where the test/build went from passing to failing.

You can start a bisection with:

```sh
$ git bisect start BAD_COMMIT GOOD_COMMIT
```

Where `BAD_COMMIT` is the hash of a commit which is known to be bad (fails the tests), and `GOOD_COMMIT` is the hash of a commit which is known to be good (passes the tests). The next step depends on whether you want to do it somewhat manually by providing user input at each iteration, or completely automatically.

### Automatic git bisect

`git bisect` can be completely automated by providing a command to `git bisect run`. 

```
$ git bisect run <command>
```

You can exit the git `bisect` state with `git bisect reset`:

```sh
$ git bisect reset
```

You can view the current status of the bisection at any time with the command:

```sh
$ git bisect log
```

You can automate the entire process by provided `git bisect` with a script to run on every iteration. You have the freedom to do anything you want in this script (e.g. run specific tests) as long as you return `0` if this commit is o.k., or a `1` if the commit is bad (fails.)

```sh
$ git bisect start BAD_COMMIT GOOD_COMMIT
$ git bisect run ./my_script.py
```

Suppose you want to add some custom changes to every run. You can `cherry-pick` some changes before running the test command:

```sh
$ git cherry-pick my-changes
$ python test_program.py
```

DO NOT leave the repo status in a state other than what git bisect had configured it in.

Bisecting, a merge base must be tested.

To give you an indication on the number of commits involved in the bisection, you can manually print out a tidy list of all the commits between `A` and `B` with:

```sh
$ git log --oneline SHA_A ^SHA_B
```

## Force With Lease

"Force pushing" with git is common when you are working on a branch and using `git commit --amend` and `git rebase` to keep your commit history clean and rebase of master. However, `git push -f` can have disatorous consequences if someone else has pushed changes to the branch that you don't have in your local copy.

To mitigate this, you can use the `--force-with-lease` option:

```sh
$ git push --force-with-lease
```

This will only force push as long as there are no new changes on the branch since last time you pulled or fetched from the remote. This will prevent you from accidentally wiping someone's pushed changes on the branch. However, there is one major caveat, **`git push --force-with-lease` will not protect you from overwriting changes if you fetch from the origin and do not integrate the changes into your version of the branch.** This is because git checks your local `ref` for the remote branch and only lets you force push if it is the same as the remote `ref`. If you run `git fetch` (instead of `git pull`), this will update your local `ref` without incorporating the changes into your version of the branch.

`--force-with-lease` is a finger-full to type. To make things easier, you can create an alias like so:

```sh
$ git config --global alias.pushf "push --force-with-lease"
```

To use, now just type `git pushf` at the command-line.

## Get A Diff Of All The Changes On Your Branch

Once you have worked on your branch for a while, you may find that you want to get a `diff` of all the changes you have made. You may think that the following would work:

```bash
$ git diff my-branch master
```

The problem with the above command is that if other changes have made their way onto `master` since you branched of it, these will also be displayed in the diff along with the changes you have made on your branch. What you really want to do is display the diff between the `HEAD` of your branch and `master` at the point you branch of it. This is called the `merge-base`. You can find the `merge-base` commit hash with:

```bash
$ git merge-base master
```

However, git has special syntax which allows you to perform a comparison with the `merge-base` in a much simpler way using the triple dot `...`:

```bash
$ git diff master...my-branch
```

If you are currently on your branch, this can be simplified even further to:

```bash
$ git diff master...
```