---
author: gbmhunter
date: 2017-05-05 01:24:56+00:00
draft: false
title: Using CMake With The SDK
type: page
url: /programming/embedded-linux/yocto-project/using-cmake-with-the-sdk
---

## Overview

Although Yocto seems to use Autotools more than CMake, you can easily configure a generated Yocto SDK to include all the neccessary tools so that you can build a targeted software application using CMake instead (which, IMO, is much better than Autotools).

## Add CMake To The Yocto SDK

This first thing is to add the CMake binary to the Yocto SDK. This version of CMake will be set up exactly as needed to build applications for your target architecture (which is typically not the same as your host/development system!).

Add the following line to your local.conf:

```
TOOLCHAIN_HOST_TASK += "nativesdk-cmake"
```

Then rebuild the SDK command with:

```sh    
~/poky/build$ bitbake core-image-minimal -c populate_sdk
```

Replacing core-image-minimal with a different target if needed.

## Install The New SDK

Now install the new SDK:

```sh    
~/poky/build/tmp/deploy/sdk$ ./<image-name>.sh
```

The new SDK should contain cmake.

## Source Environment Variables And Build

Because you are now going to be using a custom version of cmake, you don't have to modify the CMakeLists.txt of the project you are building!

Before building, source the environment setup script.

```sh    
<path to SDK>$ source environment-setup-<other-stuff>
```

This will create an alias to cmake. You can check this by running the command which cmake.

```sh    
gbmhunter@ubuntu:/opt/poky/2.2.1$ which cmake
/opt/poky/2.2.1/sysroots/x86_64-pokysdk-linux/usr/bin/cmake
```

Now go to the root directory of the CMake project you wish to build and use the standard CMake process as below:

```sh    
~/<my-cmake-project>$ mkdir build
~/<my-cmake-project>$ cd build/
~/<my-cmake-project>/build$ cmake ../
~/<my-cmake-project>/build$ make 
```

The above assumes CMake will use make to do the actual building, but this could be different.
