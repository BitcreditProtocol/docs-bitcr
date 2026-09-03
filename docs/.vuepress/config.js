import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'

// @vuepress/plugin-search 2.0.0-rc.131 escapes query text for a RegExp built with the u
// flag, and escapes a hyphen as \-, which is a SyntaxError under that flag. Any query with
// a hyphen ("e-bill") threw inside a Vue computed and unmounted the whole search box.
// Outside a character class a hyphen needs no escaping, so drop it from the escape set.
//
// This used to be a pnpm patch. pnpm has to read the patch file to hash it into the
// lockfile, Dependabot never checks the patches directory out, and pnpm majors disagree on
// where the patch config lives, so every dependency bump broke the frozen install. A
// bundler transform has none of those problems. The build fails with a pointer here when
// the escape set can no longer be found, which is the moment to check whether upstream
// fixed it and delete this.
const brokenEscape = String.raw`/[-/\\^$*+?.()|[\]{}]/gu`
const fixedEscape = String.raw`/[/\\^$*+?.()|[\]{}]/gu`

const fixSearchHyphenEscape = () => {
  let applied = false
  return {
    name: 'bitcr:fix-search-hyphen-escape',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('@vuepress/plugin-search') || !code.includes(brokenEscape)) return null
      applied = true
      return { code: code.replaceAll(brokenEscape, fixedEscape), map: null }
    },
    buildEnd() {
      // The server build externalises or shares the module; only the client bundle is checked.
      if (applied || this.environment?.name === 'ssr') return
      throw new Error(
        'fixSearchHyphenEscape in docs/.vuepress/config.js found nothing to fix in ' +
          '@vuepress/plugin-search. If upstream fixed the hyphen escape, delete the plugin; ' +
          'otherwise a search for a hyphenated term breaks the search box.',
      )
    },
  }
}

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
      plugins: [fixSearchHyphenEscape()],
      server: {
        hmr: false, // Disable HMR
      },
    },
  }),
})
