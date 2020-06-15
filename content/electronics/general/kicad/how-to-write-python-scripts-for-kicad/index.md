---
author: "gbmhunter"
date: 2020-06-15
description: ""
categories: [ "Electronics", "General" ]
lastmod: 2020-06-15
tags: [ "electronics", "KiCAD", "CAD" ]
title: "How To Write Python Scripts In KiCAD"
type: "page"
---

{{% warning-is-notes %}}

## Overview

## PCB Scripting

The library `pcbnew` will be automatically available to you when running the script within `pcbnew`, all you need to do is to `import` it:

```python
import pcbnew

board = pcbnew.GetBoard()
```

{{% img src="kicad-pcbnew-python-shell-pyalamode.png" width="700px" caption="A screenshot of the Python shell in pcbnew (the KiCAD PCB editor)." %}}

Scripts are placed in `<kicad installation dir>/scripting/plugins/`. They then show up in `pcbnew` under _Tools > External Plugins_.

{{% img src="kicad-default-provided-python-plugins.png" width="600px" caption="A directory listing showing all the python plugins that are provided by default with an installation of KiCAD v5.1.6." %}}