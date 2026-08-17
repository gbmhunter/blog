import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import astroExpressiveCode from 'astro-expressive-code';
import preact from "@astrojs/preact";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeFootnoteComma from "./src/js/rehypeFootnoteComma.mjs";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.mbedded.ninja', // This enables the sitemap generation
  integrations: [
    preact(),
    astroExpressiveCode({
      // You can optionally override the plugin's default settings here
      frames: {
        // Prevent filenames from trying to extract filenames from code comments. This caused problems,
        // it meant that comments in the first four lines of codes were being interpreted as filenames
        // when they were just plain comments
        extractFileNameFromCode: false,
        removeCommentsWhenCopyingTerminalFrames: false,
      },
    }),
    starlight({
      title: 'mbedded.ninja',
      logo: {
        src: './src/assets/logo.jpg',
      },
      favicon: '/favicon.ico',
      social: [
        {
          icon: 'github',
          href: 'https://github.com/gbmhunter/blog',
          label: 'GitHub',
        },
      ],
      components: {
        Footer: "./src/components/starlight/Footer.astro",
        Head: "./src/components/starlight/Head.astro",
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        SkipLink: './src/components/starlight/SkipLink.astro', // Google Analytics is added in here
        SocialIcons: './src/components/starlight/SocialIcons.astro',
      },  
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      head: [
        // Katex CSS is required display equations correctly. A good sign this is not included is when
        // you each equation twice (once in plain text)
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
          },
        },
      ],
    }),
  ],
  vite: {
    optimizeDeps: {
      // Pre-bundle deps that are only imported by a single lazily-hydrated island.
      // The /tools/ index (ToolsIndex.jsx) imports @formkit/auto-animate, which is
      // used nowhere else. Without this, Vite discovers it on the first visit to
      // /tools/, re-optimizes deps, and the island's in-flight dynamic import fails
      // with a 504 "Outdated Optimize Dep" / "Failed to fetch dynamically imported
      // module". Listing it here optimizes it at startup and avoids that race.
      include: ['@formkit/auto-animate'],
    },
    resolve: {
      alias: {
        // Send React's JSX runtime to Preact's.
        //
        // Nothing here imports React — this exists for Vite's dependency
        // *scanner*. @astrojs/preact transforms JSX with a Babel plugin, but
        // the scanner runs its own JSX transform over the source without that
        // plugin and falls back to the default automatic runtime, emitting an
        // import of `react/jsx-dev-runtime` for the .jsx widgets. React isn't
        // installed, so the scan dies with "Failed to run dependency scan.
        // Skipping dependency pre-bundling." — which aborts pre-bundling for
        // the whole project and is what makes lazily-discovered deps blow up
        // with 504 "Outdated Optimize Dep" (see the `include` note above).
        //
        // The scanner's JSX import source is not configurable: `optimizeDeps.
        // esbuildOptions` is ignored (Vite optimizes with Rolldown now),
        // `optimizeDeps.rolldownOptions.jsx` is rejected outright ("Invalid
        // key: Expected never"), and a top-level `oxc.jsx` is accepted but the
        // scanner does not consult it. Making the phantom specifier resolve is
        // the remaining lever. It is also semantically right: the JSX in those
        // files really is Preact's, only mislabelled by the scanner.
        'react/jsx-dev-runtime': 'preact/jsx-dev-runtime',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
  },
  markdown: {
    // Astro 7 removed the top-level markdown.remarkPlugins/rehypePlugins
    // options (the default markdown parser is now the Rust-based Sätteri).
    // Passing a unified() processor opts back into the remark/rehype pipeline,
    // which this site needs for remark-math + rehype-katex. @astrojs/mdx 7
    // inherits the plugins from this processor for all .mdx pages.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        [
          rehypeKatex,
          {
            displayMode: false,
            strict: false,
            // See https://katex.org/docs/options.html for how macros (or other options)
            // work
            // support eqref
            trust: (context) => ['\\htmlId', '\\href'].includes(context.command),
            macros: {
              "\\b": "\\mathbf{#1}",
              "\\bhat": "{\\hat{\\mathbf{#1}}}",
              "\\eqref": "\\href{###1}{(\\text{#1})}",
              "\\ref": "\\href{###1}{\\text{#1}}",
              "\\label": "\\htmlId{#1}{}",
              "\\unit": "\\,\\mathrm{#1}",
            },
          },
        ],
        rehypeFootnoteComma,
      ],
    }),
  },
});
