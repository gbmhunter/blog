---
title: "tmux"
date: 2018-11-14T14:39:50-08:00
type: page
---

# Create and Attach to Sessions

To attach to an already created session:

``` shell
$ tmux a -t <session_name>
```

# Increase Scrollback Buffer Size

Add the following line to your ~/.tmux.conf file. This will allow you to retain more data (history) in the tmux scrollback buffer.

```shell
set -g history-limit 50000
set -g history-limit 50000
```