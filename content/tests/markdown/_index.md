---
aliases: [ "test-alias" ]
author: "gbmhunter"
date: 2004-09-13
draft: false
lastmod: 2021-06-20
tags: [ "test page" ]
title: "Markdown Test Page"
---

Is the breadcrumb working above ^^^ ???

Is the TOC working above ^^^ ???

**Bold**, _italics_.

# Page Title

## Heading (h2) (should be a number on left)

### Heading (h3)

## MathJax

Some display math with a reference:

<p>$$ f(x) = \frac{2}{3}$$</p>

Some inline math. `\(f(x) = \frac{2}{3}\)`. More normal text.

An equation with `\begin{equation}`, which should be automatically numbered:

<p>
\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
  \label{eq:sample}
\end{equation}
</p>

And a reference to the above equation: In equation `\(\eqref{eq:sample}\)`, we find the value of an
interesting integral.

To align equations we can use:

<div>
\begin{align}
A &= B\\
  &= C\\
  &= D
\end{align}
</div>

These should be `\small` and `\tiny` equations:

<p>\begin{align}
\small y=x \\
\tiny y=x
\end{align}</p>

Should have some descriptive text:

<p>\begin{align}
y &= x && \text{Because \(y=x\), duh.} \\
  &= z && \text{Replacing \(x\) with \(z\).}
\end{align}</p>

First equation should not be numbered, second one should:

<p>\begin{align}
y &= x \nonumber \\
  &= z
\end{align}</p>

None of the equations should be numbered (but still should be aligned):

<p>\begin{align*}
y &= x \\
  &= z
\end{align*}</p>


Custom Latex macros:

This should be bold: `\( \b{x} \)`

This should be bold and have a hat: `\( \bhat{x} \)`


## Dividers

A divider below:

---

## References (bib shortcode)

A reference to first resource{{< bib id="ref1" >}}.

Second ref is{{< bib id="ref2" >}} between here.

A second link to first resource{{< bib id="ref1" >}}.

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

## Code

Some inline code. `x[2] = 3`. More text.

Some block code that **shouldn't** have scroll bars:

```c
x[3] = 4;
int y = x;
```

Some block code that **should** have an x-axis scroll bar:

```c
a long line of text a long line of text a long line of text a long line of text a long line of text a long line of text 
int y = x;
```

## Code Comments

You should not see anything rendered below until the next heading.

{{< comment >}}
If you can see this in the HTML, the comment shortcode is not working!
{{< /comment >}}

## Footnotes

This is a footnote[^foot-1].

This is another footnote[^foot-2].

[^foot-1]: The footnote text.
[^foot-2]: Another footnote

## References

<ul id="bib-list">
  <li id="ref1">The first reference. <b>This should be bold.</b></li>
  <li id="ref2">The second reference.</li>
</ul>

## Links

{{% link src="/test-page" text="Absolute link." %}}

{{% link src="relative-page" text="Relative link." %}}

## Colors

Blue: `#3465a4`
Orange: `#ea7500`

## Other

Footnotes, related content and tags sections should be below.