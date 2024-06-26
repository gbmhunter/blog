---
authors: [ "Geoffrey Hunter" ]
categories: [ "Posts", "Updates" ]
date: 2022-09-30
description: "Blog updates during September 2022."
draft: false
images: [ ]
lastmod: 2022-09-30
tags: []
title: "September 2022 Updates"
type: "post"
---

## Updates This Month

* Create a new page for the [BJT common-collector amplifier](/electronics/circuit-design/bjt-common-collector-amplifier/).
    {{% figure src="bjt-common-emitter-screenshot.png" width="500px" %}}

* Updates to the [Kalman Filter page](/programming/signal-processing/digital-filters/kalman-filter/).

* Upgraded the Netlify build image from Ubuntu Xenial 16.04 (which is deprecated and was going to be unsupported in November 2022) to Ubuntu Focal 20.04. This initially caused a hugo build failure, which was resolved by adding `GEM_PATH` to the `security: exec: osEnv:` section of the `config.yaml`.
    {{% figure src="adding-gem-path-to-config-yaml.png" width="500px" %}}

* Added info on [charge pump output impedance](/electronics/components/power-regulators/charge-pumps/).
    {{% figure src="charge-pump-output-impedance-screenshot.png" width="500px" %}}

* Added a new page on [switched-capacitor circuits](/electronics/circuit-design/switched-capacitor-circuits/).
    {{% figure src="switched-capacitor-screenshot.png" width="500px" %}}

* Converted the [Analogue Filters page](/electronics/circuit-design/analogue-filters/) from Asciidoc to Markdown.

* Added info on [Elliptic filters](/electronics/circuit-design/analogue-filters/#elliptic-optimization).

* Moved the info on [Sallen-Key filters](/electronics/circuit-design/sallen-key-filters/) into it's own page. Added more info on low-pass and high-pass Sallen-Key filters, along with simulated examples and info on their high-frequency limitations.
    {{% figure src="sallen-key-screenshot.png" width="500px" %}}

* Moved the _PCB Design->PCB Manufacturing And Assembly Considerations_ page to _Electronics->Circuit Design->[The Schematic And PCB Design Guide](/electronics/circuit-design/the-schematic-and-pcb-design-guide/)_.

* Added a new page on [Switched Integrator ICs](/electronics/components/switched-integrator-ics/).
    {{% figure src="switched-integrator-ics-screenshot.png" width="500px" %}}

* Updated the [C++ On Embedded Systems page](/programming/languages/c-plus-plus/cpp-on-embedded-systems/) with more info and examples on what C++ features you should and shouldn't use in an embedded system. Also replaced a code example that was using a pointer to use a reference.
    {{% figure src="cpp-on-embedded-systems-screenshot.png" width="500px" %}}
