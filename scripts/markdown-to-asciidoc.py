"""
Tool for doing most of the hard work in converting Markdown to AsciiDoc.
"""
import re
from power_edit import PowerEdit

def main():
    power_edit = PowerEdit()
    power_edit.sim_run = False
    files = power_edit.find_files('../content/electronics/components/crystals-and-oscillators/*.adoc', recursive=True)
    print(files)
    for file_path in files:
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{% link[^%]+%}}', replace=link_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{(%|<) (figure|img)[^%]+(%|>)}}', replace=image_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'`\\\([^\\\)`]+\\\)`', replace=inline_eq_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'<p>\\begin{align}[\s\S]*?(?=\\end{align}<\/p>)\\end{align}<\/p>', replace=block_eq_replace_fn, multiline=True)
        

def link_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract text
    match = re.search(r'text="([^"]+)"', found_text)
    text = match.group(1)
    print(f'text={text}')

    # Extract link
    match = re.search(r'src="([^"]+)"', found_text)
    src = match.group(1)
    print(f'src={src}')

    asciidoc_link = f'link:{src}[{text}]'
    print(f'asciidoc_link={asciidoc_link}')

    return asciidoc_link

def image_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract src
    match = re.search(r'src="([^"]+)"', found_text)
    src = match.group(1)
    print(f'src={src}')

    # Extract width
    match = re.search(r'width="([^"]+)"', found_text)
    width = match.group(1)
    print(f'width={width}')

    # Extract caption
    match = re.search(r'caption="([^"]+)"', found_text)
    if match is not None:
        caption = match.group(1)
    else:
        caption = None
    print(f'caption={caption}')

    asciidoc_image = ''
    if caption is not None:
        asciidoc_image += f'.{caption}\n'
    asciidoc_image += f'image::{src}[width={width}]'

    print(f'asciidoc_image={asciidoc_image}')
    return asciidoc_image

def inline_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract src
    match = re.search(r'`\\\(([^(\\\)`)]+)\\\)`', found_text)
    content = match.group(1)
    print(f'content={content}')

    asciidoc_eq = f'stem:[{content}]'

    print(f'asciidoc_eq={asciidoc_eq}')
    return asciidoc_eq

def block_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract src
    match = re.search(r'<p>\\begin{align}([\s\S]*?(?=\\end{align}<\/p>))\\end{align}<\/p>', found_text)
    content = match.group(1)
    print(f'content={content}')

    asciidoc_eq = f'[stem]\n++++\n\\begin{{align}}{content}\\end{{align}}\n++++'

    print(f'asciidoc_eq={asciidoc_eq}')
    return asciidoc_eq

if __name__ == '__main__':
    main()