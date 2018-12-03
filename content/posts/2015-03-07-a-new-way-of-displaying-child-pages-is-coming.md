---
author: gbmhunter
date: 2015-03-07 04:15:29+00:00
draft: false
title: A new way of displaying child pages is coming...
type: post
url: /updates/a-new-way-of-displaying-child-pages-is-coming
categories:
- Updates
tags:
- altium
- automatic list
- child pages
- child pages shortcode
- code
- component packages
- list pages shortcode
- mega menu
- parent pages
- plugins
- sb child list
- website design
- wordpress
---

With this site getting rather large (536 published pages as of March 2015), and being designed in a hierarchical manner (i.e. predominately using Wordpress _Pages_ rather than _Posts_), it was becoming harder and harder to manage the navigation in a user friendly way.




The current design uses a _Mega Menu_ as the primary and pretty much only way of navigating to the correct page. In most cases, the only pages on this site which have any material on them are the pages which have no children of there on (i.e. the end-points), while the parent pages are blank and just used to group pages into a logical hierarchy. 


{{< figure src="/images/2015/03/screenshot-of-large-mega-menu-structure-on-mbedded-ninja.png" width="587px" caption="Screenshot of the large 'mega menu' structure on mbedded.ninja."  >}}


The new design will not replace the Mega Menu, but rather to provide material for the mostly blank parent pages and make it easy to navigate from them to the child pages. I want this to happen in the most autonomous fashion possible. For this reason I looked at plugins which can automatically create lists of child pages and insert them into parent pages.




Most of them provided shortcodes for the user to insert into a page, which would automatically generate a list of all the child pages. I tried a few, like [List Pages Shortcode](https://wordpress.org/plugins/list-pages-shortcode/) and [Child Pages Shortcode](https://wordpress.org/plugins/child-pages-shortcode/). Then I came across [SB Child List](https://wordpress.org/plugins/sb-child-list/). The selling point was it's powerful templating feature, which let me customise the way the child page list looked. I wanted a table-based design, using the title of the page, it's featured image, and it's excerpt to create a listing. I did this with the following code:


<table style="width: 800px;" class=" aligncenter" >
<tbody >
<tr >

<td style="text-align: center;" >**Template   
Parameter**
</td>

<td style="text-align: center;" >**Code**
</td>
</tr>
<tr >

<td style="text-align: center;" >Child  
List  
Start  
Template
</td>

<td style="text-align: center;" >

    
    <table>
    <tbody>






</td>
</tr>
<tr >

<td style="text-align: center;" >Child  
List  
Loop  
Start
</td>

<td style="text-align: center;" >

    
    <tr>






</td>
</tr>
<tr >

<td style="text-align: center;" >Child  
List  
Loop  
Content
</td>

<td style="text-align: center;" >

    
    <td>
       [post_thumb]
    </td>
    <td>
       <a href="[post_permalink]" class="[post_class]">[post_title]</a>
    </td>
    <td>
       [post_excerpt]
    </td>






</td>
</tr>
<tr >

<td style="text-align: center;" >Child  
List  
Loop  
End
</td>

<td style="text-align: center;" >

    
    </tr>






</td>
</tr>
<tr >

<td style="text-align: center;" >Child  
List  
End  
Template
</td>

<td style="text-align: center;" >

    
    </tbody> </table>






</td>
</tr>
</tbody>
</table>


A screenshot of the above code is shown below:


{{< figure src="/images/2015/03/screenshot-of-sb-child-list-template-for-mbedded-ninja.png" width="491px" caption="A screenshot of the SB Child List template code for mbedded.ninja."  >}}


The child pages menu is then inserted into the parent with the shortcode:



    
    [sb_child_list template="2"]




 I have currently tested this on the Altium pages, below is a screenshot of what the Altium page looks like, which is the parent for things like the popular Altium Tricks And Standards, Altium Bugs and Altium Simulation pages.


{{< figure src="/images/2015/03/screenshot-of-new-child-page-design-for-mbedded-ninja-altium.png" width="532px" caption="Screenshot of the new child page design for mbedded.ninja."  >}}


One of the target areas of the site for this new design will be the Component Packages page. Currently, most of the packages are on the one page, and as the number of components listed there grew, it just got too big! This plugin will allow me to add all the information about a component package to it's own child page, and then easily list all the components in a table on the parent page. However, this will take sometime to implement (there are currently over a 100 packages on there).
