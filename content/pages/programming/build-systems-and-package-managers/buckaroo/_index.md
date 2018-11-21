---
author: gbmhunter
date: 2018-03-12 23:29:06+00:00
draft: false
title: Buckaroo
type: page
url: /programming/build-systems-and-package-managers/buckaroo
---

# Installation




**Ubuntu**





	  1. Install Linuxbrew if you don't already have it (you probably won't):  


    
    $ sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"




Follow the prompts. Once installed, add Linuxbrew to your path:



    
    $ echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >>~/.profile
    $ echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"' >>~/.profile
    $ echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"' >>~/.profile
    



	  2. Add facebook/fb as a tap:  


    
    $ brew tap facebook/fb



	  3. Finally, install Buckaroo:  


    
    $ brew install loopperfect/lp/buckaroo






This will install Java and Ant if they are required, so this step may take a while.




# Dependencies




Buckaroo only supports downloading dependencies (packages) from GitHub, GitLab or BitBucket. It does not support the use of local (file system) dependencies.



