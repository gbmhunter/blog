---
author: gbmhunter
date: 2014-11-05 09:28:59+00:00
draft: false
title: Two Bugs Which Need Fixing Soon...
type: post
url: /site-admin/two-bugs-which-need-fixing-soon
categories:
- Site Admin
tags:
- anchors
- asterisks
- bugs
- headings
- quicklatex
- resistors
- symbols
---


  1. Lately, a strange asterisk has popped up next to all page headings. Clicking it takes you almost back up to the top of the page. I think this might have something to do with an upgrade to the [Better Anchor Links plugin](https://wordpress.org/plugins/better-anchor-links/) I use to automatically create a "Contents" section at the top of the page which has hyperlinks to all the the pages headings.
[caption id="attachment_8802" align="aligncenter" width="452"][![Weird asterisks appearing after the page headings!](http://blog.mbedded.ninja/wp-content/uploads/2014/11/bug-asterisk-appearing-after-page-headings.png)
](http://blog.mbedded.ninja/wp-content/uploads/2014/11/bug-asterisk-appearing-after-page-headings.png) Weird asterisks appearing after the page headings![/caption]


UPDATE 2014-11-07: It is indeed a problem caused by the Better Anchor Links plugin. The plugin supports an option to add a "back link", which adds a character beside each header that takes you back to the start of the page. This is what you are seeing here. I don't know why they appearing throughout my site, when I clearly have the option **unticked** in the settings page for the plugin. As a temporary fix, I commented out the entire body of the function 



    
    function add_backlinks_to_content($content)




from the file wp-content/plugins/better-anchor-links/mwm-aal-class.php, except the last line, return $content;. I don't expect this fix to remain upon upgrading the plugin, but hopefully the author has fixed the bug by this time.



  2. The resistor symbols on the Resistors page are not being rendered. The error messages given are: "QuickLatex cannot compile formula..." and "Error: cannot create svg file.". I think this might have something to do with me switching back to using the Visual editor rather than the raw text error.  

[caption id="attachment_8801" align="aligncenter" width="569"][![The resistor symbols on the Resistors page are not being rendered.](http://blog.mbedded.ninja/wp-content/uploads/2014/11/bug-quick-latex-not-rendering-resistor-symbols.png)
](http://blog.mbedded.ninja/wp-content/uploads/2014/11/bug-quick-latex-not-rendering-resistor-symbols.png) The resistor symbols on the Resistors page are not being rendered.[/caption]


UPDATE 2014-11-25: This has been fixed, the problem was caused by Wordpress inserting HTML breaks (<br>) into the Latex code when switching from the text to visual editor. This was occurring even when the Raw HTML plugin was enabled, which is meant to stop this thing from happening!




