# israelgutierrez.es

Personal website for Israel Gutiérrez, built as a static Astro site and published with GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and validate the project with `npm run check`.

## Portrait

`src/assets/israel-gutierrez.jpg` currently contains the existing Gravatar portrait as a launch placeholder. Replace that file with a current square, high-resolution JPEG to update the site without changing the layout.

## Publishing a note

Create a Markdown file under `src/content/notes/` using this frontmatter:

```yaml
---
title: 'A clear title'
description: 'One sentence used in listings and metadata.'
publishedAt: 2026-11-02
draft: true
---
```

Write and preview the note while `draft` is `true`. Run `npm run check`, `npm run test:unit`, and `npm run build` before publishing. Change `draft` to `false` only when the note is ready to appear on the homepage, at `/notes/<filename>/`, and in the RSS feed.
