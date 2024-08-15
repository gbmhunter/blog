import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.mbedded.ninja',
  integrations: [
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
        SocialIcons: './src/components/starlight/SocialIcons.astro',
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
