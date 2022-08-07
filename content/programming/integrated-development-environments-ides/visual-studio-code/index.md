---
authors: [ "Geoffrey Hunter" ]
date: 2017-11-24
description: "Shortcuts, key bindings, compiling C/C++ and more info about the Visual Studio Code IDE."
draft: false
lastmod: 2019-10-11
tags: [ "Visual Studio Code", "VS Code", "key bindings", "keyboard shortcuts", "C", "C++", "IDEs", "integrated development environment", "terminal", "editor", "Microsoft", "vim" ]
title: "Visual Studio Code"
type: "page"
---

## Overview

Visual Studio Code is a free, multi-platform, open-source code editor from Microsoft.

{{% figure src="visual-studio-code-icon-large.png" width="200px" caption="The icon for Microsoft's Visual Studio Code."  %}}

## Keyboard Shortcuts

```
Reformat Code: Ctrl-Shift-I (Linux)
ds<char>     Delete existing surround identified by <char>
cs<existing char><new char>   Change existing surround <existing char> to <new char>
```

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

## Git Ignore File For Visual Studio Code

```text
.vscode/c_cpp_properties.json
.vscode/launch.json
```

You may want to include `*.code-workspace` files as they can contain cSpell configuration that you wish to share (such as user-added words).

## VS Code And vim

The [vscodevim](https://github.com/VSCodeVim/Vim) plugin provides powerful vim capabilities.

Unfortunately, `vscodevim` does load your `.vimrc` or `.vim` plugins. The best workaround is to implement the plugin functionality using `vscodevim`'s settings, or to use the provided _emulated plugins_. Thankfully, they have emulated some of the most popular plugins such as `vim-surround` and `vim-easymotion`.