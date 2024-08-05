---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux" ]
date: 2018-12-03
description: "A bash script that can quickly monitor disk usage and report disk usage warnings to the user."
last_update:
  date: 2018-12-03
  author: Geoffrey Hunter
tags: [ "bash", "scripts", "disks", "space", "df", "devices", "ssh" ]
title: "Bash Script For Monitoring Disk Usage"
---

## The Problem

Sometimes it would be nice if you could keep an eye on the disk space usage of a Linux machine. You can do this manually using the `df` command, but sometimes you forget to check for a while, and only discover the problem when you start experiencing disk full errors. Wouldn't it be nice if perhaps we could automate this somewhat, and report back if certain disks where almost full?

And what if we could check everytime we startup/login/ssh into a machine?

## The Script

This script relies on `bash` being installed on the system. It also relies on ANSI escape code support (which is pretty well supported).

```sh
#!/usr/bin/env bash
# This script checks the free-space left on disks, and then prints a warning to stdout if any
# exceed a particular threshold
PERC_THRESHOLD=80

IGNORED_DISKS=("/dev/ignored_disk1", "/dev/ignored_disk2")

echo "Checking free space on disks..."
first_time_through_loop=true
df --output='source,pcent' -h | while read x; do
        # First line if header, ignore
        if [ "$first_time_through_loop" = true ]; then
                first_time_through_loop=false
                continue
        fi

        disk=$(echo $x | cut -f1 -s -d ' ')

        # Ignore disk if in ignore list
        ignore_disk=false
        for ignored_disk in "${IGNORED_DISKS[@]}"
        do
                if [ "$disk" == "$ignored_disk" ]; then
                        ignore_disk=true
                fi
        done
        if [ "$ignore_disk" = true ]; then
                continue
        fi

        perc=$(echo $x | cut -f2 -s -d ' ' | tr -d %);
        if [ $perc -gt $PERC_THRESHOLD ]; then
                echo -e "\e[31mWARNING: Disk $disk is $perc% full.\e[0m"
        fi
done
```

## Configurable Threshold And Ignored Disks

You can configure the percentage threshold at which full disks are reported by modifying the `PERC_THRESHOLD` variable (default is 80% and above).

Sometimes you may want to ignore particular mounted disks which are always near full (e.g. boot partitions). To do this, add the path to the mounted disk to the `IGNORED_DISKS` array.

## How To Make It Run On Startup/ssh Login

To do this, I added the above code to the file `~/bash_profile`. Do not add it to `~/.ssh/rc`, as this can cause X11 forwarding problems (and you can get the error: `X11 connection rejected because of wrong authentication.`).

Now, everytime you ssh into the machine, any disk space warnings will be printed to your console.

It will look something like this:

```bash
gbmhunter@local$ ssh remote
Checking free space on disks...
WARNING: Disk /dev/sdc1 is 87% full.
gbmhunter@remote:~$
```

