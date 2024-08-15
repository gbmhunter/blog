import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeMathJax from "rehype-mathjax";
import AutoImport from "astro-auto-import";
import starlightBlog from 'starlight-blog'

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
      favicon: '/favicon.ico',
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
