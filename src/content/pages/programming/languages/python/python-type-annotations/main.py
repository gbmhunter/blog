#!/usr/bin/env python3

from typing import Generator

my_dict: dict = {
    'abc': 1
}

print('Generator')
def my_generator() -> Generator[int, None, None]:
    for i in range(10):
        yield i

print(my_generator())