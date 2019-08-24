---
author: "gbmhunter"
categories: [ "Programming", "Algorithms And Data Structures" ]
date: 2019-07-07
description: "A walkthrough on how to parse a mathematical expression. Covers grammar, lexers, parsers, RPN, infix and postfix notation, ASTs and more."
draft: false
lastmod: 2019-08-23
tags: [ "programming", "data structures", "algorithms", "code", "software", "extended Backus-Naur form", "EBNF", "recursive decent parsers", "RPN", "parsers", "grammar", "lexers", "evaluators", "abstract syntax trees", "AST", "infix notation", "postfix notation" ]
title: "How To Parse Mathematical Expressions"
type: "page"
---

## Overview

This aim of this tutorial is to introduce the concept of parsing instructions expressed as text into executable code. This serves as a basis for working with machine readable languages (e.g. compilers, JSON deserialization and mathematical expression evaluators). This page will use examples for evaluating basic mathematical expressions.

## Input Notation

### Infix Notation

As humans, we are used to using _infix notation_ to write mathematic expressions:

```text
y = 5 * (x + 2)
```

Unfortunately, this notation is very hard for a computer to understand and parse.

### Reverse Polish Notation (RPN)

Reverse polish notation (RPN) is an alternative notation to _infix notation_. It is also known as _postfix notation_. In RPN notation, the operands always come before the operator, which is always specified last. For example, `2+3`, which is in infix notation, would become `2 3 +`.

The same expression above (`y = 5 * (x + 2)`), but in RPN is:

```text
y = 5 x 2 + 2 ^ *
```

RPN does not require the use of parenthesis to preserve the correct order of operations. RPN can linearize a tree data-structure, which can have memory benefits.

You may have noticed the some older calculators don't work as you're "used to". This could be because they use RPN! The Hewlett-Packard HP-48 graphic calculator presented RPN to the user (no infix notation was allowed!).

## Sequence of Events

Lexer: Converts the grammar (which is the input, i.e. mathematical expression as a string) into a sequence of tokens. Less formally, it can also be called a tokenizer.

Parser: Reads the tokens outputted from the lexer and parses them into a structure such as RPN or AST. It reshapes the tokens into a structure according to rules such as operator preceedance.

Evaluator: Processes the output of the parser, and produces the result the user wants to see. In the case of an AST, the evaluator will typically perform a depth-first evaluation of all the nodes in the AST (which is easily performed with recursion).

## Grammar

Grammar, the _language of languages_.

Context-free grammars are the most common.

### Extended Backus-Naur Form (EBNF)


## A Recursive Decent Parser (RPN)

A _Recursive Descent Parser_ (RPN) is a type of parser which uses function recursion as a primary technique for parsing expressions. One of the main benefits of RPNs is that their design closely matches the structure of EBNF grammar syntax.

## External Resources

For a detailed code-based walk-through of an AST expression parser in C#, see [https://mariusbancila.ro/blog/2009/02/03/evaluating-expressions-part-1/](https://mariusbancila.ro/blog/2009/02/03/evaluating-expressions-part-1/).