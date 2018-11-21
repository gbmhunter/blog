---
author: gbmhunter
date: 2017-01-16 20:35:31+00:00
draft: false
title: How To Make Your Library Support find_package()
type: page
url: /programming/build-systems-and-package-managers/cmake/how-to-make-your-library-support-find_package
---

# Overview




As a code library maintainer, if you want your users to be able to use find_package(MyPackage) in CMake files, you need to now how to create a CMake _package_.




Annoyingly, this is not a simple task!




If the user performs a local install, they may call cmake as:



    
    build$ cmake -DCMAKE_INSTALL_PREFIX=../install ..




# Referencing Your Package From Downstream Build




Once you have created your package, you will be wanting to be able to use find_package() in a downstream package.




The CMake variable CMAKE_PREFIX_PATH can be used to specify local install locations for your dependent packages.




# External Resources




A great resource on creating a CMake package can be found at [https://cmake.org/cmake/help/git-master/manual/cmake-packages.7.html#creating-packages](https://cmake.org/cmake/help/git-master/manual/cmake-packages.7.html#creating-packages).




An working GitHub example repo which uses the CMake packaging system can be found at [https://github.com/forexample/package-example](https://github.com/forexample/package-example).



