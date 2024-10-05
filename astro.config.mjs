import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import astroExpressiveCode from 'astro-expressive-code';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.mbedded.ninja', // This enables the sitemap generation
  integrations: [
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
      social: {
        github: 'https://github.com/gbmhunter/blog',
      },
      components: {
        Footer: "./src/components/starlight/Footer.astro",
        Head: "./src/components/starlight/Head.astro",
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
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
        }
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
          },
        },
      ],
    ],
  },
});
