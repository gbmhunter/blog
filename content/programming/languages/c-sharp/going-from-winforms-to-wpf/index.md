---
author: gbmhunter
date: 2013-04-04
draft: false
title: Going From WinForms To WPF
type: page
---

The layout of what is traditionally known as the "forms" is described in an entirely new way, using XAML rather than the C# langauge. This makes it rather similar to HTML. The forms also look plenty more modern, with things such as nice rounded corners on the controls and cool colour themes.

Form objects no longer have a `Text` property, and instead they use a `Content` property.

The standard message box class (MessageBo) does not exist anymore (it used to be found in System.Windows.Forms). Instead, you left to create your own, or install a third-party package! Create your own? Pah! I have found the [Gat Controls MessageBox](http://messagebox.codeplex.com/documentation) to be very useful.

The timer found in `System.Windows.Threading` doesn't work like it used to! It creates a new thread or something, and doesn't like being made to call functions in the calling parent class. Instead, use the `Despatcher` timer, found in the same place as the old one (`System.Windows.Threading`).

The object type for event arguments passed into an event handler have changed from `EventArgs` to `RoutedEventArgs`

WPF has built-in support for form object animations, making it really easy to create sleek-looking user interfaces!
