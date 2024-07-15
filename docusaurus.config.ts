import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'mbedded.ninja',
  tagline: 'The embedded engineering website that\'s got your back.',
  favicon: 'images/logo/favicon.ico',

  // Set the production url of your site here
  url: 'https://blog.mbedded.ninja',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  trailingSlash: true, // Makes sure posts have a trailing slash just like docs

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gbmhunter', // Usually your GitHub org/user name.
  projectName: 'blog.mbedded.ninja', // Usually your repo name.

  onBrokenLinks: 'throw', //ignore, warn, throw

  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          editUrl: 'https://github.com/gbmhunter/blog-docusaurus/tree/main/',
          // path: 'docs',
          routeBasePath: '/', // Set this to '/' to serve the docs at the root of the site
          admonitions: {
            keywords: ['example'], // Additional admonition types
            extendDefaults: true,
          },
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
            
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
          blogSidebarCount: 'ALL',
          // pageBasePath: '/posts/',

          routeBasePath: '/updates/', // Docusaurus "blog" content is only used for updates
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-0WDEVQLPS2',
          anonymizeIP: false,
        },
        // blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    //=============================================================================
    // TOP NAVBAR
    //=============================================================================
    navbar: {
      title: 'mbedded.ninja',
      logo: {
        alt: 'mbedded.ninja Logo',
        src: '/images/logo/cartoon-ninja.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Pages',
        },
        {to: '/updates/', label: 'Updates', position: 'left'},
        {
          href: 'https://github.com/gbmhunter',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'NinjaTerm',
              href: 'https://ninjaterm.mbedded.ninja/',
            },
            {
              label: 'NinjaCalc',
              href: 'https://ninjacalc.mbedded.ninja/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/gbmhunter',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} mbedded.ninja. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  scripts: [
    // {
    //   src: '/js/umami.js',
    // },
    {
      src: 'https://umami.mbedded.ninja/script.js',
      defer: true,
      'data-website-id': "e0f4b55d-8cc8-4afe-ab25-68d695b46826",
    },
  ],
};

export default config;
