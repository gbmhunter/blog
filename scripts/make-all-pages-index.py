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
        if len(dirs) == 0:
            is_leaf = True
        else:
            is_leaf = False
        for file_name in files:
            print(f'file = {file_name}')
            if (file_name.endswith('.md') or file_name.endswith('.html')):
                print('File needs renaming.')
                rename_file(file_name, root, is_leaf)

def rename_file(file_name, root, is_leaf):
    print(f'rename_file() called with file_name = {file_name}, root = {root}, is_leaf = {is_leaf}')

    old_file_path = os.path.join(root, file_name)

    if is_leaf:
        new_file_name = 'index.md'
    else:
        new_file_name = '_index.md'

    if file_name == 'index.md' or file_name == 'index.html' or file_name == '_index.html' or file_name == '_index.md':
        new_file_path = os.path.join(root, new_file_name)
        print(f'Renaming {old_file_path} to {new_file_path}.')
        if not DRY_RUN:
            os.rename(old_file_path, new_file_path)
    else:
        # Make directory
        dir_name, extension = os.path.splitext(file_name)

        dir_path = os.path.join(root, dir_name)
        new_file_path = os.path.join(dir_path, new_file_name)
        print(f'Creating {dir_path}.')
        if not DRY_RUN:
            os.makedirs(dir_path)
        print(f'Moving {old_file_path} to {new_file_path}.')
        if not DRY_RUN:
            os.rename(old_file_path, new_file_path)


if __name__ == '__main__':
    main()