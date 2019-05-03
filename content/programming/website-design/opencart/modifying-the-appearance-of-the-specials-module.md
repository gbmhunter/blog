---
author: gbmhunter
date: 2013-04-15
draft: false
title: Modifying The Appearance Of The Specials Module
type: page
---

The normal appearance of the specials module, is well, a little too normal. As shown below, it has the same colours as any other part of the front page, and doesn't really stand-out.

{{< figure src="/images/programming-opencart/open-cart-unmodified-specials-module-appearance.jpg" caption="The default appearance of the specials module."  width="800px" >}}

Before we can modify the CSS to change it's appearance, we need to add a 'hook' to the elements of the special module so that the CSS can target them. Otherwise any CSS changes would modify the appearance of many other things on your site as well. To do this, we need to modify the code that generates the special module elements. The default code is at `catalog/view/theme/default/modules/specials.tpl`. Copy this file into your theme directory (e.g. `catalog/view/theme/<theme-name>/modules/specials.tpl`) and then modify this code.

Now that hooks have been added, the CSS file can be edited to change the appearance of the elements with the new 'box-specials' class.

{{< figure src="/images/programming-opencart/open-cart-adding-box-specials-css-class.jpg" caption="Modifying the CSS to change the appearance of the OpenCart specials module."  width="800px" >}}

The main thing I wanted to do was to change the appearance of the title background to a red colour. Just using CSS to set it to red would make the heading too 'blocky'. I decided to use GIMP to create a reddish gradient  image that could be repeated in the x direction.

{{< figure src="/images/programming-opencart/open-cart-creating-title-background-with-gimp.jpg" caption="Creating a title background for the OpenCart specials module with GIMP."  width="600px" >}}
