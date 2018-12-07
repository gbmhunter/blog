---
author: gbmhunter
date: 2018-06-26 20:37:20+00:00
draft: false
title: Debugging
type: page
url: /programming/languages/python/debugging
---

# Entering A Running Python Process

[pyrasite-shell](http://pyrasite.readthedocs.io/en/latest/index.html) is a great tool for attaching to a running Python process. You can install it using pip with:

```sh    
$ pip install pyrasite
```

You can then attach a pyrasite shell to a running python process using the process ID (PID):

```sh    
$ pyrasite-shell 12345
```

You should then be presented with an interactive Python shell, and you can do things like print the stack trace for each thread:

```py    
import sys, traceback
for thread_id, frame in sys._current_frames().items():
    print(f'**** STACK TRACE FOR THREAD {thread_id} *****'
    traceback.print_stack(frame)
    print('***** END OF STACK TRACE *****')
```

Note that annoyingly, coping and pasting this code into the interactive console will not usually work (due to whitespace getting mangled perhaps?).

pyrasite-shell is a great tool for attaching to "hung" or "frozen" Python processes, which might be stuck in a loop or stuck in a blocked state waiting for something to happen.
