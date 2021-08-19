---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Build Systems And Package Managers", "CMake" ]
date: 2017-07-28
draft: false
title: How To Automatically Run Unit Tests Using CMake
type: page
---

## Overview

Unit tests are a great way to make sure your code is working, drive development (TDD, a.k.a Test Driven Development) and prevent regression. However, it is very easy to forget to run your unit tests regularly. CI (continuous integration) tools may help here, running unit tests on every commit that is pushed to the server. But what about local commits, and what about all the code builds that may occur before a commit is made and pushed?

This is where the automatic (or semi-automatic) running of unit tests from CMake can come in helpful.

One way to achieve this is to add a custom target in conjunction with a custom command. The custom target provides a way of running the unit tests through make (e.g. `make run_unit_tests`), while the custom command provides the functionality needed to actually call the unit test executable.

```cmake
# The custom target and custom command below allow the unit tests
# to be run.
# If you want them to run automatically by CMake, uncomment #ALL
add_custom_target(
        run_unit_tests #ALL
        DEPENDS ${CMAKE_CURRENT_BINARY_DIR}/RunUnitTests.touch UnitTests)

add_custom_command(
        OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/RunUnitTests.touch
        COMMAND ${CMAKE_CURRENT_BINARY_DIR}/UnitTests)
```

The above CMake commands result in the ability to run the unit tests by calling:

```sh    
~/MyProject/build$ make run_unit_tests
```