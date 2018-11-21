---
author: gbmhunter
date: 2017-01-16 20:10:05+00:00
draft: false
title: A Modular, Scaleable Way Of Using CMake
type: page
url: /programming/build-systems-and-package-managers/cmake/a-modular-scaleable-way-of-using-cmake
---

# Overview




Each sub-project should be treated like a proper project, with it's own build and install step. find_package() should be the preferred way of declaring and finding dependencies between packages.




In a way, this method is quite similar to how the Linux package system works, and how you would add dependencies into your projects such as the Boost libraries. Your own code libraries should follow the same architecture.
