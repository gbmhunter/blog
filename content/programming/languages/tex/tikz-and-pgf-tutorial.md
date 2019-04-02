---
author: gbmhunter
categories: [ "Programming", "Languages", "TeX" ]
date: 2014-06-28
draft: false
tags: [ "TikZ", "PGF", "QuickLatex", "Latex", "Wordpress", "tikzpicture", "line", "box", "arrow", "text" ]
title: TikZ And PGF Tutorial
type: page
---

## Overview

This page serves as a basic tutorial on using the TikZ package, which is part of Latex. All of the below examples are rendered with QuickLatex using the wonderful Wordpress plugin [WP-QuickLatex](http://wordpress.org/plugins/wp-quicklatex/). The code examples omit the common start, preamble and end code sections for clarity. These are:

```    
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]
	
	% ********** EXAMPLE CODE GOES HERE ********
	
\end{tikzpicture}
```    

## Drawing A Line

One of the simplist things you can do is draw a line...

```    
% Draw a horizontal line from 0,0 to 2,0.
\draw (0,0) -- (2,0);	
```    

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw a horizontal line from 0,0 to 2,0.
	\draw (0,0) -- (2,0);
\end{tikzpicture}
```

## Making A Box

Adding more lines is easy, lets make a box...

```    
% Draw A Box
\draw (0,0) -- (2,0) -- (2,2) -- (0,2) -- (0,0);
```

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw a box
	\draw (0,0) -- (2,0) -- (2,2) -- (0,2) -- (0,0);
\end{tikzpicture}
```

## Adding Text

You can use the node object to add text at specific places.

```    
% Add text past the end of the line.
\draw (0,0) -- (2,0);
\node[anchor=west] at (2,0) {Text}
```    

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw a horizontal line from 0,0 to 2,0.
	\draw (0,0) -- (2,0);
	\node[anchor=west] at (2,0) {Text}
\end{tikzpicture}
```

Use the anchor to control where exactly the text goes. The anchor determines what part of the text is placed at the co-ordinate you give it. The code anchor west in above example means the west (left) part of the text will be placed at (2,0).

## Lets Draw An Arrow!

Lines are not the only thing you can draw, lets draw an arrow. Notice the only difference from drawing a line is that \draw is now \draw[->].

```    
% Draw an arrow
\draw[->] (0,0) -- (2,0);
```    

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw an arrow
	\draw[->] (0,0) -- (2,0);
\end{tikzpicture}
```	

## How To Draw Graphs

## Drawing The Grid

Grids can be useful to draw as the background to a graph. The following grid is drawn with grey, very thin lines so it suits well as a background.

```    
% Draw a grid
\draw[step=1cm, gray, very thin] (-2,-2) grid (7,7);
```    

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw a grid
	\draw[step=1cm, gray, very thin] (-2,-2) grid (7,7);
\end{tikzpicture}
```	

## Now Lets Add Some Axes

Axis can added easily to the previous grid by using...

```
% Draw axis
\draw[thick,->] (0,0) -- (5.5,0) node[anchor=north west] {x axis};
\draw[thick,->] (0,0) -- (0,5.5) node[anchor=south east] {y axis};	
```    

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw a grid
	\draw[step=1cm, gray, very thin] (-2,-2) grid (7,7);
	\draw[thick,->] (0,0) -- (5.5,0) node[anchor=north west] {x axis};
	\draw[thick,->] (0,0) -- (0,5.5) node[anchor=south east] {y axis};		

\end{tikzpicture}
```	

## Adding Axis Marks

```   
% Draw the axis marks on the graph...
\foreach \x in {0,1,2,3,4,5}
	\draw (\x cm,1pt) -- (\x cm,-1pt) node[anchor=north] {$\x$};
\foreach \y in {0,1,2,3,4,5}
	\draw (1pt,\y cm) -- (-1pt,\y cm) node[anchor=east] {$\y$};
```

```
\begin{tikzpicture}
	[+preamble]
		\usepackage{tikz}
	[/preamble]

	% Draw a grid
	\draw[step=1cm, gray, very thin] (-2,-2) grid (7,7);
	% Draw axis
	\draw[thick,->] (0,0) -- (5.5,0) node[anchor=north west] {x axis};
	\draw[thick,->] (0,0) -- (0,5.5) node[anchor=south east] {y axis};
	% Draw axis marks
	\foreach \x in {0,1,2,3,4,5}
		\draw (\x cm,1pt) -- (\x cm,-1pt) node[anchor=north] {$\x$};
	\foreach \y in {0,1,2,3,4,5}
		\draw (1pt,\y cm) -- (-1pt,\y cm) node[anchor=east] {$\y$};

\end{tikzpicture}
```