#!/usr/bin/env python3

import os
import shutil

for root, dirs, files in os.walk('../content/pages/'):
    # Move file only if it is called _index.md AND the only thing in the directory
    if len(files) == 1 and len(dirs) == 0 and files[0] == '_index.md':

        new_filename = os.path.basename(root) + '.md'
        new_dir = os.path.abspath(os.path.join(root, os.pardir))

        # Move markdown file and rename
        old_path = os.path.join(root, files[0])
        new_path = os.path.join(new_dir, new_filename)
        print(f'Moving file from {old_path} to {new_path}.')
        shutil.move(old_path, new_path)

        print(f'Deleting the directory {root}.')
        os.rmdir(root)