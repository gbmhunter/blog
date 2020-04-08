---
author: "gbmhunter"
categories: [ "Programming", "Virtual Machines And Containers" ]
date: 2017-01-23
description: "An overview on Docker and the commands to manipulate containers and images."
draft: false
lastmod: 2020-04-07
tags: [ "Docker", "container", "sudo", "images", "containers", "deleting", "programming", "service", "mount points", "cache", "stats" ]
title: "Docker"
type: "page"
---

## Overview

Docker is container software. It is commonly used as a lightweight alternative to a virtual machine.

{{< img src="docker-logo.png" width="300px" >}}

## Running Docker Without sudo

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

## Images

### Getting Images (docker pull)

Images can be downloaded from [Docker Hub](https://hub.docker.com/) using the `docker pull` command.

```bash
docker pull image_name
```

Images can be removed with:

```
$ docker rmi image_name
```

### Inspecting Local Images

You can view all of the docker images present on the local machine with:

```bash
docker images
```

### Building An Image From A Dockerfile

Change the working directory to the one that contains the `Dockerfile`, and then run:

```bash
docker build .
```

If you want to provide your own name for the image, use the `-t` option:

```bash
docker built -t myimage
```

### Delete All Images

The following command will remove all Docker images from your system:

```bash
$ docker rmi $(docker images -q)
```

Sometimes this won't work because of the error: `image is referenced in multiple repositories`. To force the delete, add the `-f` option:

```bash
$ docker rmi -f $(docker images -q)
```

## Containers

### Inspecting

To show only running containers:

```bash
$ docker ps
```

To show all containers (included those that are not running):

```bash
$ docker ps -a
```

### To Start A Container From An Image

```bash
docker run 
```

### To Start A Container With Mount Points

The `-v` flag is used in conjunction with `docker run` to start a new container with mount points. A mount point is when you mount a directory (and all of it's contents) into the container at a certain position within the file system. The `-v` option must come before the image name.

```bash
docker run -v /host/directory:/container/directory <image_name> <cmd>
```

{{% note %}}
The path to the host directory must be absolute, `docker run` does not allow you to specify a relative path.
{{% /note %}}

### To Start A New Bash Session Within A Running Container

Enter this on the a shell session running in the host computer to enter a shell session inside the docker container.

```bash
$ docker exec -it <container_id> bash
```

{{% note %}}
This assumes you already have a container running!
{{% /note %}}

### To Exit A Container Without Stopping It

If the container is being run inside a bash shell, you can press <code>Ctrl-P</code> then <code>Ctrl-Q</code>.

### How To Stop/Remove All Containers At Once

```bash
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)
```

If there are many docker containers, these commands can take some time (seconds).

### Runtime Statistics of Docker Containers (docker stats)

The `docker stats` command gives you an overview of useful statistics for each running Docker container such as CPU usage, memory usage, network I/O, block I/O and PIDs. You can run this command with:

```bash
docker stats
```

## Dockerfiles

Dockerfiles are configuration files which tell Docker how to build an image.

Below is an example Dockerfile:

```bash
# Extend base image ubuntu 16.04
FROM ubuntu:16.04

## Update Ubuntu Software repository
RUN apt-get update

## Install git
RUN apt-get install -y git
```

If you are currently in the directory which has a Dockerfile, you can compile it with the following command:

```bash
$ docker build -t my-docker-image .
```

Docker caches the image after each command in the `Dockerfile`, this is called a _layer_. When re-building, Docker will used cached layers to speed up the build process unless it determines that the the cache is invalid.

`COPY` and `ADD` are two commands that commonly invalidate cache and slow down rebuild steps.

## How To Speed Up "sending build context to docker daemon"

Adding a `.dockerignore` file and including everything in your project that is not used as part of the Docker build process can greatly speed up the `sending build context to docker daemon` process. Without a proper `dockerignore` you could be sending 100's of MiB or GiB of data to Docker, and the build process only uses a tiny fraction of it.