# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish Israel Gutiérrez's minimal editorial personal website, notes system, preserved 2014 article, and custom-domain GitHub Pages deployment.

**Architecture:** Astro generates a fully static site from small `.astro` components, typed profile data, and Markdown content collections. Plain CSS provides the visual system, Playwright plus axe checks the built site, and GitHub Actions publishes it to GitHub Pages before the Namecheap DNS cutover.

**Tech Stack:** Astro, TypeScript, plain CSS, Markdown/MDX content collections, Vitest, Playwright, axe-core, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-02-personal-website-design.md`

## Global Constraints

- The first release is English-only and uses `https://israelgutierrez.es` as its canonical origin.
- Generate static HTML; do not add a client-side UI framework, CMS, database, analytics, newsletter, contact form, comments, or authentication.
- Ship no browser JavaScript unless a specific enhancement demonstrably requires it; the complete site must work without JavaScript.
- Use plain CSS with custom properties; do not add Tailwind, a component library, gradients, glowing decoration, card grids, skill badges, typewriter effects, or generic AI imagery.
- Keep the global header to the home link plus LinkedIn, GitHub, and Email.
- Treat AI as part of Israel's product and engineering practice, not as an unsupported standalone expertise claim.
- Use the approved CV, LinkedIn profile, and public source pages as the source of truth; do not infer new material claims.
- Do not expose follower counts, recommendations, old certifications, phone numbers, street addresses, or obsolete social profiles.
- Meet WCAG 2.2 AA expectations and respect `prefers-reduced-motion`.
- Do not publish placeholder notes. Draft content must be excluded from HTML lists, routes, RSS, and sitemap output.
- Keep the 2014 article at `/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/`, but do not list it in the homepage Notes section.
- Validate the new site on GitHub Pages before changing Namecheap DNS.

## Review Focus

- **Zero published notes:** the homepage must render an honest empty state, while RSS remains valid and no draft URL is emitted; pinned by Task 5's unit and browser tests.
- **Draft leakage:** a draft must never appear in the homepage, generated note routes, RSS, or sitemap; pinned by Tasks 5 and 7.
- **Long names and narrow screens:** the header and editorial content must wrap without overflow at 320 CSS pixels; pinned by Task 8's mobile test.
- **Legacy deep links:** the exact 2014 URL and both legacy blog indexes must return usable static pages on GitHub Pages; pinned by Task 6's route test.
- **Custom-domain variance:** apex, `www`, and the GitHub Pages URL must settle on one HTTPS canonical origin without redirect loops; pinned by Task 10's public verification checklist.

---

## Preflight: Anchor implementation to the existing site history

This workspace currently contains the approved design documentation but has no Git remote. Before Task 1 writes product files, the executor must prevent the new local history from accidentally replacing an unknown GitHub Pages history.

- [ ] Confirm the authenticated target repository and its default branch with `gh repo view gootyfer/gootyfer.github.io` (or identify the actual repository serving `gootyfer.github.io` if that name no longer exists).
- [ ] Fetch the target read-only and inspect its branches, Pages source, CNAME, and legacy article source. Do not force-push, delete a branch, or overwrite the remote working tree.
- [ ] Use `superpowers:using-git-worktrees` to create the implementation worktree from the target repository's current default/source branch. If no target repository exists, stop and confirm whether to create `gootyfer/gootyfer.github.io` before continuing.
- [ ] Bring the approved spec and this plan into the implementation branch, preserving the remote ancestry, and commit only those documentation files there.
- [ ] Record the implementation branch name and original remote SHA in the eventual launch checklist so rollback always has a known point.

Expected result: implementation starts on a `codex/` feature branch descended from the real published repository, with the old content still recoverable from Git history.

## Planned file structure

```text
.
├── .github/workflows/deploy.yml       # CI checks and GitHub Pages deployment
├── .gitignore                         # Build, dependency, Playwright, and local tool output
├── .prettierignore                    # Generated files excluded from formatting
├── .prettierrc.mjs                    # Astro-aware formatting rules
├── CNAME                              # Custom domain copied into the built site
├── README.md                          # Local development and note-publishing workflow
├── astro.config.mjs                   # Canonical site origin and integrations
├── package.json                       # Commands and pinned dependency ranges
├── package-lock.json                  # Reproducible dependency graph
├── playwright.config.ts               # Built-site browser and accessibility checks
├── public/
│   ├── CNAME                          # GitHub Pages custom-domain artifact
│   ├── favicon.svg                    # Simple typographic favicon
│   └── robots.txt                     # Crawl policy and sitemap location
├── src/
│   ├── components/
│   │   ├── Footer.astro               # Minimal footer and RSS/contact links
│   │   ├── Header.astro               # Name and three external contact links
│   │   ├── NotesList.astro            # Published notes or empty state
│   │   ├── TalkList.astro             # Selected talks
│   │   └── WorkList.astro             # Selected work narrative
│   ├── content/
│   │   ├── archive/
│   │   │   └── hackea-tu-educacion-durante-la-universidad.md
│   │   └── notes/
│   │       └── example-draft.md        # Non-published copyable draft example
│   ├── content.config.ts               # Notes and archive schemas
│   ├── data/
│   │   ├── profile.ts                  # Identity, intro, links, and contact data
│   │   ├── talks.ts                    # Selected talk metadata
│   │   └── work.ts                     # Selected work copy and evidence links
│   ├── layouts/
│   │   ├── BaseLayout.astro            # Document shell, canonical metadata, JSON-LD
│   │   └── NoteLayout.astro            # Article header and prose wrapper
│   ├── lib/
│   │   └── notes.ts                    # Draft filtering and reverse-date sorting
│   ├── pages/
│   │   ├── 404.astro                   # Branded not-found page
│   │   ├── blog/
│   │   │   ├── 2014/11/03/hackea-tu-educacion-durante-la-universidad.astro
│   │   │   ├── archives.astro          # Visible compatibility redirect/fallback
│   │   │   └── index.astro             # Visible compatibility redirect/fallback
│   │   ├── notes/[...id].astro          # Published note routes
│   │   ├── index.astro                  # Editorial homepage
│   │   └── rss.xml.ts                   # Published notes feed
│   ├── styles/global.css                # Tokens, layout, typography, and prose styles
│   └── env.d.ts                         # Astro type declarations
├── tests/
│   ├── config/deployment.test.ts         # Workflow and CNAME contract
│   ├── content/
│   │   ├── notes.test.ts                 # Pure filtering and ordering contract
│   │   └── profile-data.test.ts          # Approved profile-data contract
│   └── e2e/
│       ├── accessibility.spec.ts         # axe and keyboard-visible behavior
│       ├── homepage.spec.ts              # Copy, links, empty state, metadata
│       ├── legacy.spec.ts                # Historical and compatibility routes
│       └── notes.spec.ts                 # Draft exclusion, RSS, and article behavior
├── tsconfig.json                         # Strict Astro TypeScript configuration
└── vitest.config.ts                      # Unit-test configuration
```

### Task 1: Establish the static Astro foundation

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `.gitignore`
- Create: `.prettierignore`
- Create: `.prettierrc.mjs`
- Create: `vitest.config.ts`
- Create: `README.md`
- Create: `src/pages/index.astro`

**Interfaces:**
- Consumes: the canonical origin and static-only constraints from the spec.
- Produces: scripts `dev`, `build`, `preview`, `check`, `format`, `format:check`, `test:unit`, and `test:e2e`; a strict Astro project that later tasks extend.

- [ ] **Step 1: Create the project manifest and deterministic toolchain**

  Define `package.json` with `type: "module"`, the scripts above, and current stable compatible releases of Astro, `@astrojs/check`, `@astrojs/rss`, `@astrojs/sitemap`, TypeScript, Prettier with the Astro plugin, Vitest, Playwright, `@axe-core/playwright`, and `start-server-and-test`. Run `npm install` to generate `package-lock.json`; do not add a UI framework or CSS framework.

- [ ] **Step 2: Add strict static-site configuration**

  Set `site: "https://israelgutierrez.es"`, `output: "static"`, and the sitemap integration in `astro.config.mjs`. Extend Astro's strict TypeScript preset, add the Astro environment declaration, configure Vitest for TypeScript tests, and configure formatting for `.astro`, TypeScript, Markdown, and CSS.

- [ ] **Step 3: Add the smallest buildable page and ignore local artifacts**

  Create a semantic placeholder `src/pages/index.astro` with the exact `<title>Israel Gutiérrez</title>`. Add a minimal README containing the project purpose and install/build commands. Ignore `node_modules/`, `dist/`, `.astro/`, `playwright-report/`, `test-results/`, and `.superpowers/`; do not ignore `package-lock.json`.

- [ ] **Step 4: Verify the foundation**

  Run: `npm run format:check && npm run check && npm run build`

  Expected: all commands exit 0; `dist/index.html` exists and contains `Israel Gutiérrez`.

- [ ] **Step 5: Commit**

  ```bash
  git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src/env.d.ts src/pages/index.astro README.md .gitignore .prettierignore .prettierrc.mjs
  git commit -m "build: scaffold static Astro site"
  ```

### Task 2: Define verified profile, work, and talk content

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/work.ts`
- Create: `src/data/talks.ts`
- Create: `tests/content/profile-data.test.ts`

**Interfaces:**
- Consumes: approved facts and source links from the design conversation.
- Produces: `profile`, `workItems`, and `talks` typed readonly exports used by page components and structured data.

- [ ] **Step 1: Write the failing data-contract test**

  Add assertions that `profile.status` is exactly `Product Maker at Gobierto · Madrid`, `profile.headline` is exactly `I lead product and engineering teams building useful technology.`, and the three contact link types are `linkedin`, `github`, and `email`. Assert work IDs are exactly `gobierto`, `leap`, `data-learning`, and `research-engineering`; talks must include LechazoConf 2026 and the two selected T3chFest talks, with valid `https:` source URLs.

- [ ] **Step 2: Run the test and confirm it fails**

  Run: `npm run test:unit -- tests/content/profile-data.test.ts`

  Expected: FAIL because the data modules do not exist.

- [ ] **Step 3: Implement the typed data modules**

  Export readonly data with explicit `Profile`, `WorkItem`, and `Talk` interfaces. Use the approved LinkedIn and GitHub profiles, the public talk links, and `mailto:me@israelgutierrez.es` as the provisional email. Keep Gobierto wording to building products for public procurement professionals; include Leap's acquisition by Platzi in July 2026 and only the approved, verifiable outcomes.

- [ ] **Step 4: Verify content contracts and formatting**

  Run: `npm run test:unit -- tests/content/profile-data.test.ts && npm run format:check`

  Expected: PASS with all required IDs, dates, and URLs.

- [ ] **Step 5: Commit**

  ```bash
  git add src/data tests/content/profile-data.test.ts
  git commit -m "feat: add verified professional profile content"
  ```

### Task 3: Build the editorial shell and visual system

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/e2e/homepage.spec.ts`
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: `profile` from Task 2.
- Produces: `BaseLayout` props `{ title: string; description: string; image?: string; article?: boolean }`, plus reusable `Header` and `Footer` components.

- [ ] **Step 1: Write the failing shell browser test**

  Test the built homepage for one `header`, one `main`, one `footer`, a home link labelled `Israel Gutiérrez`, and exactly three header contact links labelled LinkedIn, GitHub, and Email. Assert no horizontal overflow at 320px and that a keyboard-focused header link has a visible focus outline.

- [ ] **Step 2: Run the browser test and confirm it fails**

  Install the Chromium runtime once with `npx playwright install chromium`, then run the focused test.

  Run: `npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts`

  Expected: FAIL because the layout and Playwright configuration are incomplete.

- [ ] **Step 3: Implement the document shell and components**

  `BaseLayout` owns the HTML document, viewport, canonical link, basic title/description metadata, stylesheet import, skip link, header, main slot, and footer. `Header` reads `profile.links`; `Footer` includes name, current year, LinkedIn, GitHub, Email, and `/rss.xml`.

- [ ] **Step 4: Implement the editorial CSS foundation**

  Define custom properties for warm off-white background, near-black text, a restrained accent, focus colour, readable measures, spacing, and type scale. Use a system serif display stack and system sans metadata stack initially. Add mobile-first header wrapping, skip-link behavior, visible `:focus-visible`, prose defaults, and reduced-motion handling; do not add cards or decorative effects.

- [ ] **Step 5: Verify the shell**

  Run: `npm run format:check && npm run check && npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts`

  Expected: all checks PASS at desktop and 320px with no overflow.

- [ ] **Step 6: Commit**

  ```bash
  git add src/layouts src/components/Header.astro src/components/Footer.astro src/styles/global.css src/pages/index.astro tests/e2e/homepage.spec.ts playwright.config.ts package.json package-lock.json
  git commit -m "feat: add editorial site shell"
  ```

### Task 4: Implement the complete editorial homepage

**Files:**
- Create: `src/components/WorkList.astro`
- Create: `src/components/TalkList.astro`
- Create: `src/components/NotesList.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`
- Create: `src/assets/israel-gutierrez.jpg`

**Interfaces:**
- Consumes: `profile`, `workItems`, and `talks` from Task 2.
- Produces: homepage sections with stable IDs `work`, `talks`, and `notes`; the first `NotesList` version renders the approved zero-note state and Task 5 extends it with typed note props.

- [ ] **Step 1: Extend the failing homepage test with approved content**

  Assert the status and headline strings, a portrait with non-empty alt text, all four work headings, the three selected talks with event/year labels, and the Notes empty-state text. Assert the archived 2014 article title is absent from the homepage.

- [ ] **Step 2: Run the focused test and confirm the new assertions fail**

  Run: `npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts`

  Expected: FAIL on the missing introduction, work, talks, portrait, or notes section.

- [ ] **Step 3: Add and optimise the temporary portrait**

  Download the existing Gravatar only as an implementation placeholder, save it as `src/assets/israel-gutierrez.jpg`, and render it through Astro's image component with width/height and responsive output. Do not hotlink it. Record in the README that the launch portrait remains replaceable without layout changes.

- [ ] **Step 4: Implement the homepage sections**

  Compose the introduction, `WorkList`, `TalkList`, and `NotesList` inside `BaseLayout`. Use narrative rows separated by whitespace/rules rather than cards. External work and talk links must use descriptive labels and retain same-tab navigation.

- [ ] **Step 5: Complete responsive homepage styling**

  Place portrait and introduction side by side only when space allows; keep a natural single-column reading order on mobile. Cap prose width, preserve generous whitespace, and ensure links are visually identifiable beyond colour alone.

- [ ] **Step 6: Verify content and layout**

  Run: `npm run format:check && npm run check && npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts`

  Expected: PASS; the homepage contains every approved section and never lists the archived article.

- [ ] **Step 7: Commit**

  ```bash
  git add src/assets src/components/WorkList.astro src/components/TalkList.astro src/components/NotesList.astro src/pages/index.astro src/styles/global.css tests/e2e/homepage.spec.ts README.md
  git commit -m "feat: build editorial homepage"
  ```

### Task 5: Add the Markdown notes system, article pages, and RSS

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/notes/example-draft.md`
- Create: `src/lib/notes.ts`
- Create: `src/layouts/NoteLayout.astro`
- Create: `src/pages/notes/[...id].astro`
- Create: `src/pages/rss.xml.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/components/NotesList.astro`
- Create: `tests/content/notes.test.ts`
- Create: `tests/e2e/notes.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: `BaseLayout` from Task 3.
- Produces: `NoteData`, `NoteSummary`, `isPublishedNote(note, now?)`, `sortNotesNewestFirst(notes)`, and `getPublishedNotes()`; note routes and RSS use the same filtered collection.

- [ ] **Step 1: Write failing unit tests for publication rules**

  Assert that `isPublishedNote` excludes `draft: true` and future-dated entries, and that `sortNotesNewestFirst` sorts descending without mutating its input. Pin the zero-item result to an empty array.

- [ ] **Step 2: Run the unit tests and confirm they fail**

  Run: `npm run test:unit -- tests/content/notes.test.ts`

  Expected: FAIL because `src/lib/notes.ts` does not exist.

- [ ] **Step 3: Define the collection schema and note helpers**

  Require `title`, `description`, `publishedAt`, and `draft`; allow optional `updatedAt` and `image`. Use Astro's content loader and Zod schema. Make `getPublishedNotes()` the single collection boundary used by the homepage, route generation, and RSS.

- [ ] **Step 4: Verify unit tests pass**

  Run: `npm run test:unit -- tests/content/notes.test.ts`

  Expected: PASS for draft, future-date, zero-item, ordering, and immutability cases.

- [ ] **Step 5: Write failing built-site tests for draft isolation**

  Add a draft Markdown file with unmistakable internal-only title. Assert the homepage shows the approved empty state, `/notes/example-draft/` returns 404, `rss.xml` is valid XML with zero items, and neither the draft title nor URL appears in built output exposed by the sitemap.

- [ ] **Step 6: Implement note pages, homepage listing, and RSS**

  `NoteLayout` renders title, published/updated dates, description, and prose. Generate routes only from `getPublishedNotes()`. Sort the homepage list newest-first and keep the approved empty state for zero notes. Generate a valid RSS feed at `/rss.xml` from the same entries.

- [ ] **Step 7: Document the authoring workflow**

  Add commands and a copyable frontmatter template to `README.md`. Explain that authors create one file under `src/content/notes/`, keep `draft: true` while working, run checks, then set `draft: false` to publish.

- [ ] **Step 8: Verify the notes system**

  Run: `npm run format:check && npm run check && npm run test:unit && npm run build && npm run test:e2e -- tests/e2e/notes.spec.ts`

  Expected: PASS; the draft is absent everywhere public and RSS is valid with zero items.

- [ ] **Step 9: Commit**

  ```bash
  git add src/content.config.ts src/content/notes src/lib/notes.ts src/layouts/NoteLayout.astro src/pages/notes src/pages/rss.xml.ts src/pages/index.astro src/components/NotesList.astro tests/content/notes.test.ts tests/e2e/notes.spec.ts README.md
  git commit -m "feat: add Markdown notes publishing"
  ```

### Task 6: Preserve the 2014 article and legacy blog routes

**Files:**
- Create: `src/content/archive/hackea-tu-educacion-durante-la-universidad.md`
- Create: `src/pages/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/archives.astro`
- Create: `tests/e2e/legacy.spec.ts`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `NoteLayout` from Task 5 and the archived article from the current public site or original repository.
- Produces: a faithful static archive page at the exact historical path; `/blog/` and `/blog/archives/` compatibility pages that visibly link to `/#notes` and the archived article.

- [ ] **Step 1: Write the failing legacy-route test**

  Assert HTTP 200 and the title `Hackea tu educación durante la universidad` at the exact deep link. Assert both legacy indexes return 200, identify themselves as archive/compatibility pages, and offer a normal visible link to the current Notes section. Assert the homepage does not link to the archived article.

- [ ] **Step 2: Run the test and confirm it fails**

  Run: `npm run build && npm run test:e2e -- tests/e2e/legacy.spec.ts`

  Expected: FAIL with missing legacy routes.

- [ ] **Step 3: Recover and store the original article content**

  Prefer the source Markdown from the existing `gootyfer.github.io` repository. If unavailable, transcribe the article body from the public page while removing Octopress navigation and chrome; retain the original Spanish text, title, author date, headings, links, and code formatting. Add archive frontmatter including `publishedAt: 2014-11-03`, `language: es`, and `archived: true`.

- [ ] **Step 4: Implement the archive and compatibility pages**

  Render the article with a visible `Archived from 2014` notice and canonical URL at the historical path. Implement `/blog/` and `/blog/archives/` as accessible static compatibility pages with a visible link to `/#notes`; do not rely only on JavaScript redirects.

- [ ] **Step 5: Verify all legacy paths**

  Run: `npm run check && npm run build && npm run test:e2e -- tests/e2e/legacy.spec.ts`

  Expected: PASS at the exact paths; the article remains absent from the homepage.

- [ ] **Step 6: Commit**

  ```bash
  git add src/content/archive src/pages/blog tests/e2e/legacy.spec.ts src/styles/global.css
  git commit -m "feat: preserve legacy 2014 article"
  ```

### Task 7: Complete metadata, structured data, crawl files, and error handling

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/NoteLayout.astro`
- Create: `src/pages/404.astro`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Create: `src/assets/social-card.jpg`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/notes.spec.ts`

**Interfaces:**
- Consumes: profile data from Task 2 and layout props from Task 3.
- Produces: canonical, Open Graph, Twitter-card, favicon, RSS discovery, sitemap, robots, `Person` JSON-LD, and article JSON-LD metadata.

- [ ] **Step 1: Add failing metadata and crawl tests**

  Assert the homepage has one canonical URL, unique title/description, `og:type=website`, an absolute social image, RSS discovery, and parseable `Person` JSON-LD containing only canonical, LinkedIn, and GitHub identities. Assert the draft URL/title is absent from `sitemap-index.xml` or the generated sitemap file. Assert the 404 page has a home link and `robots.txt` points to the HTTPS sitemap.

- [ ] **Step 2: Run focused tests and confirm they fail**

  Run: `npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts tests/e2e/notes.spec.ts`

  Expected: FAIL on missing metadata, crawl files, or 404 behavior.

- [ ] **Step 3: Implement page metadata and JSON-LD**

  Extend `BaseLayout` props without changing the Task 3 interface names. Emit canonical, description, Open Graph, Twitter summary-large-image, favicon, RSS discovery, and safe JSON-LD. Article pages emit `Article` metadata with dates; the homepage emits `Person` metadata. Do not include email in JSON-LD.

- [ ] **Step 4: Add owned identity assets and crawler files**

  Create a simple typographic SVG favicon and a restrained editorial social-card image using the approved name/headline rather than generic AI art. Add `robots.txt` and the 404 page. Ensure all image references are local and build to absolute public URLs.

- [ ] **Step 5: Verify SEO output and draft exclusion**

  Run: `npm run format:check && npm run check && npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts tests/e2e/notes.spec.ts`

  Expected: PASS; metadata parses and no draft route appears in sitemap output.

- [ ] **Step 6: Commit**

  ```bash
  git add src/layouts src/pages/404.astro public src/assets/social-card.jpg tests/e2e/homepage.spec.ts tests/e2e/notes.spec.ts
  git commit -m "feat: add metadata and crawl support"
  ```

### Task 8: Add accessibility, responsive, and cross-browser quality gates

**Files:**
- Create: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `src/styles/global.css`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: the complete built site from Tasks 3–7.
- Produces: repeatable Chromium, Firefox, and WebKit quality checks at desktop and 320px mobile widths.

- [ ] **Step 1: Write the failing accessibility and responsive checks**

  Run axe on homepage, archived article, and 404 with WCAG 2 A/AA tags; assert one `h1`, logical heading levels, a working skip link, visible keyboard focus, no horizontal overflow at 320px, and no animation when reduced motion is requested. Include the long `Israel Gutiérrez` name and all header links in the mobile assertion.

- [ ] **Step 2: Run the checks in Chromium and record real failures**

  Run: `npm run build && npm run test:e2e -- tests/e2e/accessibility.spec.ts --project=chromium`

  Expected: the new test initially exposes any missing labels, hierarchy, contrast, focus, or overflow behavior; do not weaken axe rules to make it pass.

- [ ] **Step 3: Fix only the identified semantic and CSS defects**

  Adjust markup and global CSS while preserving the approved editorial direction. Use `aria-label` only when visible text cannot provide the accessible name; prefer native landmarks, links, headings, and image `alt` text.

- [ ] **Step 4: Verify all supported browser projects**

  Install the remaining configured runtimes once with `npx playwright install firefox webkit`, then run the full suite.

  Run: `npm run format:check && npm run check && npm run test:unit && npm run build && npm run test:e2e`

  Expected: all unit and browser checks PASS in Chromium, Firefox, and WebKit.

- [ ] **Step 5: Perform a visual inspection**

  Inspect screenshots at 320×720, 768×1024, and 1440×1000. Confirm readable line lengths, unbroken links, natural portrait crop, consistent rules/spacing, and no card-like or template-like visual drift. Record any intentional browser differences in the commit message body.

- [ ] **Step 6: Commit**

  ```bash
  git add tests/e2e playwright.config.ts src/styles/global.css src/pages src/components package.json package-lock.json
  git commit -m "test: add accessibility and responsive gates"
  ```

### Task 9: Configure GitHub Pages deployment and publishing documentation

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `public/CNAME`
- Create: `CNAME`
- Create: `tests/config/deployment.test.ts`
- Modify: `README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: the complete static build and `dist/` output.
- Produces: a GitHub Pages artifact deployed from `main`; documented local, publishing, photo-replacement, and release workflows.

- [ ] **Step 1: Add a failing configuration smoke check**

  Add `tests/config/deployment.test.ts` and the `npm run test:config` script. Validate that the workflow contains the minimum `contents: read`, `pages: write`, and `id-token: write` permissions; uses the official configure-pages, upload-pages-artifact, and deploy-pages actions; runs `npm ci`, installs the Playwright browser runtimes, runs the full check suite plus `npm run build`, and uploads `dist/`. Assert both CNAME files contain exactly `israelgutierrez.es`.

- [ ] **Step 2: Run the configuration check and confirm it fails**

  Run: `npm run test:config`

  Expected: FAIL because the workflow and CNAME files do not exist.

- [ ] **Step 3: Implement the Pages workflow and domain artifacts**

  Trigger checks on pull requests and deployment on pushes to `main`, with concurrency that prevents overlapping production deploys. Use only official GitHub Pages actions, pin action major versions, set the Pages environment URL from the deployment output, and upload the built `dist/` directory. Copy the canonical domain into the deployed artifact through `public/CNAME`.

- [ ] **Step 4: Finish the README**

  Document prerequisites, `npm ci`, local commands, the Markdown publishing flow, portrait replacement, how to verify the production artifact before DNS changes, and the separation between GitHub repository settings and Namecheap DNS.

- [ ] **Step 5: Verify the complete repository locally**

  Run: `npm run format:check && npm run check && npm run test:unit && npm run test:config && npm run build && npm run test:e2e`

  Expected: all checks PASS and `dist/CNAME` contains `israelgutierrez.es`.

- [ ] **Step 6: Commit**

  ```bash
  git add .github/workflows/deploy.yml public/CNAME CNAME README.md package.json package-lock.json tests
  git commit -m "ci: deploy site to GitHub Pages"
  ```

### Task 10: Publish safely and cut over the custom domain

**Files:**
- Create: `docs/release/2026-11-02-launch-checklist.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: a green main branch, GitHub repository access, GitHub Pages settings, and Namecheap DNS control.
- Produces: a publicly verified GitHub Pages deployment at the custom HTTPS domain with recorded DNS and launch results.

- [ ] **Step 1: Write the launch checklist before changing external state**

  Include repository/remotes, source branch, Pages environment, artifact URL, current DNS snapshot, verified-domain status, apex records, `www` CNAME, HTTPS, canonical/redirect tests, rollback instructions, and post-launch content/accessibility checks. Never record credentials or API keys.

- [ ] **Step 2: Reconfirm the intended GitHub repository and protected history**

  Confirm the remote, default branch, original SHA, and implementation branch recorded during preflight. Fetch again before pushing. If the remote advanced, rebase or merge through the repository's normal non-destructive workflow and rerun the full verification suite; never force-push over the published branch.

- [ ] **Step 3: Publish a review deployment and verify it before DNS**

  Push the implementation branch, open a pull request if the existing repository workflow supports it, confirm CI is green, merge through the agreed path, and verify the GitHub Pages deployment URL. Check homepage, all selected links, exact legacy article route, RSS, sitemap, robots, 404, portrait, social metadata, and axe smoke results.

- [ ] **Step 4: Verify the domain in GitHub and snapshot Namecheap DNS**

  Add GitHub's domain-verification TXT record if it is not already present and wait for verification. Record current Namecheap host records in the launch checklist before editing them; do not delete unrelated mail or service records.

- [ ] **Step 5: Configure apex and `www` DNS records**

  Set the apex to GitHub Pages using the current official GitHub `A`/`AAAA` records (or Namecheap-supported `ALIAS` if GitHub's current documentation recommends it) and set `www` as a CNAME to `gootyfer.github.io`. Remove only conflicting web-host records after identifying them explicitly. Keep TTL conservative during cutover.

- [ ] **Step 6: Enable HTTPS and verify public behavior**

  After propagation, set `israelgutierrez.es` in GitHub Pages, enable Enforce HTTPS, and verify with public DNS and HTTP checks that:

  - `https://israelgutierrez.es/` returns 200 with the expected homepage.
  - `https://www.israelgutierrez.es/` redirects to the canonical apex without a loop.
  - `https://gootyfer.github.io/` settles on the canonical host as GitHub Pages intends.
  - The exact archived article URL returns 200 over HTTPS.
  - Canonical, RSS, sitemap, robots, assets, and social image all use HTTPS and no mixed content appears.

- [ ] **Step 7: Record verification and rollback data**

  Add timestamps, observed DNS answers, HTTP status/redirect chains, deployed commit SHA, and any propagation caveat to the launch checklist. Document the exact previous web DNS records so they can be restored if the production site is unavailable.

- [ ] **Step 8: Commit the release record**

  ```bash
  git add docs/release/2026-11-02-launch-checklist.md README.md
  git commit -m "docs: record personal site launch"
  git push
  ```

## Final verification

- [ ] Run the full local suite from a clean install: `npm ci && npm run format:check && npm run check && npm run test:unit && npm run test:config && npm run build && npm run test:e2e`.
- [ ] Confirm `git status --short` is empty except for explicitly ignored local visual-companion output.
- [ ] Review the production homepage at mobile and desktop widths against the approved editorial mockup and design spec.
- [ ] Confirm every factual claim and external URL one last time, including current Gobierto wording and all talk pages.
- [ ] Replace or explicitly approve the temporary Gravatar-derived portrait and confirm the public email address before declaring launch complete.
- [ ] Record the deployed commit, public URL, DNS state, HTTPS state, and any remaining follow-up in the launch checklist.
