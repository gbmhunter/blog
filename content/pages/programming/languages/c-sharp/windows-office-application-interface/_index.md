---
author: gbmhunter
date: 2012-01-08 04:37:05+00:00
draft: false
title: Windows Office Application Interface
type: page
url: /programming/languages/c-sharp/windows-office-application-interface
---

You can use C# to manipulate Microsoft Office programs such as Word and Excel. You can open, create, edit and do essentially everything you can do in the programs natively using instead C# (albeit a little longer...) and libraries provided by Microsoft.

A good tutorial on the Word API can be found [here](http://msdn.microsoft.com/en-us/library/aa192495(v=office.11).aspx#wordobject_link8) in the MSDN library.


# Tutorial


{{< figure src="/images/programming-misc/add-microsoft-word-object-library-reference.png" caption="Adding the Microsoft Word x.x (14.0 in this case) Object Library to a C# project." caption-position="bottom" width="320px" >}} To create a word application (the first steps no matter what your doing) is to add the Microsoft Word x.x Object Library reference to your C# project. Right click on your project in the solution explorer, click 'Add Reference', click the 'COM' tab, and then select Microsoft Word x.x Object Library from the list as shown in the picture. Click 'OK' to add it to your project. Note that I was using Microsoft Office 2010 and the Microsoft Word 14.0 Object Library when writing this tutorial, so features/processes could be slightly different for other versions.

Now that the reference has been added, add the following use code to make typing easier

    
    using Word = Microsoft.Office.Interop.Word;


Now create a new word application object. This is the equivalent to starting up Microsoft Word.

    
    Word.Application wordApp = new Word.Application();


You can choose to make it visible to the user by setting the property

    
    wordApp.Visible = true;


To create a new document inside the application (usually the second step), call the method

    
    Word.Document wordDoc = wordApp.Documents.Add();


At this point you can start playing around with the document by adding text, pictures, objects (such as textboxes, rectangles, e.t.c). See below for some hints. All hints assume you have instantiated the Word application and at least one document inside it.


# Text Boxes:


To create a textbox:

    
    Word.Shape textBox = wordDoc.Shapes.AddTextbox(...);


To change weather or not you can see the text box border modify the property:

    
    textBox.Line.Visible


To insert text into the textbox modify the peoperty

    
    textBox.TextFrame.TextRange.Text


To change the font size

    
    textBox.TextFrame.TextRange.Font.Size


To change the font colour

    
    textBox.TextFrame.TextRange.Font.ColorIndex


To change the alignment of the text

    
    textBox.TextFrame.TextRange.ParagraphFormat.Alignment


To modify the margins of the textbox modify the properties

    
    textBox.TextFrame.MarginBottom;
    textBox.TextFrame.MarginTop;
    textBox.TextFrame.MarginRight;
    textBox.TextFrame.MarginLeft;




# Tables


Create a table using the method

    
    Word.Table table = wordDoc.Tables.Add(...);




# Manipulating The Cursor


Manipulating the cursor is done with the methods and parameters in the class

    
    wordApp.Selection


Selection is just another name for 'current cursor position'.

To jump to the last line in a document, use the method

    
    wordApp.Selection.EndKey();


To insert a break (e.g. line, page) at the current cursor position, use the method

    
    wordApp.Selection.InsertBreak(...);




# Breaks (Line, Page, ...)


To insert a break at the current selection point, call the following method:

    
    wordApp.Selection.InsertBreak(...)
