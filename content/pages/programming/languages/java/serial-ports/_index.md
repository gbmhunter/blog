---
author: gbmhunter
date: 2016-07-01 00:56:43+00:00
draft: false
title: Serial Ports
type: page
url: /programming/languages/java/serial-ports
---

# Overview

# Response Times

If you are used to designing on an embedded platform, you'll have to get used to much slower response times for Java-running serial ports.

Below is a breakdown of what response times are achievable when communicating with external devices using a serial port in Java. These times are measured from when the last byte of input data is received on the computer's serial port to when the first byte of data is sent from the computer's serial port.  * < 5ms: Not really possible  * 5-20ms: Achievable, but not really guaranteed.  * >20ms: Comms should work most of time. However, remember that on non-real-time systems such as Windows and standard Linux distributions that there is no absolute guarantee your message will be sent out in time.

# Summary of COM Port Libraries

## jSSC

(Java Simple Serial Communicator). It is said to be cleaner and less buggy than the RXTX library.

Some reported issues using jSSC with virtual COM ports on Linux systems.

It can be added to your project with the following Maven code:
    
    <!-- https://mvnrepository.com/artifact/org.scream3r/jssc -->
    <dependency>
        <groupId>org.scream3r</groupId>
        <artifactId>jssc</artifactId>
        <version>2.8.0</version>
    </dependency>

## RXTX

Just look at their fine example of a website...

{{< figure src="/images/2016/07/screenshot-java-serial-rxtx-website-front-page.png" width="1313px" caption="A screenshot of RXTX's (a Java comm port library) front page on their website. Dear god." caption-position="bottom" >}}

I hope you could tell I was being sarcastic.

## serial-comm
