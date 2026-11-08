export type ContactLinkType = 'linkedin' | 'github' | 'email';

export interface ContactLink {
  type: ContactLinkType;
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  status: string;
  headline: string;
  principle: string;
  introduction: readonly string[];
  links: readonly ContactLink[];
}

export const profile = {
  name: 'Israel Gutiérrez',
  status: 'Product Maker at Gobierto · Madrid',
  headline: 'Learning by making. Leading by learning.',
  principle: 'Serious about learning / not solemn about it',
  introduction: [
    'I am a hands-on product leader working across product, engineering, and adult learning.',
    'At Gobierto, I work as a Product Maker: from framing the problem to prototyping and implementation, with AI as part of the process.',
  ],
  links: [
    {
      type: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/israelgutierrezrojas/',
    },
    {
      type: 'github',
      label: 'GitHub',
      href: 'https://github.com/gootyfer',
    },
    {
      type: 'email',
      label: 'Email',
      href: 'mailto:me@israelgutierrez.es',
    },
  ],
} as const satisfies Profile;
