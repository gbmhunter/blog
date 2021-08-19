---
authors: [ "Geoffrey Hunter" ]
categories: [ "Posts", "Updates" ]
date: 2020-03-14
description: "How a search feature was added to the statically built blog.mbedded.ninja website running Hugo."
draft: false
lastmod: 2020-03-14
tags: [ "search", "fuse", "flexsearch", "Javascript", "Hugo", "client", "browser", "indexing", "blog", "JSON", "dictionary" ]
title: "We Now Have Search"
type: "post"
---

When I switched from using Wordpress to Hugo I thought I was giving up on search functionality on this blog. I just discovered recently I was wrong! After coming across the post [Fast, keyboard optimized search for Hugo](https://discourse.gohugo.io/t/fast-keyboard-optimized-search-for-hugo/23824) I saw that it can indeed be done. The trick to get Hugo to output a single `.json` file containing all of the sites textual content. This will serve as the "dictionary" for our search engine. We then use Javascript running on the clients browser to download this `.json` dictionary, index the data, and then provide search functionality to the user.

The above-linked forum post used the Javascript library [fuse](https://fusejs.io/) to provide the search functionality. However I found this library to be somewhat slow given the large amount of text it had to index (2.4MiB in this case). Instead, I settled on the Javascript library [flexsearch](https://github.com/nextapps-de/flexsearch) which was much faster and gave me greater control over how the text was indexed. The demo of the new search feature is shown in the `.gif` below:

{{% img src="example-of-search-in-blog.gif" width="800px" caption="A demo of the new search functionality added for blog.mbedded.ninja." %}}

The screenshot below of the Network panel in the Chrome Developer Tools shows the time it takes to download the blog's search dictionary (which is called `index.json`) to the client's browser. The HTTP2 protocol automatically compresses the 2.4MiB file down to only 786kiB (which is great, it means I don't have to implement compression myself, and don't have to do it in slow Javascript). This file is only downloaded if the user clicks the "Search" button, as not to slowdown the pace of regular browsing or chew up data when it's not required. I'm hoping the browser will automatically cache this file so it is not re-downloaded on subsequent searches.

{{% img src="search-dictionary-download-speed.png" width="700px" caption="The Network panel of the Chrome Developer Tools showing the time it takes to download the site's search dictionary (index.json) to the clients browser." %}}

All-in-all, it was only about 4 hours effort to get the search feature to where it is now! It is the result of a small amount of HTML, Javascript and CSS embedded within the Hugo blog. For anyone who wants to use it for inspiration (or copy it, it's open source!), it can be found in the following places:

* Static HTML: [https://github.com/gbmhunter/blog/blob/master/layouts/_default/baseof.html](https://github.com/gbmhunter/blog/blob/master/layouts/_default/baseof.html)
* Javascript: [https://github.com/gbmhunter/blog/blob/master/static/js/fastsearch.js](https://github.com/gbmhunter/blog/blob/master/static/js/fastsearch.js)
* CSS: [https://github.com/gbmhunter/blog/blob/master/static/css/style.css](https://github.com/gbmhunter/blog/blob/master/static/css/style.css).

Other examples of static site search functionality can be found all over the web. Some examples include:

* [http://meta.ath0.com/search/](http://meta.ath0.com/search/).
* The gohugo.com page ["Search for your Hugo Website"](https://gohugo.io/tools/search/).
* The gatsbyjs.org page ["Adding Search"](https://www.gatsbyjs.org/docs/adding-search/) (note that this is for another popular static website building tool called Gatsby, not Hugo).