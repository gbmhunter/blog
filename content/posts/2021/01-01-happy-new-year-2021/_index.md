---
date: 2021-01-01
description: "A post introducing 2021 and reflecting on the 2020 year (including blog statistics)."
draft: false
lastmod: 2021-01-01
tags: [ "new year", "2021", "statistics", "Google Analytics", "page view", "user", "referral", "Hugo", "GitHub", "blog" ]
title: "Happy New Year 2021"
type: "post"
---

{{< img src="happy-new-year-2021.jpg" width="500px" caption="Happy new year!" >}}

[2020 may be the year we all want to forget](https://en.wikipedia.org/wiki/Death_to_2020). The silver lining is that the lockdown period gave me some extra time to work on extra content and improvements for this blog.

## Statistics for 2020

This is the third year in a row in which I have used Google Analytics for statistics.

### Summary

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>No. Page Views</th>
      <th>No. Users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2017</td>
      <td>83k</td>
      <td>41k</td>
    </tr>
    <tr>
      <td>2018</td>
      <td>116k</td>
      <td>63k</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>99k</td>
      <td>49k</td>
    </tr>
    <tr>
      <td>2020</td>
      <td>134k</td>
      <td>97k</td>
    </tr>
  </tbody>
</table>

{{</* img src="number-of-page-views-2019-2020.png" width="800px" caption="A comparison of the number of page views per week for the 2019 and 2020 years. Image from Google Analytics." */>}}

{{</* img src="20191231-google-analytics-weekly-users-for-2019.png" width="800px" caption="A comparison of the number of users per week for the 2018 and 2019 years. Image from Google Analytics." */>}}

A _page view_ is a single view of a page (which can be a returning or new user). A _user_ is a unique person who has visited this website at least once.

### Most Popular Pages

Ranked by number of page views:

{{</* img src="20191231-google-analytics-top-10-pages-2019.png" width="800px" caption="The top 10 most visited pages of 2019. Image from Google Analytics." */>}}

Compared to the top 10 pages of 2018:

{{</* img src="20191231-google-analytics-top-10-pages-2018.png" width="800px" caption="The top 10 most visited pages of 2018. Image from Google Analytics." */>}}

For the first time ever, we see Linux-related pages take over the top positions that were held by Altium-related pages for at least the last 5 years. There were no hugely different page categories that entered the top 10 list this year.

### Acquisition

{{/*% img src="20191231-google-analytics-top-channels-2019.png" width="400px" caption="The top channels of 2019. Image from Google Analytics." %*/}}

### Most Popular Referrers

{{/*% img src="20191231-google-analytics-top-referrers-2019.png" width="800px" caption="The top referrers of 2019. Image from Google Analytics." %*/}}

## Goal Completion

Looking back at the goals set at the start of 2019, most of them were fully completed!

* <span style="color: green; font-weight: bold;">DONE: </span>Utilize Hugo to it's fullest capabilities. Although the migration from Wordpress to Hugo is complete, I feel like I have not yet explored all of the possibilities that Hugo allows. This includes sitemaps, RSS feeds, automatic thumbnail creation, better shortcodes, e.t.c.
* <span style="color: orange; font-weight: bold;">PARTIALLY DONE: </span>Find a way to reliably detect dead links as they occur, along with an easy way of fixing them. <span style="color: orange; font-weight: bold;">This was enabled for internal links everytime the site is compiled (using a Hugo shortcode), but is harder to do for external links due to the amount of time/bandwidth required to check all the links.</span>
* <span style="color: green; font-weight: bold;">DONE: </span>Move all of the [mbedded.ninja GitHub repos](https://github.com/mbedded-ninja/) into [my own personal account](https://github.com/gbmhunter), as there is no real need for a mbedded.ninja "organization" on GitHub, at it just leads to extra work and confusion on where repos are.
* <span style="color: green; font-weight: bold;">DONE: </span>Remove all the excess images in the [blog repository](https://github.com/gbmhunter/blog/issues). As a result of the Wordpress migration, there are many copies of a single image, each at a slightly different pixel size (I'm assuming they were created as part of a page load speed optimization in Wordpress). These are un-needed as Hugo can resize images at build time to correctly fit the container on the page. These extra images are just using up repo space.
* <span style="color: green; font-weight: bold;">DONE: </span>And of course, as always, add more content!

## Plans For This Year

* Integrate more of the calculators at calc.mbedded.ninja into the pages of this blog (blog.mbedded.ninja). `calc.mbedded.ninja` is not getting the exposure I first hoped. It could potentially be because of the SPA's (_Single Page Application_) poor SEO (_Search Engine Optimization_), as it uses the Javascript framework Vue to render everything on the client side. Google's search bots are meant to be able to handle indexing this sort of thing in 2019, but it still may be performing worse in the search rankings than it it was SSR (_Server Side Rendered_).