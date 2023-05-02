---
authors: [ Geoffrey Hunter ]
categories: [ Programming ]
date: 2023-05-02
draft: false
lastmod: 2023-05-02
tags: [ Python, package, setuptools ]
title: How To Create A Python Package
type: page
---

## Overview

PEP 621 introduced the `pyproject.toml` method of specifying package metadata, including how to build the package.

A basic example of a `pyproject.toml` that tells pip to use `setuptools` to build the package:

```toml
[build-system]
requires = ["setuptools", "setuptools-scm"]
build-backend = "setuptools.build_meta"

[project]
name = "my_package"
authors = [
    {name = "My name", email = "my_email@abc.com"},
]
description = "My package description"
readme = "README.rst"
requires-python = ">=3.7"
```
