---
author: gbmhunter
date: 2017-05-25 21:34:56+00:00
draft: false
title: CLion
type: page
url: /programming/integrated-development-environments-ides/clion
---

# Overview




CLion is an C/C++ IDE developed by JetBrains. Unlike Intelli IDEA, it has no free/community edition (although free open source licenses are available on a case-by-case basis).



{{< figure src="/images/2017/05/clion-logo.png" width="304px" caption="The CLion logo."  >}}



# Performance




In my experience, CLion runs smoothly relative to other C/C++ IDE's, even when running inside a resource constrained virtual machine. It manages to provide context dependent auto-complete relatively quickly after typing the start of a variable.




# Keyboard Shortcuts




**Navigation**




Alt-Left or Alt-Right: Toggle between open tabs inside CLion.




Ctrl-Tab: Open up the "Switcher", which allows you to change tabs easily! (similar to Alt-Tab on Windows).




Ctrl-Alt-Home: Toggle between C++ class and header files.




**Code**




Ctrl-F9: Build. Only applicable if current run configuration supports a build step.




Ctrl-Shift-I: Inspect the object at the current cursor position. This will usually open up documentation for the object.




# GDB Remote Debugging




CLion supports remote debugging using gdb (along with gdbserver). Remote debugging is useful when cross-compiling for a target that is not the same as your development computer. This can include firmware/software for microcontrollers and embedded Linux targets.




# Refactoring Does Not Work




If you find you cannot refactor C++ objects in CLion, it may be because your CMakeLists.txt is not including the header files.




Typically, you do not reference the individual header files in the CMakeLists.txt file. Instead, you use include_directories() to include a base directory, and then your code uses #include directives relative to that.




However, CLion seems to need the individual header files referenced within a CMakeLists.txt for refactoring to work correctly. You can fix this problem by making sure all relevant header files are included with the source files when you make a library. This can either be done by mentioning them explicitly, or using a glob pattern.



