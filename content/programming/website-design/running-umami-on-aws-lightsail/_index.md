---
authors: [ Geoffrey Hunter ]
date: 2024-03-24
draft: false
lastmod: 2024-03-24
tags: [ Lightsail, Umami, analytics, server, AWS, https, docker, nginx ]
title: Running Umami on AWS Lightsail
type: page
---

## Spinning Up Lightsail Server

Select Ubuntu 22.04. You could choose a different Linux OS, like AWS Linux, but the commands will be different (e.g. `yum` instead of `apt`) and nginx config files will not be in `sites-available`.

{{% figure src="picking-ubuntu-22-04-in-lightsail.png" width="600px" %}}

Select the size. Make sure to select As of March 2024, IPv6 doesn't work for cloning projects of GitHub, nor some docker-based commands which fetch data from remotes. What we can do though is perform all of the setup with a public IPv4 address, and then once we are complete, create a Snapshot, and create a new instance from the Snapshot that is IPv6 only. More on this below.

I had issues with the memory capped at 512MB. The 1GB RAM/40GB SSD size worked well (US$5.00/month).

{{% figure src="_assets/choosing-dual-stack-and-size-lightsail.png" width="600px" %}}

Select or create a keypair to authenticate with this server. If creating a new keypair, the private key will be downloaded. Save this for later when we need to ssh into the instance to set it up.

Click go!

## Add a Rule For Https

Click on the `Networking" tab under your Lightsail instance, and then add a IPv4 firewall rule allowing https traffic.

{{% figure src="_assets/ipv4-https-firewall-rule-in-lightsail.png" width="600px" %}}

This will come in useful later when we force traffic to use `https` only.

## Create DNS A Record to Point to Server

Now you need to create a DNS A Record that points your subdomain `umami.my-domain.com` to the IP address of the Lightsail instance you just created.

I use Cloudflare, so the following image shows a screenshot of myself setting up the A record through the Cloudflare control panel. It should be similar with most other DNS providers.

{{% figure src="adding-dns-a-record-in-cloudflare.png" width="600px" %}}

## Installing and Starting Umami On Localhost

Connect via ssh. I had problems using the subdomain to connect, so I just used the IP address directly. You will need the private key that you setup/selected when you created the Lightsail instance above.

```
ssh -i ~\.ssh\private-key.pem ubuntu@34.207.322.232
```

`cd` into the `/opt` directory:

```shell
cd /opt
```

Clone the Umami repo:

```shell
sudo git clone https://github.com/mikecao/umami.git
```

```shell
cd umami/
```

```shell
sudo vim docker-compose.yml
```

```
ports:
      - "3000:3000"
```

to:

```
    ports:
      - "127.0.0.1:3000:3000"
```

## Install Docker

Add Docker's `apt` repository:

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

```shell
sudo apt update
sudo apt install nginx
```

```
server {
    listen       80;
    listen       [::]:80;
    server_name  my-domain.com;

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

Add a new config:

```shell
sudo nano /etc/nginx/sites-available/umami.conf
```

```conf
server {
    listen       80;
    listen       [::]:80;
    server_name  your_domain_here;

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



```shell
sudo ln -s /etc/nginx/sites-available/umami.conf /etc/nginx/sites-enabled/
```

Reload nginx:

```shell
sudo systemctl reload nginx
```

## Install Certbot

```shell
sudo apt install certbot python3-certbot-nginx
```

```shell
sudo certbot --nginx -d my-domain.com
```

You'll be prompted to enter in an email address. Once it's complete, it should have modified your nginx `umami.conf` and restarted nginx so that you're set to go!

Certbot should have modified your `/etc/nginx/sites-available/umami.conf` so that it looks similar to the following:

```conf
server {
    server_name  my-domain.com;

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
    ssl_certificate /etc/letsencrypt/live/my-domain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/my-domain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = my-domain.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen       80;
    listen       [::]:80;
    server_name  my-domain.com;
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