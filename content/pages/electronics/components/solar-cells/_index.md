---
author: gbmhunter
date: 2011-09-05 06:13:21+00:00
draft: false
title: Solar Cells
type: page

---

# The Peak Power Point

To draw the most power from the solar panel, a certain current must be drawn from the panel at a certain voltage. 0% power draw occurs when the voltage is maximum and current is nothing (open-circuit), and when the current is maximum and the voltage is nothing (short-circuit). 100% power draw occurs somewhere inbetween these limits. The relationship between voltage or current and percentage power draw increases quite linearly up to the maximum power point, but then drops of sharply in a very non-linear fashion. Therefor is good to err on the lower side of the maximum power point voltage and current, if you believe you can't stay at the maximum power point continuously.

The peak power point is usually specified as a voltage and current on the datasheet for the solar cell (multiply them together to get power), and is typically at a voltage around 80% of the open-circuit voltage (the open-circuit voltage and short-circuit current are also normally specified on the datasheet.

Many chip vendors have IC's that can perform maximum power point tracking (MPPT). Texas Instruments manufactur the [BQ24650](http://focus.ti.com/docs/prod/folders/print/bq24650.html), which performs MPPT using the fixed voltage technique. It accepts an input voltage range from 5 to 28V. Linear Technology produces MPPT tracking chips for lower voltages, including single cell applications (?500mV). Chips like their [LTC3105](http://www.linear.com/product/ltc3105) can operate down to 225mV!

# Partial Illumination

Partial shading of a photovoltaic system can cause dramatic reductions in output power, especially in a series configuration. In a series configuration, if one cells output is reduced because of shading, it limits the performance of all other cells in series to the same output power level, typical of a ‘bottleneck’ system.

Partially shading parallel cells does not cause the same bottleneck problem, and only limits the power output of the shaded cell.

# Surface Area Based Specific Power

This is a really good indicator on a particular model of solar panel. It rates the ability of a solar panel to convert solar energy into electrical energy, relative to the surface area of the panel. It is normally a better than the efficiency measurement because it takes into account the total surface area of the solar panel, which includes the frame, connections and any other places that don't do any energy.conversion. This is not normally specified! If so, it would typically be in mW/mm2. You can usually work it out, as long as they give you the dimensions the the unit, and the voltage and current and the peak power point.

# Operating Temperature Range

Since they are designed to operate in full-sunlight, they can operate in a wide range of temperatures, that is not normally specified on the datasheets. As the cell heats up, the max power point voltage decreases while the max power point current increases. However, overall the voltage drops proportionally more than the current increases, so that efficiency does drop as the photovoltaic cell heats up.

Some manufacturers/suppliers will specify the temperature coefficients of the solar panel. These specify the change in voltage, current and power for every change in degree temperature from nominal. Typical values are Vm = -0.34%/C, Im = 0.08%/C (notice how it is lower than the voltage coefficient), and Pm = -0.19%/C.

# Charging Batteries

Solar panels are commonly used on electronic products to charge secondary batteries which are then used to power the device.

If the floating battery voltage is matched well enough to the maximum power point voltage of the solar panel, you can use just a linear regulator to charge the batteries. The minimum energy loss is this setup would be the drop-out voltage of the regulator multiplied by the charging current.

# External Links


Alibaba - International Goods/Trading Site
[http://www.alibaba.com/](http://www.alibaba.com/)
Has a good range of photovoltaic cells from Asian suppliers

Sensors - Article: Using A Small Solar Cell And A Supercapacitor In A Wireless Sensor
[http://www.sensorsmag.com/networking-communications/energy-harvesting/using-a-small-solar-cell-and-a-supercapacitor-a-wireless-sen-7310](http://www.sensorsmag.com/networking-communications/energy-harvesting/using-a-small-solar-cell-and-a-supercapacitor-a-wireless-sen-7310)
Good article explaining a small wireless sensor system using a solar cell and supercapacitor. No MPPT is used.

Electropedia - Article: Solar Power (Technology and Economics)
URL: [http://www.mpoweruk.com/solar_power.htm](http://www.mpoweruk.com/solar_power.htm)
Very good article explaing solar irradiation, solar insolation, the avaliable solar energy to us, the variance due to earth rotation/tilt and panel technology backed up with helpful animated figures.
