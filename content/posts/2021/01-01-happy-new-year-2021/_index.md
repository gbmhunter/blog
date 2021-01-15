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

This year, I thought it would be interesting to also include the total number of pages on the blog, as counted on Jan 1st of the year. I am only counting human created "pages" and "posts" in this tally, and not the automatically generated large number of "tag" and "category" pages. To find the last commit made in a given calender year I used the `git` command:

```bash
git rev-list -1 --before="Jan 01 2020" master
```

This spits out the hash of the desired commit. After checking out that commit I wrote a small Python script for tallying the number of `_index.md` files in the `content` directory of this blog.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Num. of New Content Pages</th>
      <th>No. Page Views</th>
      <th>No. Users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2017</td>
      <td>(no data)</td>
      <td>83k</td>
      <td>41k</td>
    </tr>
    <tr>
      <td>2018</td>
      <td>(no data at SOY, but 925 content pages at EOY)</td>
      <td>116k</td>
      <td>63k</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>80 (1005 content pages at EOY)</td>
      <td>99k</td>
      <td>49k</td>
    </tr>
    <tr>
      <td>2020</td>
      <td>84 (1089 content pages at EOY)</td>
      <td>134k</td>
      <td>97k</td>
    </tr>
    <tr>
  </tbody>
</table>

{{< img src="number-of-page-views-2019-2020.png" width="800px" caption="A comparison of the number of page views per week for the 2019 and 2020 years. Image from Google Analytics." >}}

{{< img src="number-of-users-2019-2020.png" width="800px" caption="A comparison of the number of users per week for the 2018 and 2019 years. Image from Google Analytics." >}}

As per standard Google nomenclature, a _page view_ is a single view of a page (which can be a returning or new user). A _user_ is a unique person who has visited this website at least once.

### Most Popular Pages

The top 6 pages, ranked by number of page views:

{{< img src="top-6-pages-2019-2020.png" width="800px" caption="The top 10 most visited pages of 2019. Image from Google Analytics." >}}

Again, we see the Linux-related serial port and CAN bus pages that shifted to top position in 2019 remain there for 2020. 

### Acquisition

{{% img src="acquisitions-2019-2020.png" width="800px" caption="The top channels of 2020 as a bar graph, compared with 2019. Image from Google Analytics." %}}

{{% img src="top-channels-2019-2020.png" width="400px" caption="The top channels of 2020 as a percentage, compared with 2019. Image from Google Analytics." %}}

### Most Popular Referrers

{{% img src="referrals-2020.png" width="800px" caption="The top referrers of 2020. Image from Google Analytics." %}}

## Goal Completion

Looking back at the Happy New Year 2020 page the goals were rather light, in fact, only the one! It would of looked really bad if I hadn't completed this!

* Integrate more of the calculators at calc.mbedded.ninja into the pages of this blog (blog.mbedded.ninja). <span style="color: green; font-weight: bold;">DONE:</span> _The SEO of the Vue-based SPA was not great. I ended up porting NinjaCalc to Next.js this year, in part because of easier server-side rendering. Many of the calculator pages of NinjaCalc have been integrated into relevant pages on this blog._

## Plans For This Year

* **More content!** (this is never not a goal)
* **More diagrams**: I'm beginning to think that some of the content on this blog is getting too text heavy, and there are not enough images. I hope to pad out text with more images this year, using LibreOffice Draw for diagrams, screenshots from KiCAD for schematics, and photos for examples. 