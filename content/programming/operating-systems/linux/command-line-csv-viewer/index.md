---
author: gbmhunter
categories: [ "Programming", "Operating Systems", "Linux" ]
date: 2019-06-18
draft: false
lastmod: 2019-06-18
tags: [ "bash", "scripts", "CSV", "command-line", "viewer" ]
title: "Command-Line CSV Viewer"
---

1. Create a new file called `csv` in `/usr/bin/` (or in `/usr/bin/local/` if it exists in your distro):

    ```bash
    $ sudo vim /usr/bin/csv
    ```

2. Paste the following code into the file (credit goes to [Benjamin Noakes](https://github.com/benjaminoakes/utilities/blob/master/view-csv) for this code):

    ```bash
    #!/usr/bin/env bash
    # Author: Benjamin Oakes <hello@benjaminoakes.com>
    set -o errexit

    function show_usage {
      cat <<EOF
    Usage: $0 [--help] [filename]
    View a CSV file at the command line.
      --help        Show this help text.
      filename      CSV file to be viewed
    EOF
      exit -1
    }

    if [ "$1" == "--help" -o "$1" == "" ]; then
      show_usage
    fi

    cat "$1" | column -s, -t | less -#2 -N -S
    ```

3. Exit vim (good luck!). Make this script executable:

    ```bash
    $ sudo chmod +x ./csv
    ```

4. All done! As long as `/usr/bin/` is on your `PATH`, you should be able to nicely display CSV files in the command line with:

    ```bash
    $ csv my_file.csv
    ```