---
author: gbmhunter
categories: [ "Programming", "Design Patterns" ]
date: 2017-10-19
draft: false
tags: [ "programming", "design patterns", "memory barriers", "instruction re-ordering" ]
title: Memory Barriers
type: page
---

<h2>Overview</h2>

<p>The one rule that compile-time and runtime memory re-ordering follows:</p>

<blockquote>Never modify the behaviour of a **single threaded program**. - Memory re-ordering algorithms</blockquote>

<p>However, if you are designing a multi-threaded program, you are out of luck. Memory re-ordering can mess with what you expect shared data to equal at any point in time.</p>

<p>Read the great tutorial on memory barriers at <a href="http://preshing.com/20120710/memory-barriers-are-like-source-control-operations/">http://preshing.com/20120710/memory-barriers-are-like-source-control-operations/</a>.</p>
