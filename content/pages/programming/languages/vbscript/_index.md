---
author: gbmhunter
date: 2013-08-19 21:33:08+00:00
draft: false
title: VBScript
type: page
url: /programming/languages/vbscript
---

# Overview




Visual basic is one of the scripting languages you can use to write [code for interfacing with the PCB design software Altium,](http://blog.mbedded.ninja/electronics/general/altium/altium-scripting-and-using-the-api) through it's provided API.




# The Basics




VBScript is not case-sensitive. That is, the variable myInt is the same as the variable myint. This said, I prefer to capitalise the start of any system word in VBScript (e.g. And, For, If, End If, Dim).




There is no end of command/end of line delimiter. This is probably one of the first things you will notice when coming from [another language such as C](http://blog.mbedded.ninja/programming/languages/c).




# Variables




Variables are defined with the keyword Dim. However, by default, you do not need to do this before using them (you can create them on the fly).




## Forcing You To Declare Variables




By default, VBScript does not force you to declare variables. This can generate hard-to-find bugs when you accidentally type a variable name in incorrectly and end up creating a new variable rather than using an old one. To prevent this from occurring, add the following line of code to the top of every script file:



    
    Option Explicit




This forces you to declare every variable with Dim before using it. I make sure to add this to the top of every file!




# Comments




Single-line comments are started with the ' character, and continue until a new line occurs.




Dim myVar ' This is a single-line comment




# Strings




Strings are delimited by double-quotation marks (").



    
    "This is a string in VBScript"




You can add non-printable characters the using system constants.



    
    VbCr ' Carriage return
    VbLf ' Line feed




You can format doubles into strings with the function FormatNumber().




# Regex




Regex is particularly easy in VBScript, as it comes with a built-in regex engine (as of VBScript v5.0). Regex is performed through iteration with the RegExp object. The regex syntax in VBScript is very similar to that used for JScript.




The RegExp object provides 3 properties and 3 methods. The properties are:


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >**Property**
</td>

<td >**Description**
</td>
</tr>
<tr >

<td >Pattern
</td>

<td >A string containing the regex pattern to match input with. This is a core part of the object! This must be set before any RegExp methods are called.
</td>
</tr>
<tr >

<td >IgnoreCase
</td>

<td >A boolean that when True ignores the case (case insensitive) when matching the pattern.
</td>
</tr>
<tr >

<td >Global
</td>

<td >A boolean that if True, will match only the first pattern it finds. If False, the regex engine will find all patterns. Default is False.
</td>
</tr>
</tbody>
</table>


The methods are:


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >**Method**
</td>

<td >**Description**
</td>
</tr>
<tr >

<td >Test(searchString)
</td>

<td >Returns True if the regex pattern set by Pattern can be matched in searchString, otherwise False.
</td>
</tr>
<tr >

<td >Replace(searchString, replaceString)
</td>

<td >Replaces any match of Pattern in searchString by replaceString, and returns the new string. If no matches were found, the original string (searchString) is returned.
</td>
</tr>
<tr >

<td >Execute(searchString)
</td>

<td >Returns a Matches collection object, containing a Match object for each successful match of Pattern in searchString. It doesn't modify searchString.
</td>
</tr>
</tbody>
</table>


## Match Object




The Match object is returned when the Execute method of the RegExp object is called. It has three properties:


<table style="width: 600px;" border="0" >
<tbody >
<tr >

<td >Properties
</td>

<td >Description
</td>
</tr>
<tr >

<td >FirstIndex
</td>

<td >The position within the original string where the match occured. This is zero-based (the first position is 0).
</td>
</tr>
<tr >

<td >Length
</td>

<td >The total length of the matched string.
</td>
</tr>
<tr >

<td >Value
</td>

<td >A string of the matched text. This is the default property when accessing the Match object.
</td>
</tr>
</tbody>
</table>


## Test() Example




The following example uses regex to search for a component designator.



    
    ' Setup a test string
    Dim componentDesignator
    componentDesignator = "C23"
    
    ' Now do the regex
    Set regex = New RegExp
    regex.IgnoreCase = True
    regex.Global = True
    ' Look for designator that starts with C and is followed by one or more numbers
    regex.Pattern = "^C[0-9][0-9]*"
    
    ' Check for pattern match
    If regex.Test(componentDesignator) Then
       StdOut("Capacitor found!")
    End If




# Integers




A unary operator for easy increment/decrement is not supported (like ++ and -- in C), so the best way is to just use:



    
    myInt = myInt + 1




# Function Pointers




Function pointers, in the C style of using them, are not available in VBScript. However, you can use the GetRef() function to get similar functionality.




You pass into GetRef(funcNameString) a string of the name of the function you want to get a reference to (i.e. pointer).



    
    Function IAmAFunction ()
       ShowMessage("Test function!")
    End Function
    
    ' Create a function pointer
    myFunc = GetRef(“IAmAFunction″)
    ' This line calls the function pointed to by myFunc
    Call myFunc()




GetRef() is one of the functions you can't use when doing [Altium Scripting](http://blog.mbedded.ninja/electronics/general/altium/altium-scripting-and-using-the-api).




# Sets (The MkSet()/InSet() Functions)




Sets of objects are supported in VBScript through the MkSet() and InSet() functions. It creates a set of the given input objects. You can have a maximum of 32 objects in a set. You can also create an empty set, by providing no input variables.



    
    Dim var1, var2, set1, set2
    
    ' Creating a populated set
    set1 = MkSet(var1, var2)
    
    ' Creating an empty set
    set2 = MkSet()




Sets are a common design object used in a number of other scripting languages such as DelphiScript, JScript, C++Script and C#Script.




# Trigonometry




VBScript has no built in value for Pi. What?!? The best way to do this is to use the following expression:



    
    ' Get a value for Pi, which is a precise as the computer will allow
    ' Better than a hand typed constant!
    Pi = 4 * Atn(1)




This will give Pi to the maximum precision available on the platform you a running on. You can't ask for better!




Thankfully, VBScript has built in support for the cos() and sin() family of functions. They take an input angle **in radians**. To convert between radians and degrees you can use the following expressions:



    
    ' Let's first get a value for Pi
    Pi = 4 * Atn(1)
    
    ' Converting from radians to degrees
    ValueInDeg = ValueInRad*180/Pi
    
    ' Converting from degrees to radians
    ValueInRad = ValueInDeg*Pi/180




# 
