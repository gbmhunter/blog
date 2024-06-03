---
authors: [Geoffrey Hunter]
categories: [Programming, Firmware]
date: 2024-06-02
description: 
draft: false
images: [_assets/cover-image.webp]
lastmod: 2024-06-02
tags: []
title: Choosing Random Serial Numbers for Embedded Products
type: page
---

## Overview

Serial numbers are crucial for embedded devices that you want to individually track. They are used for uniquely identifying devices when talking to a server, warranty purposes and more. There a few ways to go about generating serial numbers. We'll first discuss a few different methods, and then dive into how to calculate the probability of a collision when using random serial numbers.

## Non-Random Serial Numbers

If you want to assign you own (and typically write it to non-volatile memory (NVM) like EEPROM or flash) you can go with an incrementing serial number. This works well as long as you have a centralized place to store the last used serial number, and don't have to generate serial numbers across factories at the same time. The downside is that it's an extra step in the assembly process, and you may already need to use MAC addresses for others reasons, so now you have two serial numbers to keep track of. Of course, another option across multiple sites is to prefix a unique ID with a site ID.

{{% aside type="tip" %}}

Perhaps you want random numbers for serial numbers to obscure the number of devices you have sold. In WW2, Allied forces we able to estimate the number of tanks Axis forces had by looking at the serial numbers. Parts of the tank (e.g. chassis, gearbox, engine) where assigned sequential serial numbers. Based on the numbers of the tanks that the Allied forces captured, they were able to use statistics to estimate the total number[^wikipedia-german-tank-problem].

{{% /aside %}}

## Random Serial Numbers

One option is to use randomly generated serial numbers. However, there is a chance that two serial numbers will be the same (unless of course you keep track of all previously generated serial numbers and regenerate if there is a collision).

The interesting question becomes "how large do I need the random number to be so that I have a very low chance of a collision"? This question can be answered with a dose of statistics!

One way to solve this is to consider comparing every serial number you generate with every other serial number. The number of serial numbers depends on how many products you plan on manufacturing. You can quite easily calculate the probability that any two serial numbers will be the same (e.g. the probability two random 32-bit serial numbers are the same is \(\frac{1}{2^{32}}\)). 1 minus this gives you the probability that the two serial numbers were not the same. You can then consider doing this for all possible combinations of serial numbers. If, for every single comparison you do, the numbers do not collide, then you know that all of the serial numbers were unique. Every other branch of the "probability tree" would have at least one collision (or maybe more, that's why it easier to work out the single branch in which they are all unique rather than all the branches in which at least 1 is not).

## How Many Combinations?

So we need to know how many combinations of serial numbers there are. Because the order does not matter (comparing serial number 1 with serial number 2 is the same as comparing serial number 2 with serial number 1), we are dealing with true mathematical combinations and not permutations (read up on this if you need to learn about these concepts). The equation that tells you the number of combinations given the total number of items and the number of items in each sample is[^calculator-soup-combinations-calculator]:

$$\begin{align*}
C(n,\ r) = \frac{n!}{r!(n-r)!}
\end{align*}$$

Where \(n\) is the total number of items, and \(r\) is the number of items in each sample.

\(r\) is always \(2\) in this case. \(n\) is the total number of serial numbers you plan on generating. So if we were planning of making 1000 products, the number of combinations of serial numbers to compare would be:

$$\begin{align*}
C(1000,\ 2) &= \frac{1000!}{2!(1000-2)!} \\
                  &= \frac{1000 \times 999}{2} \\
                  &= 499500 \\
\end{align*}$$

{{% aside type="tip" %}}

You might be wondering how \(\dfrac{1000!}{2!(1000-2)!}\) simplifies to \(\dfrac{1000 \times 999}{2!}\). Most calculators will not be able to handle \(1000!\)! Luckily, there is a handy simplification which makes the equation more managable:

$$\begin{align*}
C(1000,\ 2) &= \frac{1000!}{2!(1000-2)!} \\
            &= \frac{1000!}{2! \times 998!} \\
            &= \frac{1000 \times 999 \times 998!}{2 \times 998!} \\
\end{align*}$$

The \(998!\) terms cancel out, leaving you with:

$$\begin{align*}
\frac{1000 \times 999}{2}
\end{align*}$$

This means you can simplify the combination equation when \(r = 2\) to the following:

$$\begin{align*}
C(n,\ 2) = \frac{n\times (n-1)}{2}
\end{align*}$$

{{% /aside %}}

## Probability of a Collision

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

{{% aside type="tip" %}}

We are going to have to go to a large number of decimal places to make sure we don't loose precision! When doing these calculators make sure you use suitably sized floats.

{{% /aside %}}

## Probability of No Collisions For All Checks

So we know the probability of a single check containing two unique numbers. You then multiply this probability by the number of checks you need to do (e.g. 499500 times with 1,000 serial numbers) to get the probability that all serial numbers are unique. i.e.:

$$\begin{align*}
P(\text{all are unique}) &= (P(\text{any two are unique}))^{499500} \\
                         &= 0.999999999767169356^{499500} \\
                         &= 0.999883707855937023 \\
\end{align*}$$

Now we just subtract this from 1 to get the probability that at least one serial number is the same as another:

$$\begin{align*}
P(\text{collision}) &= 1 - P(\text{all are unique}) \\
                    &= 1 - 0.999883707855937023 \\
                    &= 0.00011629214406297607843 \\
\end{align*}$$

This is a 1 in 8600 chance of a collision.

Putting it all together in a generic/symbolic form:

$$
P(\text{collision}) = 1 - \left[(1-P(\text{any two are identical}))^{\dfrac{n \times (n-1)}{2}}\right]
$$

Where \(n\) is the total number of serial numbers and \(P(\text{any two are identical})\) is the probability that any two serial numbers are the same. In the case of using a fixed number of bits for the serial number, this probability equation becomes:

$$
P(\text{collision}) = 1 - \left[(1-\dfrac{1}{2^{b}})^{\dfrac{n \times (n-1)}{2}}\right]
$$

Where \(b\) is the number of bits in the serial number. We can plot this:

{{% figure src="_assets/probability-of-collision-32-bit.png" width="600px" caption="The probability of a collision when generating 32-bit random serial numbers for different numbers of devices." %}}

You can see that we start running into significant issues with 32-bit random serial numbers as soon as we start manufacturing 1000's of devices. At 25,000 devices the probability of a collision is already at about 10%. We don't run into the same issue with 64-bit numbers. Below is the probability for 64-bit numbers, up to 1e12 device! (it's still a probability of almost 0 past this, it's just not worth plotting any further):

{{% figure src="_assets/probability-of-collision-64-bit.png" width="600px" caption="The probability of a collision when generating 64-bit random serial numbers for different numbers of devices." %}}


{{% aside type="example" %}}

**100,000 Devices**

If you were planning on manufacturing 100,000 devices, and you were using a 32-bit randomly generated serial number, what would the probability of a collision be?

Let's start with the general equation above. Our \(n\) is 100,000 and our \(b\) is 32:

$$\begin{align*}
P(\text{collision}) &= 1 - \left[(1-\dfrac{1}{2^{b}})^{\dfrac{n \times (n-1)}{2}}\right] \\
                    &= 1 - \left[(1-\dfrac{1}{2^{32}})^{\dfrac{100000 \times (100000-1)}{2}}\right] \\
                    &= 1 - \left[(1-\dfrac{1}{4294967296})^{4999950000}\right] \\
                    &= 1 - \left[(0.99999999976716935635)^{4999950000}\right] \\
                    &= 1 - 0.31219053861894671205 \\
                    &= 0.68780946138105328795 \\
                    &= 0.69 \\
\end{align*}$$

So there is a 69% chance of a collision if generating 32-bit random serial numbers for 100,000 devices! Not good :-O. What if we used a 64-bit serial number instead?

$$\begin{align*}
P(\text{collision}) &= 1 - \left[(1-\dfrac{1}{2^{b}})^{\dfrac{n \times (n-1)}{2}}\right] \\
                    &= 1 - \left[(1-\dfrac{1}{2^{64}})^{\dfrac{100000 \times (100000-1)}{2}}\right] \\
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
P(\text{collision}) &= 1 - \left[(1-\frac{1}{365})^{\dfrac{23 \times (23-1)}{2}}\right]
                    &= 1 - \left[(\frac{364}{365})^{253}\right]
                    &= 1 - 0.499
                    &= 0.501
\end{align*}$$

Which gives us a 50% chance of collision, as expected.

{{% /aside %}}


## References

[^calculator-soup-combinations-calculator]: Calculator Soup. _Combinations Calculator (nCr)_. Retrieved 2024-06-02, from https://www.calculatorsoup.com/calculators/discretemathematics/combinations.php.
[^wikipedia-german-tank-problem]: Wikipedia (2024, Jan 4). _German tank problem_. Retrieved 2024-06-03, from https://en.wikipedia.org/wiki/German_tank_problem.
