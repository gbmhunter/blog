---
authors: [ "Geoffrey Hunter" ]
date: 2011-09-15
draft: false
title: JavaScript
type: page
---

## Overview

JavaScript was originally developed to determine what browser a web page was loading on. It is commonly referred to as the language which was "designed in a weekend" or "designed in 2 weeks" (both which are partial truths).

The most common use for JavaScript today is to enrich basic HTML webpages, as well as run back-end server tasks with a platform such as node.js. It can also be used to develop desktop applications with a platform such as nw.js or electron.

## Adding JavaScript Code In An HTML Page

There are two basic ways to add Javascript code into a web page. You can either:

**Include a JavaScript file (.js)**

```html    
<script type="text/javascript" src="myJavascriptFile.js"></script>
```

**Or include the JavaScript code directly into the web page:**

```html    
<script type="text/javascript">
    // Javascript goes here
</script>
```

If adding a standalone javascript file, you can use the keyword defer to tell the browser to wait until the rest of the page has loaded before loading the Javascript file.

```html    
<!-- When using HTML -->
<script type="text/javascript" src="myJavascriptFile.js" defer></script>

<!-- Or when using XHTML -->
<script type="text/javascript" src="myJavascriptFile.js" defer="defer"></script>
```

## Constants

Constants can't really be defined in JavaScript, at least not in the way you can in C and C++. One of the easiest workarounds is to just you all-uppercase variable names, like you would in C, so people will know that it shouldn't be changed.

```js    
var THIS_IS_A_CONSTANT = "I am a constant";

var ANOTHER_CONST = 2;
```

Chrome let's you declare constants, but they are not that useful as they are not multi-browser compatible.

```js    
// A chrome constant
const A_CHROME_CONST = "blah";
```

## Functions

You can return values from a function by using the return keyword.

```js    
function FuncWhichReturnsSingleVal()
{
    return 23;
}
```

You can return multiple values easily by creating an object on the fly (this is called an object literal).

```js    
function FuncWhichReturnsObject()
{
    return {
        val1: 23, 
        val2: false
    };  
}

// You then access the variables with...
var myObj = FuncWhichReturnsObject();
var myVal = myObj.val1;
var trueFalse = myObj.var2;
```

## Message Boxes

A simple message box can be created easily in JavaScript by using the `alert()` function.

```js    
// Show a simple message box
alert("This is a simple message box using alert().");
```

## The Console

Many browsers support writing to the console with the command `console.log()`, in a similar manner that you would use `printf` for C/C++ in a Linux environment. The added ability of `console.log()` is that it can be passed most objects, and these will be printed with their own `ToString()` method.

```js    
console.log('Printing a simple message to the console.");

// Printing a float
var float = 4.5;
console.log(float);

// Most objects can be printed
var randomObject;
console.log(randomObject);
```

## Strings

Strings can be defined with either the `"` or `'` character. Both are allowed, to distinguish between HTML strings and JavaScript strings when JavaScript is wrapped in HTML. In this case, you need to use the `'` character for JavaScript strings, and the `"` character for HTML strings.

## String To Number Conversion

You can use the native javascript function `parseFloat()`.

```js    
// Create a string which represents a double
var msg = "4.5";

// Convert string to an actual double
var convFloat = parseFloat(msg);
```

Note that there is no native `parseDouble()` function.

However, be careful! Javascript has some very weird implicit conversion rules, as highlighted below:

```js    
> '5' - 3
2 // weak typing + implicit conversions = headaches

> '5' + 3
'53' // Because we all love consistency

> '5' - '4'
1 // string - string = integer. What?

> '5' + + '5'
'55'

> 'foo' + + 'foo'
'fooNaN' // Marvelous

>'5' + - '2'
'5-2'

> '5' + - + - - + - - + + - + - + - + - - - '-2'
'52' // Apparently it's ok

> var x = 3;

> '5' + x - x
50

> '5' - x + x
5 // Because fuck math
```

Credit for the above goes to [https://i.imgur.com/6aclmM6.png](https://i.imgur.com/6aclmM6.png).

## The Maths Object

Like many languages, JavaScript has a Maths object which you can use to do basic mathematical operations with.

```js    
Math.LN10// = ln(10) = 2.303 (approx)
```