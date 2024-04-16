import os
import sys
import glob
import argparse
from pathlib import Path

SCRIPT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
CONTENT_DIR = SCRIPT_DIR.parent / 'content'

def main():
    parser = argparse.ArgumentParser(description='Move a page in the repository')\
    
    parser.add_argument('original_path', type=str, help='Original path of the page')
    parser.add_argument('new_path', type=str, help='New path of the page')

    args = parser.parse_args()

    update_markdown_files(args.original_path, args.new_path)

def update_markdown_files(original_path, new_path):
    # Get the list of markdown files in the repository
    glob_string = str(CONTENT_DIR) + '/**/*.md'
    print(glob_string)
    markdown_files = glob.glob(glob_string, recursive=True)

    print(f'Found {len(markdown_files)} markdown files in the repository.')

    # Convert absolute paths to relative URLs. Also convert Windows paths to Unix paths.
    original_url = original_path.replace(str(CONTENT_DIR), '')
    original_url = original_url.replace('\\', '/')
    # Remove _index.md or index.md from the original URL
    original_url = original_url.replace('_index.md', '')
    original_url = original_url.replace('index.md', '')
    print(f'Original path: {original_url}')

    new_url = new_path.replace(str(CONTENT_DIR), '')
    new_url = new_url.replace('\\', '/')
    new_url = new_url.replace('_index.md', '')
    new_url = new_url.replace('index.md', '')
    print(f'New path: {new_url}')

    for file in markdown_files:
        # Read the contents of the markdown file
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace the original path with the new path in the content
        num_occurrences = content.count(original_url)
        if num_occurrences == 0:
            continue

        print(f'Found {num_occurrences} occurances of {original_url} in {file}')
        updated_content = content.replace(original_url, new_path)

        # Write the updated content back to the markdown file
        # with open(file, 'w') as f:
        #     f.write(updated_content)

    print('Markdown files updated successfully!')

if __name__ == '__main__':
    main()
