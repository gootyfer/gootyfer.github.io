import { describe, expect, it } from 'vitest';

import { profile } from '../../src/data/profile';
import { projects } from '../../src/data/projects';
import { talks } from '../../src/data/talks';
import { workItems } from '../../src/data/work';

describe('professional profile content', () => {
  it('keeps the approved positioning and contact paths', () => {
    expect(profile.status).toBe('Product Maker at Gobierto · Madrid');
    expect(profile.headline).toBe('Learning by making. Leading by learning.');
    expect(profile.principle).toBe(
      'Serious about learning / not solemn about it',
    );
    expect(profile.links.map(({ type }) => type)).toEqual([
      'linkedin',
      'github',
      'email',
    ]);
  });

  it('keeps the approved project hierarchy and public destinations', () => {
    expect(projects.map(({ id }) => id)).toEqual([
      'una-jornada-decente',
      'critical-reader',
      'price-scoring-simulator',
    ]);

    const [game, criticalReader, simulator] = projects;
    expect(game).toMatchObject({
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
    });
    expect(game.image.width).toBeGreaterThan(0);

    expect(criticalReader).toMatchObject({
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
    });
    expect(criticalReader.image.width).toBe(1280);
    expect(criticalReader.icon?.width).toBe(128);

    expect(simulator).toMatchObject({
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
    });
    expect(simulator.noteHref).toBeUndefined();
    expect(simulator.description).toContain('before joining Gobierto');
    expect(projects.filter(({ featured }) => featured)).toHaveLength(1);
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
    expect(talks.filter(({ featured }) => featured)).toHaveLength(1);
    expect(talks[0]).toMatchObject({ featured: true });
    expect(talks[0].image).toBeUndefined();
  });
});
