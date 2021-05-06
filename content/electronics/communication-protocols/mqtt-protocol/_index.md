---
author: "gbmhunter"
categories: [ "Electronics", "Communication Protocols" ]
date: 2014-02-16
description: "History, brokers, clients, Mosquitto, Puho and more information about the MQTT communications protocol."
draft: false
lastmod: 2021-05-06
tags: [ "electronics", "communication protocols", "MQTT", "paho", "Python", "TLS", "SSL", "1883", "8883", "brokers", "clients" ]
title: "MQTT Protocol"
type: "page"
---

{{% warning-is-notes %}}

## Overview

MQTT is a lightweight publish/subscribe communications protocol that uses TCP/IP (and other secondary transport mechanisms). It is designed for remote sensors to communicate with controlling devices. The specification is under a royalty-free licence. Interesting features of the protocol include the one-to-many messaging service (publish/subscribe), the Last Will/Testament feature, and the three qualities of service. You can read more about it [here](http://www.ibm.com/developerworks/webservices/library/ws-mqtt/index.html).

{{% figure src="mqtt-logo.png" width="500px" caption="The MQTT logo. Image from https://www.eclipse.org/paho/, acquired 2021-03-30." %}}

## History

MQTT was initially released in a partnership between IBM and Arcom in 1998. As of 2021-03, the latest version is v5.0.

## MQTT Brokers

Mosquitto is a very popular open-source MQTT broker.

Online test/sandbox brokers:

* <mqtt.eclipse.org>

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

[Paho](https://pypi.org/project/paho-mqtt/) is a popular MQTT client. It's API is reasonably well documented at <https://pypi.org/project/paho-mqtt/>.

You can install Paho the standard way using `pip`:

```python
pip install paho-mqtt
```

The Paho library can then be imported into your Python files with:

```python
import paho.mqtt.client as mqtt
```

To request that the client creates the connection by suppling a username and password, call `username_pw_set()` on the client before calling `connect()`:

```python
client.username_pw_set('admin', 'password')
client.connect_async(self.broker_address, 1883, 60)
```

