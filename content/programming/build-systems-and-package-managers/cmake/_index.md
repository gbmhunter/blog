---
author: gbmhunter
date: 2016-12-07 08:59:20+00:00
draft: false
title: cmake
type: page
url: /programming/build-systems-and-package-managers/cmake
---

# Overview

**cmake** is a cross-platform tool for building applications. It is commonly used with C and C++. The program is configured through CMakeLists.txt files, which reside in the source directories of the corresponding code.

{{< figure src="/images/2016/12/cmake-logo.png" width="383px" caption="The CMake logo."  >}}

The output of cmake is standard build/project files (e.g. Makefiles if targeting GNU make). These build files are then run using the standard build command to generate the final build files.

# Quick Syntax Overview

One thing that cmake does different from other "languages" is enforce that all variables passed into a function are linked by naming, rather than their order.

# Popular Generators (Build Systems)

cmake is commonly used to generate build files for:

* make
* Apple's XCode
* Eclipse
* Microsoft Visual Studio
* Ninja

cmake calls it's specific modules that convert cmake code into these various build systems **generators**.

# Setting Variables

Variables can be created and assigned in cmake with the set() function. e.g.

    ```cmake
    set(SOURCES foo.cpp)
    ```

This created a new variable called SOURCES .

set() may also be used to make a list variable. Each element in the list should be separated with a space.

    ```cmake    
    set(SOURCES foo1.cpp foo2.cpp)
    ```

set() can make normal, cache or environment variables. All the above examples are setting normal variables (this is the default).

Normal variables are visible to the CMakeLists.txt file they are set in, and also everything called from there (add_subdirectory(), include(), macro() and function()).

You can also set properties.

# Adding Sub-directories

Use add_subdirectory() to add a directory which contains another CMakeLists.txt and code that requires building. It has the following syntax:

    ```cmake    
    add_subdirectory(<folder_path>)
    ```

If `<folder_path>` is relative, it will be relative to the CMakeLists.txt file which called this function. But, it can also be absolute (in which case add_subdirectory() is somewhat of a misnomer).

# Adding Libraries

Libraries can be added with:

    ```cmake    
    add_library(<name> [STATIC | SHARED | MODULE]
    [EXCLUDE_FROM_ALL]
    source1 [source2 ...])
    ```

For example, the following command creates a static library called my_library from the source file src.cpp.

    ```cmake    
    add_library(my_library STATIC src.cpp)
    ```

The library name must be a new name which is unique in the project. target_link_libraries() can be used after add_library() to specify what other libraries this newly created library needs linking to.

# Linking Libraries

Once libraries have been added with add_library(), they need to be linked. This is normally done with target_link_libraries() or just link_libraries() (the former option is preferred).

link_libraries() causes all proceeding targets in the CMakeLists.txt to be linked to this library.

# Copying Files

Files can be copied as part of the build process using the following syntax:

    ```cmake    
    file(COPY files... DESTINATION <dir>)
    ```

You can specify glob or regex patterns to copy only certain files. The following example will only copy header files (.h):

    ```cmake
    install(DIRECTORY src/ DESTINATION include/myproj
    FILES_MATCHING PATTERN "*.h")
    ```

# Adding Preprocessor Definitions

Preprocessor definitions can be added by using the following cmake command:
    
    add_definitions(-DMY_DEF_1 -DMY_DEF2)

The add_definitions command can actually be used to add any compiler flags, but is intended for adding definitions (flags that begin with -D) only.

This command add the flags to all sources in the current directory and below.

# add_custom_target()

Custom targets are always built. Because there is no output file, they are considered always out-of-date, and are always re-built.

# add_custom_command()

add_custom_command() is used specify how to make the defined OUTPUT files, based on command-line(s) COMMAND.

add_custom_target() is commonly used at the same time as add_custom_command().

The .stamp file extension is commonly used to create empty placeholder files as the OUTPUT of add_custom_command(). These files can then be used as dependents for other build targets.

# Cache

cmake creates a global cache called CMakeCache.txt which is created at root level of the build folder.

The cache can be used to create and store variables which have global and persistent scope. This means they can be read/set by any CMakeLists.txt file in the project, and they keep their previous value between successive cmake calls.

# Maths

Basic maths (addition, subtraction, e.t.c) can be done in a CMakeLists.txt file via the math() function. e.g. to increment a counter we would use the syntax:

    math(EXPR count "${count} + 1")

EXPR is to tell cmake you wish to evaluate the expression. It is currently the only supported mathematical operation.

# Adding .cmake Files

You can use the include() function to include .cmake file code into your CMakeLists.txt file. cmake will scan CMAKE_MODULE_PATH to look for .cmake files.

# Running cmake

This completely depends on the structure of the source code you are building, but in general, something close to the example below will be followed.
    
    mkdir build
    cd build/
    cmake ..
    make

This is of course assuming an out-of-source build setup (the recommended approach!). This standard way of building is used by [OpenCV](http://opencv.org/).
