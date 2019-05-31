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

{{% img src="iterm2-enabling-natural-text-editing.png" width="500px" caption="Enabling the 'Natural Text Editing' key mapping reset in iTerm2." }}

### Clearing The Buffer

```sh
$ reset
```

`clear` will not clear the buffer, it only clears the view window.