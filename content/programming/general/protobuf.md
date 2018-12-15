---
author: gbmhunter
date: 2016-12-08 15:17:46+00:00
draft: false
title: protobuf
type: page
url: /programming/general/protobuf
---

# Overview

_**protobuf**_ is an open-source, multi-language library from Google for serialising/deserialising data.

{{< figure src="/images/2017/07/google-protobuf-logo.png" width="467px" caption="Icon for Google's protobuf library."  >}}

It is designed as an efficient, **language agnostic** way of sending data over messaging protocols such as TCP/UDP, or UART/SPI/I2C e.t.c.

Source code and downloads can be found at [https://github.com/google/protobuf](https://github.com/google/protobuf).

# Installing

The installation for the C++ version of protobuf is described well at [https://github.com/google/protobuf/tree/master/src](https://github.com/google/protobuf/tree/master/src). It uses **command-line tools** (autotools and make) and works best on a UNIX-like system.


# .proto Files

**Messages are described in .proto files**. These are then converted into your language of choice by the protobuf compiler.

An advantage of this is that they are programming language agnostic, i.e. you can use these same .proto files to generate libraries for many different programming languages that all need to interface with these message types.

# Valid Scalar (Primitive) Types

Messages defines in .proto files can be composed of variables which have scalar (primitive) types, as well as variables which are of another message type (e.g. nested types).

The valid scalar types are:

<table>
    <thead>
        <tr>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody >
<tr >

<td >int32
</td>

<td >Uses variable length encoding, but inefficient at encoding negative numbers.
</td>
</tr>
<tr >

<td >int64
</td>

<td >Uses variable length encoding, but inefficient at encoding negative numbers.
</td>
</tr>
<tr >

<td >uint32
</td>

<td >
</td>
</tr>
<tr >

<td >uint64
</td>

<td >
</td>
</tr>
<tr >

<td >sint32
</td>

<td >
</td>
</tr>
<tr >

<td >sint64
</td>

<td >
</td>
</tr>
<tr >

<td >fixed32
</td>

<td >
</td>
</tr>
<tr >

<td >fixed64
</td>

<td >
</td>
</tr>
<tr >

<td >sfixed32
</td>

<td > Always 32 bytes.
</td>
</tr>
<tr >

<td >sfixed64
</td>

<td > Always 64 bytes.
</td>
</tr>
<tr >

<td >float
</td>

<td >32-bit floating-point number.
</td>
</tr>
<tr >

<td >double
</td>

<td >64-bit floating-point number.
</td>
</tr>
<tr >

<td >bool
</td>

<td >
</td>
</tr>
<tr >

<td >string
</td>

<td > A string can contain UTF-8 or 7-bit ASCII encoded text.
</td>
</tr>
<tr >

<td >bytes
</td>

<td > An arbitrary sequence of bytes.
</td>
</tr>
</tbody>
</table>

Each one of these scalar types maps to a correspond type your language of choice. See [https://developers.google.com/protocol-buffers/docs/proto#scalar](https://developers.google.com/protocol-buffers/docs/proto#scalar) for more details.

# Reading From A Protobuf

## C++

For each field in your message, protobuf provides a function that will return a const reference to the value.

```c++
MyMessageType myMessage;
std::cout << "x = " << myMessage.x() << std::endl;
```

# Writing To A Protobuf

## C++

Protobuf messages can be modified in many different ways.

For each primitive field in your message, protobuf will provide a `set_<field_name>()` function to set the value. e.g.

```c++    
myMsg.set_x(5);
```

For each non-primitive field in your message (e.g. another message type), protobuf provides a `set_allocated_<field_name>()` function. So, assuming your message had a field Header header, where Header is another message type, you could write:

```c++    
Header header;
myMsg.set_allocated_header(&header)
```

To modify the fields of header, you need to use the `mutable_<field_name>()` function call. e.g.

```c++    
myMsg.mutable_header()->set_crc("7F34");
```

`mutable_header()` returns a pointer to the header field in myMsg, and then you can use the normal `set_<field_name>()` function to write to header.

# Serialization/Deserialization

The main reason you are using protobuf objects is so that you can easily serialize and deserialize them, right?

This is easy to do, and the serialization/deserialization functions are **baked into the objects themselves**. To serialize a protobuf object into a string:

```c++    
std::string dataAsString;
myProtobufObject.SerializeToString(&dataAsString);
```

To deserialize a string of data into a protobuf object, use:

```c++    
std::string dataAsString = read(...);
myProtobufObject.ParseFromString(dataAsString);
```

Of course, once serialized into a string, you can **send the data over a serial communications protocol**, save it to file, send over a websocket e.t.c, before deserializing at the other end!

**Do you need a library for sending serial data** to/from a communication bus like UART, SPI or I2C? I recommend you have a look at [SerialFiller](https://github.com/mbedded-ninja/SerialFiller), a C++ serial publish/subscribe based communication protocol by myself (shameless plug).

# Protobuf And CMake

When working with protobuf, you usually want your build system to generate C++ source code from your .proto files at build time.

CMake ships with a `FindProtobuf.cmake` file, which allows you to do this in your `CMakeLists.txt`:

```    
find_package(Protobuf REQUIRED)
```

This will look for libprotobuf and the associated header files on your system.

This then exposes the macro `PROTOBUF_GENERATE_CPP`, which you can use to generate C++ source code from your .proto files!

```    
# Gather together all .proto files in the same directory as
# this CMakeLists.txt file
file(GLOB ProtoFiles "${CMAKE_CURRENT_SOURCE_DIR}/*.proto")

# Generate C++ source and header files from the .proto files
# found above
PROTOBUF_GENERATE_CPP(ProtoSources ProtoHeaders ${ProtoFiles})

# Package the source code into a library
add_library(messages STATIC ${ProtoSources} ${ProtoHeaders})

# Link our new messages library against the protobuf library
target_link_libraries(messages ${PROTOBUF_LIBRARY})
```

# Applications

protobuf is used with the Publish/Subscribe messaging system in the [Robotic Operating System (ROS)](http://www.ros.org/).
