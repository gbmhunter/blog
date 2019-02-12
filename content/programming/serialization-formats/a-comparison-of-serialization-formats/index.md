---
author: gbmhunter
date: 2019-01-27
draft: true
lastmod: 2019-02-11
tags: [ "serialization", "format", "comparison", "CSV", "JSON", "protobuf", "TOML", "XML", "YAML", "file size", "speed", "benchmark", "review", "Python", "C++" ]
title: "A Comparison Of Serialization Formats"
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

CSV is well suited to storing large amounts of tabulated data in a human-readable format. It is not well suited to storing objects or hash table like data structures. CSV is not very well standardized. [RFC 4180](https://tools.ietf.org/html/rfc4180)  was an attempt to standardize the format, however the name "CSV" may refer to files which are delimited by non-comma characters such as spaces, tabs or semi-colons. In fact, it used to be called **Delimiter Separated Values (DSV)**, although unfortunately CSV seems like the more prevalent term these days.

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

## TOML

TOML suffers from verbose syntax when it comes to arrays.

## XML

XML is a human-readable serialization protocol. XMl can be considered quite verbose as it requires descriptive end tags. A well known XML-like format is HTML which is used to determine the structure of web pages.

### Example

```xml
<people>
    <person>
        <id>0</id>
        <name>Charmander</name>
        <age>21</age>
        <address>Fire St</address>
    </person>
    <person>
        <id>1</id>
        <name>Pikachu</name>
        <age>22</age>
        <address>Electric Street</address>
    </person>
</people>
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

## Speed Comparison (Benchmarking)

The following libraries were used:

Format      | Python                                | C++
------------|---------------------------------------|---------------------------------------------------------------------------
CSV         | csv (built-in)                        | fast-cpp-csv-parser (https://github.com/ben-strasser/fast-cpp-csv-parser)
JSON        | json (built-in)                       | json (https://github.com/nlohmann/json)
Protobuf    | protobuf                              | protobuf
TOML        | toml (https://github.com/uiri/toml)   | cpptoml (https://github.com/skystrife/cpptoml)
YAML        | PyYAML (https://pyyaml.org/)          | yaml-cpp (https://github.com/jbeder/yaml-cpp)
XML         | ElementTree (built-in)                | tinyxml2 (https://github.com/leethomason/tinyxml2)

Python v3.7 was used for all Python tests. C++17/GCC compiler was used for all C++ tests. Tests ran on a Debian machine running inside a virtual machine, however the purpose of this test was to show relative performance, which should be unchanged when running inside a virtual machine.

As to be representative of how the serialization data might be used, all write tests where passed the same input data, either a `vector` (for the C++ tests) or a `List` (for the Python tests) of `Person` objects. Each `Person` contains an ID (an integer starting from 0), a name (random string of 5 ASCII chars), and address (random string of 30 ASCII chars) and an age (float). Each test was required to serialize the data to the required format (using the libraries mentioned above) and then write the serialized data to disk. All read tests performed the opposite task, reading a data file, deserializing and creating a `vector`/`List` of `Person` objects. 

3 iterations of each test where performed, and the smallest run time of the three was selected as the most representative. Larger runtimes are typically the result of the OS performing extraneous tasks.

Format   | C++ Deserialization (s) | C++ Serialization (s)     | Python Deserialization | Python Serialization
---------|-------------------------|---------------------------|------------------------|-----------------------
csv      | 0.030                   | 0.022                     | 0.027                  | 0.034
json     | 0.16                    | 0.13                      | 0.023                  | 0.16
protobuf | 0.015                   | 0.025                     | 0.26                   | 0.38
toml     | 0.23                    | 0.22                      | 1.08                   | 0.23
xml      | 0.12                    | 0.16                      | 0.063                  | 0.25
yaml     | 0.48                    | 0.55                      | 6.84                   | 3.84

{{< img src="serialization-formats-conversion-times-10k-cpp.png" width="600px" caption="C++ conversion times for 10k objects in popular serialization formats." >}}

{{< img src="serialization-formats-conversion-times-10k-python.png" width="600px" caption="Python conversion times for 10k objects in popular serialization formats." >}}

It is also interesting to see how the serializations respond to a change in the data size. If the size of the data doubles, does it take twice as long to read/write (linear response), or does it behave differently (e.g. quadratic, log(n), ...). This is called the complexity of the serialization algorithm. To test this, I increased the `people` array from 10,000 to 100,000 (increased by a factor of 10). This was the result...

Format   | C++ Deserialization (s) | C++ Serialization (s)     | Python Deserialization | Python Serialization
---------|-------------------------|---------------------------|------------------------|-----------------------
csv      | 0.26                    | 0.18                      | 0.22                   | 0.38
json     | 1.53                    | 1.50                      | 0.20                   | 1.59
protobuf | 0.13                    | 0.24                      | 2.62                   | 3.61
toml     | 2.23                    | 2.19                      | 9.86                   | 2.08
xml      | 0.85                    | 1.74                      | 0.78                   | 2.58
yaml     | 4.96                    | 5.70                      | 69.67                  | 36.87

{{< img src="serialization-formats-conversion-times-100k-cpp.png" width="600px" caption="C++ conversion times for 100k objects in popular serialization formats." >}}

{{< img src="serialization-formats-conversion-times-100k-python.png" width="600px" caption="Python conversion times for 100k objects in popular serialization formats." >}}

## File Size Comparison

When serializing large amounts of data, another important aspect is the verbosity of the format. To compare the verbosity of the different formats, we can pass each format the same data, dump the data to disk, and compare the file sizes.

{{< img src="serialization-formats-file-sizes.png" width="600px" caption="Comparative file sizes for popular serialization formats." >}}



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