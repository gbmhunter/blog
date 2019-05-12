import os

DRY_RUN = False

def main():
    for root, dirs, files in os.walk(os.path.join('..', 'content')):
        for file_name in files:
            print(f'file = {file_name}')
            if file_name != '_index.md' and (file_name.endswith('.md') or file_name.endswith('.html')):
                print('File needs renaming.')
                rename_file(file_name, root)

def rename_file(file_name, root):
    print(f'rename_file() called with file_name = {file_name}, root = {root}')

    old_file_path = os.path.join(root, file_name)

    if file_name == 'index.md' or file_name == 'index.html' or file_name == '_index.html':
        new_file_path = os.path.join(root, '_index.md')
        print(f'Renaming {old_file_path} to {new_file_path}.')
        if not DRY_RUN:
            os.rename(old_file_path, new_file_path)
    else:
        # Make directory
        dir_name, extension = os.path.splitext(file_name)

        dir_path = os.path.join(root, dir_name)
        new_file_path = os.path.join(dir_path, '_index.md')
        print(f'Creating {dir_path}.')
        if not DRY_RUN:
            os.makedirs(dir_path)
        print(f'Moving {old_file_path} to {new_file_path}.')
        if not DRY_RUN:
            os.rename(old_file_path, new_file_path)


if __name__ == '__main__':
    main()