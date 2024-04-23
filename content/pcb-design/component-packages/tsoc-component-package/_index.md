---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-04-07
description: Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the TSOC component package.
draft: false
lastmod: 2024-04-23
tags: [component packages, PCB design, transistor, TSOC, thin small-outline C-Lead, TSOC-6, D6-1, D6N-1, Dallas, Maxim]
title: TSOC Component Package
type: page
---

## Overview

TSOC (Thin Small-Outline C-Lead) is a SMD component package.

As far as I can tell, this package only comes in the 6-pin version (TSOC-6), and is only used by Dallas/Maxim (since 2001, Dallas has been a subsidiary of Maxim). While Maxim Integrated lists four different variants (see the `Title` section of the recommended land patterns below), there seems to be no physical difference between the D6+1 and D6-1 variants, and no difference between the D6N+1 and D6N-1 variants. The difference between the variants with and without `N` in their name are the package width and the lead length (and hence two slightly different land patterns).

Variants:

* D6+1/D6-1 (Variant A)
* D6N+1/D6N-1 (Variant B)

See [https://www.maximintegrated.com/en/design/packaging/package-information.html](https://www.maximintegrated.com/en/design/packaging/package-information.html) for the official dimensions and land patterns from Maxim Integrated.

## TSOC-6

{{% figure src="_assets/tsoc-6-component-package-photo.jpg" width="360px" caption="A photo of the TSOC-6 component package. Image from maximintegrated.com." %}}

### Synonyms

* D6: Maxim

### Dimensions

All Variants:

{{% figure src="_assets/tsoc-6-component-package-dimensions.png" width="900px" caption="A photo of the TSOC-6 component package. Image from maximintegrated.com." %}}

* 3.94x4.29x1.40mm, LA: 17.6mm2 (D6+1/D6-1)
* 3.94x4.62x1.40mm, LA: 18.9mm2 (D6N+1/D6N-1)

### Footprint

D6+1/D6-1 Variants (Variant A):

{{% figure src="_assets/component-package-tsoc-6-d6n-1-recommended-land-pattern.png" width="900px" caption="The recommended land pattern for the TSOC-6 D6+1/D6-1 component package. Image from maximintegrated.com." %}}

D6N+1/D6N-1 Variants (Variant B):

{{% figure src="_assets/component-package-tsoc-6-d6n-1-recommended-land-pattern.png" width="900px" caption="The recommended land pattern for the TSOC-6 D6N+1/D6N-1 component package. Image from maximintegrated.com." %}}