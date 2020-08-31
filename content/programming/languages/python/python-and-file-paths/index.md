---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2020-03-17
description: "A tutorial on working with file paths in Python, including the pathlib module."
draft: false
lastmod: 2020-08-10
tags: [ "programming", "programming languages", "Python", "paths", "pathlib", "PEP 428" ]
title: "Python And File Paths"
type: "page"
---

## Overview

## The pathlib Module

The `pathlib` module was introduced in Python v3.4 ([PEP 428](https://www.python.org/dev/peps/pep-0428/)). It's purpose was to replace the much used functions such as `os.path.join()` and family with a simpler set of path manipulating classes/functions which work similarly across all platforms. In the words of `PEP 428`, it is "object-orientated file-system paths". 

On Linux/macOS:

```python
file_path = Path('~/my_file.txt')
```

On Windows you would also use forward slashes to describe paths! The `Path` module recognizes you are running the code on Windows and converts the path accordingly.

```python
file_path = Path('C:/Users/my_file.txt')
```

`os.path.join()` has long been the mainstay of concatenating paths in cross-platform way. For instance, `os.path.join('my_dir', 'my_file')` would result in the string `my_dir/my_file` in Linux-like (POSIX) systems, and `my_dir\my_file` on Windows systems. The `pathlib` module aims to make `os.path.join()` redundant by overloading the `/` (_slash_) operator to allow the concatenation of path segments:

```python
file_path = Path('my_dir') / 'my_file'
```

Once you have a `Path` object, you can check if something exists at that path (typically it would point to a directory or file) by calling `.exists()`:

```python
my_path = Path('my_file.txt')
my_path.exists()
# Returns True if text file exists
```

### Getting Parts Of The Path

The `Path` object provides many properties to extract different parts of a path:

```python
my_path = Path('/my_dir/my_file.txt')

print(my_path.parent) # '/my_dir'
print(my_path.name) # 'my_file.txt'
print(my_path.stem) # 'my_file'
print(my_path.suffix) # '.txt'
print(my_path.root) # '/'
print(my_path.parts) # ('/', 'my_dir', 'my_file.txt')
```

Note that in Linux systems, `.root` is typically `/`, while in Windows system, `.root` is typically `\\`.

`.stem` allows you to extract the filename without the extension, which replaces `os.path.splitext()[0]`

### Backwards Compatibility

If you start using `Path` objects in your code but have to interacts with pre-existing code which uses plain `strings` for paths, you will have to convert the `Path` object to a string first, which is easily done with the `str()` cast:

```python
my_path = Path('my_file.txt')
old_function(str(my_path))
```
