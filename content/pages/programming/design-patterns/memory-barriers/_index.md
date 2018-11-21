---
author: gbmhunter
date: 2017-10-19 23:22:31+00:00
draft: false
title: Memory Barriers
type: page
url: /programming/design-patterns/memory-barriers
---

# Overview




The one rule that compile-time and runtime memory re-ordering follows:




<blockquote>

> 
> Never modify the behaviour of a **single threaded program**. - Memory re-ordering algorithms
> 
> 
</blockquote>




However, if you are designing a multi-threaded program, you are out of luck. Memory re-ordering can mess with what you expect shared data to equal at any point in time.




Read the great tutorial on memory barriers at [http://preshing.com/20120710/memory-barriers-are-like-source-control-operations/](http://preshing.com/20120710/memory-barriers-are-like-source-control-operations/).
