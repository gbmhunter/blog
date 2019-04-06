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

## Heading (h2) (should be a number on left)

### Heading (h3)

Some display math:

<p>$$ f(x) = \frac{2}{3} $$</p>

Some inline math. `\(f(x) = \frac{2}{3}\)`. More normal text.

A divider below:

---

## References

A reference to first resource {{< ref id="ref1" >}}.

Second ref is{{< ref id="ref2" >}}between here.

A second link to first resource {{< ref id="ref1" >}}.

## Tables

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


<ul id="ref-list">
  <li id="ref1">The first reference.</li>
  <li id="ref2">The second reference.</li>
</ul>
