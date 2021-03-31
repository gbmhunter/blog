---
author: "gbmhunter"
categories: [ "Electronics", "Communication Protocols" ]
date: 2014-02-16
description: "History, brokers, clients, Mosquitto, Puho and more information about the MQTT communications protocol."
draft: false
lastmod: 2021-03-30
tags: [ "electronics", "communication protocols", "MQTT" ]
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

By default the above command will start a MQTT broker listening on port `1883`. The broker will not run as a daemon, so you can stop the broker with `Ctrl-C` (or equivalent).

You can listen to all system topics by subscribing to `$SYS/#`.

## MQTT Clients

Paho is a popular MQTT client.

