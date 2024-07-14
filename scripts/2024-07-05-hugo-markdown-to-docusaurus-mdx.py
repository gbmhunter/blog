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
    print(f'Running the Markdown-to-AsciiDoc converter. Provide -m to actually modify the files, otherwise a dryrun will be performed.')
    print(files)
    for file_path in files:
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{% link[^%]+%}}', replace=link_replace_fn, multiline=True)
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'\[([^\]]+)\]\(([^)]+)\)', replace=markdown_link_replace_fn, multiline=True)

        power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{(%|<) (figure|img)((?!}}).)+(%|>)}}', replace=image_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'`?\\\((((?!\\\)).)+)\\\)`?', replace=inline_eq_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'\$\$\\begin{align}[\s\S]*?(?=\\end{align}\$\$)\\end{align}\$\$', replace=block_eq_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'{{% aside type="(.*?)" %}}(.*?){{% /aside %}}', replace=aside_replace_fn, multiline=True)
        
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'<p>\$\$(((?!\$\$).)+)\$\$<\/p>', replace=paragraph_eq_replace_fn, multiline=True)

def aside_replace_fn(found_text, file_path, match):
    type = match.group(1)
    content = match.group(2)
    replaceText = f':::{type}{content}:::'

    print('=====================================================')
    print(f'MATCH FOUND IN: {file_path}')
    print('=====================================================')
    print(f'========= Replacing: =============')
    print(found_text)
    print('============ with: =============')
    print(replaceText)

    return replaceText

def link_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract text
    match = re.search(r'text="([^"]+)"', found_text)
    text = match.group(1)
    print(f'text={text}')

    # Extract link
    match = re.search(r'src="([^"]+)"', found_text)
    if (match is None):
        src = '/'
    else:
        src = match.group(1)
    print(f'src={src}')

    mdx_link = f'[{text}]({src})'
    print(f'mdx_link={mdx_link}')

    return mdx_link

def markdown_link_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    match = re.search(r'\[([^\]]+)\]\(([^)]+)\)', found_text)
    text = match.group(1)
    print(f'text={text}')

    src = match.group(2)
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
    match = re.search(r'caption="(.*?)(?<!\\)"', found_text)
    if match is not None:
        caption = match.group(1)
    else:
        caption = ''
    print(f'caption={caption}')

    # <Image src={require('./te-connectivity-ariso-m30-contactless-connector-pair-photo.png').default} width="640">A photo of TE Connectivity's ARISO M30 contactless connectors. Image from www.te.com.</Image>
    mdx_image = f"<Image src={{require('./{src}').default}} width=\"{width}\">{caption}</Image>"

    print(f'mdx_image={mdx_image}')
    return mdx_image

def inline_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract src
    # Matches:
    # `\( <eq> \)` OR
    # \( <eq> \)
    match = re.search(r'`?\\\((((?!\$\$).)+)\\\)`?', found_text)
    content = match.group(1)
    print(f'content={content}')

    mdx_eq = f'${content}$'

    print(f'mdx_eq={mdx_eq}')
    return mdx_eq

def block_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract src
    match = re.search(r'\$\$\\begin{align}([\s\S]*?(?=\\end{align}\$\$))\\end{align}\$\$', found_text)
    content = match.group(1)
    print(f'content={content}')

    mdx_eq = f'$$\n\\begin{{align}}{content}\\end{{align}}\n$$'

    print(f'mdx_eq={mdx_eq}')
    return mdx_eq

def paragraph_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract Latex from inside <p>$$ <equation> $$</p>
    match = re.search(r'<p>\$\$(((?!\$\$).)+)\$\$<\/p>', found_text, flags=re.DOTALL|re.MULTILINE)
    content = match.group(1)
    print(f'content={content}')

    asciidoc_eq = f'[stem]\n++++\n\\begin{{align}}{content}\\end{{align}}\n++++'

    print(f'asciidoc_eq={asciidoc_eq}')
    return asciidoc_eq

if __name__ == '__main__':
    main()