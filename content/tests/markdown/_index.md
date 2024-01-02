---
aliases: [ "test-alias" ]
authors: [ "Geoffrey Hunter" ]
date: 2004-09-13
draft: false
lastmod: 2021-06-20
tags: [ "test page" ]
title: "Markdown Test Page"
type: page
---

Is the breadcrumb working above ^^^ ???

There should be a TOC either above (narrow screens) or in the right sidebar (wide screen).

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

Here should be a reference to the below table: {{% ref "tbl-doesnt-mean-anything" %}}

<table ref="tbl-doesnt-mean-anything">
<caption>Data that doesn't mean anything. This caption should be prefixed with "Table 1: ".</caption>
<tbody>
<tr>
  <td>abcdefghi</td>
  <td>jklmnopqr</td>
</tr>
</tbody>
</table>

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

## Images

The logo is shown in {{% ref "fig-cartoon-ninja" %}}.

{{% figure ref="fig-cartoon-ninja" src="cartoon-ninja.jpg" width="300px" caption="This should be an clickable image of the logo. **Bold text**. An equation: `\(x^2\)`. Always use '%' and not '<' in the hugo shortcode delimiters to render equations and footnotes. There should be a footnote number at the end of this sentence[^foot-1]." %}}

Link to an image which is not a page resource is shown in {{% ref "fig-cartoon-ninja-2" %}}

{{% figure ref="fig-cartoon-ninja-2" src="/images/logo/cartoon-ninja.jpg" width="300px" caption="Caption for non-page resource image." %}}

## Asides

{{% aside type="example" %}}
This is an example. There should be a reference at the end here[^ti-sboa187e-current-mode-control].
{{% /aside %}}

{{% aside type="note" title="This Has a Custom Title!" %}}
This is a note. It should also have a custom title.
{{% /aside %}}

{{% aside type="tip" %}}
This is a tip.
{{% /aside %}}

{{% aside type="warning" %}}
This is a warning.
{{% /aside %}}

{{% aside type="note" %}}
This has code inside the aside:

```python
print('Hello, world!')
```
{{% /aside %}}

{{% aside type="note" %}}
There should be an equation here: `\(y = x^2\)`
{{% /aside %}}

Below should be a worked example. It should be an aside with info inside it. There should be numbered steps, and there should be equations in some of the steps.

{{% aside type="example" %}}

**Design Procedure:**

1. Decide on the program current, `\(I_P\)`. This will also be the current through the load. We'll use this value later! For this example we'll choose `\(1mA\)`.

1. Find the voltage across `\(R_1\)`, nothing that `\(Q_1\)` has a diode voltage drop of `\(0.7V\)` from emitter to base (with the emitter tied to `\(V_{CC}\)`), at that the base and collector of `\(Q_1\)` are tied together and hence at the same voltage:
    <p>\begin{align}
    V_{R1}  &= 12V - 0.7V \nonumber \\
            &= 11.3V
    \end{align}</p>

1. Set the resistance of `\(R_1\)` using Ohm's Law:
    <p>\begin{align}
    R_1 &= \frac{V_{R1}}{I_P} \nonumber \\
        &= \frac{11.3V}{1mA} \nonumber \\
        &= 11.3k\Omega
    \end{align}</p>

1. All done!

{{% /aside %}}

## Code

Some of the syntax highlighting settings are set in `config.yaml` under `markup` -> `highlight`.

Some inline code. `x[2] = 3`. More text.

Some block code that **shouldn't** have scroll bars, but should have line numbers:

```c
x[3] = 4;
int y = x;
if (y == 4) {
  printf("Hello, world!");
}
```

Some block code that **should** have an x-axis scroll bar:

```c
a long line of text a long line of text a long line of text a long line of text a long line of text a long line of text lorem dipsum lorem dipsum lorem dipsum lorem dipsum lorem dipsum lorem dipsum lorem dipsum lorem dipsum
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

## Lists

* Here

* is a list

* of a few elements.

## Other

References, authors, related content and tags sections should be below (in that order).

* Application note[^ti-sboa187e-current-mode-control].
* Video reference[^university-of-colorado-bolder-intro-to-peak-current-mode-control].

## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows
## Lots Of Headings So TOC Overflows

## References

[^university-of-colorado-bolder-intro-to-peak-current-mode-control]: University of Colorado Bolder (2020, Aug 7). _Introduction to Peak Current Mode Control_ [Video]. YouTube. Retrieved 2023-06-18, from https://www.youtube.com/watch?v=3tTSMDEyVKc.
[^ti-sboa187e-current-mode-control]: Texas Instruments (2020, Dec). _Current Mode Control in Switching Power Supplies_ [Application Note]. Retrieved 2023-06-18, from https://www.ti.com/lit/an/sboa187e/sboa187e.pdf.