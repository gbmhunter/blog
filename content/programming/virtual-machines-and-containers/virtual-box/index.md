---
author: gbmhunter
categories: [ "Programming", "Virtual Machines And Containers" ]
date: 2013-05-23
draft: false
tags: [ "virtual machine", "Oracle", "VM", "VirtualBox", "Linux", "shared folders" ]
title: "VirtualBox"
type: page
---

<h2>Overview</h2>

<p>VirtualBox is virtual machine software by Oracle.</p>

<h2>gedit "File Busy" Error</h2>

<p>A long-standing bug with Oracles VirtualBox and the popular Linux text editor, Gedit (or any other text editor, for that matter), is the "File Busy" error that you get when trying to save a file across a mounted, shared folder from within Linux system running Gedit (e.g. saving into a Windows-hosted folder).</p>

{{< img src="gedit-save-to-shared-virtual-box-folder-text-file-busy-error.png" caption="The workaround, to enable the 'Save Backup Copy' option in the preferences, and hit the save button twice."  width="800px" >}}

<p>The problem comes from shared folders which are mounted using the command:</p>

{{< highlight bash >}}
$ sudo mount -t vboxsf shared-name folder-to-mount-to
{{< /highlight >}}

<p>The only workaround I am aware of is to enable the "Save Backup Copy" option in the preferences, and hit the save button twice. Annoying and far from perfect, but you can get quick at doing this (<code>Ctrl-S</code>, <code>Enter</code>, <code>Ctrl-S</code> does the trick).</p>

{{< img src="gedit-preferences-enabling-save-backup-copy-to-stop-file-busy-error.png" caption="The 'File Busy' error that you get when trying to save a file across a mounted, shared folder from within Linux system running Gedit."  width="500px" >}}

<p>You will also have to delete all the <code>.goutputstream-XXXXXX</code> files that are created in the directory (these are the backup files).</p>

<h2>SVN In Shared Folders</h2>

<p>SVN can throw <code>svn: Can't move '.svn/tmp/entries' to '.svn/entries': Operation not permitted.</code> errors when attempting to checkout a SVN repository into a shared folder when using VirtualBox.</p>

<p>One work around it to use <code>git-svn</code> (install with <code>sudo apt-get install git-svn</code>) to clone the SVN repository instead.</p>

{{< highlight bash >}}
git svn clone https://svn-repository local-folder
{{< /highlight >}}

<p>Cloning a SVN repo using <code>git-svn</code> can take some time!</p>
