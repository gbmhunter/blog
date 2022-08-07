---
authors: [ "Geoffrey Hunter" ]
categories: [ "Mathematics", "Statistics" ]
date: 2018-08-30
draft: false
tags: [ "normal", "distribution", "statistics", "probability density" ]
title: Normal Distributions
type: page
---

<h2>Probability Density Function</h2>

<p>The probability density function of a normal distribution is given by:</p>

<p>$$ f(x, \mu | \sigma^2) = \frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{(x - \mu)^2}{2\sigma^2}} $$</p>

<p class="centered">
where:<br>
\( \mu \) is the mean of the distribution<br>
\( \sigma \) is the standard deviation<br>
</p>

{{% figure src="normal-distribution-pdf-examples.png" width="500px" caption="A few example probability density functions (PDFs) for the normal distribution."  %}}

<p>See <a href="https://github.com/gbmhunter/BlogAssets/tree/master/Mathematics/Statistics/NormalDistribution">https://github.com/gbmhunter/BlogAssets/tree/master/Mathematics/Statistics/NormalDistribution</a> for the code which generated these graphs.</p>

<h2>Capped Normal Distribution</h2>

<p>
$$ \sigma_{overall}^2 = \frac{1}{\sqrt{2\pi} \sigma_{nd} + c} \left [\int_{-\infty}^{-c} +\int_{c}^{\infty} x^2 e^{(-\frac{1}{2} (\frac{x - c}{\sigma_{nd}})^2)} dx + \int_{-c}^{c} x^2 dx \right ] $$
</p>

<p class="centered">
where:<br>
\( \sigma_{overall} \) is the standard deviation of the capped distribution<br>
\( \sigma_{nd} \) is the standard deviation of the normal distribution tails, ignoring the flat section in the middle<br>
\( c \) is the half-width of the flat section of the capped distribution<br>
\( x \) is the random variable<br>
</p>