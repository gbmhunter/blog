---
authors: [ "Geoffrey Hunter" ]
date: 2013-07-31
draft: false
title: Using InstallSheild
type: page
---

## Overview

This page is all about using InstallShield with Visual Studio projects to create installable setup files for the user to use.

## Creating A Single setup.exe

For smaller projects and things that will be downloaded over the internet, you'll most likely want to create a single file called setup.exe or similar that users can run to install the program. This is not the default way to do things with InstallShield, so you have to configure it to make this happen.

The key part, once you've created an InstallShield project in your solution, is to go to the Visual Studio Configuration Manager window and change the build configuration for the InstallShield project to "SingleImage".

{{< figure src="/images/programming-csharp/visual-studio-config-manager-window-single-image.png" caption="Making InstallShield produce a single file output install (e.g. setup.exe) in the Visual Studio configuration manager."  width="600px" >}}

## Version Numbers

The product version must follow the syntax aaa.bbb.ccccc where the aaa is the major version number, bbb is the minor version number, and ccccc is the build number. You are limited to a maximum number of 255 (unsigned 8-bit) for both aaa and bbb, and a maximum number of 65,535 (unsigned 16-bit) for ccccc. You can include a fourth field, dddd, but the InstallShield does not use it.

## Upgrading From Older Versions

By default, if you try and install a newer version of your install package on a system, the InstallShield will throw the error "Another version of this product is installed. Installation cannot continue.".

{{< figure src="/images/programming-csharp/another-version-is-installed-error-from-install-shield.png" caption="The 'Another version is installed' error that InstallShield gives you if you haven't set the updates up correctly."  width="450px" >}}

To change this so that newer versions will update or replace files from the older version, you have to make sure of two things.

1. You have a upgrade path.

	{{< figure src="/images/programming-csharp/install-shield-adding-new-upgrade-path.png" caption="Adding a new update path, so newer versions of the program will install over older versions."  width="800px" >}}

2. You generate a new "Product Code" everytime you want the application to update. **Note that this is different to the Product Version**, which is a smaller, user-generated number (e.g. 1.2.3), rather than the longer computer-generated Product Code.

	{{< figure src="/images/programming-misc/change-product-code-not-upgrade-code-install-shield.png" caption="If you want a install to replace/upgrade and older one, make sure to re-generate a different product code (the circled number)."  width="700px" >}}

## Using The Command-Line

You can build a release from the command line by using ISCmdBld.exe for both Windows Installer and InstallScript projects.

## Non-optional Options

<table>
  <tbody>
    <tr>
      <td><code>-p "path"</code></td>
      <td>Path to the .ism file you wish to build.</td>
    </tr>
    <tr>
      <td><code>-r "name"</code></td>
      <td>The name of the release.</td>
    </tr>
    <tr>
      <td><code>-a "build xxx"</code></td>
      <td>The build configuration.</td>
    </tr>
  </tbody>
</table>

## Optional Options

<table>
  <tbody>
    <tr>
      <td><code>-y "1.0.5"</code></td>
      <td>Specify the version number. This is really helpful if you wish to increment the build number automatically!
    </td>
    </tr>
  </tbody>
</table>

## Launching Program On Install

By default, if you select the option to allow the user to launch program on install, the checkbox will not work.

{{< figure src="/images/programming-misc/install-shield-launch-this-program-end-of-installation.png" caption="The option to allow the user to launch the program once the installation has finished. This normally doesn't work without tweaking a few settings."  width="500px" >}}
