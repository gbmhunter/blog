---
author: gbmhunter
date: 2012-08-28 06:07:23+00:00
draft: false
title: Playing Around With The Kinect
type: post
url: /programming-2/playing-around-with-the-kinect-sdk
categories:
- Programming
tags:
- 3d
- c
- drivers
- embedded
- kinect
- mapping
- microsoft
- modelling
- open
- pc
- problems
- sdk
- source
- visual
- xbox
---

I got excited about 3D modelling and brought a Microsoft Kinect a few weeks ago. I choose to get the 'PC' version, even though it was $100+ more than the Xbox version, purely because it was touted that Microsoft engineers had worked had at making it better for hacking, and it had more features such as 'Close Up' mode (I'm beginning to regret this decision, see below).

Anyway, I installed the Microsoft SDK/drivers and within minutes I had a development platform in action for the Kinect. I wrote a small program in Visual C# Express using the provided API, and following [this tutorial](http://www.i-programmer.info/ebooks/practical-windows-kinect-in-c/4126-kinect-sdk1-a-3d-point-cloud.html), got a cool depth image of my room ('cool' being relative, this was the first day I had started playing with it).

{{< figure src="/images/programming-kinect/first-try-with-kinect.png"   width="600px" >}}

However, Microsoft puts a restriction on it's SDK, saying that the software must run on a PC running Windows. One thought in the back of my head was to one day make it run on an embedded linux system, so I had a crack at getting the 3rd party open-source drivers working. This involved many hours of messing around installing multiple programs in different orders, then trying different versions, and then trying to compile the drivers with a make command. It reminded me of the driver issues you used to get with Windows 95, and after about 5 hours I gave up.

I'm thinking that problems were arising because I was using the PC version rather than the Xbox version, which didn't have as much support. And it turns out I don't really need the extra features in the PC version for the 3D modelling applications I had in mind. Hmph...
