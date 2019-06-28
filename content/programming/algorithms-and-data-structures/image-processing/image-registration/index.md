---
author: gbmhunter
categories: [ "Programming", "Algorithms And Data Structures" ]
date: 2019-06-20
description: ""
draft: false
lastmod: 2019-06-27
tags: [ "programming", "image registration", "MI", "mutual information", "MIND", "modality independent neighbourhood descriptor", "modalities", "patch" ]
title: "Image Registration"
type: "page"
---

## Overview

Some of the difficulties of image registration:

* Non-rigid deformation. When the features in one image have been stretched or squeezed in the sense that the feature has undergone more than just a simple translation and rotation.
* Intensity distortions. Different modalities (e.g. US and MRI) measure different physical phenomena to construct an image. These modalities may (and likely will) respond differently in intensity for the same feature in the image (e.g. in one modality, the feature may get linearly lighter from left to right, while in another, it gets exponentially darker).

## Terminology

image patch: A small piece (generally rectangular) of a larger image. For example, you could examine 4x4 pixel patches of a 500x500 image.

## Cross-Correlation

### Mutual Information

MI (_Mutual information_) quantifies the information shared between two different images. It is different to cross-correlation in that the relationship between the two images does not have to be linear.

### Modalities

Image correlation becomes more difficult when the images have different modalities. A modality is a particular technique used to perform imaging. A typical example of image registraion between images of different moldalities occurs in the medical domain with MR (magnetic resonanace) and US (ultrasound) images.

## MIND


MIND (_Modality Independant Neighbourhood Descriptor_) is a cross-correlation algorithm that aims to extract structural content in the local region which is which can be seen in other modalities. The academic paper that introduces MIND can be found [here](http://iplab.dmi.unict.it/miss14/MISS2014-ReadingGroup00-All-Paper.pdf). It supports non-rigid image registration and is generally more robust to different modalities than other registration algorithms such as MI.

The concept is based on the idea that each pixel in an image can be assigned a MIND descriptor, which is a vector of real numbers which desribes the local structure of that pixel. The number of elements in this vector depends on the choice of _search space_. The search space involves a number of pixels in the area around the pixel that you are calculating the descriptor for. One of the most basic search spaces for a 2D image would be the _four-neighbourhood_, involving the pixel above, below, to the left and to the right of the pixel. For every pixel in the search space, a square _patch_ (for example, a 3x3 patch) of pixels is found. This is compared to the square patch centered on the pixel you are calculating the MIND descriptor for. For each pair of patches, the sum of squared differences is calculated. This value is assigned to the pixel in the search space.

<p>$$ \text{MIND}(I, \vec{x}, \vec{r}) = \frac{1}{n} \exp\left(-\frac{D_p(I, \vec{x}, \vec{x} + \vec{r})}{V(I, \vec{x})}\right) \quad r \in \mathbb{R}  $$</p>

An example image registration algorithm written in Matlab and using MIND/Gauss-Newton optimization can be found at: [http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software](http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software).
