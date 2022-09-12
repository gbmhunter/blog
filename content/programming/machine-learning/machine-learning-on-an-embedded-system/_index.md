---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Machine Learning ]
date: 2022-09-08
draft: true
lastmod: 2022-09-10
tags: [ programming, machine learning, TensorFlow, TensorFlow Lite, Linux, RP2040, camera, AI, artificial intelligence, Cortex-M0+, ARM, RaspberryPi ]
title: Machine Learning On An Embedded System
type: page
---

## Overview

The page is about exploring machine learning on an embedded system. By embedded, I mean a microcontroller running on "bare metal", with no concept of a file system.

I looked around and choose [Pico4ML by ArduCam](https://www.arducam.com/pico4ml-an-rp2040-based-platform-for-tiny-machine-learning/) as my development kit to play around with. It features a RP2040 microcontroller, 320x240 pixel monochromatic camera, IMU, microphone and 160x80 LCD display. You can probably tell from the name, but it is specially built for performing machine learning, and it's rich sensor inputs and display let you do some cool stuff!

The RP2040 contains an Arm Cortex-M0+ processor running up to 133MHz, with 264kB SRAM and 2MB QSPI flash. So it's not your low end 1kB RAM/8kB flash ATmega8 but neither is it a powerful processor designed to run Linux.

## Building The Example Face Detection App

Pre-made examples are designed to be compiled on a RaspberryPi. So let’s do that then.

```sh
$ git clone https://github.com/raspberrypi/pico-setup.git
```

Install all the dependencies (incl. building OpenOCD), and build the example projects:

```sh
$ ./pico-setup/pico-setup.sh
```

... and go make a coffee. It also disables the Linux serial console so it can be used as a debug UART from the pico. Ouch, 5.9GB of space used. I regret only using an 8GB SD card.

Hmmm, it even installed VS code with the `cortex-debug`, `cpptools` and `cmake-tools` extensions.

Get the RPI-Pico-Cam firmware and compile:

```sh
$ git clone https://github.com/ArduCAM/RPI-Pico-Cam.git
$ cd RPI-Pico-Cam/tflmicro
$ mkdir build 
$ cd build 
$ cmake ..
$ make
```

and coffee time again! I’m starting to get the jitters. Don't worry though, successive builds are much faster (take about 10s).

This builds the firmware image, including TensorFlow Lite and benchmark programs.

Holding down the “bootsel” button while powering on the Pico4ML makes the Pico4ML appear as a mass removable drive (sda):

```sh
$ dmesg | tail
[  314.258641] sd 0:0:0:0: [sda] Attached SCSI removable disk
```

Mount this into the filesystem:

```sh
$ sudo mkdir -p /mnt/pico
$ sudo mount /dev/sda1 /mnt/pico
```

We can see files! 

```sh
$ cat /mnt/pico/INFO_UF2.TXT
UF2 Bootloader v3.0
Model: Raspberry Pi RP2
Board-ID: RPI-RP2
```

Copy the .uf2 file onto the device:

```sh
$ cp tflmicro/build/examples/person_detection_screen/person_detection_screen_int8.uf2 /mnt/pico/
$ sync
```

Yay! Basic face detection example working!

Output from the Pic4ML serial: 

```sh
$ minicom -b 115200 -o -D /dev/ttyACM0
```

Gives:

```
capture_frame took 130820 ticks (130 ms)
Display took 18770 ticks (18 ms)
GetImage took 149985 ticks (149 ms)
Invoke took 869340 ticks (869 ms)
person score:-94 no person score 94
**********
capture_frame took 130888 ticks (130 ms)
Display took 18766 ticks (18 ms)
GetImage took 150064 ticks (150 ms)
Invoke took 869395 ticks (869 ms)
person score:-95 no person score 95
**********
```

## What Is TensorFlow Lite?

TensorFlow Lite is a cut-down version of TensorFlow designed for low power devices, e.g. the RaspberryPi.

{{% figure src="tensorflow-lite-logo-social.png" width="500px" caption="The logo for TensorFlow Lite[^bib-tensorflow-lite-logo]." %}}

TensorFlow Lite for Microcontrollers is a further cut-down version that runs on….microcontrollers. Supported boards include:

* STM32F746 Discovery Kit
* ESP32-DevKitC
* ATSAMD51
* SparkFun Edge
* Various Adafruit boards
* Arduino Nano 33 BLE Sense

On device training is NOT support with TFL for MCUs (not surprising, really). Only a limited sub-set of features are supported. They can be found at [all_ops_resolver.cc](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/all_ops_resolver.cc).

## Model Training Workflow

Generate a small TensorFlow model that can fit on the target device and contains the supported operations.

Convert TensorFlow model to a TensorFlow Lite model using the the TensorFlow Lite converter.

Convert to a C-byte array (this gets around the issue that most micros don’t have a file system)

```sh
$ xxd -i converted_model.tflite > model_data.cc
```

Run inference on target device using the C++ library.

## Can I Train My Own Model To Detect PCBs?

Setup VS Code to develop remotely on my RPi using SSH.

Found the model data for the person_detect_model_data saved at:

```
RPI-Pico-CAM/tflmicro/examples/person_detection_screen/tensorflow/lite/micro/tools/make/downloads/person_model_int8/person_detect_model_data.cpp
```

Now I need to make new model data. I didn't know if this would take a bunch of processing power, so decided to do this part on my Windows machine just in case.

We need a dataset of images separated into two classes:

1. pcbs
1. not-pcbs

Install the TensorFlow Light model maker package:

```sh
$ pip install tflite-model-maker
```

Duoh! tflite-model-maker depends on `scann` which requires Linux (I). Switching over Lubuntu running in a VM...

Tried again. 2 hours later……..WTF? pip was downloading every single nightly build of tensorflow ever made in all of history.

{{% figure src="every-tensorflow-nightly-under-the-sun.png" width="400px" caption="pip trying to install every tensorflow nightly under the sun." %}}

Duoh! Tensor flow is not supported with Python 3.10, and so the best I can guess is that it was trying every version to see if that would change! Downgrading to Python 3.9:

```sh
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt update
$ sudo apt install python3.9
```

And also get the right virtual environment, otherwise `python3.9 -m venv .venv` fails:

```
$ sudo apt install python3.9-venv
```

No AVX Instructions on the Ubuntu guest in the VM! Garghhh.

```
(.venv) gbmhunter@lubuntu-22-04:~/embedded-ml/$ main.py
The TensorFlow library was compiled to use AVX instructions, but these aren't available on your machine.
Aborted
```

Disabling hypervisor on the Windows host machine:

```powershell
bcdedit /set hypervisorlaunchtype off
DISM /Online /Disable-Feature:Microsoft-Hyper-V
```

Yay! Tensor flow is now happy.

## WSL

WSL on my machine had Python 3.6. Let's get Python 3.9:

```
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt install python3.9 python3.9-venv
```

Create virtual environment and install `tflite-model-maker`:

```
$ python3.9 -m venv .venv
$ source .venv/bin/activate
$ pip install tflite-model-maker
```

{{% figure src="installing-tflite-model-maker.png" width="500px" caption="Installing tflite-model-maker on WSL." %}}

https://www.tensorflow.org/lite/models/modify/model_maker/image_classification contains some useful example code on how to get started with `tflite-model-maker` in Python.

We get the following error, but we're told we can safely ignore it:

```
2022-09-11 08:51:13.649993: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'libcudart.so.11.0'; dlerror: libcudart.so.11.0: cannot open shared object file: No such file or directory
2022-09-11 08:51:13.650051: I tensorflow/stream_executor/cuda/cudart_stub.cc:29] Ignore above cudart dlerror if you do not have a GPU set up on your machine.
```

TensorFlow Lite lets you define `TF_LITE_STRIP_ERROR_STRINGS` (used in `error_reporter.h`) to strip out all error message strings to reduce binary size.

TensorFlow Lite for Microcontrollers defers error printing to `MicroErrorReporter`, which calls `DebugLog()`.

All in one command:

```
make && sudo mount /dev/sdc1 /mnt/pico/ && cp /home/biolumic/pico4ml/RPI-Pico-Cam/tflmicro/build/examples/person_detection_screen/person_detection_screen_int8.uf2 /mnt/pico/
```

Annoyingly, sda changes to sdb, then sdc, e.t.c everytime you start in boot mode.

The size of the person detection model is 300568 bytes (294kB).

```
const int g_person_detect_model_data_len = 300568;
```

## References

[^bib-tensorflow-lite-logo]: _TensorFlow Lite logo_. Retrieved 2022-09-10, from https://www.tensorflow.org/site-assets/images/project-logos/tensorflow-lite-logo-social.png.
