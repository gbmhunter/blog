---
authors: [ "Geoffrey Hunter" ]
date: 2016-12-01
draft: false
title: catkin
type: page
---

## Overview

catkin is a CMake and python based build system for building [ROS packages](/robotics/ros/). It was designed to replace the original ROS build system, `rosbuild`. One of the significant advantages of catkin over `rosbuild` is that it is cross-platform (e.g. supports Windows).

catkin is installed automatically when ROS is installed.

## Workspace

catkin typically uses the folder `~/catkin_ws/` as it's workspace.

A new workspace can be initialised by running:

```sh    
$ catkin init
```

You can build all ROS packages within a workspace by running:

```sh    
$ catkin build
```

By default, catkin build swallows all output it's sub-processes may emit to stdout (but will still emit `stderr` messages). To allow `stdout` output to be seen, use the verbose (`-v`) flag:

```sh    
$ catkin build -v
```

You can clean all build output by using:

```sh    
$ catkin clean
```

catkin will normally prompt you to make sure to you want to clean everything.
