import os
import sys
import glob
import argparse
from pathlib import Path

SCRIPT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
CONTENT_DIR = SCRIPT_DIR.parent / 'content'

def main():
    parser = argparse.ArgumentParser(description='Move a page in the repository')\
    
    parser.add_argument('original_dir_path', type=str, help='Original path of the page directory.')
    parser.add_argument('new_dir_path', type=str, help='New path of the page directory.')

    args = parser.parse_args()

    update_markdown_files(Path(args.original_dir_path), Path(args.new_dir_path))

def update_markdown_files(original_dir_path: Path, new_dir_path: Path):

    if not original_dir_path.exists():
        print(f'Error: The original directory {original_dir_path} does not exist.')
        sys.exit(1)

    # Get the list of markdown files in the repository
    glob_string = str(CONTENT_DIR) + '/**/*.md'
    markdown_files = glob.glob(glob_string, recursive=True)

    print(f'Found {len(markdown_files)} markdown files in the repository.')

    # Convert absolute paths to relative URLs. Also convert Windows paths to Unix paths.
    original_url = str(original_dir_path).replace(str(CONTENT_DIR), '')
    original_url = original_url.replace('\\', '/')
    # Remove _index.md or index.md from the original URL
    # original_url = original_url.replace('_index.md', '')
    # original_url = original_url.replace('index.md', '')
    print(f'Original path: {original_url}')

    new_url = str(new_dir_path).replace(str(CONTENT_DIR), '')
    new_url = new_url.replace('\\', '/')
    # new_url = new_url.replace('_index.md', '')
    # new_url = new_url.replace('index.md', '')
    print(f'New path: {new_url}')

    found_at_least_one_occurrence = False
    for file in markdown_files:
        # Read the contents of the markdown file
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace the original path with the new path in the content
        num_occurrences = content.count(original_url)
        if num_occurrences == 0:
            continue

        print(f'Found {num_occurrences} occurrences of {original_url} in {file}')
        found_at_least_one_occurrence = True
        updated_content = content.replace(original_url, new_url)

        # Write the updated content back to the markdown file
        with open(file, 'w', encoding='utf-8') as f:
            f.write(updated_content)

    if not found_at_least_one_occurrence:
        print(f'Did not find any occurrences of {original_url} in any markdown file to update.')

    # Now move the entire directory to the new path

    # Make sure new directory does not exist
    if new_dir_path.exists():
        print(f'Error: The directory {new_dir_path} already exists.')
        sys.exit(1)

    os.rename(original_dir_path, new_dir_path)



    print('Markdown files updated successfully!')

if __name__ == '__main__':
    main()
