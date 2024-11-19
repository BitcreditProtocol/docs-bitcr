import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  lang: 'en-US',

  title: 'Bitcredit Documentation',
  description: 'Comprehensive documentation for Bitcredit',

  theme: defaultTheme({
    logo: '',
    contributors: false,

    navbar: [
      { text: 'E-Bill', link: '/e-bill/' },
      { text: 'Wildcat Mint', link: '/wildcat-mint/' },
    ],

    sidebar: {
      '/e-bill/': [
        {
          text: 'E-Bill',
          children: [
            '/e-bill/README.md',
            {
              text: 'Cryptographic Primitives',
              children: [
                '/e-bill/cryptographic-primitives/ed25519.md',
                '/e-bill/cryptographic-primitives/rsa.md',
                '/e-bill/cryptographic-primitives/secp256k1.md',
              ],
            },
            {
              text: 'Identity Record',
              children: [
                '/e-bill/identity-record/field-description.md',
                '/e-bill/identity-record/key-pairs-generation.md',
                '/e-bill/identity-record/node-id.md',
                '/e-bill/identity-record/dht-identity-creation.md',
                '/e-bill/identity-record/identity-restore-transfer.md',
                '/e-bill/identity-record/upload-user-material.md',
              ],
            },
            '/e-bill/adding-node.md',
            {
              text: 'Content of Bill',
              children: [
                '/e-bill/content-of-bill/field-description.md',
                '/e-bill/content-of-bill/uploading-files.md',
                '/e-bill/content-of-bill/bill-key-pairs.md',
                '/e-bill/content-of-bill/topic-creation.md',
                '/e-bill/content-of-bill/bill-example.md',
                '/e-bill/content-of-bill/bill-blockchain-consensus.md',
                '/e-bill/content-of-bill/download-pdf.md',
              ],
            },
            {
              text: 'Roles in Bill',
              children: [
                '/e-bill/roles-in-bill/drawer.md',
                '/e-bill/roles-in-bill/drawee.md',
                '/e-bill/roles-in-bill/payee.md',
                '/e-bill/roles-in-bill/payer.md',
                '/e-bill/roles-in-bill/holder.md',
                '/e-bill/roles-in-bill/endorser.md',
                '/e-bill/roles-in-bill/endorsee.md',
                '/e-bill/roles-in-bill/seller.md',
                '/e-bill/roles-in-bill/buyer.md',
                '/e-bill/roles-in-bill/guarantor.md',
              ],
            },
            {
              text: 'Local Build',
              children: [
                '/e-bill/local-build/configuration.md',
                '/e-bill/local-build/startup-parameters.md',
                '/e-bill/local-build/software-installation.md',
              ],
            },
            {
              text: 'User Documentation',
              children: [
                '/e-bill/user-documentation/ui-with-screenshots.md',
                '/e-bill/user-documentation/settings.md',
                '/e-bill/user-documentation/journey-map.md',
              ],
            },
            {
              text: 'Operations',
              children: [
                {
                  text: 'Issue',
                  children: [
                    '/e-bill/operations/issue/two-party-bill.md',
                    '/e-bill/operations/issue/three-party-bill.md',
                    '/e-bill/operations/issue/field-description.md',
                    '/e-bill/operations/issue/communication-channels.md',
                  ],
                },
                {
                  text: 'Accept',
                  children: [
                    '/e-bill/operations/accept/two-vs-three-party.md',
                    '/e-bill/operations/accept/action-details.md',
                    '/e-bill/operations/accept/field-description.md',
                  ],
                },
                {
                  text: 'Request to Accept',
                  children: [
                    '/e-bill/operations/request-to-accept/two-vs-three-party.md',
                    '/e-bill/operations/request-to-accept/action-details.md',
                    '/e-bill/operations/request-to-accept/field-description.md',
                  ],
                },
                {
                  text: 'Sale',
                  children: [
                    '/e-bill/operations/sale/money-transfer-address.md',
                    '/e-bill/operations/sale/validity-period.md',
                    '/e-bill/operations/sale/action-details.md',
                    '/e-bill/operations/sale/field-description.md',
                  ],
                },
                {
                  text: 'Buy',
                  children: [
                    '/e-bill/operations/buy/validity-period.md',
                    '/e-bill/operations/buy/action-details.md',
                    '/e-bill/operations/buy/field-description.md',
                  ],
                },
                {
                  text: 'Request to Pay',
                  children: [
                    '/e-bill/operations/request-to-pay/action-details.md',
                    '/e-bill/operations/request-to-pay/field-description.md',
                  ],
                },
                {
                  text: 'Pay',
                  children: [
                    '/e-bill/operations/pay/money-transfer-address.md',
                    '/e-bill/operations/pay/action-details.md',
                    '/e-bill/operations/pay/field-description.md',
                  ],
                },
                {
                  text: 'Receive Payment',
                  children: [
                    '/e-bill/operations/receive-payment/action-details.md',
                    '/e-bill/operations/receive-payment/field-description.md',
                  ],
                },
                {
                  text: 'Recourse',
                  children: [
                    '/e-bill/operations/recourse/action-details.md',
                    '/e-bill/operations/recourse/field-description.md',
                    '/e-bill/operations/recourse/rules.md',
                  ],
                },
                {
                  text: 'Endorse',
                  children: [
                    '/e-bill/operations/endorse/action-details.md',
                    '/e-bill/operations/endorse/field-description.md',
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/wildcat-mint/': [
        {
          text: 'Wildcat Mint',
          children: [
            '/wildcat-mint/README.md',
            {
              text: 'Cryptographic Primitives',
              children: [
                '/wildcat-mint/cryptographic-primitives/cashu.md',
                '/wildcat-mint/cryptographic-primitives/secp256k1.md',
              ],
            },
            {
              text: 'Request for Minting',
              children: [
                '/wildcat-mint/request-for-minting/bill-delivery.md',
                '/wildcat-mint/request-for-minting/keys-delivery.md',
              ],
            },
            {
              text: 'Quote',
              children: [
                '/wildcat-mint/quote/credit-check.md',
                '/wildcat-mint/quote/discount-interest.md',
                '/wildcat-mint/quote/keyset-generation.md',
                '/wildcat-mint/quote/quota-id.md',
                '/wildcat-mint/quote/validity-period.md',
                '/wildcat-mint/quote/user-notification.md',
              ],
            },
            {
              text: 'User Quote Check',
              children: [
                '/wildcat-mint/user-quote-check/rejection.md',
                '/wildcat-mint/user-quote-check/confirmation.md',
              ],
            },
            {
              text: 'Credit Tokens',
              children: [
                '/wildcat-mint/credit-tokens/explanation.md',
                '/wildcat-mint/credit-tokens/prefix.md',
                '/wildcat-mint/credit-tokens/wildcat-fee.md',
                '/wildcat-mint/credit-tokens/delivery.md',
              ],
            },
            {
              text: 'Token Conversion',
              children: [
                '/wildcat-mint/token-conversion/redemption.md',
                '/wildcat-mint/token-conversion/discounting.md',
              ],
            },
            {
              text: 'Communication Channels',
              children: [
                {
                  text: 'Wildcat API',
                  children: [
                    '/wildcat-mint/communication-channels/wildcat-api/bills.md',
                    '/wildcat-mint/communication-channels/wildcat-api/quotes.md',
                  ],
                },
                {
                  text: 'Credit Tokens',
                  children: [
                    '/wildcat-mint/communication-channels/credit-tokens/qr.md',
                    '/wildcat-mint/communication-channels/credit-tokens/nfc.md',
                    '/wildcat-mint/communication-channels/credit-tokens/string.md',
                    '/wildcat-mint/communication-channels/credit-tokens/sending-tokens.md',
                    '/wildcat-mint/communication-channels/credit-tokens/redeeming-tokens.md',
                  ],
                },
              ],
            },
            {
              text: 'Terms, FAQ, Glossary',
              children: [
                '/wildcat-mint/terms-faq-glossary/terms.md',
                '/wildcat-mint/terms-faq-glossary/faq.md',
                '/wildcat-mint/terms-faq-glossary/glossary.md',
              ],
            },
          ],
        },
      ],
    },
  }),
  
  plugins: [
    searchProPlugin({
      // your options
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      server: {
        hmr: {
          overlay: false, // Disable error overlay in the browser
        },
      },
    },
  }),
})