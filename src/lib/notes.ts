import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type NoteLanguage = 'en' | 'es';
export type NoteKind =
  'build-note' | 'product-practice' | 'adult-learning' | 'talk-note';

export interface NoteData {
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  draft: boolean;
  language: NoteLanguage;
  kind: NoteKind;
  readingMinutes: number;
  topics: string[];
  image?: ImageMetadata;
}

export interface NoteSummary extends NoteData {
  id: string;
}

type NoteEntry = CollectionEntry<'notes'>;
type PublicationData = Pick<NoteData, 'draft' | 'publishedAt'>;
type PublishableNote = PublicationData | { data: PublicationData };

function publicationData(note: PublishableNote): PublicationData {
  return 'data' in note ? note.data : note;
}

export function isPublishedNote(
  note: PublishableNote,
  now = new Date(),
): boolean {
  const { draft, publishedAt } = publicationData(note);
  return !draft && publishedAt.getTime() <= now.getTime();
}

export function sortNotesNewestFirst<T extends PublishableNote>(
  notes: readonly T[],
): T[] {
  return [...notes].sort(
    (left, right) =>
      publicationData(right).publishedAt.getTime() -
      publicationData(left).publishedAt.getTime(),
  );
}

export function toNoteSummary(note: NoteEntry): NoteSummary {
  return {
    id: note.id,
    ...note.data,
  };
}

export async function getPublishedNotes(
  now = new Date(),
): Promise<NoteEntry[]> {
  const notes = await getCollection('notes');
  return sortNotesNewestFirst(
    notes.filter((note) => isPublishedNote(note, now)),
  );
}
