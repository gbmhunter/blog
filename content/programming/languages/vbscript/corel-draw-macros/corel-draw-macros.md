---
author: gbmhunter
date: 2015-12-28
draft: false
title: Corel Draw Macros
type: page
---

Corel Draw supports macros written in the VBA (Visual Basic for Applications) programming language, much like Microsoft Excel and Word do.

Corel Draw uses an integrated Microsoft Visual Basic IDE for macro editing. The editor allows you to create UI forms using the traditional drag'n'drop style UI editor.

## .gms Files

Corel Draw macro code is saved in files with the extension .gms. A .gms file is a Corel Draw macro project file, which is a single file which can contain many code modules. Global macros, which you wish to be accessible from any CorelDRAW instance, must be placed in a specific user data folder. In Windows 8, the location is:
    
```text
C:\Users\<YourName>\AppData\Roaming\Corel\CorelDRAW Graphics Suite <X5>\Draw\GMS
```

where `<UserName>` is your Windows user name and `<X5>` may be replaced with X5, X6 or X7 depending on your version of CorelDraw.

## The Main Object

In CorelDRAW, all objects are a child (or grandchild) of the Application object.

The Application object contains all Document objects as well as all Window objects.

## Creating New Corel Draw Documents

An empty Corel Draw document can be created with the code:

`Application.CreateDocument`

This is created in a new Corel Draw window.

Most indexes to items in a collection begin with the number 1.
