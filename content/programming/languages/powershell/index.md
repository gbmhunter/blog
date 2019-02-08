---
author: gbmhunter
date: 2014-09-29
draft: false
title: "PowerShell"
type: page
---

## Single Quotes Vs. Double Quotes

You can define strings in PowerShell with either single quotes or double quotes. What is the difference? The difference is that PowerShell does not perform interpolation with single quotes, but does perform interpolation with double quotes.

What is interpolation? This is where the PowerShell interpreter will look for valid string variable names inside the double quotes, and if found, will substitute the variable name with the string variables contents.

```ps    
$str1 = ", world."

$singleQuotesStr = 'Hello $str1'
$doubleQuoteStr = "Hello $str1"

Write-Host $singleQuotesStr # Prints "Hello $str1", no interpolation occured
Write-Host $doubleQuotesStr # Prints "Hello, world.", interpolation occured
```