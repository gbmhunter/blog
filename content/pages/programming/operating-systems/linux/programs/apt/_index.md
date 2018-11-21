---
author: gbmhunter
date: 2018-01-16 18:16:14+00:00
draft: false
title: apt
type: page
url: /programming/operating-systems/linux/programs/apt
---

# Overview




The Linux program apt (Advanced Package Tool) is a collection of tools for managing Debian packages.




[![](/images/2018/02/sudo-apt-install-icon.png)
](/images/2018/02/sudo-apt-install-icon.png)




apt is a combination of the most widely used commands from apt-get and apt-cache. It is the recommended over apt-get when used by humans, as it is easier to use and looks better.




apt delegates the actual installation and removal of packages to dpkg.




# Aborted Package Lists




You may encounter the error "aborted package lists" when trying to run pretty much any apt command.



    
    $ sudo apt update
    ...
    Aborted package lists... 93%




I have been able to fix this by deleting all of the package lists in /var/lib/apt/lists with the following command:



    
    $ sudo rm /var/lib/apt/lists/* -vf




Then test if apt is working properly by running sudo apt update again.
