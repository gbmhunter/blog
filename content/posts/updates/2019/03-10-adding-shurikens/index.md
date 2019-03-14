---
date: 2019-03-10
description: ""
draft: true
lastmod: 2019-03-10
tags: [ "shuriken", "AWS", "Amazon Web Services", "DynamoDB", "CloudWatch", "Lambda functions", "upvote", "clap", "API", "rest" ]
title: "Adding Shurikens"
type: "post"
---

## Overview

Recently I felt the need to increase the amount of visitor feedback on this blog. I really liked medium.com's "claps", where visitors can click to give claps (more than one if they want) for articles. No log in or social media connections are required, which makes it low effort on the visitors part.

Since I am no longer using Wordpress and a continuously running server to host this blog, I couldn't just use that to implement this feature. I am now using a static site generator and hosting on Netlify, and this cannot store any state (we need to keep track of how many clicks each page gets). So I decided to learn more about cloud computing and create a backend/API in AWS.

Continuing with the Ninja theme, rather than likes, +1's, thumb ups or claps, this blog has "shurikens" (Ninja stars).

{{< img src="shuriken-icon" width="100px" caption="+1's, likes, thumb's up and claps have been done before, this blog uses shurikens!"  >}}

You can see the backend code at <https://github.com/gbmhunter/shuriken-backend>. The front-end is embedded in the code that generates this blog, which can be found at <https://github.com/gbmhunter/blog>. Files of interest in the `blog` repository include:

* <https://github.com/gbmhunter/blog/blob/master/layouts/partials/shuriken.html> (Shuriken frontend HTML)
* <https://github.com/gbmhunter/blog/blob/master/static/js/shuriken.js> (Shuriken frontend javascript)
* <https://github.com/gbmhunter/blog/blob/master/static/css/style.css> (Shuriken frontend CSS)

You can see the final result in this .gif below (or just look at this webpage!):

<img src="shuriken.gif" width="700" style="margin: auto;" />


## AWS Infrastructure

Amazon Lambda

* 1M free requests per month
* 3.2Ms of compute time per month

Amazon DynamoDB Free Tier

* 25GB of storage
* 25 units of write capacity
* 25 units of read capacity (enough for 200M requests/month)

Runtime: Node.js 8.10

Function: hello
Role name: myTestRole

IAM User: serverless
Access Type: Programmatic Access
Permissions: AdministratorAccess (policy directly attached to user)

Serverless was given the AWS credentials to the serverless user with (using the `default` profile):

```sh
serverless config credentials --provider aws --key <key> --secret <secret_key>
```

Service can be deployed with:

```sh
serverless deploy -v
```

Region: `us-east-1`

## CICD

TravisCI is used to build and deploy the backend. The AWS credentials are stored in secret TravisCI environment variables called `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

{{< img src="travis-ci-secret-environment-variables.png" width="700px" caption="The settings page for the CICD setup on TravisCI."  >}}

## Disqus Reaction Removal

Adding these shurikens also meant I no longer had any need for the "Disqus reactions". These reactions where a piece of functionality the Disqus commenting system let you enable which would allow viewers to choose between 6 or so basic emoji (upvote, funny, love, e.t.c). I had always found this a tad tacky and untidy, but until now was the only way viewers could quickly react to content. Now that the shurikens have been added, I have disabled the Disqus reactions.

{{< img src="removing-disqus-reactions.png" width="700px" caption="Saying goodbye to the Disqus reactions."  >}}

## What Could Be Improved

* If any part of the page URL changes (including the domain name), the shuriken count will be reset. It would be nice to be able to track page URL changes and keep the count state.
* There is no authentication process for the public API, anyone could use it, which could cause increase AWS costs (we will see if this becomes an issue).
* Have separate `dev` and `prod` deploys of the shuriken backend, currently I am just using `dev`.