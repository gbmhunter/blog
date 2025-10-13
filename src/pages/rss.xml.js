/**
 * This file is used to generate the RSS feed for the blog.
 * See https://docs.astro.build/en/recipes/rss/ for more info.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  let updatesCollection = await getCollection('updates');

  // Sort the update pages by data.lastUpdated, most recent first
  updatesCollection = updatesCollection.sort((a, b) => b.data.lastUpdated - a.data.lastUpdated);

  console.log(updatesCollection[0])
  return rss({
    title: 'blog.mbedded.ninja',
    description: 'The embedded engineering site that\'s got your back.',
    site: context.site,
    items: updatesCollection.map((page) => {
      // Remove index.mdx from the id
      const id = page.id.replace('/index.mdx', '');
      const url = '/updates/' + id;
      // Make sure page.body is a string
      let content;
      if (typeof page.body !== 'string') {
        console.error('page.body is not a string', page);
        content = undefined
      } else {
        content = sanitizeHtml(parser.render(page.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        })
      }
      return {
        title: page.data.title,
        pubDate: page.data.pubDate,
        description: page.data.description,
        // Compute RSS link from post `id`
        // This example assumes all posts are rendered as `/blog/[id]` routes
        link: url,
        content: content,
      }
    }),
  });
}