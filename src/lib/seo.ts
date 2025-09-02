import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'cat house',
  description: 'A curated list of awesome cats cared by cat-house',
  canonical: 'https://cat-house.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cat-house.vercel.app/',
    siteName: 'cat house',
    images: [
      {
        url: 'https://i.ibb.co/wdxr6M8/seo.png',
        width: 1200,
        height: 630,
        alt: 'cat house',
      },
    ],
  },
  twitter: {
    handle: '@eugene17kotov',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'cat house, cats',
    },
  ],
};

export const getSEO = (pageSEO?: Partial<DefaultSeoProps>): DefaultSeoProps => {
  return {
    ...defaultSEO,
    ...pageSEO,
    openGraph: {
      ...defaultSEO.openGraph,
      ...pageSEO?.openGraph,
    },
    twitter: {
      ...defaultSEO.twitter,
      ...pageSEO?.twitter,
    },
  };
};
