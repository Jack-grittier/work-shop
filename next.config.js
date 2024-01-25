const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  images: {
    remotePatterns: [
      {
        port: '3000',
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/',
      },
      {
        port: '',
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/',
      },
    ],
  },
})

module.exports = withNextra()