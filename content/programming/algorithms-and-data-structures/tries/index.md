---
author: "gbmhunter"
date: 2019-01-17
description: "Tries"
draft: false
lastmod: 2019-01-17
tags: [ "trie", "data structures", "algorithm complexity", "Big-O", "node", "software", "algorithms", "digital tree", "radix tree", "prefix tree" ]
title: "Tries"
type: "page"
---

The word trie comes from the word re**trie**val. A trie is also known as a _digital tree_, _radix tree_ or _prefix tree_.

Each node contains the following:

1. A value, which can be `null`
2. An array of pointers to child nodes, where each one may optionally be `null`.

A trie usually has an empty root node (or `""`). This root node contains a list of nodes, one for each character in the alphabet (e.g. 26 entries for English). The characters are mapped to pointers in the array by their index, were A = 0 and Z = 25.

The value is used to indicate whether or not the sequence of letters from the root node to the current node form a valid word (if they don't, they only exist because there is a larger word which contains these letters).

## Complexity

The worst case time to construct a trie is dependent on the product of the longest word `\( m \)`, and how many words the trie contains `\( n \)`. This is written using Big-O notation as `\( \mathcal{O}(mn) \)`. The time it takes for insertion, deletion and searching is dependent on the product of the length of the word you are inserting, deleting or searching for `\( a \)`, and the total number of words `\( n \)`. This is expressed as `\( \mathcal{O}(an) \)`.

## Uses

Tries are used in the following ways:

* Search engines
* Spell-checkers
* Auto-complete