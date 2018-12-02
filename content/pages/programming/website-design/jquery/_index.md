---
author: gbmhunter
date: 2014-01-05 19:45:29+00:00
draft: false
title: jQuery
type: page
url: /programming/website-design/jquery
---

# Preventing jQuery From Loading More Than Once

There are many times when, becuase you are including 3rd party files, jQeury may get loaded more than once. This is not recommended, and loading jQuery again wipes all the jQuery enviroment variables, which can break things.

Here is a easy way to only load jQuery if it has not already been loaded.

```html    
<script>
    window.jQuery || document.write('<script src="js/jquery.min.js">')
</script>
```