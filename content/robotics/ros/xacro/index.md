---
authors: [ "Geoffrey Hunter" ]
date: 2017-01-10
draft: false
title: xacro
type: page
---

## Overview

xacro (XML macro) is a language for writing XML macros. It is designed to facilitate reuse of XML code. It is useful for reducing the size and complexity of [urdf files](http://wiki.ros.org/urdf).

The `xacro` compiler is distributed as a ROS package which can be found at [http://wiki.ros.org/xacro](http://wiki.ros.org/xacro). The compiler takes in `.xacro` files and spits out `.urdf` files.

## rospack Commands

The xacro format allows you to use certain `rospack` commands inside `.xacro` files. The commands are used in the following format:

```text
$(command args...)
```

Two commonly used commands are `find` and `arg`, e.g.:

```xml   
<foo value="$(find xacro)" />
<foo value="$(arg myvar)" />
```