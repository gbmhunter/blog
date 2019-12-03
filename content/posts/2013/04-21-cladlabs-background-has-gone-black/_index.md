---
author: gbmhunter
categories: [ "Site Admin" ]
date: 2013-04-21
draft: false
lastmod: 2013-04-21
tags: [ "cladlabs", "motion", "theme", "transparency", "tricks" ]
title: CladLabs Background Has Gone Black
type: post
---

Ever since I adopted the [Motion theme](http://wordpress.org/extend/themes/motion) I've been slowly tweaking it (with a child theme of course). I've always liked darker themes (Visual Studio's dark theme rocks!), so I decided today to change the sites background to a dark, dark grey.

{{< img src="cladlabs-background-changed-to-black.png" caption="The CladLabs background has been changed to a dark, dark grey (April 2013)."  width="500px" >}}

And that's all I did. No heading, text, element background or other accent colour was modified, as yet it still looks good. How? Because this site uses so much transparency in all of the other HTML objects.  Rather than potentially clash with a background colour change, because of the transparency, they all take on a shade of the base colour.

To fully take advantage of this feature. I'm thinking that I might add the option of the user to be able to select what colour they want the view the site in. This could be a point of difference for the site, and gives users a pleasing change if they get bored with one colour scheme.
