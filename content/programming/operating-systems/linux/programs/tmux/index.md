---
author: "gbmhunter"
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2018-11-13
draft: false
title: "tmux"
type: "page"
---

## Overview

`tmux` uses an _alternate screen buffer_ which is the same height and width as the parent terminal.

## Create And Attach To Sessions

To attach to an already created session:

```sh
$ tmux a -t <session_name>
```

## Detach From A Session

To detach from a `tmux` session press:

```
Ctrl-B, D
```

while in the session. This will leave the session running in the background, so you can re-attach to it later.

## Increase Scrollback Buffer Size

Add the following line to your `~/.tmux.conf` file. This will allow you to retain more data (history) in the `tmux` scrollback buffer.

```sh
set -g history-limit 50000
```

## Assign Key To Clear History

Add the following line to your `~/.tmux.conf` file. This will allow you to press `Ctrl-l` to clear both the scrollback history and screen data at the same time.

```sh
bind -n C-l send-keys C-l \; clear-history
```

This will emulate similar behaviour to pressing `Ctrl-K` in bash.

## Killing Sessions

Use `kill-session` to kill/delete a tmux session:

```sh
$ tmux kill-session -t my_session
```

## Window Management

`tmux` supports windows to allow multiple terminals per `tmux` session. These windows are also commonly called tabs, but they do not have visible tab UI element in the terminal.

Useful `tmux` window keys (all of these have to be preceeded with the prefix key, which by default is `Ctrl-B`):

```text
c    New window.
,    Name window.
w    List windows (select with arrow keys and enter)
f    Find window.
&    Kill window.
```

### How To Prevent tmux From Renaming The Window

Renaming windows is great for organisation once you have more than one or two in use at the same time. However, `tmux` can annoyingly decide it wants to automatically rename your windows based on the current `$PROMPT_COMMAND`. To prevent this from happening, add the following to your `.tmux.conf` file:

```text
set-option -g allow-rename off
```