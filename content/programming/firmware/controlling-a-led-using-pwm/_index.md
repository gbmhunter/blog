---
authors: [Geoffrey Hunter]
categories: [Programming, Firmware]
date: 2024-04-02
description: 
draft: false
lastmod: 2024-04-02
tags: [LEDs, PWM, duty cycle, brightness, look-up table, LUT, microcontrollers, radiance, luminance, firmware, C, CIELAB, lightness, radiant flux]
title: Controlling a LED Using PWM
type: page
---

## Overview

This page explains the various ways you can drive a single [LED](/electronics/components/diodes/light-emitting-diodes-leds/) from firmware running on a microcontroller.

If all you need is a fixed brightness, you could just set the LED current by choosing the appropriate resistor. This will impart a slight colour change, but won't be noticeable for most use cases. 

## Varying the Radiant Flux

The radiant flux is the light output power of the LED, measured in Watts.

The easiest way of dynamically varying the light output of an LED is to use [pulse-width modulation (PWM)](/electronics/circuit-design/pulse-width-modulation-pwm/). PWM is a digital signal with a fixed frequency but an adjustable on-time (hence the "width modulation"). The duty cycle is the time the signal is on compared to the total period of the signal.

If the PWM period was 1s (a frequency of 1Hz) and the duty cycle 50%, we would see the LED "blink". However -- if the PWM frequency is fast enough (e.g. 1kHz), we do not see any flicker due to persistence of vision. Instead, because of the "averaging" that occurs in our eyes, a LED driven at 20mA for 50% of the time (50% PWM duty cycle) looks the same as driving the LED continuously at 10mA (ignoring the slight colour change due to changing current). This is great news! It means we can easily drive our LED using digital on/off signals, and don't have to implement costly and potentially energy inefficient analog current sources/sinks.

{{% aside type="tip" %}}
Different people can detect flicker at different frequencies. The _flicker fusion threshold_ is the frequency at which flicker is no longer detected to an average human observer[^wikipedia-flicker-fusion-threshold]. It depends a lot on the exact circumstances, but a general value of 60-90Hz is often used. You want the PWM frequency to be much higher than this to avoid edge-cases! A frequency of 1kHz is a good starting point.
{{% /aside %}}

So we can very the duty cycle of the PWM to vary the light output (radiant flux) of the LED. 0% duty cycle would make the LED turn off, and 100% duty cycle would be full brightness. The nice thing is that radiant flux varies very linearly with duty cycle. This is great if humans are not involved (e.g. agricultural grow LEDs for plants). However if you look at an LED whose duty cycle is linearly varied from 0% to 100%, you won't perceive a uniform change in brightness! More on this below...

## Adjusting For Our Eyes (Perceived Brightness)

Our eyes work over a huge range of brightness, and to do that they are not linearly sensitive to light output. Our eyes are far more sensitive to changes when the intensity is low compared to when the intensity is high. This human perception of brightness follows somewhat of a logarithmic response (similar to our hearing!).

{{% aside type="tip" %}}
Do not confused perceived brightness with luminance! Luminance takes into account the human eye's sensitivity to different wavelengths of light, but does not take into account the non-linear response to different intensities. That is where perceived brightness or lightness comes in.
{{% /aside %}}

If we wanted to set the brightness to half, this then means we need to set the PWM duty cycle to something less than 50%. Furthermore, if we wanted to fade the LED from off to full brightness, we can't just linearly change the duty cycle. What we need is a function which maps perceived brightness to a PWM duty cycle. There are two functions that we will discuss below.

### The CIE Lightness Method

An accurate way to take into account perceived brightness is to use the CIE lightness formula. CIELAB represents lightness with the symbol \(L*\)[^wikipedia-lightness] (not to be confused with just \(L\) which is used for luminance). Lightness adjusts for the eyes non-linear response to changes in intensity. The CIELAB lightness equation is:

$$\begin{align}
L* = 116\left( \frac{Y}{Y_n}^{\frac{1}{3}} \right) - 16
\end{align}$$

<p class="centered">
where:<br/>
\(L*\) is the lightness value in the range \([0, 100]\).<br/>
\(Y\) is the Y tristimulus value of the colour.<br/>
\(Y_n\) is the Y tristimulus value of the reference white point.<br/>
</p>

\(\frac{Y}{Y_n}\) is called the relative luminance. This is just a number that goes from 0 to 1. The trick here is that we can assume the relative luminance is proportional to the duty cycle of LED (and intensity). Thus \(\frac{Y}{Y_n}\) is essentially our duty cycle as a number from 0 to 1.

One restriction the equation has is that \( \frac{Y}{Y_n} > 0.01 \). In 1976 an article by Hartmut Pauli extended the formula to remove this limitation[^wikipedia-lightness]. It extends the formula down to \(\frac{Y}{Y_n} = 0\) (which maps to \(L* = 0\)) and is tangent to the formula above where the two curves meet. This gives the following formula:

$$
L* =
\left\{
\begin{array}{ll}
903.3\frac{Y}{Y_n}                                   & Y/Yn <= 0.008856 \\
116\left( \frac{Y}{Y_n}^{\frac{1}{3}} \right) - 16   & Y/Yn > 0.008856
\end{array}
\right.
$$

Great! Now we have a formula which can convert a duty cycle (\(\frac{Y}{Y_n}\)) in the range \([0, 1]\) to a lightness value in the range \([0, 100]\). This combined 2-part formula is shown in {{% ref "fig-cie-relative-luminance-to-lightness" %}}.

{{% figure ref="fig-cie-relative-luminance-to-lightness" src="_assets/cie-relative-luminance-to-lightness.png" width="700px" caption="Graph showing the function which converts lightness to luminance." %}}

{{% aside type="tip" %}}
In the graph above, lightness \(L*\) has been converted from a number from 0 to 100 (as it is in the equations) to a number from 0 to 1, just because I feel like this is a better way to display it.
{{% /aside %}}

To make use of this in our firmware we first need to invert it -- we need to go the other way and convert a lightness to a duty cycle. This is easy to do by rearranging the formula:

$$
\frac{Y}{Y_n} =
\left\{
\begin{array}{ll}
\frac{L*}{903.3}                                   & L* <= 8 \\
\left( \frac{L* + 16}{116} \right)^3              & L* > 8
\end{array}
\right.
$$

The inverted formula gives the relationship shown in {{% ref "fig-cie-lightness-to-relative-luminance" %}}.

{{% figure ref="fig-cie-lightness-to-relative-luminance" src="_assets/cie-lightness-to-relative-luminance.png" width="700px" caption="Graph showing the inverse CIE lightness function which converts lightness to luminance." %}}

We could now use this formula in our firmware to convert a lightness value to a PWM duty cycle. However, given the power and divide operations in it, this is a bit computationally expensive. In most cases a better way is to use a look-up table (LUT). The index of the LUT is the lightness value, and the value at that index is the PWM duty cycle.

Below is an example LUT in C which takes a lightness value as an integer in the range \([0, 255]\) (8-bit) and gives you the corresponding PWM duty cycle as an integer in the range \([0, 255]\).

```c
const uint8_t CIE_LIGHTNESS_TO_PWM_LUT_256_IN_8BIT_OUT[] = {
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    1,    1,    1,    1,    1,    1,
    1,    1,    1,    2,    2,    2,    2,    2,    2,    2,    2,    3,    3,    3,    3,    3,
    3,    3,    4,    4,    4,    4,    4,    5,    5,    5,    5,    5,    6,    6,    6,    6,
    6,    7,    7,    7,    7,    8,    8,    8,    8,    9,    9,    9,   10,   10,   10,   11,
   11,   11,   12,   12,   12,   13,   13,   13,   14,   14,   14,   15,   15,   16,   16,   16,
   17,   17,   18,   18,   19,   19,   20,   20,   21,   21,   22,   22,   23,   23,   24,   24,
   25,   25,   26,   26,   27,   28,   28,   29,   29,   30,   31,   31,   32,   33,   33,   34,
   35,   35,   36,   37,   37,   38,   39,   40,   40,   41,   42,   43,   44,   44,   45,   46,
   47,   48,   49,   49,   50,   51,   52,   53,   54,   55,   56,   57,   58,   59,   60,   61,
   62,   63,   64,   65,   66,   67,   68,   69,   70,   71,   72,   73,   75,   76,   77,   78,
   79,   80,   82,   83,   84,   85,   87,   88,   89,   90,   92,   93,   94,   96,   97,   99,
  100,  101,  103,  104,  106,  107,  108,  110,  111,  113,  114,  116,  118,  119,  121,  122,
  124,  125,  127,  129,  130,  132,  134,  135,  137,  139,  141,  142,  144,  146,  148,  149,
  151,  153,  155,  157,  159,  161,  162,  164,  166,  168,  170,  172,  174,  176,  178,  180,
  182,  185,  187,  189,  191,  193,  195,  197,  200,  202,  204,  206,  208,  211,  213,  215,
  218,  220,  222,  225,  227,  230,  232,  234,  237,  239,  242,  244,  247,  249,  252,  255,
};
```

You have to also consider quantization. A decent resolution on the PWM duty cycle is needed for good smoothness. If you had an 8-bit PWM, with only 256 discrete settings for the duty cycle, you're smallest non-off value (setting the duty cycle to 0x01) is 3.9% of the maximum brightness! You can see this by looking at the LUT above, the first 10 lightness values all map to a PWM duty cycle of 0.

{{% figure src="_assets/cie-lightness-to-pwm-8bit.png" width="700px" caption="Graph showing the quantization of lightness with a PWM signal with 8-bit resolution." %}}

If we use a 10-bit PWM, our LUT would look like this:

```c
const uint16_t CIE_LIGHTNESS_TO_PWM_LUT_256_IN_10BIT_OUT[] = {
    0,    0,    0,    1,    1,    2,    2,    3,    3,    4,    4,    4,    5,    5,    6,    6,
    7,    7,    8,    8,    8,    9,    9,   10,   10,   11,   11,   12,   12,   13,   14,   14,
   15,   15,   16,   17,   17,   18,   19,   20,   20,   21,   22,   23,   24,   24,   25,   26,
   27,   28,   29,   30,   31,   32,   33,   34,   35,   36,   38,   39,   40,   41,   42,   44,
   45,   46,   48,   49,   50,   52,   53,   55,   56,   58,   59,   61,   62,   64,   66,   67,
   69,   71,   73,   74,   76,   78,   80,   82,   84,   86,   88,   90,   92,   94,   96,   98,
  101,  103,  105,  107,  110,  112,  115,  117,  120,  122,  125,  127,  130,  132,  135,  138,
  141,  143,  146,  149,  152,  155,  158,  161,  164,  167,  170,  173,  176,  180,  183,  186,
  190,  193,  196,  200,  203,  207,  211,  214,  218,  222,  225,  229,  233,  237,  241,  245,
  249,  253,  257,  261,  266,  270,  274,  278,  283,  287,  292,  296,  301,  305,  310,  315,
  320,  324,  329,  334,  339,  344,  349,  354,  359,  365,  370,  375,  380,  386,  391,  397,
  402,  408,  414,  419,  425,  431,  437,  443,  449,  455,  461,  467,  473,  479,  485,  492,
  498,  505,  511,  518,  524,  531,  538,  545,  551,  558,  565,  572,  579,  586,  594,  601,
  608,  616,  623,  631,  638,  646,  653,  661,  669,  677,  685,  693,  701,  709,  717,  725,
  733,  742,  750,  759,  767,  776,  784,  793,  802,  811,  820,  829,  838,  847,  856,  865,
  875,  884,  893,  903,  913,  922,  932,  942,  952,  962,  971,  982,  992, 1002, 1012, 1023,
};
```

See how there is far less identical outputs at the start of the LUT when using a 10-bit output? Only the first three relative luminances map to a 12-bit PWM 0, rather than the first 10 when using a 8-bit PWM.



### Gamma Correction

The Gamma function was designed to convert from a CRT voltage to the luminance[^led-shield-led-brightness-gamma-correction-no]. It just happens that the Gamma function is very similar to the CIE lightness formula above and gives you "good enough" results in many cases.

The gamma equation is:

$$
I = V^\gamma
$$

<p class="centered">
where:<br/>
\(I\) is the intensity<br/>
\(V\) is the applied voltage<br/>
\(\gamma\) is the gamma value, and is usually set at 2.2.<br/>
</p>

{{% ref "fig-gamma-correction" %}} shows the gamma correction function, plotted alongside the CIE lightness function. They are very similar!

{{% figure ref="fig-gamma-correction" src="_assets/gamma-correction.png" width="700px" caption="Graph showing the gamma correction function." %}}

Just like with the CIE lightness function, you could create a LUT using the gamma correction function instead. Given there is no computational difference between the two (once the LUT is created), I recommend using the CIE lightness function which is likely to be that little bit more "correct".

You might find some strong words online about using Gamma correction for LED "brightness" control:

> These power functions, with a gamma of 2.2, are frequently used to map between linear and perceptual values. Although the “gamma function” is commonly used it is arguable that CIE Lightness is the more precise formulation; and in fact CIE Lightness is the formula use for L in the CIE Lab color model rather than a gamma function[^photonstophotos-psychometric-lightness-and-gamma].

> The gamma correction is used to correct non-linear relationship between applied voltage to CRT and luminance of CRT. It is nothing to do with human perception. -- Peter Jacobs, LED Shield[^led-shield-led-brightness-gamma-correction-no].

## Further Reading

Another way to control LEDs is with constant-current drivers or sinks.

The [CodeInsecurity "The problem with driving LEDs with PWM" blog post](https://codeinsecurity.wordpress.com/2023/07/17/the-problem-with-driving-leds-with-pwm/)[^codeinsecurity-the-problem-with-driving-leds-with-pwm] is a good read.

## References

[^photonstophotos-psychometric-lightness-and-gamma]: Bill Claff (2005, Mar 26)._Psychometric Lightness and Gamma_. photonstophotos.net. Retrieved 2024-04-03, from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm.
[^wikipedia-lightness]: Wikipedia (2024, Feb 10). _Lightness_. Retrieved 2024-04-03, from https://en.wikipedia.org/wiki/Lightness.
[^led-shield-led-brightness-gamma-correction-no]: Peter Jakobs (2012, Nov 13). _LED Brightness to your eye, Gamma correction – No!_. LED Shield. Retrieved 2024-04-03, from https://ledshield.wordpress.com/2012/11/13/led-brightness-to-your-eye-gamma-correction-no/.
[^codeinsecurity-the-problem-with-driving-leds-with-pwm]: Graham Sutherland (2023, Jul 17). _The problem with driving LEDs with PWM_. CODEINSECURITY. Retrieved 2024-04-04, from https://codeinsecurity.wordpress.com/2023/07/17/the-problem-with-driving-leds-with-pwm/.
[^wikipedia-flicker-fusion-threshold]: Wikipedia (2024, Feb 1). _Flicker fusion threshold_. Retrieved 2024-04-04, from https://en.wikipedia.org/wiki/Flicker_fusion_threshold.
