---
author: gbmhunter
date: 2017-01-30 10:00:45+00:00
draft: false
title: Gradle
type: page
url: /programming/build-systems-and-package-managers/gradle
---

# Overview




Gradle is an open-source build automation system. It is primarily targeted towards languages running on the JVM (Java Virtual Machine).


[caption id="attachment_14010" align="aligncenter" width="271"][![](http://blog.mbedded.ninja/wp-content/uploads/2017/01/gradlephant-gradle-logo-v2.png)
](http://blog.mbedded.ninja/wp-content/uploads/2017/01/gradlephant-gradle-logo-v2.png) The Gradle logo.[/caption]


One of it's big advantages over Maven is it's use of a domain-specific language (DSL) rather than XML to specify the project configuration and build steps.




# The Java Plugin




The Java plugin is probably one of the most commonly used plugins. To use the plugin, add the following to your build script:



    
    apply plugin: 'java'




The Java plugin assumes the same traditional layout of files that Maven did:


<table id="javalayout" >

<tr style="height: 28px;" >

<td style="height: 28px;" >**Directory**
</td>

<td style="height: 28px;" >**Meaning**
</td>
</tr>

<tbody >
<tr style="height: 28px;" >

<td style="height: 28px;" >`src/main/java`
</td>

<td style="height: 28px;" >Production Java source
</td>
</tr>
<tr style="height: 28px;" >

<td style="height: 28px;" >`src/main/resources`
</td>

<td style="height: 28px;" >Production resources
</td>
</tr>
<tr style="height: 28px;" >

<td style="height: 28px;" >`src/test/java`
</td>

<td style="height: 28px;" >Test Java source
</td>
</tr>
<tr style="height: 28px;" >

<td style="height: 28px;" >`src/test/resources`
</td>

<td style="height: 28px;" >Test resources
</td>
</tr>
<tr style="height: 28px;" >

<td style="height: 28px;" >`src/_`sourceSet`_/java`
</td>

<td style="height: 28px;" >Java source for the given source set
</td>
</tr>
<tr style="height: 28.9844px;" >

<td style="height: 28.9844px;" >`src/_`sourceSet`_/resources`
</td>

<td style="height: 28.9844px;" >Resources for the given source set
</td>
</tr>
</tbody>
</table>


These default file locations can be changed if needed (however, it is recommended to use the default configuration unless you have good reason not to).



