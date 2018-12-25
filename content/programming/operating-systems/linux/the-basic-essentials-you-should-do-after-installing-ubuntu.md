---
author: gbmhunter
date: 2014-07-21 23:44:57+00:00
draft: false
title: The Basic Essentials You Should Do After Installing Ubuntu
type: page
url: /programming/operating-systems/linux/the-basic-essentials-you-should-do-after-installing-ubuntu
---

## Make The Up/Down Keys Search History

This assumes you are using the Gnome terminal. This has been tested with Ubuntu 14.04.

1. Edit ~/.inputrc with this command (to apply the change to the current user only):

    ```shell
    gedit ~/.inputrc
    ```
    or, to apply it system wide (assuming you have admin privileges):
    gedit /etc/.inputrc
2. Add the following lines:

    ```shell
    "\e[A":history-search-backward
    "\e[B":history-search-forward
    ```

3. Save then close the file.

4. Execute this command in a terminal (not that you cannot source the .inputrc file):

    ```shell
    bind -f ~/.inputrc
    # OR
    sudo bind -f /etc/.inputrc
    ```

5. Done!

## Turn On Mutiple Workspaces

Multiple workspaces (also called virtual desktops by Ubuntu) is a great feature to enable for increased productivity.

Assuming you are using the unity interface (the default for Ubuntu v14.x or v16.x), navigate to _System Settings_, then click _Appearance_, and then click the _Behaviour_ tab. Tick the _Enable workspaces_ checkbox and you're done!

To switch workspaces, press Ctrl-Alt (on a Windows keyboard) or Cmd-Alt (on a Mac keyboard) along with an arrow key, e.g. Ctrl-Alt-RightArrow to move to the workspace to the right.

## To Add More Workspaces

How to add more workspaces than the default 4 you get when enabling the option in the GUI? Easy, change the vsize and hsize settings! If you wanted 6 (2 across, 3 down), enter the following commands from the terminal:

 ```shell
 ~$ settings set org.compiz.core:/org/compiz/profiles/unity/plugins/core/ hsize 2
 ~$ settings set org.compiz.core:/org/compiz/profiles/unity/plugins/core/ vsize 3
 ```

It always has to be arranged in a grid, but you can practically have as many as you want.

## Install Linuxbrew

Linuxbrew is a copy of Mac's Homebrew for Linux. It's useful for installing applications that may not have built in installation support using apt or yum.

See [http://linuxbrew.sh/](http://linuxbrew.sh/) for installation instructions.

## Install fzf For Better Reverse Lookup

See [https://github.com/junegunn/fzf](https://github.com/junegunn/fzf) for installation instructions (I recommend using Linuxbrew).

## Install fd For Better find

See [https://github.com/sharkdp/fd](https://github.com/sharkdp/fd) for installation instructions. Really easy to install on Debian systems.

## Increase Max Num. of Open Files

Sometimes you might run into the error:

```
too many open files in system
```

Linux puts a limit on the max. number of files that can be open at any one time (`kern.maxfiles`), and the maximum number of files that can be open by a single process at any one time (`kern.maxfilesperproc`).

To see what the current limits are:

```shell
$ sysctl kern.maxfiles
kern.maxfiles: 12288
$ sysctl kern.maxfilesperproc
kern.maxfilesperproc: 10240
```

To increase the limits:

```shell
$ sudo sysctl -w kern.maxfiles=40000
kern.maxfiles: 12288 -> 40000
$ sudo sysctl -w kern.maxfilesperproc=35000
kern.maxfilesperproc: 10240 -> 35000
```