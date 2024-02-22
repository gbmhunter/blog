---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2012-11-21
description: "Insulation materials, standards, mutual capacitance and more info on coaxial (coax) cables."
draft: false
lastmod: 2022-01-31
tags: [ "cable", "coax", "coaxial" ]
title: "Coax Cable"
type: "page"
---

## Coaxial Cable

_Coaxial cable_ (or just _coax cable_) is a type of cable consisting of single core surrounded by a circular outer shield, with a insulating dielectric sandwiched between the two. The term _coaxial_ comes from the inner conductor and outer shield sharing the same axis (they are concentric with one another). Coax is most commonly used to transmit high frequency signals over small (oscilloscope probes) and large distances (transatlantic phone cables).

{{% figure src="coax-cable-cut-away-annotated.png" width="700px" caption="The make-up of a standard coaxial cable. Relative dimensions accurate for RG-6 (dimensions taken from http://www.farnell.com/datasheets/1697593.pdf)." %}}

RG-6 is one of the most common types of coaxial cable in residual homes due to it's use with TVs.

Properties of popular coaxial cable types:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Z_C</th>
      <th>Conductor Diameter</th>
      <th>Insulator Diameter</th>
      <th>Shield Outer Diameter</th>
      <th>Jacket Outer Diameter</th>
      <th>Capacitance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>RG-6</th>
      <td>

\(75\Omega\)[^wp-rg-6]
      </td>
      <td>1.0mm</td>
      <td>4.57mm</td>
      <td>5.2mm</td>
      <td>6.6mm</td>
      <td>68pF/m [^wp-rg-6]</td>
    </tr>
    <tr>
      <th>RG-58</th>
      <td>

\(50\Omega\)
      </td>
      <td>5.0mm</td>
      <td>82pF/m[^wp-rg-58]</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>RG-59</th>
      <td>

\(75\Omega\)[^wp-rg-58]
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

Properties of popular coaxial cable dielectrics[^rf-cafe-coax-chart]:

| Name                         | Propagation Velocity |
|------------------------------|----------------------|
| Solid Polyethylene (PE)      | 0.659c               |
| Foam Polyethylene (FE)       | 0.800c               |
| Foam Polystyrene (FS)        | 0.910c               |
| Air Space Polyethylene (ASP) | 0.840-0.880c         |
| Solid Teflon (ST)            | 0.694c               |
| Air Space Teflon (AST)       | 0.850-0.900c         |

<p class="centered">
where \(c=3e8ms^{-1}\) is the speed of light in a vacuum.
</p>

### Precision Capacitors From Coaxial Cable

Coax cable has a capacitance of approx. 1pF/10mm, as measured between the central conductor and the outer shield. Precision capacitors for prototype/lab use can be from trimmed lengths of coax. cable.

## References

[^pro-power-coaxial-rg6]: Pro-Power. _Cable Coaxial RG6 (datasheet)_. Retrieved 2021-05-04, from http://www.farnell.com/datasheets/1697593.pdf.
[^rf-cafe-coax-chart]: RF Cafe. _Coaxial Cable Specifications_. Retrieved 2021-05-05, from https://www.rfcafe.com/references/electrical/coax-chart.htm.
[^wp-rg-58]: Wikipedia (2020, Dec 19). _RG-58_. Retrieved 2022-01-31, from https://en.wikipedia.org/wiki/RG-58.
[^wp-rg-6]: Wikipedia (2021, Sep 7). _RG-6_. Retrieved 2022-01-31, from https://en.wikipedia.org/wiki/RG-6.
