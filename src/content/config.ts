import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// 2. Define your collection(s)
const pagesCollection = defineCollection({
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
  }),
});

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
  test: testCollection,
  docs: defineCollection({ schema: docsSchema() }),
};