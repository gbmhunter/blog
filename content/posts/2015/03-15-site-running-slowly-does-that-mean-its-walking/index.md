---
authors: [ "Geoffrey Hunter" ]
categories: [ "Site Admin" ]
date: 2015-03-15
draft: false
lastmod: 2015-03-15
tags: [ "profilers", "website", "Discus", "nextgen", "debugging", "Wordpress", "performance", "tests", "plugin" ]
title: Site Running Slowly (Does That Mean It's Walking?)
type: post
---

My apologies for the REALLY slow performance of this website at the moment.

Load times (for a first-time load) are around a minute! Repeated load times are around 30-40s.

I have installed the [P3 (Plugin Performance Profiler) Wordpress plugin](https://wordpress.org/plugins/p3-profiler/), which should help me identify any issues with the plugins currently running on this site. Yes there are many of them, 51 are currently active. This is what the plugin had to say about things:

{{< img src="mbedded-ninja-plugin-speed-test-results.png" width="922px" caption="blog.mbedded.ninja plugin speed test results when using the P3 (plugin performance profiler) plugin."  >}}

P3 reports that the Discus commenting system is taking the most time. I did a quick Google and found no mention of other users having similar issues with this plugin. Strange.

I also ran the website through [www.webpagetest.org](http://www.webpagetest.org/). Here is a summary of the results:

{{< img src="mbedded-ninja-webpagetest-org-speed-test-results.png" width="1026px" caption="A summary of the performance test run on blog.mbedded.ninja by www.webpagetest.org."  >}}

Other things I'm suspicious about:

* NextGEN just released a series of "performance increase" updates. Maybe there is a bug in the new code?
* I have just started using the SB Plugin for automatically displaying child pages on parent pages. This might be the main culprit?

Hold tight, the debugging continues...
