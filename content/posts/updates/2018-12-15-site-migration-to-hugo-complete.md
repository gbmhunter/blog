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
* Higher security. It unsurprizengly hard to hack a simple file server that does not run any custom server side code or plugins.
* Lower maintenance. I will no longer fear visiting my site one day to find it completely "borked", with some arcane Wordpress PHP error that takes days to resolve (this has happened many times in the past). This is also a big risk when updating plugins. 

I had a hard decision choosing Hugo over another static site generator such as Gatsby (which is node/React based). Hugo seemed to have a gentler learning curve, but is not as flexible. Hugo provides a HTML templating engine, and  

