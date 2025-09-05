import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'Заводские кошки',
  description: 'Подборка замечательных котиков для вашего дома',
  canonical: 'https://kotodom.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://kotodom.vercel.app/',
    siteName: 'Заводские кошки',
    images: [
      {
        url: 'https://kotodom.vercel.app/seo.png',
        width: 800,
        height: 475,
        alt: 'Заводские кошки',
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
      content: 'заводские кошки, кошки, коты, приют для котов, котики',
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
