---
authors: [ Geoffrey Hunter ]
categories: [ Posts, Updates ]
date: 2023-10-31
description: Blog updates during October 2023.
draft: false
images: []
lastmod: 2023-10-31
tags: []
title: October 2023 Updates
type: post
---

* This month I was solely focused on [NinjaTerm](https://github.com/gbmhunter/NinjaTerm) development. We went from `v4.3.0` through to `v4.7.0` in the month of October. Updates to NinjaTerm are highlighted below.

* Terminals are now focusable by the user, with the cursor changing appearance and a background glow shown when focused.

* Tab key press gets handled and correct bytes sent correctly across the serial port.

* Addition of a graphing feature which can extract data points from incoming data and graph them live.
    {{% figure src="graphing.gif" width="600px" %}}

* Easter egg style "fake ports" to NinjaTerm for demo/testing purposes. Press "f" when the serial port config. settings are visible to show the fake port selection screen.
    {{% figure src="fake-ports-screenshot.png" width="600px" %}}

* Ability to change terminal font size.
    {{% figure src="change-font-size-screenshot.png" width="400px" %}}

* Added initial Playwright e2e (end-to-end) tests.
    {{% figure src="playwright-test-ui-screenshot.png" width="600px" %}}

* Fixed an annoying rendering glitch where I was using React's `useEffect()` but should of been using `useLayoutEffect()`.

* Migrated from using `react-starter`/Webpack to build to using Vite, it's much faster! Also migrated the unit tests from using Jest/RTL to using Vitest (which works really well with Vite).
    {{% figure src="vite-build-screenshot.png" width="400px" %}}

* Improved the version updating process -- Now a snackbar pops up when a new version is available giving the user the choice to reload and update. This was easily added thanks to Vite's PWA plugin.
    {{% figure src="new-version-available-screenshot.png" width="700px" %}}

* Added settings to be able to configure behaviour on receipt of carriage return and line feed characters.
    {{% figure src="new-line-and-carriage-return-settings-screenshot.png" width="600px" %}}
