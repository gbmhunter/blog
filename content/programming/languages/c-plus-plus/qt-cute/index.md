---
author: "gbmhunter"
categories: [ "Programming", "Programming Languages", "C++" ]
date: 2017-09-28
description: "Info about the the Qt software framework/library, including threading, serial ports and more."
draft: false
lastmod: 2019-06-27
tags: [ "programming", "programming languages", "C++", "Qt", "QSerialPort", "signals", "slots", "QObject", "PySide2" ]
title: "Qt (cute)"
type: "page"
---

## Overview

Qt is a software framework and library aimed at developing GUIs. It's primary API is exposed in C++, although it provides the ability to write the UI in Javacript (or at least partially) through the QML API and has Python bindings through the officially supported PySide2 bindings.

## Threading

Qt is designed around an event/listener paradigm (which they call _signals_ and _slots_) which promotes an event driven design over blocking method calls.

All UI interaction must occur in one thread (the default UI thread). It is not advisable to add blocking calls in this thread as this will make the UI unresponsive while the thread is blocked.

## Serial Port (QSerialPort)

Qt allows you to access serial ports on the machine via the `QSerialPort` class. Note that serial port operations such as reading and writing must be done from the same thread. In that respect, if you do need to do both reading and writing, it is best not to use a blocking approach for reading, as you can not both block on a read call and send data at the same time. The better alternative is to use the readyRead signal

## Compatibility With std Library

**Qt Threads and std::condition_variable**

In my experience, `std::condition_variable` seems to work without any issues when within a Qt thread.

## Unused Parameter 'xxx'

Qt can provide warnings when function parameters are unused. This can be a good thing, however it can be annoying and clutter up the compile output when you are purposely ignoring function parameters.

```c++    
void doSomething(QObject* parent) {
    ...
}
```

To remove this warning, you can either delete the name of the unused parameter from the function definition:

```c++    
void doSomething(QObject* /* unused */) {
    ...
}
```

Or use the `Q_UNUSED()` macro:

```c++    
void doSomething(QObject* parent) {
    Q_UNUSED(parent);
    ...
}
```

## Connecting Signals And Slots

Prior to Qt5, you have to use the `SIGNAL()` and `SLOT()` macros in the call to `connect()`:

```c++    
connect(&a, SIGNAL(MySignal(int)), &b, SLOT(MySlot(int));
```

Qt5 introduced a new syntax for connecting signals to slots:

```c++    
connect(&a, a::MySignal, &b, b::MySlot);
```

This new syntax for `connect()` has the following benefits:

* Will produce compile errors if the signal/slot does not exist (this is a VERY good advantage)
* Will produce compile errors if the types do not match (another good pro!)
* Input parameters do not need to be specified (although this does have its drawbacks when the signal or slot is overloaded, see below)

I recommend the new Qt5 syntax wherever possible!

However, this syntax won't work if there is more than one signal with the same name (i.e. an overloaded signal). An example of this would be the `QComboBox::activated()` signal, which has the following two overloads:

```c++    
void activated(int index)
void activated(const QString& text)
```

If you were trying to connect the `activated(int index)` signal to your custom handler, this you would have to do the following:

```c++    
class A {
signals:
    HandleActivated(int index) : public QObject {
        std::cout << "Handler called!" << std::endl;
    }
};

int main() {
    QComboBox qComboBox;
    A a;

    // This won't work, will throw compiler error!
    connect(&qComboBox, &QComboBox::activated, &a, &A::HandleActivated); 

    // Instead, you have to cast to the specific overload of activated that
    // you wish to use
    connect(&qComboBox, static_cast<void (QComboBox::*)(int)>(&QComboBox::activated), this, &A::HandleActivated);
}
```
