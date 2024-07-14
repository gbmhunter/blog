---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Programming Languages", "Python" ]
date: 2019-06-05
description: "A tutorial on pytest, a popular testing framework for Python."
draft: false
lastmod: 2019-06-10
tags: [ "programming", "programming languages", "Python", "pytest", "marks", "markers", "Jenkins", "tests", "testing", "unit tests", "conftest.py", "xdist" ]
title: "pytest"
type: "page"
---

## Overview

`pytest` is a program/framework for running Python tests.

## Writing Tests

pytest looks for tests in Python files which either begin in `test_` or end in `_test`, for example:

```text
test_my_module.py # Will be found
my_module_test.py # Will be found
my_module.py # Won't be found
```

Inside these files, `pytest` will look for either:

1. Functions that begin with `test`, or
2. Functions/methods that begin with `test` that are inside classes that begin with `Test`.

For example:

```python
def test_my_function(): # Will be found
  assert True

class TestMyStuff:
  def test_my_stuff(): # Will be found
    assert True

def my_other_function(): # Won't be found
  pass
```

## Running Tests

**Run All Tests In Module**

```sh
$ pytest my_file.py
```

**Run All Tests In Directory**

This will also run any tests in sub-directories:

```sh
$ pytest my_dir/
```

**Test Name Matching**

You can use `-k` to match against test name substrings. The following command will run all tests that contain the stinrg `hello`, e.g. `test_hello_world`, `test_slow_hello()`:

```sh
$ pytest -k hello
```

## Marks

Marks (or markers) can be applied to test functions using a decorator in the form `@pytest.mark.name_of_mark`.

For example, to apply a mark called `unit` (note that `unit` should defined as a custom mark before you use it like this, see the below [Custom Marks](#custom-marks) section):

```python
import pytest

@pytest.mark.unit
def my_test_function():
  assert True
```

You can use the `-m` option on the command-line to only run tests with specific marks. The following command will run all tests in the current directory/sub-directory with the mark `my_mark`:

```sh
$ pytest -m unit
```

A common use-case is to specify tests with test types such as `unit`, `e2e`, `performance`, e.t.c so that you can easily run quick unit tests during development and longer running tests on merge or nightly.

You can also negatively select tests against a mark. The following command will run all tests to marked with `unit`:

```sh
$ pytest -m "not unit"
```

You can get a list of all the marks you can use from the command-line with:

```sh
$ pytest --markers
```

### Custom Marks

Custom marks need to be registered before you can use them. They can be registered in your `pytest.ini` file, like so:

```ini
[pytest]
markers =
   unit: All unit tests (fast tests requiring no external dependancies).
   e2e: End-to-end tests.
```

As shown above, a description/comment can be added after the `:` symbol.

For more information of marks, see [https://docs.pytest.org/en/latest/example/markers.html](https://docs.pytest.org/en/latest/example/markers.html).

## conftest.py

`conftest.py` files are used to specify **directory-specific** `pytest` features. All `conftest.py` files that are **at the directory level of the test or closer to the root of the file system** will be used when executing `pytest`. You can have many `conftest.py` files per test project.

Common things to include into `conftest.py` files include `pytest` hooks and fixtures, as well as loading external plugins specific to the tests in same directory.

## Plugins

### xdist

xdist allows you to provide the `-n` option to distribute the tests to multiple CPUs:

```bash
$ pytest -n 4
```

Note however this will prevent all of your `print()` statements from working (as well as anything else the prints to `stdout`, e.g. log messages). As a workaround, you can redirect `stdout` to `stderr`:

```python
import sys
sys.stdout = sys.stderr
```

This can be added to a `conftest.py` file so that it applies to all tests in it's directory and subdirectories. Be warned that all of the output will be interleaved, so it might make the output somewhat useless!

## Jenkins

`pytest` has the ability to generate `junit.xml` files which are used by Jenkins to display the test results.

You can provide the `--junitxml <path>` option to `pytest` and it will generate the file for you:

```sh
$ pytest --junitxml /test_output/results.xml
```