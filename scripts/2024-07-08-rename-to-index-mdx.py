"""
Renames all content files to either _index.md or index.md.
"""
import argparse
import os

DRY_RUN = False

def main():

    parser = argparse.ArgumentParser(description='Renames content to _index.md or index.md.')
    parser.add_argument('root_path', metavar='N', type=str,
                        help='Root path to rename files.')

    args = parser.parse_args()
    print(f'root_path = {args.root_path}')

    for root, dirs, files in os.walk(args.root_path):
        for file_name in files:
            print(f'file = {file_name}')
            if (file_name.endswith('.md')):
                print('File needs renaming.')
                rename_file(file_name, root)

def rename_file(file_name, root):
    print(f'rename_file() called with file_name = {file_name}, root = {root}')

    old_file_path = os.path.join(root, file_name)

    new_file_name = 'index.mdx'
    new_file_path = os.path.join(root, new_file_name)
    print(f'Renaming {old_file_path} to {new_file_path}.')
    if not DRY_RUN:
        os.rename(old_file_path, new_file_path)


if __name__ == '__main__':
    main()