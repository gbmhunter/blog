---
author: gbmhunter
date: 2018-09-24 21:32:53+00:00
draft: false
title: pybind11
type: page
url: /programming/languages/python/pybind11
---

## Overview

[pybind11](https://github.com/pybind/pybind11) is a tool which can be used to create Python bindings to C++ code. The 11 in it's name is taken from the C++11 standard, because it makes use of C++11 language features to provide it's functionality (and hence C++11 is the oldest C++ standard it supports).

Unlike some other binding creating software packages that expect to define general type conversion rules and C++ classes to create bindings for in separate interface files (such as Swig), pybind11 expects you to describe your binding interface in the C++ files themselves.

## Examples

See [https://github.com/mbedded-ninja/BlogAssets/tree/master/Programming/pybind11/cmake_example](https://github.com/mbedded-ninja/BlogAssets/tree/master/Programming/pybind11/cmake_example) for a working example showing how to build Python bindings to C++ code maintained with the CMake build system.

There are other great examples created by pybind themselves, including a [plain C++ example](https://github.com/pybind/python_example) and a [CMake project example](https://github.com/pybind/cmake_example).
