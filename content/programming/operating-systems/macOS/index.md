---
author: "gbmhunter"
categories: [ "Programming", "Operating Systems" ]
date: 2019-05-30
draft: false
lastmod: 2019-05-30
tags: [ "programming", "operating systems", "macOS", "iTerm2" ]
title: "macOS"
type: "page"
---

## Overview

## iTerm2

### Better Command-Line Editing

Enable "Natural Text Editing" in iTerm2 to incorporate typical macOS-style text editing shortcodes into the command-line prompt. Two of the most useful commands enabled by this feature is the ability to jump forwards and backwards through words/arguments on the command-line with `Alt-Left Arrow` and `Alt-Right Arrow`.

To enable Natural Text Editing, click _iTerm2_->_Preferences_->_Profiles_->_Keys_. Then click _Load Preset_, and select _Natural Text Editing_ from the dropdown.

{{% img src="iterm2-enabling-natural-text-editing.png" width="500px" caption="Enabling the 'Natural Text Editing' key mapping reset in iTerm2." %}}

### Clearing The Buffer


To clear iTerms scrollback buffer, you can enter the following command:
```sh
printf '\e]50;ClearScrollback\a'
```

This is useful when you want you are expecting to search stdout but don't want previous results corrupting the search. It is also useful for increasing responsiveness when the scrollback buffer becomes large (especially if `imgcat` has been used). The commands `clear`, `reset` and `Ctrl-K`, while clearing the screen, will not clear the scrollback buffer.

### imgcat

Images can be displayed inline in a terminal with iTerm2's `imgcat` script.

```sh
$ imgcat my_image.png
```

There is also a 3rd party tool under the same `imgcat` name which provides similar functionality at [https://github.com/eddieantonio/imgcat](https://github.com/eddieantonio/imgcat).

## tmux Integration

iTerm2 supports very powerful integration with {{% link text="tmux" src="/programming/operating-systems/linux/programs/tmux" %}}.

To start a tmux session that is integrated into iTerm2, first be running a terminal inside iTerm2, and then add `-CC` to your `tmux` invocation:

```sh
tmux -CC
```

Once the tmux session has been started inside iTerm2, you can then also use standard iTerm2 shortcuts to open new tmux windows, tabs or split panes.

* `Cmd-t`: Open new tab
* `Cmd-n`: Open new window
* `Cmd-d`: Split verticaly
* `Cmd-Shift-d`: Split horizontally

{{% note %}}
Note that an iTerm2 tmux session and a standard iTerm2 non-tmux session can not share the same tab, i.e. the tmux session has to be either a completely new tab or a new window.
{{% /note %}}