---
author: gbmhunter
date: 2015-04-22 05:18:51+00:00
draft: false
title: IO-Link Protocol
type: page
url: /electronics/communication-protocols/io-link-protocol
---

# Overview

The IO-Link protocol is a point-to-point serial communication protocol which is commonly used for sensor and actuator communication in an industrial environment.

# Packet Types

## Process Data

Process data is sent every communication cycle (typically 2ms).

## Service Data

Service data is used to send large amounts of non-periodic data at the request of the receipient. 

## Events

Events are unsolicited messages that convey information such as alarm status or info.
