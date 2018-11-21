---
author: gbmhunter
date: 2015-12-05 23:21:35+00:00
draft: false
title: Namespaces
type: page
url: /programming/languages/javascript/namespaces
---

# Overview

Unlike many object-orientated languages such as C++ and C#, namespaces are not natively supported in JavaScript.

However, they can be "faked" in a number of different ways. One of the easiest is to enclose everything within a variable:
    
    var fakeNamespace = {
    
        NamespaceFunc1: function() {
        },
    
        NamespaceFunc2: function() {
        }
    };
    
    // You then call functions within it using the following syntax
    fakeNamespace.NamespaceFunc1();

Notice though, you have to remember to include commas after every function or variable declaration. AND, you can't declare private objects. But it is the simplest solution.
