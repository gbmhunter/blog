---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2021-06-15
description: "Info on signal generators."
draft: false
lastmod: 2021-06-15
tags: [ "electronics", "tools", "signal generators" ]
title: "Signal Generators"
type: "page"
---

{{% warning-is-notes %}}

## Output Voltage Not What You Expect?

Most signal generators have a "Load Impedance" setting. Whilst the signal generator almost always has an output of `\(50\Omega\)`, the signal generator will take this load impedance setting into account and generate a voltage that will result in the set peak-to-peak/amplitude at the output.

However, if this load impedance setting is set to say, 50R, but connected to a high-impedance load (for example, connected straight up to the oscilloscope), you will measure twice the expected voltage at the output!