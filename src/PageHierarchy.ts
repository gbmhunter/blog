
console.log('Creating page hierarchy...');

export const pageGlob = import.meta.glob("/src/content/docs2/electronics/**/*.mdx");
let maxNum = 0;

class PageNode {
  label: string;
  slug: string;
  items: PageNode[];
  constructor(label: string, slug: string) {
    this.label = label;
    this.slug = slug;
    this.items = [];
  }
}

// This structure is constructed below
export let pageNodes: PageNode = new PageNode('root', '');

const menuDirectoryBlackList = [
  'blog',
  'pyrotechnics',
  'site-info',
  'test',
];

for (const path in pageGlob) {
  maxNum++;
  console.log(path);
  if (maxNum > 10) {
    break;
  }

  // console.log('path:', await pagePaths[path]());


  // Skip all .mdx files that are in a directory starting with an underscore or the file itself starts with an underscore
  // (we use this to indicate the file is a partial)
  if (path.includes('/_')) {
    continue;
  }


  // Get the path without the './src/content/docs/' prefix
  const pathWithoutPrefix = path.replace('/src/content/docs2/', '');
  // console.log(pathWithoutPrefix);

  // Calculate slug by removing index.mdx from the end of the path
  let slug = pathWithoutPrefix.replace('/index.mdx', '');
  // slug = slug + '/';
  // console.log('slug:', slug);

  // Split the path into an array of directories and the file name
  const pathParts = pathWithoutPrefix.split('/');
  // Get rid of the file name (should be index.mdx)
  pathParts.pop();
  // console.log(pathParts);
  let currentNode = pageNodes;
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
    // console.log(pathPart);

    // See if object with label=pathPart exists in currentNode
    const foundChildNodes = currentNode.items.filter((node) => {
      return node.label === pathPart;
    });
    if (foundChildNodes.length === 0) {
      // console.log(`Node with id ${pathPart} not found in ${JSON.stringify(currentNode)}. Creating new node...`);

     
      // Create a new node
      let newNode;
      if (i === pathParts.length - 1) {
        // This is a leaf node
        // newNode = {
        //   label: pathPart,
        //   items: [],
        //   slug: slug,
        // };
        newNode = new PageNode(pathPart, slug);
      } else {
        // This is a branch node
        // newNode = {
        //   label: pathPart,
        //   items: [],
        // };
        newNode = new PageNode(pathPart, '');
      }
      
      currentNode.items.push(newNode);
      currentNode = newNode;
      
    } else if (foundChildNodes.length === 1) {
      // Node already exists
      if (i === pathParts.length - 1) {
        // console.error(`Found .mdx file at already existing branch node. Make sure directories with .mdx files do not contain any child directories with more .mdx files. Path: ${path}.`);
        // This will happen if we hit a branch index page after we have already processed
        // a child node
        // Add a slug so we know there is a page here
        // console.error(`Node ${foundChildNodes[0].label} is getting a slug added with slug ${slug}`);
        foundChildNodes[0].slug = slug;
      } else {
        // console.log(`Node with label ${pathPart} found in ${currentNode}.`);
        currentNode = foundChildNodes[0];

        if (currentNode.items === undefined) {
          console.error(`Node ${currentNode} is a branch node but does not have an items array.`);
          currentNode.items = [];
        }
      }
    } else {
      console.error(`Found more than one node with label ${pathPart} in ${currentNode}.`);
    }
    // console.log(`sidebar is now:`, JSON.stringify(sidebarNodes));

  }
}

console.log('before converting leaf nodes:', JSON.stringify(pageNodes, null, 2));
// Deep copy the sidebarNodes object
export let sidebarData = JSON.parse(JSON.stringify(pageNodes));
console.log('sidebarData:', JSON.stringify(sidebarData, null, 2));
function convertNodesToSidebarData(node: any) {
  if (node.items.length === 0) {
    // Delete items array
    delete node.items;
    // Delete label
    // delete node.label;
    // Copy slug to href
    node.href = node.slug;
    // Delete slug
    delete node.slug;
    return;
  }

  // Must not be a leaf node
  // Change from page-name to Page Name
  node.label = node.label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  node.collapsed = true;

  for (let i = 0; i < node.items.length; i++) {
    convertNodesToSidebarData(node.items[i]);
  }

  // If the slug is defined, then this branch node also has a page. Add it
  // to the items array
  if (node.slug !== undefined) {
    // Insert Overview page at the top
    // so it is shown as the first item
    // in the UI
    node.items.unshift({
      label: '[Overview]',
      href: node.slug,
    });
    // Delete the slug
    delete node.slug;
  } else {
    // Delete the slug
    node.href = node.slug;
    delete node.slug;
  }
}

convertNodesToSidebarData(sidebarData);
console.log('after converting leaf nodes:', JSON.stringify(sidebarData, null, 2));