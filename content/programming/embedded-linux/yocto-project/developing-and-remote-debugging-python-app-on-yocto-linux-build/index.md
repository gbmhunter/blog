---
authors: [ "Geoffrey Hunter" ]
date: 2017-04-28
draft: false
title: Developing And Remote Debugging Python App On Yocto Linux Build
type: page
---

## Overview

This tutorial uses PyCharm as the IDE.

## Adding Python, SSH and sudo To The Linux Image

First, you will need to make sure all the right stuff is installed on the Linux image you build using Yocto. We wiTo do this, add the following line to your `build/conf/local.conf` file:

```
IMAGE_INSTALL_append = " python-modules"
IMAGE_INSTALL_append = " sudo"
EXTRA_IMAGE_FEATURES += " ssh-server-openssh "
```

Then use the `bitbake ...` command to re-build your image, load it up on your embedded device, and make sure than python is installed by running the command:

```
python -version
```

## Add Password To Root User

While you are still logged into the embedded device, set up a password for `root`. PyCharm requires a password, otherwise it gets a little buggy further down the track. To do this, use the command:

```
passwd root
```

Enter a password in at the prompt.

## Setup Deployment In PyCharm

In PyCharm, click Tools->Deployment->Configuration. Click the + to create a new deployment entry.

Set the type to SFTP. Set the SFTP host to the IP address of your embedded device (you can use `ifconfig` on the embedded device to find out what it's IP address is). Enter in the embedded device's username and password (username is typically root, password is whatever you set above).

Click "Autodetect" to find out what the root path should be. On my embedded device, the root path was `/home/root`.

## Add Remote Interpreter To PyCharm

Now we need to setup PyCharm. Create a new project called helloworld for testing purposes. Click File->Settings->Project: helloworld->Project Interpreter.

Since we setup the deployment first, PyCharm should recognize that Python is installed on the embedded device and provide it's interpreter as an option.
