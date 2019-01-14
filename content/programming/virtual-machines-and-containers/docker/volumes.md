---
author: gbmhunter
date: 2017-05-23 22:58:13+00:00
draft: false
title: Volumes
type: page
---

## Overview

Volumes is a docker concept which allows you to have persistent storage within a docker container. It also allows files to be shared between the docker container and the host machine.

## Creating A Docker Volume

A Docker volume can be associated with a host directory. This is specified as part of the `-v` option. Unlike the container path, which must be absolute, the host directory can be relative.

The following command will mount the relative host directory my-volume/ to /root/ inside the container.

```sh   
$ docker run -it -v my-volume:/root container
```

{{% note %}}
Any existing files in `/root/` will be shadowed by this mount. This means that you cannot expose pre-existing files that reside in the container to the root system using this method.
{{% /note %}}

## Using A Dockerfile

Be careful with your placement of the `VOLUME` command inside a Dockerfile, as it essentially creates an immutable folder structure from that point forwards. Any modifications to the mount directory (or any sub-directory) will not be present when you create a container from the built image.