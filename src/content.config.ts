import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({
    base: './src/content/notes',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean(),
    image: z.string().optional(),
  }),
});

const archive = defineCollection({
  loader: glob({
    base: './src/content/archive',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    language: z.string().min(2),
    archived: z.literal(true),
  }),
});

export const collections = { archive, notes };
