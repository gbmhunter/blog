---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2022-04-06
draft: false
lastmod: 2022-04-26
tags: [ "component packages", "PCB design", "SOD-143", "TO-253-4", "TO-253-AA", "JEDEC", "small-outline", "diodes", "BJTs", "supervisors", "PMIC" ]
title: "SOD-143 Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>SOD-143 (Small-outline Diode 143)</td>
    </tr>
    <tr>
      <td>Image</td>
      <td>{{% figure src="sot-143-3d-model-digikey.png" width="150px" %}}</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>

* `PG-SOT143-4-4` (Infineon)[^bib-infineon-pg-sot143-4-4]
* `SOT143-4` (ST Microelectronics)[^bib-st-stm6315-ds]
* `TO-253-4`
* `TO-253AA` (JEDEC)[^bib-analog-devices-sot-143]
      </ul>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
* `SOT-143`
* `SOT-143B` (used for RF BJTs, unsure on difference to `SOT-143`)
* `SOT-143R` (used for RF BJTs, unsure on difference to `SOT-143`)
      </td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>4</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>
      
1.92mm (between centers of leads on same side, excluding larger lead[^bib-st-stm6315-ds]</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Reflow is most suitable.</td>
    </tr>
    <tr>
      <td>Package Dimensions</td>
      <td>

* Body Length `D`: 2.9mm[^bib-infineon-pg-sot143-4-4]
* Body Width `E1`: 1.3mm (excl. leads)[^bib-infineon-pg-sot143-4-4] [^bib-st-stm6315-ds]
* Total Width `E`: 2.4mm (incl. leads)[^bib-st-stm6315-ds]
* Height (avg.): 1.0mm[^bib-st-stm6315-ds]
      </td>
    </tr>
    <tr>
      <td>Typical PCB Land Area</td>
      <td>
\(7.29mm^2\ (2.7\times 2.7mm)\)[^bib-infineon-pg-sot143-4-4]
      </td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>

* TVS diodes
* PMIC supervisors
      </td>
    </tr>
  </tbody>
</table>

The `SOT-143` is a smallish 4-pinned SMD package which is easily distinguishable by having one wider lead compared with the other 3. 

{{% figure src="sot-143-3d-model-digikey.png" width="300px" caption="A 3D model of the SOT-143 component package[^bib-digikey-stm6315rbw13f]. On the upside down render, you can clearly see the 1 wider lead." %}}

## References

[^bib-st-stm6315-ds]:  ST Microelectronics (2007, Mar). _STM6315: Open drain microprocessor reset (datasheet)_. Retrieved 2022-04-26, from https://www.st.com/content/ccc/resource/technical/document/datasheet/64/6b/44/43/61/e6/41/d5/CD00081393.pdf/files/CD00081393.pdf/jcr:content/translations/en.CD00081393.pdf.
[^bib-digikey-stm6315rbw13f]: DigiKey. _PMIC - Supervisors > STMicroelectronics STM6315RBW13F (product page)_. Retrieved 2022-04-26, from https://www.digikey.co.nz/en/products/detail/stmicroelectronics/STM6315RBW13F/1117553.
[^bib-infineon-pg-sot143-4-4]: Infineon. _Packages > PG-SOT143 > PG-SOT143-4-4_. Retrieved 2022-04-26, from https://www.infineon.com/cms/en/product/packages/PG-SOT143/PG-SOT143-4-4/.
[^bib-analog-devices-sot-143]: Analog Devices. _4-Lead Small Outline Transistor Package [SOT-143] (RA-4)_. Retrieved 2022-04-26, from https://www.analog.com/media/en/package-pcb-resources/package/pkg_pdf/sot-143ra/ra_4.pdf.
