import re

from power_edit import PowerEdit

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = True

    files = power_edit.find_files('../content/pcb-design/component-packages/**/_index.md', recursive=True)
    # print(files)

    def replace_fn(found_text, file_path, match):
        # print(f'Found text: {found_text}, file path: {file_path}, match: {match}.')
        # start_pos = match.start(1) - match.start(0)
        # end_pos = match.end(1) - match.start(0)

        # src = match.group(1)
        # src = src[3:]
        # replace = found_text[0:start_pos] + src + found_text[end_pos:]
        
        # Get the src attribute
        # Create regex to match src="xxx"

        # regex = 
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