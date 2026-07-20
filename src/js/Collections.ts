import { getCollection, render } from 'astro:content';

/**
 * Compat shim for the Astro 6+ content layer: entries no longer carry a `slug`
 * property or a `.render()` method (removed with the legacy collections API).
 * Downstream code (PageHierarchy, ChildPages, RecentUpdates, [...slug].astro)
 * still uses both, so re-attach them here in one place. The glob loader's
 * default id uses the same slug computation as the legacy API, so `id` is
 * identical to the old `slug`. Edits entries in-place and returns the array.
 */
function addLegacySlugAndRender(entries: any[]): any[] {
  for (const entry of entries) {
    entry.slug = entry.id;
    entry.render = () => render(entry);
  }
  return entries;
}

/**
 * Fixes the slugs of the updates collection. Edits them in-place.
 * @param updatesCollection The list of updates pages (collection).
 */
export function correctUpdatesSlugs(updatesCollection: any[]) {
  for (let update of updatesCollection) {
    if (update.slug === 'index') {
      update.slug = 'updates';
    } else {
      update.slug = 'updates/' + update.slug;
    }
  }
}

export async function getAllCollections(): Promise<any[]> {
  let pagesCollection = addLegacySlugAndRender(await getCollection('pages'));

  // All pages in the updates collection will have a slug prefixed with "updates/"
  let updatesCollection = await getUpdatesCollection();

  // Merge the updates collection into the pages collection
  const combinedCollection = (pagesCollection as any).concat(updatesCollection);

  return combinedCollection;
}

export async function getUpdatesCollection(): Promise<any[]> {
  // All pages in the updates collection will have a slug prefixed with "updates/"
  let updatesCollection = addLegacySlugAndRender(await getCollection('updates'));

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
 * - Drafts (only excluded in production builds; drafts ARE shown when running the dev
 *   server, so they can be previewed on the homepage before publishing)
 * - Index pages for each year (i.e. type !== 'updates')
 * @returns A list of updates pages which are suitable for displaying on the homepage.
 */
export async function getValidUpdatesPages(): Promise<any[]> {
  let updatesCollection = await getUpdatesCollection();
  return updatesCollection.filter((page) => (page.data.type === 'updates') && (import.meta.env.DEV || page.data.draft === false));
}