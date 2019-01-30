---
author: gbmhunter
date: 2011-09-05 06:23:30+00:00
draft: false
title: Altium Version Control
type: page
---

## Overview

Although Altium Designer 10 (AD10) incorporates it's own proprietary collaborate, compare and merge feature, you may still want another version control system to manage your entire project (since your project is not likely just going to consist of Altium files. I recommend using Mercurial (see the [Version Control Systems](http://localhost/?q=node/69) page). Below is a recommended Mercurial ignore file for any project containing Altium files to exclude all the junk that Altium creates.

This code prevents the following files and folders from being version controlled:

* <AltiumProjectRoot>/*.SchDocPreview - A recent image of the schematic document, used to display a preview of the file at times such as when you hover the mouse over the project in the project window
* <AltiumProjectRoot>/*.PcbDocPreview - Same as SchDocPreview, except for the PCB file
* <AltiumProjectRoot>/*.TxtPreview - Ditto, except for a txt files
* <AltiumProjectRoot>/*.errPreview - Ditto, except for simulation error files
* <AltiumProjectRoot>/*.nsxPreview - Ditto, except for simulation netlist files
* <AltiumProjectRoot>/*.LOG - Log files are pretty pointless, you don't want to commit these! I made sure that
* <AltiumProjectRoot>/History - This folder contains zip files of previous versions of the SchDoc and PcbDoc files. These could potentially be helpful id you ever wanted to revert back to an old state, but since your now using Mercurial for version control, these shouldn't be needed if you remember to commit regularly!
* <AltiumProjectRoot>/ProjectOutputs - 'Output' files that Altium creates when you do something like create a BOM

As you may of noticed, I make sure that the files are inside the Altium project root directory before excluding them. This is a safety feature incase you have files in the same repository of the same extension that aren't Altium's. I know that the chances of finding a SchDocPreview out side of Altium is next to none, but you might have log or html files that you want in the repository, and without this safety catch they will get excluded also. This however makes the ignore file less generic, as you have to make sure that <AltiumProjectRoot> corresponds to the project directory for each repository you use it for. One way to get around this is to standardize your Altium project folder name (e.g. PCB). In this case, <AltiumProjectRoot> will become PCB. Note that every excluded file type has to have two entries, one to exclude any files in the root directory and one to exclude the file if it exists in any sub-directories. I haven't been able to work out how to condense this into one line with glob syntax. However, I still highly recommend using the glob syntax, it is conceptually simpler to understand and this glob code is tested and completed to a higher degree the RegExp syntax that is below it.

## Using Glob Syntax

## Mercurial ignore file for Altium using Glob syntax

Note: Replace `<AltiumProjectRoot>` with the name of the folder all your Altium files are stored in, relative to the repository root directory (e.g. `PCB`)

```
# use glob syntax  
syntax: glob

#********************  
# ALTIUM IGNORE FILES  
#********************

## Backup Files  
<AltiumProjectRoot>/*.SchDoc.Zip                # Backup of schematics  
<AltiumProjectRoot>/**/*.SchDoc.Zip  
<AltiumProjectRoot>/*.PrjPcb.Zip                # Backup of pcb fle  
<AltiumProjectRoot>/**/*.PrjPcb.Zip

## Preview Files  
<AltiumProjectRoot>/*.SchDocPreview  
<AltiumProjectRoot>/**/*.SchDocPreview  
<AltiumProjectRoot>/*.PcbDocPreview  
<AltiumProjectRoot>/**/*.PcbDocPreview  
<AltiumProjectRoot>/*.HarnessPreview  
<AltiumProjectRoot>/**/*.HarnessPreview  
<AltiumProjectRoot>/*.errPreview  
<AltiumProjectRoot>/**/*.errPreview  
<AltiumProjectRoot>/*.nsxPreview  
<AltiumProjectRoot>/**/*.nsxPreview  
<AltiumProjectRoot>/*.TxtPreview  
<AltiumProjectRoot>/**/*.TxtPreview  
<AltiumProjectRoot>/*.txtPreview  
<AltiumProjectRoot>/**/*.txtPreview  
<AltiumProjectRoot>/*.BOMPreview  
<AltiumProjectRoot>/**/*.BOMPreview  
<AltiumProjectRoot>/*.LDPPreview  
<AltiumProjectRoot>/**/*.LDPPreview  
<AltiumProjectRoot>/*.CSVPreview  
<AltiumProjectRoot>/**/*.CSVPreview

## Reporting Files  
<AltiumProjectRoot>/*.LOG  
<AltiumProjectRoot>/**/*.LOG  
<AltiumProjectRoot>/*.drc  
<AltiumProjectRoot>/**/*.drc  
<AltiumProjectRoot>/*.html                      # Report thats generated when a file is opened, or command executed  
<AltiumProjectRoot>/**/*.html

## Other Files  
<AltiumProjectRoot>/*.orig  
<AltiumProjectRoot>/**/*.orig  
<AltiumProjectRoot>/*.pcbdoc_viewstate          # Viewstate of .pcbdoc file  
<AltiumProjectRoot>/**/*.pcbdoc_viewstate  
<AltiumProjectRoot>/*.pcblib_viewstate          # Viewstate of PCB library  
<AltiumProjectRoot>/**/*.pcblib_viewstate  
<AltiumProjectRoot>/*.PrjPcbStructure  
<AltiumProjectRoot>/**/*.PrjPcbStructure  
<AltiumProjectRoot>/*.REPPreview                # Gerber preview file  
<AltiumProjectRoot>/**/*.REPPreview

## Directories  
<AltiumProjectRoot>/History/  
<AltiumProjectRoot>/**/History/
```

## Using RegExp Syntax

```
# Mercurial ignore file for Altium using RegExp syntax.  
# Note: I currently use glob syntax since it makes more common sense than the regexp syntax and is powerful enough for what I need.  
# Note: therefore this RegExp code is not complete nor fully tested. Only use it as a guide to how the code is written.

## Note: Replace <AltiumProjectRoot> with the name of the folder all your Altium files are stored in,  
# relative to the repository root directory (e.g. PCB)

## switch to regexp syntax.  
syntax: regexp

xworking/(?!.*\.bit$).+  
temp/.*$

<AltiumProjectRoot>/.*\.HarnessPreview  
<AltiumProjectRoot>/.*\.PcbDocPreview  
<AltiumProjectRoot>/.*\.SchDocPreview  
<AltiumProjectRoot>/.*\.nsxPreview  
<AltiumProjectRoot>/.*\.errPreview  
<AltiumProjectRoot>/.*\.LOG  
<AltiumProjectRoot>/.*\.pcblib_viewstate  
<AltiumProjectRoot>/.*\.pcbdoc_viewstate  
<AltiumProjectRoot>/.*\.PrjPcbStructure  
<AltiumProjectRoot>/.*\.drc  
<AltiumProjectRoot>/.*\.html  
<AltiumProjectRoot>/.*History/.*\.Zip$
```
