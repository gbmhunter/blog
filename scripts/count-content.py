"""
Use this script to count the number of posts and pages in the mbedded.ninja blog.
Used for gathering statistics for the 'Happy New Year XXXX' posts.
"""

from pathlib import Path
import os

rootdir = Path('C:/Users/gbmhu/code/blog/content')

count = 0
for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        if file.endswith('.md'):
            count += 1
print(f'Total num. of .md files = {count}')