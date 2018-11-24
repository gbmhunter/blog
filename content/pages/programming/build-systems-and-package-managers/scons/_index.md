---
author: gbmhunter
date: 2018-03-14 21:02:30+00:00
draft: false
title: scons
type: page
url: /programming/build-systems-and-package-managers/scons
---

# Overview




SCons is a build system.



{{< figure src="/images/2018/03/scons-build-system-logo.png" width="310px" caption="The logo for the SCons build system." caption-position="bottom" >}}



# Installation




**Ubuntu 16.04**




You can install scons with:



    
    $ sudo apt install scons




**However...**




The default scons provided by 16.04 (xenial) is very out-of-date (v2.4.1). You can get the latest scons (v3.0.1) as of Mar 2018) by first adding the following line to /etc/apt/sources.list:



    
    deb http://cz.archive.ubuntu.com/ubuntu bionic main universe




And then install scons with the command:



    
    $ sudo apt install scons




# Basic Hello, World Example




**Prerequisites**





	  * scons is installed on your system



_NOTE: The console commands assume a UNIX-style terminal, although the example should be easily doable on any OS supported by scons._




**Steps**





	  1. Create a new folder called "HelloProject". All following files in this example will be created in this folder.
	  2. Create a file called main.cpp with the following content:  


    
    #include <iostream>
    
    int main() {
    	std::cout << "Hello, world." << std::endl;
    	return 0;
    }



	  3. Create a file called sconstruct (no file extension) with the following content:  


    
    env = Environment()
    hello = Program(["hello.cpp"])



	  4. From the console, run scons in the current folder:  


    
    $ scons



	  5. This should start the build process and produce an executable called hello. Run the executable with the following command:  


    
    $ ./hello
    "Hello, world."
    



	  6. Finished!



# Importing And Exporting




scons variables may be shared between sconscript files through _importing_, _exporting _and _returning_.




Before you can import a variable, it must be exported. You can do this by calling Export() and providing it with a space-separated string of all the variables you wish to export:



    
    Export('env installDir')




You can then import this from a different Sconscript file:



    
    Import('env installDir')




You can return a single object from a Sconscript with the Return() function:



    
    Return('myLib')




The can be captured in the calling Sconscript file with:



    
    myLib = Sconscript('src/mySubSconscript')







# Building




By default, scons does not perform an out-of-source build. You can perform an out-of-source build by including the following line in your root-level sconstruct file:



    
    SConscript("src/MyApp.scons", variant_dir="build", duplicate=0)




where src/MyApp.scons points to a child scons file.
