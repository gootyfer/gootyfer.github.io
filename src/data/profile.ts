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
  introduction: readonly string[];
  links: readonly ContactLink[];
}

export const profile = {
  name: 'Israel Gutiérrez',
  status: 'Product Maker at Gobierto · Madrid',
  headline: 'I lead product and engineering teams building useful technology.',
  introduction: [
    'For more than 20 years, I have worked across software engineering, research, education, and product leadership.',
    'Today I build products for public procurement professionals at Gobierto, using AI both inside the products and as part of how I explore, decide, and build.',
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
