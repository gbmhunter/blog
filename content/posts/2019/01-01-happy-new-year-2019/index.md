---
date: 2019-01-01
draft: false
lastmod: 2019-01-01
tags: [ "new year", "2019", "statistics", "Google Analytics", "page view", "user", "referral", "acquisition", "Wordpress", "Hugo", "GitHub", "blog" ]
title: "Happy New Year 2019"
type: "post"
---

{{% figure src="colorful-happy-new-year-2019-vector.jpg" width="800px" caption="Happy new year! Image from www.vecteezy.com." %}}

## Statistics for 2018

This is the first year I have used Google Analytics to gather these statistics. Even though I have been using Google Analytics for many years, in previous years I just relied on the statistics presented in the Wordpress admin dashboard. This is no longer possible as I am now [using Hugo to power this site](/posts/2018/12-15-site-migration-to-hugo-complete/). This also means that the reported numbers are different, in fact, Wordpress seemed to always report higher numbers than Google Analytics. The stats for 2017 on this page are also from Google Analytics so that a fair comparison can be made. See the {{% link text="Happy New Year 2018 post" src="/posts/2018/01-01-happy-new-year-2018" %}} for the Wordpress sourced 2017 stats.

### Summary

Metric      | 2017  | 2018 |
------------|-------|------|
Page Views  | 83k   | 116k |
Users       | 41k   | 63k  |

{{% figure src="google-analytics-2018-mbedded-ninja-users.png" width="800px" caption="Number of users per week for the 2018 year. Image from Google Analytics." %}}

A _User_ is a unique person who visited this website at least once.

### Most Popular Pages

Ranked by number of page views:

<div class="table-wrapper">
<table>
    <thead>
        <tr>
            <th colspan="2">2017</th>
            <th colspan="2">2018</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Altium Tricks And Standards</td>
            <td>10.5k</td>
            <td>Altium Tricks And Standards</td>
            <td>11.0k</td>
        </tr>
        <tr>
            <td>Altium Bugs And Things To Watch Out For</td>
            <td>4.9k</td>
            <td>Altium Bugs And Things To Watch Out For</td>
            <td>5.8k</td>
        </tr>
        <tr>
            <td>Home Page</td>
            <td>3.9k</td>
            <td>Linux Serial Ports Using C/C++</td>
            <td>4.6k</td>
        </tr>
        <tr>
            <td>A Function Pointer Based State Machine</td>
            <td>2.3k</td>
            <td>How To Use SocketCAN With The Command-Line In Linux</td>
            <td>4.4k</td>
        </tr>
        <tr>
            <td>Component Packages</td>
            <td>2.2k</td>
            <td>How To Use SocketCAN With C In Linux</td>
            <td>4.4k</td>
        </tr>
        <tr>
            <td>Altium Scripting And Using The API</td>
            <td>2.0k</td>
            <td>Homepage</td>
            <td>4.2k</td>
        </tr>
        <tr>
            <td>Altium Keyboard Shortcuts</td>
            <td>1.7k</td>
            <td>A Function Pointer Based State Machine</td>
            <td>3.3k</td>
        </tr>
        <tr>
            <td>UART Protocol</td>
            <td>1.4k</td>
            <td>Altium Scripting And Using The API</td>
            <td>2.7k</td>
        </tr>
        <tr>
            <td>PCB Design</td>
            <td>1.3k</td>
            <td>Adding A Custom App To A Yocto Build</td>
            <td>2.5k</td>
        </tr>
        <tr>
            <td>How To Unbrick A PICkit 3</td>
            <td>1.2l</td>
            <td>Altium Keyboard Shortcuts</td>
            <td>2.3k</td>
        </tr>
    </tbody>
</table>
</div>

### Acquisition

5 most popular acquisition methods by number of users:

2017            |       | 2018            |        |
----------------|-------|-----------------|--------|
Organic Search  | 34.4k | Organic Search  | 53.6k  |
Direct          | 4.8k  | Direct          | 7.0k   |
Referral        | 1.9k  | Referral        | 2.3k   |
Social          | 247   | Social          | 147    |
Other           | n/a   | Other           | 1      |

### Most Popular Referrers

5 most popular referrers by number of users:

2017                    |        | 2018              |     
------------------------|--------|-------------------|-----
en.wikipedia.org        | 710    | en.wikipedia.org  | 663
duckduckgo.com          | 198    | duckduckgo.com    | 402
disq.us                 | 186    | cn.bing.com       | 122
cypress.com             | 129    | yandex.ru         | 71
dangerousprototypes.com | 79     | r.duckduckgo.com  | 46

## Plans For This Year

* Utilize Hugo to it's fullest capabilities. Although the migration from Wordpress to Hugo is complete, I feel like I have not yet explored all of the possibilities that Hugo allows. This includes sitemaps, RSS feeds, automatic thumbnail creation, better shortcodes, e.t.c.
* Find a way to reliably detect dead links as they occur, along with an easy way of fixing them.
* Move all of the [mbedded.ninja GitHub repos](https://github.com/mbedded-ninja/) into [my own personal account](https://github.com/gbmhunter), as there is no real need for a mbedded.ninja "organization" on GitHub, at it just leads to extra work and confusion on where repos are.
* Remove all the excess images in the [blog repository](https://github.com/gbmhunter/blog/issues). As a result of the Wordpress migration, there are many copies of a single image, each at a slightly different pixel size (I'm assuming they were created as part of a page load speed optimization in Wordpress). These are un-needed as Hugo can resize images at build time to correctly fit the container on the page. These extra images are just using up repo space.
* And of course, as always, add more content!