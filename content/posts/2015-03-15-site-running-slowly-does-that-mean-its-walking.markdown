---
author: gbmhunter
date: 2015-03-15 06:49:57+00:00
draft: false
title: Site Running Slowly (Does That Mean It's Walking?)
type: post
url: /site-admin/site-running-slowly-does-that-mean-its-walking
categories:
- Site Admin
tags:
- profiler
- website page discus nextgen debugging slow
- wordpress speed performance test p3 plugin
---

My apologies for the REALLY slow performance of this website at the moment.

Load times (for a first-time load) are around a minute! Repeated load times are around 30-40s.

I have installed the [P3 (Plugin Performance Profiler) Wordpress plugin](https://wordpress.org/plugins/p3-profiler/), which should help me identify any issues with the plugins currently running on this site. Yes there are many of them, 51 are currently active. This is what the plugin had to say about things:

[caption id="attachment_9903" align="aligncenter" width="922"][![blog.mbedded.ninja plugin speed test results when using the P3 (plugin performance profiler) plugin.](/images/2015/03/mbedded-ninja-plugin-speed-test-results.png)
](/images/2015/03/mbedded-ninja-plugin-speed-test-results.png) blog.mbedded.ninja plugin speed test results when using the P3 (plugin performance profiler) plugin.[/caption]

P3 reports that the Discus commenting system is taking the most time. I did a quick Google and found no mention of other users having similar issues with this plugin. Strange.

I also ran the website through [www.webpagetest.org](http://www.webpagetest.org/). Here is a summary of the results:

[caption id="attachment_9904" align="aligncenter" width="1026"][![A summary of the performance test run on blog.mbedded.ninja by www.webpagetest.org.](/images/2015/03/mbedded-ninja-webpagetest-org-speed-test-results.png)
](/images/2015/03/mbedded-ninja-webpagetest-org-speed-test-results.png) A summary of the performance test run on blog.mbedded.ninja by www.webpagetest.org.[/caption]

Other things I'm suspicious about:



	  * NextGEN just released a series of "performance increase" updates. Maybe there is a bug in the new code?
	  * I have just started using the SB Plugin for automatically displaying child pages on parent pages. This might be the main culprit?

Hold tight, the debugging continues...
