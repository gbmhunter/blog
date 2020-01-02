---
author: gbmhunter
categories: [ "Programming", "Web Design" ]
date: 2014-01-05
draft: false
tags: [ "programming", "web design" ]
title: jQuery
type: page
---

## Preventing jQuery From Loading More Than Once

There are many times when, because you are including 3rd party files, jQeury may get loaded more than once. This is not recommended, and loading jQuery again wipes all the jQuery environment variables, which can break things.

Here is a easy way to only load jQuery if it has not already been loaded.

```html    
<script>
    window.jQuery || document.write('<script src="js/jquery.min.js">')
</script>
```