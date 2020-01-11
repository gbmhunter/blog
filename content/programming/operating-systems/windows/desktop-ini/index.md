---
author: gbmhunter
date: 2013-10-10
draft: false
tags: [ "desktop.ini", "Windows", "system folder", "InfoTip", "ShellClassInfo" ]
title: desktop.ini
type: page
---


## How To Create A desktop.ini File

Firstly, the folder that the `desktop.ini` file is going to live needs to be set to be a system folder. A system folder is "read-only" and also enables the special behaviour of the `desktop.ini` file. You can make a folder a system folder by typing the following on the command-line:

```text    
attrib +s FolderName
```

Then create a file in the folder called `desktop.ini` and open it with a text editor.


## Adding An InfoTip To A Folder


InfoTips are descriptive comments that you can associate with a folder. They appear in Windows Explorer when you hover over a folder, or are displayed in the extra information section when you click on a folder.

InfoTips are added to the `desktop.ini` file that resides in the folder in question. They should be added under the `[.ShellClassInfo]` title, and follow the syntax:

```text
[.ShellClassInfo]
InfoTip=My descriptive comment about the folder here.
```
