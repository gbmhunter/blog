---
author: gbmhunter
date: 2012-02-15 20:26:30+00:00
draft: false
title: Altium Scripting And Using The API
type: page
url: /electronics/general/altium/altium-scripting-and-using-the-api
---

# Overview

Altium supports the ability to wire and run scripts, pieces of code which can perform repetitive tasks or tasks which would otherwise take along time for a person to do and speed up the PCB design process. Altium supports [DelphiScript](http://blog.mbedded.ninja/programming/languages/delphi) (.pas), EnableBasic, [VBScript](http://blog.mbedded.ninja/programming/languages/vbscript), [JavaScript](http://blog.mbedded.ninja/programming/website-design/javascript), and TCL scripting language sets.

From my personal wonders it seems that [Delphi](http://blog.mbedded.ninja/programming/languages/delphi) and VBScript are the two most popular ([Delphi](http://blog.mbedded.ninja/programming/languages/delphi) being the one most of Altium's own examples are written in, and [VBScript](http://blog.mbedded.ninja/programming/languages/vbscript) being the one that many 3rd parties have used). My personal favourite is [VBScript](http://blog.mbedded.ninja/programming/languages/vbscript), due to it's simplicity (while not lacking any power).

# Child Pages

[sb_child_list template=2 orderby=title order=asc nest_level=1]

# Where To Download Scripts From

Lots of third-party scripts can be downloaded from the Google Code Project, found [here](http://code.google.com/p/altium-designer-addons/).

Unfortunately, the original scripts that used to be included with Altium disappeared from Altium Designer 10. I've uploaded a zip of all these scripts that can be downloaded below.

[wpfilebase tag=file id=16 /]

Also, I have a project called [AltiumScriptCentral which can be downloaded from GitHub](https://github.com/mbedded-ninja/AltiumScriptCentral). It has a collection of useful scripts for increasing productivity and validating PCB's before being sent of for manufacturing. They are all written in VBScript, and can be used as code examples to write your own.

# How To Write Your Own Scripts

Below are tips and code examples to write your own Altium scripts. I prefer [VBScript](http://blog.mbedded.ninja/programming/languages/vbscript) (which to me personally was one of the easiest to grasp coming from a C/C++/C# background, and seems to be one of the widely supported languages), however most are written in [Delphi Script](http://blog.mbedded.ninja/programming/languages/delphi).

If you want to learn more about these scripting languages, check out the [VBScript page](http://blog.mbedded.ninja/programming/languages/vbscript) or the [Delphi page](http://blog.mbedded.ninja/programming/languages/delphi).

A word of caution, when writing/testing scripts (and running downloaded scripts for the first time), **always test them on a non-valuable PCB project (or similar)** incase the script does not work as expected! Buggy/rouge scripts can cause Altium to lock-up/crash, stop the undo from working (until you restart Altium), stop you from being able to save from that point onwards (again until you restart Altium), among other things! You do not want to lose your precious work!

More than likely, you will need to use the internet to get familiar with the scripting language of choice. Remember, if using VBScript, make sure you search for VBScript tutorials, not just "Visual Basic", as you will more than likely get the wrong language and you code won't work (VBScript is different to Visual Basic).

# The Basics

## Exiting

The command

exit 

quits the current script and returns the user back to Altium.

## Message Box

You can use the function ShowMessage() to display to the user a message box with simple text. An example in Delphi:
    
    procedure HelloWorldExample();
    begin
       ShowMessage('Hello, world.');
    end;

This will display a message box with the text "Hello, world.". Note that in Delphi, strings are delimited with single quotations (' ), not double quotations (").

This is the equivalent in VBScript:
    
    Sub HelloWorldExample()
       ShowMessage("Hello, world.")
    End Sub

## The Hello World Example

In Altium, click _File->New->Script Files->VB Script Unit_. Altium should open a new, blank script file. Then type in the following code:
    
    Sub HelloWorld()
         ShowMessage("Hello, world!")
    End Sub

 Save the script file. Now run the script file by clicking _DXP->Run Script_ and then selecting the HelloWorld function (which should be listed underneath the filename of the script, see the below image). When run in Altium, this code should display a message box with the text "Hello, world!".

{{< figure src="/images/2012/02/running-hello-world-script-in-altium.png" width="893px" caption="Running the Hello, world script in Altium." caption-position="bottom" >}}

The Delphi equivalent is shown below:
    
    procedure HelloWorldExample();
    begin
         ShowMessage('Hello, world!');
    end;

Notice the **differences** between the two languages, VBScript requires only an end identifier but Delphi requires both a begin and end identifier. VBScript delimits strings with the " character, while Delphi uses the ' character.

## Looping

Looping indefinitely (e.g. while true then...) WILL lock up Altium, forcing you to forcibly close it, and loosing all un-saved work. All make sure to save your work before running scripts!

## Conversion From A String

Altium provides a set of functions for converting strings to other data types. These include functions like StrToFloat(). 

However, I recommend that you **do not** use these, but use the **built-in ones** of the scripting language of your choice. Why? Because the built-in ones have better support when used with other functions.

For example, if using VBScript, the CDbl() function converts all numbers that pass the IsNumeric() test, while the Altium-provided StrToFloat() will fail on things like "2-" (which passes IsNumeric()), and throws an exception, potentially crashing your application.

# Best Practices

Before we get too serious, here are some best practices (stipulated by no-one except myself). These apply if you are VBScript:  1. Always add the line Option Explicit to every script file. This forces you to define all variables with Dim before using them, which results in far fewer bugs!  2. Add a header to the top of every script file telling you and anyone else what it does. You consider yourself to be a good programmer, right? Here is an example (this is what I use):
    
    '
    ' @file               Main.vbs
    ' @author             Geoffrey Hunter <gbmhunter@gmail.com> (blog.mbedded.ninja)
    ' @created            2013-08-08
    ' @last-modified      2015-01-08
    ' @brief              Main entry point for AltiumScriptCentral.
    ' @details
    '                     See README.rst in repo root dir for more info.   3. Be consistent with your naming conventions. I prefer camelCase for variable names.

# Project-Related API

This sections covers code non-specific to either the schematics or PCB.

## Obtaining The Current Project

Projects are represented as IProject objects. To get the currently active project, you can use the DM_FocusedProject function on an IWorkspace object, as shown in the following Delphi example:
    
    Workspace  := GetWorkspace;
    PCBProject := Workspace.DM_FocusedProject;
    
    if (PcbProject = nil) then
    begin
       ShowMessage('Current project is not a PCB project');
       exit;
    end;

## Informing Altium That You've Changed Things

Everytime you modify something with an Altium script, you should inform Altium that you have done so, so that things like undo/redo work correctly and Altium knows that the file needs saving. This is done through the RobotManager.SendMessage() procedure, which is a member of both the SchServer and PCBServer objects.

The following code examples show the RobotManager being used for schematic operations.
    
    ' CREATING/DELETING AN OBJECT
    Call SchServer.RobotManager.SendMessage(Component.I_ObjectAddress, c_BroadCast, SCHM_PrimitiveRegistration, Param.I_ObjectAddress)
    
    ' MODIFYING AN OBJECT
    
    ' Before modifying
    Call SchServer.RobotManager.SendMessage(AnObject.I_ObjectAddress, c_BroadCast, SCHM_BeginModify, c_NoEventData)
    
    ' And after modifying
    Call SchServer.RobotManager.SendMessage(AnObject.I_ObjectAddress, c_BroadCast, SCHM_EndModify , c_NoEventData);

I have experienced issues with calling RobotManager.SendMessage() before, resulting it taking a long time (about 2s per call), displaying the infamous "Please wait a moment" dialogue box, and not seeming to have any effect. I am not sure what caused this, as this procedure is used in many scripts available on the web.

## Mathematics

It won't be long before you'll end up doing something like trigonometry in Altium scripts to work out the placement of objects onto a PCB. This kind of thing is not really dependent on Altium but more on the provided mathematics libraries that come with the scripting language you are using.

Check out the [VBScript page](http://blog.mbedded.ninja/programming/languages/vbscript) to find out how to use the sin() and cos() family of functions, how to get a value for Pi, and more! All these are applicable to Altium scripts.

## Catching Exceptions

Usually, if you do something that throws an exception, the script will halt at the line which threw the exception, and you can probe the in-scope variables to find their values and other useful debugging information.

However, in my experience, you run into problems if you close the first (main) script form, and then an exception is thrown. You get an "unhandled exception" error, and you can't debug the code at the current stop point. To prevent this, I make sure I never close the main form, but instead resize it to the smallest area possible before loading up a child form.

{{< figure src="/images/2012/02/altium-script-visual-studio-just-in-time-debugger-unhandled-exception-crash.png" width="438px" caption="What happens when an exception is thrown in an Altium script." caption-position="bottom" >}}

You get into some nasty situations where Altium will "lock-up", if an unhandled exception is thrown and there are forms hidden but still active.

# Schematic-Related API

The schematic server (SchServer) is the root object for all script usage within schematics.

## Getting The Current Schematic

Two of the most common ways to get an object to the current schematic is to use either SCHServer.GetCurrentSchDocument() or SCHServer.GetSchDocumentByPath(), as shown in the examples below.
    
    Dim schematic
    
    ' Get's the current schematic document.
    schematic = SCHServer.GetCurrentSchDocument()
    
    If schematic Is Nothing Then
       ShowMessage("ERROR: There is no active schematic.")
       Exit Sub
    End If
    

## Looping Through All Schematics In A Project

This example shows how you can safely loop through all schematics in a project. Put code to run on each schematic where shown. Note that the **project must be compiled** for this to work! Otherwise the iterator may only get some or none of the schematic documents. This is because SchServer.GetSchDocumentByPath() only retrieves open documents. Compiling a project loads the documents into memory, which counts as being 'open', even though you may not be able to see the schematic tab.

The GetSchDocumentByPath() function requires the full path to the schematic to be passed into it. This can be obtained by using an IDocument object which in turn is obtained with an IProject  object.
    
    Dim workspace
    Set workspace = GetWorkspace
    Dim pcbProject
    Set pcbProject = workspace.DM_FocusedProject
    
    If pcbProject Is Nothing Then
       ShowMessage("ERROR: Current project is not a PCB project.")
       Exit Sub
    End If
    
    ' Compile project
    Set flatHierarchy = pcbProject.DM_DocumentFlattened
    
    ' If we couldn't get the flattened sheet, then most likely the project has
    ' not been compiled recently
    If flatHierarchy Is Nothing Then
       ShowMessage("ERROR: Compile the project before running this script.")
       Exit Sub
    End If
    
    ' Loop through all project documents
    Dim DocNum
    For DocNum = 0 To PcbProject.DM_LogicalDocumentCount - 1
       Dim Document
       Set Document = PcbProject.DM_LogicalDocuments(DocNum)
    
       ' Check to see if this is SCH document
       If document.DM_DocumentKind = "SCH" Then
    
          ' Cool, it is a schematic, lets delete parameter(s) from it!
          Set schematic = SCHServer.GetSchDocumentByPath(Document.DM_FullPath)
    
          If schematic Is Nothing Then
             ShowMessage("ERROR: Sheet '" + Document.DM_FullPath + "' could not be retrieved.")
             Exit Sub
          End If
    
       End If ' If document.DM_DocumentKind = "SCH" Then
    Next ' For docNum = 0 To pcbProject.DM_LogicalDocumentCount - 1

## Compiling The Project

Compiling the project can be done programmatically and is necessary precursor for a number of other scripts to work (e.g. iterating through all the schematics in the project, they cannot be found until the project is compiled). This code example assumes you already have retrieved the IProject interface object from the workspace interface
    
    // Compile project
    flatHierarchy := PCBProject.DM_DocumentFlattened;
    
    // If we couldn't get the flattened sheet, then most likely the project has
    // not been compiled recently
    if (flatHierarchy = Nil) Then
    begin
       // First try compiling the project
       ResetParameters;
       AddStringParameter('Action', 'Compile');
       AddStringParameter('ObjectKind', 'Project');
       RunProcess('WorkspaceManager:Compile');
    
       // Try Again to open the flattened document
       flatHierarchy := PCBProject.DM_DocumentFlattened;
       if (flatHierarchy = nil) then
       begin
          ShowMessage('ERROR: Compile the project before running this script.');
          exit;
       end; 
       // If (flattenedDoc = Nil) Then
    end;

## Refreshing The Schematic

Use the following command to refresh the screen:
    
    CurrentSheet.GraphicallyInvalidate

# Auto-complete Tip

Press _Ctrl-Space_ to bring up the auto-complete help at any time. This is very useful when writing scripts for Altium, and results in you having to do a lot less of searching through code reference guides!

# Special Strings

Special strings are text strings which get converted when presenting certain output. The following special strings are available:
    
    .PRINT_DATE
    .PRINT_TIME
    .PRINT_SCALE
    .LAYER_NAME
    .PCB_FILE_NAME
    .PCB_FILE_NAME_NO_PATH
    .PLOT_FILE_NAME
    .ARC_COUNT
    .COMPONENT_COUNT
    .FILL_COUNT
    .HOLE_COUNT
    .NET_COUNT
    .PAD_COUNT
    .STRING_COUNT
    .TRACK_COUNT
    .VIA_COUNT
    .DESIGNATOR
    .COMMENT
    .LEGEND
    .NET_NAMES_ON_LAYER

Special strings are the reason why most objects are provided with two string properties, UnderlyingString and ConvertedString. UnderlyingString contains the raw text of a string, while ConvertedString contains the text once all special strings have been converted into the appropriate output.

# Regex

If using VBScript, you can easily use the built-in regex engine to use regex with Altium scripts.
    
    Set regex = New RegExp
    regex.IgnoreCase = True
    regex.Global = True
    ' Look for designator that starts with C and is followed by one or more numbers
    regex.Pattern = "^C[0-9][0-9]*"
    
    ' Check for pattern match
    If regex.Test(component.Designator.Text) Then
       StdOut("Capacitor found!")
    End If

# GUI Design

The Altium scripting language lets you design graphical user interfaces (GUIs) for your scripts. Each script file has the option of having an associated form which can be displayed from a function call.

Warning/Be Aware: The script engine will automatically remove empty event handler functions (e.g. a function that is called when the user clicks the button) on file save. It also will prompt you to delete event handler function calls that point to functions that no longer exist.

# TForm

The TForm object is the main window, the parent UI object which holds all of the other UI objects for the window inside it.

You can resize a TForm object programmatically using the Height and Width parameters. The script file [Main.vbs in the AltiumScriptCentral project](https://github.com/mbedded-ninja/AltiumScriptCentral/blob/master/src/Main.vbs) uses these parameters often to "hide" the main window when a child window is opened (without actually hiding it, which causes other issues). Here is an example which resizes the main form before calling a child script:
    
    ' @brief    Called when the "Delete Schematic Parameters" button is clicked
    Sub ButDeleteSchParams_Click(Sender)
    
        FormMainScript.Height = 1
        FormMainScript.Width = 1
    
        DeleteSchematicParameters(DummyVar)
    
        FormMainScript.Close
    End Sub

 Note that there is a minimum window size to Altium script forms which keeps the minimise, maximise and close buttons just visible. Setting the Height and Width parameters to values below this minimum threshold has no effect.

## TRadioGroup

TRadioGroup controls are useful for when you have multiple "sets" of radio buttons on one UI. They allow multiple radio buttons to be selected (from different groups of course), without all other on the UI being deselected.

{{< figure src="/images/2012/02/altium-script-radio-group-example-screenshot.png" width="890px" caption="Adding a TRadioGroup control to an Altium script UI.R" caption-position="bottom" >}}

Individual radio buttons are added to a radio group through the Items property, in where you add a new radio button on a new line.

The selected radio button in a group is controlled via the TRadioGroups ItemIndex property. This property can the read or written. This property corresponds to the line number of the corresponding radio button entry in the Items property (0-based count).

The [DeleteSchematicParameters,vbs script in the AltiumScriptCentral](https://github.com/mbedded-ninja/AltiumScriptCentral/blob/master/src/Tools/DeleteSchematicParameters.vbs) project makes use of the TRadioGroup control.

# Bugs

## A Command Is Currently Active, Cannot Save

You can get the following error when trying to save if you haven't called PCBServer.PostProcess an equal number of times as PCBServer.PostProcess. So far, if this does occur, I haven't worked out how to save the document (all changes since the last save are lost!).

{{< figure src="/images/altium/pcb-script-bug-a-command-is-currently-active-and-save-cannot-be-completed-at-this-time.png" caption="You might get this error in Altium when trying to save because you have run a script which hasn't called PSBServer.PostProcess an equal number of times as PCBServer.PostProcess." caption-position="bottom" width="800px" >}}

See the Undo section for information.

## Access Violation When Using Some Of The Arc's Properties

When trying to define a arc using any of StartX , StartY , EndX , or EndY  causes an access violation within AltiumComponents.bpl. A workaround to this is to define the arc using the centre, radius, and start/stop angle parameters.

## Variables Not Being Syntax Highlighted

The syntax highlighting in the code editor doesn't highlight variables in some cases. It seems to happen after you copy and paste bits of code around and the syntax highlighter algorithm gets confused about what's a variable and what's not. If you define more than one variable in a single statement, e.g.
    
    var
    track1, track2   : IPCB_Track;
    begin
       ...

track1  will be coloured as a variable, while track2  will look like normal text. Normally closing and re-opening the file you are editing in Altium will fix this.

## Some PCB OBjects Properties Cannot Be Set Directly, Even Though They Are Visable Through The AutoComplete Menu

For example. you cannot set a pads soldermask and pastemask expansion values (useful if you want to remove them alltogether) using the properties pad.SolderMaskExpansion and pad.PasteMaskExpansion. The only way I have found to do this is to create a pad cache, set the expansion values for the cache, and then assign the cache to the pad as per the following example.
    
    procedure SetPadExpansionValues();
    var
       pad : IPCB_Pad;
       padCache : TPadCache;
    begin
       pad := PCBServer.PCBObjectFactory(ePadObject, eNoDimension, eCreate_Default);
    
       // Use a pad cache to set the soldermask and paste mask expansion values to large negative numbers (to remove them alltogether)
       padCache := Pad.GetState_Cache;
       padCache.SolderMaskExpansion := MilsToCoord(-99);
       padCache.SolderMaskExpansionValid := eCacheManual;
       padCache.PasteMaskExpansion := MilsToCoord(-99);
       padCache.PasteMaskExpansionValid := eCacheManual;
    
       // Assign the pad cache to the pad
       pad.SetState_Cache := padCache;
    end;

## Undo Is Not Working Correctly

Make sure that you call PCBServer.PreProcess and PCBServer.PostProcess correctly! (see the Undo section for more details).

#  External Resources

Checkout [CA Idiots blog](http://caidiot.blogspot.co.nz/)
