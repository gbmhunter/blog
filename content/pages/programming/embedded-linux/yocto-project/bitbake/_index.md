---
author: gbmhunter
date: 2018-01-15 19:22:01+00:00
draft: false
title: Bitbake
type: page
url: /programming/embedded-linux/yocto-project/bitbake
---

# Running Specific Commands




To run a specific bitbake command, use the -c option followed by the command:



    
    $ bitbake -c compile




-c can be followed with things such as:





	  * fetch
	  * coinfigure
	  * compile
	  * package
	  * clean



To force a bitbake command, use the -f option:



    
    $ bitbake -f -c compile




# Debug Output




The -v option increases the amount of info that bitbake prints.



    
    $ bitbake -v core-image-minimal




But you can do better! You can also add the options -DDD for even more debug output!



    
    $ bitbake -v -DDD core-image-minimal






