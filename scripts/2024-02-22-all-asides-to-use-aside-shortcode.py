"""
This script converts all shortcodes like {{% tip %}} to the {{% aside type="tip" %}} shortcode.
"""
from pathlib import Path
import re

from power_edit import PowerEdit

SCRIPT_DIR = Path(__file__).parent.resolve()

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = False

    globPattern = str(SCRIPT_DIR) + '/../content/**/*index.md'
    files = power_edit.find_files(globPattern, recursive=True)

    print(f'Found {len(files)} files.')

    def replaceFnTip(found_text, file_path, match):
        content = match.group(1)
        replaceText = f'{{{{% aside type="tip" %}}}}{content}{{{{% /aside %}}}}'

        print('=====================================================')
        print(f'MATCH FOUND IN: {file_path}')
        print('=====================================================')
        print(f'========= Replacing: =============')
        print(found_text)
        print('============ with: =============')
        print(replaceText)

        return replaceText
    
    def replaceFnNote(found_text, file_path, match):
        content = match.group(1)
        replaceText = f'{{{{% aside type="note" %}}}}{content}{{{{% /aside %}}}}'

        print('=====================================================')
        print(f'MATCH FOUND IN: {file_path}')
        print('=====================================================')
        print(f'========= Replacing: =============')
        print(found_text)
        print('============ with: =============')
        print(replaceText)

        return replaceText
    
    def replaceFnWarning(found_text, file_path, match):
        content = match.group(1)
        replaceText = f'{{{{% aside type="warning" %}}}}{content}{{{{% /aside %}}}}'

        print('=====================================================')
        print(f'MATCH FOUND IN: {file_path}')
        print('=====================================================')
        print(f'========= Replacing: =============')
        print(found_text)
        print('============ with: =============')
        print(replaceText)

        return replaceText


    for file in files:
        power_edit.find_replace_regex(file, r'{{% tip %}}(.*?){{% /tip %}}', replaceFnTip, multiline=True)
        power_edit.find_replace_regex(file, r'{{% note %}}(.*?){{% /note %}}', replaceFnNote, multiline=True)
        power_edit.find_replace_regex(file, r'{{% warning %}}(.*?){{% /warning %}}', replaceFnWarning, multiline=True)

if __name__ == '__main__':
    main()