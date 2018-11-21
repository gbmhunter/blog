---
author: gbmhunter
date: 2017-01-20 16:25:21+00:00
draft: false
title: ln (link)
type: page
url: /programming/operating-systems/linux/programs/ln-link
---

# Overview




There are two types of links in Linux:




**symbolic/soft links**: I believe their official name is a symbolic link, but they are also known as soft links. Symbolic links can span file systems (hardlinks cannot).




**hard links**: Refer to a specific location. A hard link must be created to a file or directory that already exists. A hard link is commonly used in software build processes instead of copying to speed things up (as long as the files are not written too!). Modifying or moving the original file will not upset a hardlink.




# How To Create A Symbolic Link




For example, we will create a new "imaginary" file called ~/new_link.txt, which actually points to ~/a_folder/file_that_already_exists.txt.



    
    ln -s ~/a_folder/file_that_already_exists.txt ~/new_link.txt




You can inspect symbolic links by running ls -l. If any of the files are a symbolic link, it will show the path that they link to.




# How To Create A Hard Link




For example, we will create a new "imaginary" file called ~/new_link.txt, which actually points to ~/a_folder/file_that_already_exists.txt.



    
    ln ~/a_folder/file_that_already_exists.txt ~/new_link.txt




This could be considered a bad first example, since it has quite similar behaviour to the soft link example above. Note that a hard link is the default link that ln will produce when given no options. It is not recommended to create a hard link to a directory (although it can be done on some POSIX systems).



