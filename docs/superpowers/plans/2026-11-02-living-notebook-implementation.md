# Living Notebook Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current Astro personal site into the approved Living Notebook design, publish Critical Reader as the first project and note, and add accessible Margin notes without regressing legacy routes, metadata, or publishing safety.

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
- Use Critical Reader's real icon and 1280×800 screenshot from `gootyfer/critical-reader`.
- Render a deliberate typographic talk treatment when no reusable talk photograph is available; never render a broken image or pretend the fallback is a photograph.
- Margin notes must use semantic native disclosure, work with keyboard/touch/mouse and JavaScript disabled, remain optional to understanding the article, and respect `prefers-reduced-motion`.
- Keep LinkedIn, GitHub, email, and RSS easy to find; do not add “open to work”, consulting, or sales language.
- No generic AI decoration, logo wall, childlike education motifs, novelty cursor, looping animation, or walls of text.
- Publishing remains file-based: a note is one Markdown file plus optional local assets; no CMS, database, account, or newsletter.
- Draft and future-dated notes must stay out of routes, homepage, RSS, and sitemap.

## Review Focus

- **Missing talk photograph:** `TalkList` must render the approved green typographic fallback with no empty `img`; pinned in Task 4's fallback test.
- **Disclosure without JavaScript:** every Margin note must expose its annotation through native `<details>/<summary>` when JavaScript is disabled; pinned in Task 5's no-JS test.
- **Small and intermediate widths:** portrait ratio, navigation, project imagery, and long English titles must not overflow at 320, 768, or 1440px; pinned in Task 6's viewport matrix.
- **Publishing boundary:** draft, future, archived, and current notes must remain separated across routes, homepage, RSS, and sitemap; pinned in Task 1's publication tests.
- **Legacy and sharing surface:** historical routes, canonical URLs, article metadata, social images, and JSON-LD must remain correct after the visual rebuild; pinned in Task 7's regression suite.

---

## File Structure

### New files

- `src/assets/projects/critical-reader.jpg` — approved 1280×800 product screenshot.
- `src/assets/projects/critical-reader-icon.png` — approved extension icon.
- `src/components/Hero.astro` — Living Notebook positioning and uncropped portrait.
- `src/components/ProjectFeature.astro` — Critical Reader “Now building” feature.
- `src/data/projects.ts` — typed project content and local image metadata.
- `src/content/notes/critical-reader.md` — first published build note with Margin notes.
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
- `tests/e2e/notes.spec.ts` — public Critical Reader note, RSS, sitemap, and disclosure behavior.
- `tests/e2e/accessibility.spec.ts` — new note route, viewport matrix, keyboard, and reduced motion.
- `docs/release/2026-11-02-launch-checklist.md` — approved visual direction and outstanding talk-photo gate.

## Task 1: Establish Content Contracts, Assets, and the First Note

**Files:**
- Create: `src/assets/projects/critical-reader.jpg`
- Create: `src/assets/projects/critical-reader-icon.png`
- Create: `src/data/projects.ts`
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
- Produces: `ProjectId = 'critical-reader'` and `Project { id, title, kicker, description, question, noteHref, sourceUrl, image, icon }` in `src/data/projects.ts`.
- Produces: `projects: readonly Project[]`, with Critical Reader first.
- Produces: `Talk.image?: ImageMetadata` and `Talk.featured?: boolean`; the 2026 LechazoConf talk is `featured: true` with no image until an approved photograph exists.
- Produces: `NoteKind = 'build-note' | 'product-practice' | 'adult-learning' | 'talk-note'`.
- Produces: `NoteData` fields `kind: NoteKind`, `readingMinutes: number`, `topics: string[]`, and `image?: ImageMetadata` in addition to the existing publication fields.

- [ ] **Step 1: Extend the failing content tests**

Update `tests/content/profile-data.test.ts` to assert:

- `profile.headline === 'Learning by making. Leading by learning.'`.
- `profile.principle === 'Serious about learning / not solemn about it'`.
- Critical Reader is the first project, links to `/notes/critical-reader/`, and has local image/icon metadata.
- only `Menos features, más negocio` is `featured: true` and it safely has no image.

Update `tests/content/notes.test.ts` so its fixture helper supplies `kind`, `readingMinutes`, and `topics`, and assert sorting returns the same complete note objects without changing draft/future publication rules. The public route test below pins the content-collection-to-summary boundary.

Update `tests/e2e/notes.spec.ts` to replace the empty-feed expectations with:

- `/notes/critical-reader/` returns 200 and has the expected title.
- `/notes/example-draft/` still returns 404.
- RSS contains one Critical Reader item and no draft item.
- sitemap contains `critical-reader` and no draft or future note.

- [ ] **Step 2: Run focused tests and confirm they fail**

Run: `npm run test:unit -- tests/content/profile-data.test.ts tests/content/notes.test.ts && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts`

Expected: FAIL because project data, editorial frontmatter, and the published note do not exist.

- [ ] **Step 3: Add the approved Critical Reader assets**

Create `src/assets/projects/` and copy:

- `apps/extension/store/critical-reader-screenshot-1280x800.jpg` from the authorised `gootyfer/critical-reader` checkout to `src/assets/projects/critical-reader.jpg`.
- `apps/extension/public/icon/128.png` to `src/assets/projects/critical-reader-icon.png`.

Use the current authorised checkout at `/Users/israel/.codex/worktrees/online-private-beta/u`; if that worktree is unavailable, use the same paths from the `gootyfer/critical-reader` repository's current main branch. Verify with `file` that the screenshot is 1280×800 JPEG and the icon is 128×128 PNG.

- [ ] **Step 4: Implement the typed profile, project, talk, and note contracts**

Add the interfaces listed above. Use `ImageMetadata` from `astro` for local images. Update the notes collection schema to the callback form `schema: ({ image }) => z.object(...)`, with:

- `kind: z.enum(['build-note', 'product-practice', 'adult-learning', 'talk-note'])`.
- `readingMinutes: z.number().int().positive()`.
- `topics: z.array(z.string().min(1)).default([])`.
- `image: image().optional()`.

Keep `draft`, `publishedAt`, and `updatedAt` behavior unchanged.

- [ ] **Step 5: Write the first public Critical Reader note**

Create `src/content/notes/critical-reader.md` with exact title `A browser that makes you pause`, `publishedAt: 2026-11-02`, kind `build-note`, `readingMinutes: 6`, topics `critical reading`, `responsible AI`, and `product building`, local hero image `../../assets/projects/critical-reader.jpg`, and `draft: false`.

Use the approved narrative and these headings:

1. `The missing vocabulary`
2. `A highlight, not a verdict`
3. `Building with AI, not delegating judgment`

Include three optional native disclosure blocks using `<details class="margin-note"><summary>…</summary><p>…</p></details>`. Their annotations must add insight or light humour, but the surrounding article must remain complete if none are opened. Do not claim that the extension judges authors or publications; state that it highlights clear expressions only when the reader requests analysis.

- [ ] **Step 6: Run the focused tests and verify they pass**

Run: `npm run check && npm run test:unit -- tests/content/profile-data.test.ts tests/content/notes.test.ts && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts`

Expected: PASS; Critical Reader is the only public current note, and the draft remains absent.

- [ ] **Step 7: Commit**

```bash
git add src/assets/projects src/data src/content.config.ts src/content/notes/critical-reader.md src/lib/notes.ts tests/content tests/e2e/notes.spec.ts
git commit -m "feat: add Critical Reader project and first note"
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

## Task 3: Build the Homepage Hero, Featured Project, and Learning Log

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProjectFeature.astro`
- Modify: `src/components/NotesList.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: `profile`, `projects[0]`, and `NoteSummary[]` from Task 1.
- Produces: `Hero.astro` with no props.
- Produces: `ProjectFeature.astro` props `{ project: Project }`.
- Produces: `NotesList.astro` props `{ notes: readonly NoteSummary[] }`, rendering at most the first three public notes.

- [ ] **Step 1: Add failing homepage narrative and image assertions**

Update `tests/e2e/homepage.spec.ts` to assert:

- the H1 is `Learning by making. Leading by learning.`.
- the principle text and `Product Maker at Gobierto · Madrid` are visible.
- the portrait is visible and its rendered width/height ratio is between `0.99` and `1.01`.
- `#building` contains Critical Reader's heading, screenshot, icon, and link to `/notes/critical-reader/`.
- `#notes` contains the Critical Reader note and no `No notes published yet` message.
- no more than three `.note-card` elements render.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts -g "professional narrative"`

Expected: FAIL on the old headline, missing project section, and portrait ratio defect.

- [ ] **Step 3: Implement `Hero.astro`**

Render the approved kicker, H1, concise introduction, principle, and `astro:assets` portrait. Use `widths={[180, 320, 480]}`, desktop `sizes="210px"`, and CSS `width`, `height: auto`, `aspect-ratio: 1`, `object-fit: contain` so the intrinsic square image is never stretched or cropped.

- [ ] **Step 4: Implement `ProjectFeature.astro`**

Render `<section id="building">` with the project kicker, title, question, description, optimised screenshot, icon, and note link. The screenshot keeps its 8:5 aspect ratio; the icon overlays only when CSS positioning is available and remains decorative with empty alt text.

- [ ] **Step 5: Convert `NotesList.astro` into the Learning log**

Render the first three summaries as `.note-card` entries with kind label, title, description, and reading time. Keep a concise resilient empty state for development/preview builds, but do not promise a posting cadence.

- [ ] **Step 6: Compose the homepage in approved order**

In `index.astro`, render: `Hero`, `ProjectFeature`, `NotesList`, `WorkList`, `TalkList`. Update the page title/description to position Israel as a hands-on product leader in adult learning and edtech without implying availability.

- [ ] **Step 7: Add the approved desktop and mobile component styles**

Implement the prototype's layout classes in `global.css`: 210px desktop portrait, 154–180px mobile portrait, two-column project feature, three-column learning log, monospace section index, and compact rule-led sections. Do not add cards, rounded corners, or shadows to site content.

- [ ] **Step 8: Run the focused tests**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts`

Expected: PASS for hero, project, note, image ratio, and site-shell assertions.

- [ ] **Step 9: Commit**

```bash
git add src/components/Hero.astro src/components/ProjectFeature.astro src/components/NotesList.astro src/pages/index.astro src/styles/global.css tests/e2e/homepage.spec.ts
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

Add a no-JavaScript test using `browser.newContext({ javaScriptEnabled: false })`; navigate to the note, activate the first native summary, and assert the details element opens and its annotation is readable.

Add `/notes/critical-reader/` to the accessibility route matrix.

- [ ] **Step 2: Run the focused tests and confirm they fail**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts tests/e2e/accessibility.spec.ts`

Expected: FAIL because the note uses the old narrow layout and Margin notes are unstyled/unverified.

- [ ] **Step 3: Pass editorial metadata into `NoteLayout`**

Update `src/pages/notes/[...id].astro` to pass `kind`, `readingMinutes`, `topics`, and `image`. Update `BaseLayout` to accept `image?: string | ImageMetadata`; when it receives local image metadata, generate a suitable social image URL with `getImage` instead of constructing a URL from `[object Object]`. Derive `og:image:width` and `og:image:height` from the generated image; keep 1200×630 only for the default card.

- [ ] **Step 4: Implement the Living Notebook article layout**

Update `NoteLayout.astro` to render the back link, kind/date/reading-time metadata, title, deck, optional optimised hero image, and a readable prose column. Keep archive props and the Spanish historical article behavior unchanged.

- [ ] **Step 5: Style native Margin notes**

In `global.css`, style `.prose details.margin-note` and its `summary` as a highlighted disclosure. The closed summary must remain a visible phrase; the open annotation appears as an indented rust note. Use only a short open-state transition, no looping effect, and disable it under `prefers-reduced-motion`. Do not add JavaScript.

- [ ] **Step 6: Run the focused tests**

Run: `npm run check && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts tests/e2e/accessibility.spec.ts`

Expected: PASS in normal and no-JavaScript contexts; axe reports zero A/AA violations on the note.

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
- Critical Reader screenshot ratio is between `1.59` and `1.61`.
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

Update `tests/e2e/homepage.spec.ts` to expect the new title/description and Person `jobTitle` aligned with hands-on product leadership and adult learning. Update `tests/e2e/notes.spec.ts` to assert the Critical Reader article has `og:type=article`, a local generated `og:image`, matching numeric image-width/image-height metadata, publication date `2026-11-02`, English locale, and Article JSON-LD author data.

- [ ] **Step 2: Run the metadata tests and confirm they fail**

Run: `npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts tests/e2e/notes.spec.ts`

Expected: FAIL on the old homepage title, description, job title, or default social-card copy.

- [ ] **Step 3: Refresh default metadata and social card**

Update `BaseLayout.astro` Person data to use `Hands-on product leader in adult learning and edtech`. Update `generate-social-card.mjs` to the Living Notebook palette and copy `LEARNING · PRODUCT · ENGINEERING`, `Israel Gutiérrez`, and `Learning by making. Leading by learning.`; keep output exactly 1200×630 JPEG. Run `npm run assets:social-card`.

- [ ] **Step 4: Update the release checklist**

Record that Living Notebook, the uncropped portrait, Critical Reader, and Margin notes were approved on 2 November 2026. Add a launch checkbox requiring either an approved reusable talk photograph or explicit approval of the typographic fallback. Do not change DNS or deployment status fields.

- [ ] **Step 5: Run the complete quality gate**

Run: `npm run format:check && npm run check && npm run test:unit && npm run build && npm run test:e2e`

Expected: all formatting, Astro/TypeScript, unit, build, Chromium, Firefox, WebKit, accessibility, legacy-route, metadata, RSS, sitemap, and content tests pass.

- [ ] **Step 6: Inspect generated output and repository state**

Verify:

- `dist/notes/critical-reader/index.html` exists.
- `dist/rss.xml` includes Critical Reader and no draft.
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

- **Spec coverage:** positioning, Living Notebook composition, Critical Reader, Notes publishing, selected chapters, talks fallback, Margin notes, responsive portrait, contact links, metadata, legacy routes, accessibility, performance, and release documentation each map to a task.
- **Step scan:** every implementation step names one file responsibility or one verification action; no production code body is transcribed.
- **Type consistency:** `Project`, extended `Talk`, `NoteKind`, `NoteData`, and `NoteLayout` props are defined once and consumed by later tasks with the same names.
- **Review focus:** each of the five highest-risk conditions has an explicit owning test.
- **Proportion:** seven independently reviewable tasks cover the full redesign without splitting into artificial setup-only commits.
