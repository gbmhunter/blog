---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2014-01-05
draft: false
lastmod: 2014-01-05
title: "sed"
type: page
---

## Overview

`sed` is a command that parses and transforms text, line-by-line. It is a form of stream-editing.

seds first parameter is an input script which describes how to transform the text. It can either be passed on the command-line (`-e` option, and is the default), or through a file (`-f` option).

seds second parameter is the input stream to operate on. By default, sed prints output to `stdout`. This can be redirected with the `>>` operator, to say, a file, as shown in this example:

```sh    
$ sed 'my-pattern' inputFile.txt >> outputFile.txt
```

[Bruce Barnett's Cheat Sheet for SED](http://www.grymoire.com/Unix/SedChart.pdf).

The `-exec` option is used so that you can execute a shell command on every output.

## Comments

sed allows you to put comments inside of script. Comments begin with the `#` character.

## Substitution

One of the most popular operations is the substitution operation, `s`. It accepts a regular expression for the search pattern and standard text for replacement. To replace some (but probably not all, see the part below on seds line by line processing) occurrences of the word old with the word new in `inputFile.txt` and save it to `outputFile.txt`, you would write:

```sh    
$ sed s/old/new <inputFile.txt >outputFile.txt
```

Now, the part where I mentioned that sed will replace some but probably not all occurrences...well `sed` operates line-by-line on text, and it's default behaviour once a match has been found is to print the result, and start with the next line of text. This means any further occurrences of the word old on the same line will not get replace by the word new.

To get around this, you can use the global replacement character (`g`).

```sh    
$ sed 's/old/new/g' <inputFile.txt >outputFile.txt
```

## The Delimiter

The forward slash is conventional delimiter, used to separate variables in a sed search pattern. However, the forward slash can get confusing when trying to manipulate path names, as these have forward slashes also, which means you need to escape them with a prefixed backslash. This can quickly get messy (the picket fence look):

```sh    
$ sed 's/\/usr\/local\/bin/\/common\/bin/' <inputFile.txt >outputFile.txt
```

## Deleting Lines

You can delete lines from files using the pattern `3d`, which will delete the 3rd line from the file, or `3,5d` which delete lines 3, 4 and 5. So the full command for deleting the 3rd line would be:

```sh    
$ sed '3d' filename.txt
```

To remove the last name of a file:

```sh    
$ sed '$d' filename.txt
```

`d` is the delete operator. `D` is another delete operator, although it's behaviour is slightly different (it doesn't print what's in the current pattern space).

## Pattern Found Variable (&)

When using the substitution command, the & character represents the found pattern. It can be used in the replacement string to insert the pattern found into the replacement text. This is useful for say, when you want to modify some text instead of replacing it completely.

A simple example is if you wanted to double a certain string of text, anywhere it was found.

```sh    
% echo "1234 11223344" | sed 's/22*/&&/'
12234 1122223344
```

This command finds any 2, or series of 2's (that is what the regex 22* does), and doubles the found string (this is what the `&&` does).

## Complex Examples

These examples may combine sed with other programs such as find and xargs.

Variables in total upper-case are designed to be modified to suit your own needs.

## Find All C++ Files, Copy To New Directory, Then Replace Strings

This is useful if you want to copy a directory with C++ file inside, and then globally find/replace strings without touching the original files. This assumes C++ header files have the .hpp file extension (you can change this if needed).

```sh    
$ cp -r SOURCE_DIR MODIFIED_DIR; find MODIFIED_DIR -type f -name "*.cpp" -o -name "*.hpp" | xargs sed -i "s/STRING_TO_FIND/STRING_TO_REPLACE/g"
```  

## Change The Format Of Dates

This example looks for all occurrences of a date in the format 2014/11/03 and replaces it with the format 2014-11-03. It does not check to make sure it is a valid date (e.g. 2013/13/01 will still replaced, even though there is no 13th month).

```sh    
$ sed -e "s/\([0-9]\{4\}\)\/\([0-9]\{2\}\)\/\([0-9]\{2\}\)/\1-\2-\3/g" filename.txt
```

## External Resources

[Sed - An Introduction And Tutorial by Bruce Barnett](http://www.grymoire.com/Unix/Sed.html) is a very detailed page on sed. It is really easy to follow due to it's step-by-step approach to increased complexity.
