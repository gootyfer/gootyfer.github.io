# LechazoConf and Price Scoring Note Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the featured-talk placeholder with the approved LechazoConf photograph and publish the supplied Price Scoring Simulator learning note.

**Architecture:** Extend the existing typed talk record with explicit photograph, slide, event, alt-text, and tagline fields, then render the approved responsive editorial composition in the current `TalkList`. Add the Spanish simulator article to the existing Astro content collection and connect it to the compact project, homepage note list, RSS, sitemap, and article metadata through the site's existing note pipeline.

**Tech Stack:** Astro 7, TypeScript, Astro Content Collections, `astro:assets`, Markdown, Vitest, Playwright, Prettier.

**Spec:** `docs/superpowers/specs/2026-11-09-lechazoconf-and-price-simulator-design.md`

## Global Constraints

- Preserve the photograph's vertical 3:4 composition; do not create a panoramic crop or distort it.
- Use **Fewer features, more business.** exactly.
- Slides URL: `https://docs.google.com/presentation/d/10jE0RjhDFcZ9DJQ_o4TKl2cnWMBVXhBde9sIFHo9MWw/edit?usp=sharing`.
- Official event URL: `https://lechazoconf.com/2026/index.html#isra`; do not keep LinkedIn as the featured-talk destination.
- Preserve the supplied Spanish article's voice and meaning; only add headings, metadata, links, and light structural edits.
- The note must not present the simulator as legal advice or as work owned by Gobierto.
- Do not redesign unrelated homepage sections, add a talks page, publish, change DNS, or push.

## Review Focus

- A vertical photograph at 320, 768, and 1440 px must remain undistorted, visible, and free of horizontal overflow; Task 2 pins rendered and intrinsic aspect ratios.
- The featured talk has two distinct destinations; Task 2 asserts the slides and official-event URLs and the absence of the old LinkedIn URL.
- A third published note changes ordering and count; Task 1 pins homepage and RSS newest-first order and keeps drafts excluded.
- Spanish article metadata can silently inherit English; Task 1 asserts `lang="es"`, `og:locale="es_ES"`, Article JSON-LD, date, and local social image dimensions.
- The compact simulator project can lose discoverability when adding its note; Task 1 asserts the project-to-note link and both live/source links remain present.

---

### Task 1: Publish and connect the Price Scoring Simulator note

**Files:**
- Create: `src/content/notes/price-scoring-simulator.md`
- Modify: `src/data/projects.ts`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/notes.spec.ts`
- Test: `tests/content/notes.test.ts`

**Interfaces:**
- Consumes: the existing `notes` content schema with `language: 'es'`, `kind: 'build-note'`, `readingMinutes`, local `image`, and `imageAlt`; `Project.noteHref?: string`.
- Produces: published note ID `price-scoring-simulator`, route `/notes/price-scoring-simulator/`, and `projects[2].noteHref === '/notes/price-scoring-simulator/'`.

- [ ] **Step 1: Extend the content and E2E contracts with the new note**

  In `tests/content/notes.test.ts`, assert the published collection contains the new ID and that its Spanish metadata, local image, and alt text are valid. In `tests/e2e/notes.spec.ts`, assert the new route returns 200 and renders:

  - title `Cómo aprendí sobre licitaciones públicas construyendo un simulador`;
  - `lang="es"`, `og:locale="es_ES"`, `og:type="article"`;
  - published date `2026-11-09`;
  - a 1200×750 local Open Graph image and Article JSON-LD;
  - links to `https://israelgutierrez.es/price-scoring-simulator/` and `https://github.com/gootyfer/price-scoring-simulator`;
  - homepage and RSS order: simulator note, Una jornada decente, Critical Reader;
  - sitemap contains all three note IDs and excludes the draft.

  In `tests/e2e/homepage.spec.ts`, change the note-card count to three, assert the same newest-first titles, and assert the compact Price Scoring Simulator entry links to `/notes/price-scoring-simulator/` while retaining its live and source links.

- [ ] **Step 2: Run the focused tests and verify they fail for the missing note**

  Run: `npm run test:unit -- tests/content/notes.test.ts && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts tests/e2e/homepage.spec.ts`

  Expected: FAIL because the note route, third homepage card, RSS item, and project note link do not exist.

- [ ] **Step 3: Add the project link and article frontmatter**

  Add `noteHref: '/notes/price-scoring-simulator/'` to the simulator project. Create the Markdown note with:

  - `publishedAt: 2026-11-09`;
  - `draft: false`, `language: es`, `kind: build-note`;
  - `readingMinutes: 4`;
  - topics for public procurement, product, prototyping, and learning by building;
  - `image: ../../assets/projects/price-scoring-simulator.jpg`;
  - specific Spanish image alt text.

- [ ] **Step 4: Structure the supplied article without changing its argument**

  Preserve every substantive paragraph and introduce only these reading landmarks where they naturally fit:

  - `Entender el proceso antes de diseñar`
  - `La fórmula también decide`
  - `Convertir reglas en una interfaz`
  - `Un prototipo para entender`

  End with clearly labelled links to the live simulator and public source repository.

- [ ] **Step 5: Run focused checks and verify they pass**

  Run: `npm run check && npm run test:unit -- tests/content/notes.test.ts && npm run build && npm run test:e2e:chromium -- tests/e2e/notes.spec.ts tests/e2e/homepage.spec.ts`

  Expected: Astro reports zero diagnostics, unit tests pass, build succeeds, and the focused Chromium suite passes.

- [ ] **Step 6: Commit the published simulator note**

  ```bash
  git add src/content/notes/price-scoring-simulator.md src/data/projects.ts tests/content/notes.test.ts tests/e2e/homepage.spec.ts tests/e2e/notes.spec.ts
  git commit -m "feat: publish Price Scoring Simulator note"
  ```

### Task 2: Replace the featured-talk fallback with the approved photograph

**Files:**
- Create: `src/assets/talks/lechazoconf-2026.jpg`
- Modify: `src/data/talks.ts`
- Modify: `src/components/TalkList.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/content/profile-data.test.ts`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: `ImageMetadata` and the current `TalkList` featured/other partition.
- Produces: featured `Talk` fields `image`, `imageAlt`, `tagline`, `slidesUrl`, and official `url`; `TalkList` renders a photograph, description, and two labelled actions.

- [ ] **Step 1: Write the failing data and browser contracts**

  In `tests/content/profile-data.test.ts`, assert the featured talk has:

  - official `url` equal to `https://lechazoconf.com/2026/index.html#isra`;
  - exact `slidesUrl` from Global Constraints;
  - exact `tagline: 'Fewer features, more business.'`;
  - a local image and non-empty `imageAlt`.

  In `tests/e2e/homepage.spec.ts`, replace the fallback assertions with:

  - `data-visual="photo"` and one visible image with descriptive alt text;
  - heading `Menos features, más negocio`;
  - visible phrase `Fewer features, more business.`;
  - **View slides** points to Google Slides;
  - **Conference page** points to the official LechazoConf anchor;
  - no featured-talk link points to LinkedIn;
  - older talk links remain unchanged;
  - at 320, 768, and 1440 px the image loads, has intrinsic ratio 0.75, has a rendered ratio within 0.02 of 0.75, and the page has no horizontal overflow.

- [ ] **Step 2: Run the focused tests and verify they fail on the typographic fallback**

  Run: `npm run test:unit -- tests/content/profile-data.test.ts && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts`

  Expected: FAIL because the talk has no photograph, slide URL, tagline, alt text, or official-event destination.

- [ ] **Step 3: Create the local optimised photograph**

  Copy `/Users/israel/Pictures/isra-lechazo.jpeg` to `src/assets/talks/lechazoconf-2026.jpg`, resize the copy to a maximum height of 1600 px while preserving its 3:4 proportions, and leave the source file untouched. Confirm the result is a valid JPEG and 1200×1600 px.

- [ ] **Step 4: Extend the `Talk` contract and featured record**

  Add optional `imageAlt?: string`, `tagline?: string`, and `slidesUrl?: string` fields. Import the local photograph and assign all featured-talk values from the spec. Change `url` to the official LechazoConf event page.

- [ ] **Step 5: Implement the approved editorial talk composition**

  Update `TalkList.astro` to render the photograph with its explicit alt text, keep title and event metadata, add the exact tagline, and render **View slides** followed by **Conference page**. Keep the existing two-row archive for older talks. Update `src/styles/global.css` so the desktop feature is a 3:4 image beside the copy, the mobile feature stacks image then copy, and reduced-motion/accessibility behavior is unchanged.

- [ ] **Step 6: Run focused checks and verify they pass**

  Run: `npm run check && npm run test:unit -- tests/content/profile-data.test.ts && npm run build && npm run test:e2e:chromium -- tests/e2e/homepage.spec.ts tests/e2e/accessibility.spec.ts`

  Expected: zero Astro diagnostics, unit tests pass, build succeeds, and the focused responsive/accessibility Chromium suite passes.

- [ ] **Step 7: Run the complete release gate**

  Run: `npm run format:check && npm run check && npm run test:unit && npm run build && npm run test:e2e`

  Expected: formatting passes, Astro reports zero diagnostics, all unit tests pass, build succeeds, and every configured Chromium, Firefox, and WebKit test passes.

- [ ] **Step 8: Commit the completed launch additions**

  ```bash
  git add src/assets/talks/lechazoconf-2026.jpg src/data/talks.ts src/components/TalkList.astro src/styles/global.css tests/content/profile-data.test.ts tests/e2e/homepage.spec.ts
  git commit -m "feat: add LechazoConf talk photograph"
  ```
