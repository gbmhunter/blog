#!/usr/bin/env python3

import glob
import os
import re

import difflib

pattern = re.compile('\[.*?\]\((.*?)\)')

def main():

    link_checker = LinkChecker()
    link_checker.run()

class LinkChecker:
    def __init__(self):
        self.valid_urls = []
        self.invalid_urls = {}

    def run(self):
        files = glob.glob('../content/**/*.md', recursive=True)
        for i, file_path in enumerate(files):
            file_path = file_path[10:]
            self.valid_urls.append(self.get_valid_url(file_path))

        for i, file_path in enumerate(files):
            self.check_file(file_path)
            if i == 10:
                break
        
        # print(f'invalid_urls = {self.invalid_urls}')
        self.ask_user()




    def get_valid_url(self, file_path):
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

    def check_file(self, file_path):

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
                        print(f'match = {match}')
                        invalid_url_info = {
                            'file_path': file_path,
                            'span': match.span(1),
                        }
                        if not self.check_url(url):
                            if url in self.invalid_urls:
                                self.invalid_urls[url].append(invalid_url_info)
                            else:
                                self.invalid_urls[url] = [ invalid_url_info ]



    def check_url(self, url):
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

    def ask_user(self):

        for invalid_url, invalid_url_info_list in self.invalid_urls.items():
            print('')
            for invalid_url_info in invalid_url_info_list:
                file_path = invalid_url_info['file_path']
                span = invalid_url_info['span']
                print(f'File {file_path}. Span = {span}. Invalid URL = {invalid_url}')

            close_urls = difflib.get_close_matches(invalid_url, self.valid_urls, n=10)
            print(f'Did you mean:')
            print(f'0. Ignore.')
            for i, close_match in enumerate(close_urls):
                print(f'{i+1}. {close_match}')
            user_input = input("Selection? ")
            user_input = int(user_input)
            if user_input == 0:
                continue
            elif user_input >= 1 or user_input <= len(close_urls) + 1:
                self.replace_url(invalid_url, invalid_url_info, close_urls[user_input - 1])
            else:
                print('Invalid input!')
            
    def replace_url(self, invalid_url, invalid_url_info, valid_url):
        print(f'replace_url() called with invalid_url = {invalid_url},' \
            f' invalid_url_info = {invalid_url_info}, valid_url = {valid_url}.')

        file_path = invalid_url_info['file_path']
        span = invalid_url_info['span']

        with open(file_path, 'r') as file:
            file_content = file.read()

        file_content = file_content[0:span[0]] + valid_url + file_content[span[1]:]
        with open(file_path, 'w') as file:
            file.write(file_content)

            
        

if __name__ == '__main__':
    main()