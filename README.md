# israelgutierrez.es

Personal website for Israel Gutiérrez, built as a static Astro site and published with GitHub Pages.

## Requirements

- Node.js 24
- npm

Install the exact locked dependencies with:

```bash
npm ci
```

## Local development

```bash
npm run dev
```

The local server prints its URL in the terminal. The most useful commands are:

```bash
npm run format:check
npm run check
npm run test:unit
npm run test:config
npm run build
npm run test:e2e
```

The browser suite covers Chromium, Firefox, and WebKit. Install their local
runtimes once with `npx playwright install chromium firefox webkit`.

## Portrait

`src/assets/israel-gutierrez.jpg` currently contains the existing Gravatar
portrait as a launch placeholder. Replace that file with a current square,
high-resolution JPEG to update the site without changing the layout. Keep the
same filename, run `npm run build`, and inspect the crop at mobile and desktop
widths before committing it.

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

## Publishing

Pull requests run formatting, type, content, configuration, build,
accessibility, and cross-browser checks. A push to `main` runs the same checks
and deploys the generated `dist/` directory through GitHub Pages Actions.

Before changing DNS, verify the deployment independently:

1. Open the successful **Check and deploy site** workflow run in GitHub.
2. Follow its `github-pages` environment URL and check the homepage, portrait,
   contact links, one archived article, `/robots.txt`, and `/sitemap-index.xml`.
3. Confirm the downloaded Pages artifact contains `CNAME` with exactly
   `israelgutierrez.es`.
4. Only then change the public domain records.

GitHub and Namecheap have separate responsibilities:

- In the GitHub repository settings, Pages must use **GitHub Actions** as its
  source and `israelgutierrez.es` as its custom domain. GitHub also manages the
  HTTPS certificate after DNS resolves correctly.
- In Namecheap, DNS records point the apex domain and optional `www` hostname
  to GitHub Pages. Do not change these records until the new Pages artifact has
  been deployed and checked at its GitHub-provided URL.

The root `CNAME` is retained for compatibility with the previous repository;
`public/CNAME` is the source copied into every Astro build.
