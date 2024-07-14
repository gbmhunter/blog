---
authors: [ "Geoffrey Hunter" ]
date: 2013-10-02
draft: false
lastmod: 2019-01-04
tags: [ "JSON", "serialization", "configuration", "data", "file", "Javascript", "object notation" ]
title: "JSON"
type: "page"
---

## Overview

JSON (JavaScript object notation) is a way of describing data that follows the syntax for creating an object in JavaScript. It is commonly used to pass messages across the internet, as an alternative to XML.

JSON files have the file extension .json.

## Comments

Unfortunately, there is no special syntax to add comments into a JSON file (some consider this to be a major pitfall to the JSON format). The best you can do is to add a fake parameter, and make sure that the reader ignores it.
    
```json
"_comment": "This is a comment inside a .json file"
```

Below is an example of a comment inside a JSON file:

```json 
{"employees":[
    {"firstName":"John", "lastName":"Doe"},
    {"firstName":"Anna", "lastName":"Smith"},
    "_comment": "Peter Jones may be removed from this array at some point", 
    {"firstName":"Peter", "lastName":"Jones"}
]}
```

You can have multiple comments with the same `"_comment"`  identifier (this is called a key), this does not break any strict rules.

## Libraries

Many open-source libraries exists for encoding/decoding JSON data.

[Jansson](https://github.com/akheron/jansson) is a C-library for encoding/decoding JSON data, and is designed to run on embedded systems (it compiles for PSoC ICs with no problems).

## jq

`jq` is a command-line tool for inspecting/running queries on JSON data. For example, you can pass it a .json file, and print out the number keys in an object, print out the number of elements in an array, search for keys, e.t.c.

Website: [https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)

For example, let's say we had the following file:

```json
{
  "my_array": [
    "a",
    "b",
    "c"
  ],
  "my_obj": {
    "key1": "foo",
    "key2": "bar"
  }
}
```

Print out entire contents of file (not that much use):

```sh
$ cat data.json | jq `.`
{
  "my_array": [
    "a",
    "b",
    "c"
  ],
  "my_obj": {
    "key1": "foo",
    "key2": "bar"
  }
}
```

Print out the key names of the root object, as an array:

```sh
$ cat data.json | jq `keys`
[
  "my_array",
  "my_obj"
]
```

Print out the elements in the array:

```sh
$ cat data.json | jq '.["my_array"]'
[
  "a",
  "b",
  "c"
]
```

Count out the number of key/value pairs in the object:

```sh
cat data.json | jq '.["my_obj"] | length'
2
```