export interface Talk {
  title: string;
  event: string;
  year: number;
  url: string;
}

export const talks = [
  {
    title: 'Menos features, más negocio',
    event: 'LechazoConf · Valladolid',
    year: 2026,
    url: 'https://es.linkedin.com/posts/israelgutierrezrojas_hace-tiempo-que-no-daba-una-charla-y-me-apetece-activity-7462555072409825280-9o3k',
  },
  {
    title: 'All you need is front',
    event: 'T3chFest · Madrid',
    year: 2018,
    url: 'https://t3chfest.es/2018/programa/all-you-need-front/',
  },
  {
    title: 'Emoticrítico',
    event: 'T3chFest · Madrid',
    year: 2016,
    url: 'https://t3chfest.es/2016/programa/emoticritico-midiendo-emociones-politicos/?lang=en',
  },
] as const satisfies readonly Talk[];
