---
author: gbmhunter
date: 2018-11-13 19:45:56+00:00
draft: false
title: tmux
type: page
url: /programming/operating-systems/linux/programs/tmux
---

# Create And Attach To Sessions

To attach to an already created session:

```sh
$ tmux a -t <session_name>
```

# Detach From A Session

To detach from a tmux session press:

```
Ctrl-B, D
```

while in the session. This will leave the session running in the background, so you can re-attach to it later.

# Increase Scrollback Buffer Size

Add the following line to your ~/.tmux.conf file. This will allow you to retain more data (history) in the tmux scrollback buffer.

```sh
set -g history-limit 50000
```

# Assign Key To Clear History

Add the following line to your ~/.tmux.conf file. This will allow you to press Ctrl-l to clear both the scrollback history and screen data at the same time.

```sh
bind -n C-l send-keys C-l \; clear-history
```

This will emulate similar behaviour to pressing Ctrl-K in bash.
