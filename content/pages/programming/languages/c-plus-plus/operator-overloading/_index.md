---
author: gbmhunter
date: 2014-08-13 20:18:21+00:00
draft: false
title: Operator Overloading
type: page
url: /programming/languages/c-plus-plus/operator-overloading
---

# Overview

C++ allows you to perform operator overloading. This is when you specify the exact behaviour of a operator when used on or between specific data types. For example, you may create a string object class String, and overload the addition (+) operator so that when used on two string types like so str1 + str2, it concatenates the strings together to produce a new string.

Operator overloading allows you to express statements in a more compact and readable form. Continuing with the above example, if operator overloading was not available, we would have to create a function called String::Append(String & string2) and to perform the same action as above we would have to write str1.Append(str), which is slightly more convoluted.

# What Operators Can I Overload?

C++ allows you to overload most operators. In fact, because you can overload so many, it's easier just to list the ones you can't.

Operators you CAN'T overload:  * . (member selection operator, note you can still override ->)  * .* (member selection with pointer to member operator)  * ?: (tenary conditional operator)  * sizeof() (object size operator)  * typeid() (object type info operator)  * :: (scope resolution operator)

# Suitability For Embedded Systems

In my opinion, operator overloading is a perfectly O.K. technique to use on low-power microcontrollers. As long as you overload operators so that they make intuitive sense, and you are aware of the actual function calls taking place, I don't see any reason why you should not embrace this powerful feature in an embedded context.

My [String-Cpp library](https://github.com/gbmhunter/String-Cpp) (which is designed for use on low-power microcontrollers) makes use of operator overloading so that you can add and compare strings with one another.
