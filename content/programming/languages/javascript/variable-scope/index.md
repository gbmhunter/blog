---
authors: [ "Geoffrey Hunter" ]
date: 2015-11-23
draft: false
title: Variable Scope
type: page
---

## Overview

Variable scope is a way to determining the lifespan of a variable in code.

## Function Scope

Function scope is given to a JavaScript variable with the var keyword.

```js
function myFunc() {
    var myVar = 8;
}

// myVar does not exist here
```

The above `myVar` variable cannot be accessed outside of the function `myFunc()`.

## Block Scope

As of EMCAScript 2015, JavaScript has block scoping capabilities. This is enabled with the introduction of the `let` keyword.
