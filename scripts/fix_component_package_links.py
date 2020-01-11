from power_edit import PowerEdit

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = False

    files = power_edit.find_files('../content/pcb-design/component-packages/**/index.md', recursive=True)
    print(files)

    def replace_fn(found_text, file_path, match):
        start_pos = match.start(1) - match.start(0)
        end_pos = match.end(1) - match.start(0)

        src = match.group(1)
        src = src[3:]
        replace = found_text[0:start_pos] + src + found_text[end_pos:]
        
        print(f'Replacing {found_text} with {replace}.')

        return replace


    for file in files:
        power_edit.find_replace_regex(file, r'\{\{\% link.*?src="(\.\./[a-zA-Z].*?)".*?\%\}\}', replace_fn)

if __name__ == '__main__':
    main()