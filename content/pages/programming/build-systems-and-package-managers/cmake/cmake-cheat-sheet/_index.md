---
author: gbmhunter
date: 2017-01-08 18:50:25+00:00
draft: false
title: cmake Cheat Sheet
type: page
url: /programming/build-systems-and-package-managers/cmake/cmake-cheat-sheet
---

# cmake Cheat Sheet




Below is a **cheat sheet for the most common statements** you will use in a CMakeLists.txt file!




**By no means is this a complete reference guide**, even for the mentioned functions (commonly they are just depicted in their most used form). For full documentation, see [https://cmake.org/documentation/](https://cmake.org/documentation/).




Sorted roughly by in which order you would use them (i.e. from compiling to linking).


<table >
<tbody >
<tr >

<td >**Function**
</td>

<td >**Explanation**
</td>
</tr>
<tr >

<td >set(srcs file1.c file2.c ...)
</td>

<td >Creates a variable (e.g. src ), and assigns something to it (e.g. the list file1.c file2.c). To clear a variable, do not provide second argument, e.g. set(srcs).
</td>
</tr>
<tr >

<td >include_directories(dir1 dir2 ...)
</td>

<td >Adds the provided directory paths to the compilers list of directories that it will search for include files in, for any following targets.
</td>
</tr>
<tr >

<td >add_library(name STATIC/SHARED/MODULE file1.c file2.c ...)
</td>

<td >Adds a library target that will be build from the provided source files. **DO NOT APPEND** lib_ to the name (this is done automatically by cmake depending on architecture).
</td>
</tr>
<tr >

<td >add_executable(name file1.c file2.c ...)
</td>

<td >Adds an executable target (as opposed to a library target).
</td>
</tr>
<tr >

<td >link_libraries(lib_1 lib_2 ...)
</td>

<td >Links the provided libraries to all following targets in the CMakeLists.txt file. This is deprecated. It is recommended you use target_link_libraries() instead.
</td>
</tr>
<tr >

<td >target_link_libraries(target_lib other_lib_1 other_lib_2 ...)
</td>

<td >Links the provided libraries to the specific target library. link_libraries() can be used to apply to libraries to all following targets (i.e. no specific target is provided), however, it is deprecated.
</td>
</tr>
<tr >

<td >install(TARGETS targets...)
</td>

<td >Used to place build output into certain directories on the user's system (as well as do things like assign privileges to these files).
</td>
</tr>
</tbody>
</table>
