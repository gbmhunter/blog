#!/usr/bin/env bash

# Fail script on any error
set -e

# Build a docker image using the Dockerfile in the current directory
docker build -t blog-docker ./docker/

# Run the container, and enter to the bash prompt. Mount the BlogAssets directory so we
# can inspect output on the host machine (e.g. images)
docker run -it -v $PWD:/root/blog -v ~/Downloads/:/root/scratch/ blog-docker bash
