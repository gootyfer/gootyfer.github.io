# Una jornada decente Redesign Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing *Una jornada decente* note and featured project to present the redesigned game without creating a second article.

**Architecture:** Keep the current Astro content collection and project data model. Add the approved screenshot as a source asset, point both the note and featured project at it, and extend the existing Markdown article with a dated redesign section.

**Tech Stack:** Astro 7 content collections, Markdown, Astro Assets, Vitest, Playwright, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-24-una-jornada-decente-redesign-design.md`

## Global Constraints

- Preserve `/notes/una-jornada-decente/` and `publishedAt: 2026-11-08`.
- Add `updatedAt: 2026-11-24`; do not publish a second note.
- Use the approved screenshot for both the article and featured project.
- Keep the existing game and repository links unchanged.
- Do not change the Markdown-to-HTML publishing system or add dependencies.

## Review Focus

- The article remains at the same URL and does not move in publication-date ordering.
- The homepage and article use the new image with meaningful alternative text.
- The new section appears once, after the original reflection and before the links.
- Social metadata exposes the new image and the updated date.
- The large screenshot remains proportional and responsive on desktop and mobile.

---

### Task 1: Update the article and featured project

**Files:**
- Create: `src/assets/projects/una-jornada-decente-redesign.png`
- Modify: `src/content/notes/una-jornada-decente.md`
- Modify: `src/data/projects.ts`
- Test: `tests/e2e/notes.spec.ts`
- Test: `tests/e2e/homepage.spec.ts`
- Test: `tests/content/profile-data.test.ts`

**Interfaces:**
- Consumes: the approved PNG supplied by the user and the existing `Project`/notes schemas.
- Produces: the same project id, article slug and public links with a new image and updated article content.

- [ ] **Step 1: Update the tests first**

Assert that the note keeps its title and publication date, exposes `2026-11-24` as its modified date, uses the new Spanish alt text, includes `Rediseñar antes de volver a programar`, and still links to the game and repository. Assert that the homepage featured project uses the same new image without changing its links.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm run test:unit -- tests/content/profile-data.test.ts && npm run build && npm run test:e2e:chromium -- --grep "Una jornada decente|launch notes|selected chapters"`

Expected: FAIL because the new image, modified date and redesign section do not exist yet.

- [ ] **Step 3: Add the approved screenshot and update the content**

Copy the supplied PNG to `src/assets/projects/una-jornada-decente-redesign.png`. Point the project data and note frontmatter to it; use `Docente y alumnado corriendo por un colegio público en Una jornada decente` as the alt text. Add `updatedAt: 2026-11-24`, adjust `readingMinutes` to the resulting article length, and insert the approved redesign section after `Elegir qué simplificar` and before the links.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run the same focused command from Step 2.

Expected: PASS.

- [ ] **Step 5: Verify formatting, types, build and all browsers**

Run: `npm run format:check && npm run check && npm run test:unit && npm run build && npm run test:e2e`

Expected: formatting clean, zero Astro/TypeScript diagnostics, unit tests pass, production build succeeds and all Playwright projects pass.

- [ ] **Step 6: Review the result visually**

Check the homepage and article at desktop and mobile widths. Confirm that the screenshot is not cropped or distorted, the new section reads naturally after the original article, and no overflow is introduced.

- [ ] **Step 7: Commit and publish**

Commit the content, image, tests, spec and plan with `feat: update Una jornada decente redesign`, push the working branch and then push the verified commit to `master`. Wait for the GitHub Pages workflow and verify the live article and homepage.
