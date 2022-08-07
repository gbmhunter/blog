---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Web Design", "User Interface Libraries" ]
date: 2019-11-26
draft: false
lastmod: 2019-11-26
tags: [ "programming", "web design", "user interfaces", "libraries", "UI", "GUI", "React" ]
title: "React"
type: "page"
---

## Overview

{{% figure src="react-logo.png" width="400px" caption="The React logo." %}}

## Injecting Variables At Build Time

React recognizes either environment variables or variables defined in a `.env` file located at the project root. React only recognizes variables which begin with `REACT_APP_`

```bash
export REACT_APP_SERVER_URL="www.myserver.com/api"
```

Environment variables take precedence over those defined in the `.env` file.

Imported variables are available in the React environment under `process.env`:

```js
console.log(process.env.REACT_APP_SERVER_URL)
// stdout: www.myserver.com/api
```