---
categories: [ "Posts", "Updates" ]
date: 2019-03-10
description: "Shurikens were added to this blog as a simple upvoting and reader interaction mechanism."
draft: false
lastmod: 2019-03-10
tags: [ "shuriken", "AWS", "Amazon Web Services", "DynamoDB", "CloudWatch", "Lambda functions", "upvote", "clap", "API", "rest" ]
title: "Adding Shurikens"
type: "post"
---

<h2>Overview</h2>

<p>Recently I felt the need to increase the amount of visitor feedback on this blog. I really liked <a href="https://medium.com/" target="_blank">medium.com's</a> "claps", where visitors can click to give claps (more than one if they want) for articles. No log in or social media connections are required, which makes it low effort on the visitors part.</p>

<p>Since I am no longer using Wordpress and a continuously running server to host this blog, I couldn't just use that to implement this feature. I am now using a static site generator and hosting on Netlify, and this cannot store any state (we need to keep track of how many clicks each page gets). So I decided to learn more about cloud computing and create a backend/API in AWS.</p>

<p>Continuing with the Ninja theme, rather than likes, +1's, thumb ups or claps, this blog has "shurikens" (Ninja stars).</p>

{{% figure src="shuriken-icon.png" width="100px" caption="+1's, likes, thumb's up and claps have been done before, this blog uses shurikens!"  %}}

<p>You can see the backend code at <a href="https://github.com/gbmhunter/shuriken-backend">https://github.com/gbmhunter/shuriken-backend</a>. The front-end is embedded in the code that generates this blog, which can be found at <a href="https://github.com/gbmhunter/blog">https://github.com/gbmhunter/blog</a>. Files of interest in the <code>blog</code> repository include:</p>

<ul>
    <li><a href="https://github.com/gbmhunter/blog/blob/master/layouts/partials/shuriken.html">layouts/partials/shuriken.html</a> (Shuriken frontend HTML)</li>
    <li><a href="https://github.com/gbmhunter/blog/blob/master/static/js/shuriken.js">static/js/shuriken.js</a> (Shuriken frontend javascript)</li>
    <li><a href="https://github.com/gbmhunter/blog/blob/master/static/css/style.css">static/css/style.css</a> (Shuriken frontend CSS)</li>
</ul>

<p>You can see the final result in this .gif below (or just look at this webpage!):</p>

{{% figure src="shuriken.gif" width="700px" caption="Demo of the shurikens." %}}

<h2>AWS Infrastructure</h2>

<p>AWS services are used to provide an API and persistent database for the static site front-end to talk to. AWS Lambda is used to implement the API which means that no cost is incurred when the API is in use (i.e., I don't have to have a server running 24/7). Below are some interesting stats on the services I used:</p>

<p><b>Amazon Lambda</b></p>

<ul>
<li>1M free requests per month</li>
<li>3.2Ms of compute time per month</li>
</ul>

<p><b>Amazon DynamoDB Free Tier</b></p>

<ul>
<li>25GB of storage</li>
<li>25 units of write capacity</li>
<li>25 units of read capacity (enough for 200M requests/month)</li>
</ul>

<h2>Serverless</h2>

<p>The great NPM library serverless was used to create all of the above infrastructure. serverless allows you to create things such as Lambda-based APIs backed with a DynamoDB database in a really easy fashion, without having to delve to much into the cloud infrastructure design. It automatically creates the services, roles, permissions, and connections.</p>

<p>Runtime: Node.js 8.10</p>

<p>Serverless Settings:</p>
<ul>
    <li>IAM User: <code>serverless</code></li>
    <li>Access Type: Programmatic Access</li>
    <li>Permissions: AdministratorAccess (policy directly attached to user)</li>
    <li>Region: <code>us-east-1</code></li>
</ul>

<p>Serverless is given the AWS credentials to the serverless user with (using the <code>default</code> profile):</p>

{{< highlight bash >}}
$ serverless config credentials --provider aws --key &lt;key&gt; --secret &lt;secret_key&gt;
{{< /highlight >}}

<p>Service can be deployed with:</p>

{{< highlight bash >}}
$ serverless deploy -v
{{< /highlight >}}

<h2>CICD</h2>

<p>TravisCI is used to build and deploy the backend. The AWS credentials are stored in secret TravisCI environment variables called <code>AWS_ACCESS_KEY_ID</code> and <code>AWS_SECRET_ACCESS_KEY</code>.</p>

{{% figure src="travis-ci-secret-environment-variables.png" width="700px" caption="The settings page for the CICD setup on TravisCI."  %}}

<h2>Disqus Reaction Removal</h2>

<p>Adding these shurikens also meant I no longer had any need for the "Disqus reactions". These reactions where a piece of functionality the Disqus commenting system let you enable which would allow viewers to choose between 6 or so basic emoji (upvote, funny, love, e.t.c). I had always found this a tad tacky and untidy, but until now was the only way viewers could quickly react to content. Now that the shurikens have been added, I have disabled the Disqus reactions.</p>

{{% figure src="removing-disqus-reactions.png" width="700px" caption="Saying goodbye to the Disqus reactions."  %}}

<h2>What Could Be Improved</h2>

<ul>
    <li>If any part of the page URL changes (including the domain name), the shuriken count will be reset. It would be nice to be able to track page URL changes and keep the count state.</li>
    <li>There is no authentication process for the public API, anyone could use it, which could cause increase AWS costs (we will see if this becomes an issue).</li>
    <li>Have separate <code>dev</code> and <code>prod</code> deploys of the shuriken backend, currently I am just using <code>dev</code>.</li>

</ul>