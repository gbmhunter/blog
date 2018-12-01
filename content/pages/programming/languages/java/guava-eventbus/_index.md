---
author: gbmhunter
date: 2016-06-14 22:28:44+00:00
draft: false
title: Guava EventBus
type: page
url: /programming/languages/java/guava-eventbus
---

# Overview

The Guava EventBus is a Java library owned by Google. It is a event broadcasting system which implements an event/listener pattern.

# Advantages

* Provides a mechanism for loose coupling between objects.

# Disadvantages

* No returns codes/status/exceptions can be returned from eventBus.post(). This is an advantage that the oberserver pattern has over an event bus, as it can return values/catch excpetions.

# Exceptions

Exceptions thrown by event handlers will not be caught by the function which called eventBus.post().

Exception support has been discussed in [Issue 766 in the Guava GitHub repository](https://github.com/google/guava/issues/766).
