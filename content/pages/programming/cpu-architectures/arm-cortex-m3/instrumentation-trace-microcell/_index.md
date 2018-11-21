---
author: gbmhunter
date: 2013-07-30 23:20:36+00:00
draft: false
title: Instrumentation Trace Microcell
type: page
url: /programming/cpu-architectures/arm-cortex-m3/instrumentation-trace-microcell
---

The ITM can be used to redirect printf() function calls. This allows a printf() style debugging capabilities on an embedded platform, which typically doesn't have a standard terminal window for output.

The ITM is part of the Coresight debugging and trace system, shown in the right of the below diagram.

[singlepic id=1168 w=600 h=600 float=center template=caption]

printf()  ultimately relies on the function fputc() to do the low-level character outputting. So this is the function we are going to replace. The following code shows the re-definition of fputc().

    
    int fputc(int ch, FILE *f) {
       return ITM_SendChar(ch);
    }


Note that the passed in file argument f is ignored altogether.

ITM_SendChar() is a Cortex-M3 function provided by ARM and is defined in core_cm3.h. The declaration of it is shown below (for reference purposes).

    
    static __INLINE uint32_t ITM_SendChar (uint32_t ch);



