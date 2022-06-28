---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Signal Processing, Filters ]
date: 2022-06-28
description: Info on the Kalman filter.
draft: false
lastmod: 2022-06-28
tags: [ filter, Kalman ]
title: Kalman Filter
type: page
---

{{% warning-is-notes %}}

## Overview

The _Kalman filter_ is a digital filter which produces estimates of system variables (called _hidden variables_, because you cannot know their exact value) based of noisy measurements (data with uncertainty). The Kalman filter is a very common estimation algorithm used in many applications such as GPS/positional measurements, radar, robot kinematics.