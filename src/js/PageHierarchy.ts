export function getRoutablePages(pagesCollection: any[]) {
  /**
   * Filter out all pages that are not routable. A page is not routable if it's slug includes "/_".
   * 
   * @param pagesCollection The list of pages to filter. Each item should be in the format as returned by await getCollection().
   * @returns A list of pages that are routable, in the same format as the input except with the non-routable pages removed.
   */
  let routablePages = [];
  for (const page of pagesCollection) {
    // Skip all .mdx files that are in a directory starting with an underscore or the file itself starts with an underscore
    // (we use this to indicate the file is a partial)
    if (page.slug.includes('/_')) {
      continue;
    }

    // if (page.slug === 'index') {
    //   page.slug = '/';
    // }
    routablePages.push(page);
  }
  return routablePages;
}

/**
 * Represents a page in the hierarchical page structure.
 */
class PageNode {
  label: string;
  slug: string | undefined;
  parent: PageNode | null;

  /**
   * The children of this node in the page hierarchy.
   */
  children: PageNode[];
  fileData: any;
  constructor(label: string, slug: string | undefined, parent: PageNode | null) {
    this.label = label;
    this.slug = slug;
    this.parent = parent;
    this.children = [];
    this.fileData = null;
  }
}

export function getPageHierarchy(pagesCollection: any[]): PageNode {
  // This structure is constructed below
  let pageNodes: PageNode = new PageNode('root', undefined, null);

  const menuDirectoryBlackList = [
    // 'blog',
    'pyrotechnics',
    'site-info',
    'test',
  ];

  for (const collectionPage of pagesCollection) {
    // Root page in collection is index.mdx, we don't want to include it in the sidebar
    if (collectionPage.slug === 'index') {
      pageNodes.fileData = collectionPage.data;
      continue;
    }

    // Split the path into an array of directories and the file name
    const pathParts = collectionPage.slug.split('/');
    let currentNode = pageNodes;
    let currentSlug = '/';
    for (let i = 0; i < pathParts.length; i++) {
      const pathPart = pathParts[i];

      // If we are looking at the first directory under docs/
      // check the names against the blacklist
      if (i === 0) {
        if (menuDirectoryBlackList.includes(pathPart)) {
          break;
        }
      }

      currentSlug += pathPart + '/';

      // See if object with label=pathPart exists in currentNode
      const foundChildNodes = currentNode.children.filter((node) => {
        return node.label === pathPart;
      });
      if (foundChildNodes.length === 0) {
        
        let newNode;
        if (i === pathParts.length - 1) {
          // This is a leaf node
          newNode = new PageNode(pathPart, currentSlug, currentNode);
          newNode.fileData = collectionPage.data;
        } else {
          newNode = new PageNode(pathPart, currentSlug, currentNode);
        }
        currentNode.children.push(newNode);
        currentNode = newNode;
      } else if (foundChildNodes.length === 1) {
        // Node already exists
        let foundChildNode = foundChildNodes[0];
        if (i === pathParts.length - 1) {
          // This will happen if we hit a branch index page after we have already processed
          // a child node
          // Add a slug so we know there is a page here
          foundChildNode.fileData = collectionPage.data;
        } else {
          // console.log(`Node with label ${pathPart} found in ${currentNode}.`);
          currentNode = foundChildNode;

          if (currentNode.children === undefined) {
            console.error(`Node ${currentNode} is a branch node but does not have an items array.`);
            currentNode.children = [];
          }
        }
      } else {
        console.error(`Found more than one node with label ${pathPart} in ${currentNode}.`);
      }
    }
  }
  return pageNodes;
}

/**
 * Locates a page node in the hierarchy based on the given slug.
 * @param slug The slug of the page to find.
 * @param hierarchy The root of the page hierarchy.
 * @returns The found PageNode or undefined if not found.
 */
export function findPageNodeBySlug(slug: string, hierarchy: PageNode): PageNode | undefined {
	if (!slug) return undefined;

	const pathParts = slug.split('/').filter(part => part !== '');

	let currentNode = hierarchy;

	for (const part of pathParts) {
		const foundChild = currentNode.children.find(child => child.label === part);
		if (!foundChild) return undefined;
		currentNode = foundChild;
	}

	return currentNode.fileData ? currentNode : undefined;
}

/**
 * Represents sidebar data for Starlight.
 */
interface SidebarData {
  label: string;
  link?: string;
  items?: SidebarData[];
  collapsed?: boolean;
}

/**
 * Converts our custom page hierarchy structure into the format that Starlight expects for the sidebar prop.
 * 
 * This function has to change what is returned when Starlight updated to v0.26.0, due to the sidebar data structure 
 * that StarlightPage expects changing. See https://newreleases.io/project/github/withastro/starlight/release/@astrojs%2Fstarlight@0.26.0 for more details.
 * @param node The root PageNode of the page hierarchy to convert to sidebar data.
 * @returns An object that StarlightPage expects for the sidebar prop.
 */
export function convertNodesToSidebarData(node: PageNode) : SidebarData {
  let label;
  // Use node.fileData.title if it exists (title set in frontmatter of .mdx file), otherwise use the node.label (path part)
  if (node.fileData !== null && node.fileData.title !== undefined) {
    label = node.fileData.title;
  } else {
    console.warn('No page title found for page:', node);
    label = node.label;
  }

  if (node.children.length === 0) {
    // Must be a leaf node
    return { label, link: node.slug };
  }

  // Must not be a leaf node
  // Change from page-name to Page Name
  const items = [];

  for (let i = 0; i < node.children.length; i++) {
    items.push(convertNodesToSidebarData(node.children[i]));
  }

  // Sort items alphabetically by label
  items.sort((a, b) => a.label.localeCompare(b.label));

  // If the slug is defined, then this branch node also has a page. Add it
  // to the items array
  if (items.length > 0 && node.label !== 'root') {
    // Insert Overview page at the top
    // so it is shown as the first item
    // in the UI
    items.unshift({ label: '[Overview]', link: node.slug });
  }

  // Make sure that all branch nodes are collapsed by default. Client side
  // script will expand the relevant ones so the current page is visible in the menu.
  return { label, items, collapsed: true };
}
