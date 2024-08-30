import frontmatter

with open('src/content/updates/2010/12-18-the-motor-spins/index.mdx') as f:
    post = frontmatter.load(f)
    print(post.metadata)