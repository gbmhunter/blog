---
author: gbmhunter
date: 2013-05-23 04:36:06+00:00
draft: false
title: Closing Your Application
type: page
url: /programming/languages/c-sharp/closing-your-application
---

# WPF

A common way to close the application is to use the following command:

```c#    
Application.Current.Shutdown();
```

However, although your main form will close, this can sometimes leave remnants (e.g. processes) running in the background. If this is happening, I have found that the following way exits everything:

```c# 
// The parameter is an exit code, use 0 if you
// are not concerned about this.
Environment.Exit(0);
```