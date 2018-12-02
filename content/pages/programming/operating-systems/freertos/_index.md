---
author: gbmhunter
date: 2012-10-29 01:56:38+00:00
draft: false
title: FreeRTOS
type: page
url: /programming/operating-systems/freertos
---

# Overview

FreeRTOS is a popular free real-time operating system that is suited for embedded systems. There are hundreds of pre-setup ports for specific processor architecture/compiler combinations. I won't go into detail explaining the FreeRTOS API, this is extremely well documented on the [FreeRTOS website](http://www.freertos.org/). Instead, below is a quick reference guide.

# Getting The Code

You can either download it from: [http://sourceforge.net/projects/freertos/files/](http://sourceforge.net/projects/freertos/files/) or checkout the official SVN repository (I recommend this way) using the following command:

```sh
# Checks out the main branch
svn co https://freertos.svn.sourceforge.net/svnroot/freertos/trunk freertos

# Or if you want to get all branches, omit the /trunk part and use
svn co https://freertos.svn.sourceforge.net/svnroot/freertos freertos
```

# Tips For Minimising The Amount Of RAM Used By FreeRTOS

* Reduce the number of available task priorities (set in FreeRTOSConfig.h, these are configMAX_PRIORITIES and configMAX_CO_ROUTINE_PRIORITIES )
* Reduce the stack size for each of the tasks/co-routines.
* Use co-routines ONLY (no tasks). There are disadvantages to doing this though...

# Memory Guide

Extra consideration of memory is needed when using FreeRTOS! You have to know and understand heaps and stacks.

Queues are stored on the heap, as are semaphores. You can view the remaining heap size by calling the function xPortGetFreeHeapSize(); .

# Fat File System

As of v7.5.0, FreeRTOS has supported the Fat SL embedded file system library, provided by HCC Embedded. It supports a standard range of file operations (e.g. f_open() , f_write()).

# Error Checking

FreeRTOS provides the macro configASSERT(). An assertion is triggered if the parameter passed to configASSERT() is zero. It behaviour in a similar manner to the standard-C assert() macro. It is up to the user to provide an actual implementation on configASSERT(), it is not defined by FreeRTOS, just used through-out their code. An example definition is shown below (taken from the FreeRTOS website):

```c    
/* Define configASSERT() to call vAssertCalled() if the assertion fails.  The assertion has failed if the value of the parameter passed into configASSERT() equals zero. */
#define configASSERT( ( x ) )     if( ( x ) == 0 ) vAssertCalled( __FILE__, __LINE__ )
```

It is recommended that you make use of it in your code for once-only and continuous error checking!

# Long File Name Warning

Some of the files in the demo folder are nested deeply within others, giving large file paths. When the FreeRTOS directory is itself put in a resonably large directory, this can easily result in file paths over 260 characters, which on a Windows system, will cause issues (such as the SCM Mercurial not working correctly, or errors when trying to copy/cut/paste directories). Long file names include:

```
FreeRTOS\Demo\ARM7_AT91SAM7X256_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.core.prj-RTOSDemo.prefs
FreeRTOS\Demo\ARM7_AT91SAM7X256_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.managedbuilder.core.prefs
FreeRTOS\Demo\ARM7_LPC2368_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\33\5b\e7\4\history.index
FreeRTOS\Demo\ColdFire_MCF52233_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.core.prj-RTOSDemo.prefs
FreeRTOS\Demo\ColdFire_MCF52233_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.managedbuilder.core.prefs
FreeRTOS\Demo\ColdFire_MCF52233_Eclipse\.metadata\.plugins\org.eclipse.ltk.core.refactoring\.refactorings\.workspace\2008\11\47\refactorings.history
FreeRTOS\Demo\ColdFire_MCF52233_Eclipse\.metadata\.plugins\org.eclipse.ltk.core.refactoring\.refactorings\.workspace\2008\11\47\refactorings.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\18\5b\5e\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\18\5b\e7\74\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\18\5b\e7\a1\history.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\18\5b\e7\a1\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\18\a8\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\18\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\b3\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\c7\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\29\7f\99\81\ce\1e\history.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\29\7f\99\81\ce\1e\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\29\7f\99\81\ce\1e
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\29\7f\e4\1a\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\7f\history.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\7f\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\f7\a8\properties.index
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.core.prj-RTOSDemo.prefs
FreeRTOS\Demo\ColdFire_MCF5282_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.managedbuilder.core.prefs
FreeRTOS\Demo\CORTEX_LM3Sxxxx_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\2f\4b\45\properties.index
FreeRTOS\Demo\CORTEX_LM3Sxxxx_Eclipse\.metadata\.plugins\org.eclipse.core.resources\.projects\RTOSDemo\.indexes\33\5b\e7\7a\properties.index
FreeRTOS\Demo\CORTEX_LM3Sxxxx_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.managedbuilder.core.prefs
FreeRTOS\Demo\CORTEX_LM3Sxxxx_Eclipse\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.epp.usagedata.recording.prefs
FreeRTOS\Demo\CORTEX_SmartFusion2_M2S050_SoftConsole\RTOSDemo_Hardware_Platform\CMSIS\startup_gcc\debug-in-microsemi-smartfusion2-envm.ld
FreeRTOS\Demo\CORTEX_SmartFusion2_M2S050_SoftConsole\RTOSDemo_Hardware_Platform\CMSIS\startup_gcc\debug-in-microsemi-smartfusion2-esram.ld
FreeRTOS\Demo\CORTEX_SmartFusion2_M2S050_SoftConsole\RTOSDemo_Hardware_Platform\drivers_config\sys_config\sys_config_mss_clocks_developoment_kit.h
FreeRTOS\Demo\CORTEX_SmartFusion2_M2S050_SoftConsole\RTOSDemo_Hardware_Platform\drivers_config\sys_config\sys_config_mss_clocks_starter_kit.h
FreeRTOS\Demo\MicroBlaze_Spartan-6_EthernetLite\SDKProjects\RTOSDemo\lwIP\lwIP_Apps\apps\httpserver_raw\makefsdata\makefsdata.c-source-file
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\HierarchicalDesign\HDProject\HDProject_StrTbl
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\ProjectNavigator\dpm_project_main\dpm_project_main
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\ProjectNavigator\dpm_project_main\dpm_project_main_StrTbl
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Current-Module_StrTbl
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-Data-system
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-Data-system_StrTbl
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-DataFactory-Default
FreeRTOS\Demo\PPC440_DP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-DataFactory-Default_StrTbl
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\HierarchicalDesign\HDProject\HDProject_StrTbl
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\ProjectNavigator\dpm_project_main\dpm_project_main
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\ProjectNavigator\dpm_project_main\dpm_project_main_StrTbl
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Current-Module_StrTbl
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-Data-system
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-Data-system_StrTbl
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-DataFactory-Default
FreeRTOS\Demo\PPC440_SP_FPU_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-DataFactory-Default_StrTbl
FreeRTOS\Demo\PPC440_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\ProjectNavigator\dpm_project_main\dpm_project_main
FreeRTOS\Demo\PPC440_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\ProjectNavigator\dpm_project_main\dpm_project_main_StrTbl
FreeRTOS\Demo\PPC440_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-Data-system_StrTbl
FreeRTOS\Demo\PPC440_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-DataFactory-Default
FreeRTOS\Demo\PPC440_Xilinx_Virtex5_GCC\__xps\ise\system_xdb\tmp\ise\__OBJSTORE__\xreport\Gc_RvReportViewer-Module-DataFactory-Default_StrTbl
FreeRTOS-Plus\Demo\FreeRTOS_Plus_UDP_and_CLI_LPC1830_GCC\ThirdParty\CMSISv2p10_LPC18xx_DriverLib\docs_cmsis\CMSIS END USER LICENCE AGREEMENT.pdf
FreeRTOS-Plus\Demo\FreeRTOS_Plus_UDP_and_CLI_LPC1830_GCC\ThirdParty\CMSISv2p10_LPC18xx_DriverLib\docs_nxp_driverlib\LPC1800CMSIS_ReleaseNotes.txt
FreeRTOS-Plus\Demo\FreeRTOS_Plus_UDP_and_CLI_LPC1830_GCC\ThirdParty\FreeRTOS_Plus_Trace_Recorder\Trace_Recorder_Configuration\trcConfig.h
FreeRTOS-Plus\Demo\FreeRTOS_Plus_UDP_and_CLI_LPC1830_GCC\ThirdParty\FreeRTOS_Plus_Trace_Recorder\Trace_Recorder_Configuration\trcHardwarePort.h
```