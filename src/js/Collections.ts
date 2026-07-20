import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * A routable page: a content collection entry together with the site-relative
 * slug it is served at. Slugs have no leading or trailing slash, e.g.
 * "electronics/circuit-design". The site's root index page has the slug
 * "index" (mapped to the root route in [...slug].astro).
 */
export interface PageRoute {
  slug: string;
  entry: CollectionEntry<'pages'> | CollectionEntry<'updates'>;
}

/**
 * Returns a route for every entry in the pages collection. Page entries are
 * served at their collection id, e.g. the entry for
 * src/content/pages/electronics/index.mdx has id "electronics" and is served
 * at /electronics/.
 */
export async function getPagesRoutes(): Promise<PageRoute[]> {
  const pages = await getCollection('pages');
  return pages.map((entry) => ({ slug: entry.id, entry }));
}

/**
 * Returns a route for every entry in the updates collection. Updates pages
 * are served under /updates/, so the slug is the entry id prefixed with
 * "updates/" (the collection's own root index page maps to "updates" itself).
 * Draft pages are excluded in production builds but included in dev so they
 * can be previewed.
 */
export async function getUpdatesRoutes(): Promise<PageRoute[]> {
  let updates = await getCollection('updates');
  if (import.meta.env.PROD) {
    updates = updates.filter((entry) => entry.data.draft === false);
  }
  return updates.map((entry) => ({
    slug: entry.id === 'index' ? 'updates' : `updates/${entry.id}`,
    entry,
  }));
}

/**
 * Returns the routes for every routable page on the site (the pages and
 * updates collections combined).
 */
export async function getAllRoutes(): Promise<PageRoute[]> {
  return [...(await getPagesRoutes()), ...(await getUpdatesRoutes())];
}

/**
 * Returns all updates entries which are suitable for displaying on the
 * homepage. Excludes any entries in the updates collection which are either:
 * - Drafts (only excluded in production builds; drafts ARE shown when running
 *   the dev server, so they can be previewed on the homepage before publishing)
 * - Index pages for each year (i.e. type !== 'updates')
 */
export async function getValidUpdatesPages(): Promise<CollectionEntry<'updates'>[]> {
  const updates = await getCollection('updates');
  return updates.filter(
    (entry) => entry.data.type === 'updates' && (import.meta.env.DEV || entry.data.draft === false),
  );
}
