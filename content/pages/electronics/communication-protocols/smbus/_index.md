---
author: gbmhunter
date: 2014-02-11 20:30:39+00:00
draft: false
title: SMBus
type: page
url: /electronics/communication-protocols/smbus
---

# Overview





SMBus is an acronym for **System Management Bus**. The SMBus is a derivative of the I2C bus, however there are enough changes that it warrants it's own page.





# Terminology



<table style="width:800px;" class="aligncenter" >
	<tbody >
		<tr >
			Term
			Description
		</tr>
		<tr >
			
<td >ACPI
</td>
			
<td >ACPI is an initialism for **Advanced Configuration And Power Interface**.
</td>
		<tr >
		<tr >
			
<td >CMI
</td>
			
<td >CMI is an initialism for **SMBus Control Method Interface**.
</td>
		<tr >
	</tbody>
</table>



# History





SMBus was originally created by Intel in 1995.





# Official Specifications





The official specifications for the SMBus can be found at [http://smbus.org/specs/](http://smbus.org/specs/).





# Comparison With I2C





## Simularities






	  * Both use pull-up resistors (or constant-current sources) with an open-drain drive methodology.
	  * Both use the names SCL and SDA to the clock and data lines, respectively.
	  * Both use a 7-bit address with a 1-bit read/write bit to determine what slave to communicate with.
	  * Most I2C devices can communicate with SMBus devices (see the section Compatibility With I2C).




## Differences






	  * The SMBus operates at frequencies between [latex]10-100kHz[/latex], while the I2C bus can reach into the [latex]MHz[/latex].
	  * SMBus devices are designed to that no leakage current occurs through SDA and SCL when the devices power is turned off.




# Compatibility With I2C





I2C and SMBus devices can communicate with each other in most situations. However, both devices have to operate within [latex]10-100kHz[/latex].
