#!/usr/bin/env python3

import glob
import os
import re

import difflib

pattern = re.compile('\[.*?\]\((.*?)\)')

def main():

    script_path = os.path.dirname(os.path.realpath(__file__))
    print(script_path)

    files = glob.glob('../content/**/*.md', recursive=True)
    # print(files)

    urls = []
    for i, file_path in enumerate(files):
        file_path = file_path[10:]
        urls.append(get_url(file_path))
        # if i == 10:
            # break

    print(urls)

    for i, file_path in enumerate(files):
        check_file(file_path, urls)
        if i == 100:
            break

def get_url(file_path):
    # print(f'get_url() called for {file_path}')

    file_path = file_path.replace('\\', '/')
    last_forward_slash = file_path.rfind('/')
    path = file_path[:last_forward_slash + 1]
    page = file_path[last_forward_slash + 1:]

    if page == 'index.md' or page == '_index.md':
        url = path
    else:
        extension_idx = file_path.rfind('.')
        url = file_path[:extension_idx] + '/'
    
    # print(f'url = {url}')
    return url

def check_file(file_path, urls):

    # print(file_path)

    with open(file_path, 'r', encoding='utf-8') as file:
        filedata = file.read()
        match_itr = pattern.finditer(filedata)
        # print(match)
        for match in match_itr:
            if match is not None:
                # print(match.group(0))
                # print(match.group(1))
                url = match.group(1)
                if url.startswith('/'):
                    
                    if not check_url(url):
                        print('')
                        print(f'File {file_path}. Invalid URL = {url}')
                        close_urls = difflib.get_close_matches(url, urls, n=10)
                        print(f'Did you mean:')
                        for i, close_match in enumerate(close_urls):
                            print(f'{i}. {close_match}')
                        user_input = input("Selection? ")

def check_url(url):
    # print(f'check_url() called with url = {url}.')

    # Make sure either folder exists with an index.md or _index.md,
    # OR file exists in parent folder

    last_forward_slash = url.rfind('/')
    path = url[:last_forward_slash + 1]
    page = url[last_forward_slash + 1:]
    # print(f'path = {path}, page = {page}')

    url_valid = False

    # Check if folder exists
    if os.path.isdir('../content' + url):
        # print('Found directory!')
        # Make sure either index.md or _index.md exists in this directory
        if os.path.isfile('../content' + url + '/index.md'):
            # print('Found index.md')
            return True
        elif os.path.isfile('../content' + url + '/_index.md'):
            # print('Found _index.md')
            return True
        else:
            # print('ERROR: No index file found!')
            return False

    elif os.path.isfile('../content' + url + '.md'):
        # print('Found file!')
        # pass
        return True
    else:
        # print('ERROR: URL invalid.')
        return False

            
        

if __name__ == '__main__':
    main()