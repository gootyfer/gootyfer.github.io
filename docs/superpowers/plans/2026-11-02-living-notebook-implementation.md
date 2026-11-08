# Living Notebook Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current Astro personal site into the approved Living Notebook design, lead with Una jornada decente, publish three real projects and two notes, and add accessible Margin notes without regressing legacy routes, metadata, or publishing safety.

**Architecture:** Keep the existing static Astro site, content collections, GitHub Pages workflow, and RSS pipeline. Add focused data and presentation components for the hero, featured project, learning log, career chapters, and talks; extend note frontmatter for editorial metadata; implement Margin notes with native semantic disclosure so the article remains usable without JavaScript.

**Tech Stack:** Astro 7, TypeScript 6, Astro content collections, Markdown, `astro:assets`/Sharp, Vitest 5, Playwright 1.64, axe-core, CSS only for optional motion.

**Spec:** `docs/superpowers/specs/2026-11-02-personal-website-brief-design.md`

## Global Constraints

- The approved direction is **Living notebook** with **Margin notes**.
- English is the primary language; do not add a full bilingual site.
- Preserve Astro, static output, GitHub Pages, RSS, sitemap, canonical metadata, structured data, the 404 page, and all existing legacy routes.
- Preserve `/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/`, `/blog/`, and `/blog/archives/`; the 2014 article must not appear in current Notes.
- Use the approved warm paper, dark ink, green, yellow, rust, and quiet-rule palette; add no remote font or UI framework.
- Show the real portrait at its intrinsic square ratio with `height: auto` and `object-fit: contain`; never stretch or crop it.
- Use real captures for Una jornada decente, Critical Reader, and Price Scoring Simulator; use Critical Reader's real icon and 1280×800 screenshot from `gootyfer/critical-reader`.
- Keep the project order exact: Una jornada decente first and visually dominant, Critical Reader second, Price Scoring Simulator third.
- Publish the supplied Una jornada decente article in Spanish as the first note; preserve its voice and add only structural editing, metadata, local imagery, and headings.
- Link Una jornada decente to its playable site and source, Critical Reader to Chrome Web Store and source, and Price Scoring Simulator to the live simulator and source.
- Render a deliberate typographic talk treatment when no reusable talk photograph is available; never render a broken image or pretend the fallback is a photograph.
- Margin notes must use semantic native disclosure, work with keyboard/touch/mouse and JavaScript disabled, remain optional to understanding the article, and respect `prefers-reduced-motion`.
- Keep LinkedIn, GitHub, email, and RSS easy to find; do not add “open to work”, consulting, or sales language.
- No generic AI decoration, logo wall, childlike education motifs, novelty cursor, looping animation, or walls of text.
- Publishing remains file-based: a note is one Markdown file plus optional local assets; no CMS, database, account, or newsletter.
- Draft and future-dated notes must stay out of routes, homepage, RSS, and sitemap.

## Review Focus

- **Missing talk photograph:** `TalkList` must render the approved green typographic fallback with no empty `img`; pinned in Task 4's fallback test.
- **Disclosure without JavaScript:** every Margin note must expose its annotation through native `<details>/<summary>` when JavaScript is disabled; pinned in Task 5's no-JS test.
- **Small and intermediate widths:** portrait ratio, navigation, project imagery, and long English or Spanish titles must not overflow at 320, 768, or 1440px; pinned in Task 6's viewport matrix.
- **Publishing boundary:** the two current notes must appear in the right order while draft, future, and archived notes remain separated across routes, homepage, RSS, and sitemap; pinned in Task 1's publication tests.
- **Legacy and sharing surface:** historical routes, canonical URLs, article metadata, social images, and JSON-LD must remain correct after the visual rebuild; pinned in Task 7's regression suite.

---

## File Structure

### New files

- `src/assets/projects/una-jornada-decente.jpg` — real game capture for the primary feature and first note.
- `src/assets/projects/critical-reader.jpg` — approved 1280×800 product screenshot.
- `src/assets/projects/critical-reader-icon.png` — approved extension icon.
- `src/assets/projects/price-scoring-simulator.jpg` — real simulator capture.
- `src/components/Hero.astro` — Living Notebook positioning and uncropped portrait.
- `src/components/ProjectFeature.astro` — primary Una jornada decente feature.
- `src/components/ProjectList.astro` — compact secondary-project presentation.
- `src/data/projects.ts` — typed project content and local image metadata.
- `src/content/notes/una-jornada-decente.md` — first published Spanish build note.
- `src/content/notes/critical-reader.md` — second published build note with Margin notes.
- `docs/superpowers/plans/2026-11-02-living-notebook-implementation.md` — this plan.

### Modified files

- `src/data/profile.ts` — approved positioning, principle, and introduction.
- `src/data/talks.ts` — featured-talk metadata and optional image contract.
- `src/content.config.ts` — editorial note metadata and local image schema.
- `src/lib/notes.ts` — extended note data/summary types.
- `src/pages/index.astro` — approved homepage order and component composition.
- `src/pages/notes/[...id].astro` — pass editorial metadata and hero image to the note layout.
- `src/components/Header.astro` — internal primary navigation.
- `src/components/Footer.astro` — professional links plus RSS and current role.
- `src/components/NotesList.astro` — three-column Learning log with resilient empty state.
- `src/components/WorkList.astro` — compact Selected chapters presentation.
- `src/components/TalkList.astro` — featured visual treatment and lighter talk list.
- `src/layouts/NoteLayout.astro` — Living Notebook article shell and metadata.
- `src/layouts/BaseLayout.astro` — local-image social metadata support and updated Person positioning.
- `src/styles/global.css` — approved tokens, responsive composition, article typography, and disclosures.
- `scripts/generate-social-card.mjs` — Living Notebook social-card copy and palette.
- `tests/content/profile-data.test.ts` — positioning, project, and talk contracts.
- `tests/content/notes.test.ts` — extended editorial metadata and publication rules.
- `tests/e2e/homepage.spec.ts` — approved homepage narrative and visual structure.
- `tests/e2e/notes.spec.ts` — both public notes, language metadata, RSS, sitemap, and disclosure behavior.
- `tests/e2e/accessibility.spec.ts` — new note route, viewport matrix, keyboard, and reduced motion.
- `docs/release/2026-11-02-launch-checklist.md` — approved visual direction and outstanding talk-photo gate.

## Task 1: Establish Content Contracts, Assets, and the First Two Notes

**Files:**
- Create: `src/assets/projects/critical-reader.jpg`
- Create: `src/assets/projects/critical-reader-icon.png`
- Create: `src/assets/projects/una-jornada-decente.jpg`
- Create: `src/assets/projects/price-scoring-simulator.jpg`
- Create: `src/data/projects.ts`
- Create: `src/content/notes/una-jornada-decente.md`
- Create: `src/content/notes/critical-reader.md`
- Modify: `src/data/profile.ts`
- Modify: `src/data/talks.ts`
- Modify: `src/content.config.ts`
- Modify: `src/lib/notes.ts`
- Modify: `tests/content/profile-data.test.ts`
- Modify: `tests/content/notes.test.ts`
- Modify: `tests/e2e/notes.spec.ts`

**Interfaces:**
- Produces: `profile.principle: string` and the approved headline/introduction values.
- Produces: `ProjectId = 'una-jornada-decente' | 'critical-reader' | 'price-scoring-simulator'`, `ProjectLink { label, href }`, and `Project { id, title, kicker, description, question, image, icon?, featured, noteHref?, links }` in `src/data/projects.ts`.
- Produces: `projects: readonly Project[]`, in the exact approved order, with only Una jornada decente set to `featured: true`.
- Produces: `Talk.image?: ImageMetadata` and `Talk.featured?: boolean`; the 2026 LechazoConf talk is `featured: true` with no image until an approved photograph exists.
- Produces: `NoteKind = 'build-note' | 'product-practice' | 'adult-learning' | 'talk-note'`.
- Produces: `NoteLanguage = 'en' | 'es'` and `NoteData` fields `language: NoteLanguage`, `kind: NoteKind`, `readingMinutes: number`, `topics: string[]`, and `image?: ImageMetadata` in addition to the existing publication fields.

- [ ] **Step 1: Extend the failing content tests**

Update `tests/content/profile-data.test.ts` to assert:

- `profile.headline === 'Learning by making. Leading by learning.'`.
- `profile.principle === 'Serious about learning / not solemn about it'`.
- Una jornada decente is first, featured, links to `/notes/una-jornada-decente/`, and has Play and Source links.
- Critical Reader is second, links to `/notes/critical-reader/`, Chrome Web Store, and Source, and has local image/icon metadata.
- Price Scoring Simulator is third, has no note link, links to the live simulator and Source, and mentions its pre-Gobierto exercise provenance.
- only `Menos features, más negocio` is `featured: true` and it safely has no image.

Update `tests/content/notes.test.ts` so its fixture helper supplies `language`, `kind`, `readingMinutes`, and `topics`, and assert sorting returns the same complete note objects without changing draft/future publication rules. The public route test below pins the content-collection-to-summary boundary.

Update `tests/e2e/notes.spec.ts` to replace the empty-feed expectations with:

- `/notes/una-jornada-decente/` returns 200, has the Spanish title, and declares Spanish language metadata.
- `/notes/critical-reader/` returns 200 and has the expected title.
- `/notes/example-draft/` still returns 404.
- RSS contains both public notes in the order Una jornada decente then Critical Reader, and no draft item.
- sitemap contains both public notes and no draft or future note.

- [ ] **Step 2: Run focused tests and confirm they fail**

Run: `npm run test:unit -- tests/content/profile-data.test.ts tests/content/notes.test.ts && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts`

Expected: FAIL because project data, editorial frontmatter, and the two published notes do not exist.

- [ ] **Step 3: Add the approved project assets**

Create `src/assets/projects/` and copy:

- `apps/extension/store/critical-reader-screenshot-1280x800.jpg` from the authorised `gootyfer/critical-reader` checkout to `src/assets/projects/critical-reader.jpg`.
- `apps/extension/public/icon/128.png` to `src/assets/projects/critical-reader-icon.png`.

Use the current authorised checkout at `/Users/israel/.codex/worktrees/online-private-beta/u`; if that worktree is unavailable, use the same paths from the `gootyfer/critical-reader` repository's current main branch. Verify with `file` that the screenshot is 1280×800 JPEG and the icon is 128×128 PNG.

Capture representative desktop states from the public Una jornada decente game and Price Scoring Simulator into `src/assets/projects/una-jornada-decente.jpg` and `src/assets/projects/price-scoring-simulator.jpg`. Each image must show enough interface to prove what the product does, avoid misleading crops, and have explicit dimensions before it is committed.

- [ ] **Step 4: Implement the typed profile, project, talk, and note contracts**

Add the interfaces listed above. Use `ImageMetadata` from `astro` for local images. Store CTAs in `Project.links` so components contain no project-specific URLs. Use the exact public destinations from the brief and these labels: `Play` and `Source` for Una jornada decente, `Install extension` and `Source` for Critical Reader, and `Open simulator` and `Source` for Price Scoring Simulator.

Update the notes collection schema to the callback form `schema: ({ image }) => z.object(...)`, with:

- `kind: z.enum(['build-note', 'product-practice', 'adult-learning', 'talk-note'])`.
- `language: z.enum(['en', 'es']).default('en')`.
- `readingMinutes: z.number().int().positive()`.
- `topics: z.array(z.string().min(1)).default([])`.
- `image: image().optional()`.

Keep `draft`, `publishedAt`, and `updatedAt` behavior unchanged.

- [ ] **Step 5: Publish the supplied Una jornada decente article as the first note**

Create `src/content/notes/una-jornada-decente.md` with exact title `¿Cómo se convierte una reivindicación educativa en un juego?`, description `Cómo convertir ratios, cansancio y falta de recursos en mecánicas jugables sin presentar al alumnado como el problema.`, `publishedAt: 2026-11-08`, `language: es`, kind `build-note`, `readingMinutes: 8`, topics `diseño de producto`, `aprendizaje mediante juegos`, and `educación pública`, local hero image `../../assets/projects/una-jornada-decente.jpg`, and `draft: false`.

Use the complete Spanish article supplied by Israel. Preserve its wording and direct voice. Add only concise headings around the existing conceptual turns—recognisable interaction, separating students from obstacles, accumulated energy, seasonal progression, data after play, and responsible simplification—and keep the two final public links intact. Do not add Margin notes or invented claims to this article.

- [ ] **Step 6: Write the second public Critical Reader note**

Create `src/content/notes/critical-reader.md` with exact title `A browser that makes you pause`, description `What I learned building a browser extension that highlights discriminatory language without telling readers what to think.`, `publishedAt: 2026-11-02`, `language: en`, kind `build-note`, `readingMinutes: 6`, topics `critical reading`, `responsible AI`, and `product building`, local hero image `../../assets/projects/critical-reader.jpg`, and `draft: false`.

Use the approved narrative and these headings:

1. `The missing vocabulary`
2. `A highlight, not a verdict`
3. `Building with AI, not delegating judgment`

Include three optional native disclosure blocks using `<details class="margin-note"><summary>…</summary><p>…</p></details>`. Their annotations must add insight or light humour, but the surrounding article must remain complete if none are opened. Do not claim that the extension judges authors or publications; state that it highlights clear expressions only when the reader requests analysis.

- [ ] **Step 7: Run the focused tests and verify they pass**

Run: `npm run check && npm run test:unit -- tests/content/profile-data.test.ts tests/content/notes.test.ts && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts`

Expected: PASS; Una jornada decente is the newest public note, Critical Reader is second, and draft/future content remains absent.

- [ ] **Step 8: Commit**

```bash
git add src/assets/projects src/data src/content.config.ts src/content/notes/una-jornada-decente.md src/content/notes/critical-reader.md src/lib/notes.ts tests/content tests/e2e/notes.spec.ts
git commit -m "feat: add public projects and first notes"
```

## Task 2: Build the Living Notebook Shell

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: `profile.links` and `profile.status` from Task 1.
- Produces: header links `Notes → /#notes`, `Work → /#work`, `Talks → /#talks`, `Contact → /#contact`.
- Produces: footer contact region `#contact` with LinkedIn, GitHub, Email, and RSS.
- Produces: global Living Notebook tokens and layout primitives used by all later components.

- [ ] **Step 1: Rewrite the shell test to the approved navigation contract**

In `tests/e2e/homepage.spec.ts`, assert the header has exactly the four internal links above, the footer has the four professional/feed links, and no page contains “open to work”, “book a call”, or “services”. Preserve the one-header/one-main/one-footer assertions.

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts -g "site shell"`

Expected: FAIL because the header still contains LinkedIn, GitHub, and Email.

- [ ] **Step 3: Implement the header and footer contracts**

Update `Header.astro` to use the four internal links. Update `Footer.astro` so `id="contact"` contains `profile.status`, LinkedIn, GitHub, Email, and RSS. Keep Israel's name linked to `/` in the header.

- [ ] **Step 4: Replace the global visual tokens and shell rhythm**

In `global.css`, define the approved palette exactly:

- paper `#f3eddf`
- ink `#202321`
- muted `#676b65`
- green `#315c52`
- yellow `#e5c64f`
- rust `#9c4937`
- rules as ink at 19% opacity

Keep Georgia/system-serif display type, Inter/system-sans body fallback, and system monospace for metadata. Set the site measure to 70rem, keep visible focus, preserve the skip link, and remove global main padding that conflicts with component-level section rhythm.

- [ ] **Step 5: Run the shell test and accessibility smoke test**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts tests/e2e/accessibility.spec.ts`

Expected: PASS for shell, focus, skip link, and current accessibility routes.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro src/layouts/BaseLayout.astro src/styles/global.css tests/e2e/homepage.spec.ts
git commit -m "feat: add Living Notebook site shell"
```

## Task 3: Build the Homepage Hero, Project Hierarchy, and Learning Log

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProjectFeature.astro`
- Create: `src/components/ProjectList.astro`
- Modify: `src/components/NotesList.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: `profile`, ordered `projects`, and `NoteSummary[]` from Task 1.
- Produces: `Hero.astro` with no props.
- Produces: `ProjectFeature.astro` props `{ project: Project }`.
- Produces: `ProjectList.astro` props `{ projects: readonly Project[] }` for compact secondary projects.
- Produces: `NotesList.astro` props `{ notes: readonly NoteSummary[] }`, rendering at most the first three public notes.

- [ ] **Step 1: Add failing homepage narrative and image assertions**

Update `tests/e2e/homepage.spec.ts` to assert:

- the H1 is `Learning by making. Leading by learning.`.
- the principle text and `Product Maker at Gobierto · Madrid` are visible.
- the portrait is visible and its rendered width/height ratio is between `0.99` and `1.01`.
- `#building` leads with Una jornada decente, its screenshot, note link, Play link, and Source link.
- `#building` then contains compact Critical Reader and Price Scoring Simulator entries in that order, with their exact public CTAs.
- only Una jornada decente uses the primary `.project-feature` treatment; the other two use `.project-compact`.
- `#notes` contains Una jornada decente first and Critical Reader second, and no `No notes published yet` message.
- no more than three `.note-card` elements render.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts -g "professional narrative"`

Expected: FAIL on the old headline, missing three-project hierarchy, missing public notes, and portrait ratio defect.

- [ ] **Step 3: Implement `Hero.astro`**

Render the approved kicker, H1, concise introduction, principle, and `astro:assets` portrait. Use `widths={[180, 320, 480]}`, desktop `sizes="210px"`, and CSS `width`, `height: auto`, `aspect-ratio: 1`, `object-fit: contain` so the intrinsic square image is never stretched or cropped.

- [ ] **Step 4: Implement `ProjectFeature.astro`**

Render the primary Una jornada decente project with its kicker, title, question, description, optimised screenshot, note link, and CTA list. Keep the source image's aspect ratio and use descriptive alt text.

- [ ] **Step 5: Implement `ProjectList.astro`**

Render Critical Reader and Price Scoring Simulator as compact secondary entries in their data order. Each includes its real image, question, concise description, optional note link, and every `Project.links` CTA. Render the Critical Reader icon only as a contextual decorative accent; do not add company logos or convert the pair into equal-weight cards.

- [ ] **Step 6: Convert `NotesList.astro` into the Learning log**

Render the first three summaries as `.note-card` entries with kind label, title, description, and reading time. Keep a concise resilient empty state for development/preview builds, but do not promise a posting cadence.

- [ ] **Step 7: Compose the homepage in approved order**

In `index.astro`, render: `Hero`, `ProjectFeature`, `ProjectList`, `NotesList`, `WorkList`, `TalkList`. Pass `projects[0]` to the feature and `projects.slice(1)` to the compact list. Update the page title/description to position Israel as a hands-on product leader in adult learning and edtech without implying availability.

- [ ] **Step 8: Add the approved desktop and mobile component styles**

Implement the prototype's layout classes in `global.css`: 210px desktop portrait, 154–180px mobile portrait, two-column primary project feature, compact rule-led secondary projects, three-column learning log, monospace section index, and compact rule-led sections. Do not add generic cards, rounded corners, or shadows to site content.

- [ ] **Step 9: Run the focused tests**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts`

Expected: PASS for hero, ordered project hierarchy, project links, note order, image ratio, and site-shell assertions.

- [ ] **Step 10: Commit**

```bash
git add src/components/Hero.astro src/components/ProjectFeature.astro src/components/ProjectList.astro src/components/NotesList.astro src/pages/index.astro src/styles/global.css tests/e2e/homepage.spec.ts
git commit -m "feat: build Living Notebook homepage"
```

## Task 4: Present Selected Chapters and Talks

**Files:**
- Modify: `src/components/WorkList.astro`
- Modify: `src/components/TalkList.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: `workItems` and extended `Talk` data from Task 1.
- Produces: `#work` as compact chapter rows with title, contribution, and period.
- Produces: `#talks` with one featured visual treatment and a secondary talk list.

- [ ] **Step 1: Add failing chapter, talk, and fallback tests**

In `tests/e2e/homepage.spec.ts`, assert:

- `#work` has heading `Selected chapters` and preserves Gobierto, Leap, Data and learning products, and Research and engineering in order.
- `#talks` has one `.talk-feature`, the title `Menos features, más negocio`, and `data-visual="typographic"` while no approved image exists.
- `.talk-feature img` has count zero in the fallback state.
- all three existing public talk links remain unchanged.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts -g "chapters|talks|professional narrative"`

Expected: FAIL because work/talk components still use the old editorial lists.

- [ ] **Step 3: Implement the compact chapter rows**

Update `WorkList.astro` to render the prototype's three-column desktop structure—title, contribution, period—while preserving all four data items and links. Stack naturally on mobile.

- [ ] **Step 4: Implement the featured talk with an explicit fallback**

Update `TalkList.astro` to choose the one `featured` talk. If `talk.image` exists, render an optimised image with the supplied alt text. Otherwise render the approved green typographic block with `data-visual="typographic"`, event/year metadata, and no `img`. Render the remaining talks as compact rule-separated rows.

- [ ] **Step 5: Run the focused tests**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts`

Expected: PASS, including the no-broken-image fallback assertion.

- [ ] **Step 6: Commit**

```bash
git add src/components/WorkList.astro src/components/TalkList.astro src/styles/global.css tests/e2e/homepage.spec.ts
git commit -m "feat: add selected chapters and visual talks"
```

## Task 5: Build the Note Reading Experience and Margin Notes

**Files:**
- Modify: `src/layouts/NoteLayout.astro`
- Modify: `src/pages/notes/[...id].astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/notes.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: extended note frontmatter from Task 1.
- Produces: `NoteLayout` props `{ title, description, publishedAt, updatedAt?, language?, notice?, backHref?, backLabel?, kind?, readingMinutes?, topics?, image? }`.
- Produces: `.margin-note` native disclosure styling for Markdown `<details>` blocks.

- [ ] **Step 1: Add failing reading-layout and Margin note tests**

In `tests/e2e/notes.spec.ts`, assert `/notes/critical-reader/` has:

- one H1 `A browser that makes you pause`.
- the Critical Reader hero image with descriptive alt text.
- kind, date, and `6 min` metadata.
- exactly three `details.margin-note` elements, each closed initially.
- a visible summary that opens by keyboard and reveals its annotation.

Also assert `/notes/una-jornada-decente/` has:

- one H1 with the approved Spanish title.
- `<html lang="es">`, Spanish article locale metadata, the game hero image, and `8 min` metadata.
- the supplied opening and conclusion, all added section headings, and both final public links.
- no `.margin-note` elements and no copy invented beyond structural headings.

Add a no-JavaScript test using `browser.newContext({ javaScriptEnabled: false })`; navigate to the note, activate the first native summary, and assert the details element opens and its annotation is readable.

Add both new note routes to the accessibility route matrix.

- [ ] **Step 2: Run the focused tests and confirm they fail**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts tests/e2e/accessibility.spec.ts`

Expected: FAIL because the notes use the old narrow layout, Spanish metadata is not yet pinned, and Margin notes are unstyled/unverified.

- [ ] **Step 3: Pass editorial metadata into `NoteLayout`**

Update `src/pages/notes/[...id].astro` to pass `kind`, `readingMinutes`, `topics`, and `image`. Update `BaseLayout` to accept `image?: string | ImageMetadata`; when it receives local image metadata, generate a suitable social image URL with `getImage` instead of constructing a URL from `[object Object]`. Derive `og:image:width` and `og:image:height` from the generated image; keep 1200×630 only for the default card. Map `language: es` to Spanish document and Open Graph locale metadata while preserving English defaults.

- [ ] **Step 4: Implement the Living Notebook article layout**

Update `NoteLayout.astro` to render the back link, kind/date/reading-time metadata, title, deck, optional optimised hero image, and a readable prose column. Keep archive props and the Spanish historical article behavior unchanged.

- [ ] **Step 5: Style native Margin notes**

In `global.css`, style `.prose details.margin-note` and its `summary` as a highlighted disclosure. The closed summary must remain a visible phrase; the open annotation appears as an indented rust note. Use only a short open-state transition, no looping effect, and disable it under `prefers-reduced-motion`. Do not add JavaScript.

- [ ] **Step 6: Run the focused tests**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts tests/e2e/accessibility.spec.ts`

Expected: PASS in normal and no-JavaScript contexts; axe reports zero A/AA violations on both notes.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/NoteLayout.astro src/layouts/BaseLayout.astro src/pages/notes src/styles/global.css tests/e2e/notes.spec.ts tests/e2e/accessibility.spec.ts
git commit -m "feat: add Living Notebook articles and margin notes"
```

## Task 6: Pin Responsive, Accessible, and Reduced-Motion Behavior

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: all homepage/article components from Tasks 2–5.
- Produces: verified layout behavior at 320, 768, and 1440px.

- [ ] **Step 1: Add the failing viewport matrix**

In `tests/e2e/homepage.spec.ts`, loop over widths `320`, `768`, and `1440` and assert:

- `documentElement.scrollWidth <= clientWidth`.
- header name and every navigation link fit inside the viewport.
- portrait bounding box ratio is between `0.99` and `1.01` and computed `object-fit` is `contain`.
- every project image stays within its container and its rendered aspect ratio matches its intrinsic aspect ratio within 1%.
- every note title and talk title has a non-null bounding box inside the viewport.

In `tests/e2e/accessibility.spec.ts`, assert every interactive summary has a visible focus indicator and that reduced-motion mode sets transition/animation duration on Margin notes to at most `0.01ms`.

- [ ] **Step 2: Run the matrix and confirm any failures**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts tests/e2e/accessibility.spec.ts`

Expected: FAIL where final responsive or reduced-motion details are not yet pinned.

- [ ] **Step 3: Finish responsive styles**

Adjust only the owning component selectors in `global.css`: stack hero/project/section grids below 50rem, keep the mobile portrait 154–180px and left-aligned, wrap navigation without hiding links, stack work rows, and keep tap targets non-overlapping. Do not add a hamburger menu.

- [ ] **Step 4: Finish focus and reduced-motion styles**

Preserve the existing global focus outline for links and summaries. Under `prefers-reduced-motion: reduce`, disable smooth scrolling and Margin note transitions/animations without hiding disclosure content.

- [ ] **Step 5: Run Chromium and full accessibility coverage**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts tests/e2e/accessibility.spec.ts`

Expected: PASS at all three widths, with zero axe A/AA violations.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css tests/e2e/homepage.spec.ts tests/e2e/accessibility.spec.ts
git commit -m "test: pin Living Notebook responsive behavior"
```

## Task 7: Refresh Sharing Metadata and Run the Full Release Gate

**Files:**
- Modify: `scripts/generate-social-card.mjs`
- Modify: `src/assets/social-card.jpg`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/notes.spec.ts`
- Modify: `docs/release/2026-11-02-launch-checklist.md`

**Interfaces:**
- Consumes: final positioning and local article images.
- Produces: updated 1200×630 default social card and correct page/article metadata.

- [ ] **Step 1: Add failing sharing and regression assertions**

Update `tests/e2e/homepage.spec.ts` to expect the new title/description and Person `jobTitle` aligned with hands-on product leadership and adult learning. Update `tests/e2e/notes.spec.ts` to assert both articles have `og:type=article`, local generated `og:image` values, matching numeric image-width/image-height metadata, their exact publication dates and locales (`es_ES` for Una jornada decente and `en_US` for Critical Reader), and Article JSON-LD author data.

- [ ] **Step 2: Run the metadata tests and confirm they fail**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts tests/e2e/notes.spec.ts`

Expected: FAIL on the old homepage title, description, job title, or default social-card copy.

- [ ] **Step 3: Refresh default metadata and social card**

Update `BaseLayout.astro` Person data to use `Hands-on product leader in adult learning and edtech`. Update `generate-social-card.mjs` to the Living Notebook palette and copy `LEARNING · PRODUCT · ENGINEERING`, `Israel Gutiérrez`, and `Learning by making. Leading by learning.`; keep output exactly 1200×630 JPEG. Run `npm run assets:social-card`.

- [ ] **Step 4: Update the release checklist**

Record that Living Notebook, the uncropped portrait, and Margin notes were approved on 2 November 2026, and that the three-project hierarchy plus the Spanish launch article were approved on 8 November 2026. Add a launch checkbox requiring either an approved reusable talk photograph or explicit approval of the typographic fallback. Do not change DNS or deployment status fields.

- [ ] **Step 5: Run the complete quality gate**

Run: `npm run format:check && npm run check && npm run test:unit && npm run build && npm run test:e2e`

Expected: all formatting, Astro/TypeScript, unit, build, Chromium, Firefox, WebKit, accessibility, legacy-route, metadata, RSS, sitemap, and content tests pass.

- [ ] **Step 6: Inspect generated output and repository state**

Verify:

- `dist/notes/una-jornada-decente/index.html` exists and declares Spanish.
- `dist/notes/critical-reader/index.html` exists.
- `dist/rss.xml` includes both public notes in the approved order and no draft.
- `dist/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/index.html` still exists.
- `src/assets/social-card.jpg` is 1200×630.
- `git diff --check` is clean.
- `git status --short` contains only the intended implementation files.

- [ ] **Step 7: Commit**

```bash
git add scripts/generate-social-card.mjs src/assets/social-card.jpg src/layouts/BaseLayout.astro tests/e2e docs/release/2026-11-02-launch-checklist.md
git commit -m "chore: complete Living Notebook release gate"
```

## Final Self-Review Result

- **Spec coverage:** positioning, Living Notebook composition, the ordered three-project hierarchy, both launch notes, selected chapters, talks fallback, Margin notes, responsive portrait, contact links, metadata, legacy routes, accessibility, performance, and release documentation each map to a task.
- **Step scan:** every implementation step names one file responsibility or one verification action; no production code body is transcribed.
- **Type consistency:** `Project`, `ProjectLink`, extended `Talk`, `NoteLanguage`, `NoteKind`, `NoteData`, and `NoteLayout` props are defined once and consumed by later tasks with the same names.
- **Review focus:** each of the five highest-risk conditions has an explicit owning test.
- **Proportion:** seven independently reviewable tasks cover the full redesign without splitting into artificial setup-only commits.
