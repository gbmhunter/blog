---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2023-06-12
draft: false
lastmod: 2023-06-12
tags: [ component packages, PCB design, transistor, TO-18 ]
title: TO-206 Component Package
type: page
---

## Overview

The `TO-206` (Transistor Outline Package, Case Style 206) component package is a family of large through-hole metal can packages used for things such as transistors. There are variants with anywhere from 2 to 8 leads[^wikipedia-to-18].

Synonyms:

* `H03C`: What National Semiconductor calls the `TO-206AA`[^ti-metal-can-packages].
* `TO-18`

Variants:

* `TO-206AA`: The popular 3-lead variant. Also called `TO-18-3`.
* `TO-206AB`: 3-lead with 1.90mm cap height. Also called `TO-46`.[^wikipedia-to-18] 
* `TO-206AC`: 3-lead with 3.30mm cap height. Also called `TO-52`.[^wikipedia-to-18]
* `TO-206AF`: 4-lead. Also called `TO-72`.
* `TO-71`: 8-lead `TO-18`.

Common Uses

* Diodes (`TO-18-2`)
* Transistors (`TO-18-3`)

Similar To:

* [TO-39](/pcb-design/component-packages/to-39-component-package/)
* [TO-92](/pcb-design/component-packages/to-92-component-package/)

## TO-206AA (TO-18-3)

The `TO-206AA` is the most common 3-lead version in the `TO-206` family. It is also known by it's older name as the `TO-18-3` -- or just ambiguously as the `TO-18`. National Semiconductor called this package `H03C`[^ti-metal-can-packages]. Transistors such as the [2N2222A BJT](https://www.digikey.com/en/products/detail/central-semiconductor-corp/2N2222A-PBFREE/4806845) are available in this package.

{{% figure src="to-206aa-to-18-3-photo-digikey.png" width="300px" caption="A photo of the TO-206AA (TO-18-3) from DigiKey[^digikey-2n2222a]." %}}

The dimensions of the `TO-206AA` are shown below:

{{% figure src="to-206-aa-to-18-3-lead-ti-h03c-dimensions.png" width="700px" caption="Dimensions for the TO-206AA (TO-18) component package from National Semiconductor (now Texas Instruments)[^ti-metal-can-packages]." %}}

## References

[^wikipedia-to-18]: Wikipedia (2021, Nov 19). _TO-18_. Retrieved 2023-06-12, from https://en.wikipedia.org/wiki/TO-18.
[^ti-metal-can-packages]: National Semiconductor (now Texas Instruments) (1999, Aug). _SNOA033 - Metal,Can,Packages - Metal Can Packages (TO-3/5/8/18/39/46/52/72)_. Retrieved 2023-06-12, from https://www.ti.com/lit/an/snoa033/snoa033.pdf.
[^digikey-2n2222a]: DigiKey. _Central Semiconductor Corp 2N2222A PBFREE_. Retrieved 2023-06-12, from https://www.digikey.com/en/products/detail/central-semiconductor-corp/2N2222A-PBFREE/4806845.
