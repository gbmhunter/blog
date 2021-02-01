---
author: "gbmhunter"
categories: [ "Posts", "Updates" ]
date: 2020-09-30
description: "Blog updates during September 2020."
draft: false
lastmod: 2020-09-30
tags: []
title: "September 2020 Updates"
type: "post"
---

* Added info about {{% link text="board packages to the Arduino page" src="/programming/microcontrollers/arduino" %}}.

    {{% figure src="/programming/microcontrollers/arduino/arduino-logo.svg" width="200px" %}}

* Added info about {{% link text="schematic page templates to the A Beginners Intro To KiCAD page" src="/electronics/general/kicad/kicad-tips-and-tricks" %}}.

* Added support for the search service Algolia.

    {{% figure src="/posts/2020/09-30-september-2020-updates/logo-algolia-nebula-blue-full.svg" width="300px" caption="The Algolia logo." %}}

* Updated information about the `BC` range of BJTs on the {{% link text="Bipolar Junction Transistors (BJTs) page" src="/electronics/components/transistors/bipolar-junction-transistors-bjts" %}}.

    {{% figure src="/electronics/components/transistors/bipolar-junction-transistors-bjts/bc548-transistor-to92-photo.png" width="250px" %}}

* Added more online simulation tools to the {{% link text="Circuit Simulation page" src="/electronics/general/circuit-simulation" %}}.

* Added a new page on {{% link text="555 Timer Circuits" src="/electronics/circuit-design/555-timer-circuits" %}}. Added a [555 timer calculator to NinjaCalc](https://ninja-calc.mbedded.ninja/calculators/electronics/ics/555-timer-astable-rt-rb-c) (which is also embedded on the 555 Timer Circuits page).

    {{% figure src="/electronics/circuit-design/555-timer-circuits/555-timer-schematic-for-astable-operation-ti.png" width="400px" %}}

* Updated the {{% link text="Mbed Studio page" src="/programming/integrated-development-environments-ides/mbed-studio" %}}.

* Added a page on the {{% link text="EasyScale communication protocol" src="/electronics/communication-protocols/easyscale-protocol" %}}.

* Migrated [NinjaCalc](https://ninja-calc.mbedded.ninja/) from a [Vue.js](https://vuejs.org/) based app to [Next.js/React](https://nextjs.org/) based app. This took quite a long time to migrate, I'm estimating about 32 hours to migrate all functionality except for two calculators to Next.js. Deployments are now automatically done by [Vercel](https://vercel.com/) (I'm using the "Hobby" tier which is free forever). Unit/functional CICD testing has also been added with [GitHub Actions](https://github.com/features/actions). Commit <https://github.com/gbmhunter/NinjaCalc/commit/458137fb79237562acb8a3f3d09a13d30438bb49> was the beginning of the migration.

* Updated the {{% link text="Cables page" src="/electronics/components/cables" %}} with more information on cable insulation materials and combined power/data cables.

* Added a [Cable Gauge Calculator to the NinjaCalc app](https://ninja-calc.mbedded.ninja/calculators/electronics/cabling/wire-gauge-calculator).
