---
author: gbmhunter
date: 2016-06-15 02:52:14+00:00
draft: false
title: Implementing The Observer Pattern In Java
type: page
url: /programming/languages/java/implementing-the-observer-pattern-in-java
---

# Overview

# Roll-Your-Own

The following examples shows you how to manually implement the Observer pattern in Java.
    
    // This is an interface, describing what method a Listener class
    // should contain
    public interface HelloListener {
       void notify(String msg);
    }
    
    // Let's make a class which listens to "Hello" events
    public class MyClass implements HelloListener {
       void notify(String msg) {
          System.out.println(msg);
       }
    }
    
    // Let's make a class which generates "Hello" events
    public class HelloEventGenerator {
    
       List<HelloListener> helloListeners = new ArrayList<HelloListener>();
    
       public void addHelloListener(HelloListener helloListener) {
          helloListeners.add(helloListener);
       }
    
       public void raiseEvent() {
          for(HelloListener helloListener : helloListeners) {
             helloListener.notify("Hello, world!);
          }
       }
    
    }

Since the interface is public, it has to be described in it's own file.

# java.util.Observer/Observable

The Java framework provides the java.lang.Observer and java.lang.Observable classes to standardise the way the observer pattern is implemented.

The problem is you can attach any Observer object to any Observable object, creating potential incorrect-type issues, especially when a project starts to grow in size.
