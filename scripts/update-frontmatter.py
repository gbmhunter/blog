import frontmatter
import yaml
import datetime
import argparse
import glob

def main():

    # Get single argument from command line which is glob path
    # using argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("glob_path", help="Glob path to search for files")
    args = parser.parse_args()
    pathname = args.glob_path

    paths = glob.glob(pathname, recursive=True)
    for file_path in paths:
        parse_file(file_path)

def parse_file(file_path):
    # Prevent aliases in YAML output
    yaml.SafeDumper.ignore_aliases = lambda *args : True

    with open(file_path) as f:
        post = frontmatter.load(f)
    print(post.metadata)

    if 'lastUpdated' not in post.metadata:
        # Convert date to string
        post.metadata['lastUpdated'] = post.metadata['date']

    # Delete categories if it exists
    if 'categories' in post.metadata:
        del post.metadata['categories']

    print(post.metadata)
    # Write back to the file
    with open(file_path, 'w') as f:
        f.write('---\n')
        f.write(yaml.safe_dump(post.metadata, default_flow_style=None))
        f.write('---\n')
        f.write('\n')
        f.write(post.content)
        f.write('\n')

if __name__ == '__main__':
    main()