---
authors: [ "Geoffrey Hunter" ]
date: 2016-06-14
draft: false
title: Guava EventBus
type: page
---

## Overview

The Guava EventBus is a Java library owned by Google. It is a event broadcasting system which implements an event/listener pattern.

## Advantages

* Provides a mechanism for loose coupling between objects.

## Disadvantages

* No returns codes/status/exceptions can be returned from `eventBus.post()`. This is an advantage that the observer pattern has over an event bus, as it can return values/catch exceptions.

## Exceptions

Exceptions thrown by event handlers will not be caught by the function which called `eventBus.post()`.

Exception support has been discussed in [Issue 766 in the Guava GitHub repository](https://github.com/google/guava/issues/766).
