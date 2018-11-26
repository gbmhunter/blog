---
author: gbmhunter
date: 2018-03-12 19:43:42+00:00
draft: false
title: Conan
type: page
url: /programming/build-systems-and-package-managers/conan
---

# Overview




Conan is a package manager, primarily designed for C or C++ packages.




{{< figure src="/images/2018/04/conan-package-manager-logo-with-text.png" caption=""  >}}




# Installation




**Linux, macOS, Windows**




Assuming you have python and pip already installed on your system, you can install Conan with the command:



    
    $ pip install conan




# Local Cache




Conan downloads package recipes and binaries to local cache, so if they are used multiple times, you don't have to download them. Typically, the local cache is found at ~/.conan/data.




You can inspect your local cache with:



    
    $ conan search




You can remove packages from your local cache with:



    
    $ conan remove







# Packaging




Conan will install packages to it's cache located at <user home directory>/.conan.




Packages uploaded to the central repository must have a test_package sub-directory.




# test_package




The conan file inside test_package does not have to have a requires dependency for the package it is testing, this is automatically assumed.




You should not be writing your unit or integration tests inside test_package. It is solely designed to test that the package was created properly. For a simple C++ static library, it would be enough to include the headers (this checks to make sure the headers were exported into the package correctly) and create an instance of a class provided by the library (this makes sure the static library was included in the package and it is being linked against).
