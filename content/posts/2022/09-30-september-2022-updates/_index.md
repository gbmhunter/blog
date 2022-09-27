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

* Updates to the [Kalman Filter page](/programming/signal-processing/digital-filters/kalman-filter/).

* Upgraded the Netlify build image from Ubuntu Xenial 16.04 (which is deprecated and was going to be unsupported in November 2022) to Ubuntu Focal 20.04. This initially caused a hugo build failure, which was resolved by adding `GEM_PATH` to the `security: exec: osEnv:` section of the `config.yaml`.
    {{% figure src="adding-gem-path-to-config-yaml.png" width="400px" %}}

* Added info on [charge pump output impedance](/electronics/components/power-regulators/charge-pumps/).

* Added a new page on [switched-capacitor circuits](/electronics/circuit-design/switched-capacitor-circuits/).

* Converted the [Analogue Filters page](/electronics/circuit-design/analogue-filters/) from Asciidoc to Markdown.

* Added info on Elliptic filters.

* Moved the info on Sallen-Key filters into it's own page.

* Moved the _PCB Design->PCB Manufacturing And Assembly Considerations_ page to _Electronics->Circuit Design->The Schematic And PCB Design Guide_.

* Added a new page on [Switched Integrator ICs](/electronics/components/switched-integrator-ics/).
