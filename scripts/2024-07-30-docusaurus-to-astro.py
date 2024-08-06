"""
Tool for doing most of the hard work in converting Hugo markdown to Docusaurus mdx.
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
    print(f'Running the Docusaurus-to-Astro converter. Provide -m to actually modify the files, otherwise a dryrun will be performed.')
    print(files)
    for file_path in files:
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{% link[^%]+%}}', replace=link_replace_fn, multiline=True)
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'\[([^\]]+)\]\(([^)]+)\)', replace=markdown_link_replace_fn, multiline=True)

        # Add imports
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'---[\s\S]*?authors[\s\S]*?---', replace=import_insert_fn, multiline=False)

        # Replace asides
        power_edit.find_replace_regex(file_path=file_path, regex_str=r':::(.*)\n([\s\S]*?)\n:::\n', replace=aside_replace_fn, multiline=False)

        # Replace images
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'<Image .*?<\/Image>', replace=image_replace_fn, multiline=False)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'<Image .*?\/>', replace=image_no_child_replace_fn, multiline=False)
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'`?\\\((((?!\\\)).)+)\\\)`?', replace=inline_eq_replace_fn, multiline=True)
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'\$\$\\begin{align}[\s\S]*?(?=\\end{align}\$\$)\\end{align}\$\$', replace=block_eq_replace_fn, multiline=True)
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{% aside type="(.*?)" %}}(.*?){{% /aside %}}', replace=aside_replace_fn, multiline=True)
        
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'<p>\$\$(((?!\$\$).)+)\$\$<\/p>', replace=paragraph_eq_replace_fn, multiline=True)

def import_insert_fn(found_text, file_path, match):
    replace_text = found_text + "\n\nimport { Aside, CircuitJs, Image, WarningIsNotes } from '/src/components/General.astro';"

    print('=====================================================')
    print(f'IMPORT MATCH FOUND IN: {file_path}')
    print('=====================================================')
    print(f'========= Replacing: =============')
    print(found_text)
    print('============ with: =============')
    print(replace_text)
    return replace_text

def aside_replace_fn(found_text, file_path, match):
    print(match)
    type = match.group(1)
    content = match.group(2)
    print(f'type: {type}')

    if type == 'warning':
        type = 'caution'
    elif type == 'info':
        type = 'note'

    replaceText = f'<Aside type="{type}">\n{content}\n</Aside>\n'

    print('=====================================================')
    print(f'ASIDE MATCH FOUND IN: {file_path}')
    print('=====================================================')
    print(f'========= Replacing: =============')
    print(found_text)
    print('============ with: =============')
    print(replaceText)

    return replaceText

def image_replace_fn(found_text, file_path):
    # Extract src
    match = re.search(r"src={require\('(.*?)'\).default}", found_text)
    src = match.group(1)

    # Extract width
    match = re.search(r'width="([^"]+)"', found_text)
    width = match.group(1)

    # Extract caption
    match = re.search(r'<Image .*?>(.*?)<\/Image>', found_text)
    if match is not None:
        caption = match.group(1)
    else:
        caption = ''

    # Generate astro image
    # Create JS variable name from src
    src_var_name = src
    
    # Trim off './_assets/' of the start if present
    path_does_start_with_assets = src_var_name.startswith('./_assets')
    if path_does_start_with_assets:
        src_var_name = '_'.join(src_var_name.split('/')[2:])

    path_does_start_with_dot_slash = src_var_name.startswith('./')
    if path_does_start_with_dot_slash:
        src_var_name = src_var_name[2:]

    # Remove file extension
    src_var_name = src_var_name[:src_var_name.rfind('.')]

    # If first character is a number, prepend with an "n_"
    if src_var_name[0].isdigit():
        src_var_name = 'n_' + src_var_name

    src_var_name = src_var_name.replace('-', '_')
    src_var_name = src_var_name.replace('.', '_')
    src_var_name = src_var_name.replace('/', '_')

    mdx_image = f"import {src_var_name} from '{src}'\n\n<Image src={{{src_var_name}}} width=\"{width}\">{caption}</Image>"

    print('=====================================================')
    print(f'IMAGE MATCH FOUND IN: {file_path}')
    print('=====================================================')
    print(f'========= Replacing: =============')
    print(found_text)
    print('============ with: =============')
    print(mdx_image)

    return mdx_image

def image_no_child_replace_fn(found_text, file_path):
    # Extract src
    match = re.search(r"src={require\('(.*?)'\).default}", found_text)
    src = match.group(1)

    # Extract width
    match = re.search(r'width="([^"]+)"', found_text)
    width = match.group(1)

    # Extract caption
    match = re.search(r'caption="([^"]+)"', found_text)
    if match is not None:
        caption = match.group(1)
    else:
        caption = ''

    # Generate astro image
    # Create JS variable name from src
    src_var_name = src
    
    # Trim off './_assets/' of the start if present
    path_does_start_with_assets = src_var_name.startswith('./_assets')
    if path_does_start_with_assets:
        src_var_name = '_'.join(src_var_name.split('/')[2:])

    path_does_start_with_dot_slash = src_var_name.startswith('./')
    if path_does_start_with_dot_slash:
        src_var_name = src_var_name[2:]

    # Remove file extension
    src_var_name = src_var_name[:src_var_name.rfind('.')]

    # If first character is a number, prepend with an "n_"
    if src_var_name[0].isdigit():
        src_var_name = 'n_' + src_var_name

    src_var_name = src_var_name.replace('-', '_')
    src_var_name = src_var_name.replace('.', '_')
    src_var_name = src_var_name.replace('/', '_')

    mdx_image = f"import {src_var_name} from '{src}'\n\n<Image src={{{src_var_name}}} width=\"{width}\">{caption}</Image>"

    print('=====================================================')
    print(f'IMAGE MATCH FOUND IN: {file_path}')
    print('=====================================================')
    print(f'========= Replacing: =============')
    print(found_text)
    print('============ with: =============')
    print(mdx_image)

    return mdx_image

if __name__ == '__main__':
    main()