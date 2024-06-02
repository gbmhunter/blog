---
authors: [Geoffrey Hunter]
categories: [Programming, Firmware]
date: 2024-06-02
description: 
draft: false
images: [_assets/cover-image.webp]
lastmod: 2024-06-02
tags: []
title: Choosing Serial Numbers for Embedded Products
type: page
---

If you want to assign you own (and typically write it to non-volatile memory (NVM) like EEPROM or flash) you can go with an incrementing serial number. This works well as long as you have a centralized place to store the last used serial number, and don't have to generate serial numbers across factories at the same time. The downside is that it's an extra step in the assembly process, and you may already need to use MAC addresses for others reasons, so now you have two serial numbers to keep track of.

If you are using a randomly generated number, the interesting question becomes "how large do I need the random number to be so that I have a very low chance of a collision"? This question can be answered with a dose of statistics and mathematics.

One way to solve this is to consider comparing every serial number you generate with every other serial number. The number of serial numbers depends on how many products you plan on manufacturing. You can quite easily calculate the probability that any two serial numbers will be the same. 1 minus this gives you the probability that the two serial numbers were not the same. You can then consider iterating over all possible combinations of serial numbers. If, for every single comparison you did, the numbers did not collide, then you know that all of the serial numbers were unique. Every other branch of the "probability tree" would have at least one collision (or maybe more, that's why it easier to work out the single branch in which they are all unique).

So we need to know how many combinations of serial numbers there are. Because the order does not matter (comparing serial number 1 with serial number 2 is the same as comparing serial number 2 with serial number 1, we are dealing with true mathematical combinations and not permutations (read up on this if you need to learn about these concepts). The equation that tells you the number of combinations given the total number of items and the number of items in each sample is[^calculator-soup-combinations-calculator]:

$$
C(n,\ r) = \frac{n!}{r!(n-r)!}
$$

Where \(n\) is the total number of items, and \(r\) is the number of items in each sample.

\(r\) is always \(2\) in this case. \(n\) is the total number of serial numbers you plan on generating. So if we were planning of making 1000 products, the number of combinations of serial numbers to compare would be:

$$\begin{align*}
C(1000,\ 2) &= \frac{1000!}{2!(1000-2)!} \\
                  &= \frac{1000*999}{2!} \\
                  &= 499500 \\
\end{align*}$$

Next you need to know what the probability of a single comparison of two serial numbers being the same is. If you had a 32-bit serial number, the probability of two serial numbers being the same is:

$$
P(\text{any two are identical}) = \frac{1}{2^{32}}
$$

$$
P(\text{any two are unique}) = 1 - P(\text{any two are identical})
$$

In the case of a 32-bit serial number, this probability is:

$$\begin{align*}
P(\text{any two are unique}) &= 1 - \frac{1}{2^{32}} \\
                             &= 0.999999999767169356 \\
\end{align*}$$

You then multiply this probability by itself 499500 times to get the probability that all serial numbers are unique. i.e.:

$$\begin{align*}
P(\text{all are unique}) &= (P(\text{any two are unique}))^{499500} \\
                         &= 0.999999999767169356^{499500} \\
                         &= 0.999883707855937023 \\
\end{align*}$$

Now we just subtract this from 1 to get the probability that at least one serial number is the same as another:

$$\begin{align*}
P(\text{collision}) = 1 - P(\text{all are unique}) \\
                    = 1 - 0.999883707855937023 \\
                    = 0.00011629214406297607843 \\
\end{align*}$$

This is a 1 in 8600 chance of a collision.

Putting it all together in symbolic form:

$$
P(\text{collision}) = 1 - \left[(1-P(\text{any two are identical}))^{\dfrac{n*(n-1)}{2}}\right]
$$

Where \(n\) is the total number of serial numbers and \(P(\text{any two are identical})\) is the probability that any two serial numbers are the same. In the case of using a fixed number of bits for the serial number, this probability equation becomes:

$$
P(\text{collision}) = 1 - \left[(1-\dfrac{1}{2^{b}})^{\dfrac{n*(n-1)}{2}}\right]
$$

Where \(b\) is the number of bits in the serial number.

{{% aside type="example" %}}

**100,000 Devices**

If you were planning on manufacturing 100,000 devices, and you were using a 32-bit randomly generated serial number, what would the probability of a collision be?

Let's start with the general equation above. Our \(n\) is 100,000 and our \(b\) is 32:

$$\begin{align*}
P(\text{collision}) &= 1 - \left[(1-\dfrac{1}{2^{b}})^{\dfrac{n*(n-1)}{2}}\right] \\
                    &= 1 - \left[(1-\dfrac{1}{2^{32}})^{\dfrac{100000*(100000-1)}{2}}\right] \\
                    &= 1 - \left[(1-\dfrac{1}{4294967296})^{4999950000}\right] \\
                    &= 1 - \left[(0.99999999976716935635)^{4999950000}\right] \\
                    &= 1 - 0.31219053861894671205 \\
                    &= 0.68780946138105328795 \\
                    &= 0.69 \\
\end{align*}$$

So there is a 69% chance of a collision if generating 32-bit random serial numbers for 100,000 devices! Not good :-O. What if we used a 64-bit serial number instead?

$$\begin{align*}
P(\text{collision}) &= 1 - \left[(1-\dfrac{1}{2^{b}})^{\dfrac{n*(n-1)}{2}}\right] \\
                    &= 1 - \left[(1-\dfrac{1}{2^{64}})^{\dfrac{100000*(100000-1)}{2}}\right] \\
                    &= 1 - \left[(0.999999999999999999945789891376)^{4999950000}\right] \\
                    &= 1 - 0.999999999728952167420788569031 \\
                    &= 2.71047832579211430968543149181e-10 \\
\end{align*}$$

This is better! There is a 1 in 3.7 billion chance of a collision if generating 64-bit random serial numbers for 100,000 devices. I don't know about your appetite for risk, but I would be happy with those odds!

{{% /aside %}}

{{% aside type="example" %}}

**The Birthday Problem**

This is a classic probability problem which is essentially the same problem as what we have been discussing with serial numbers. The problem is as follows: "How many people do you need in a room before you have a 50% chance that two people share the same birthday?". The answer is a someone counter-intuitive 23!

Let's double-check 23 is correct by using the same equations as above. The problem any two compared birthdays are identical is (ignoring leap years):

$$
P(\text{any two are identical}) = \frac{1}{365}
$$

The number of people in the room is 23, so that is our \(n\). Substituting into the general equation:

$$\begin{align*}
P(\text{collision}) &= 1 - \left[(1-\frac{1}{365})^{\dfrac{23*(23-1)}{2}}\right]
                    &= 1 - \left[(\frac{364}{365})^{253}\right]
                    &= 1 - 0.499
                    &= 0.501
\end{align*}$$

Which gives us a 50% chance of collision, as expected.

{{% /aside %}}


## References

[^calculator-soup-combinations-calculator]: Calculator Soup. _Combinations Calculator (nCr)_. Retrieved 2024-06-02, from https://www.calculatorsoup.com/calculators/discretemathematics/combinations.php.
