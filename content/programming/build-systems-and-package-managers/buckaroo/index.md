---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Build Systems And Package Managers" ]
date: 2018-03-12
draft: false
title: Buckaroo
type: page
---

## Installation

**Ubuntu**

1. Install Linuxbrew if you don't already have it (you probably won't):  

    ```sh
    $ sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
    ```

    Follow the prompts. Once installed, add Linuxbrew to your path:

    ```sh
    $ echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >>~/.profile
    $ echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"' >>~/.profile
    $ echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"' >>~/.profile
    ```
2. Add facebook/fb as a tap:  

    ```sh
    $ brew tap facebook/fb
    ```

3. Finally, install Buckaroo:  

    ```sh    
    $ brew install loopperfect/lp/buckaroo
    ```

    This will install Java and Ant if they are required, so this step may take a while.

## Dependencies

Buckaroo only supports downloading dependencies (packages) from GitHub, GitLab or BitBucket. It does not support the use of local (file system) dependencies.
