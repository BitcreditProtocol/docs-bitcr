import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Bitcredit Documentation',
  description: 'Comprehensive documentation for Bitcredit',
  // base: '/docs-bitcr/', // not needed for custom domain deployment

  head: [['link', { rel: 'icon', href: 'images/favicon.ico' }]],

  theme: defaultTheme({
    logo: 'images/logo.png',
    logoDark: 'images/logo_dark.png',
    contributors: false,
    lastUpdated: false,
    colorMode: 'light',
    colorModeSwitch: true,

    navbar: [
      { text: 'E-Bill', link: '/e-bill/' },
      { text: 'Wildcat Mint', link: '/wildcat-mint/' },
      { text: 'Glossary', link: '/glossary.md' },
    ],

    sidebar: {
      '/e-bill/': [
        {
          text: 'E-Bill',
          children: [
            '/e-bill/README.md',
            {
              text: 'Concepts',
              children: [
                '/e-bill/concepts/roles.md',
                '/e-bill/concepts/bill-states.md',
                '/e-bill/concepts/general-conditions.md',
                '/e-bill/concepts/validation.md',
              ],
            },
            {
              text: 'Identity Record',
              children: [
                '/e-bill/identity-record/README.md',
                '/e-bill/identity-record/field-description.md',
                '/e-bill/identity-record/identity-restore-transfer.md',
                '/e-bill/identity-record/upload-user-material.md',
              ],
            },
            '/e-bill/cryptographic-primitives/README.md',
            '/e-bill/adding-node.md',
            {
              text: 'Content of Bill',
              children: [
                '/e-bill/content-of-bill/README.md',
                '/e-bill/content-of-bill/field-description.md',
                '/e-bill/content-of-bill/bill-id-and-keys.md',
                '/e-bill/content-of-bill/blockchain.md',
                '/e-bill/content-of-bill/bill-example.md',
              ],
            },
            {
              text: 'Operations',
              children: [
                '/e-bill/operations/README.md',
                '/e-bill/operations/issue.md',
                '/e-bill/operations/request-to-accept.md',
                '/e-bill/operations/accept.md',
                '/e-bill/operations/request-to-pay.md',
                '/e-bill/operations/pay.md',
                '/e-bill/operations/sale.md',
                '/e-bill/operations/endorse.md',
                '/e-bill/operations/mint.md',
                '/e-bill/operations/recourse.md',
              ],
            },
            {
              text: 'Transport',
              children: [
                '/e-bill/transport/README.md',
                '/e-bill/transport/sharing-bills.md',
                '/e-bill/transport/migration-from-dht.md',
              ],
            },
            {
              text: 'Local Build',
              children: [
                '/e-bill/local-build/README.md',
                '/e-bill/local-build/software-installation.md',
                '/e-bill/local-build/configuration.md',
                '/e-bill/local-build/startup-parameters.md',
              ],
            },
            '/e-bill/user-documentation/README.md',
            '/e-bill/faq.md',
            '/glossary.md',
          ],
        },
      ],
      '/wildcat-mint/': [
        {
          text: 'Wildcat Mint',
          children: [
            '/wildcat-mint/README.md',
            '/wildcat-mint/credit-tokens.md',
            '/wildcat-mint/quote-lifecycle.md',
            '/wildcat-mint/cryptographic-primitives.md',
            '/glossary.md',
          ],
        },
      ],
      '/glossary': [
        {
          text: 'Reference',
          children: ['/glossary.md'],
        },
      ],
    },
  }),

  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      server: {
        hmr: false, // Disable HMR
      },
    },
  }),
})
