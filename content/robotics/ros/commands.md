---
author: gbmhunter
date: 2016-12-01 14:30:40+00:00
draft: false
title: Commands
type: page
url: /robotics/ros/commands
---

## Overview

The following page lists terminal commands (i.e. commands that can be run in bash/the shell) to control ROS.

## Terminal Commands

Creates a new ROS master, parameter server, and a rosout logging node.

```sh    
$ roscore
```

Runs a ROS application.

```sh
$ rosrun <package> <executable> 
```

Prints information about a node.

```sh    
rosnode info
```

Prints a list of the active topics.

```sh    
$ rostopic list
```

Prints a topic's messages.

```sh    
$ rosnode echo /topic
```

Publishes a message to a topic.

```sh    
$ rostopic pub <arguments>
```