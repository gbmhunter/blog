---
author: gbmhunter
date: 2015-10-22 21:17:32+00:00
draft: false
title: Tips And Tricks
type: page
url: /programming/languages/c/tips-and-tricks
---

# Place A Statically Determinable Upper-Bound On All Loops

Having a statically determinable upper-bound on all loops creates a directed acyclic call graph of your program. This can help static-analysis tools determine the upper-limits of stack/memory usage.

The exceptions to this rule include:

* The main-event loop of a task.
* while(1) statements inserted for special-case scenarios (e.g. processor stress-testing, debugging, handling critical errors).
