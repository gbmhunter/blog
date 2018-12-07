---
author: gbmhunter
date: 2016-11-05 11:15:02+00:00
draft: false
title: CSS Styling
type: page
url: /programming/languages/java/javafx/css-styling
---

# Overview

JavaFX-based UI objects can be styled using CSS files (similar to how HTML objects can be styled). Note that the CSS attribute names are normally different to those used to style HTML. However, most are just the equivalent for HTML with an added -fx-  prefix.

# Height And Width

Please note that the width and height properties of UI objects are read only (i.e. you cannot set them). They reflect the current ACTUAL width and height of the object. The width and height of an UI object maybe manipulated by setting the minWidth, prefWidth, maxWidth (ditto for height) properties.

CSS styling can be used by applying it to a JavaFX Scene object, using the following code within a .java file:

```java    
myScene.getStylesheets().add(getClass().getResource("style.css").toExternalForm());
```

# Background

The background of JavaFX nodes can be styled using a variety of -fx-background-XXX properties.

## Basic Colour

A basic, single-tone colour can be applied to a JavaFX node with:

```css    
-fx-background-color: red;
```

or by using hex:

```css    
-fx-background-color: #FF0000;
```

You can also provide multiple values to the background colour property. The following code gives the node a button-like appearance:

```css    
-fx-background-color: 
        -fx-shadow-highlight-color, 
        -fx-outer-border, 
        -fx-inner-border, 
        -fx-body-color;
```

`-fx-shadow-highlight-color` and all the other values used above are predefined by JavaFX.

## Colour Gradient

A colour gradient can be set with:

```css    
-fx-background-color: linear-gradient(to right, #000000, #FFFFFF);
```

You will probably want to choose something more subtle than a solid white to black gradient!
