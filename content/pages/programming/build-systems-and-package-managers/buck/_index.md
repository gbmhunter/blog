---
author: gbmhunter
date: 2018-03-09 00:19:25+00:00
draft: false
title: Buck
type: page
url: /programming/build-systems-and-package-managers/buck
---

# Installation

**Ubuntu**

_This was tested on Ubuntu 16.04._

Install aptitude managed dependencies:

```sh
$ sudo apt install -y ant openjdk-8-jdk python2.7
```

Install Watchman:

```sh    
$ git clone https://github.com/facebook/watchman.git
$ cd watchman/
$ sudo apt-get install -y autoconf automake build-essential python-dev
$ ./autogen.sh 
$ ./configure 
$ sudo make install
``` 

Clone/build/install Buck:

```sh    
$ git clone https://github.com/facebook/buck.git
$ cd buck
$ ant
$ .\bin\buck build --show-output buck
```

**Note: As of Buck v2018.02.16.01, python 2.7 is required. If you try a build will python v3.x, you will get the following error when running the ant command:**

```sh    
gen-buck-info:
    ...
    [exec] TypeError: Object of type 'bytes' is not JSON serializable
```

If the above command completes successfully, you will have the buck executable located at ./bin/buck. This build system does not install it into system folders on your machine, so you will probably want to add ./bin/buck to your path so you can just type buck at the command line.

# Basic Example

The most basic Buck-based project example requires two Buck specific files: .buckconfig and a BUCK file.

# Example Project

An example C++ project built using Buck can be found on GitHub at [https://github.com/njlr/buck-cpp-example](https://github.com/njlr/buck-cpp-example).
