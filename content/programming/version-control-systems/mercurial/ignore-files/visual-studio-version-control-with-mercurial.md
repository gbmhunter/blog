---
author: gbmhunter
date: 2011-09-15 07:37:39+00:00
draft: false
title: Visual Studio Version Control With Mercurial
type: page
url: /programming/version-control-systems/mercurial/ignore-files/visual-studio-version-control-with-mercurial
---

## Overview

Following is an Mercurial ignore file for excluding the unnecessary files from a Visual Studio C# project (written when using the 2010 version, but should work with others). The ignore file is written using regex syntax.

It only excludes files that are within a folder called <Visual Studio root folder>. This is to stop the ignore file excluding other files with the same extension from other sections of the repository. Replace <Visual Studio root folder> with whatever folder name you choose to put the code in, or delete  <Visual Studio root folder>/ completely and it will ignore these files anywhere in your repository.

The type of file excluded is commented beside each line, just incase you want to re-introduce some of these files for some reason.

Copy this code into the .hgignore file found in the root directory of your repository.

## Ignore File

```    
#*************************************************************************
#***************************** C# IGNORE FILES ***************************
#*************************************************************************

# use regexp syntax
syntax: regexp

# Files that should be included:
# .cs, .dll, .sln, .csproj, .resx, .config, .settings

<Visual Studio root folder>/.*\.pdb$    # 
<Visual Studio root folder>/.*\.user$   # User files
<Visual Studio root folder>/.*\.suo$
<Visual Studio root folder>/.*\.obj$    # Temp build files
<Visual Studio root folder>/.*\.pch$
<Visual Studio root folder>/.*\.vspscc$
<Visual Studio root folder>/.*\._i\.c$
<Visual Studio root folder>/.*\._p\.c$
<Visual Studio root folder>/.*\.ncb$
<Visual Studio root folder>/.*\.tlb$
<Visual Studio root folder>/.*\.tlh$
<Visual Studio root folder>/.*\.bak$
<Visual Studio root folder>/.*\.cache$
<Visual Studio root folder>/.*\.ilk$
<Visual Studio root folder>/.*\.log$
<Visual Studio root folder>/.*\.lib$
<Visual Studio root folder>/.*\.sbr$
<Visual Studio root folder>/.*\.scc$

<Visual Studio root folder>/.*obj/.* 		# All files in "obj" folder (temporary object files for creating binary with
<Visual Studio root folder>/.*Debug/.* 		# All files in "obj" folder (temporary object files for creating binary with

# InstallShield Files (all logfiles and reports)
<Visual Studio root folder>/.*?/DVD-5/LogFiles/.*?
<Visual Studio root folder>/.*?/DVD-5/Reports/.*?
<Visual Studio root folder>/.*?/SingleImage/LogFiles/.*?
<Visual Studio root folder>/.*?/SingleImage/Reports/.*?
```