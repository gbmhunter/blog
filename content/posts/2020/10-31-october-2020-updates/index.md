---
author: "gbmhunter"
categories: [ "Posts", "Updates" ]
date: 2020-10-31
description: "Blog updates during October 2020."
draft: false
lastmod: 2020-10-31
tags: []
title: "October 2020 Updates"
type: "post"
---

* Resolved Netlify build error which started with commit [377ec8](https://github.com/gbmhunter/blog/commit/377ec857ebd40b45e7eda85e7eb307cd0edbc84f):

    ```text
    5:07:04 PM: ┌─────────────────────────────────────────────────────┐
    5:07:04 PM: │ Plugin "@netlify/plugin-deploy-core" internal error │
    5:07:04 PM: └─────────────────────────────────────────────────────┘
    5:07:04 PM: ​
    5:07:04 PM:   Error message
    5:07:04 PM:   Invalid response from buildbot: Error: The TCP connection with the buildbot timed out after 60000ms
    ```

    Then commit [377ec8](https://github.com/gbmhunter/blog/commit/377ec857ebd40b45e7eda85e7eb307cd0edbc84f) started working (the build took 1m 30s). But we got the error message with commit [58fcb9](https://github.com/gbmhunter/blog/commit/58fcb99c31091a54d899babb27933b40ff10ffac):

    ```text
    9:25:17 PM: ┌────────────────────────────────────┐
    9:25:17 PM: │ 1. build.command from netlify.toml │
    9:25:17 PM: └────────────────────────────────────┘
    9:25:17 PM: ​
    9:25:17 PM: $ hugo --minify
    9:26:18 PM: Building sites … Total in 61644 ms
    9:26:18 PM: Error: Error building site: "/opt/build/repo/content/electronics/projects/columbus-radio/index.md:1:1": timed out initializing value. You may have a circular loop in a shortcode, or your site may have resources that take longer to build than the `timeout` limit in your Hugo config file.
    ```

    I then tried Netlify options to rebuild the `HEAD` of the `master` branch without cache, and the build worked!

* Added a page on the {{% link text="SOT-583 component package" src="/pcb-design/component-packages/sot-583-component-package" %}}.

* Added a page on the {{% link text="SOT-883 component package" src="/pcb-design/component-packages/sot-883-component-package" %}}.

* Added a page on the {{% link text="PowerDI123 component package" src="/pcb-design/component-packages/powerdi123-component-package/" %}}.

* Added information about SOA (_Safe Operating Area_) graphs and how to use them to the {{% link text="MOSFET page" src="/electronics/components/transistors/mosfets#mosfet-safe-operating-areas" %}}