import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// NOTE: Astro 6 migration — this file replaces the legacy src/content/config.ts.
// The legacy `type: 'content'`/`type: 'data'` collections were removed in Astro 6,
// so every collection now uses an explicit content-layer loader. The glob loader's
// default id uses the same slug computation as the legacy API (strips a trailing
// "/index", slugifies path segments), so entry.id === the old entry.slug.
// A thin compat shim in src/js/Collections.ts re-attaches `slug` and `render()`
// to entries for downstream code (PageHierarchy, ChildPages, [...slug].astro).

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
  // The negations replicate the legacy collections behavior of ignoring any
  // file or directory whose name starts with "_" (e.g. the _assets/ dirs).
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*.{md,mdx}'], base: './src/content/pages' }),
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
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*.{md,mdx}'], base: './src/content/updates' }),
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
// Each author is a directory under src/content/authors/ containing a data.json.
// The glob loader produces ids like "gbmhunter/data" — MarkdownContent.astro
// extracts the author id with id.split('/')[0], same as with the legacy API.
const authorsCollection = defineCollection({
  loader: glob({ pattern: '**/data.json', base: './src/content/authors' }),
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
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*.{md,mdx}'], base: './src/content/test' }),
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
