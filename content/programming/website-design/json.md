---
author: gbmhunter
date: 2013-10-02 04:31:39+00:00
draft: false
title: JSON
type: page
url: /programming/website-design/json
---

## Overview

JSON (JavaScript object notation) is a way of describing data that follows the syntax for creating an object in JavaScript. It is commonly used to pass messages across the internet, as an alternative to XML.

JSON files have the file extension .json.

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

You can have multiple comments with the same `"_comment"`  identifier (this is called a key), this does not break any strict rules.

## Libraries

Many open-source libraries exists for encoding/decoding JSON data.

[Jansson](https://github.com/akheron/jansson) is a C-library for encoding/decoding JSON data, and is designed to run on embedded systems (it compiles for PSoC ICs with no problems).