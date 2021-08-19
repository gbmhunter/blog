---
title: "Site Migration To Hugo Complete"
description: "Details on the migration of this blog from Wordpress to Hugo."
tags: [ "blog", "hugo", "wordpress", "migration", "cms", "static site generation", "gatsby", "export", "menu", "partials", "layout", "disqus", "vglnk", "page speed", "seo" ]
authors: [ "Geoffrey Hunter" ]
date: "2018-12-15"
lastmod: "2018-12-20"
type: "post"
draft: false
---

The migration of blog.mbedded.ninja from Wordpress to Hugo is complete!

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/wordpress-to-hugo.png" width="500px" >}}

My site has been powered for the last 7 years by Wordpress (see [Site Info](/site-info) for an entire history of this blog). [Wordpress](https://wordpress.org/) is a great CMS (content management system) which runs on a server (I have been paying for hosting through GoDaddy). However, it was time to move to a static website generator, and I choose [Hugo](https://gohugo.io/). Read on for more details...

## The Benefits

* I can now write content using Markdown in a local code editor, rather than Wordpress's browser-based WSIWYG editor (I was using TinyMCE). 
* Easier/more reliable update/version tracking of the website. The entire site content is contained within a single Git repository (see [https://github.com/gbmhunter/blog](https://github.com/gbmhunter/blog) if you are interested) (which is accessible locally), rather than spread across hosted php/html files and a Wordpress database. No more need to exporting the entire database/public_html directory once per month and saving to the cloud for backup purposes.
* The content being local also gives me the ability to do site-wide text-based find/replace operations, or write scripts for more advanced manipulation/update features.
* Faster load times. Because the content is generated statically, page load times should be much faster than when running Wordpress (even with the use of good Wordpress caching plugins).
* Higher security. It unsurprisingly hard to hack a simple file server that does not run any custom server side code or plugins.
* Lower maintenance. I will no longer fear visiting my site one day to find it completely "borked", with some arcane Wordpress PHP error that takes days to resolve (this has happened many times in the past). This is also a big risk when updating plugins. 

## Hugo vs. Gatsby

I had a hard decision choosing Hugo over another static site generator such as Gatsby (which is node/React based). Hugo seemed to have a gentler learning curve, but is not as flexible. Hugo provides a HTML templating engine, and while you have access to code elements in the templates, you don't have the full power of javascript and the npm ecosystem behind you. I liked the idea of being able to use React components in Gatsby, but was turned away by the GraphQL syntax in Gatsby used to retrieve data.

Being that Hugo is a single compiled executable, there is no dependency issues you have to worry about. Compare that to when you install the Gatsby [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), which has around 1500 dependencies (which is rather typical of npm)! Sometimes npm native modules will fail to compile, and in general, the setup is just easier with Hugo. This however as a downside for Hugo, you can't just write a plugin to expand the functionality, with Hugo the code is written in Go and compiled into a binary.

## SEO

Hopefully one of the big improvements to the site's SEO will be from the speed increases (see the Speed section below). Below is a graph of the numbers of users per day for the last two months on the Wordpress blog:

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/wordpress-users-per-day-last-two-months.png" width="800px" >}}

## Speed

After moving to Hugo, I saw a huge increase in page load time performance. Load time went from 17.4s ("Time to Interactive") down to 4.9s. This was as measured by [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).

_Wordpress Page Speed_

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/wordpress-homepage-page-speed.png" width="500px" >}}

_Hugo Page Speed_

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/hugo-homepage-page-speed.png" width="500px" >}}

## The Wordpress Export

Given my blog has over 1000 pages and posts (combined), I did not want to migrate from Wordpress to hugo solely by hand. To help, I employed the use of the an exporter. I first tried [Schumacher/wordpress-to-hugo-exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter), but I did not have any luck with it (I did not get any output or sign that it completed, it might of ran into memory/performance issues due to the size of the blog). I instead had success with [exitwp-for-hugo](https://github.com/wooni005/exitwp-for-hugo). This exporter ran locally on an exported .xml file of Wordpress, and so was less likely to run into memory/performance issues.

As to be expected, the exporter got me 90% of the way (in terms of content migration), but the remaining 10% still took many weekend worth of work to complete. The exporter did not handle images, and so I ended up writing a script to deal with the issue. For the first few years that I was running Wordpress, I used the NextGEN gallery plugin to manage images. However, I switched to using the built in media manager after I discovered how much easier it was to drop an image into the current post or page. This meant that hundred of images appeared as `[singlepic]` tags in the markdown files that exitwp-for-hugo created.

I wrote a script to scan the markdown files, looking for `[singlepic]` tags. When the script finds one, it then makes a request to the Wordpress blog and downloads the HTML for the Wordpress page that the markdown was generated from. It then scans this HTML for the image element in the DOM associated with the `[singlepic]`. It then extracts the Wordpress URL for the image, and downloads the image into the `static/images/` directory in Hugo. Finally, it replaces the `[singlepic]` tag with the appropriate markdown that points tot he local image path.

I also added caching of both the HTML and downloaded image so that I didn't have to download the HTML twice for two separate images that were on the same page, and so that I didn't download the image multiple times when that image was used more than once on the blog. Even with the caching, this script took many hours to run.

## Nested Menu Structure

I wanted to recreate the nested menu structure I had on while running on Wordpress. All of this blog's pages are organized in a giant hierarchal structure. The top-level pages are displayed as first-level menu items. Then all child pages are displayed under that as sub-menu items. Then all the child's child pages are displayed under that as sub-sub menu items, e.t.c.

I managed to recreate this by creating menu **layout partials** in Hugo that uses **recursion**. This works because I have structured the markdown into hierarchal **sections** (another Hugo concept).

**menu.html:**

```html
<ul class="menu">
    {{ with .Site.GetPage "/" }}
        {{ range .Sections.ByTitle }}
            {{ if ne .Title "Posts" }}
                <li class="dropdown">
                    <a href="{{.Permalink}}"><div class="menu-text">{{ .Title }}</div><div class="right-arrow">▶</div></a>
                    {{ partial "menu_recursive.html" . }}
                </li>
            {{ end }}
        {{ end }}
    {{ end }}
    {{ with .Site.GetPage "/posts" }}
        <li class="dropdown">
            <a href="{{.Permalink}}"><div class="menu-text">{{ .Title }}</div></a>
        </li>
    {{ end }}
</ul>
```

Above, there is some conditional logic to not include the `posts/` content mixed in with all the page content. Instead, `posts/` is added at the bottom of the menu manually.

**menu_recursive.html:**

```html
{{ if or (.Sections) (.Pages) }}
    <ul class="submenu">
        {{ range .Sections.ByTitle }}
            <li class="dropdown">
                <a href="{{.Permalink}}"><div class="menu-text">{{ .Title }}</div><div class="right-arrow">▶</div></a>
                {{ partial "menu_recursive.html" . }}
            </li>
        {{ end }}
        {{ range .Pages.ByTitle }}
            <li>
                <a href="{{.Permalink}}"><div class="menu-text">{{ .Title }}</div></a>
                {{ partial "menu_recursive.html" . }}
            </li>
        {{ end }}
    </ul>
{{ end }}
```

## General Layout/Theming

I wanted to keep appearance of the Hugo generated site to be very similar to the current Wordpress look (I am using a custom theme in Wordpress that is built upon the [Wordpress TwentyFifteen theme](https://en-ca.wordpress.org/themes/twentyfifteen/)). I initially chose the Hugo anake theme when I was beginning the migration, and after learning more about how the theme works, decided to write my own (they aren't that tricky).

At the point that I migrated to Hugo, my Wordpress blog homepage looked like:

<div style='position:relative; padding-bottom:48.37%'><iframe src='https://gfycat.com/ifr/EnlightenedInferiorBluegill' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

And now the Hugo-generated blog homepage looks like:

<div style='position:relative; padding-bottom:48.37%; margin-top: 40px;'><iframe src='https://gfycat.com/ifr/MassiveHappygoluckyAntarcticgiantpetrel' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

Quite similar right?

## Consistent Page URLs

I tried hard to keep all page URLs identical during this migration, as any change would have a significant impact on SEO and reduce the number of visitors/day (I found this out the hard way when I migrated from my previous domain to blog.mbedded.ninja).

I'm pleased to say that all page URLs should be the same. Post URLs have changed, however I don't think this is nearly as important because the posts on this blog are more about updates than actual content that users will want to visit (posts do not feature in the most visited pages).

## Weird vglnk Behaviour

I noticed that URLs that were embedded within image captions were getting corrupted. This was occuring about 1s after the initial page load. On inspection of the HTML elements, I noticed that the URL had been broken up into many small `<span>` elements, and that each one of these elements had been assigned the class `vglnk`. After a bit of Googling, I realized that the Disqus plugin (for commenting) was causing this. To fix this, I had to disable *Tracking* and *Affiliate links* in the *Advanced* section of the Disqus config, as shown below:

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/disqus-admin-vglnk-url-corruption.png" width="500px" caption="The two checkboxes I had to disable in my Disqus settings to prevent Disqus from corrupting URLs on the rest of the page, and adding vglnk classes." >}}

## DNS Updates

The following DNS changes were made on my GoDaddy account:

*Previous DNS Settings*

* Type: A
* Name: blog
* Value: 160.153.162.18
* TTL: 600s

*Updated DNS*

* Type: CNAME
* Name: blog
* Value: blog-mbedded-ninja.netlify.com
* TTL: 1 hour

## Mobile Compatibility

Currently, this site is not mobile compatible (what is called *responsive*). This is what the homepage currently looks like when rendered on a cellphone.

{{< figure src="/images/posts/2018-12-15-site-migration-to-hugo-complete/mbedded-ninja-homepage-mobile-device.png" width="400px" caption="This is what the blog.mbedded.ninja homepage currently looks like when rendered on a cellphone. Urgh..." >}}

Hopefully I can fix this soon!