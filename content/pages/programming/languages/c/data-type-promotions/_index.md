---
author: gbmhunter
date: 2014-01-23 09:16:38+00:00
draft: false
title: Data Type Promotions
type: page
url: /programming/languages/c/data-type-promotions
---


     
    if (-1 < (unsigned char)1)
    	printf("less than");
    else        
    	printf("NOT less than"); 
    
    // Prints "less than"
    
    if (-1 < (unsigned int)1)
    	printf("less than");
    else        
    	printf("NOT less than"); 
    
    // Prints "not less than"!!!
    
    
