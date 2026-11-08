import { describe, expect, it } from 'vitest';

import {
  isPublishedNote,
  sortNotesNewestFirst,
  type NoteSummary,
} from '../../src/lib/notes';

const now = new Date('2026-11-02T12:00:00.000Z');

function note(id: string, publishedAt: string, draft = false): NoteSummary {
  return {
    id,
    title: id,
    description: `${id} description`,
    publishedAt: new Date(publishedAt),
    draft,
    language: 'en',
    kind: 'build-note',
    readingMinutes: 4,
    topics: ['testing'],
  };
}

describe('note publication rules', () => {
  it('excludes drafts', () => {
    expect(
      isPublishedNote(note('private', '2026-10-01T00:00:00.000Z', true), now),
    ).toBe(false);
  });

  it('excludes future-dated notes', () => {
    expect(
      isPublishedNote(note('future', '2026-11-03T00:00:00.000Z'), now),
    ).toBe(false);
  });

  it('includes a public note whose publication time has arrived', () => {
    expect(
      isPublishedNote(note('public', '2026-11-02T12:00:00.000Z'), now),
    ).toBe(true);
  });

  it('sorts newest first without mutating the input', () => {
    const oldest = note('oldest', '2026-01-01T00:00:00.000Z');
    const newest = note('newest', '2026-10-01T00:00:00.000Z');
    const original = [oldest, newest] as const;

    expect(sortNotesNewestFirst(original).map(({ id }) => id)).toEqual([
      'newest',
      'oldest',
    ]);
    expect(original.map(({ id }) => id)).toEqual(['oldest', 'newest']);
    expect(sortNotesNewestFirst(original)[0]).toBe(newest);
  });

  it('returns an empty list for an empty input', () => {
    expect(sortNotesNewestFirst([])).toEqual([]);
  });
});
