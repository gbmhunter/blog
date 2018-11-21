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





[singlepic id=1138 w=800 h=800 float=center template=caption]





An analogy to electrical resistance...





[singlepic id=1184 w=800 h=800 float=center template=caption]





# Inaccuracies In The Thermal Resistance Model






	  * Thermal resistances assume a linear relationship between temperature and heat flow. This is only a first-order approximation.




# Heat Flow Calculator



[debug embedit snippet="heat-flow-calculator"]



# List Of Component Package Thermal Resistances





See the [Component Packages page](http://blog.mbedded.ninja/electronics/circuit-design/component-packages). This has many of the common component packages and their thermal resistances.





Below is a condensed list of experimentally found internal thermal resistances (junction-to-case).





[singlepic id=1185 w=500 h=500 float=center template=caption]
