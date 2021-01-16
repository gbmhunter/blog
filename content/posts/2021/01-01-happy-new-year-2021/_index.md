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

### Content

This year, I thought it would be interesting to also include the total number of content pages on the blog, as well as the number of lines, words and characters in these pages, as counted on Jan 1st of the given year. I am only counting human created "pages" and "posts" in this tally, and not the automatically generated large number of "tag" and "category" pages. To find the last commit made in a given calender year I used the `git` command:

```bash
git rev-list -1 --before="Jan 01 2020" master
```

This spits out the hash of the desired commit. After checking out that commit I wrote a small Python script for tallying the number of `_index.md` files in the `content` directory of this blog, as well as counting the number of lines, words and characters within these files.

Year | Num. Content Files | Num. Lines | Num. Words | Num. Chars
-----|--------------------|------------|------------|------------
2019 | 925                | 71.4k      | 380k       | 2.26M
2020 | 1005               | 74.8k      | 424k       | 2.51M
2021 | 1089               | 80.9k      | 470k       | 2.80M 

For a given year, all data is counted at the beginning of that year (i.e. the 1st of Jan at 00:00:00). I hope to **increase the word per page ratio for the 2021 year**, as I've come to realize that I've been splitting content across too many sub-pages, which both makes user navigation harder and hurts search rankings. This data unfortunately only goes as far back as I've used `git` to manage to blog...before 2019 the blog was managed by Wordpress running on a server.

### Usage Analytics Summary

Year | Num. Page Views | Num. Users
-----|-----------------|------------
2017 | 83k             | 41k
2018 | 116k            | 63k
2019 | 99k             | 49k
2020 | 134k            | 97k

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

Looking back at the {{% link text="Happy New Year 2020 page" src="/posts/2020/01-01-happy-new-year-2020" %}} the goals were rather light, in fact, only the one! It would of looked really bad if I hadn't completed this!

* Integrate more of the calculators at calc.mbedded.ninja into the pages of this blog (blog.mbedded.ninja). <span style="color: green; font-weight: bold;">DONE:</span> _The SEO of the Vue-based SPA was not great. I ended up porting NinjaCalc to Next.js this year, in part because of easier server-side rendering. Many of the calculator pages of NinjaCalc have been integrated into relevant pages on this blog._

## Plans For This Year

* **More content!** (this is never not a goal)
* **More diagrams**: I'm beginning to think that some of the content on this blog is getting too text heavy, and there are not enough images. I hope to pad out text with more images this year, using LibreOffice Draw for diagrams, screenshots from KiCAD for schematics, and photos for examples.
* **Decrease the number of sub-pages, and increase the num. of words per page of content**: As mentioned above, I believe in the past I have split content between too many hierarchical subpages, which both makes the contents harder to read/fine, as well as hurting search engine rankings.