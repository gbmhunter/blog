---
author: "gbmhunter"
categories: [ "Posts", "Updates" ]
date: 2020-03-31
description: "Blog updates during March 2020."
draft: true
lastmod: 2020-03-31
tags: [ "search", "fuse", "flexsearch", "Javascript", "Hugo", "client", "browser", "indexing", "blog", "JSON" ]
title: "We Now Have Search"
type: "post"
---

When I switched from using Wordpress to Hugo I thought I was giving up on search functionality on this blog. I just discovered recently I was wrong! After coming across the post [Fast, keyboard optimized search for Hugo](https://discourse.gohugo.io/t/fast-keyboard-optimized-search-for-hugo/23824) I saw that it can indeed be done. The trick to get Hugo to output a single JSON file containing all of the sites textual content. This will serve as the "dictionary" for our search engine. We then use Javascript running on the clients browser to download this `.json` dictionary, index the data, and then provide search functionality to the user.

The above-linked forum post used the Javascript library [fuse](https://fusejs.io/) to provide the search functionality. However I found this library to be somewhat slow given the large amount of text it had to index. Instead, I settled on the Javascript library [flexsearch](https://github.com/nextapps-de/flexsearch) which was much faster and gave me greater control over how the text was indexed.

TODO: Add code example

TODO: Add gif showing search

TODO: Add network panel of debug tools when downloading dictionary