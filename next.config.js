const withNextra = require(`nextra`)({
  theme: `nextra-theme-docs`,
  themeConfig: `./theme.config.tsx`,
  images: {
    remotePatterns: [
      {
        port: `3000`,
        protocol: `http`,
        hostname: `localhost`,
        pathname: `/`,
      },
      {
        port: ``,
        protocol: `https`,
        hostname: `cdn.shopify.com`,
        pathname: `/`,
      },
    ],
  },
})

module.exports = withNextra({
  async redirects() {
    return [
      {
        source: `/aboutus`,
        destination: `/about`,
        permanent: true,
      },
      {
        source: `/about-us`,
        destination: `/about`,
        permanent: true,
      },
      {
        source: `/aboutme`,
        destination: `/about`,
        permanent: true,
      },
      {
        source: `/about-me`,
        destination: `/about`,
        permanent: true,
      },
      {
        source: `/contactus`,
        destination: `/contact`,
        permanent: true,
      },
      {
        source: `/contact-us`,
        destination: `/contact`,
        permanent: true,
      },
      {
        source: `/contactme`,
        destination: `/contact`,
        permanent: true,
      },
      {
        source: `/contact-me`,
        destination: `/contact`,
        permanent: true,
      },
      {
        source: `/product`,
        destination: `/shop`,
        permanent: true,
      },
      {
        source: `/goods`,
        destination: `/shop`,
        permanent: true,
      },
      {
        source: `/product/:id`,
        destination: `/products/:id`, 
        permanent: true
      }
    ]
  }
})