---
author: gbmhunter
date: 2013-10-11 03:13:06+00:00
draft: false
title: Using Connect
type: page
url: /programming/website-design/nodejs/using-connect
---

# Overview


Connect is a middleware framework for node. It contains a body parser, cookie manager, session management, static file server, query string parser, favicon server, and more.

The Express extension uses the Connect extension to provide some of it's functionality.


# Installation


To install Connect, you can use NPM (node package manager) with the following command:

    
    npm install connect




# Static File Server


One of Connects useful features is the ability to easily create a static file server. The most basic file server can be achieved with the following code:

    
    connect()
      .use(connect.static(__dirname + '/public'))


__dirname is a special variable which represents the current directory the code file is in.
