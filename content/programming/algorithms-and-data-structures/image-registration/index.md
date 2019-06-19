---
author: gbmhunter
categories: [ "Programming", "Signal Processing" ]
date: 2013-01-08
description: "Blog sub-section on signal processing."
draft: false
lastmod: 2013-01-08
tags: [ "programming", "signal processing", "image registration" ]
title: "Image Registration"
type: "page"
---

## Overview

Some of the difficulties of image registration:

* Non-rigid deformation. When the features in one image have been stretched or squeezed in the sense that the feature has undergone more than just a simple translation and rotation.
* Intensity distortions. Different modalities (e.g. US and MRI) measure different physical phenomena to construct an image. These modalities may (and likely will) respond differently in intensity for the same feature in the image (e.g. in one modality, the feature may get linearly lighter from left to right, while in another, it gets exponentially darker).

## Terminology

image patch: A small piece (generally rectangular) of a larger image. For example, you could examine 4x4 pixel patches of a 500x500 image.

# Cross-Correlation

## Mutual Information

_Mutual information_ quantifies the information shared between two different images. It is different to cross-correlation in that the relationship between the two images does not have to be linear.

## Modalities

Image correlation becomes more difficult when the images have different modalities. A modality is a particular technique used to perform imaging. A typical example of image registraion between images of different moldalities occurs in the medical domain with MR (magnetic resonanace) and US (ultrasound) images.

# MIND

[MIND](http://iplab.dmi.unict.it/miss14/MISS2014-ReadingGroup00-All-Paper.pdf).

MIND (Modality Independant Neighbourhood Descriptor) aims to extract structural content in the local region which is which can be seen in other modalities.