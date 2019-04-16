---
author: gbmhunter
date: 2013-03-18
draft: false
title: Redirecting The Command-line To A Text Block
type: page
---

It involves inheriting from the `StringWriter` class, and overwriting it's `WriteLine` function with your own code that writes the text to the text block (or any other text-capable object), rather than Windows writing it to the system console (whatever that may be).

Note that this code is suitable for passing into functions that require a `System.IO.Stream`, but this does not redirect messages that are being sent directly to the command line.

```c#
namespace StringRedirect
{    
    /// <summary>
    /// Allows text blocks to appear like a command line for serial out string messages.
    /// </summary>
    public class TextBlockStreamWriter : StringWriter
    {
        private TextBlock _textBlock;

        public string Text
        {
            get 
            { 
                return _textBlock.Text; 
            }
            set
            {
                _textBlock.Text += value;
            }
        }

        public TextBlockStreamWriter(ref TextBlock t)
        {
            _textBlock = t;
        }

        public override void WriteLine(string msg)
        {
            Text = msg + "\n";
        }
    }
}
```