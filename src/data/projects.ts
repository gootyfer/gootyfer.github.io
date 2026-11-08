import type { ImageMetadata } from 'astro';

import criticalReaderImage from '../assets/projects/critical-reader.jpg';
import criticalReaderIcon from '../assets/projects/critical-reader-icon.png';
import priceScoringSimulatorImage from '../assets/projects/price-scoring-simulator.jpg';
import unaJornadaDecenteImage from '../assets/projects/una-jornada-decente.jpg';

export type ProjectId =
  'una-jornada-decente' | 'critical-reader' | 'price-scoring-simulator';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: ProjectId;
  title: string;
  kicker: string;
  description: string;
  question: string;
  image: ImageMetadata;
  icon?: ImageMetadata;
  featured: boolean;
  noteHref?: string;
  links: readonly ProjectLink[];
}

export const projects: readonly Project[] = [
  {
    id: 'una-jornada-decente',
    title: 'Una jornada decente',
    kicker: 'Playful argument · Public education',
    description:
      'A small web game that turns ratios, bureaucracy, fatigue, and under-resourced classrooms into a course you can feel—not just a list of claims.',
    question:
      'How can a game make working conditions tangible without presenting students as the problem?',
    image: unaJornadaDecenteImage,
    featured: true,
    noteHref: '/notes/una-jornada-decente/',
    links: [
      {
        label: 'Play',
        href: 'https://israelgutierrez.es/educacion-publica/',
      },
      {
        label: 'Source',
        href: 'https://github.com/gootyfer/educacion-publica',
      },
    ],
  },
  {
    id: 'critical-reader',
    title: 'Critical Reader',
    kicker: 'Browser extension · Responsible AI',
    description:
      'A Chrome extension that highlights discriminatory expressions on demand and gives readers vocabulary for a slower, more critical reading.',
    question:
      'Can an AI reading tool make patterns visible without deciding what the reader should think?',
    image: criticalReaderImage,
    icon: criticalReaderIcon,
    featured: false,
    noteHref: '/notes/critical-reader/',
    links: [
      {
        label: 'Install extension',
        href: 'https://chromewebstore.google.com/detail/feklbnkcmcampfdlicejamjjbhncjfmo',
      },
      {
        label: 'Source',
        href: 'https://github.com/gootyfer/critical-reader',
      },
    ],
  },
  {
    id: 'price-scoring-simulator',
    title: 'Price Scoring Simulator',
    kicker: 'Interactive model · Public procurement',
    description:
      'An interactive way to compare economic bid-scoring formulas, originally built as my product exercise before joining Gobierto.',
    question:
      'How does the chosen price formula change the result of a public tender?',
    image: priceScoringSimulatorImage,
    featured: false,
    links: [
      {
        label: 'Open simulator',
        href: 'https://israelgutierrez.es/price-scoring-simulator/',
      },
      {
        label: 'Source',
        href: 'https://github.com/gootyfer/price-scoring-simulator',
      },
    ],
  },
] as const;
