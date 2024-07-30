#!/usr/bin/env python3

import fileinput
import glob
import os
import re
from inspect import signature
from typing import Callable, List, Optional, Union

class PowerEdit:

    def __init__(self):
        # Set this to True to perform a simulation run, which will not modify anything, and will
        # print more info about changes to stdout
        self.sim_run: bool = True

        self._encoding = 'utf-8'

    def find_files(self, pathname: str, recursive: bool=False) -> List[str]:
        return glob.glob(pathname, recursive=recursive)

    def find_replace(self, file_path: str, find_str: str, replace_str: str) -> str:
        """
        Basic find/replace function that does not use regex. Will write changes to the file
        if `self.sim_run=True`.

        Args:
            file_path: Absolute path to the file you wish to perform find/replace on.
            find_str: The string you wish to search for (not regex).
            replace_str: The string you wish the found text to be replaced with.
        Returns:
            The data that is written to the file after all find/replace operations have occurred.
        """

        # Read in the file
        with open(file_path, 'r', encoding=self._encoding) as file :
            filedata = file.read()

        filedata = filedata.replace(find_str, replace_str)

        if self.sim_run:
            print(f'find_replace() finished. replaced filedata = {filedata}')

        # Write the file out again
        if not self.sim_run:
            with open(file_path, 'w', encoding=self._encoding) as file:
                file.write(filedata)

        return filedata

    def find_replace_regex(
        self, file_path: str, regex_str: str, replace: Union[str, Callable], multiline: bool=False) -> str:
        """
        Advanced find/replace function that uses regex to find matching text.

        Args:
            file_path: Absolute path to the file you wish to perform find/replace on.
            regex_str: The regex pattern (as a string) that you want to match against.
            replace: If replace is a string, the matched pattern will be replaced directly with this
                string. If replace is a function, the function will be called.
                The function must match one of the following definitions:
                    def replace_fn(found_text)
                    def replace_fn(found_text, file_path)
                    def replace_fn(found_text, file_path, regex_match)
                The found text will be replaced with  whatever the function returns (must be a
                
                string)
            multiline: If True, matching will be performed with the re.MULTILINE and re.DOTALL flags
                enabled.
        Returns:
            The data that is written to the file after all find/replace operations have occurred.
        """

        # Read in the file
        with open(file_path, 'r', encoding='utf-8') as file :
            filedata_in = file.read()

        if multiline:
            regex_flags = re.MULTILINE|re.DOTALL
        else:
            regex_flags = 0

        filedata_out = ''

        # Replace the target string
        if isinstance(replace, str):
            regex = re.compile(regex_str, regex_flags)
            filedata_out = re.sub(regex, replace, filedata_in)
        elif callable(replace):
            regex = re.compile(regex_str, regex_flags)

            # Use finditer so we get non-overlapping matches
            matches = regex.finditer(filedata_in)

            last_match_end = 0

            for match in matches:
                # match = regex.search(filedata, curr_pos)
                # print('match =', match.group())

                # # Exit out of find/replace loop if we don't find anymore matches
                # if match is None:
                #     break

                group = match.group()
                sig = signature(replace)
                if len(sig.parameters) == 1:
                    replacement_text = replace(group)
                elif len(sig.parameters) == 2:
                    replacement_text = replace(group, file_path)
                elif len(sig.parameters) == 3:
                    replacement_text = replace(group, file_path, match)
                else:
                    raise ValueError('Provided function does not have the correct number of parameters.')

                if not isinstance(replacement_text, str):
                    raise ValueError('Returned object from replace function must be a string.')
                filedata_out += filedata_in[last_match_end:match.start()] + replacement_text
                last_match_end = match.end()

            # Copy the rest of the file after last match
            filedata_out += filedata_in[last_match_end:]

        else:
            raise RuntimeError(f'replace must be either a string or a callable object. replace = {replace}.')

        if self.sim_run:
            pass
            # print(f'find_replace() finished. replaced filedata = {filedata}')



        # Write the file out again
        if not self.sim_run:
            with open(file_path, 'w', encoding=self._encoding) as file:
                file.write(filedata_out)

        return filedata_in

    def find_insert(self, file_path: str, find_str: str, insert_str: str) -> None:
        """

        Use '\n' to match new lines.

        Iterataively tries to find and insert matches through the file. Could get stuck in recursive loop if insert string
        contains find string.

        Args:
            file_path (str): The file to operate on.
            find_str (str): The string to find in the file. Does not support regex.
            insert_str (str): The string to insert after the last character in find_str.

        Returns:
            None
        """
        with open(file_path, 'r', encoding=self._encoding) as file :
            filedata = file.read()


        start_index = None
        while True:
            start_index = filedata.find(find_str, start_index)
            if start_index == -1:
                break

            insert_at = start_index + len(find_str)
            # print(insert_at)
            filedata = filedata[:insert_at] + insert_str + filedata[insert_at:]

            # Start looking for next match one char past where last
            # match was found
            start_index += 1

        if self.sim_run:
            print(f'find_insert() finished. filedata = {filedata}')
        else:
            with open(file_path, 'w', encoding=self._encoding) as file:
                file.write(filedata)

    @staticmethod
    def strict_find(string, find, start_pos):
        index = string.find(find, start_pos)
        if index == -1:
            raise RuntimeError(f'The text {find} was not found in {string}.')
        return index

    @staticmethod
    def find_nth_match(string, pattern, n):
        curr_pos = -1
        for i in range(n):
            curr_pos = PowerEdit.strict_find(string, pattern, curr_pos + 1)
        return curr_pos
        