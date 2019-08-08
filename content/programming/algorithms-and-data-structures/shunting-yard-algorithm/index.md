---
author: "gbmhunter"
categories: [ "Programming", "Algorithms And Data Structures" ]
date: 2019-07-07
draft: false
lastmod: 2019-07-07
tags: [ "programming", "data structures", "algorithms", "code", "software",  ]
title: "How To Parse Mathematical Expressions"
type: "page"
---

## Input Notation

As humans, we are used to using _infix notation_ to write mathematic expressions:

$$ y = 5 * (x+2)^2 $$

Unfortunately, this notation is very hard for a computer to understand and parse.

Revere polish notation (RPN) can linearize a tree data-structure, which can have memory benefits.

The Hewlett-Packard HP-48 graphic calculator presented RPN to the user (no infix notation was allowed!).

## Sequence of Events

Lexer: Converts the grammer (which is the input, i.e. mathematical expression as a string) into a sequence of tokens. Less formally, it can also be called a tokenizer.

Parser: Reads the tokens outputted from the lexer and parses them into a structure such as RPN or AST. It reshapes the tokens into a structure according to rules such as operator preceedance.

Evaluator: Processes the output of the parser, and produces the result the user wants to see. In the case of an AST, the evaluator will typically perform a depth-first evaluation of all the nodes in the AST (which is easily performed with recursion).

## External Resources

For a detailed code-based walk-through of an AST expression parser in C#, see [https://mariusbancila.ro/blog/2009/02/03/evaluating-expressions-part-1/](https://mariusbancila.ro/blog/2009/02/03/evaluating-expressions-part-1/).