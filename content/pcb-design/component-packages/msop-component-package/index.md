---
author: "gbmhunter"
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-01-08
draft: false
lastmod: 2015-01-08
tags: [ "component packages", "PCB design", "MSOP", "Micro SOP", "MSE", "uSOP", "uMAX", "RM-8", "RM-10" ]
title: "MSOP Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>Micro Small Outline Package</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>
          <li>Micro SOP</li>
          <li>RM-8, RM-10 (Analog Devices, no pad)</li>
          <li>MINI<em>SO</em>EP, RH-8-1, RH-10-1 (Analog Devices, with pad)</li>
          <li>MSE (Linear Technology)</li>
          <li>uSOP (Maxim Integrated)</li>
          <li>uMAX (Maxim Integrated)</li>
          <li>u8+1 (Maxim Integrated package code for MSOP-8 P0.65mm)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>
        <ul>
          <li>{{% link text="MSOP" src="../msop-component-package" %}}</li>
          <li>SSOP</li>
          <li>{{% link text="TSSOP" src="../tssop-component-package" %}}</li>
        </ul>
      </td>      
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Lead-type</td>
      <td>Gull-wing</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>8-16</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>
        <ul>
          <li>0.50mm (MSOP-16)</li>
          <li>0.65mm (uMAX, uSOP)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Moderately difficult to solder by hand, due to the small pitch. Easy to solder with hot air, infrared, or reflow techniques.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>
        <ul>
          <li>4.9x3.0x1.1mm (LA: 14.7mm2)</li>
          <li>MSOP-10: 3.0x3.0mm, LA = 9.0mm2</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Height</td>
      <td>1.10mm</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>
        <ul>
          <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=205903">MSOP-10</a></li>
          <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=225862">IPC-7351 All SOIC SOP HSOP QSOP MSOP VSOP TVSOP SSOP TSSOP 250 packages</a></li>
          <li><a href="http://www.3dcontentcentral.com/Download-Model.aspx?catalogid=171&amp;id=165793">uMAX-8</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Audio amplifiers (Analog Devices)</li>
          <li>LED Controllers (Linear Technology)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

The _MSOP_ package is a miniaturized version of the SSOP package.

The width of any MSOP package is always 3mm. The length is also commonly 3mm (except for MSOP-16). Because of this restriction, the pitch usually decreases as the pin count increases.

The exposed pad on this package is optional (Analog Devices have separate codes for each).

## Thermal Resistances

### MSOP-10

Synonyms: DGS (Texas Instruments), VSSOP-10 (Texas Instruments)

<table>
  <tr>
    <td>Symbol</td>
    <td>Description</td>
    <td>Value</td>
  </tr>
  <tbody>
    <tr>
      <td>\( R_{\theta JA} \)</td>
      <td>Junction-to-ambient</td>
      <td>\(171.4^{\circ}C/W\)</td>
    </tr>
    <tr>
      <td>\( R_{\theta JC(top)} \)</td>
      <td>Junction-to-case (top)</td>
      <td>\(42.9^{\circ}C/W\)</td>
    </tr>
    <tr>
      <td>\( R_{\theta JB)} \)</td>
      <td>Junction-to-board</td>
      <td>\(91.8^{\circ}C/W\)</td>
    </tr>
  </tbody>
</table>

## MSOP-8

{{< img src="msop-8-component-package-3d-model-with-exposed-pad.jpg" width="500px" caption="3D model of the MSOP-8 component package (with exposed pad)." >}}

{{< img src="msop-8-component-package-dimensions.png" width="500px" caption="Package dimensions of the MSOP-8 component package (with exposed pad)." >}}

## MSOP-10

{{< img src="msop-10-component-package-dimensions.png" width="500px" caption="Package dimensions of the MSOP-10 component package (with exposed pad)." >}}

{{< img src="msop-10-component-package-recommend-land-pattern.gif" width="500px" caption="The recommeneded land pattern for the MSOP-10 component package." >}}