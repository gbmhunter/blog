---
authors: [Geoffrey Hunter]
date: 2024-04-24
description: 
draft: true
images: []
lastmod: 2024-04-24
tags: [serialization]
title: Serialization for Embedded Systems
type: page
---

## Schema vs. Schemaless Serialization

Is it better to use a schema-based serialization format or a schemaless one for embedded systems? I generally think formats with schemas are a better fit for embedded systems, because:

1. It allows for the creation of structs or classes in the embedded code that match the schema, which can be used to serialize and deserialize messages. Dynamic memory allocation, and without these schema created structs it can be hard to represent the data without dynamic memory allocation (which is avoided at runtime in many embedded systems).
2. The schema provides a way of defining and documenting your "API" for the messages that are sent between devices.

## protobuf

protobuf is a schema-based binary serialization format developed by Google. It is one of the most popular serialization formats. The schema (the message definitions) is defined in a `.proto` file.

Protobuf serializes each variable in a message into a tag (a unique variable ID) and the variable value. Providing a tag for each variable in a message might seem like a waste. Why not just send them in order and get rid of all the bytes that the tags take up? The reason is to allow for both forwards and backwards compatibility when the message format changes. The ids allow newer code to receive an old message and create default values for variables that are not present, and older code to receive a new message and just ignore variables that it doesn't know about.

```proto
msg MyMessage {
    uint32 my_int = 1;
    string my_string = 2;
}

```

One of it's downsides for embedded systems is the lack of small variable types. It provides `uint32` or `bytes` type (array of bytes), but no `uint8`, `uint16` or bitfields! It does do clever serialization though and will encode small `uint32` numbers in less than 4 bytes. However, we still lack the expressiveness of smaller types. And when using nanopb, by default `uint32`s, will all map to `uint32_t` in the generated structs, which may be a memory issue for some users.

If the lack of smaller types is a show stopper for you, have a look at [bitproto](https://bitproto.readthedocs.io/en/latest/) (more on this in the [Alternatives](#alternatives) section).

## Alternatives

[bitproto](https://bitproto.readthedocs.io/en/latest/) is a protobuf-like serialization format which allows you to specify variable widths on the bit level, eliminating some of protobuf's shortcomings when it comes to specifying small data types. It uses similar looking files to protobuf to describe messages.

bitproto-logo.png
{{% figure src="_assets/bitproto-logo.png" caption="The bitproto logo." %}}

## References

[^bitproto-homepage]: bitproto. _Homepage_. Retrieved 2024-04-24, from https://bitproto.readthedocs.io/en/latest/.
