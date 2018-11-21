---
author: gbmhunter
date: 2013-10-10 21:41:12+00:00
draft: false
title: Android
type: page
url: /programming/operating-systems/android
---

Android is an open-source Linux-based operating system designed for (but not limited to) touchscreen devices such as mobile phones and tablets.




Most apps a written in a customised version of the Java programming language. The most popular IDE for Android development is Eclipse. The Android SDK can be downloaded from [here](http://developer.android.com/sdk/index.html), which includes the Android API and the Eclipse editor, with the Android plugin pre-installed.




# Displaying A Web Page In Your App




Web pages can be displayed in your app through the WebView interface. The WebView class is an extension of the View class.




You'll need to have internet access to display the web page, so you'll have to request INTERNET permission in your manifest file.




# Requesting Internet Permission




If you want to use the internet in your app, you have to add the permission to the manifest file as follows:



    
    <manifest xlmns:android...>
     ...
       <uses-permission android:name="android.permission.INTERNET"></uses-permission>
       <application>
          ...
       </application>
    </manifest>




Make sure to add the permission between the manifest tag, and above the application tag.




# Javascript




By default, Javascript is disabled in a WebView. You may notice that web pages aren't displaying correctly, or if they are, they aren't responding correctly. This is probably because Javascript is not enabled. You can enable it through the WebSettings object of WebView, by calling setJavaScriptEnabled(true);.
