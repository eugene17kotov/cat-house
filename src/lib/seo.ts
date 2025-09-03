import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'Котодом',
  description: 'Подборка замечательных котиков, о которых заботится Котодом',
  canonical: 'https://kotodom.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://kotodom.vercel.app/',
    siteName: 'Котодом',
    images: [
      {
        url: 'https://kotodom.vercel.app/seo.png',
        width: 1024,
        height: 610,
        alt: 'Котодом',
      },
    ],
  },
  twitter: {
    handle: '@eugene17kotov',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'котодом, кошки, коты, приют для котов, котики',
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
