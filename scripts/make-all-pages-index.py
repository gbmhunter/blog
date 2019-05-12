import os

def main():
    for root, dirs, files in os.walk('../content/'):
        for file_name in files:
            print(f'file = {file_name}')
            if not file_name.startswith('_index'):
                print('File needs renaming.')

if __name__ == '__main__':
    main()