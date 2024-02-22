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

    globPattern = str(SCRIPT_DIR) + '/../content/**/*index.md'
    files = power_edit.find_files(globPattern, recursive=True)

    print(f'Found {len(files)} files.')

    def replaceFnPsDollars(found_text, file_path, match):
        # For <p>$$ ... $$</p> math blocks. Removes the <p> tags as not needed.
        content = match.group(1)
        replaceText = f'{content}'

        print('=====================================================')
        print(f'MATCH FOUND IN: {file_path}')
        print('=====================================================')
        print(f'========= Replacing: =============')
        print(found_text)
        print('============ with: =============')
        print(replaceText)

        return replaceText
    
    def replaceFnAlign(found_text, file_path, match):
        # For <p>\begin{align} ... \end{align}</p> math blocks. Replaces the <p> tags with $$ ... $$.
        content = match.group(1)
        replaceText = f'$${content}$$'

        print('=====================================================')
        print(f'MATCH FOUND IN: {file_path}')
        print('=====================================================')
        print(f'========= Replacing: =============')
        print(found_text)
        print('============ with: =============')
        print(replaceText)

        return replaceText
    
    def replaceFnInlineMath(found_text, file_path, match):
        # For `\( ... \)` inline math. Removes the backticks as not needed any more with Hugo support
        # for passthrough.
        content = match.group(1)
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
        power_edit.find_replace_regex(file, r'<p>(\$\$.*?\$\$)</p>', replaceFnPsDollars, multiline=True)
        power_edit.find_replace_regex(file, r'<p>(\\begin{align}.*?\\end{align})</p>', replaceFnAlign, multiline=True)
        power_edit.find_replace_regex(file, r'`(\\\(.*?\\\))`', replaceFnInlineMath, multiline=True)

if __name__ == '__main__':
    main()