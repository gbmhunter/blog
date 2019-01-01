---
author: gbmhunter
date: 2017-11-24
description: "Shortcuts, key bindings, compiling C/C++ and more info about the Visual Studio Code IDE."
draft: false
lastmod: 2018-12-31
tags: [ "Visual Studio Code", "VS Code", "key bindings", "keyboard shortcuts", "C", "C++", "IDE", "integrated development environment", "terminal", "editor", "Microsoft" ]
title: Visual Studio Code
type: page
---

## Overview

Visual Studio Code is a free, multi-platform, open-source code editor from Microsoft.

{{< img src="visual-studio-code-icon-large.png" width="200px" caption="The icon for Microsoft's Visual Studio Code."  >}}

## Keyboard Shortcuts

Reformat Code: Ctrl-Shift-I (Linux)

## C/C++

Visual Studio Code has relatively good support for C and C++.

The refactoring capabilities are currently not that great, with the only option for C++ objects is "Rename all occurrences".

There is no built-in CMake build support (e.g. you can open/build CMake based C/C++ projects in VS Code). However there is CMake syntax highlighting by way of the CMake plugin by twxs.

## Shortcut For Switching Between Editor And Terminal

Add the following to `keybindings.json` so that you can switch between the editor and the built-in terminal with `` Ctrl-` ``:

```json
{
    "key": "ctrl+`",
    "command": "workbench.action.terminal.focus",
    "when": "editorTextFocus"
},
{
    "key": "ctrl+`",
    "command": "workbench.action.focusActiveEditorGroup",
    "when": "terminalFocus"
}
```
