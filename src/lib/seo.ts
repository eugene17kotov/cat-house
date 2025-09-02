import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'Котодом',
  description: 'Подборка замечательных котиков, о которых заботится Котодом',
  canonical: 'https://cat-house-msk.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://cat-house-msk.vercel.app/',
    siteName: 'Котодом',
    images: [
      {
        url: 'https://cat-house-msk.vercel.app/seo.png',
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
      content: 'cat house, котодом, кошки, коты, приют для котов',
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
