"""
This script replaces link shortcodes in the form {{% link ... %}} with standard markdown links in the form [text](src).
"""
from pathlib import Path
import re

from power_edit import PowerEdit

SCRIPT_DIR = Path(__file__).parent.resolve()

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = True

    globPattern = str(SCRIPT_DIR) + '/../content/electronics/circuit-design/bldc-motor-control/index.md'
    files = power_edit.find_files(globPattern, recursive=True)

    print(f'Found {len(files)} files.')

    def replace_fn(found_text, file_path, match):
        # match = re.search(r'src="(.*?)"', found_text)
        # print(match)
        content = match.group(1)
        # print(content)

        # # Create standard markdown link
        replaceText = f'{content}'

        print('=====================================================')
        print(f'MATCH FOUND IN: {file_path}')
        print('=====================================================')
        print(f'========= Replacing: =============')
        print(found_text)
        print('============ with: =============')
        print(replaceText)

        return replaceText


    for file in files:
        power_edit.find_replace_regex(file, r'<p>(\$\$.*?\$\$)</p>', replace_fn, multiline=True)

if __name__ == '__main__':
    main()