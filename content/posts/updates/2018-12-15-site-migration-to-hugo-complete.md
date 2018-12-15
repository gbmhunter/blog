---
title: "Site Migration To Hugo Complete"
date: 2018-12-15
type: post
---

The migration of blog.mbedded.ninja from Wordpress to Hugo is complete!

{{< figure src="/images/programming/hugo-logo.png" width="500px" caption="Hugo's logo." >}}

My site has been powered for the last X years by Wordpress. Wordpress is a great CMS (content management system) which runs on a server (I have been paying for hosting through GoDaddy).

**Benefits**

* I can now write content using Markdown in a local code editor, rather than Wordpresses browser-based WSIWYG editor (I was using TinyMCE). 
* Easier/more reliable update/version tracking of the website. The entire site content is contained within a single Git repository (see XXX if you are interested) (which is acessible locally), rather than spread across hosted php/html files and a Wordpress database. No more need to exporting the entire database/public_html directory once per month and saving to the cloud for backup purposes.
* The content being local also gives me the ability to do site-wide text-based find/replace operations, or write scripts for more advanced manipulation/update features.
* Faster load times. Because the content is generated statically, page load times should be much faster than when running Wordpress (even with the use of good Wordpress caching plugins).


