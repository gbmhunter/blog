---
authors: [ "Geoffrey Hunter" ]
categories: [ "Site Admin" ]
date: 2013-05-02
draft: false
lastmod: 2013-05-02
tags: [ "caption", "HTML", "images", "nextgen", "PHP", "plugin", "singlepic", "template", "Wordpress" ]
title: NextGEN Template Code Gives Images A Caption And Fresh Look
type: post
---

After playing around with the NextGen plugin PHP files and this sites CSS style file, I have created what NextGEN calls a "template" for a single picture (in NextGEN lingo, a singlepic), which adds a border and the caption to the image. Which by-the-way, is a feature that NextGEN lacks, and should implement themselves!

Here is what images look like now, with the custom template applied.

{{% figure src="cladlab-nextgen-custom-template-image-code-working.png" caption="When the NextGEN custom template code works!"  width="500px" %}}

Which, IMO, is a big improvement over what they used to be. They now have a nice, semi-transparent border, and include a caption below the image (which is associated with the image in the NextGEN gallery page). This is what they used to look like:

{{% figure src="image-before-nextgen-caption-and-border-template-for-singlepic-added.png" caption="What images used to look like before the NextGEN caption and border template was added."  width="500px" %}}

But...it's not perfect...yet. As you can see below, in certain situations the images to go crazy.

{{% figure src="cladlab-nextgen-custom-template-image-code-not-fully-working.png" caption="When the NextGEN custom template code isn't working correctly, this happens."  width="650px" %}}

I am no full-time website designer. Playing with HTML objects like div's  and getting the right float setting, width, height, margin, alignment e.t.c can be a guestimate at the best of times. I will hopefully work out how to fix this sometime soon...

Note that this custom template has been disabled for the images in this post, otherwise you'd get the mirror-in-a-mirror look which would be utterly confusing.
