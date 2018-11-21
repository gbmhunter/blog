---
author: gbmhunter
date: 2013-04-29 08:19:56+00:00
draft: false
title: PHP
type: page
url: /programming/website-design/php
---

# Comments


There are two types of comments in PHP, single line comments, and multi-line comments.

Single-line comments are started with // and continue until a new line.

    
    $variable = 2; // This is a single-line comment


Multi-line comments start with /* and continue until */.

    
    $var1 = 4.5;
    /* This is
    a multi-line
    comment */
    $var2 = 6.7;


This comment style is the same as what's used in the [C](http://blog.mbedded.ninja/programming/languages/c) and [C++](http://blog.mbedded.ninja/programming/languages/c-plus-plus) programming languages.


# Debugging


Printing to the current HTML page is an easy way of debugging, as long as you don't care that debug data momentarily appears on your website (e.g. your running on a test server, or just that you don't care). Be careful at leaking sensitive information to the public via this method.


## echo


echo is a simple command which outputs text back to the HTML page, from within a PHP code block (something surrounded by <?php and ?>.


## get_defined_vars()


You can use the function get_defined_vars() to return an array of all defined variables in the scope of where this function is called. Note that this returns all variables, no matter whether they were defined by the system or the user.


## print_r()


print_r() converts almost any object into a human-readable text output.


## serialize()


You can convert almost any object into a string using the function serialize(). This creates a text-representation of the object which can be converted back into an exact replica of the object at a later date.


# Opening/Closing PHP In Html


A PHP code block in the middle of an HTML page is opened with <?php and closed with ?>.

    
    /* To open */
    <?php
    
       /* php code goes here */
    
    /* To close */
    ?>




# Getting The Current Path


Commonly, you will find yourself wanting to find the current path of the php script you are running. The universal way to do this, which **even works for included files**, is to use:

    
    realpath(__FILE__));


If you want to just get the current directory, you can use the dirname() function to parse the __FILE__ variable as follows:

    
    $dir = realpath(dirname(__FILE__));


If you want to use this to insert into HTML to load things such as Javascript files that were located relative to the script, you must remove the first parts of the __FILE__ all the way up the the string public_html. You can use the preg() function to do this as follows (note this function also replaces and \ with /, which is a good thing to do to make sure paths are in NIX notation.

    
    // Replace any \ with / (Linux notation)
    $cur_dir = str_replace('\\','/', realpath(dirname(__FILE__)));
    
    // Remove all text up to and including the string public_html
    $cur_dir = preg_replace('/(.*?)\/public_html/', '', $cur_file);
    
    // Insert HTML to call a Javascript file which is relative to the php script (example)
    echo '<script type="text/javascript" src="' . $cur_file . '\file-relative-to-php-script.js"></script>';


That code also included an example at the bottom to insert HTML to call a Javascript file that is located relatively to the PHP script.

To get the current file URL, which won't work for included files (it will return the URL of the file it was included from), use:

    
    <?php echo $_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']; ?>
    
    // This will return "mysite.com/php-file.php"


To get the current URL, including any passed in parameters (called the URI), use:

    
    <?php echo $_SERVER['HTTP_HOST'].$_SERVER["REQUEST_URI"]; ?>
    
    // This will return "mysite.com/php-file.php?var1=abc&var2=def"



