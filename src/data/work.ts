export type WorkId =
  'gobierto' | 'leap' | 'data-learning' | 'research-engineering';

export interface WorkItem {
  id: WorkId;
  title: string;
  period: string;
  description: string;
  url?: string;
}

export const workItems: readonly WorkItem[] = [
  {
    id: 'gobierto',
    title: 'Gobierto',
    period: '2026 — now',
    description:
      'Building products for public procurement professionals, bringing product thinking, engineering judgment, and practical AI into a specialised domain.',
    url: 'https://www.gobierto.es/',
  },
  {
    id: 'leap',
    title: 'Leap by Microverse',
    period: '2019 — 2026',
    description:
      'Led product development for an AI-assisted learning product used by more than 2,000 learners, reaching over 400 paying customers, 20% conversion, and an NPS above 60. Leap was acquired by Platzi in July 2026.',
  },
  {
    id: 'data-learning',
    title: 'Data and learning products',
    period: 'Product leadership',
    description:
      'Built products at the intersection of learning, data, and human feedback, combining discovery, experimentation, analytics, and hands-on technical work.',
  },
  {
    id: 'research-engineering',
    title: 'Research and engineering',
    period: 'Earlier work',
    description:
      'Worked as a software engineer, educator, and researcher, publishing work on learning analytics and classroom orchestration before moving into product leadership.',
  },
] as const;
