---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Communication Protocols ]
date: 2014-02-16
description: History, brokers, clients, Mosquitto, Paho, embedded MQTT clients and more information about the MQTT communications protocol.
draft: false
lastmod: 2022-06-20
tags: [ electronics, communication protocols, MQTT, paho, Python, TLS, SSL, "1883", "8883", brokers, clients, coreMQTT, embedded, IoT, MQTT-SN, sensor networks, ZigBee ]
title: MQTT Protocol
type: page
---

{{% warning-is-notes %}}

## Overview

MQTT is a lightweight publish/subscribe communications protocol that uses TCP/IP (and other secondary transport mechanisms). It is designed for remote sensors to communicate with controlling devices. The specification is under a royalty-free licence. Interesting features of the protocol include the one-to-many messaging service (publish/subscribe), the Last Will/Testament feature, and the three qualities of service. You can read more about it [here](http://www.ibm.com/developerworks/webservices/library/ws-mqtt/index.html).

{{% img src="mqtt-logo.png" width="500" caption="The MQTT logo. Image from https://www.eclipse.org/paho/, acquired 2021-03-30." %}}

## History

MQTT was initially released in a partnership between IBM and Arcom in 1998. As of 2021-03, the latest version is v5.0.

## MQTT Brokers

Mosquitto is a very popular open-source MQTT broker.

Online test/sandbox brokers:

* mqtt.eclipse.org

### Mosquitto

#### Installation

**Windows**:

Mosquitto can be installed on Windows by downloading the pre-compiled binaries. The x64 version will be installed in a path similar to `C:\Program Files\Mosquitto`. You will likely want to add that directory path to your system path so that you can call `mosquitto` from the command line.

#### Running

If you have added the installation directory to your system path, you can invoke `mosquitto` with:

```bash
mosquitto
```

By default the above command will start a MQTT broker listening on port `1883` (the default port for non-encrypted traffic). The broker will not run as a daemon, so you can stop the broker with `Ctrl-C` (or equivalent). It also uses the following defaults:

- No authentication

You can listen to all system topics by subscribing to `$SYS/#`.

If you are experiencing problems when running `mosquitto`, you might want to run in verbose mode `-v` to print debug information, as by default very little information is printed to the command-line:

```bash
$ mosquitto -v
```

`1883` is the default port for unencrypted traffic. `8883` is the default port for traffic encrypted with SSL/TLS.

#### Common Errors

`Client <client-name> disconnected due to protocol error.`: Can be due to the client requesting TLS/SSL encryption on the non-encrypted `1883` port.

`ssl3_read_bytes:tlsv1 alert unknown ca`: Broker does not recognize the CA sent by the connecting client.

#### Creating Password Files

`mosquitto_passwd` is a utility provided alongside `mosquitto` which can generate password files for `mosquitto`. These password files control user access to the broker.

## MQTT Clients

[Paho](https://pypi.org/project/paho-mqtt/) is a popular MQTT client for Desktop and server machines running Windows, Linux or macOS. It's API is reasonably well documented at https://pypi.org/project/paho-mqtt/.

You can install Paho the standard way using `pip`:

```python
pip install paho-mqtt
```

The Paho library can then be imported into your Python files with:

```python
import paho.mqtt.client as mqtt
```

To request that the client creates the connection by supplying a username and password, call `username_pw_set()` on the client before calling `connect()`:

```python
client.username_pw_set('admin', 'password')
client.connect_async(self.broker_address, 1883, 60)
```

### MQTT Clients For Embedded Devices

There are a number of MQTT clients designed for embedded devices, these include:

* [**The embedded Paho MQTT client**](https://www.eclipse.org/paho/index.php?page=clients/c/embedded/index.php): Embedded version of the popular Paho MQTT client. It is released as two separate APIs:
    * MQTTPacket: Low-level C library that deals with the serialization/deserialization of MQTT packets.
    * MQTTClient: Higher-level C++ library first written for the mbed platform. Depends on MQTTPacket.
* [**arduino-mqtt**](https://github.com/256dpi/arduino-mqtt): Arduino wrapper around the lwmqtt MQTT client. Also available for PlatformIO. This one is pretty popular and is recommended in the AWS IoT tutorials.
* **coreMQTT**: MQTT client maintained by the FreeRTOS group (however, the library does not depend on FreeRTOS to operate).

## MQTT-SN

MQTT-SN (MQTT for Sensor Networks, previously known as just MQTT-S[^bib-mqtt-mqtt-specifications]) is a version of the MQTT protocol which has been optimized use on low-power, low-performance, wireless IoT devices. It is designed to work on non-TCP/IP networks, such as Zigbee[^bib-mqtt-mqtt-specifications].

Some of the changes include:

1. Shortened two-byte topic aliases are used instead of full topic names (strings)[^bib-ublox-mqtt-sn]. This can cut down on the amount of bytes sent for topic identification considerably, e.g. the topic name `device1/sensor5/temperature` now just becomes topic ID `5`.

The complete specification for MQTT-SN is called _MQTT For Sensor Networks (MQTT-SN) Protocol Specification: Version 1.2_ and can be downloaded for free from https://www.oasis-open.org/committees/download.php/66091/MQTT-SN_spec_v1.2.pdf.

> MQTT-SN is designed in such a way that it is agnostic of the underlying networking services. Any network
which provides a bi-directional data transfer service between any node and a particular one (a gateway) should
be able to support MQTT-SN[^bib-oasis-open-mqtt-protocol-spec-v1.2].

## References

[^bib-ublox-mqtt-sn]: ublox (2020, Jun 16). _MQTT-SN – lowering the cost of IoT at scale_. Retrieved 2022-06-20, from https://www.u-blox.com/en/blogs/insights/mqtt-sn.
[^bib-mqtt-mqtt-specifications]: MQTT. _MQTT Specifications_. Retrieved 2022-06-20, from https://mqtt.org/mqtt-specification/.
[^bib-oasis-open-mqtt-protocol-spec-v1.2]: Andy Stanford-Clark and Hong Linh Truong (2013, Nov 14). _MQTT For Sensor Networks (MQTT-SN) Protocol Specification: Version 1.2_. Retrieved 2022-06-21, from https://www.oasis-open.org/committees/download.php/66091/MQTT-SN_spec_v1.2.pdf.
