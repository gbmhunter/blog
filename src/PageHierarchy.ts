console.log('==========================================================================================================');
console.log('Creating page hierarchy...');
console.log('==========================================================================================================');

const maxPages = 10000;

export let pageGlob = import.meta.glob("/src/content/docs2/**/*.mdx");

class PageRoutes {
  slug: string;
  fileData: any;
  constructor(slug: string, fileData: any) {
    this.slug = slug;
    this.fileData = fileData;
  }
}
export let pageRoutes: PageRoutes[] = [];
let count = 0;
for (const path in pageGlob) {
  if (count > maxPages) {
    break;
  }
  // Skip all .mdx files that are in a directory starting with an underscore or the file itself starts with an underscore
  // (we use this to indicate the file is a partial)
  if (path.includes('/_')) {
    continue;
  }

  let pageInfo = await pageGlob[path]();
  // Absolute slug in the form "/electronics/components/resistors/", e.t.c
  const slug = '/' + path.replace('/src/content/docs2/', '').replace('index.mdx', '');
  pageRoutes.push(new PageRoutes(slug, pageInfo));
  count++;
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

// This structure is constructed below
export let pageNodes: PageNode = new PageNode('root', undefined);

const menuDirectoryBlackList = [
  'blog',
  'pyrotechnics',
  'site-info',
  'test',
];

for (const pageRoute of pageRoutes) {
  // console.log('pageRoute:', pageRoute);

  // // Get the path without the './src/content/docs/' prefix
  // const pathWithoutPrefix = path.replace('/src/content/docs2/', '');
  // // console.log(pathWithoutPrefix);

  // // Calculate slug by removing index.mdx from the end of the path
  // let slug = pathWithoutPrefix.replace('/index.mdx', '');
  // slug = '/' + slug;
  // console.log('slug:', slug);

  // Split the path into an array of directories and the file name
  const pathParts = pageRoute.slug.split('/');
  // Get rid of the file name (should be index.mdx)
  pathParts.pop();
  // Get rid of empty first element
  pathParts.shift();
  // console.log('pathParts:', pathParts);
  // console.log(pathParts);
  let currentNode = pageNodes;
  let currentSlug = '/';
  for (let i = 0; i < pathParts.length; i++) {
    const pathPart = pathParts[i];

    // If we are looking at the first directory under docs/
    // check the names against the blacklist
    if (i === 0) {
      if (menuDirectoryBlackList.includes(pathPart)) {
        // console.log(`Skipping directory ${pathPart} as it is in the blacklist.`);
        break;
      }
    }

    currentSlug += pathPart + '/';

    // See if object with label=pathPart exists in currentNode
    const foundChildNodes = currentNode.items.filter((node) => {
      return node.label === pathPart;
    });
    if (foundChildNodes.length === 0) {
      // console.log(`Node with id ${pathPart} not found in currentNode. Creating new node...`);
      
      let newNode;
      if (i === pathParts.length - 1) {
        // This is a leaf node
        newNode = new PageNode(pathPart, pageRoute.slug);
        newNode.fileData = pageRoute.fileData;
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
        foundChildNode.fileData = pageRoute.fileData;
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

// console.log('pageNodes:', JSON.stringify(pageNodes, null, 2));

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

  // console.log('convertNodesToSidebarData() called with node:', node);
  let label;
  if (node.fileData !== null && node.fileData.frontmatter !== undefined && node.fileData.frontmatter.title !== undefined) {
    label = node.fileData.frontmatter.title;
  } else {
    console.warn('No page title found for page:', node.label);
    // label = node.label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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

export const sidebarData = convertNodesToSidebarData(pageNodes);
// console.log('after converting leaf nodes:', JSON.stringify(sidebarData, null, 2));