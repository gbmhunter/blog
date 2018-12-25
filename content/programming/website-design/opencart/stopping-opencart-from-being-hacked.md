---
author: gbmhunter
date: 2014-02-18 08:03:07+00:00
draft: false
title: Stopping OpenCart From Being Hacked
type: page
url: /programming/website-design/opencart/stopping-opencart-from-being-hacked
---

I had the pleasure of an OpenCart installation I was maintaining being hacked. Here is what I did to prevent further attacks...

## Remove The /install/ Directory

As soon as you've installed OpenCart, remove the /install/ directory and all it's files, you won't need them again!

## Change Some File Permissions To 444

By default, all files have the permission level 644. Some vital ones can be further restricted to 444 to prevent anyone from changing them. The files to change are:

* index.php
* config.php
* admin/config.php

## Rename The /admin/ Folder

Plenty of attacks will be from bots which crawl the web, looking for specific pages which signify you are running opencart. One of these would be to check www.yourshopnamehere.com/admin. Renaming the admin folder prevents these bots from finding the page.

Firstly, rename the admin folder to a harder to guess name. Then replace all the occurances of /admin/ with your new path name in the files /config.php and /yournewadminfolder/config.php. Then browse to www.yourshopnamehere.com/yournewadminfolder, and the admin backend should work as normal!

Also, I checked out the vqMod plugins, and pretty much all of them had the admin folder path **hardcoded** into the scripts. These will need to be changed, otherwise **your plugins will break**. I ran the command:

```sh    
$ find -type f -exec sed -i "s/admin/yournewadminfolder/g" '{}' \;
```  

while in the /vqmod/xml directory to rename all occurances of admin to yournewadminfolder.

## Change Your Passwords

This is only really relevant if your looking at a way to hacker-proof your site **after** it has been hacked. If you are being pro-active about security, then don't worry about this step!

## Get A Admin-Area Logging Plugin

There are a few plugins (most cost US$10-15) that allow you to monitor acitivty on the admin section of your OpenCart install. These plugins normally log user login attemps, what admin pages they visit, and what changes they make. They log the user (if registered), their IP address, and other details.

One example is [Activity Logger With Invalid Login Attempt Monitor](https://www.opencart.com/index.php?route=marketplace/extension/info&extension_id=27703&filter_download_id=31), which uses vQmod and costs US$15.
