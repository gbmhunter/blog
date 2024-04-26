---
authors: [Geoffrey Hunter]
date: 2024-04-24
description: 
draft: true
images: []
lastmod: 2024-04-24
tags: [serialization, protobuf, nanopb, embedded systems, microcontrollers, schemas, packets, messages, framing, escaping, delimiters]
title: Serialization for Embedded Systems
type: page
---

## Schema vs. Schemaless Serialization

Is it better to use a schema-based serialization format or a schemaless one for embedded systems? I generally think formats with schemas are a better fit for embedded systems, because:

1. It allows for the creation of structs or classes in the embedded code that match the schema, which can be used to serialize and deserialize messages. Dynamic memory allocation, and without these schema created structs it can be hard to represent the data without dynamic memory allocation (which is avoided at runtime in many embedded systems).
2. The schema provides a way of defining and documenting your "API" for the messages that are sent between devices. In typed languages this can improve the developer experience because your message types can be objects containing the message fields.

Schema based serialization formats include protobuf, Cap'n Proto, and FlatBuffers. Schemaless serialization formats include JSON, CBOR, and MessagePack.

## protobuf

protobuf is a schema-based binary serialization format developed by Google. It is one of the most popular serialization formats. The schema (the message definitions) is defined in a `.proto` file. protobuf is officially supported in C++, Java, Python and other languages. One language that is not officially supported is C! Thankfully, there is a popular 3rd party tool called nanopb which provides support for C, and is well-suited for use on embedded systems. For each language, protobuf comes in two parts:

1. A compiler that takes the `.proto` file and generates objects representing each message in the target language.
1. A runtime library that provides functions to serialize and deserialize messages.

Protobuf serializes each variable in a message into a tag (a unique variable ID) and the variable value. Providing a tag for each variable in a message might seem like a waste. Why not just send them in order and get rid of all the bytes that the tags take up? The reason is to allow for both forwards and backwards compatibility when the message format changes. The ids allow newer code to receive an old message and create default values for variables that are not present, and older code to receive a new message and just ignore variables that it doesn't know about. It also allows for optional variables. You can't just append new variables to the end of the message. What happens if that message is then used somewhere else in the middle of a bigger message?

Let's look at a basic example to see how protobuf works. Here is a simple `.proto` file:

```proto
message myMessage
{
  uint32 myInt = 1;
}
```

We'll set `myInt` to `7`. This encodes to (I'm using https://www.protobufpal.com/ to generate the encoded message):

```text
08 07
```

The first byte `0x08` is the tag shifted left by 3 bits (`1 << 3`). You can see this by changing the tag to 2 and seeing that the first byte changes to `0x10` (3 = `0x18`, ...). The second byte `0x07` is the value of the variable. Any `uint32` up to `127` uses 2 bytes (1 byte for the tag and other data, 1 byte for the value). `128` uses 3 bytes:

```text
Value Encoded Msg.
7     08 07
127   08 7F
128   08 80 01
```

protobuf supports a lot of nice types like `string` which is useful in the embedded world for serializing arbitrary length `char *`. It also supports `bytes` which is useful for serializing binary data. It also supports `repeated` which is useful for serializing arbitrary lengths of other types.

One of it's downsides for embedded systems is the lack of small variable types. It provides `uint32` or `bytes` type (array of bytes), but no `uint8`, `uint16` or bitfields! It does do clever serialization though and will encode small `uint32` numbers in less than 4 bytes (as we saw above). However, we still lack the expressiveness of smaller types. And when using nanopb, by default `uint32`s, will all map to `uint32_t` in the generated structs, which may be a memory issue for some users. Luckily, nanopb provides a way of specifying smaller types in the .proto file, so that the resulting structs use smaller type (presumably an error is thrown during decoding if nanopb received an encoded number that doesn't fit in the smaller type).

protobuf knows how to decode a sequence of received bytes into a message as long as you know:

1. The message type of the message.
1. You provide it with the exact bytes that were used to create the message.

This leaves you with two problems if you are sending the encoded bytes in a stream-like fashion, i.e. across a UART:

1. How do you know the type of the message, if you want to send more that one type of message?
1. How do you know when one message ends and the next one starts?

## The Message Type

There are a few ways to solve the problem of not knowing the message type. One way is 

Higher-level languages can solve this problem by using a RPC client. gRPC would be the obvious choice if using protobuf, as it's built on top of protobuf, with the RPC definitions being defined alongside the message definitions in the `.proto` file. This is not a great solution for low-level embedded systems though, as the gRPC server and client are quite heavy. There are embedded orientated RPC libraries like eRPC but they are not as well supported as protobuf for higher level languages.

### The enum Method

One solution is to use a `enum` to define the message types and then send that along with your message (e.g. in the header before the message, we'll cover the header in more detail later). Here is an example of this in a `.proto` file:

```proto
enum MessageType
{
  HelloMessage = 1;
  GoodbyeMessage = 2;
}

message HelloMessage
{
  string greeting = 1;
}

message GoodbyeMessage
{
  string greeting = 1;
}
```

### The oneof Method

A different approach is to use protobuf's `oneof` functionality, and create a wrapper message which contains `oneof` all the possible messages that can be sent. `oneof` allows you specify a field which can be one of a number of different types (think of it like a union). Here is an example of this in a `.proto` file:

```proto
message WrapperMsg
{
  oneof innerMsg {
    HelloMsg helloMsg = 1;
    GoodbyeMsg goodbyeMsg = 2;
  }
}

message HelloMsg
{
  string greeting = 1;
}

message GoodbyeMsg
{
  string greeting = 1;
}
```

Behind the scenes, protobuf will encode an ID for each possible message in the oneof field, and expose a way in each programming language to be able to determine which type it is. In a way, this is very similar to the enum method above, except that protobuf is generating the enum and including it in the message, rather than you adding it to a header.

One further benefit from the wrapped message approach is that you can add additional generic fields to the wrapper message which will then be added to all messages. For example, this could be useful for holding things such as a timestamp or CRC checksum.

## Escaping and Framing

protobuf does not provide a way to determine when one message ends and the next one starts. Again, this is a problem if you want to send messages in a stream-like fashion. The solution to this is to further process the protobuf-encoded message by adding a specific end-of-packet delimiter. You then have to make sure to escape all occurrences of the delimiter in the message. This is called "escaping and framing".

For example, you could pick the end-of-packet delimiter to be `0xFE` (it's a good idea to avoid commonly occurring bytes like `0x00` or `0xFF` so that you don't have to escape as many bytes). We will also pick a start-of-packet delimiter. This is not mandatory, but allows us to throw away bytes easily for example if we connect to the other device half-way through a packet. Let's use `0xFD`. We also need to pick an escape character, let's choose `0xFC`.

Then during encoding:

* Every time we come across the end-of-packet delimiter `0xFE`, replace it with `0xFC 0x00`.
* Every time we come across the start-of-packet delimiter `0xFD`, replace it with `0xFC 0x01`.
* Every time we come across the escape character `0xFC`, replace it with `0xFC 0x02` (this is escaping the escape character).

Now we have a message which is guaranteed to have no `0xFE` nor `0xFD` bytes in it, as we can safely prefix and suffix these bytes to the message as unique start-of-packet and end-of-packet identifiers.

What does the receiver do? The receiver throws away bytes until it receives a start-of-packet delimiter. Then it buffers received bytes until it receives an end-of-packet delimiter. Then it performs the reverse of the escaping process to get the original protobuf encoded message. This can then be decoded with protobuf if you used the `oneof` method above.

If you decided to use the enum method to determine the message type, you would need to add the message type to the start of the encoded protobuf message before the escaping and framing process. You would then unpack this during decoding and calling the correct decode function based on the message type. Another thing you may want to do is add a CRC checksum. This would be added to the header similarly to the message type, and ideally be calculated over the protobuf encoded message and the message type enum (if used).

{{% aside type="tip" %}}
If you are worried about how many extra bytes the escaping might add, take a look at [COBS (Constant Overhead Byte Stuffing)](/programming/serialization-formats/consistent-overhead-byte-stuffing-cobs/). It's a clever method of escaping and framing which has a maximum escaping overhead of 1 byte per 254 bytes of data.
{{% /aside %}}

### nanopb

If the lack of smaller types is a show stopper for you, have a look at [bitproto](https://bitproto.readthedocs.io/en/latest/) (more on this in the [Alternatives](#alternatives) section).

## Alternatives

[bitproto](https://bitproto.readthedocs.io/en/latest/) is a protobuf-like serialization format which allows you to specify variable widths on the bit level, eliminating some of protobuf's shortcomings when it comes to specifying small data types. It uses similar looking files to protobuf to describe messages.

{{% figure src="_assets/bitproto-logo.png" width="200px" caption="The bitproto logo." %}}

## References

[^bitproto-homepage]: bitproto. _Homepage_. Retrieved 2024-04-24, from https://bitproto.readthedocs.io/en/latest/.
