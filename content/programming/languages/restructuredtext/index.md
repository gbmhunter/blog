---
author: gbmhunter
categories: [ "Programming", "Programming Languages" ]
date: 2013-08-21
draft: false
tags: [ "programming", "language", "ReStructuredText", "section", "title", "table", "example", "code", "software", "images" ]
title: ReStructuredText
type: page
---

## Overview

reStructuredText is a markup language for plain text. It is also called reST.

## Uses

Cloud-based repository hosts (e.g. GitHub, BitBucket) README's (but not as popular as Markdown).

## Section Headers

Section titles are described in reST by underlining or both underlining and overlining the section header text with a sequence of non-alphanumeric characters. Adding these characters is called an **adornment**.

Any character from the set `- ` : ' " ~ ^ _ * + # < >` may be used for the adornment.

You can nest section headers as much as you want, as long as you use a different character for the child and parent headers. The following example shows headers and child headers being declared.

```    
Chapter 1 Title
===============

Section 1.1 Title
-----------------

Subsection 1.1.1 Title
~~~~~~~~~~~~~~~~~~~~~~

Section 1.2 Title
-----------------

Chapter 2 Title
===============
```

Note that the document title and subtitle are handled slightly different from section headers.

## Tables

Two different table formats are supported.

## Images

Images can be embedded into the output by using the following image directive.

```    
.. image:: myPicture.png
```

The image URL can be either relative to the directory location of the ReStructuredText file or it can be an http URL.

## Examples

See any of my [GitHub repositories](https://github.com/gbmhunter) for a reST document in action (e.g. [https://github.com/gbmhunter/ClideCpp](https://github.com/gbmhunter/ClideCpp)).
