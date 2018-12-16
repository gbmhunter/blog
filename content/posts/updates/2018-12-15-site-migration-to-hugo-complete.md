---
title: "Site Migration To Hugo Complete"
date: 2018-12-15
type: post
draft: true
---

The migration of blog.mbedded.ninja from Wordpress to Hugo is complete!

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/wordpress-to-hugo.png" width="500px" >}}

My site has been powered for the last X years by Wordpress. Wordpress is a great CMS (content management system) which runs on a server (I have been paying for hosting through GoDaddy).

# Benefits

* I can now write content using Markdown in a local code editor, rather than Wordpresses browser-based WSIWYG editor (I was using TinyMCE). 
* Easier/more reliable update/version tracking of the website. The entire site content is contained within a single Git repository (see XXX if you are interested) (which is acessible locally), rather than spread across hosted php/html files and a Wordpress database. No more need to exporting the entire database/public_html directory once per month and saving to the cloud for backup purposes.
* The content being local also gives me the ability to do site-wide text-based find/replace operations, or write scripts for more advanced manipulation/update features.
* Faster load times. Because the content is generated statically, page load times should be much faster than when running Wordpress (even with the use of good Wordpress caching plugins).
* Higher security. It unsurprizengly hard to hack a simple file server that does not run any custom server side code or plugins.
* Lower maintenance. I will no longer fear visiting my site one day to find it completely "borked", with some arcane Wordpress PHP error that takes days to resolve (this has happened many times in the past). This is also a big risk when updating plugins. 

# Hugo vs. Gatsby

I had a hard decision choosing Hugo over another static site generator such as Gatsby (which is node/React based). Hugo seemed to have a gentler learning curve, but is not as flexible. Hugo provides a HTML templating engine, and while you have access to code elements in the templates, you don't have the full power of javascript and the npm ecosystem behind you. I liked the idea of being able to use React components in Gatsby, but was turned away by the GraphQL syntax in Gatsby used to retrieve data.

Being that Hugo is a single compiled executable, there is no dependency issues you have to worry about. Compare that to when you install the Gatsby [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), which has around 1500 dependencies (which is rather typical of npm)! Sometimes npm native modules will fail to compile, and in general, the setup is just easier with Hugo. This however as a downside for Hugo, you can't just write a plugin to expand the functionality, with Hugo the code is written in Go and compiled into a binary.

# SEO



# Speed

After moving to Hugo, I saw a huge increase in page load time performance. Load time went from 17.4s ("Time to Interactive") down to 4.9s. This was as measured by [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).

**Wordpress:**

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/wordpress-homepage-page-speed.png" width="500px" >}}

**Hugo:**

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/hugo-homepage-page-speed.png" width="500px" >}}

