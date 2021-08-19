---
authors: [ "Geoffrey Hunter" ]
date: 2017-11-17
draft: false
title: Premade Recipes
type: page
---

## Adding A SSH Server

A SSH server can be a very useful thing to have in a embedded Linux build. It enables things such as scp (secure copy, allowing you to copy files between the embedded device to a development computer over the internet).

You should be able to add a SSH server by adding the following line to your `build/conf/local.conf` file.

```text
EXTRA_IMAGE_FEATURES += "ssh-server-openssh"
```

## Add Python To A Build

Add the following line of code to your `build/conf/local.conf` file:

```text 
IMAGE_INSTALL_append = " python-core"
```

## Add Boost To A Build

Add the following line of code to your `build/conf/local.conf` file:

```text
IMAGE_INSTALL_append = " boost"
```

When adding boost, it is work recreating the SDK so that you have the available libraries for cross-compiling.

## Adding Valgrind To Build

Valgrind is provided under `meta/recipes-devtools/valgrind`. As of Nov 2017, Valgrind v3.12.0 is supported. Valgrind can be added to your Yocto image by adding the following line of code to your `build/conf/local.conf` file:

```text
IMAGE_INSTALL += " valgrind"
```
