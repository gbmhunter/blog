---
authors: [ "Geoffrey Hunter" ]
date: 2016-12-21
draft: false
title: Topics (Publishers And Subscribers)
type: page
---

## Overview

ROS provides a publish and subscribe mechanism on message buses called topics.

More information about the ROS messages can be found on the [Messages page](/robotics/ros/messages).

## Custom Subscriber Callbacks

You can implement custom subscriber callbacks by using the boost::bind class.

```c++    
void MyClass::Load() {
    // Create ROS subscriber
    ros::Subscriber sub = nodeHandle->subscribe<MsgType>(
        "topic_name",
        1,
        // Here is where the magic happens, "hello!" will be passed
        // into the callback also
        boost::bind(&MyClass::Callback, this, _1, "hello!"));
    }

    void MyClass::Callback(const MsgType& msg, std::string myNewParam) {
    std::cout << "Passed in custom parameter = " << myNewParm << std::endl;
}
```

## Smart Pointer Behaviour

Subscribers have built-in smart pointer like behaviour.

Once all copies of a subscriber go out of scope, the callback function will not be called any-more. Once all subscribers for a particular topic go out of scope, the topic will be un-subscribed.
