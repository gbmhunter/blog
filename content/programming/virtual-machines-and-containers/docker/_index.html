---
author: gbmhunter
categories: [ "Programming", "Virtual Machines And Containers" ]
date: 2017-01-23
draft: false
tags: [ "Docker", "container", "sudo", "images", "containers", "deleting", "programming", "service" ]
title: Docker
type: page
---

<h2>Overview</h2>

<p>Docker is container software. It is commonly used as a lightweight alternative to a virtual machine.</p>

{{< img src="docker-logo.png" width="300px" >}}

<h2>Running Docker Without sudo</h2>

<p>By default, Docker has to be run with sudo commands otherwise you will experience errors such as:</p>

{{< highlight bash >}}
$ dial unix /var/run/docker.sock: connect: permission denied
{{< /highlight >}}

<p>(this particular error was trying to run docker pull ...)</p>

<ol>
  <li>
    <p>Create a new docker group:</p>
    {{< highlight bash >}}
    $ sudo groupadd docker
    {{< /highlight >}}
  </li>
  <li>
    <p>Add the current user (you) to the docker group:</p>
    {{< highlight bash >}}
    $ sudo gpasswd -a ${USER} docker
    {{< /highlight >}}
  </li>
  <li>
    <p>Restart the docker service:</p>
    {{< highlight bash >}}
    $ sudo service docker restart
    {{< /highlight >}}
  </li>
  <li>
    <p>Apply the changed settings to the current terminal process (logging out and back in would have the same effect):
    </p>
    {{< highlight bash >}}
    newgrp docker
    {{< /highlight >}}
  </li>
  <li>All done! You should now be able to use docker commands without <code>sudo</code>.</li>
</ol>

<p>What Are Images? What Are Containers?</p>

<p>An image is a file which contains all the information/data about a particular system setup. When you run an image,
  you create a container of this image. You can create many containers based of the same image.</p>

<h2>Images</h2>

<h3>Getting Images (docker pull)</h3>

<p>Images can be downloaded from <a href="https://hub.docker.com/">Docker Hub</a> using the <code>docker pull</code> command.</p>

{{< highlight bash >}}
$ docker pull image_name
{{< /highlight >}}

<p>Images can be removed with:</p>

{{< highlight bash >}}
$ docker rmi image_name
{{< /highlight >}}

<h3>Inspecting Local Images</h3>

<p>You can view all of the docker images present on the local machine with:</p>

{{< highlight bash >}}
$ docker images
{{< /highlight >}}

<h2>Delete All Images</h2>

<p>The following command will remove all Docker images from your system:</p>

{{< highlight bash >}}
$ docker rmi $(docker images -q)
{{< /highlight >}}

<p>Sometimes this won't work because of the error: <code>image is referenced in multiple repositories</code>. To force
  the delete, add the <code>-f</code> option:</p>

{{< highlight bash >}}
$ docker rmi -f $(docker images -q)
{{< /highlight >}}


<h2>Containers</h2>

<h3>Inspecting</h3>

<p>To show only running containers:</p>

{{< highlight bash >}}
$ docker ps
{{< /highlight >}}

<p>To show all containers (included those that are not running):</p>

{{< highlight bash >}}
$ docker ps -a
{{< /highlight >}}

<h3>To Start A New Bash Session Within A Container</h3>

<p>Enter this on the a shell session running in the host computer to enter a shell session inside the docker container.
</p>

{{< highlight bash >}}
$ docker exec -it &lt;container_id&gt; bash
{{< /highlight >}}

{{% note %}}
This assumes you already have a container running!
{{% /note %}}

<h3>To Exit A Container Without Stopping It</h3>

<p>If the container is being run inside a bash shell, you can press <code>Ctrl-P</code> then <code>Ctrl-Q</code>.</p>

<h3>How To Stop/Remove All Containers At Once</h3>

{{< highlight bash >}}
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)
{{< /highlight >}}

If there are many docker containers, these commands can take some time (seconds).

<h2>Dockerfiles</h2>

<p>Dockerfiles are configuration files which tell Docker how to build an image.</p>

<p>Below is an example Dockerfile:</p>

{{< highlight dockerfile >}}
# Extend base image ubuntu 16.04
FROM ubuntu:16.04

## Update Ubuntu Software repository
RUN apt-get update

## Install git
RUN apt-get install -y git
{{< /highlight >}}

<p>If you are currently in the directory which has a Dockerfile, you can compile it with the following command:</p>

{{< highlight bash >}}
$ docker build -t my-docker-image .
{{< /highlight >}}