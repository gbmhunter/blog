---
author: gbmhunter
date: 2014-09-24 21:48:35+00:00
draft: false
title: awk
type: page
url: /programming/operating-systems/linux/programs/awk
---

# Overview




awk is a UNIX-based program that is used to scan and modify text files. It commonly used to find and replace text in one or many files at once.




It could be seen as a more powerful version of [sed](http://blog.mbedded.ninja/programming/operating-systems/linux/programs/sed), with a fuller programming language and better support for variables.




Note: If you just want to search for text, and have no desire to edit it, it might be better (and safer!) to just use grep instead.




# Basic Syntax




The basic syntax for a simple awk command follows:



    
    awk 'awk commands here' file.txt




Strings can be embedded within the 'awk commands here' section by using double quotes, e.g.:




awk 'awk_func("a string");' file.txt




# Find And Replace




To replace all occurrences of old_world with new_world in file.txt:



    
    awk '{gsub(/old_word/, "new_word")}; file.txt'




Using gsub (global substitution) instead of just sub will mean that all instances of old_world will be replaced.
