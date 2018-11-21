---
author: gbmhunter
date: 2017-03-27 00:27:19+00:00
draft: false
title: NinjaCalc Is Now A Web App
type: post
url: /ninjacalc/ninjacalc-is-now-a-web-app
categories:
- NinjaCalc
tags:
- calculators
- embedded
- engineering
- git
- github
- heroku
- java
- ninjacalc
- porting
- server
- vue.js
- web app
- website
---

NinjaCalc, a "collection of embedded engineering related calculators", is now a web app (go to [http://ninja-calc.mbedded.ninja/](http://ninja-calc.mbedded.ninja/) to try it out)!


[caption id="attachment_14097" align="aligncenter" width="1920"][![](http://blog.mbedded.ninja/wp-content/uploads/2017/03/ninja-calc-v2.2.0-screenshot-calc-selection-page.png)
](http://blog.mbedded.ninja/wp-content/uploads/2017/03/ninja-calc-v2.2.0-screenshot-calc-selection-page.png) NinjaCalc is now a web app! A screenshot while selecting a calculator using the new web app at http://ninja-calc.mbedded.ninja/.[/caption]


Up until now NinjaCalc has been a desktop app written in Java (as [NinjaTerm](http://mbedded-ninja.github.io/NinjaTerm/) still is). However, the functionality that NinjaCalc provided had no need to be a installable desktop app, and I had long desired to move it to the easily accessible web.




When I recently discovered [vue.js](https://vuejs.org/), I finally decided to make the move (after trying both [React](https://facebook.github.io/react/) and [AngularJS](https://angularjs.org/) a year or so ago but deciding not to use them). It was the simplicity and flexibility of vue.js which was the deciding factor. Porting took about 3 weeks of full-time work (luckily I was unemployed at the time).




After trying out [Heroku](https://www.heroku.com/) as the deployment platform, I eventually choose to deploy it on my server instead due to increased configuration flexibility (incl. the ability to setup the Apache server routing with .htaccess files). rsync is used to copy the production files over ssh onto my server.




The newest version of the Java based NinjaCalc (v1.3.0) can still be downloaded from [https://github.com/mbedded-ninja/NinjaCalc/releases/tag/v1.3.0](https://github.com/mbedded-ninja/NinjaCalc/releases/tag/v1.3.0), although this will slowly deviate from the web app as the web app is developed further.




Existing users of NinjaCalc may appreciate the similarity between the Java app and the web app. The results can be found below!




GitHub Repo: [https://github.com/mbedded-ninja/NinjaCalc](https://github.com/mbedded-ninja/NinjaCalc)  

 GitHub Project Page: [http://mbedded-ninja.github.io/NinjaCalc/](http://mbedded-ninja.github.io/NinjaCalc/)  

 NinjaCalc Web-app: [http://ninja-calc.mbedded.ninja/](http://ninja-calc.mbedded.ninja/)
