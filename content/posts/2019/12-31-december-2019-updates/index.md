---
author: "gbmhunter"
categories: [ "Posts", "Updates" ]
date: 2019-12-31
description: "Blog updates during December 2019."
draft: false
lastmod: 2019-12-31
tags: []
title: "December 2019 Updates"
type: "post"
---

* A new section on Hugo timeouts added to the {{% link text="Hugo page" src="/programming/website-design/static-website-generators/hugo#page-rendering-timeouts" %}}.

* Fixed three issues preventing me from upgrading from Hugo `v0.54.0` to `v0.60.1`, and then upgraded! The two issues were:

    * Hugo was getting stuck while building the site upon upgrade from `v0.56.3` to `v0.57.0`. Hugo would not report any error, but would not finish building the site even after waiting for 30mins. Memory usage would keep increasing until all system resources were consumed. I had a feeling that this may be due to infinite recursion occurring somewhere. I disabled the `menu` shortcode that I wrote, as that used recursion to build the menu structure, and then the Hugo build completed. After looking over the `menu` shortcode code and verifying that the recursion should be terminating properly, on a hunch I tried updating all the `index.md` pages to `_index.md`, which allowed me to re-enabled the menu shortcode.

    * Hugo would timeout with the following error:

        ```text
        3:42:50 PM: Error: Error building site: "/opt/build/repo/content/electronics/projects/columbus-radio/index.md:1:1": timed out initializing value. This is most likely a circular loop in a shortcode
        ```

        but only when building on the CICD server (Netlify). I removed this `columbus-radio` page and would fail on another specific page. While these specific pages didn't use any unique shortcodes that the other pages didn't, I did notice that these pages contained a large number of image resources.

        {{< img src="screenshot-columbus-radio-directory.png" width="500px" caption="A screenshot showing the number of image resources in the `columbus-radio` page." >}}

        Hugo had a default timeout of 10s per page, and pages with a large number of image resources were taking longer than this to process (the images are scaled and resampled). This was an easy fix, I just increased Hugo's timeout to 30s in `config.toml`:

        ```toml
        timeout = 30000
        ```

    * Images and other HTML elements that used shortcodes disappeared from the website. This occurred between `v0.59.1` and `v0.60.0`. This ended up being caused by Hugo's switch from using [Blackfriday](https://github.com/russross/blackfriday) to [Goldmark](https://github.com/yuin/goldmark/) as the default markdown renderer, and along with that the associated increase in the default security settings to now allow inline HTML within markdown. This issue was fixed by adding the following to `config.toml`:

        ```toml
        [markup.goldmark.renderer]
            unsafe = true
        ```

* Updated the {{% link text="Rust page" src="/programming/languages/rust" %}} with code examples showing how to use `cargo`, the basics of _ownership_, casting in Rust, and information on IDE support.

* Added a new page on {{% link text="Map Tile Servers" src="/space/map-tile-servers" %}}.

* Updated the {{% link text="tmux page" src="/programming/operating-systems/linux/programs/tmux" %}} with a walk-through on how to install tmux from source.
