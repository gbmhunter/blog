---
author: gbmhunter
date: 2016-07-01 03:44:26+00:00
draft: false
title: Logging
type: page
url: /programming/languages/java/logging
---

# Overview

Java provides advanced logging functionality through the java.util.Logging class.

# Creating An Instance

It is common practise to declare a single (static) instance of a Logger per class. This technique also forgoes dependency injection.

The single parameter passed to the Logger constructor defines both the name and hierarchy for the Logger. It is common practise to use the fully qualified  class name for this purpose (e.g. myPackage.LoggingExample). An easy way to do this is to just use the method this.class.getName().
    
    // A class that is going to have logging capabilities
    public class LoggingExample {
    
       private static final Logger logger =
           Logger.getLogger(LoggingExample.class.getName());
    
    }

# Handlers

A Logger object actually passes all of it's logging data to a Handler object, which then outputs the log data to wherever it is needed.

A Handler object has it's own priority. Even though the Logger's level might be set to Level.ALL, if the Handler object's level is only set to Level.INFO, then the log data will never be "logged".

# Hierarchy And Record Forwarding 

Logger objects support (and are aware of) their hierarchy. Logger objects will send output log data (a LogRecord) to all attached handlers, **and to their parent (or higher ancestor) Logger object** (if any). This is called _record forwarding_.

The **parent Logger does not perform any level or filter checks**, but instead immediately forwards the LogRecord onto all of it's handlers, and any parent Logger objects.

# LogManager

The LogManager object is a central control room for all Logger objects within your application. Only one instance can exist, and can be obtained by calling:
    
    LogManager.getLogManager();

The LogManager object can be used to set all Logger objects within a certain package to a specific Level. 
