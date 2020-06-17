---
author: "gbmhunter"
date: 2020-06-16
description: "KiCAD tips and tricks."
categories: [ "Electronics", "General" ]
lastmod: 2020-06-16
tags: [ "electronics", "KiCAD", "CAD" ]
title: "KiCAD Tips And Tricks"
type: "page"
---

{{% warning-is-notes %}}

## Library Version Control

Because KiCAD stores symbol and footprint libraries as plain text files, they generally play well with version control systems such as git.

## Symbol Alias

You can add symbol alias to any KiCAD symbol. A symbol alias will create another entry in the symbol library under a different name. However both symbol names will reference the same symbol design.

{{% img src="kicad-symbol-library-alias-syntax.png" width="600px" caption="Opening up the KiCAD symbol library in a text editor reveals the syntax used for creating symbol aliases." %}}
