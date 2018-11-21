---
author: gbmhunter
date: 2013-08-24 00:15:06+00:00
draft: false
title: Continuous Integration
type: page
url: /programming/general/continuous-integration
---

# Travis CI


Travis CI is a free (for public repositories), online, hosted continuous integration service.

Website: [https://travis-ci.org/](https://travis-ci.org/)

Travis CI is closely tied in with GitHub, allowing Travis CI to automatically manage the CI process for projects that are hosted on GitHub. All you have to do is add a yml file (see below), tell Travis CI about the repository, and your set! Travis CI will automatically download the repo, and run any commands you want in a Linux virtual machine, on every commit (or whenever you wish).


## The .yml File


For a GitHub project to be supported by Travis CI, it must have a .travis.yml file in it's repository. This file holds the settings for Travis CI and tells it what to do.

The following is a simple example yml file for a C++ project that uses the GCC C++ compiler (G++) and has a make file in it's root directory.

    
    language: cpp
    compiler:
      - gcc
    script: "make"


This is the same as running the command make from a terminal in Linux when in the root directory of your project. The script string tells Travis CI what command to run.
