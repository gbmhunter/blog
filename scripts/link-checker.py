#!/usr/bin/env python3

import glob
import os
import re

import difflib

pattern = re.compile('\[.*?\]\((.*?)\)')
anchor_pattern = re.compile('^#+\s+([A-Za-z0-9]+.*)$', re.MULTILINE)

def main():

    link_checker = LinkChecker()
    link_checker.run()

class LinkChecker:
    def __init__(self):
        self.valid_urls = []
        self.invalid_urls = {}
        self.valid_anchors = {}

    def run(self):
        files = glob.glob('../content/**/*.md', recursive=True)
        for i, file_path in enumerate(files):
            file_path = file_path
            self.valid_urls.append(self.get_valid_url_and_anchors(file_path))

        static_files = glob.glob('../static/**/*.*', recursive=True)
        for i, file_path in enumerate(static_files):
            self.valid_urls.append(file_path[9:])

        for i, file_path in enumerate(files):
            # file_path = '../content/electronics/circuit-design/bldc-motor-control/index.md'
            self.check_file(file_path)
            # if i == 100:
                # break
        
        # print(f'invalid_urls = {self.invalid_urls}')
        self.ask_user()

    def get_valid_url_and_anchors(self, file_path):
        # print(f'get_url() called for {file_path}')

        url = file_path[10:]
        url = url.replace('\\', '/')
        last_forward_slash = url.rfind('/')
        path = url[:last_forward_slash + 1]
        page = url[last_forward_slash + 1:]

        if page == 'index.md' or page == '_index.md':
            url = path
        else:
            # print(f'Removing extension. url = {url}')
            extension_idx = url.rfind('.')
            # print(f'extension_idx = {extension_idx}')
            url = url[:extension_idx] + '/'
            # print(f'url = {url}')

        # Get valid anchors
        # print(f'Looking for anchors for file_path = {file_path}, url = {url}.')
        with open(file_path, 'r') as file:
            file_content = file.read()

        # print(file_content)

        match_itr = anchor_pattern.finditer(file_content)
        for match in match_itr:
            title = match.group(1)
            # Convert title into a valid anchor
            title = self._anchor_sanitizer(title)
            if url in self.valid_anchors:
                self.valid_anchors[url].append(title)
            else:
                self.valid_anchors[url] = [ title ]
        
        
        # print(f'url = {url}')
        return url

    def check_file(self, file_path):

        # print(file_path)

        with open(file_path, 'r', encoding='utf-8') as file:
            filedata = file.read()
            match_itr = pattern.finditer(filedata)
            for match in match_itr:
                if match is not None:
                    # print(match.group(0))
                    # print(match.group(1))
                    url = match.group(1)
                    if url.startswith('/'):
                        # print(f'match = {match}')
     
                        success, error_reason = self.check_url(url)
                        if not success:
                            invalid_url_info = {
                                'file_path': file_path,
                                'span': match.span(1),
                                'error_reason': error_reason,
                            }
                            if url in self.invalid_urls:
                                self.invalid_urls[url].append(invalid_url_info)
                            else:
                                self.invalid_urls[url] = [ invalid_url_info ]



    def check_url(self, url):
        print(f'check_url() called with url = {url}.')

        # Make sure either folder exists with an index.md or _index.md,
        # OR file exists in parent folder

        anchor = None
        anchor_pos = url.find('#')
        if anchor_pos >= 0:
            print('Found anchor.')
            anchor = url[anchor_pos + 1:]
            url = url[:anchor_pos]

        print(f'anchor = {anchor}')
        print(f'url = {url}')

        last_forward_slash = url.rfind('/')

        url_valid = False

        # Strip trailing '/' if presemt
        if url[-1] == '/':
            url = url[:-1]

        url_with_forward_slash = url + '/'

        url_valid = False

        # Check if folder exists
        if os.path.isdir('../content' + url):
            # print('Found directory!')
            # Make sure either index.md or _index.md exists in this directory
            if os.path.isfile('../content' + url + '/index.md'):
                print('Found index.md')
            elif os.path.isfile('../content' + url + '/_index.md'):
                print('Found _index.md')
            else:
                print('No index file found!')
                return False, 'url_base_invalid'

        elif os.path.isfile('../content' + url + '.md'):
            print('Found file!')

        # Couldn't find an valid URL in content/, so now lets check static/

        elif os.path.isfile('../static' + url):
            print('Found URL in static.')
        else:
            return False, 'url_base_invalid'

        if anchor is not None:
            print(f'Looking for anchor in {self.valid_anchors[url_with_forward_slash]}.')
            if anchor in self.valid_anchors[url_with_forward_slash]:
                print('URL and anchor valid')
                return True,  ''
            else:
                print('URL valid but anchor invalid.')
                return False, 'anchor_invalid'
        else:
            return True, ''

    def ask_user(self):

        for invalid_url, invalid_url_info_list in self.invalid_urls.items():
            print('')
            print('Locations of invalid URL:')
            for invalid_url_info in invalid_url_info_list:
                file_path = invalid_url_info['file_path']
                span = invalid_url_info['span']
                print(f'File {file_path}. Span = {span}. Invalid URL = "{invalid_url}"')

            anchor_pos = invalid_url.find('#')
            if anchor_pos >= 0:
                invalid_url_base = invalid_url[:anchor_pos]
                anchor = invalid_url[anchor_pos + 1:]
            else:
                invalid_url_base = invalid_url
                anchor = None
            print(f'invalid_url_base = {invalid_url_base}')
            print(f'anchor = {anchor}')

            # if invalid_url_info_list[0]['error_reason'] == 'url_base_invalid':
            close_urls = difflib.get_close_matches(invalid_url_base, self.valid_urls, n=20)
            print(f'Did you mean:')
            print(f'0. Ignore.')
            for i, close_match in enumerate(close_urls):
                print(f'{i+1}. "{close_match}"')
            user_input = input("Selection? ")

            try:
                user_input = int(user_input)
                if user_input < 0 or user_input > len(close_urls) + 1:
                    print('Invalid input!')
                    continue
                if user_input == 0:
                    continue

                sel_url = close_urls[user_input - 1]
            except ValueError as e:
                # Treat user input as string
                sel_url = user_input

            print(f'Selected URL = {sel_url}')
            print('Checking for anchor')
            if anchor is not None:
                # print(f'valid_anchors = {self.valid_anchors[valid_url]}')
                close_anchors = difflib.get_close_matches(anchor, self.valid_anchors[sel_url], n=10)
                print(f'Invalid anchor "{anchor}". Is it one of these?')
                print(f'0. Ignore.')
                print(f'1. Remove anchor.')
                for i, close_anchor in enumerate(close_anchors):
                    print(f'{i+2}. "{close_anchor}"')
                
                user_input = input("Selection? ")
                if user_input == '':
                    print(f'ERROR: Input cannot be empty.')
                    continue

                try:
                    user_input = int(user_input)
                    if user_input < 0 or user_input > len(close_anchors) + 2:
                        print('Invalid input!')
                        continue
                    elif user_input == 0:
                        continue
                    elif user_input == 1:
                        sel_anchor = ''
                    else:
                        sel_anchor = close_anchors[user_input - 2]
                except ValueError as e:
                    # Treat input as URL
                    sel_anchor = user_input

                print(f'sel_anchor = {sel_anchor}')

            if anchor is None or sel_anchor == '':
                full_sel_url = sel_url
            else:
                full_sel_url = sel_url + '#' + sel_anchor

            for invalid_url_info in invalid_url_info_list:
                self.replace_url(invalid_url, invalid_url_info, full_sel_url)
            
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


    def _anchor_sanitizer(self, text) -> str:
        text = text.lower()
        text = text.strip()
        while not text[-1].isalnum():
            text = text[:-1]
        # Replace any group which is non-alphanumeric with a single `-`
        text = re.sub('[^0-9a-z]+', '-', text)
        return text
        

if __name__ == '__main__':
    main()