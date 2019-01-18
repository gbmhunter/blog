#!/usr/bin/env python3
import argparse

def main():
    parser = argparse.ArgumentParser(description='Example argument parser with sub-commands.')

    # Setting dest='command' means we can later check args.command to see what
    # subcommand was invoked
    subparsers = parser.add_subparsers(dest='command', help='Sub-commands.')

    parser_subcmd_foo = subparsers.add_parser('add', help='Add two numbers together.')
    parser_subcmd_foo.add_argument('num1', type=int, help='First number to add.')
    parser_subcmd_foo.add_argument('num2', type=int, help='Second number to add.')

    parser_subcmd_bar = subparsers.add_parser('print', help='Print a message.')
    parser_subcmd_bar.add_argument('message', help='Message to print.')

    args = parser.parse_args()

    if args.command == 'add':
        print(f'{args.num1 + args.num2}')
    elif args.command == 'print':
        print(args.message)

if __name__ == '__main__':
    main()