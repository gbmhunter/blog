---
author: gbmhunter
date: 2016-07-26 03:43:36+00:00
draft: false
title: Thread Safety (Concurrency)
type: page
url: /programming/languages/java/thread-safety-concurrency
---

## Overview

Thread safety is largely built into the Java language, either via specialised keywords such as synchronized or via standard library objects.

## synchronized

The synchronized keyword (recognised by the Java compiler) can be used to enforce synchronous access (i.e. non-concurrent) to class methods.

It is a quick tool to reach for if you have basic concurrency issues.
