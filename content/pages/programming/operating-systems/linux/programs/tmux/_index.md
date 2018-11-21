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



    
    $ tmux a -t <session_name>




# Increase Scrollback Buffer Size




Add the following line to your ~/.tmux.conf file. This will allow you to retain more data (history) in the tmux scrollback buffer.



    
    set -g history-limit 50000




# Assign Key To Clear History




Add the following line to your ~/.tmux.conf file. This will allow you to press Ctrl-l to clear both the scrollback history and screen data at the same time.



    
    bind -n C-l send-keys C-l \; clear-history




This will emulate similar behaviour to pressing Ctrl-K in bash.
