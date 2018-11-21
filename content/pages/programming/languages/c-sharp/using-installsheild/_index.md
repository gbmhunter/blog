---
author: gbmhunter
date: 2013-07-31 00:23:55+00:00
draft: false
title: Using InstallSheild
type: page
url: /programming/languages/c-sharp/using-installsheild
---

# Overview


This page is all about using InstallShield with Visual Studio projects to create installable setup files for the user to use.


# Creating A Single setup.exe


For smaller projects and things that will be downloaded over the internet, you'll most likely want to create a single file called setup.exe or similar that users can run to install the program. This is not the default way to do things with InstallShield, so you have to configure it to make this happen.

The key part, once you've created an InstallShield project in your solution, is to go to the Visual Studio Configuration Manager window and change the build configuration for the InstallShield project to "SingleImage".

[singlepic id=1167 w=600 h=600 float=center template=caption]


# Version Numbers


The product version must follow the syntax aaa.bbb.ccccc where the aaa is the major version number, bbb is the minor version number, and ccccc is the build number. You are limited to a maximum number of 255 (unsigned 8-bit) for both aaa and bbb, and a maximum number of 65,535 (unsigned 16-bit) for ccccc. You can include a fourth field, dddd, but the InstallShield does not use it.


# Upgrading From Older Versions


By default, if you try and install a newer version of your install package on a system, the InstallShield will throw the error "Another version of this product is installed. Installation cannot continue.".

[singlepic id=1165 w=450 h=450 float=center template=caption]

To change this so that newer versions will update or replace files from the older version, you have to make sure of two things.



	  1. You have a upgrade path.

[singlepic id=1166 w=800 h=500 float=center template=caption]
	  2. You generate a new "Product Code" everytime you want the application to update. **Note that this is different to the Product Version**, which is a smaller, user-generated number (e.g. 1.2.3), rather than the longer computer-generated Product Code.

[singlepic id=1169 w=700 h=300 float=center template=caption]




# Using The Command-Line


You can build a release from the command line by using ISCmdBld.exe for both Windows Installer and InstallScript projects.


## Non-optional Options


<table style="width: 500px;" border="0" >
<tbody >
<tr >

<td >-p "path"
</td>

<td >Path to the .ism file you wish to build.
</td>
</tr>
<tr >

<td >-r "name"
</td>

<td >The name of the release.
</td>
</tr>
<tr >

<td >-a "build xxx"
</td>

<td >The build configuration.
</td>
</tr>
</tbody>
</table>


## Optional Options


<table style="width: 500px;" border="0" >
<tbody >
<tr >

<td >-y "1.0.5"
</td>

<td >Specify the version number. This is really helpful if you wish to increment the build number automatically!
</td>
</tr>
<tr >

<td >
</td>

<td >
</td>
</tr>
</tbody>
</table>


# Launching Program On Install


By default, if you select the option to allow the user to launch program on install, the checkbox will not work.

[singlepic id=1170 w=500 h=600 float=center template=caption]
