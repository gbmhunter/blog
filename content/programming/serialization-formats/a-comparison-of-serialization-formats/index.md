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

Went you want to save, send or receive data from a piece of software, there are many different serialization formats to choose from. What is the best choice for your use case? This page aims to answer this question by comparing some of the most popular serialization formats.

The following serialization formats will be reviewed:

* CSV
* JSON
* Protobuf
* TOML
* XML
* YAML

There is no one-size-fits-all serialization format, as the best format for the jobs depends on things such as the type/amount of data that is being serialized and the software that will be reading it. 

## CSV

{{< img src="file-icon-csv.png" width="100px" caption="" >}}

CSV is well suited to storing large amounts of tabulated data in a human-readable format. It is not well suited to storing objects or hash table like data structures (unlike every other serialization format that is reviewed here). CSV is not very well standardized. [RFC 4180](https://tools.ietf.org/html/rfc4180) was an attempt to standardize the format, however the name "CSV" may refer to files which are delimited by non-comma characters such as spaces, tabs or semi-colons. In fact, it used to be called **Delimiter Separated Values (DSV)**, although unfortunately CSV seems like the more prevalent term these days.

The CSV format allows an optional __header line__ appearing as the first line in the file. If present, it contains field names for each value in a record. This header line is very useful the labelling the data and should almost always be present.

The CSV format is well supported, with CSV libraries available for almost every popular programming language.

For a human-readable format, CSV is quite concise (see the File Size section for more info). However, it can be difficult to work out what column is what, especially when there are a large number of rows (there is only one header column right at the top of the file), there are a large number of columns (there is no requirement of the columns being equal-spaced, and so you end up counting the commas from the left), and/or if there are empty fields (i.e. `,,`).

### Example

```csv
name, age, address
Charmander, 21, Fire St
Pikachu, 22, Electric St
```

### Review

<table>
    <thead>
        <tr>
            <th>Property</th>           <th>Value</th>      <th>Comment</th>
        </tr>
    </thead>
    <tbody>
        <tr class="ok">
            <td>Brevity</td>            <td>9/10</td>       <td>With only commas separating values, CSV is very concise.</td>
        </tr>
        <tr class="warning">
            <td>Human Readability</td>  <td>5/10</td>       <td>CSV is readable, although it easy to get lost with a large amount of data.</td>
        </tr>
        <tr class="ok">
            <td>Language Support</td>   <td>9/10</td>       <td>CSV is wide support and is readable is almost every major language.</td>
        </tr>
        <tr class="error">
            <td>Data Structure Support</td><td>3/10</td>    <td>CSV only supports tabular/array-like data. It does not support dictionary/map-like data, nor relational data.</td>
        </tr>
        <tr class="ok">
            <td>Speed</td>              <td>8/10</td>       <td>CSV is very fast to serialize/deserialize.</td>
        </tr>
        <tr class="error">
            <td>Standardization</td>    <td>3/10</td>       <td>CSV is not well standardized.</td>
        </tr>
    </tbody>
</table>

## JSON

{{< img src="file-icon-json.png" width="100px" caption="" >}}

JSON is a ubiquitous human-readable data serialization format that is supported by almost every popular programming language. Data structures closely represent common objects in many languages, e.g. a Python `dict` can be represented by a JSON `object`, and a Python `list` by a JSON `array`. Note there are caveats to this!

Unfortunately, the JSON syntax does not support comments! The best you can do is add a `__comment__` name/value pair to JSON objects, which is a poor solution. The name in a JSON object's name/value pairs always has to be a string. It also does not support any type of date format.

### Example

```json
[
    {
        "name": "Charmander",
        "age": 21,
        "address": "Fire Street"
    },
    {
        "name": "Pikachu",
        "age": 22,
        "address": "Electric Street"
    },
]
```

### Review

<table>
    <thead>
        <tr>
            <th>Property</th>           <th>Value</th>      <th>Comment</th>
        </tr>
    </thead>
    <tbody>
        <tr class="ok">
            <td>Brevity</td>            <td>8/10</td>       <td>JSON has concise syntax.</td>
        </tr>
        <tr class="warning">
            <td>Human Readability</td>  <td>5/10</td>       <td>JSON is human-readable. It loses some marks because it does not support comments.</td>
        </tr>
        <tr class="ok">
            <td>Language Support</td>   <td>9/10</td>       <td></td>
        </tr>
        <tr class="error">
            <td>Data Type Support</td>  <td>6/10</td>       <td>JSON supports array and map (object) structures. It supports many different data types including strings, numbers, boolean, null, e.t.c, but not dates.</td>
        </tr>
        <tr class="ok">
            <td>Speed</td>              <td>7/10</td>       <td>JSON is usually fast to serialize/deserialize.</td>
        </tr>
        <tr class="error">
            <td>Standardization</td>    <td>9/10</td>       <td>JSON has an official standards body. https://www.json.org/</td>
        </tr>
    </tbody>
</table>

## Protocol Buffers (Protobuf)

{{< img src="protobuf-icon" width="200px" caption="" >}}

Protobuf is a binary serialization protocol developed by Google. Since it serializes to binary, it is not human readable (although you can still pick out strings when viewing the file as ASCII text, see the example below).

### Example

Since protobuf serializes to a binary format, the example is not really human-readable, although you can see the raw strings like `Pikachu` and `Fire Street` embedded within the file, when the binary file is rendered as ASCII text.

```
#^R^Charmander^Z^Fire Street%<A2>@
^A^R^Pikachu^Z^Electric Street%<F1>'OA
```

## TOML

{{< img src="toml-icon" width="200px" caption="" >}}

TOML (Tom's Obvious, Minimal Language) is a newer (relative to the others in this review) human-readable serialization format.

TOML suffers from verbose syntax when it comes to expressing an array of objects (on in TOML speak, an array of tables). This can be seen in the example below where each pokemon object in the array is delimited with `[[pokemon]]`.

```toml
[[pokemon]]
id = 0
name = "Charmander"
address = "Fire Street"
age = 21

[[pokemon]]
name = "Pikachu"
address = "Electric Street"
age = 22
```

## XML

{{< img src="xml-file-icon" width="150px" caption="" >}}

XML is a human-readable serialization protocol. A well known XML-like format is HTML which is used to determine the structure of web pages.

One disadvantage of XML is it's verbosity. It's descriptive end tags which require you to re-type the name of the element that is being closed adds to the byte count of XML data.

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
Website          | <https://www.w3.org/TR/xml/> (the W3C standard)

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
CSV         | csv (built-in)                        | fast-cpp-csv-parser (<https://github.com/ben-strasser/fast-cpp-csv-parser>)
JSON        | json (built-in)                       | json (<https://github.com/nlohmann/json>)
Protobuf    | protobuf                              | protobuf (<https://github.com/protocolbuffers/protobuf>)
TOML        | toml (<https://github.com/uiri/toml>) | cpptoml (<https://github.com/skystrife/cpptoml>)
YAML        | PyYAML (<https://pyyaml.org/>)        | yaml-cpp (<https://github.com/jbeder/yaml-cpp>)
XML         | ElementTree (built-in)                | tinyxml2 (<https://github.com/leethomason/tinyxml2<>)

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

Format   | File Size (MiB, 10k records) | File Size (MiB, 100k records)
---------|------------------------------|------------------------------
csv      | 0.41                         | 4.2 
json     | 0.81                         | 8.2
protobuf | 0.38                         | 3.9
toml     | 0.94                         | 9.5
xml      | 1.50                         | 15
yaml     | 0.80                         | 8.1

As expected, the file sizes grow linearly with the number of records stored (10x amount of data = 10x the file size).

{{< img src="serialization-formats-file-sizes.png" width="600px" caption="Comparative file sizes for popular serialization formats." >}}



## Other Formats That Weren't Considered

* BSON. A binary format popularized by MongoDB that is based on JSON.
* MessagePack. This looks similar to protobuf (uses binary encoding). Has libraries for a wide variety of languages.

## Template

Property         | Value
-----------------|---------
Human Readability| /10
Language Support | /10
Speed            | /10
Standardization  | /10
Website          | <>