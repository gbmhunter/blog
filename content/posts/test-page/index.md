---
author: "gbmhunter"
date: 2004-09-13
draft: false
tags: [ "test page" ]
title: "Test Page"
---

Is the breadcrumb working above ^^^ ???

Is the TOC working above ^^^ ???

**Bold**, _italics_.

# Page Title

## Heading 2 (should be a number on left)

### Heading 3

Some display math:

<div>$$ f(x) = \frac{2}{3} $$</div>

Some inline math. `\(f(x) = \frac{2}{3}\)`. More normal text.

A divider below:

---

A markdown table:

Heading 1   | Heading 2
------------|------------
abc         | def
ghi         | jkl

A wide HTML table (we should be able to scroll horizontally):

<div class="table-wrapper">
<table>
    <thead>
        <tr>
            <th style="min-width:500px">Wide</th>
            <th style="min-width:500px">Wide</th>
            <th style="min-width:500px">Wide</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="min-width:500px">Wide</td>
            <td style="min-width:500px">Wide</td>
            <td style="min-width:500px">Wide</td>
        </tr>
    </tbody>
</table>
</div>

{{% note %}}
This is a note.
{{% /note %}}

{{% warning %}}
This is a warning.
{{% /warning %}}

Some inline code. `x[2] = 3`. More text.

Some block code:

```c
x[3] = 4;
int y = x;
```