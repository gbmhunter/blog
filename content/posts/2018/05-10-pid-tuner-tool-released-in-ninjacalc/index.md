---
author: "gbmhunter"
date: 2018-05-10
draft: false
title: "PID Tuner Tool Released In NinjaCalc"
type: "post"
categories:
- NinjaCalc
tags:
- controller
- jet engine
- mass/spring/damper
- NinjaCalc
- PID
- process
- simulation
- system
- tool
- tune
---

[NinjaCalc has a new tool, a PID tuner!](http://ninja-calc.mbedded.ninja/tool/pid-tuner) This PID tuner tool can be used to simulate/tune a PID controller, which is commonly used in industry to control things such as temperature, flow rates, speeds and all sorts of other things!

This PID tuner tool comes with two predefined processes that you can simulate/tune, a mass/spring/damper and R/C jet engine process. It also allows you to configure you own process to simulate/tune, via an editable JavaScript object.

<div style="width:100%;height:0;padding-bottom:66%;position:relative;"><iframe src="https://giphy.com/embed/kv7upS6SsijqjoX5F4" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/kv7upS6SsijqjoX5F4">via GIPHY</a></p>

Once you click the "Start" button, the PID tuner tool simulates the process and shows you the response of the process and PID controller. You can dynamically change the P, I and D terms of the PID controller while the simulation is running and see how this affects the response of the controller.

The PID tuner tool can be found [here](http://ninja-calc.mbedded.ninja/tool/pid-tuner).

More information on PID Controllers can be found on the [PID Control page](/programming/general/pid-control).