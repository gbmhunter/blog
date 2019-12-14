---
author: "gbmhunter"
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2018-11-13
description: "A tutorial on tmux, session management software for Linux."
draft: false
lastmod: 2019-07-25
tags: [ "programming", "operating systems", "Linux", "programs", "tmux", "sessions", "detach", "windows", "panes", "scrollback", "buffers", "history" ]
title: "tmux"
type: "page"
---

## Overview

`tmux` uses an _alternate screen buffer_ which is the same height and width as the parent terminal.

In all of the below code examples, `<prefix>` refers to the `tmux` prefix key combination. It is typically `Ctrl-B` by default, although it can vary from system to system.

## Create And Attach To Sessions

To create and attach to a new, **named** tmux session, enter the following at the command prompt:

```sh
tmux new -s <session_name>
```

e.g.:
```sh
$ tmux new -s my_session
```

To attach to an already created **named** session:

```sh
tmux a -t <session_name>
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
s    List sessions (select with arrow keys and enter)
$    Name session.
(    Cycle forward through sessions.
)    Cycle backward through sessions.
c    New window.
,    Name window.
w    List windows (select with arrow keys and enter)
f    Find window.
&    Kill window.
t    Show a big clock (kind of like a screen saver)
```

### How To Prevent tmux From Renaming The Window

Renaming windows is great for organisation once you have more than one or two in use at the same time. However, `tmux` can annoyingly decide it wants to automatically rename your windows based on the current `$PROMPT_COMMAND`. To prevent this from happening, add the following to your `.tmux.conf` file:

```text
set-option -g allow-rename off
```

## Swapping/Moving Windows In The Same Session

The easiest way IMHO is to add the following to your `.tmux.conf` file:

```text
bind-key -n C-S-Left swap-window -t -1
bind-key -n C-S-Right swap-window -t +1
```

This will allow you to press `Ctrl-Shift-Left` and `Ctrl-Shift-Right` to move the currently active tmux window left and right (i.e. swapping positions with the neighbouring windows).

## Moving Windows Between Sessions

`tmux` allows you to move windows between different sessions with the `move-window` command.

```text
<prefix>:move-window -t dst_session:window_id
```

You have to move the window to a free `window_id` (i.e., not one in use).

## Re-ordering tmux Sessions

Unlike windows which can be arbitrarily re-ordered, `tmux` always orders sessions alphabetically by name. The best solution if you are looking to order sessions is to prefix them with sequential numeral/characters (e.g. `0_my_session`, `1_my_other_session`).

You can rename your current session from within `tmux` by typing:

```text
<prefix> $
```

Enter a new name, and press `Return`.

## Reloading The tmux Config File

From within a tmux session:

```sh
:source-file ~/.tmux.conf
```

or from your shell:

```sh
$ tmux source-file ~/.tmux.conf
```