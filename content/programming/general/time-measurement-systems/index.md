---
author: gbmhunter
date: 2014-09-24 02:18:42+00:00
draft: false
title: Time Measurement Systems
type: page
---

## UTC

UTC (coordinated universal time) is a standardised measure of time that most people use in their day-to-day lives. Time zones around the world are expressed as an offset relative to UTC.

UTC is not very programmer friendly. To calculate the interval between two UTC dates, you need to know about what years the range encompass and leap year calculations, and what months the range encompasses, as well as knowing how many days are in each respective month. For this reason, a more programmer-friendly time system was created, Unix time.

## Unix Time

Unix time (aka Epoch time or POSIX time) is the number of seconds that have elapsed since the 1st January, 1970 at midnight (00:00:00) in UTC, excluding leap seconds. The reference time in 1970 is called the Epoch. It is normally stored as a signed 32-bit  or signed 64-bit number, hence able to represent both dates before and after the Epoch.

By definition, Unix time increments by exactly 86400 counts each day. Obviously the amount it increments each month and year is dependent on the number of days in the month and the number of days in the year (don't forget about leap years!).

Unix time is computer/software/programmer friendly. The whole idea was to do away with human constructs of minutes, hours and days and represent time as a linearly increasing number, which makes programming easier!

Because Unix time does not "count" leap seconds, it is not a linear representation of time. On a day where a leap second occurs, there is usually a discontinuity at midnight in where the Unix time leaps back for forward a second. However, for the same reason, Unix time is deterministic, and you can calculate the Unix time for any point in time in the future, relative to UTC time.

Embedded.ninjas embedded code module, [MChrono](https://github.com/gbmhunter/MChrono), can convert from UTC time to Unix time.

## Year 2038 Bug

In the early days, Unix time was stored as a signed 32-bit number. A 32-bit signed integer storing Unix time will overflow at 03:14:08 UTC on 19 January 2038. Any devices still using 32-bit Unix time at this point will suddenly believe the time is 13 December 1901 (the maximum negative time 32-bit Unix time can represent).

## Leap Years

Most countries follow the Gregorian calender, which has the following **definition** for leap years:

* Every year that's divisible by four is a leap year...
* Except for years that are divisible by 100, but not divisible by 400

This means that _2096_ is a leap year, but _2100_ is not. This also means that _2396_ is a leap year, and so is _2400_. When saying "**divisible by something**", we usually mean **cleanly divisible** by that number, as in, there is **no remainder**. 

These rules are designed to keep calender time pretty-much in sync with the solar year. However, this is not perfect, and hence why we need one final adjustment, the **leap second** (more on this below). The **Julian calender system** only has the first of these two rules (so a leap year occurs every 4 years without exception), and is not as "well-synced" to the solar year.

## What Are Leap Seconds?

Leap seconds are rare, non-periodic seconds that are inserted into UTC and other calender-based time systems to keep them synchronised with the physical earth/sun system (which is represented by mean solar time).

## Trivial Seconds

Trivial seconds are the number of seconds which has elapsed since a give time, excluding leap seconds. This term is used by the IEEE P1003.1 standard.

## Leap Smears

Rather than handle leap seconds the usual way by skipping forwards/backwards at midnight, Google performs what they call a "leap smear". When a leap second is due, they **slowly make the 1-second adjustment over the course of an entire day** rather than all at once at midnight. They did this to allow all of their services to work correctly, as many expect time to be **ever increasing **value. More on this can be read at [http://googleblog.blogspot.co.nz/2011/09/time-technology-and-leaping-seconds.html](http://googleblog.blogspot.co.nz/2011/09/time-technology-and-leaping-seconds.html).

## Other Time Systems

## Iridium

The Iridium satellite network has it's own time system which is based of UTC time. It is called the Iridium L-Band frame count (also referred to as Iridium network time or Iridium time). It is incremented by one every 90-millisecond L-band frame and broadcast from the Iridium satellites to earth terminals every six L-band frames (once every 540 milliseconds). 

Currently, it is based of the Iridium epoch which is March 8, 2007, 03:50:21.00 GMT, known as “ERA1”. On March 3rd, 2015 at 18:00:00 UTC they plan to change the L-Band downlink broadcast from ERA1 to ERA2. The UTC date and time epoch of the new Iridium Time era ("ERA2") will be May 11, 2014, at 14:23:55.
