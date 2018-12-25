---
author: gbmhunter
date: 2017-10-30 18:02:32+00:00
draft: false
title: Perlin Noise
type: page
url: /mathematics/perlin-noise
---

## Overview

Perlin noise is commonly used to create natural looking textures in computer graphics. A common example is it's use to create a randomly generated landscape, or realistic looking clouds.

{{< figure src="/images/2017/10/perlin-noise-cloud-example.png" width="331px" caption="Rendered Perlin noise that has been configured to make realistic looking clouds."  >}}

Ken Perlin invented the Perlin noise algorithm following CGI work on the movie Tron.

## Libraries

[siv::PerlinNoise](https://github.com/Reputeless/PerlinNoise) is a good header-only Perlin noise library for C++.

The [Python library noise](https://pypi.python.org/pypi/noise/) has Perlin "improved" noise and Perlin simplex noise algorithms.
