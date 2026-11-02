# Personal Website Visual Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing editorial portfolio so the portrait, hero, and section rhythm feel balanced and compact at mobile, tablet, and desktop widths.

**Architecture:** Keep the existing Astro components and content model. Express the redesign through responsive CSS plus one semantic empty-state class on the Notes section, with Playwright assertions that measure the rendered composition instead of testing stylesheet source text.

**Tech Stack:** Astro 7, TypeScript, CSS, Playwright, axe-core, Vitest

**Spec:** `docs/superpowers/specs/2026-11-02-personal-website-visual-refinement-design.md`

## Global Constraints

- Preserve the current warm palette, serif/sans typography, content, metadata, navigation, routes, and publishing workflow.
- Add no dependency, JavaScript interaction, animation, remote font, cards, gradients, badges, metric strip, or generic AI decoration.
- Keep visible link underlines and keyboard focus treatment.
- Validate at 320, 768, and 1440px with no horizontal overflow.
- The portrait must remain square, undistorted, compact, and subordinate to the hero copy.

## Review Focus

- Astro's intrinsic `width` and `height` attributes must not override responsive portrait dimensions; Task 1 measures the rendered box at all three target widths.
- The 768px tablet layout must not inherit the current oversized stacked portrait; Task 1 pins its maximum rendered size.
- Long headline wrapping must remain readable without returning to a viewport-dominating hero; Task 1 checks its font ceiling and desktop hero height.
- The empty Notes state must be compact without constraining future populated note lists; Task 2 tests only the explicit empty-state modifier.
- Tighter section spacing must not introduce overflow or accessibility regressions in any browser engine; Task 2 runs the complete cross-browser and axe suite.

---

### Task 1: Rebalance the hero and portrait

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: existing `.hero`, `.hero__copy`, `.hero__introduction`, `.portrait`, and `.portrait img` markup from `src/pages/index.astro`.
- Produces: a responsive square portrait and compact hero layout; no component API changes.

- [ ] **Step 1: Add failing rendered-composition tests**

  Add a parameterized Playwright test for viewport widths 320, 768, and 1440. For each width, read the portrait bounding box and assert `abs(width - height) <= 1`; assert maximum widths of 192px at 320 and 208px at 768, and a width between 224px and 256px at 1440. At 1440 also assert the computed `h1` font size is at most 77px and the hero bounding-box height is below 720px.

- [ ] **Step 2: Run the focused test and confirm the current defect**

  Run: `npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts --project=chromium`

  Expected: FAIL because the portrait renders 1000px high and the desktop hero exceeds 720px.

- [ ] **Step 3: Implement the responsive hero proportions**

  In `src/styles/global.css`, make the portrait image height follow its width (`height: auto`) and use a compact width that resolves to approximately 10rem on mobile, 11–13rem on tablet, and 15rem on desktop. Align it left on stacked layouts and to the end of its column on wide layouts. Reduce the headline ceiling to 4.8rem, tighten the hero gap/padding and introduction spacing, and introduce the two-column hero at 44rem so 768px uses the compact tablet composition.

- [ ] **Step 4: Verify the focused hero behavior**

  Run: `npm run format:check && npm run check && npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts --project=chromium`

  Expected: PASS; portrait measurements are square and within every target range.

- [ ] **Step 5: Commit the hero refinement**

  ```bash
  git add src/styles/global.css tests/e2e/homepage.spec.ts
  git commit -m "fix: rebalance homepage hero portrait"
  ```

---

### Task 2: Tighten and differentiate the section rhythm

**Files:**
- Modify: `src/components/NotesList.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: `NotesList` prop `notes: readonly NoteSummary[]` and existing `.content-section`, `.editorial-row`, `.talk-row`, `.empty-state`, and `.notes-list` selectors.
- Produces: `.content-section--empty` only when `notes.length === 0`; populated notes retain the normal section rhythm.

- [ ] **Step 1: Add failing density and empty-state tests**

  At 1440px, assert every `.content-section` has block-start and block-end padding no greater than 64px, every `.talk-row` is below 120px high, and `#notes.content-section--empty` is below 420px high. At 320px, assert the empty Notes section is below 520px and the document still has no horizontal overflow. Keep the existing narrative and link assertions unchanged.

- [ ] **Step 2: Run the focused test and confirm the oversized rhythm**

  Run: `npm run build && npm run test:e2e -- tests/e2e/homepage.spec.ts --project=chromium`

  Expected: FAIL on the missing empty modifier and current 5rem section padding.

- [ ] **Step 3: Mark the empty Notes state semantically**

  In `src/components/NotesList.astro`, use Astro's class-list support to add `content-section--empty` to the section only when `notes.length === 0`. Do not alter the `NoteSummary` interface, publishing logic, or populated-note markup.

- [ ] **Step 4: Implement the compact editorial rhythm**

  In `src/styles/global.css`, reduce section padding to 3.5–4rem, with tighter mobile spacing. Keep work as the detailed two-column editorial list. Make talks lighter through smaller row padding and, at desktop, a title/metadata alignment distinct from work. Compact `.content-section--empty` and its empty message without applying height constraints to populated notes.

- [ ] **Step 5: Verify the complete repository**

  Run: `npm run format:check && npm run check && npm run test:unit && npm run test:config && npm run build && npm run test:e2e`

  Expected: all unit/configuration checks and all 66+ Chromium, Firefox, and WebKit tests PASS.

- [ ] **Step 6: Perform visual inspection**

  Capture and inspect the homepage at 320×720, 768×1024, and 1440×1000. Confirm the portrait is square and subordinate, the headline remains the primary element, section rules remain consistent, work/talk rhythms are distinct, and the empty Notes ending no longer creates disproportionate whitespace.

- [ ] **Step 7: Commit the section refinement**

  ```bash
  git add src/components/NotesList.astro src/styles/global.css tests/e2e/homepage.spec.ts
  git commit -m "style: tighten homepage editorial rhythm"
  ```

---

## Final verification

- [ ] Run `npm ci` followed by the complete local suite with unchanged inputs.
- [ ] Confirm `git status --short` is empty.
- [ ] Keep the refreshed production preview open for user approval before resuming GitHub Pages or Namecheap work.
