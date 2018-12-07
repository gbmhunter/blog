---
author: gbmhunter
date: 2018-03-08 21:30:16+00:00
draft: false
title: A C/C++ Build System/Package Manager Comparison
type: page
url: /programming/build-systems-and-package-managers/a-c-c-build-system-package-manager-comparison
---

# Overview

This article is a some opinionated comparison of popular, open-source build systems/package managers for C/C++. This review looks at both programs that compile your code and those that manage dependencies, as the line between build systems and package managers is blurred. The build and packaging support are treated as separate qualities which will be reviewed for each.

The build systems are listed in alphabetical order.

DISCLAIMER: I have had much experience with CMake and Makefiles, and moderate experience with autotools. For some of the other build systems, upon researching/testing for this comparison was the first time I had ever used or sometimes even heard of them.

The [GitHub repository mbedded-ninja/CppBuildSystemReview](https://github.com/mbedded-ninja/CppBuildSystemReview) contains a example/demo project for each build/packaging system mentioned below (one per folder). In each folder, there is a build.sh bash script which should automatically run the build on a Linux system, provided you have the build system installed.

# The Opinionated TL;DR

If you want a full end-to-end package manager and build system setup, have a look at Conan with CMake. If you just are after a modern, powerful build system for typical build situations, have a look at Bazel. If you are thinking about cross-compiling (e.g. embedded targets), want something mature and well-known, or have a complicated build structure, have a look at CMake by it's own.

If you are thinking of using Scons or Makefiles, please make sure you are doing so for a good reason! Perhaps it's because it has to integrate with a system that already uses these tools, or that is what your company prefers. If you are considering it for a completely new project, I strongly recommend you consider some of the alternatives!

# Bazel


<table >
<tbody >
<tr >

<td >Build Functionality
</td>

<td >9/10
</td>

<td >_ Bazel is great a building C/C++ packages._
</td>
</tr>
<tr >

<td >Package Functionality
</td>

<td >7/10
</td>

<td >_Bazel does have support for packages, in the sense that projects can depend on targets from other parts of the filesystem or from the internet. Bazel will automatically download dependencies as needed. One disappointment is there is no install functionality._
</td>
</tr>
<tr >

<td >Platform Support
</td>

<td >7/10
</td>

<td >_Although Linux, macOS and Windows are all supported, I have seen reports of slow build times in macOS and Windows._
</td>
</tr>
<tr >

<td >Usability
</td>

<td >6/10
</td>

<td >_Bazel has a clean and simple syntax, using WORKSPACE and BUILD files [written in Skylark](https://blog.bazel.build/2017/03/21/design-of-skylark.html), a language very similar to Python. Bazel loses a few points here for the extra complexity when cross-compiling (although when is cross-compiling ever easy!)._
</td>
</tr>
<tr >

<td >Scalability/Speed
</td>

<td >8/10
</td>

<td >_Although never tested myself, Bazel claims to cache data, optimize the dependency analysis and perform parallel execution on the builds. And it's used by Google to undertake huge build processes, so it's guaranteed to be fast!_
</td>
</tr>
<tr >

<td >Community
</td>

<td >7/10
</td>

<td >_ The Bazel community is strong, but is still young compared to other build systems (e.g. make, CMake)._
</td>
</tr>
<tr >

<td >TOTAL
</td>

<td > 7/10
</td>

<td >_ _
</td>
</tr>
</tbody>
</table>

Developed by Google.

Bazel has some decent package manager support in the form of external dependencies. Bazel supports other local Bazel repositories, non-Bazel projects, and remote repositories which can be automatically downloaded by Bazel.

Cross-compilation using Bazel can be difficult (see [https://github.com/bazelbuild/bazel/wiki/Building-with-a-custom-toolchain](https://github.com/bazelbuild/bazel/wiki/Building-with-a-custom-toolchain) for reasons why).

As far as I'm aware, Bazel does not have the install functionality that build systems such as make and CMake have. The is no way to "install" the build executables, libraries and header files onto the system, be it the typically install locations (such as /usr/local/bin, /usr/local/lib, ... on Linux) or a custom install directory.

# Buck

<table >
<tbody >
<tr >

<td >Build Functionality
</td>

<td >10/10
</td>

<td >_After all, Buck is marketed as a build system!_
</td>
</tr>
<tr >

<td >Package Functionality
</td>

<td >6/10
</td>

<td >_Buck does not support the downloading of pre-built binary assets, everything must be built from source. However, Buck seems to have good support for locally built dependencies._
</td>
</tr>
<tr >

<td >Platform Support
</td>

<td >7/10
</td>

<td >_(Linux, macOS, Windows). Buck can be tricky to install on Windows and Linux (well supported on macOS via homebrew)._
</td>
</tr>
<tr >

<td >Usability
</td>

<td >8/10
</td>

<td >_Buck is very easy to configure for both building and packaging C/C++ libraries/applications._
</td>
</tr>
<tr >

<td >Scalability/Speed
</td>

<td >9/10
</td>

<td >_Buck is designed to be fast. [It even attempts to work out what dependency headers to use](https://buckbuild.com/concept/what_makes_buck_so_fast.html), and only recompile if these change. Going hand-in-hand with Buck speed, it was designed from the start to be highly scalable. _
</td>
</tr>
<tr >

<td >Community
</td>

<td > 6/10
</td>

<td >_ [Although the documentation is quite comprehensive](https://buckbuild.com/setup/getting_started.html), Buck is still young at it can be difficult to find solutions to problems on places such as StackOverflow. It does have over 5.5k stars on GitHub!_
</td>
</tr>
<tr >

<td >TOTAL
</td>

<td > 7/10
</td>

<td >_A relatively new, cross-platform, multi-language build system that has a promising future. _
</td>
</tr>
</tbody>
</table>

# Buckaroo

Buckaroo is a package manager that uses Buck as the build system.

Unfortunately, I do not believe that Buckaroo supports local dependencies. All dependencies have to come from

# CMake

<table >
<tbody >
<tr >

<td >Build Functionality
</td>

<td >9/10
</td>

<td > _CMake is mature and has a very complete feature set._
</td>
</tr>
<tr >

<td >Package Functionality
</td>

<td >6/10
</td>

<td >
</td>
</tr>
<tr >

<td >Platform Support
</td>

<td >9/10
</td>

<td >_(Linux, macOS, Windows). One of CMake's core qualities is to be platform and build system independent!_
</td>
</tr>
<tr >

<td >Usability
</td>

<td >5/10
</td>

<td >_CMake can be somewhat easy to use for a self-contained build, but can get rather complex when dealing with dependencies (exporting, supporting find_package, .cmake.in files, e.t.c, see [here](https://cmake.org/cmake/help/git-master/manual/cmake-packages.7.html#creating-packages))._
</td>
</tr>
<tr >

<td >Scalability/Speed
</td>

<td >7/10
</td>

<td >_CMake supports large, multi-dependency projects well. However, you can get into a bit of a mess if proper "best practises" are not followed._
</td>
</tr>
<tr >

<td >Community
</td>

<td >8/10
</td>

<td >


_CMake has become the defacto standard for newer C++/C projects._



</td>
</tr>
<tr >

<td >TOTAL
</td>

<td >7/10
</td>

<td >

_Definitely a build system I would recommend!_

</td>
</tr>
</tbody>
</table>

CMake is a C/C++ build system which strives to be operating system and compiler independent. CMake itself does not actually run the build process, instead, it generates build files for another build system, which is typically make on UNIX systems and Visual Studio on Windows systems.

CMake is driven by scripts in CMakeLists.txt files, usually contained in the root and relevant sub-directories directories of the project you are building. The language of a CMakeLists.txt file may seem a little foreign at first but is a powerful way of expressing the build process.

The default way of building a CMake project usually looks something like:

```sh
    ProjectDir$ mkdir build
    ProjectDir$ cd build
    ProjectDir/build$ cmake ..
    ProjectDir/build$ make
```

There is an interesting [Hunter package manager](https://github.com/ruslo/hunter) which is aimed at making CMake package management easier. I decided not to include Hunter as a separate build system because of the similarities, but it definitely shows promise when it comes to making CMake easier to use!

For more information on CMake, see the [dedicated CMake section of mbedded.ninja](/programming/compilers-build-systems/cmake).


# Conan

<table >
<tbody >
<tr >

<td >Build Functionality
</td>

<td >7/10
</td>

<td > Although Conan is marketed as a package manager, it has first-tier integration with build systems such as CMake, and can even call/perform the build for you.
</td>
</tr>
<tr >

<td >Package Functionality
</td>

<td >9/10
</td>

<td > Conan is first and foremost a package manager.
</td>
</tr>
<tr >

<td >Platform Support
</td>

<td >9/10
</td>

<td >_(Linux, macOS, Windows). Written in python, it is supported on all popular platforms. When choosing CMake as the build system (this seems to be the popular option), this cross-platform support continues._
</td>
</tr>
<tr >

<td >Usability
</td>

<td >7/10
</td>

<td >
</td>
</tr>
<tr >

<td >Scalability/Speed
</td>

<td >7/10
</td>

<td >_ Given Conan's first-tier binary package support, compilation should be fast on common platforms as you won't be building from source._
</td>
</tr>
<tr >

<td >Community
</td>

<td >8/10
</td>

<td >_With over 1.6k stars on GitHub, and fairly comprehensive documentation, Conan has a large number of users (although Buck has more)._
</td>
</tr>
<tr >

<td >TOTAL
</td>

<td > ?
</td>

<td >
</td>
</tr>
</tbody>
</table>

Conan is solely a C/C++ package manager, although it provides interfaces to common build tools such as CMake (this seems to be popular pairing). Installation can be as simple as $ pip install conan.

Conan is tightly integrated with official and community repositories which house popular packages. [The official repository is on bintray](https://bintray.com/conan/conan-center). It also uses a local repository (or cache) which is used to prevent multiple copies of the same dependency, and for local/private package development.

When used with CMake, Conan can take over the responsibility of what is traditionally CMake's install/export steps. The install/export steps have always been a difficult issue with CMake, which requires complex logic to produce a relocatable, re-usable upstream CMake package.

# Makefiles

<table >
<tbody >
<tr >

<td >Build Functionality
</td>

<td > 6/10
</td>

<td >
</td>
</tr>
<tr >

<td >Package Functionality
</td>

<td > 3/10
</td>

<td >
</td>
</tr>
<tr >

<td >Platform Support
</td>

<td >10/10 
</td>

<td >_(Linux, macOS, Windows, ...). Makefiles have been around since the dawn of time, and are supported almost everywhere!_
</td>
</tr>
<tr >

<td >Usability
</td>

<td >1/10
</td>

<td >_ Ever tried to write a Makefile by hand? If you have, you will appreciate this score._
</td>
</tr>
<tr >

<td >Scalability/Speed
</td>

<td >2/10
</td>

<td >
</td>
</tr>
<tr >

<td > Community
</td>

<td >8/10 
</td>

<td >Makefiles, being one of the oldest build systems still in popular use, has plenty of online resources!
</td>
</tr>
<tr >

<td >TOTAL
</td>

<td > 3/10
</td>

<td >
</td>
</tr>
</tbody>
</table>


No. No. No. Please don't consider raw makefiles as your build system unless you absolutely have to. Did I mention this comparison was opinionated?

# Scons

<table >
<tbody >
<tr >

<td >Build Functionality
</td>

<td >6/10
</td>

<td >
</td>
</tr>
<tr >

<td >Package Functionality
</td>

<td > 1/10
</td>

<td >
</td>
</tr>
<tr >

<td >Platform Support
</td>

<td > 8/10
</td>

<td >
</td>
</tr>
<tr >

<td >Usability
</td>

<td > 4/10
</td>

<td >
</td>
</tr>
<tr >

<td >Scalability/Speed
</td>

<td >
</td>

<td >
</td>
</tr>
<tr >

<td >Community
</td>

<td > 3/10
</td>

<td >
</td>
</tr>
<tr >

<td >TOTAL
</td>

<td > 4/10
</td>

<td >
</td>
</tr>
</tbody>
</table>

Scons is a build tool. The technical limitations of scons starts to make the scripts complex when it comes to local builds with multiple dependencies and local install paths.

# Examples

Each build system has to:

* Compile source code into a executable
* Link a third-party library
* Install static library (lib file and headers) and executable onto system
