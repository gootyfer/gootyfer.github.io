# Personal website visual refinement

## Intent

Refine the approved editorial-bio direction so the site feels calm, personal,
and professionally authoritative rather than oversized or template-led. Keep
the existing content, warm palette, simple navigation, and serif/sans pairing.

## Goals

- Make the portrait a supporting identity element instead of the dominant
  object on the page.
- Shorten the first screen and improve the balance between headline, portrait,
  and introduction.
- Reduce unnecessary vertical length, especially at tablet and mobile widths.
- Give work, talks, and notes distinct editorial rhythms without introducing
  cards, visual effects, or decorative UI.
- Preserve accessibility, responsive behavior, metadata, historical routes,
  and the current publishing workflow.

## Non-goals and anti-goals

- No new visual framework, JavaScript interaction, animation, or external
  font dependency.
- No SaaS-style metric strip, badges, gradients, rounded card grid, or generic
  AI-themed decoration.
- No rewriting factual career content in this pass.
- The portrait must not be stretched, excessively cropped, or taller than the
  principal hero copy.

## Chosen approach: refined editorial bio

Three directions were considered: refining the current editorial bio, a more
conventional executive split layout, and a text-first journal profile. The
refined editorial bio is selected because it preserves the warmth and
distinctiveness already approved while fixing the current proportion and
rhythm problems with the smallest conceptual reset.

## Hero composition

- Fix the image sizing defect by allowing its rendered height to follow its
  width and intrinsic square ratio.
- Desktop portrait: square, approximately 14–16rem, aligned near the top of the
  introduction rather than stretched to the hero height.
- Mobile portrait: square, approximately 10–12rem, left-aligned after the
  introductory copy instead of spanning the content width.
- Tablet must use the compact portrait treatment rather than the current
  30rem stacked image.
- Reduce the headline ceiling from 5.8rem to roughly 4.5–4.8rem and constrain
  line breaks so the statement remains emphatic without consuming most of the
  viewport.
- Reduce hero padding and bring the introduction closer to the headline.

## Section rhythm

- Reduce global section padding from the current 5rem rhythm to a more compact
  3.5–4rem rhythm, with slightly tighter mobile spacing.
- Keep work as the most detailed section, using a compact editorial timeline:
  role and period on the left, contribution on the right at desktop; natural
  stacked flow on mobile.
- Make talks visibly lighter than work: one-line title plus conference, place,
  and year, with less vertical padding.
- Keep Notes as a small closing invitation while it has zero published posts;
  expand it naturally once real notes exist.
- Preserve horizontal rules as the primary structural device and avoid boxes.

## Typography and color

- Keep the warm off-white background, near-black text, muted grey, and rust
  accent.
- Keep the existing serif/sans contrast but improve scale rather than adding a
  remote font.
- Retain visible link underlines and keyboard focus treatment.

## Responsive and quality constraints

- Validate at 320, 768, and 1440px widths.
- No horizontal overflow; full name and contact links remain visible.
- Portrait remains undistorted and does not dominate any breakpoint.
- Continue to pass Astro checks, content tests, axe WCAG A/AA checks, and the
  complete Chromium/Firefox/WebKit suite.
