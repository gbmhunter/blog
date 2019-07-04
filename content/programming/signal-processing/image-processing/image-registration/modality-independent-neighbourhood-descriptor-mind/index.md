---
author: gbmhunter
categories: [ "Programming", "Signal Processing", "Image Processing" ]
date: 2019-06-20
description: ""
draft: false
lastmod: 2019-07-03
tags: [ "programming", "signal processing", "image processing", "image registration", "MI", "mutual information", "MIND", "modality independent neighbourhood descriptor", "modalities", "patch", "voxel", "SSC" ]
title: "Modality Independent Neighbourhood Descriptor (MIND)"
type: "page"
---

## Overview

MIND (_Modality Independent Neighbourhood Descriptor_) is a cross-correlation algorithm that aims to extract structural content in the local region which is which can be seen in other modalities. The academic paper that introduces MIND can be found [here](http://iplab.dmi.unict.it/miss14/MISS2014-ReadingGroup00-All-Paper.pdf) ([cached local copy](2012-01-16-mind-modality-independent-neighbourhood-descriptor-article.pdf)). It supports non-rigid image registration and is generally more robust to different modalities than other registration algorithms such as MI.

The concept is based on the idea that each pixel in an image can be assigned a MIND descriptor, which is a vector of real numbers which describes the local structure of that pixel. The number of elements in this vector depends on the choice of _search space_. The search space involves a number of pixels in the area around the pixel that you are calculating the descriptor for. One of the most basic search spaces for a 2D image would be the _four-neighbourhood_, involving the pixel above, below, to the left and to the right of the pixel. For every pixel in the search space, a square _patch_ (for example, a 3x3 patch) of pixels is found. This is compared to the square patch centered on the pixel you are calculating the MIND descriptor for. For each pair of patches, the sum of squared differences is calculated. This value is assigned to the pixel in the search space.

<p>$$ \text{MIND}(I, \vec{x}, \vec{r}) = \frac{1}{n} \exp\left(-\frac{D_p(I, \vec{x}, \vec{x} + \vec{r})}{V(I, \vec{x})}\right) \quad r \in \mathbb{R}  $$</p>

An example image registration algorithm written in Matlab and using MIND/Gauss-Newton optimization can be found at: [http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software](http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software).

## Pre-Normalizing Images

Should you normalize images (e.g. between 0 and 1) before calculating the MIND descriptors for each pixel?

If using the MIND descriptor to coregister two images, you should find that normalization should not have a significant effect on the objective function.

## Worked Example

We will demonstrate how MIND works with a very basic 2D 5x5 (25 pixel) greyscale image. For simplicity, the pixels intensities have been assigned the values 1 to 25 as shown in the below diagram (typically they will range from 0 to 255 or similar 2^n bit number).

Pixel `\((0, 0)\)` is in the upper left corner. Pixels are indexed in `\((row, column)\)` order (which could also be thought of as `\((y, x)\)`). This matches the row-major indexing of Numpy and the C programming language.

We will work through the process of calculating the MIND descriptor for pixel `\((1,2)\)`, which has an intensity of 8 and is shown in dark blue in the below image. We will using the following MIND parameters:

* A search space of 4-neighbourhood (i.e. the pixels directly touching the pixel of interest), shown in light blue. The pixel we are calculating the MIND descriptor for is not in the search space.
* A patch size of 3 (more on this later).

{{% figure src="mind_descriptor_search_space.svg" width="500px" %}}

For each one of the pixels in the search space, a 3x3 pixel _patch_ is formed, with the pixel in the center (and this time, the pixel IS included in the patch). We chose a patch with a width/height of 3 for simplicity, but this is a parameter which can be adjusted. In the below image on the left, the patch for the `\((1, 1)\)` pixel is shown. A patch centered on the MIND descriptor pixel is also formed.

{{% figure src="mind_descriptor_patch_comparison.svg" width="700px" %}}

With these two patches, a _patch distance_ is calculated. This is an element-wise sum-of-squared differences calculation. For the above patches, this would be:

<p>$$ \begin{align} SOS &=(20-10)^2 + (10-17)^2 + (17-2)^2 \\ &+ (16-11)^2 + (11-4)^2 + (4-21)^2 \\ &+ (3-12)^2 + (12-1)^2 + (1-24)^2 \\ &= 1468 \end{align}$$</p>

This value of `\(1468\)` is attached to the `\((1, 1)\)` pixel in the search space. The same patch distance calculation is repeated for all pixels in the search space, which would give the results as shown in the below diagram:

{{% figure src="mind_descriptor_patch_distances.svg" width="500px" %}}

## Resources

### Publications

* [Self Similarity Image Registration Based on Reorientation of the Hessian](http://homepage.tudelft.nl/h5u3d/papers/SelfSimilarityImageRegistration.pdf) ([cached local copy](2013_self_similarity_image_registration_based_on_reorientation_of_the_hessian.pdf)) claims to be an efficiency improvement on the original MIND algorithm when dealing with deformation between the two images.

* [Multimodal Fusion for Image-Guided Interventions using Self-Similarities](self_similarity_context_ssc.pdf) is a newer publication involving the same author as the original MIND publication (Mattias P. Heinrich) which claims to improve in the MIND algorithm by using patch distances between pixels surrounding the pixel of interest, but not including it, thereby reducing the algorithms sensitivity to noise in the pixel of interest.

### Software

* MATLAB implementations of the MIND and SSC algorithms can be found at [mpheinrich.de/software.html](http://www.mpheinrich.de/software.html).

* The GitHub repo [cmirfin/BBR](https://github.com/cmirfin/BBR) contains MATLAB code of the MIND algorithm and a supporting Gauss-Newton optimizer to perform two-stage non-rigid registration of MR images.

* [IBME - Julia Schnabel - Software](http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software) contains MATLAB for the MIND algorithm as well as MIND/Gauss-Newton 2D registration code (again, in MATLAB).