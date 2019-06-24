---
author: gbmhunter
categories: [ "Programming", "Programming Languages" ]
date: 2013-07-14
draft: false
lastmod: 2013-07-14
tags: [ "programming", "programming languages", "Lua" ]
title: "Lua"
type: page
---

Lua is an extension-based embeddable language. Lua itself is implemented as a stand-alone library, with the goal of being embedded in other applications. It does not have it's own `main()`, it has to be called from a host program running in a different language (e.g. C).

Reference Manual: [http://www.lua.org/manual/5.2/manual.html](http://www.lua.org/manual/5.2/manual.html)

## Functions

Functions in Lua can return more than one value. Awesome! This gets around the semantic issues of passing in variables by reference, just so that you can save data to them (think [pointers](/programming/languages/c/pointers) in [C](/programming/languages/c)).
