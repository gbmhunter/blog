---
authors: [ Geoffrey Hunter ]
date: 2024-03-24
draft: false
lastmod: 2024-03-25
tags: [ Lightsail, Umami, analytics, server, AWS, https, docker, nginx, SSL, Google Analytics ]
title: Running Umami on AWS Lightsail
type: page
---

## Overview

Umami is a popular alternative to Google Analytics which allows free use if you self-host the software on your own server. I decided to switch from Google Analytics to Umami because Ad Blockers were blocking too high a percentage of users (ad blockers block the Google tag script that is downloaded to the users browser from reaching out to Google's servers and registering a page view). By using Umami and self-hosting it, I could point a subdomain (e.g. `umami.mbedded.ninja`) at the server running Umami. There is a very high probability that Ad blockers won't block the Umami client-side script since the request is going out to the same domain as this blog.

This page details how to get Umami setup and running on an AWS Lightsail server instance. AWS Lightsail is a simpler and cheap way (US$3.50 to $5.00/month) of hosting servers that don't need to do much processing, perfect for Umami.

Credit goes to the Digital Ocean's tutorial at https://www.digitalocean.com/community/tutorials/how-to-install-umami-web-analytics-software-on-ubuntu-20-04 for showing me how to do this for the first time. This tutorial expands on Digital Ocean's by adding Lightsail specific information, as well as updating some parts relevance in 2024 (e.g. we now have `docker compose` rather than `docker-compose`).

## Spinning Up Lightsail Server in AWS

This assumes you have an AWS account. If you don't, go and sign up now!

Log into the AWS Console, and click on `Services -> Amazon Lightsail`.

{{% figure src="_assets/aws-lightsail-create-instance.png" width="600px" %}}

Firstly, choose an "Instance Location". Pick something close to where most of your users are, but in the end it doesn't matter much!

Then under "Select a blueprint", click "Operating System (OS) only". Select Ubuntu 22.04. You could choose a different Linux OS, like AWS Linux, but the commands will be different (e.g. you'll have to use `yum` instead of `apt`) and the nginx config files structure won't be setup to use `sites-available`/`sites-enabled` (slightly different ways of doing things).

{{% figure src="_assets/picking-ubuntu-22-04-in-lightsail.png" width="600px" %}}

Select or create a keypair to authenticate with this server. If creating a new keypair, the private key will be downloaded. Save this for later when we need to ssh into the instance to set it up.

Select the _Networking Type_. As of March 2024, Amazon is about to charge more for servers that have IPv4 addresses. IPv6 only should work fine -- except that IPv6 doesn't work for cloning projects of GitHub, nor some docker-based commands which fetch data from remotes. What we can do though is perform all of the setup with a public IPv4 address, and then once we are complete, create a Snapshot, and create a new instance from the Snapshot that is IPv6 only. More on this below.

So for now select `Dual stack` for the Networking Type.

Select a size. Umami does not take many resources to run. However I had issues with the memory capped at 512MB, so I picked the 1GB RAM/40GB SSD size (as of March 2024, US$5.00/month).

{{% figure src="_assets/choosing-dual-stack-and-size-lightsail.png" width="600px" %}}

Choose an instance name to easily identify this Lightsail instance in the future, e.g. `Umami-Ubuntu-IPv4-1GB`. It's completely up to you and what you want to call it.

Click `Create Instance` and your server will be spun up!

## Add a Rule For Https

Once your Lightsail instance has spun up, click on the `Networking" tab under your Lightsail instance, and then add a IPv4 firewall rule allowing https traffic.

{{% figure src="_assets/ipv4-https-firewall-rule-in-lightsail.png" width="600px" %}}

This will come in useful later when we force traffic to use `https` only.

## Create DNS A Record to Point to Server

Now you need to create a DNS A Record that points your subdomain `umami.my-domain.com` to the IP address of the Lightsail instance you just created.

I use Cloudflare, so the following image shows a screenshot of myself setting up the A record through the Cloudflare control panel. It should be similar with most other DNS providers.

{{% figure src="adding-dns-a-record-in-cloudflare.png" width="600px" %}}

## Installing Umami

Connect via your Lightsail instance via ssh. You can use the in-browser terminal if you want, but I much prefer a proper terminal-based session (e.g. from Windows Terminal, bash on Linux, e.t.c.) for better responsiveness and copy/paste support.

I had problems using the subdomain to connect, so I just used the IP address directly. The IP address is shown on the main page for the Lightsail instance. You will need the private key that you setup/selected when you created the Lightsail instance above.

```
ssh -i ~\.ssh\private-key.pem ubuntu@34.207.322.232
```

`cd` into the `/opt` directory, this is where we will put the Umami source code:

```shell
cd /opt
```

Clone the Umami repo:

```shell
sudo git clone https://github.com/mikecao/umami.git
```

`cd` into the new directory:

```shell
cd umami/
```

We'll now edit the `docker-compose.yml` file, to make sure it only exposes the `3000` port on `localhost`, and not publicly:

```shell
sudo nano docker-compose.yml
```

Find the following section:

```
ports:
      - "3000:3000"
```

and add `127.0.0.1` to the front so that it now looks like:

```
    ports:
      - "127.0.0.1:3000:3000"
```

Save these changes and exit `nano`. We can't yet run Umami because we don't have Docker. Let's do that next!

## Install Docker

We'll need to install docker so we can actually run Umami. I grabbed these instructions from https://docs.docker.com/engine/install/ubuntu/. Add Docker's `apt` repository:

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

And then install Docker:

```shell
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Start Umami on Localhost

```shell
sudo docker compose up -d
```

umami-docker-up-command-worked.png

Check it's working by requesting the info:

```
curl localhost:3000
```

You should see something like:

```
<!DOCTYPE html><html id="__next_error__"><head><meta charSet="utf-8"/> ...
```

## Install nginx

Whilst we could just expose the Umami 3000 port to the public and get basic `http` working, we are going to install nginx and place it between the public and our Umami application. This will allow us to add support for `https`.

Let's install nginx:

```shell
sudo apt update
sudo apt install nginx
```

Add a new config:

```shell
sudo nano /etc/nginx/sites-available/umami.conf
```

```conf
server {
    listen       80;
    listen       [::]:80;
    server_name  umami.my-domain.com;

    access_log  /var/log/nginx/umami.access.log;
    error_log   /var/log/nginx/umami.error.log;

    location / {
      proxy_pass http://localhost:3000;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

Create a symbolic link in `sites-enabled` that points to the config file we just created:

```shell
sudo ln -s /etc/nginx/sites-available/umami.conf /etc/nginx/sites-enabled/
```

Reload nginx:

```shell
sudo systemctl reload nginx
```

## Test http Access

You should now be able to get to your Umami server using `http` from anywhere on the internet!

## Install Certbot

```shell
sudo apt install certbot python3-certbot-nginx
```

```shell
sudo certbot --nginx -d umami.my-domain.com
```

You'll be prompted to enter in an email address. Once it's complete, it should have modified your nginx `umami.conf` and restarted nginx so that you're set to go!

Certbot should have modified your `/etc/nginx/sites-available/umami.conf` so that it looks similar to the following:

```conf
server {
    server_name  umami.my-domain.com;

    access_log  /var/log/nginx/umami.access.log;
    error_log   /var/log/nginx/umami.error.log;

    location / {
      proxy_pass http://localhost:3000;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/umami.my-domain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/umami.my-domain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = umami.my-domain.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen       80;
    listen       [::]:80;
    server_name  umami.my-domain.com;
    return 404; # managed by Certbot
}
```

By default, it also redirects `http` traffic to `https`. That is the second `server` section in the above `.conf` file (with the `listen 80`).

## CloudFlare Adjustments

My Cloudflare account defaulted to the SSL/TLS encryption mode set to "Flexible". As soon as I ran the Let's Encrypt step above, I couldn't get access to Umami through `https` due to a "Too many redirects" error. To fix this, I can to go to the Cloudflare dashboard, click on `SSL/TLS` -> `Overview` and change the Encryption mode from "Flexible" to "Full (strict)".

{{% figure src="change-ssl-settings-in-cloudflare-from-flexible-to-full-strict.png" width="600px" %}}

This might be very Cloudflare specific -- if you are using another DNS provider you might not have to change any setting similar to this.

## Migrate to IPv6 Only

I ran into problems trying to setup the server using IPv6 only, mostly due to GitHub not supporting IPv6 when cloning and some docker commands failing. However, once the server is setup using IPv4, you can migrate it to IPv6 by doing the following.

First, create a snapshot of the existing server in AWS Lightsail:

{{% figure src="_assets/create-snapshot-in-lightsail.png" width="600px" %}}

Once the snapshot has been created, you can click the three vertical ellipses next to it and click "Create new instance". From there, you will be able to select an IPv6 only setup. Note you can also change the instance size here, but you cannot choose a smaller size, presumably because you can't easily make disks smaller (even if you are not using all of the available space).

Now when you ssh into the server, the command will look something like this:

```shell
ssh -i my-private-key.pem ubuntu@2600:1f18:4f08:c400:f26a:6a5:e85c:2420
```

Create a AAAA record with your DNS provider that points your domain to the servers IPv6 address. Remove the existing A record that pointed to the IPv4 instance.

All done! You should now be able to get to the Umami dashboard by going to `umami.my-domain.com`.

I presume certbot certificate renewal will work just fine with this IPv6 server. I've yet to hit this point in time (`sudo certbot renew` does nothing until the certificates are about to expire).

## Fine Tuning

Disable the script when developing the site locally.

{{% figure src="_assets/localhost-being-the-top-referrer-in-umami.png" width="600px" %}}
