import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

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
  pages: pagesCollection,
  updates: updatesCollection,
  authors: authorsCollection,
  test: testCollection,
  docs: defineCollection({ schema: docsSchema() }),
};