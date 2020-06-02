---
author: "gbmhunter"
categories: [ "Programming", "Virtual Machines And Containers" ]
date: 2020-05-25
description: "A tutorial on KVM, a virtualization tool for Linux."
draft: false
lastmod: 2020-06-02
tags: [ "programming", "virtual machines", "KVM", "Linux", "client", "host", "Windows" ]
title: "KVM"
type: "page"
---

## Overview

KVM (Kernel-based Virtual Machine) is a virtualization tool for Linux. KVM can be used to run virtual machines on Linux, in which the client operating system is typically either Linux or Windows.

## Unable To Connect To libvirt

If you get the following error:

{{% img src="kvm-unable-to-connect-to-libvirt.png" width="500px" caption="Screenshot of the 'Unable to connect to libvirt' error in KVM." %}}

It is probably because the current user does not belong to the `libvirt` group. Type `groups` to see what groups the user currently belongs to. 