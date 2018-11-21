---
author: gbmhunter
date: 2013-04-15 09:35:55+00:00
draft: false
title: Adding Things To The Top Vertical Menu
type: page
url: /programming/website-design/opencart/adding-things-to-the-top-vertical-menu
---

One way to add a hyperlink to the top menu is to hard code it in the "catalog/view/theme/_<current theme name>_/template/common/header.tpl" file. Look for the comment in the following html code (near the bottom).

    
    <?php if ($categories) { ?>
    <div id="menu">
    <ul>
    <?php foreach ($categories as $category) { ?>
    <li><a href="<?php echo $category['href']; ?>"><?php echo $category['name']; ?></a>
    <?php if ($category['children']) { ?>
    <div>
    <?php for ($i = 0; $i < count($category['children']);) { ?>
    <ul>
    <?php $j = $i + ceil(count($category['children']) / $category['column']); ?>
    <?php for (; $i < $j; $i++) { ?>
    <?php if (isset($category['children'][$i])) { ?>
    <li><a href="<?php echo $category['children'][$i]['href']; ?>"><?php echo $category['children'][$i]['name']; ?></a></li>
    <?php } ?>
    <?php } ?>
    </ul>
    <?php } ?>
    </div>
    <?php } ?>
    </li>
    <?php } ?>
    <!-- Adds custom button/link to the top menu -->
    <li><a href="<url here>t">Title Here</a></li>
    <!-- End of custom addition -->
    </ul>
    </div>


Another way is to download a free vQmod which allows you to add information pages to the menu. This can be done from the admin section of OpenCart (so no coding needed!).
