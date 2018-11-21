---
author: gbmhunter
date: 2013-04-14 06:02:10+00:00
draft: false
title: Keyboard Driver
type: page
url: /programming/operating-systems/windows/windows-driver-development/keyboard-driver
---

typedef struct _KEYBOARD_INPUT_DATA {
      USHORT UnitId;
      USHORT MakeCode;
      USHORT Flags;
      USHORT Reserved;
      ULONG  ExtraInformation;
    } KEYBOARD_INPUT_DATA, *PKEYBOARD_INPUT_DATA;
