---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux" ]
date: 2019-12-19
description: ""
last_update:
  date: 2019-12-19
  author: Geoffrey Hunter
tags: []
title: "A Review Of Linux Shells"
---

## Bash

Bash (or `bash`), the _Bourne-Again SHell_, is a ubiquitous shell which is the default shell for many Linux distributions (it is the default GNU shell). Bash succeeded the older Bourne Shell (`sh`), but remained backwards compatible with Bourne shell scripts.

<table>
  <tbody>
    <tr>
      <td>Language Functionality</td>
      <td>8/10</td>
    </tr>
    <tr>
      <td>Language Readability</td>
      <td>3/10</td>
    </tr>
  </tbody>
</table>


Bash provides the following popular keywords:

* time: For measuring the runtime of a command.

One of Bash's disadvantages is is hard-to-read shell syntax, when compared to popular languages in use today such as Python. The comparison operators `-eq` has to be used for numerical comparison, while you have to use `=` if you want to do string comparison. And if you are like me you are forever forgetting the subtle difference between single brackets `[`, double brackets `[[` and the `test` command when it comes to `if` statements.

For example, this is what a basic `if` statement looks like in `bash`:

```bash
if [ $my_var -eq 2.0 ]
then
  echo "my_var equalled 2.0"
fi
```

## Fish

Fish, the _Friendly Interactive SHell_, 

Website: [https://fishshell.com/](https://fishshell.com/)

## zsh