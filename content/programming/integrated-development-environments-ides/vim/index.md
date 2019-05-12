---
author: "gbmhunter"
date: 2018-12-03
description: "Regex find/replace, back-references and more info about the text-editor vim."
lastmod: 2019-05-05
tags: [ "vim", "text editor", "Linux", "command-line", "regex", "IDEs", "copy", "paste", "system clipboard", "yank", "indenting", "plugins" ]
title: "vim"
type: "page"
---

## Overview

vim is a command-line based text editor.

It is very useful for editing code and config files when you only have access to a command-line, e.g. when your are ssh'ed into a remote machine.

## Select, Cut, Copy And Paste

`i` and then a delimiter such as `(`, `{`, `[` can be added after yank, delete, replace.

The following table shows some examples:

Command   | Description
----------|---------------------------------------------
`yi{`     | Yank (copy) text inside braces
`ya{`     | Yank text inside and including braces
`di(`     | Delete inside brackets.
`ci[`     | Replace inside square brackets.

## Find And Replace

To find every occurrence of `foo` and replace it with `bar` we can use the substitute command (`s`):

```text
:%s/foo/bar/g
```

The `%` at the start forces vim to check all lines, not just the current one. The `g` at the end stands for global, which force vim to replace all occurrences, not just the first.

The _search pattern_ (which above is `foo`) supports regex. 

You can add a `c` at the end to ask for confirmation on each replace:

```text
:%s/foo/bar/gc
```

When searching, `.`, `*`, `\`, `[`, `^` and `$` have special functions. Place a backslash before each to instead search for that actual character (e.g. `\*` will search for a `*`.)

## Advanced Find And Replace Using Backreferences

vim supports advanced find/replace operations which involve manipulating the input into the output using regex back references.

## Jump To Matching Bracket, Brace, Parenthesis

When in normal mode, make sure the cursor is over one of the brackets, and press the `%` key.

## Copy Paste

`yy` copies the current line, press `p` to paste it below the current line, or `P` to paste it above the current line.

`dd` deletes the current line. You can press `p` to paste it.

### Using Internal Registers

When performing copy/paste operations in the above manner, vim will not use the system clipboard, but rather it's own internal clipboard. When no register is specified (e.g. the above example), vim will copy and paste using the _unnamed register_.

## Copy/Paste To System Clipboard

Copying/pasting to the system clipboard can be a little tricky.

As long as your vim executable supports it, you can copy to the clipboard using the `*` register. Select text using visual mode (e.g. `v`, `l`, `l` to select three characters), and then press:

```text
"*y
```

You can find out if your vim executable supports copying to the clipboard with the command `vim --version` (it prints out a large amount of info, so we use `grep` to filter the output):

```sh
$ vim --version | grep clipboard
-clipboard       +iconv           +path_extra      -toolbar
+eval            +mouse_dec       +startuptime     -xterm_clipboard
```

The `-clipboard` indicates that this feature was not includes. What you want to see is `+clipboard`!

{{% note %}}
Most VIM extensions for IDEs (including the one for IntelliJ and VS Code) support copying to the system clipboard.
{{% /note %}}

## Movement

vim has two different sets of movement keys. The first is the standard `← → ↑ ↓`,  arrow keys. The second is the more harder to learn `h (left) j (down) k (up) l (right)` method.

The idea behind `h j k l` is that they are closer to all the other vim commands, so you don't have to move you hand/finger position to use them, resulting in more faster use. The downside is that they are not as intuitive to use, and do not work in _insert mode_ (in insert mode they behave as the regular characters).

## Indenting

When writing code, a common need is to shift text left and right by a fixed indentation amount, either to make it readable in indentation agnostic languages such as C, or just to make it work in indentation sensitive languages such as Python!

vim allows you to use the `<` and `>` keys to shift selected text left or right by the _shiftwidth_.

Unfortunately, the selection is deselected as soon as you press the `<` or `>` keys. While you can still repeat the indentation with `.`,  you cannot reverse the indentation with the opposite chevron key without re-selecting the text (of course, undo will still work). A shortcut for re-selecting the lines is `gv`.

When in normal mode, you can press `>>` or `<<` to shift the current line.

When in insert mode, you can use `Ctrl-T` to indent right and `Ctrl-D` to indent left (unindent).

## Deleting The Char Under The Cursor

To delete the single char under the cursor while in normal mode, press `x`.

To delete the single char under the cursor while in normal mode, **and then enter insert mode**, press `s`. This is great for modifying single characters, and is one key stroke shorter than `i, Del` (it matters!).

## Plugins And Plugin Managers

vim supports third-party plugins which can add extra functionality to the program, however there is no built-in plugin manager. A number of third-party plugin managers exist which can be used to easily install and use plugins.

### dein.vim

* Website: https://github.com/Shougo/dein.vim

neobundle is deprecated in favour of this vim plugin manager.

### neobundle

* Website: https://github.com/Shougo/neobundle.vim

neobundle has been deprecated in favour of dein.vim.

### vundle

* Website: https://github.com/VundleVim/Vundle.vim

vundle manages your plugins from the `.vimrc file`. It is easy to install and setup. vundle supports automatic installation of vim plugins from GitHub.