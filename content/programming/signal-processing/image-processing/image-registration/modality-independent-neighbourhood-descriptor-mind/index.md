---
author: gbmhunter
categories: [ "Programming", "Signal Processing", "Image Processing" ]
date: 2019-06-20
description: "A tutorial (with step-by-step examples) on the MIND descriptor, and image registration algorithm that works well for multi-modal image registration."
draft: false
lastmod: 2019-07-17
tags: [ "programming", "signal processing", "image processing", "image registration", "MI", "mutual information", "MIND", "modality independent neighbourhood descriptor", "modalities", "patch", "voxel", "SSC", "convolution", "Fourier transform" ]
title: "Modality Independent Neighbourhood Descriptor (MIND)"
type: "page"
---

## Overview

MIND (_Modality Independent Neighbourhood Descriptor_) is an image registration algorithm that aims to extract structural content in the local region around each pixel/voxel which can also be seen in other modalities. The academic paper that introduces MIND can be found [here](http://iplab.dmi.unict.it/miss14/MISS2014-ReadingGroup00-All-Paper.pdf) ([cached local copy](2012-01-16-mind-modality-independent-neighbourhood-descriptor-article.pdf)). It supports non-rigid image registration and is generally more robust to different modalities (e.g. MRI and ultrasound images) than other registration algorithms such as MI (mutual information).

## How It Works

The concept is based on the idea that each pixel in an image can be assigned a _MIND descriptor_, which is a vector of real numbers which describes the local structure surrounding that pixel.

Each value in the MIND descriptor for a pixel is described by the following equation[^mind]:

<p>$$ \text{MIND}({\bf I}, \vec{x}, \vec{r}) = \frac{1}{n} \, \exp\left(-\frac{D_p(\mathbf{I}, \vec{x}, \vec{x} + \vec{r})}{V(\mathbf{I}, \vec{x})}\right) \quad \vec{r} \in \mathbb{R} \tag{1} $$</p>

where:

* `\({\bf I}\)` is the 2D greyscale image, as a 2D matrix of real values
* `\(\vec{x}\)` is the pixel location you are currently calculating the MIND descriptor for (e.g. `\(\vec{x} = (2, 5)\)` would be the pixel at the 3rd column and 6th row)
* `\(\vec{r}\)` is an element from the search space `\(\mathbb{R}\)` (e.g. `\(\vec{r} = (0,1)\)`)
* `\(\mathbb{R}\)` is the set of all pixels (defined by relative shifts from `\(\vec{x}\)`) involved in the search space, e.g. for a 4-neighbourhood search space in a 2D image, `\(\mathbb{R} = ((-1, 0), (1, 0), (0, -1), (0, 1))\)`
* `\(n\)` is a normalizing constant
* `\(D_p({\bf I}, \vec{x}, \vec{x} + \vec{r})\)` is the patch distance between the descriptor pixel and search space pixel (more on this later)
* `\(V({\bf I}, \vec{x})\)` is an estimate on the variance for the descriptor pixel (more on this later)

Note that I have changed the syntax slightly from that listed in the publication as to fit the {{% link text="mathematical style guide" src="/mathematics" %}} for this blog.

Given two images that need registering, you can calculate MIND descriptors for each pixel in both images. Then a simple and easily optimizable sum-of-squared differences is calculated between the MIND descriptors in each image. By transforming the compare image relative to the reference image, this value will vary. When this value is minimized, this represents the transformation which best registers the compare image ontop of the reference image. This forms the objective function for which you wish to minimize, and can be easily solved with traditional optimization algorithms such as Nelder-Mead or gradient descent.

The number of elements in this vector depends on the choice of _search space_ `\(\mathbb{R}\)`. The search space involves a number of pixels in the area around the pixel that you are calculating the descriptor for. One of the most basic search spaces for a 2D image would be the _four-neighbourhood_, involving the pixel above, below, to the left and to the right of the pixel. For every pixel in the search space, a square _patch_ (for example, a 3x3 patch) of pixels is found. This is compared to the similar-sized square patch centered on the pixel you are calculating the MIND descriptor for. For each pair of patches, the sum of squared differences is calculated. This value is assigned to the pixel in the search space.


An example image registration algorithm written in Matlab and using MIND/Gauss-Newton optimization can be found at: [http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software](http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software).

## Pre-Normalizing Images

Should you normalize images (e.g. between 0 and 1) before calculating the MIND descriptors for each pixel?

If using the MIND descriptor to coregister two images, you should find that normalization should not have a significant effect on the objective function.

## Worked Example

We will demonstrate how MIND works with a very basic 2D 5x5 (25 pixel) greyscale image. For simplicity, the pixels intensities have been assigned the values 1 to 25 as shown in the below diagram (typically they will range from 0 to 255 or similar `\(2^n -1 \)` bit number).

Pixel `\((0, 0)\)` is in the upper left corner. Pixels are indexed in `\((row, column)\)` order (which could also be thought of as `\((y, x)\)`). This matches the row-major indexing of Numpy and the C programming language.

We will work through the process of calculating the MIND descriptor for pixel `\((1,2)\)`, which has an intensity of 8 and is shown in dark blue in the below image. We will using the following MIND parameters:

* A search space of 4-neighbourhood (i.e. the pixels directly touching the pixel of interest), shown in light blue. The pixel we are calculating the MIND descriptor for is not in the search space.
* A patch size of 3 (more on this later).

{{% figure src="mind_descriptor_search_space.svg" width="500px" %}}

For our search space `\(\mathbb{R}\)` 4-neighbourhood, we use the following pixels (coordinates are relative to the pixel we are calculating the MIND descriptor for).

<p>$$ \mathbb{R} = \left(\quad (0,1), (0,-1), (1,0), (-1,0)\quad \right) $$</p>

Remember, these correspond to `\((row, column)\)` or `\((y, x)\)`.

For each one of the pixels in the search space `\(\mathbb{R}\)`, a 3x3 pixel _patch_ is formed, with the pixel in the center (and this time, the pixel IS included in the patch). We chose a patch with a width/height of 3 for simplicity, but this is a parameter which can be adjusted. In the below image on the left, the patch for the `\((1, 1)\)` pixel is shown. A patch centered on the MIND descriptor pixel is also formed.

{{% figure src="mind_descriptor_patch_comparison.svg" width="700px" %}}

With these two patches, a _patch distance_ is calculated. Each patch element can has a different weighting (common weightings are a 2D gaussian or a constant value). This is an element-wise sum-of-squared differences calculation.

For simplicity, we will use a constant patch weighting of `\(\frac{1}{9}\)` to normalize the 3x3 patch. For the above patches, this would be:

<p>$$ \begin{align} SOS &=(\frac{1}{3}(20-10))^2 + (\frac{1}{3}(10-17))^2 + (\frac{1}{3}(17-2))^2 \\ &+ (\frac{1}{3}(16-11))^2 + (\frac{1}{3}(11-4))^2 + (\frac{1}{3}(4-21))^2 \\ &+ (\frac{1}{3}(3-12))^2 + (\frac{1}{3}(12-1))^2 + (\frac{1}{3}(1-24))^2 \\ &= 163.11 \end{align}$$</p>

This value of `\(163.11\)` is attached to the `\((1, 1)\)` pixel in the search space. The same patch distance calculation is repeated for all pixels in the search space, which would give the results as shown in the below diagram:

{{% figure src="mind_descriptor_patch_distances.svg" width="500px" %}}

Next, we have to calculate a variance for each pixel. For every pixel, we estimate the variance using the **mean of the patch distance values calculated for each pixel in the search space**.

For our chosen pixel, this would be:

<p>$$ var = \frac{163.11 + 128.78 + 152.00 + 61.11}{4} = 126.25 $$</p>

If we do this for every pixel, this results in the following array (you can see the value we just calculated at entry `\((1, 2)\)`):

```python
array([[ 15.33,  41.97,  68.19,  87.61,  60.97],
       [ 47.06,  93.78, 126.25, 137.28,  90.56],
       [ 93.72, 141.75, 157.06, 129.78,  81.75],
       [109.42, 147.36, 152.08,  99.03,  61.08],
       [ 77.69,  95.56,  94.03,  49.36,  31.5 ]])
```

We have now ready to perform the final calculation and find the MIND descriptors for each pixel, using the equation from [^mind].

<p>$$ MIND(I, \vec{x}, \vec{r}) = \frac{1}{n}exp(-\frac{D_P(I, \vec{x}, \vec{x} + \vec{r})}{V(I, \vec{x})}) \quad \vec{r} \in \mathbb{R} $$</p>

Because we have four pixels in the search space `\(R\)` for each pixel we are calculating the MIND descriptor for, the MIND descriptor will also contain four values (dimensions).

For our pixel `\(1, 2\)`, these four values will be:

<p>$$
M(I, (1,2), (0,1)) = exp(-\frac{152.00}{126.25}) = 0.300 \\
M(I, (1,2), (0,-1)) = exp(-\frac{163.11}{126.25}) = 0.275 \\
M(I, (1,2), (1,0)) = exp(-\frac{128.78}{126.25}) = 0.361 \\
M(I, (1,2), (-1,0)) = exp(-\frac{61.11}{126.25}) = 0.616 \\
$$</p>

Giving the MIND descriptor:

<p>$$ MIND(I, (1,2)) = [ 0.300, 0.275, 0.361, 0.616 ] $$</p>

This calculation is performed for all pixels, giving the following array of MIND descriptors (first axis is pixel columns, second axis is pixel rows, third axis contains the four values that make up the MIND descriptor for that pixel):

```python
mind_descriptors =
  array([
       [[0.199, 0.404, 0.258, 0.884],
        [0.142, 0.554, 0.381, 0.611],
        [0.354, 0.301, 0.408, 0.421],
        [0.505, 0.446, 0.265, 0.307],
        [0.955, 0.374, 0.205, 0.25 ]],

       [[0.367, 0.615, 0.126, 0.643],
        [0.176, 0.604, 0.266, 0.649],
        [0.3  , 0.275, 0.361, 0.616],
        [0.395, 0.33 , 0.328, 0.428],
        [0.878, 0.244, 0.248, 0.344]],

       [[0.43 , 0.845, 0.142, 0.354],
        [0.301, 0.572, 0.255, 0.416],
        [0.326, 0.339, 0.377, 0.44 ],
        [0.419, 0.257, 0.552, 0.308],
        [0.765, 0.251, 0.445, 0.214]],

       [[0.49 , 0.887, 0.224, 0.188],
        [0.376, 0.589, 0.308, 0.269],
        [0.349, 0.388, 0.371, 0.365],
        [0.383, 0.199, 0.525, 0.46 ],
        [0.621, 0.211, 0.413, 0.339]],

       [[0.488, 0.948, 0.325, 0.121],
        [0.518, 0.558, 0.39 , 0.162],
        [0.432, 0.512, 0.412, 0.201],
        [0.575, 0.202, 0.575, 0.274],
        [0.528, 0.42 , 0.459, 0.18 ]]])
```

## Using The MIND Descriptors To Register Two Images

You may be thinking, great, you've shown me how to calculate the MIND descriptors for an image, but now what? How do I use these to register two images?

### Sentinel-2 Satellite Imagery

Dataset: S2B_MSIL2A_20190625T221609_N0212_R129_T60GUA_20190626T000320
Download Link: https://scihub.copernicus.eu/dhus/odata/v1/Products('15de9330-30bd-4cb0-841a-bf9b88edd4ab')/$value
Bands: B03 (GREEN), B08 (NIR) - both at 10m resolution

## Optimizations

Convert the patch distance calculation into a correlation problem.

The patch distance calculation involves computing a sum-of-squared differences. You can calculate the sqaured differences normally, but convert the summation into a correlation problem, and then compute the result of the correlation by converting the image into the frequency domain (via the FFT or _Fast Fourier Transform_), multiplying, and then performing an inverse FFT.

## Resources

### Publications

* [Self Similarity Image Registration Based on Reorientation of the Hessian](http://homepage.tudelft.nl/h5u3d/papers/SelfSimilarityImageRegistration.pdf) ([cached local copy](2013_self_similarity_image_registration_based_on_reorientation_of_the_hessian.pdf)) claims to be an efficiency improvement on the original MIND algorithm when dealing with deformation between the two images.

* [Multimodal Fusion for Image-Guided Interventions using Self-Similarities](self_similarity_context_ssc.pdf) is a newer publication involving the same author as the original MIND publication (Mattias P. Heinrich) which claims to improve in the MIND algorithm by using patch distances between pixels surrounding the pixel of interest, but not including it, thereby reducing the algorithms sensitivity to noise in the pixel of interest.

### Software

* MATLAB implementations of the MIND and SSC algorithms can be found at [mpheinrich.de/software.html](http://www.mpheinrich.de/software.html).

* The GitHub repo [cmirfin/BBR](https://github.com/cmirfin/BBR) contains MATLAB code of the MIND algorithm and a supporting Gauss-Newton optimizer to perform two-stage non-rigid registration of MR images.

* [IBME - Julia Schnabel - Software](http://www.ibme.ox.ac.uk/research/biomedia/julia-schnabel/Software) contains MATLAB for the MIND algorithm as well as MIND/Gauss-Newton 2D registration code (again, in MATLAB).

[^mind]: [Modality Independent Neighbourhood Descriptor](http://iplab.dmi.unict.it/miss14/MISS2014-ReadingGroup00-All-Paper.pdf)