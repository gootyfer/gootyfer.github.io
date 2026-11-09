import type { ImageMetadata } from 'astro';

import lechazoConfImage from '../assets/talks/lechazoconf-2026.jpg';

export interface Talk {
  title: string;
  event: string;
  year: number;
  url: string;
  featured?: boolean;
  image?: ImageMetadata;
  imageAlt?: string;
  tagline?: string;
  slidesUrl?: string;
}

export const talks: readonly Talk[] = [
  {
    title: 'Menos features, más negocio',
    event: 'LechazoConf · Valladolid',
    year: 2026,
    featured: true,
    url: 'https://lechazoconf.com/2026/index.html#isra',
    slidesUrl:
      'https://docs.google.com/presentation/d/10jE0RjhDFcZ9DJQ_o4TKl2cnWMBVXhBde9sIFHo9MWw/edit?usp=sharing',
    tagline: 'Fewer features, more business.',
    image: lechazoConfImage,
    imageAlt: 'Israel Gutiérrez speaking at LechazoConf 2026',
  },
  {
    title: 'All you need is front',
    event: 'T3chFest · Madrid',
    year: 2018,
    featured: false,
    url: 'https://t3chfest.es/2018/programa/all-you-need-front/',
  },
  {
    title: 'Emoticrítico',
    event: 'T3chFest · Madrid',
    year: 2016,
    featured: false,
    url: 'https://t3chfest.es/2016/programa/emoticritico-midiendo-emociones-politicos/?lang=en',
  },
] as const;
