---
authors: [ "Geoffrey Hunter" ]
date: 2016-12-12
draft: false
title: Gazebo
type: page
---

## Topics

### Topic Info At Runtime

A list of all the Gazebo topics running on the system can be found with the command:

```sh   
gz topic -l
```

Make sure Gazebo is running (the server) first.

### Naming Conventions

The tilde (`~`) in a topic name will be replaced with the default world path. Usually this is `/gazebo/default`.

## Nodes

A Gazebo Node (`gazebo::transport::Node`) can advertise and subscribe to topics. The recommended way to create a Gazebo Node is through the use of the NodePtr type, which wraps a Node up in `boost::shared_ptr`.

```c++    
gazebo::transport::NodePtr nodePtr = transport::NodePtr(new transport::Node());
```

The initialisation method, `Node::Init()`, sets the global namespace of all topics. Note that `Init()` **does not have to be called** for you to be able to use the Node.

## Publishers

Publishers are entities which publish messages onto a topic. Publishers can be created by calling the `Advertise()` method of a node handle. An example would be:

```c++    
imu_pub_ = node_handle_->Advertise<sensor_msgs::Imu>("~/imu", 1);
```

`Advertise()` returns a pointer to the publisher. This can be used later to publish messages.

## Plugins

Plugins are compiled are a shared library and are linked to Gazebo at runtime when needed.

All plugins must be defined in the gazebo namespace. There are the following types of plugins:

<table>
  <thead>
    <tr>
      <th>Plugin Type</th>
      <th>Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GUI</td>
      <td>Provides a GUI overlay. QT widgets can be added to the GUI through the plugin API. This can be used for something as simple as displaying the time or as complicated as a parameter entry form.</td>
    </tr>
    <tr>
      <td>Model</td>
      <td>Attached to a model.</td>
    </tr>
    <tr>
      <td>Sensor</td>
      <td>Must inherit from SensorPlugin.</td>
    </tr>
    <tr>
      <td>System</td>
      <td>System plugins are called at startup, before Gazebo is loaded. That allows them to configure the system in special ways.</td>
    </tr>
    <tr>
      <td>World</td>
      <td>Attached to a world.</td>
    </tr>
    <tr>
      <td>Visual</td>
      <td></td>
    </tr>
  </tbody>
</table>

For each type of plugin there is a corresponding `GZ_REGISTER_xxx_PLUGIN(<class name>)` macro for registering the plugin to the Gazebo engine.

### Loading Plugins

When Gazebo tries to load a plugin, it either loads the full path (if a full path name was specified), or searches through the directories specified by the environment variable `GAZEBO_PLUGIN_PATH`.

### Existing Plugins

#### hector_gazebo_plugins

URL: [http://wiki.ros.org/hector_gazebo_plugins](http://wiki.ros.org/hector_gazebo_plugins)

As of Dec 2016 this package has 5 plugins:

* `DiffDrivePlugin6W`
* `GazeboRosImu`
* `GazeboRosGps` - Publishes SatNavFix messages regarding the robots location in WGS84 coordinates.
* `GazeboRosMagnetic`
* `GazeboRosSonar`

## Asserts

Gazebo provides a standard way to provide assertions through the macro:

```c++    
GZ_ASSERT(_expr, _msg)
```

A standard example of using this macro would be:

```c++    
GZ_ASSERT(x == 2, "x must equal 2.");
```

`GZ_ASSERT` is just a wrapper around `BOOST_ASSERT_MSG()`.

## Error Messages

### No namespace found

The error message might look something like:

```text
[Err] [Node.cc:105] No namespace found
```

This is usually because a `.world` file is loaded which contains external models which Gazebo tries to pull in from the model repository.

The exact line of code which prints this error can be found in the [Node.cc file on BitBucket](https://bitbucket.org/osrf/gazebo/src/a1fb370811b64723827c4e40fa3867ccbd8fd584/gazebo/transport/Node.cc?at=default&fileviewer=file-view-default).

## World Files

World files contain all elements of a simulation, including robots, lights, sensors, and static objects. The files are in `SDF` format, and typically have a `.world` extension (this is not strictly enforced).

Models can be included into world files with the following syntax:

```xml    
<include>
    <uri>model://model_file_name</uri>
</include>
```

If Gazebo has internet connectivity, it will search it's [online model database](https://bitbucket.org/osrf/gazebo_models) and download the appropriate models.

## Environment Variables

Gazebo uses environment variables to configure how it operates. It uses the following environment variables:

<table>
  <thead>
    <tr>
      <th>Variable Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>GAZEBO_MODEL_PATH</code></td>
      <td>Colon-separated set of directories where Gazebo will search for models</td>
    </tr>
    <tr>
      <td><code>GAZEBO_RESOURCE_PATH</code></td>
      <td>Colon-separated set of directories where Gazebo will search for other resources such as world and media files.</td>
    </tr>
    <tr>
      <td><code>GAZEBO_MASTER_URI</code></td>
      <td>URI of the Gazebo master. This specifies the IP and port where the server will be started and tells the clients where to connect to.</td>
    </tr>
    <tr>
      <td><code>GAZEBO_PLUGIN_PATH</code></td>
      <td>Colon-separated set of directories where Gazebo will search for the plugin shared libraries at runtime.</td>
    </tr>
    <tr>
      <td><code>GAZEBO_MODEL_DATABASE_URI</code></td>
      <td>URI of the online model database where Gazebo will download models from. You can set this to an empty string ("") to prevent Gazebo from downloading models (i.e. they are all provided locally).</td>
    </tr>
  </tbody>
</table>

All of the above environment variables are set to sensible defaults by Gazebo.