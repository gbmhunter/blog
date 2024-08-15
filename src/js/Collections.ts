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
  let updatesCollection = await getCollection('updates');
  correctUpdatesSlugs(updatesCollection);

  // Merge the updates collection into the pages collection
  const combinedCollection = (pagesCollection as any).concat(updatesCollection);

  return combinedCollection;
}