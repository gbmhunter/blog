---
author: gbmhunter
date: 2016-07-26
draft: false
title: Thread Safety (Concurrency)
type: page
---

## Overview

Thread safety is largely built into the Java language, either via specialised keywords such as synchronized or via standard library objects.

## synchronized

The synchronized keyword (recognised by the Java compiler) can be used to enforce synchronous access (i.e. non-concurrent) to class methods.

It is a quick tool to reach for if you have basic concurrency issues.
