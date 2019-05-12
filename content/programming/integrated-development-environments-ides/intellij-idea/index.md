---
author: gbmhunter
categories: [ "Programming", "Integrated Development Environments" ]
date: 2016-06-26
draft: false
lastmod: 2019-04-05
tags: [ "IDEs", "IntelliJ", "IDEA", "Java", "editor", "code", "shortcuts" ]
title: IntelliJ IDEA
type: page
---

## Quick Reference

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th>Shortcut</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3">Compile/Run/Debug</td>
    </tr>
    <tr>
      <td>Make Project</td>
      <td>Ctrl-F9 (Windows)</td>
      <td>You can change the project settings to that artefacts (such as .jar files) are generated at the same time as make.</td>
    </tr>
    <tr>
      <td>Run (without debugging)</td>
      <td>
        Shift-F10 (Windows)<br />
        Ctrl-R (Mac)
      </td>
      <td>Runs the last active configuration. Debugging IS NOT enabled.</td>
    </tr>
    <tr>
      <td>Run (with debugging)</td>
      <td>
        Shift-F9 (Windows)<br />
        Ctrl-D (Mac)
      </td>
      <td>Runs the last active configuration. Debugging IS enabled. Note that IdeaVim on Mac can override the Ctrl-D shortcut to jump down half a page.</td>
    </tr>
    <tr>
      <td>Step Over</td>
      <td>F8 (Windows)</td>
      <td>Use to "step over" current line of code when debugging. Step-over is one of the most commonly used debug features.</td>
    </tr>
    <tr>
      <td>Step Into</td>
      <td>F7 (Windows)</td>
      <td>Use to "step into" the current line of code while debugging. This will enter the method (if any) on the current line of code.</td>
    </tr>
    <tr>
      <td>Resume Program</td>
      <td>Cmd-Alt-R (Mac)</td>
      <td>Continue running the program if it has been paused while debugging.</td>
    </tr>
    <tr>
      <td colspan="3">View</td>
    </tr>
    <tr>
      <td>Show Project Window</td>
      <td>Alt-1 (Windows)</td>
      <td>Shows the file structure of the project (by default this on the left-hand side of the screen).</td>
    </tr>
    <tr>
      <td>Show Code Structure Window</td>
      <td>Alt-7 (Windows)</td>
      <td>This gives a great overview of the class inside the current file (e.g. it lists all the variables and methods).</td>
    </tr>
    <tr>
      <td>Quick Documentation</td>
      <td>Ctrl-Q (Windows)</td>
      <td>Great for checking up on what a class or method does as you are about to use it.</td>
    </tr>
    <tr>
      <td colspan="3">Code</td>
    </tr>
    <tr>
      <td>Reformat Code</td>
      <td>Ctrl-Alt-L (Windows)</td>
      <td>Corrects the coding indentation of the current file. Great for automatically tidying up code after serious refactoring has taken place.</td>
    </tr>
  </tbody>
</table>

## vim Plugin

IntelliJ supports the [IdeaVim](https://plugins.jetbrains.com/plugin/164-ideavim) plugin which adds vim-like functionality to the IDE.

This plugin support configuration using a `~/.ideavimrc` file, which is similar in format to a typical `.vimrc` file, except that it allows special extensions to directly control IntelliJ through an API.

I have noticed that IdeaVim cannot deal with large files that well (e.g. a 50,000 line `.json` file), and I have to disable the plugin to be able to work with these files.