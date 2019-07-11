---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-06-28
description: "Info on Python virtual environments."
draft: false
lastmod: 2019-06-28
tags: [ "programming", "programming languages", "Python", "virtual environments", "virtualenv", "venv", "conda", "pipenv" ]
title: "Python Virtual Environments"
type: "page"
---

## Overview

When writing a Python application, you will likely pull in a number of third party libraries, typically installed by a package manager such as `pip` or `conda`. The application will typically depend on a specific version of each library (or a narrow range of versions). This can cause conflicts if other Python applications on your computer require different versions of the same package.

The solution to this problem is to **create a separate installation space for all of the libraries, specific to the application that uses them**. This is called a _virtual environment_.

Python has a few popular frameworks for creating vritual environments.

## virtualenv 

### Installation

Started at Python 3, virtualenv is installed as `venv` with your Python installation. For Python 2.x users, you can install virtualenv with:

```bash
$ pip install virtualenv # Python 2.x users only
```

`env` will be the name of the virtual environment.

```python
python -m venv env
```

This will create a directory called `env` in your current working directory.

To activate (on UNIX or macOS):

```bash
$ source env/bin/activate
```

To deactivate:

```bash
$ deactivate
```

## pipenv

pipenv is a third-party Python virtual environment framework alternative to the built-in `venv`.

### Installation

```bash
$ pip install --user pipenv
```
