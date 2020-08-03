#!/usr/bin/env python3

from power_edit import PowerEdit

def main():
    power_edit = PowerEdit()
    files = power_edit.find_files('../content/**/*.md', recursive=True)
    # print(files)

    for file_path in files:
        power_edit.find_replace_regex(file_path=file_path, regex_str='[0-9]+x[0-9]+\.(png|jpg|jpeg)', replace=replace_fn)

def replace_fn(found_text, file_path):
    print(file_path)
    print(found_text)
    return ''

if __name__ == '__main__':
    main()