---
author: gbmhunter
date: 2012-01-15
draft: false
title: Mercurial Ignore File For PSoC Creator In Glob Syntax
type: page
---

## Overview

Following is a Mercurial ignore file for excluding the unnecessary files created by PSoC Creator. The ignore files is written using regex syntax. It only excludes files that are within a specified sub-directory within the repository (commonly called code or something like that). This is to stop the ignore file excluding other files with the same extension from other sections of the repository.

Where possible, the type of file excluded is commented beside each line, just incase you want to re-introduce the file for some reason.

Just copy the code below into the .hgignore file found in the root directory of your repository, replacing `<psoc code root dir>` with the directory the code will be placed in (or delete this and the `/` if you want it to apply to the whole repo).

## Ignore File

```text
#*************************************************************************
#*************************** PSOC IGNORE FILES ***************************
#*************************************************************************

<psoc code root dir>/.*?\.cywrk\..*? 			# User specific .cywrk files (cywrk.<username> extension)
<psoc code root dir>/.*?\.cyprj\..*? 			# User specific .cyprj files (cyprj.<username> extension)

<psoc code root dir>/.*?/?codegentemp/.* 	# Temp compile files
<psoc code root dir>/.*?/?autoseltemp/.* 	# Temp compile files for bootloader project
    
# Ignores most debug stuff except the generated source (that PSoC Creator makes),
# and the .hex file used for programming. Keeps all release files (release folder
# rather than debug.
<psoc code root dir>/.*?/?Debug/.*\.o$    	# Compiler-generated object files
<psoc code root dir>/.*?/?Debug/.*\.P$    	# Compiler-generated files
<psoc code root dir>/.*?/?Debug/.*\.log$  	# Compiler-generated log files
<psoc code root dir>/.*?/?Debug/.*\.a$    	# Compiler-generated files
<psoc code root dir>/.*?/?Debug/.*\.deps$ 	# Compiler-generated dependency files
<psoc code root dir>/.*?/?Debug/.*\.lst$
<psoc code root dir>/.*?/?Debug/.*\.elf$	# Compiled binary
<psoc code root dir>/.*?/?Debug/.*\.ihx$
<psoc code root dir>/.*?/?Debug/.*\.map$	# Map file
```