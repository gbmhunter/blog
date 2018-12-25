---
author: gbmhunter
date: 2012-03-14 23:13:25+00:00
draft: false
title: Encryption
type: page
url: /programming/general/encryption
---

## Overview


There are two basic types of encryption used widely in computer science, symmetric and asymmetric algorithms. Symmetric algorithms use two identical or very similar keys to both encrypt and decrypt the information. Their main problem is that the sender and receiver need to share these keys securely before any transfer of information can take place, and you can't easily do that over the internet.

Then there is asymmetric algorithms, which include the popular public-key algorithms. This uses two mathematically related but different keys, one for encrypting, and one for decrypting. One is kept secret by the generator of the keys, the other is made public. Only the holder(s) of the decryption key can decipher the message, and only the holder(s) of the encryption key can encrypt a message.

When the decryption keys is kept private and the encryption-key made public

## Hash Functions

Hash functions are used in cryptograph to prove a digital signature of the sender

They normally take an any-sized block of data and return a fixed-size hash

A checksum, regularly used to verify data blocks over internet transmission protocols and between embedded devices on circuit boards, is a form of a hash function.

The ideal hash function is easy to compute the hash value- infeasible to generate a message with a given hash- infeasible to modify a message without changing the hash- infeasible to find two different messages with the same hash- posses the Avalanche effect

## Types Of Attacks

## Brute-Force Attack

This is when the attacker attempts to decipher the message by making random guesses at the key. The stronger the encryption (in expressed in terms of bits), the longer (on average), it would take an attacker to crack the code.

## Side-Channel Attacks

Using the time of computation or the CPU power usage while performing encryption/decryption to infer features about the key (and hence reducing the number set that the key could belong t0), resulting in

## Man-In-The-Middle Attacks

This is when a third party changes the public key half-way through a transmission to match their own private key.

## TEMPEST

TEMPEST is a term used to define the method of obtaining protected information from 'compromising emissions'.

Electronic, magnetic and acoustic ‘noise’ from an system containing encrypted information can be analysed to reveal the plaintext

Bell Labs were able to use a TEMPEST method on computer monitors to decipher 75% of the plaintext used in secure TTY connections during WWII at a distance of 80 feet

Also interesting to note, the LED’s on routers can also compromise data. The LED’s usually blink to indicate traffic, and with a fast enough optical system, you can get the exact bits/bytes, since they are usually connected straight onto the data line

## Traffic Analysis

Traffic analysis is all about intercepting and examining messages and inferring information from the patterns in communication

For example, in WWI and WWII, many Allied analysts managed to deduce the location and movement of enemy positions using traffic analysis. However, many of the reports weren’t heeded by the chain of command, and lives and resources were lost.

The timing of packets using internet protocols that send a packet everytime a key is pressed (such as SSH), can give away passwords (analysed using hidden Markov models).
