import { describe, expect, it } from 'vitest';

import { profile } from '../../src/data/profile';
import { talks } from '../../src/data/talks';
import { workItems } from '../../src/data/work';

describe('professional profile content', () => {
  it('keeps the approved positioning and contact paths', () => {
    expect(profile.status).toBe('Product Maker at Gobierto · Madrid');
    expect(profile.headline).toBe(
      'I lead product and engineering teams building useful technology.',
    );
    expect(profile.links.map(({ type }) => type)).toEqual([
      'linkedin',
      'github',
      'email',
    ]);
  });

  it('keeps the selected work narrative complete and ordered', () => {
    expect(workItems.map(({ id }) => id)).toEqual([
      'gobierto',
      'leap',
      'data-learning',
      'research-engineering',
    ]);
  });

  it('links the three selected talks to public evidence', () => {
    expect(
      talks.map(({ title, event, year }) => ({ title, event, year })),
    ).toEqual([
      {
        title: 'Menos features, más negocio',
        event: 'LechazoConf · Valladolid',
        year: 2026,
      },
      {
        title: 'All you need is front',
        event: 'T3chFest · Madrid',
        year: 2018,
      },
      {
        title: 'Emoticrítico',
        event: 'T3chFest · Madrid',
        year: 2016,
      },
    ]);

    for (const talk of talks) {
      expect(new URL(talk.url).protocol).toBe('https:');
    }
  });
});
