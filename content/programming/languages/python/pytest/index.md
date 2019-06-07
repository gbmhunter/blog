---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-06-05
draft: false
lastmod: 2019-06-05
tags: [ "programming", "programming languages", "Python" ]
title: "pytest"
type: "page"
---

## Overview

`pytest` is a program/framework for running Python tests.

## Jenkins

`pytest` has the ability to generate `junit.xml` files which are used by Jenkins to display the test results.

You can provide the `--junitxml <path>` option to `pytest` and it will generate the file for you:

```sh
$ pytest --junitxml /test_output/results.xml
```

## Marks



xfail

## conftest.py

## Invocation And Command-Line Arguments

-k: Match against test name substrings.