import rss from '@astrojs/rss';

import { getPublishedNotes } from '../lib/notes';

export async function GET(context: { site?: URL }) {
  const notes = await getPublishedNotes();

  return rss({
    title: 'Notes by Israel Gutiérrez',
    description:
      'Notes on product and engineering leadership, practical AI, and building useful technology.',
    site: context.site ?? new URL('https://israelgutierrez.es'),
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishedAt,
      link: `/notes/${note.id}/`,
    })),
  });
}
