
export function getRoutablePages(pagesCollection: any) {
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

class PageNode {
  label: string;
  slug: string | undefined;
  items: PageNode[];
  fileData: any;
  constructor(label: string, slug: string | undefined) {
    this.label = label;
    this.slug = slug;
    this.items = [];
    this.fileData = null;
  }
}


export function getSidebarData(pagesCollection: any) {
  // This structure is constructed below
  let pageNodes: PageNode = new PageNode('root', undefined);

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
      const foundChildNodes = currentNode.items.filter((node) => {
        return node.label === pathPart;
      });
      if (foundChildNodes.length === 0) {
        
        let newNode;
        if (i === pathParts.length - 1) {
          // This is a leaf node
          newNode = new PageNode(pathPart, currentSlug);
          newNode.fileData = collectionPage.data;
        } else {
          newNode = new PageNode(pathPart, currentSlug);
        }
        currentNode.items.push(newNode);
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

          if (currentNode.items === undefined) {
            console.error(`Node ${currentNode} is a branch node but does not have an items array.`);
            currentNode.items = [];
          }
        }
      } else {
        console.error(`Found more than one node with label ${pathPart} in ${currentNode}.`);
      }
    }
  }

  const sidebarData = convertNodesToSidebarData(pageNodes);
  return sidebarData;
}

/**
 * Represents a node in the sidebar data tree structure.
 */
class SidebarNode {
  label: string;
  items: SidebarNode[] | undefined;
  href: string | undefined;
  collapsed: boolean;

  constructor(label: string, items: SidebarNode[] | undefined, href: string | undefined, collapsed: boolean) {
    this.label = label;
    this.items = items;
    this.href = href;
    this.collapsed = collapsed;
  }
}
// Deep copy the sidebarNodes object
function convertNodesToSidebarData(node: PageNode) : SidebarNode {

  let label;
  // Use node.fileData.title if it exists (title set in frontmatter of .mdx file), otherwise use the node.label (path part)
  if (node.fileData !== null && node.fileData.title !== undefined) {
    label = node.fileData.title;
  } else {
    console.warn('No page title found for page:', node);
    label = node.label;
  }

  if (node.items.length === 0) {
    // Must be a leaf node
    return new SidebarNode(label, undefined, node.slug, true);
  }

  // Must not be a leaf node
  // Change from page-name to Page Name
  const href = undefined; // Have to set this to undefined otherwise starlight will render the menu item as a link rather than a category
  const collapsed = true;
  const items = [];

  for (let i = 0; i < node.items.length; i++) {
    items.push(convertNodesToSidebarData(node.items[i]));
  }

  // If the slug is defined, then this branch node also has a page. Add it
  // to the items array
  // if (node.slug !== undefined) {
    if (items.length > 0 && node.label !== 'root') {
    // Insert Overview page at the top
    // so it is shown as the first item
    // in the UI
    items.unshift(new SidebarNode('[Overview]', undefined, node.slug, false));
  }

  return new SidebarNode(label, items, href, collapsed);
}
