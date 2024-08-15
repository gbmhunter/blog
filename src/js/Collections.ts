import { getCollection } from 'astro:content';

/**
 * Fixes the slugs of the updates collection. Edits them in-place.
 * @param updatesCollection The list of updates pages (collection).
 */
export function correctUpdatesSlugs(updatesCollection: any[]) {
  for (let update of updatesCollection) {
    if (update.slug === 'index') {
      update.id = 'updates/index.mdx'
      update.slug = 'updates';
    } else {
      update.slug = 'updates/' + update.slug;
    }
  }
}

export async function getAllCollections(): Promise<any[]> {
  let pagesCollection = await getCollection('pages');

  // All pages in the updates collection will have a slug prefixed with "updates/"
  let updatesCollection = await getUpdatesCollection();

  // Merge the updates collection into the pages collection
  const combinedCollection = (pagesCollection as any).concat(updatesCollection);

  return combinedCollection;
}

export async function getUpdatesCollection(): Promise<any[]> {
  // All pages in the updates collection will have a slug prefixed with "updates/"
  let updatesCollection = await getCollection('updates');

  // Filter out draft pages if in production with import.meta.env.PROD
  if (import.meta.env.PROD) {
    updatesCollection = updatesCollection.filter((page) => page.data.draft === false);
  }
  correctUpdatesSlugs(updatesCollection);
  return updatesCollection;
}

/**
 * Returns all updates pages which are suitable for displaying on the homepage. Excludes
 * any pages in the updates collection which are either:
 * - Drafts
 * - Index pages for each year (i.e. type !== 'updates')
 * @returns A list of updates pages which are suitable for displaying on the homepage.
 */
export async function getValidUpdatesPages(): Promise<any[]> {
  let updatesCollection = await getUpdatesCollection();
  return updatesCollection.filter((page) => (page.data.type === 'updates') && (page.data.draft === false));
}