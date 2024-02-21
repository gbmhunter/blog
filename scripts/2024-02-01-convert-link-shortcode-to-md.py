"""
This script replaces link shortcodes in the form {{% link ... %}} with standard markdown links in the form [text](src).
"""
from pathlib import Path
import re

from power_edit import PowerEdit

SCRIPT_DIR = Path(__file__).parent.resolve()

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = False

    globPattern = str(SCRIPT_DIR) + '/../content/pcb-design/component-packages/**/index.md'
    files = power_edit.find_files(globPattern, recursive=True)

    def replace_fn(found_text, file_path, match):
        match = re.search(r'src="(.*?)"', found_text)
        print(match)
        src = match.group(1)
        print(src)

        match = re.search(r'text="(.*?)"', found_text)
        text = match.group(1)
        print(f'text={text}')

        # Create standard markdown link
        replaceText = f'[{text}]({src})'

        print(f'Replacing {found_text} with {replaceText}.')

        return replaceText


    for file in files:
        power_edit.find_replace_regex(file, r'\{\{\% link.*?src="(\.\./[a-zA-Z].*?)".*?\%\}\}', replace_fn)

if __name__ == '__main__':
    main()