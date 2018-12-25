#!/usr/bin/env python3

from power_edit import PowerEdit

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = False
    files = power_edit.find_files('../content/**/*.md', recursive=True)
    print(files)
    for file_path in files:
        power_edit.find_replace_regex(file_path=file_path, regex_str='^$\s^# .*?$\s^$', replace=replace_fn, multiline=True)

def replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    i = 0
    while(found_text[i] != '#'):
        i += 1
    
    start_hash = i
    num_hashes = 0
    while(found_text[i] == '#'):
        i += 1
        num_hashes += 1
    
    print(f'num_hashes = {num_hashes}')

    replace_text = found_text[0:start_hash] + '#'*(num_hashes+1) + found_text[start_hash + num_hashes:]
    print(replace_text)

    return replace_text

if __name__ == '__main__':
    main()