---
authors: [ "Geoffrey Hunter" ]
categories: [ "Posts", "Updates" ]
date: 2019-10-31
description: "Blog updates during October 2019."
draft: false
lastmod: 2019-10-31
tags: []
title: "October 2019 Updates"
type: "post"
---

* Updated the {{% link src="/programming/operating-systems/linux/programs/mv-move" text="mv (move) page" %}} with information on using extended bash glob extensions to provide exclusion patterns.

    ```sh
    $ mkdir new_sub_dir # Create a new sub-directory to move all files/directories in PWD into
    $ mv !(new_sub_dir) new_sub_dir # Move all files/directories in PWD into new_sub_dir, excluding new_sub_dir itself (avoiding the obvious recursion problem)
    ```

* The {{% link text="Introduction To Rotation Matrices page" src="/mathematics/geometry/rotation-matrices" %}} has been updated with tutorials/example on how to combine rotation matrices and how to calculate the rotation matrix to describe the rotation between two reference frames, as well as a section on how to convert RPY (roll-pitch-yaw, or _Euler angles_) to rotation matrices.

    <p>$$
    \mathbf{R} = \begin{bmatrix} \hat{u_x} & \hat{v_x} & \hat{w_x} \\ \hat{u_y} & \hat{v_y} & \hat{w_y} \\ \hat{u_z} & \hat{v_z} & \hat{w_z} \end{bmatrix}
    $$</p>

* Added an interactive 3D rotation visualizer to the {{% link text="Quaternion page" src="/mathematics/geometry/quaternions#3d-rotation" %}}, which shows you how a right-hand coordinate system XYZ is rotated in 3D space by either a rotation matrix, quaternion, or angle-axis rotation. This tool is also very useful to convert between the three ways of describing a rotation (when you enter a rotation in one notation, the other two get updated automatically).

    {{% figure src="3d-rotation-visualizer-screenshot.png" width="500px" caption="A screenshot of the 3D rotation visualizer and converter." %}}