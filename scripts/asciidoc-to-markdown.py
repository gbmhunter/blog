"""
Tool for doing most of the hard work in converting Markdown to AsciiDoc.
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
    print('Running the Asciidoc-to-Markdown converter. Provide -m to actually modify the files, otherwise a dryrun will be performed.')
    print(files)
    for file_path in files:
        # Convert headings in the form "== <HEADING TEXT>" to "## <HEADING TEXT>"
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'^(=+?) (.*?)$', replace=heading_replace_fn, multiline=True)
        
        # Convert hyperlinks
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'link:.*?\[.*?\]', replace=link_replace_fn, multiline=True)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'(\..*?\n)?image::.*?\[.*?\]', replace=image_replace_fn, multiline=False)
        
        # Convert inline and block maths
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'stem:\[(.*?)\]', replace=inline_eq_replace_fn, multiline=False)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'\[stem\]\n\+\+\+\+(\n(.|\n)*?\n)\+\+\+\+', replace=block_eq_replace_fn, multiline=False)

        power_edit.find_replace_regex(file_path=file_path, regex_str=r'<<.*?>>', replace=bib_reference_replace_fn, multiline=False)
        power_edit.find_replace_regex(file_path=file_path, regex_str=r'\[bibliography\]\n## References\n\n\*(.*\n?)*', replace=bibliography_replace_fn, multiline=False)
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'<p>\\begin{align}[\s\S]*?(?=\\end{align}<\/p>)\\end{align}<\/p>', replace=block_eq_replace_fn, multiline=True)        
        # power_edit.find_replace_regex(file_path=file_path, regex_str=r'<p>\$\$(((?!\$\$).)+)\$\$<\/p>', replace=paragraph_eq_replace_fn, multiline=True)


def heading_replace_fn(found_text, file_path):
    print('heading_replace_fn() called.')
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract number of "=" and heading text
    match = re.search(r'^(=+?) (.*?)$', found_text)
    equal_signs = match.group(1)
    print(f'equal_signs={equal_signs}')
    heading_text = match.group(2)
    print(f'heading_text={heading_text}')

    markdown_heading = f"{'#'*len(equal_signs)} {heading_text}"
    return markdown_heading


def link_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract text
    match = re.search(r'link:(.*?)\[(.*?)\]', found_text)
    src = match.group(1)
    print(f'src={src}')
    text = match.group(2)
    print(f'text={text}')

    markdown_link = f'[{text}]({src})'
    print(f'markdown_link={markdown_link}')

    return markdown_link


def image_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    # Extract src and optional caption
    match = re.search(r'(\.(.*?)\n)?image::(.*?)\[(.*?)\]', found_text)
    caption = match.group(2)
    if caption is None:
        caption = ''
    print(f'caption={caption}')
    src = match.group(3)
    print(f'src={src}')

    # Params will need further extraction, this contains the width
    params = match.group(4)
    print(f'params={params}')
    # "px" could be missing, so could quotes
    regex = re.compile(r'width="?([0-9]+)(px)?"?')
    match = regex.search(params)

    width_px = match.group(1)
    print(f'width_px={width_px}')

    markdown_image = f'{{{{% figure src="{src}" width="{width_px}px" caption="{caption}" %}}}}'
    print(f'markdown_image={markdown_image}')

    return markdown_image

def inline_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'found_text = {found_text}')

    match = re.search(r'stem:\[(.*?)\]', found_text)
    content = match.group(1)
    print(f'content={content}')

    markdown_eq = f'`\({content}\)`'

    print(f'markdown_eq={markdown_eq}')
    return markdown_eq

def block_eq_replace_fn(found_text, file_path):
    print(file_path)
    print(f'block_eq_replace_fn() called. found_text = {found_text}')

    # Extract latex from inside Asciidoc block
    match = re.search(r'\[stem\]\n\+\+\+\+\n(\\begin{align}\n)?((.|\n)*?)\n(\\end{align}\n)?\+\+\+\+', found_text)
    content = match.group(2)
    print(f'content={content}')

    markdown_eq = f'<p>\\begin{{align}}\n{content}\n\\end{{align}}</p>'

    print(f'markdown_eq={markdown_eq}')
    return markdown_eq

def bib_reference_replace_fn(found_text, file_path):
    """
    found_text format: <<reference>>
    """
    print(file_path)
    print(f'found_text = {found_text}')
    match = re.search(r'<<(.*?)>>', found_text)
    reference = match.group(1)
    print(f'reference={reference}')

    markdown_reference = f'[^{reference}]'
    print(f'markdown_reference={markdown_reference}')
    return markdown_reference

def bibliography_replace_fn(found_text, file_path):
    """
    found_text format:
    """
    print(file_path)
    print(f'found_text = {found_text}')

    def replace_fn(match):
        bib_entry = match.group(0)
        # bib_entry should be a single line in the bibliography
        print(f'bib_entry={bib_entry}')

        bib_id = match.group(1)
        # Remove the ", <number>" of the end of the bib_id
        bib_id = bib_id.split(',')[0]
        print(f'bib_id={bib_id}')

        bib_info = match.group(2)
        print(f'bib_info={bib_info}')
        return f'[^{bib_id}]: {bib_info}'

    converted_bib = re.sub(r'\* \[\[\[(.*?)\]\]\](.*)', replace_fn, found_text)
    converted_bib = '\n'.join(converted_bib.split('\n')[1:])

    print(f'converted_bib={converted_bib}')
    return converted_bib


# def paragraph_eq_replace_fn(found_text, file_path):
#     print(file_path)
#     print(f'found_text = {found_text}')

#     # Extract Latex from inside <p>$$ <equation> $$</p>
#     match = re.search(r'<p>\$\$(((?!\$\$).)+)\$\$<\/p>', found_text, flags=re.DOTALL|re.MULTILINE)
#     content = match.group(1)
#     print(f'content={content}')

#     asciidoc_eq = f'[stem]\n++++\n\\begin{{align}}{content}\\end{{align}}\n++++'

#     print(f'asciidoc_eq={asciidoc_eq}')
#     return asciidoc_eq

if __name__ == '__main__':
    main()