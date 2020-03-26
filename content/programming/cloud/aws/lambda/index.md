---
author: "gbmhunter"
categories: [ "Programming", "Cloud", "AWS" ]
date: 2020-03-26
description: "An introduction to lambda, a function execution service (aka serverless) provided by AWS."
draft: false
lastmod: 2020-03-26
tags: [ "programming", "cloud", "AWS", "Amazon Web Services", "lambda", "function", "serverless" ]
title: "Lambda"
type: "page"
---

## Overview

Amazon Linux is what runs on EC2 instances, [https://hub.docker.com/_/amazonlinux/](https://hub.docker.com/_/amazonlinux/).

## Creating A Deployable Python Package

If you are only importing modules that are shipped with Python, deploying Python code to a lambda function is easy, you can just zip up the files and upload them. Things get more difficult when you are including modules (libraries) that are not shipped with Python (e.g. you are `pip install`ing). Especially so when the modules come pre-built as a wheel for your particular machine. You cannot just bundle these up into the `.zip` file and upload it, as it will not likely run on different environment provided by the lambda service (e.g. if you pip install Numpy on a mac you will download Numpy executables for macOs, these will not run on the Linux-like environment in lambda).

The common solution to this problem is to build/package your Python code up on a system environment which closely resembles the Lambda execution environment. lambci has published an image which closely represents the AWS lambda environment. It can be found at [https://hub.docker.com/r/lambci/lambda/](https://hub.docker.com/r/lambci/lambda/).

For Python:

```
FROM lambci/lambda:build-python3.6
```


## AWS Lambda Container Image Converter Tool (img2lambda)

Link: https://github.com/awslabs/aws-lambda-container-image-converter

