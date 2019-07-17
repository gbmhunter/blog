---
author: gbmhunter
categories: [ "Programming", "Integrated Development Environments (IDEs)" ]
date: 2019-07-15
description: "A tutorial on Jupyter Notebooks and Jupyter Labs."
draft: false
lastmod: 2019-07-16
tags: [ "programming", "integrated development environments", "IDEs", "Jupyter", "notebooks", "Jupyter Labs", "HTML", "IPython", "images", "server", "CSS" ]
title: "Jupyter"
type: "page"
---

## Overview

Jupyter is a collection of software tools orientated towards the processing and visualizing of data. The two most prominent tools are Jupyter Notebooks, a web-based IDE/user interface for writing software and visualizing data, and Jupyter Labs, their newer web application which incorporates Notebooks plus many other features.

{{% figure src="jupyter-logo.svg" width="300px" caption="The Jupyter logo." %}}

Most of the code examples on this page assume you are using the Python programming language, although the features should be available in the other languages that Jupyter supports.

## Jupyter Labs Keyboard Shortcuts

```text
Shift-Enter   Execute current cell.
Enter         New line.
```

## Outputting HTML

In can be very handy to be able to output HTML from a cell, ever to provide titles, and descriptive information or to create tables.

To output HTML, you can use the `HTML` function provided from the `IPython` package, along with `display()`:

```python
from IPython.display import display, HTML

display(HTML(f'<h1>Hello, world!</h1>'))
```

This can be used to create very configurable and flexible cell outputs, as you can output anything that HTML supports: tables, images, headings, e.t.c. and any combination of these! Style is also easily supplied with inline CSS.

## Outputting Images

A flexible way to include images in cell output is to output images in HTML form.

```python
display(HTML('<img src="image.png" style="width: 400px;" />'))
```

However, the above code will only work if the image is under the directory that the notebook server is running from. To include images from any directory on your computer, you can create a simple file server for your computer with:

```bash
$ cd /
$ python -m http.server 8123
```

and then change the HTML to:

```python
display(HTML('<img src="http://localhost:8123/my_dir/image.png" style="width: 400px;" />'))
```

Note that both of these methods will not embed the image into the HTML but rather link to it. This will result in fast load times but will require the file system/server to be available everytime you want to re-render the cell.
