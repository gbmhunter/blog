---
author: gbmhunter
date: 2013-08-21 21:15:26+00:00
draft: false
title: Thermal Management
type: page
url: /electronics/circuit-design/thermal-management
---





# Thermal Resistance





Thermal resistance is way of modelling the thermal behaviour of an object in a way analogous to calculating the current through a resistor by measuring it's voltage.





The equation is given by:





$$P_D = \frac{\Delta T}{\sum R_\theta}$$



	where:  

	\( P_D \) = Power dissipated by device (\( W \))  

	\( \Delta T \) = Change in temperature between both end-points  

	\( \sum R_{\theta} \) = The sum of thermal resistances over which \( \Delta T \) exists  







Which is usually expanded (and used) as:





$$P_D = \frac{T_J - T_A}{R_{JC} + R_{CA}}$$





If there is a heatsink involved, a new term is added:





$$P_D = \frac{T_J - T_A}{R_{JC} + R_{CH} + R_{HA}}$$





{{< figure src="/images/electronics-misc/thermal-resistance-diagram-with-semiconductor.png" caption="A diagram showing how thermal resistance works. Image from http://www.aavid.com/sites/default/files/products/boardlevel/aavid-standard-heatsinks.pdf." caption-position="bottom" width="800px" >}}





An analogy to electrical resistance...





{{< figure src="/images/electronics-misc/analogy-of-thermal-resistance-to-electrical-resistance.png" caption="The analogy of thermal resistance to electrical resistance. Image from http://www.vishay.com/docs/28705/mc_pro.pdf." caption-position="bottom" width="800px" >}}





# Inaccuracies In The Thermal Resistance Model






	  * Thermal resistances assume a linear relationship between temperature and heat flow. This is only a first-order approximation.




# Heat Flow Calculator



[debug embedit snippet="heat-flow-calculator"]



# List Of Component Package Thermal Resistances





See the [Component Packages page](http://blog.mbedded.ninja/electronics/circuit-design/component-packages). This has many of the common component packages and their thermal resistances.





Below is a condensed list of experimentally found internal thermal resistances (junction-to-case).





{{< figure src="/images/electronics-misc/experimentally-determined-internal-thermal-resistances-for-smd-resistors.png" caption="Experimentally determined values for the internal thermal resistance (junction-to-case) for various sized SMD resistors. Image from http://www.vishay.com/docs/28705/mc_pro.pdf." caption-position="bottom" width="500px" >}}
