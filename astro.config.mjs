import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeMathJax from "rehype-mathjax";
import AutoImport from "astro-auto-import";
import starlightBlog from 'starlight-blog'

// Build menu for starlight sidebar

// This will return paths like './src/content/docs/space/gdal/index.mdx': [Function: ./src/content/docs/space/gdal/index.mdx],
const pagePaths = import.meta.glob("./src/content/docs/**/*.mdx");
let maxNum = 0;

// For building up the sidebar info
let sidebarNodes = {
  label: 'root',
  items: [], 
};

const menuDirectoryBlackList = [
  'blog',
  'site-info',
  'test',
];

for (const path in pagePaths) {
  maxNum++;
  // console.log(path);
  if (maxNum > 9999) {
    break;
  }

  // console.log('path:', await pagePaths[path]());


  // Skip all .mdx files that are in a directory starting with an underscore or the file itself starts with an underscore
  // (we use this to indicate the file is a partial)
  if (path.includes('/_')) {
    continue;
  }


  // Get the path without the './src/content/docs/' prefix
  const pathWithoutPrefix = path.replace('./src/content/docs/', '');
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
  let currentNode = sidebarNodes;
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
        newNode = {
          label: pathPart,
          items: [],
          slug: slug,
        };
      } else {
        // This is a branch node
        newNode = {
          label: pathPart,
          items: [],
        };
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

// console.log('before converting leaf nodes:', JSON.stringify(sidebarNodes, null, 2));

function convertLeafNodes(node) {
  if (node.items.length === 0) {
    // Delete items array
    delete node.items;
    // Delete label
    delete node.label;
    // Leave slugs
    return;
  }

  // Must not be a leaf node
  // Change from page-name to Page Name
  node.label = node.label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  node.collapsed = true;

  for (let i = 0; i < node.items.length; i++) {
    convertLeafNodes(node.items[i]);
  }

  // If the slug is defined, then this branch node also has a page. Add it
  // to the items array
  if (node.slug !== undefined) {
    // Insert Overview page at the top
    // so it is shown as the first item
    // in the UI
    node.items.unshift({
      label: '[Overview]',
      slug: node.slug,
    });
    // Delete the slug
    delete node.slug;
  }
}

console.log('Converting leaf nodes...');
convertLeafNodes(sidebarNodes);

// console.log('sidebar finished:', JSON.stringify(sidebarNodes, null, 2));

// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({
      imports: [
        // Import a component’s default export
        // generates:
        // import A from './src/components/A.astro';
        "./src/components/A.astro",

        {
          // Explicitly alias a default export
          // generates:
          // import { default as B } from './src/components/B.astro';
          "./src/components/B.astro": [["default", "B"]],

          // Import a module’s named exports
          // generates:
          // import { Tweet, YouTube } from 'astro-embed';
          "astro-embed": ["Tweet", "YouTube"],

          // Import all named exports from a module as a namespace
          // generates:
          // import * as Components from './src/components';
          "./src/components": "Components",
        },
      ],
    }),
    // Make sure the MDX integration is included AFTER astro-auto-import
    starlight({
      title: 'mbedded.ninja',
      logo: {
        src: './src/assets/logo.jpg',
      },
      social: {
        github: "https://github.com/withastro/starlight",
      },
      components: {
        Head: "./src/components/starlight/Head.astro",
        SkipLink: './src/components/starlight/SkipLink.astro', // Google Analytics is added in here
      },  
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      // Add a script for Google Tag Manager.
      head: [
        {
          tag: 'script',
          // Content truncated for brevity.
          content:
            "console.log('hello!');",
        },
      ],
      plugins: [starlightBlog({
        authors: {
          gbmhunter: {
            name: 'Geoffrey Hunter',
            title: 'mbedded.ninja Author',
            picture: '/images/authors/gbmhunter.png', // Images in the `public` directory are supported.
            url: 'https://hideoo.dev',
          },
        },
      })],
      sidebar: sidebarNodes.items,
    }),
  ],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeKatex,
        {
          // See https://katex.org/docs/options.html for how macros (or other options)
          // work
          macros: {
            "\\b": "\\mathbf{#1}",
            "\\bhat": "{\\hat{\\mathbf{#1}}}",
          }
        },
      ],
    ],
  },
});
