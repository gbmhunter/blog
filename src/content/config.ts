import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

//=========================================================
// DOCS COLLECTION
//=========================================================
// This site renders every page through Starlight's <StarlightPage> component
// (see src/pages/[...slug].astro) using the custom `pages`/`updates`
// collections below. Starlight's internals still call getCollection('docs')
// and getEntry('docs', ...) when building route data, so the `docs` collection
// must be *defined* — otherwise the dev server logs:
//   "The collection "docs" does not exist or is empty..."
//   "The collection "docs" does not exist. Please ensure it is defined..."
// We keep no docs pages, so instead of Starlight's directory-globbing
// docsLoader() (which warns "No files found matching glob" on an empty dir) we
// register the collection with a no-op loader that yields zero entries.
const docsCollection = defineCollection({
  loader: {
    name: 'empty-docs-loader',
    // Touch the store so the `docs` collection is registered (otherwise
    // getCollection('docs') warns "does not exist or is empty"), then remove
    // the entry so Starlight generates zero doc routes (a real entry crashes
    // Starlight's sidebar navigation builder).
    load: async ({ store }) => {
      store.set({ id: '__init__', data: { title: '__init__' } });
      store.delete('__init__');
    },
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