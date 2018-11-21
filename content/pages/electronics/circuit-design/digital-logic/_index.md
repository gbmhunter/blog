---
author: gbmhunter
date: 2012-08-06 00:02:09+00:00
draft: false
title: Digital Logic
type: page
url: /electronics/circuit-design/digital-logic
---

[mathjax]




# Overview




Digital logic is the study and application of the fundamentals in digital (binary) electronics, e.g. gates, flip-flops, state machines.




# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Karnaugh Maps




Karnaugh maps are a way of simplifing combinational logic, often used before realising a combination equation into a number of gates to reduce the complexity.




# Logic Simulators




[CEDAR Logic Simulator](http://sourceforge.net/projects/cedarlogic/) is my personal favourite. Free, easy to use, colours the wires depending on their state, and allows for named nets as well as direct connections.




# Example Logic Circuits




## 6-State Binary Counter




Category: Counter  

 Expression Style: Sum of Products  

 No. of Gates: 14  

 No. of Flip-flops:  3  

 1-Bit Inputs: 2 + reset  

 1-Bit Outputs: 3  

 Tested On:





	  * Simulation: Yes ([CEDAR Logic Simulator](http://sourceforge.net/projects/cedarlogic/))
	  * Hardware: Yes



Downloads: [CEDAR Logic Simulator File](https://docs.google.com/open?id=0B9GgsT_bUc27SW5sTGZDSlhWQkU)







The 6-state binary counter is a counter which counts from 000 to 101 in the normal binary fashion before resetting back to 0. The output increments on every rising-edge of the count pulse, and the direction pin (upNDown) determines the count direction (when upNDown = 1, the counter goes from 000 to 101, when upNDown is 0 the counter goes from 101 to 000).




The flip-flop equations expressed as sums of products are:




$$  

Q_2 = \bar{Q_2}.\bar{Q_1}.\bar{Q_0}.\bar{y} + \bar{Q_2}.Q_1.Q_0.y + Q_2.\bar{Q_1}.Q_0.\bar{y} + Q_2.\bar{Q_1}.\bar{Q_0}.y \\ \\  

 Q_1 = \bar{Q_2}.\bar{Q_1}.Q_0.y + \bar{Q_2}.Q_1.\bar{Q_0}.y + \bar{Q_2}.Q_1.Q_0.\bar{y} + Q_2.\bar{Q_1}.\bar{Q_0}.\bar{y} \\ \\  

 Q_0 = \bar{Q_2}.\bar{Q_0} + Q_2.\bar{Q_1}.\bar{Q_0} \\ \\  

$$





[caption id="attachment_14065" align="aligncenter" width="777"][![](http://blog.mbedded.ninja/wp-content/uploads/2012/08/digital-logic-counter-six-state-binary.png)
](http://blog.mbedded.ninja/wp-content/uploads/2012/08/digital-logic-counter-six-state-binary.png) Schematic of a six state binary counter.[/caption]


## 3-Bit Grey Encoded Counter




Category: Counter  

 Expression Style: Sum of Products  

 No. of Gates: 14  

 No. of Flip-flops: 3  

 1-Bit Inputs: 2 + reset  

 1-Bit Outputs: 3  

 Tested On:





	  * Simulation: Yes ([CEDAR Logic Simulator](http://sourceforge.net/projects/cedarlogic/))
	  * Hardware: Yes



Download: [CEDAR Logic Simulator File](https://docs.google.com/open?id=0B9GgsT_bUc27REVITzhmQk9DMk0)




The 3-Bit Grey Encoded Counter is a counter that counts from 0 to 7 in binary in a grey encoded fashion. The counter increments on every rising edge of the bit 'count' and the direction bit 'upNDown' determines the direction of counting.


[caption id="attachment_14066" align="aligncenter" width="781"][![](http://blog.mbedded.ninja/wp-content/uploads/2012/08/digital-logic-counter-three-bit-grey-encoded-binary.png)
](http://blog.mbedded.ninja/wp-content/uploads/2012/08/digital-logic-counter-three-bit-grey-encoded-binary.png) Schematic of a three-bit Grey encoded binary counter.[/caption]


## Quadrature Detection Circuit




This quadrature detection circuit is built entirely in hardware, and only uses one flip-flop. It is useful for detecting the direction that an encoder that outputs quadrature signals is spinning in. Potential applications include [BLDC motor control](http://blog.mbedded.ninja/electronics/circuit-design/bldc-motor-control). This circuit can be built entirely in [reconfigurable PSoC on-chip logic](http://blog.mbedded.ninja/programming/microcontrollers/psoc).




When the encoder is spinning in one direction, the output will be logic high (1), when it is spinning in the opposite direction, it will be logic low (0).


[caption id="attachment_14067" align="aligncenter" width="623"][![](http://blog.mbedded.ninja/wp-content/uploads/2012/08/quadrature-phase-detection-circuit.png)
](http://blog.mbedded.ninja/wp-content/uploads/2012/08/quadrature-phase-detection-circuit.png) A simple quadrature phase detection circuit using a D flip-flop.[/caption]


## Delay Circuit




A simple delay circuit can be made just by chaining DQ flip-flops together in series (the output of one feeds the input of another). For every flip-flop, the signal will be delayed by one clock-cycle (assuming they all share the same clock source).


[caption id="attachment_14068" align="aligncenter" width="880"][![](http://blog.mbedded.ninja/wp-content/uploads/2012/08/four-clock-cycle-delay-element-from-flipflops.png)
](http://blog.mbedded.ninja/wp-content/uploads/2012/08/four-clock-cycle-delay-element-from-flipflops.png) A simple four clock-cycle delay element made from four DQ flip-flops. This can be used as a simple timer.[/caption]


This can be used to make a simple timer. Obviously, a limitation is that a flip-flop is needed for every clock cycle of delay needed (try that with a 1000 clock cycle delay!). More advanced timers use binary encoding with the flip-flops to achieve a greater number of states for a lower number of flip-flops.
