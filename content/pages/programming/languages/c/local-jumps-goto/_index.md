---
author: gbmhunter
date: 2014-01-24 22:35:53+00:00
draft: false
title: Local Jumps (goto)
type: page
url: /programming/languages/c/local-jumps-goto
---

# Overview

The label operator (:) and goto statement in C allows you to perform local jumps. A local jump is a jump in code execution within the same function. This is opposed to non-local jumps, which can jump between functions (setjmp() and longjmp()). The reason jumps are split into two categories is that local jumps are "easier" for the user/compiler to handle, because the stack does not need to be saved/switched.

# C Supports URL's, Wait What?

Did you know that:

```c
http://www.google.com
```

 is valid syntax in C? Wait, what? O.K., I was lying, C doesn't support URL's, but the syntax is still valid! What it actually represents is a label (http:), followed by a single-line comment (//www.google.com).
