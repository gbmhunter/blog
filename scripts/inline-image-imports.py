"""
Tool for converting separate image imports to inline image imports in Astro .mdx files.
"""
import argparse
import re
from power_edit import PowerEdit

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("path_glob")
    parser.add_argument('-m', '--modify', action='store_true')
    args = parser.parse_args()

    power_edit = PowerEdit()
    power_edit.sim_run = not args.modify
    files = power_edit.find_files(args.path_glob, recursive=True)
    print(f'Running the inline image import converter. Provide -m to actually modify the files, otherwise a dryrun will be performed.')
    # print(files)
    for file_path in files:

        # Replace images
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'import \S+ from \S+$\n\n<Image src=.*?<\/Image>', replace=image_replace_fn, multiline=True)


def image_replace_fn(found_text, file_path):
    print('=====================================================')
    print(f'IMAGE MATCH FOUND IN: {file_path}')
    print('=====================================================')

    print('found_text:', found_text)

    match = re.search(r"import (.*?) from '(.*?)'", found_text)
    var_name = match.group(1)
    src = match.group(2)
    print('var_name:', var_name)
    print('src:', src)

    # Extract var name again to make sure they are the same
    match = re.search(r"src={(.*?)}", found_text)
    var_name_2 = match.group(1)
    print('var_name_2:', var_name_2)

    if var_name != var_name_2:
        print('ERROR: var names do not match. var_name:', var_name, 'var_name_2:', var_name_2)
        return found_text

    # Extract width
    match = re.search(r'width="([^"]+)"', found_text)
    width = match.group(1)
    print('width:', width)

    # Extract caption
    match = re.search(r'<Image .*?>(.*?)<\/Image>', found_text)
    if match is not None:
        caption = match.group(1)
    else:
        caption = ''
    print('caption:', caption)

    inline_image = f"<Image src={{import('{src}')}} width=\"{width}\">{caption}</Image>"

    print(f'========= Replacing: =============')
    print(found_text)
    print('============ with: =============')
    print(inline_image)

    return inline_image


if __name__ == '__main__':
    main()