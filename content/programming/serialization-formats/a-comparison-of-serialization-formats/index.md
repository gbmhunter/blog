---
author: gbmhunter
date: 2019-01-27
draft: true
title: A Comparison Of Serialization Formats
type: page
---

## Overview

The following serialization formats will be reviewed:

* CSV
* JSON
* Protobuf
* TOML
* XML
* YAML

There is no one-size-fits-all serialization format, as the best format for the jobs depends on things such as the type and amount of data that is being serialized. 

## CSV

CSV is well suited to storing large amounts of tabulated data in a human-readable format. It is not well suited to storing objects or hash table like data structures. CSV is not very well standardized. [RFC 4180](https://tools.ietf.org/html/rfc4180)  was an attempt to standardize the format, however the name "CSV" may refer to files which are delimited by non-comma characters such as spaces, tabs or semi-colons.

The CSV format allows an optional __header line__ appearing as the first line in the file. If present, it contains field names for each value in a record. This header line is very useful the labelling the data and should almost always be present.

The CSV format is well supported, with CSV libraries available for almost every popular programming language.

### Example

```csv
name, age, address
Charmander, 21, Fire St
Charmander, 22, Electric St
```

### Review

Property         | Value
-----------------|---------
Human Readability| 5/10
Language Support | 9/10
Relational Data  | No
Speed            | 8/10
Standardization  | 3/10
Website          | 

## JSON

JSON is a ubiquitous human-readable data serialization format that is supported by almost every popular programming language.

### Pros And Cons

**Pros:**

* Widely supported by almost all popular languages.
* Typically faster to parse than YAML or TOML.
* Human readable.
* Data structures closely represent common objects in many languages, e.g. a Python `dict` can be represented by a JSON `object`, and a Python `list` by a JSON `array`. Note there are caveats to this!

**Cons:**

* JSON syntax does not support comments! The best you can do is add a `__comment__` name/value pair to JSON objects, which is a poor solution.
* The name in a JSON object's name/value pairs always has to be a string.

### Example

```json
[
    {
        "name": "Charmander",
        "age": 21,
        "address": "Fire Street"
    },
    {
        "name": "Picachu",
        "age": 22,
        "address": "Electric Street"
    },
]
```

### Review

Property         | Value
-----------------|---------
Human Readability| 5/10
Language Support | 9/10
Standardization  | 9/10
Website          | <https://www.json.org/>

## Protocol Buffers (Protobuf)

Protobuf is a binary serialization protocol developed by Google. It is not human readable.

## XML

XML is a human-readable serialization protocol. XMl can be considered quite verbose as it requires descriptive end tags. A well known XML-like format is HTML which is used to determine the structure of web pages.

### Example

```xml
<person>
    <name>Charmander</name>
    <age>21</age>
    <address>Fire St</address>
</person>
<person>
    <name>Pikachu</name>
    <age>22</age>
    <address>Electric Street</address>
</person>
```

### Review

Property         | Value
-----------------|---------
Human Readability| 5/10
Language Support | 9/10
Speed            | 9/10
Standardization  | /10
Website          | <>

## YAML

The YAML specification is much larger the the JSON specification. YAML allows for relational data (references) using anchors (`)

Property         | Value
-----------------|---------
Human Readability| 9/10
Language Support | 6/10
Speed            | 4/10
Standardization  | 8/10
Website          | <https://yaml.org/>

## Other Formats

* BSON
* MessagePack

## Template

Property         | Value
-----------------|---------
Human Readability| /10
Language Support | /10
Speed            | /10
Standardization  | /10
Website          | <>