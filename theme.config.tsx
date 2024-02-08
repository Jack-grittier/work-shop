import React from 'react';
import { useDB } from './pages/_app';
import Form from './components/Form';
import Footer from './components/footer';
import NavIcons from './components/NavIcons';
// import { generateUniqueID } from './pages/_app';
import { DocsThemeConfig } from 'nextra-theme-docs';
// import NextraSearch from './components/NextraSearch';

const siteTitle = `Creative Workshop`;
const description = `Get Creative!`;
// const content = `Creative Workshop is a dashboard for tracking orders through Trello Boards, Lists, Cards API and having it be connected directly and programmatically to the Client which communicates back to the TypeForm API to create new orders.`;

const config: DocsThemeConfig = {
  primaryHue: 195, // Sky Blue
  useNextSeoProps() {
    return {
      titleTemplate: `${(`%s`) as any == `[id]` ? `hello` : `%s`} | ${siteTitle}`,
    }
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  toc: {
    component: null,
  },
  // banner: {
  //   text: `Hello All`,
  //   dismissible: true,
  //   key: `bannerDismissed`,
  // },
  head: <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="icon" href="/assets/images/CatIcon.png" type="image/x-icon"></link>
    <meta name="description" content={`Get Creative!`} />
    <meta property="og:title" content={siteTitle} />
    <meta property="og:type" content={`website`} />
    <meta property="og:site_name" content={siteTitle} />
    <meta property="og:description" content={description}  />
    <meta property="og:image" content={`/assets/images/ogImage.jpg`} />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="482" />
    <meta name="twitter:card" content={`/assets/images/ogImage.jpg`} />
    <meta name="twitter:site" content="@creativeworkshop" />
    <meta name="twitter:title" content={siteTitle} />
    <meta name="twitter:description" content={description}  />
    <meta name="twitter:image" content={`/assets/images/ogImage.jpg`} />
    </>,
  logo: <>
    <img width={100} src={`/assets/images/cwsLongWhiteLogo.svg`} alt={`Logo`} /> 
    {/* <h1 style={{marginLeft: 15}}>Creative Workshop</h1> */}
  </>,
  // navbar: {
    // extraContent: <NextraSearch />
  // },
  ...(useDB() == false && {
    navbar: {
      extraContent: <div className={`navIconsContainer`}>
      <NavIcons />
    </div>
    }
  }),
  search: {
    ...(useDB() == false && {
      placeholder: `Search...`,
    }),
    ...(useDB() == true && {
      component: <>
        <div className={`navIconsContainer showWhenNoDB`}>
          <NavIcons />
        </div>
        <div className={`navFormDiv`} style={{order: 0, display: `flex`, flexDirection: `row`, gridGap: 15, justifyContent: `space-between`, alignItems: `center`}}>
          <section className={`navFormSection showWhenDB`} style={{margin: 0, position: `relative`}}>
            <Form className={`navForm`} style={{display: `flex`, flexDirection: `row`}} />
          </section>
          <NavIcons />
        </div>
      </>
    }),
  },
  docsRepositoryBase: 'https://github.com/strawhat19/CreativeWorkshop/',
  footer: {
    component: <Footer style={{margin: `0 5px`}} />
  },
}

export default config