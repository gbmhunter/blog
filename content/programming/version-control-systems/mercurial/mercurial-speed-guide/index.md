---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Version Control Systems" ]
date: 2013-08-02
draft: false
tags: [ "programming", "version control systems", "VCS", "Mercurial", "speed guide", "how to", "cheat sheet" ]
title: Mercurial Speed Guide
type: page
---

Note: Many of these commands use shortened versions of the full-length commands (e.g. `addrem` instead of `addremove`, `stat instead` of `status`), afterall, this is a speed guide!

```sh
# Find the status of a repo (any uncomitted changes, revision id, e.t.c)
hg stat

# To pull a repo
hg pull http://url.to.repo

# To add/remove any files
hg addrem

# To detect renamed files
hg addrem --similarity 100

# To remove any non-tracked files, but excluding ignored files (require purge extension to be enabled)
hg purge

# To remove any non-tracked files, including ignore files (requires purge extension to be enabled)
hg purge --all

# Commit with message
hg commit -m "This is a commmit message."

# Close a branch (make sure to update to branch first)
hg commit --close-branch -m "Closing this branch."

# Clear the working directory (update to the "null" commit)
# This is good for central servers where you won't need a working copy on)
hg update null

# Compare local repo with default remote repo
hg outgoing -v

##########################
##### BRANCH RELATED #####
##########################

# Create a named branch from the current working directory
# (and then commit)
hg branch newBranchName
hg c -m "Started a new branch."

# Switch working directory to a named branch
hg update myBranchName

# Find out what branch working directory is currently on
hg branch

##########################
### LOOKING AT CHANGES ###
##########################

# To print out differences in files between the working copy and the last commit
hg diff

# To print out differences only for a specific folder
hg diff folderName

# To print out only the filenames of files that have changes
hg diff --stat

# To print out the last change to a particular file (change the 1 to print out more changes)
hg log -l 1 path/to/file

# To print out log information for a particular branch only
hg log -b "myBranchName"

# You can also use a period to symbolise the current branch
hg log -b .

# Copy a repo, but only take a certain amount of history
# This creates a repo which is not linked in any way to the first
# (hash numbers change). Good for making repo smaller.
hg convert --config convert.hg.startrev=123 <source-repository> <new-repository-name>
```