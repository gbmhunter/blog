---
author: gbmhunter
date: 2019-01-29
draft: false
lastmod: 2019-01-29
tags: [ "associative array", "map", "symbol table", "dictionary" ]
title: Associative Arrays
type: page
---

## Overview

An associative array can also be known as a **map**, **symbol table** or **dictionary**.

## Hash Tables

A hash table is a type of associative array where a hash is calculated from a given key, and the key's value is stored at the memory address pointed to by the key's hash.

### Complexity

Lookup        | Average Case             | Worst Case
--------------|--------------------------|-----------------
Lookup        | `\( \mathcal{O}(1) \)`   | `\( \mathcal{O}(n) \)`
Insertion     | `\( \mathcal{O}(1) \)`   | `\( \mathcal{O}(n) \)`
Deletion      | `\( \mathcal{O}(1) \)`   | `\( \mathcal{O}(n) \)`