---
authors: [ "Geoffrey Hunter" ]
categories: [ "Posts", "Updates" ]
date: 2021-03-31
description: "Blog updates during March 2021."
draft: false
lastmod: 2021-03-31
tags: []
title: "March 2021 Updates"
type: "post"
---

* Added a new page on the {{% link text="uSiP Component Package" src="/pcb-design/component-packages/usip-component-package" %}}.

    {{% figure src="/pcb-design/component-packages/usip-component-package/sil10c-usip-component-package-3d-render.png" width="200px" %}}

* Added a new page on {{% link text="Light-Dependent Resistors (LDRs)" src="/electronics/components/light-dependent-resistors-ldrs" %}}.

* Added data on the {{% link text="Early Voltage" src="/electronics/components/transistors/bipolar-junction-transistors-bjts#early-voltage-va" %}} `\(V_A\)` and {{% link text="thermal voltage" src="/electronics/components/transistors/bipolar-junction-transistors-bjts#thermal-voltage" %}} `\(V_T\)` to the Bipolar Junction Transistors (BJTs) page.

* Added {{% link text="schematics and a design procedure" src="/electronics/components/transistors/bipolar-junction-transistors-bjts#using-a-resistor-divider-to-drive-the-base" %}} for a NPN BJT current-sink whose base is driven by a resistor divider.

    {{% figure src="/electronics/components/transistors/bipolar-junction-transistors-bjts/current-source-npn-voltage-divider-base.svg" width="400px" %}}

* Added {{% link text="schematics and a design procedure" src="/electronics/components/transistors/bipolar-junction-transistors-bjts#current-mirrors" %}} for a BJT current mirror.

* New {{% link text="PlatformIO page" src="/programming/integrated-development-environments-ides/platform-io" %}}.

    {{% figure src="/programming/integrated-development-environments-ides/platform-io/platformio-logo.png" width="150px" %}}

* Updated the {{% link text="size codes on the SMD Electrolytic Capacitor Packages page" src="/pcb-design/component-packages/smd-electrolytic-capacitor-packages" %}}.

* Added info on the {{% link text="hybrid-pi transistor model to the Bipolar Junction Transistors (BJTs) page" src="/electronics/components/transistors/bipolar-junction-transistors-bjts#hybrid-pi-transistor-model" %}}.

    {{% figure src="/electronics/components/transistors/bipolar-junction-transistors-bjts/hybrid-pi-model.svg" width="600px" %}}

* Added a new page on {{% link text="Reliability Engineering For Electronics" src="/electronics/circuit-design/reliability-engineering-for-electronics" %}}

* Added a open-loop vs. closed-loop bode plot and generalized negative feedback block diagram (with equations) to the Op-Amps page.

* Added new page on the {{% link text="TO-99 Component Package" src="/pcb-design/component-packages/to-99-component-package" %}}.

    {{% figure src="/pcb-design/component-packages/to-99-component-package/lm741h-op-amp-to-99-component-package-photo.jpg" width="200px" %}}

* Added a new page on the {{% link text="Thermoelectric Effect" src="/electronics/circuit-design/thermoelectric-effect" %}}.

    {{% figure src="/electronics/circuit-design/thermoelectric-effect/seebeck-effect-two-wires-across-temp-differential.svg" width="600px" %}}

* Added a new page on the {{% link text="TO-247 Component Package" src="/pcb-design/component-packages/to-247-component-package" %}}.

    {{% figure src="/pcb-design/component-packages/to-247-component-package/to-247ac-component-package-3d-render-infineon.jpg" width="300px" %}}

* Updated the `img` shortcode so that caption text is now rendered as markdown (done by calling the hugo function `| markdownify` on the passed in parameter). This allows things such as the ability to add URL links into the image caption, great when referencing the source of the image.

* Added a section to the Op-Amp page on Negative Impedance Converters (NICs).

    {{% figure src="/electronics/components/op-amps/negative-impedance-converter-nic.svg" width="500px" %}}

* Merged the Passive Filters and Active Filters pages into a single new [Analogue Filters page](/electronics/circuit-design/analogue-filters/) and re-organized the entire page.

* Added info on the {{% link text="Sallen-Key filter topology" src="/electronics/circuit-design/analogue-filters#sallen-key-filters" %}}.

    {{% figure src="/electronics/circuit-design/analogue-filters/low-pass-sallen-key/low-pass-sallen-key.svg" width="800px" %}}

* Added info on {{% link text="four common analogue filter optimizations/tunings (Butterworth, Chebyshev, Bessel and Elliptic)" src="/electronics/circuit-design/analogue-filters#filter-optimizations-1" %}}.

    {{% figure src="/electronics/circuit-design/analogue-filters/low-pass-filter-optimization-comparison-gain-db.png" width="800px" %}}

* Added info on overriding the standard library version of `malloc()` (and friends) with an application specific version:

    ```c
    #include <stdlib.h>

    int main()
    {
        int* i = malloc(sizeof(int));
        free(i);   
    }

    void* malloc(size_t s)
    {
        printf("My custom malloc() called");
        return NULL;
    }

    void free(void* p)
    {
        printf("My custom free() called");
    }
    ```

* Added info on the {{% link text="MQTT broker Mosquitto and MQTT client Paho" src="/electronics/communication-protocols/mqtt-protocol" %}}.

    {{% figure src="/electronics/communication-protocols/mqtt-protocol/mqtt-logo.png" width="400px" %}}