---
author: gbmhunter
date: 2014-02-24 04:21:06+00:00
draft: false
title: Fixed-Displacement Pumps
type: page
url: /mechanical/fixed-displacement-pumps
---





However "fixed" fixed displacement pumps are, you can still have a small variation in volume per cycle depending on the speed the motor is going at. This can be problematic when trying to work out the flow rate by measuring the number of cycles the pump does.





One way to compensate for this is to linearly adjust the volume/cycle constant based on the current speed of the motor (it's cycles per second). Assuming two calibration points, you can use the following equation:





$${\rm Flow} = [k_{min} + (\frac{\omega_{curr} - \omega_{k_{min}}}{\omega_{k_{max}} - \omega_{k_{min}}})(k_{max} - k_{max})] \times \omega_{curr}$$





	where:  

	\( {\rm Flow} \) = the flow of fluid, \( \rm L/s \)
	\( k_{min} \) = the volume/cycle constant measured at a minimum speed, \( L/cycle \)  

	\( k_{max} \) = the volume/cycle constant measured at a maximum speed, \( L/cycle \)  

	\( \omega_{k_{min}} \) = the speed of the motor at which \( k_{min} \) was measured, \( cycles/s \)  

	\( \omega_{k_{max}} \) = the speed of the motor at which \( k_{min} \) was measured, \( cycles/s \)  

	\( \omega_{curr} \) = the current speed of the motor, \( cycles/s \)  







This requires you to do two calibration points, one at a minimum speed, and one at a maximum speed. At each calibration point you need to calculate \( k \), which is the volume per speed (or cycle). This can be measured by timing how long it takes for a fixed amount of fluid to go through the pump, while also measuring the number of cycles.
