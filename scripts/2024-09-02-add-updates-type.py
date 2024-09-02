"""
This script was used to set type: updates in the frontmatter for all updates pages.
"""
import frontmatter
import yaml
import datetime
import argparse
import glob

# As per https://github.com/yaml/pyyaml/issues/535
class VerboseSafeDumper(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True

def main():

    # Get single argument from command line which is glob path
    # using argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("glob_path", help="Glob path to search for files")
    args = parser.parse_args()
    pathname = args.glob_path

    paths = glob.glob(pathname, recursive=True)
    for file_path in paths:
        # Ignore any file which contains "/_" in the path
        # Normalized path for Windows and Linux
        if '/_' in file_path or '\\_' in file_path:
            print(f'Skipping file: {file_path}')
            continue
        parse_file(file_path)

def parse_file(file_path):
    print(f'Parsing file: {file_path}')
    # Prevent aliases in YAML output
    yaml.SafeDumper.ignore_aliases = lambda *args : True

    with open(file_path, encoding='utf-8') as f:
        post = frontmatter.load(f)
    print(post.metadata)

    post.metadata['type'] = 'updates'

    # print(post.metadata)
    # Write back to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('---\n')
        f.write(yaml.dump(post.metadata, default_flow_style=None, width=1000, Dumper=VerboseSafeDumper))
        f.write('---\n')
        f.write('\n')
        f.write(post.content)
        f.write('\n')

if __name__ == '__main__':
    main()