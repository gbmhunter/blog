---
author: gbmhunter
date: 2014-12-02 20:51:23+00:00
draft: false
title: Linkage
type: page
url: /programming/languages/c/linkage
---

# The extern Keyword




The extern  keyword is a linkage modifier that has different meanings in different contexts. In C++, when used it the form extern "C", it can be used to declare functions and variables which should have C linkage.




extern is not normally used in function definitions/declarations.




With variables, extern is normally used in-front of a variable declaration to declare that it is defined elsewhere (this will stop the compiler from trying to look for it, and save this for the linker step).




Inline functions have special rules on what the word extern means.
