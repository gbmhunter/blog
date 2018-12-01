---
author: gbmhunter
date: 2016-01-15 04:39:12+00:00
draft: false
title: QP (Quantum Platform)
type: page
url: /programming/languages/qp-quantum-platform
---

# QM (QP Modeler)

A core part of QM is the graphical UML-based state machine diagrams.

# QS

## Printing Custom Messages

QSpy supports the printing of custom messages, which allows you to use it in the same way you would use a normal debug UART hooked up to microcontroller.

You can print pure strings with the QS_STR() macro:

```    
QS_STR("Hello, world.");
```

Unfortunately, QSpy doesn't support the printf()-style variable insertion into strings. Instead, to prints things such as numbers, you have to split the string up into multiple statements and print the number separately.

```
QS_U8, QS_U32
QS_ASSERT_ERROR
```

Will report file and line number.
