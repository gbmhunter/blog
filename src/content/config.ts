import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

//=========================================================
// DOCS COLLECTION
//=========================================================
// This site renders every page through Starlight's <StarlightPage> component
// (see src/pages/[...slug].astro) using the custom `pages`/`updates`
// collections below. Starlight's internals still call getCollection('docs')
// and getEntry('docs', ...), so we define a `docs` collection with a no-op
// loader that yields zero entries (we have no docs pages).
//
// NOTE: this loader deliberately does NOT touch the data store. A previous
// version ran store.set()+store.delete() on every load to silence the dev
// warning "The collection "docs" does not exist or is empty...". But that
// added a second content-store write on every hot-reload which, on Windows,
// raced with the reloading page's own .astro/content-*.mjs + data-store.json
// write — the tmp->rename then failed with EPERM/ENOENT, corrupting the store
// so every collection read as "empty" and the page tree collapsed (404s). We
// accept the harmless empty-collection dev warning instead of that churn.
const docsCollection = defineCollection({
  loader: {
    name: 'empty-docs-loader',
    load: async () => {},
  },
  schema: docsSchema(),
});

//=========================================================
// PAGES COLLECTION
//=========================================================
const pagesCollection = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({
    aliases: z.array(z.string()).optional(), // Used to setup dynamic redirects. This is done in [...slug].astro 
    authors: z.array(z.string()),
    date: z.date(),
      description: z.string().optional(),
    draft: z.boolean().default(false),
    image: image().optional(),
    lastUpdated: z.date(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
});

//=========================================================
// UPDATES COLLECTION
//=========================================================
const updatesCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({image}) => z.object({
    authors: z.array(z.string()),
    date: z.date(),
      description: z.string().optional(),
    draft: z.boolean().default(false),
    image: image().optional(),
    lastUpdated: z.date(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    type: z.string(),
  }),
});

//=========================================================
// AUTHORS COLLECTION
//=========================================================
const authorsCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: ({image}) => z.object({
    name: z.string(),
    link: z.string(),
    image: image(),
  }),
});

//=========================================================
// TEST COLLECTION
//=========================================================
const testCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    description: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  docs: docsCollection,
  pages: pagesCollection,
  updates: updatesCollection,
  authors: authorsCollection,
  test: testCollection,
};