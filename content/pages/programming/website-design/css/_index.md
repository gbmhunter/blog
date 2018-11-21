---
author: gbmhunter
date: 2011-09-15 07:42:06+00:00
draft: false
title: CSS
type: page
url: /programming/website-design/css
---

# Overview


CSS, or content style sheet, is a language for speicifying how elements on an HTML page are displayed. It is a very powerful way of customising the look and feel of a website, and allowing single point control (i.e. instant change) of the display of your web pages.


# CSS3


CSS3 is the latest CSS standard.

Some cool, open-source CSS2 animations can be found at [http://daneden.me/animate/](http://daneden.me/animate/)


# Dynamic Debugging


Dynamic CSS debugging can be done freely with the open-source plug-in for Firefoz called FireBug or with Google Chrome. SkyBound Stylizer ([http://www.skybound.ca/](http://www.skybound.ca/)) is also a very nice licensed dynamic/visual CSS editor (it does have a good, full-featured trial version). Without paying for Stylizer, I personally like Google Chromes built in developer tools (activated by pressing Ctrl-Shift-I).


# Code Tips


To target an object, use the following syntax




    
    <object name>
    {
       <porperties here>
    }


To target a specifc class of objects, replace the first line of code above with




    
    <object name>.<class>


or just








    
    .<class>


if you do not care about what object it is from







To target a specific ID, use the syntax




    
    #<id>





Use !important to cause a rule to persist even if subsequent rules would of normally overwritten it. CSS normally changes properties of rules in sequential order, this prevents that. Not really good code practice, but is useful if you have no idea/can't edit the CSS that is modifying it. The syntax is:

    
    <property>: <value> !important;


For example:




    
    .colorbox
    {
       background-color: black !important;
    }




# Stopping Objects From Being Rendered


An easy way to prevent objects from being rendered is to modify the display property of the object and set it to "none".

    
    /* Stops any object with the id "container" from being rendered (displayed) on a screen.
    #container { display : none; }


Another example is on the [OpenCart page](http://blog.mbedded.ninja/programming/website-design/opencart), where it's used to hide the currency options.






# Links


CSS Desk ([http://cssdesk.com/](http://cssdesk.com/)) - CSS Desk is an awesome CSS sandbox in which you can write test html and css and see the effects of it in a dynamically updated simulated webpage. The interface is simple, and is laid out nicely on just one screen
